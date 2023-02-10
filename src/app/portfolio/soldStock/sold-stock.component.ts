import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Stock } from "../../yFinance/stock";
import { SoldStock } from "./sold-stock";
import { SoldStockService } from "./sold-stock.service";

@Component({
    selector: 'app-sold-stock',
    templateUrl: './sold-stock.html',
    styleUrls: ['./sold-stock.css']
  })
  export class SoldStockComponent implements OnInit {
    public infoStock: Stock | undefined;
    public editStock: Stock | undefined;
    public deleteStock: Stock | undefined;
    public stocks: Stock[] = [];

    constructor(private soldStockService: SoldStockService) {}

    ngOnInit() {
        this.getStocks();
    }

    public getStocks(): void {
        this.soldStockService.getStocks().subscribe({
            next: (s) => this.stocks = s,
            error: (e) => console.error(e),
            complete: () => console.info('get complete')
        })
    }

    public getStock(ticker: string): void {
        this.soldStockService.getStock(ticker).subscribe({
            next: (s) => this.infoStock = s,
            error: (e) => console.error(e),
            complete: () => console.info('get complete')
        })
    }

    public onAddStock(addForm: NgForm): void {
        document.getElementById('add-sold-stock-form')?.click();
        this.soldStockService.addStock(addForm.value).subscribe({
            next: (r) => {
                console.log(r);
                this.getStocks();
                addForm.reset();
            },
            error: (e) => console.error(e),
            complete: () => console.info('post complete')
        })
    }

    public onUpdateStock(ticker: string, stock: SoldStock): void {
        this.soldStockService.updateStock(ticker, stock).subscribe({
            next: (r) => {
                console.log(r);
                this.getStocks();
                this.getStock(stock.ticker);
            },
            error: (e) => console.error(e),
            complete: () => console.info('put complete')
        })
    }

    public onDeleteStock(ticker: string): void {
        this.soldStockService.deleteStock(ticker).subscribe({
            next: (r) => {
                console.log(r);
                this.getStocks();
            },
            error: (e) => console.error(e),
            complete: () => console.info('delete complete')
        })
    }

    public searchStocks(key: string): void {

    }

    public onOpenModal(mode: string, stock?: Stock): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'add') {
          button.setAttribute('data-target', '#addSoldStockModal');
        }
        if (mode === 'info') {
            this.getStock(stock!.ticker);
            button.setAttribute('data-target', '#infoSoldStockModal')
        }
        if (mode === 'edit') {
          this.editStock = stock;
          button.setAttribute('data-target', '#updateSoldStockModal');
        }
        if (mode === 'delete') {
          this.deleteStock = stock;
          button.setAttribute('data-target', '#deleteSoldStockModal');
        }
        container?.appendChild(button);
        button.click();
    }
  }

