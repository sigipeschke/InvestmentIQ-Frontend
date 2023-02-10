import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PrimeNGConfig } from 'primeng/api';
import { Stock } from "../yFinance/stock";
import { StockService } from "../yFinance/stock.service";
import { Ledger } from "./ledger/ledger";
import { LedgerService } from "./ledger/ledger.service";

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.html',
    styleUrls: ['./portfolio.css']
  })

export class PortfolioComponent {
    watchStocks: Stock[] = [];
    stocks: Stock[] = [];
    ledgers: Ledger[] = [];
    value: number = 0;
    invested: number = 0;
    profit: number = 0;
    loading: boolean = true;
    columnsFilter: {[col: string] : boolean} = {'symbol' : true, 'name' : true, 'ownedShares' : true, 'ownedValue' : true, 'profit' : true, 'profitInPercent' : false, 'price' : true, 'changeInPercent' : true, 'avgChange50InPercent' : false , 'avgChange200InPercent' : false, 'changeYearLowInPercent' : false, 'dividendAnnualYieldPercent' : false};

    infoStock: Stock | undefined;
    editLedger: Ledger | undefined;
    deleteLedger: Ledger | undefined;

    constructor(private ledgerService: LedgerService,
                private stockService: StockService,
                private primengConfig: PrimeNGConfig) {
        this.getLedgers();
        this.getStocks();
    }

    ngOnInit() {
        this.loading = false;
        this.primengConfig.ripple = true;
      }

    public getLedgers(): void {
        this.ledgerService.getLedgersByEmail("sigipeschke3@gmail.com").subscribe({
            next: (l) => this.ledgers = l,
            error: (e) => console.error(e),
            complete: () => {this.calcPortfolioValue(); console.info('get complete');}
        });
    }

    public getStocks(): void {
        this.stockService.getStocksByEmail("sigipeschke3@gmail.com").subscribe({
            next: (s) => this.stocks = s,
            error: (e) => console.error(e),
            complete: () => {
                this.calcPortfolioValue();
                if (this.infoStock) {
                    this.stocks.forEach(stock => {
                        if (stock.ticker === this.infoStock?.ticker){
                            this.infoStock = stock;
                        }
                    });
                };
                
                console.info('get complete');
            }
        });
    }

    public calcPortfolioValue(): void {
        let value = 0;
        let invested = 0;
        this.stocks.forEach(stock => {
            value += stock.ownedValue;
            invested += stock.investedValue;
        });
        this.value = value;
        this.invested = invested;
        this.profit = value - invested;
    }

    public onOpenModal(mode: string, stock?: Stock, ledger?: Ledger): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'add') {
          button.setAttribute('data-target', '#addLedgerModal');
        }
        if (mode === 'info') {
            this.infoStock = stock;
            button.setAttribute('data-target', '#infoStockModal')
        }
        if (mode === 'edit') {
          this.editLedger = ledger;
          button.setAttribute('data-target', '#updateLedgerModal');
        }
        if (mode === 'delete') {
          this.deleteLedger = ledger;
          button.setAttribute('data-target', '#deleteLedgerModal');
        }
        container?.appendChild(button);
        button.click();
    }

    public onAddLedger(addForm: NgForm): void {
        document.getElementById('add-ledger-form')?.click();
        this.ledgerService.addLedger(addForm.value).subscribe({
            next: (r) => {
                console.log(r);
                this.getStocks();
                addForm.reset();
            },
            error: (e) => console.error(e),
            complete: () => console.info('post complete')
        })
    }

    public onUpdateLedger(ledger: Ledger, id: number, editForm: Ledger): void {
        //console.log('Update Ledger: ', editForm);
        editForm.id = id;
        if (editForm.ticker === "") {
            editForm.ticker = ledger.ticker;
        }
        if (editForm.email === "") {
            editForm.email = ledger.email;
        }
        if (editForm.date === "") {
            editForm.date = ledger.date;
        }
        if (editForm.price.toString() === "") {
            editForm.price = ledger.price;
        }
        if (editForm.shares.toString() === "") {
            editForm.shares = ledger.shares;
        }
        if (editForm.transaction === "") {
            editForm.transaction = ledger.transaction;
        }
        if (editForm.notes === "") {
            editForm.notes = ledger.notes;
        }
        
        this.ledgerService.updateLedger(id, editForm).subscribe({
            next: (r) => {
                this.getStocks();
            },
            error: (e) => console.error(e),
            complete: () => {
                console.info('put complete');
            }
        })
    }

    public onDeleteLedger(id: number): void {
        this.ledgerService.deleteLedger(id).subscribe({
            next: (r) => {
                console.log(r);
                this.getStocks();
            },
            error: (e) => console.error(e),
            complete: () => console.info('delete complete')
        })
    }

}