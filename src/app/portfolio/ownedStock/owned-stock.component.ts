import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Stock } from "../../yFinance/stock";
import { OwnedStock } from "./owned-stock";
import { OwnedStockService } from "./owned-stock.service";

@Component({
    selector: 'app-owned-stock',
    templateUrl: './owned-stock.html',
    styleUrls: ['./owned-stock.css']
  })
  export class OwnedStockComponent implements OnInit {
    public infoStock: Stock | undefined;
    public editStock: OwnedStock | undefined;
    public deleteStock: OwnedStock | undefined;
    public sortStock: string = '';
    public stocks: Stock[] = [];
    public value: number = 0;
    public invested: number = 0;

    constructor(private ownedStockService: OwnedStockService) {
        this.getStocks();
    }

    ngOnInit() {
    }

    public getStocks(): void {
        this.ownedStockService.getStocks().subscribe({
            next: (s) => this.stocks = s,
            error: (e) => console.error(e),
            complete: () => {this.calcPortfolioValue(); console.info('get complete');}
        })
    }

    public getStock(ticker: string): void {
        this.ownedStockService.getStock(ticker).subscribe({
            next: (s) => this.infoStock = s,
            error: (e) => console.error(e),
            complete: () => console.info('get complete')
        })
    }

    public onAddStock(addForm: NgForm): void {
        document.getElementById('add-owned-stock-form')?.click();
        this.ownedStockService.addStock(addForm.value).subscribe({
            next: (r) => {
                console.log(r);
                this.getStocks();
                addForm.reset();
            },
            error: (e) => console.error(e),
            complete: () => console.info('post complete')
        })
    }

    public onUpdateStock(ticker: string, stock: OwnedStock): void {
        this.ownedStockService.updateStock(ticker, stock).subscribe({
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
        this.ownedStockService.deleteStock(ticker).subscribe({
            next: (r) => {
                console.log(r);
                this.getStocks();
            },
            error: (e) => console.error(e),
            complete: () => console.info('delete complete')
        })
    }

    public calcPortfolioValue(): void {
        let value = 0;
        let invested = 0;
        this.stocks.forEach(stock => {
            value += stock.ownedShares*stock.price;
            invested += stock.ownedShares*stock.purchasePrice;
        });
        this.value = value;
        this.invested = invested;
    }

    public searchStocks(key: string): void {
        let s: Stock[] = [];
    }

    public onSortStocks(col: string): void {
        console.log('sorting');

        if(col != this.sortStock) { // descending
            if(col === 'symbol') { this.stocks.sort((a, b) => (a.ticker < b.ticker ? -1 : 1)); }
            if(col === 'name') { this.stocks.sort((a, b) => (a.name < b.name ? -1 : 1)); }
            if(col === 'price') { this.stocks.sort((a, b) => (a.price > b.price ? -1 : 1)); }
            if(col === 'purchasePrice') { this.stocks.sort((a, b) => (a.purchasePrice > b.purchasePrice ? -1 : 1)); }
            if(col === 'ownedShares') { this.stocks.sort((a, b) => (a.ownedShares > b.ownedShares ? -1 : 1)); }
            if(col === 'changeInPercent') { this.stocks.sort((a, b) => (a.changeInPercent > b.changeInPercent ? -1 : 1)); }
            if(col === '50DChangePercent') { this.stocks.sort((a, b) => (a.avgChange50InPercent > b.avgChange50InPercent ? -1 : 1)); }
            
            this.sortStock = col
        }

        else { // ascending
            if(col === 'symbol') { this.stocks.sort((a, b) => (a.ticker > b.ticker ? -1 : 1)); }
            if(col === 'name') { this.stocks.sort((a, b) => (a.name > b.name ? -1 : 1)); }
            if(col === 'price') { this.stocks.sort((a, b) => (a.price < b.price ? -1 : 1)); }
            if(col === 'purchasePrice') { this.stocks.sort((a, b) => (a.purchasePrice < b.purchasePrice ? -1 : 1)); }
            if(col === 'ownedShares') { this.stocks.sort((a, b) => (a.ownedShares < b.ownedShares ? -1 : 1)); }
            if(col === 'changeInPercent') { this.stocks.sort((a, b) => (a.changeInPercent < b.changeInPercent ? -1 : 1)); }
            if(col === '50DChangePercent') { this.stocks.sort((a, b) => (a.avgChange50InPercent < b.avgChange50InPercent ? -1 : 1)); }

            this.sortStock = '';
        }

    }

    public onOpenModal(mode: string, stock?: OwnedStock): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'add') {
          button.setAttribute('data-target', '#addOwnedStockModal');
        }
        if (mode === 'info') {
            this.getStock(stock!.ticker);
            button.setAttribute('data-target', '#infoOwnedStockModal')
        }
        if (mode === 'edit') {
          this.editStock = stock;
          button.setAttribute('data-target', '#updateOwnedStockModal');
        }
        if (mode === 'delete') {
          this.deleteStock = stock;
          button.setAttribute('data-target', '#deleteOwnedStockModal');
        }
        container?.appendChild(button);
        button.click();
    }
  }

