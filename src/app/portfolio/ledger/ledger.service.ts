import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Ledger } from './ledger';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getLedgers(): Observable<Ledger[]> {
    return this.http.get<Ledger[]>(`${this.apiServerUrl}/ledger/all`);
  }

  public getLedgersById(id: number): Observable<Ledger> {
    return this.http.get<Ledger>(`${this.apiServerUrl}/ledger/find/${id}`);
  }

  public getLedgersByEmail(email: string): Observable<Ledger[]> {
    return this.http.get<Ledger[]>(`${this.apiServerUrl}/ledger/history/${email}`);
  }

  public addLedger(ledger: Ledger): Observable<Ledger> {
    return this.http.post<Ledger>(`${this.apiServerUrl}/ledger/add`, ledger);
  }

  public updateLedger(id: number, ledger: Ledger): Observable<void> {
    return this.http.put<void>(`${this.apiServerUrl}/ledger/update/${id}`, ledger);
  }

  public deleteLedger(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/ledger/delete/${id}`);
  }
}
