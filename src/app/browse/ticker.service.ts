import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, map, tap, catchError, throwError, combineLatest, shareReplay, EMPTY } from "rxjs";
import { Ticker } from "./ticker";

@Injectable({
    providedIn: 'root'
  })
  export class TickerService {
    nasTickersUrl = 'assets/nasdaq-tickers.json';
    nyseTickersUrl = 'assets/nyse-tickers.json';
    tsxTickersUrl = 'assets/tsx-tickers.json';

    nasTickers$ = this.http.get<Ticker[]>(this.nasTickersUrl)
      .pipe(
        catchError(this.handleError),
        shareReplay(1)
      );

    nyseTickers$ = this.http.get<Ticker[]>(this.nyseTickersUrl)
      .pipe(
        catchError(this.handleError),
        shareReplay(1)
      );

    tsxTickers$ = this.http.get<Ticker[]>(this.tsxTickersUrl)
      .pipe(
        catchError(this.handleError),
        shareReplay(1)
      );

    tickers$ = combineLatest([
      this.nasTickers$,
      this.nyseTickers$,
      this.tsxTickers$
    ]).pipe(
      map(([nasTickers, nyseTickers, tsxTickers]) => {
        let tickers: Ticker[] = [];
        nasTickers.forEach(ticker => {ticker.exchange = 'NASDAQ'; tickers.push(ticker);});
        nyseTickers.forEach(ticker => {ticker.exchange = 'NYSE'; tickers.push(ticker);});
        tsxTickers.forEach(ticker => {ticker.exchange = 'TSX'; tickers.push(ticker);});
        console.log('tickers assembled');
        return tickers;
      }),
      catchError(() => {
        return EMPTY;
      })
    )

    constructor (private http: HttpClient) {}
    
    public getTickers(): Observable<Ticker[]> {
      return this.http.get<Ticker[]>(this.nasTickersUrl);
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
      let errorMessage: string;
      if (err.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${err.error.message}`;
      } else {
          errorMessage = `Backend returned code ${err.status}: ${err.message}`;
      }
      console.error(err);
      return throwError(() => errorMessage);
    }
  }