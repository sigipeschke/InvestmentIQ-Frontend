import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Stock } from '../../yFinance/stock';
import { OwnedStock } from './owned-stock';

@Injectable({
  providedIn: 'root'
})
export class OwnedStockService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {

  }

  public getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiServerUrl}/ownedstock/all`);
  }

  public getStock(ticker: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiServerUrl}/ownedstock/find/${ticker}`);
  }

  public addStock(stock: OwnedStock): Observable<OwnedStock> {
    return this.http.post<OwnedStock>(`${this.apiServerUrl}/ownedstock/add`, stock);
  }

  public updateStock(ticker: string, stock: OwnedStock): Observable<OwnedStock> {
    return this.http.put<OwnedStock>(`${this.apiServerUrl}/ownedstock/update/${ticker}`, stock);
  }

  public deleteStock(ticker: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/ownedstock/delete/${ticker}`);
  }
}
