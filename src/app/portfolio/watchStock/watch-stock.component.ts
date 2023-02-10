import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Stock } from "../../yFinance/stock";
import { WatchStock } from "./watch-stock";
import { WatchStockService } from "./watch-stock.service";

@Component({
    selector: 'app-watch-stock',
    templateUrl: './watch-stock.html',
    styleUrls: ['./watch-stock.css']
  })
  export class WatchStockComponent implements OnInit {
    public infoStock: Stock | undefined;
    public editStock: WatchStock | undefined;
    public deleteStock: WatchStock | undefined;
    public stocks: Stock[] = [];
    sortStock: string = '';

    constructor(private watchStockService: WatchStockService) {}

    ngOnInit() {
        this.getStocks();
    }

    public getStocks(): void {
        this.watchStockService.getStocks().subscribe({
            next: (s) => this.stocks = s,
            error: (e) => console.error(e),
            complete: () => console.info('get complete')
        })
    }

    public getStock(ticker: string): void {
        this.watchStockService.getStock(ticker).subscribe({
            next: (s) => this.infoStock = s,
            error: (e) => console.error(e),
            complete: () => console.info('get complete')
        })
    }

    public onAddStock(addForm: NgForm): void {
        document.getElementById('add-stock-form')?.click();
        this.watchStockService.addStock(addForm.value).subscribe({
            next: (r) => {
                console.log(r);
                this.getStocks();
                addForm.reset();
            },
            error: (e) => console.error(e),
            complete: () => console.info('post complete')
        })
    }

    public onDeleteStock(ticker: string): void {
        this.watchStockService.deleteStock(ticker).subscribe({
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
          button.setAttribute('data-target', '#addWatchStockModal');
        }
        if (mode === 'info') {
            this.infoStock = stock;
            button.setAttribute('data-target', '#infoWatchStockModal')
        }
        if (mode === 'edit') {
          this.editStock = stock;
          button.setAttribute('data-target', '#updateWatchStockModal');
        }
        if (mode === 'delete') {
          this.deleteStock = stock;
          button.setAttribute('data-target', '#deleteWatchStockModal');
        }
        container?.appendChild(button);
        button.click();
    }

    public onSortStocks(col: string): void {
        console.log('sorting');

        if(col != this.sortStock) { // descending
            if(col === 'symbol') { this.stocks.sort((a, b) => (a.ticker < b.ticker ? -1 : 1)); }
            if(col === 'name') { this.stocks.sort((a, b) => (a.name < b.name ? -1 : 1)); }
            if(col === 'price') { this.stocks.sort((a, b) => (a.price > b.price ? -1 : 1)); }
            if(col === 'change') { this.stocks.sort((a, b) => (a.change > b.change ? -1 : 1)); }
            if(col === 'change50') { this.stocks.sort((a, b) => (a.avgChange50InPercent > b.avgChange50InPercent ? -1 : 1)); }
            if(col === 'change200') { this.stocks.sort((a, b) => (a.avgChange200InPercent > b.avgChange200InPercent ? -1 : 1)); }
            if(col === 'yearLow') { this.stocks.sort((a, b) => (a.yearLow > b.yearLow ? -1 : 1)); }
            if(col === 'yearHigh') { this.stocks.sort((a, b) => (a.yearHigh > b.yearHigh ? -1 : 1)); }
            
            this.sortStock = col
        }

        else { // ascending
            if(col === 'symbol') { this.stocks.sort((a, b) => (a.ticker > b.ticker ? -1 : 1)); }
            if(col === 'name') { this.stocks.sort((a, b) => (a.name > b.name ? -1 : 1)); }
            if(col === 'price') { this.stocks.sort((a, b) => (a.price < b.price ? -1 : 1)); }
            if(col === 'change') { this.stocks.sort((a, b) => (a.change < b.change ? -1 : 1)); }
            if(col === 'change50') { this.stocks.sort((a, b) => (a.avgChange50InPercent < b.avgChange50InPercent ? -1 : 1)); }
            if(col === 'change200') { this.stocks.sort((a, b) => (a.avgChange200InPercent < b.avgChange200InPercent ? -1 : 1)); }
            if(col === 'yearLow') { this.stocks.sort((a, b) => (a.yearLow < b.yearLow ? -1 : 1)); }
            if(col === 'yearHigh') { this.stocks.sort((a, b) => (a.yearHigh < b.yearHigh ? -1 : 1)); }

            this.sortStock = '';
        }

    }
  }

