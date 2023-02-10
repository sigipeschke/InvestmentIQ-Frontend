// Data https://eoddata.com/symbols.aspx

import { Component } from "@angular/core";
import { BehaviorSubject, combineLatest, map, tap, catchError, EMPTY } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { WatchStockService } from "../portfolio/watchStock/watch-stock.service";
import { WatchStock } from "../portfolio/watchStock/watch-stock";
import { TickerService } from "./ticker.service";
import { Ticker } from "./ticker";

@Component({
    selector: 'app-browse',
    templateUrl: './browse.html',
    styleUrls: ['./browse.css']
  })

export class BrowseComponent {
  tickers: Ticker[] = [];
  loading: boolean = true;
  columnsFilter: {[col: string] : boolean} = {'Name' : true, 'Symbol' : true, 'Country' : false, 'IPOYear' : false, 'Sector' : true, 'Industry' : true, 'Exchange' : true};
  errorMessage = "";

  private filterSelectedSubject = new BehaviorSubject<string>("");
  filterSelectedAction$ = this.filterSelectedSubject.asObservable();

  private _tickerFilter: string = "";
  get tickerFilter(): string {
    return this._tickerFilter;
  }
  set tickerFilter(f: string) {
    this._tickerFilter = f;
    this.filterSelectedSubject.next(f)
  }

  filteredTickers$ = combineLatest([
    this.tickerService.tickers$,
    this.filterSelectedAction$
  ]).pipe(
    tap(([tickers, filter]) => this.tickers = tickers),
    map(([tickers, filter]) => tickers.filter(ticker =>
      ticker.symbol.toLocaleLowerCase().includes(filter.toLowerCase()) ||
      ticker.name.toLocaleLowerCase().includes(filter.toLowerCase())
    )),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  )

  constructor(private tickerService: TickerService,
              private watchStockService: WatchStockService,
              private primengConfig: PrimeNGConfig) {
    this.getTickers();
  }

  ngOnInit() {
    this.loading = false;
    this.primengConfig.ripple = true;
  }

  public getTickers(): void {
    this.tickerService.getTickers().subscribe({
      next: (t) => this.tickers = t,
      error: (e) => console.error(e),
      complete: () => {
        console.info('get complete');
      }
    });
  }

  public addToWatchList(symbol: string): void {
    const stock: WatchStock = { ticker : symbol }
    this.watchStockService.addStock(stock).subscribe({
      next: (r) => {
          console.log(r);
      },
      error: (e) => console.error(e),
      complete: () => console.info('post complete')
    })
  }

}