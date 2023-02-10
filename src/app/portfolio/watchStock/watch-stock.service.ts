import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Stock } from '../../yFinance/stock';
import { WatchStock } from './watch-stock';

@Injectable({
  providedIn: 'root'
})
export class WatchStockService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {

  }

  public getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiServerUrl}/watchstock/all`);
  }

  public getStock(ticker: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiServerUrl}/watchstock/find/${ticker}`);
  }

  public addStock(stock: WatchStock): Observable<WatchStock> {
    return this.http.post<WatchStock>(`${this.apiServerUrl}/watchstock/add`, stock);
  }

  public deleteStock(ticker: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/watchstock/delete/${ticker}`);
  }
}
