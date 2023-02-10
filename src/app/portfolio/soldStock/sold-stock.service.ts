import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Stock } from '../../yFinance/stock';
import { SoldStock } from './sold-stock';

@Injectable({
  providedIn: 'root'
})
export class SoldStockService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {

  }

  public getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiServerUrl}/soldstock/all`);
  }

  public getStock(ticker: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiServerUrl}/soldstock/find/${ticker}`);
  }

  public addStock(stock: SoldStock): Observable<SoldStock> {
    return this.http.post<SoldStock>(`${this.apiServerUrl}/soldstock/add`, stock);
  }

  public updateStock(ticker: string, stock: SoldStock): Observable<SoldStock> {
    return this.http.put<SoldStock>(`${this.apiServerUrl}/soldstock/update/${ticker}`, stock);
  }

  public deleteStock(ticker: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/soldstock/delete/${ticker}`);
  }
}
