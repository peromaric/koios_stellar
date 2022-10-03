import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Wallet } from '../interfaces/wallet'

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private walletApiUrl = 'http://localhost:8080';
  private GET_WALLETS_ENDPOINT = '/wallets'
  private PUT_TRANSACTION_ENDPOINT = '/transaction'

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  getWallets(): Observable<Wallet[]> {
    let targetEndpoint = this.walletApiUrl + this.GET_WALLETS_ENDPOINT;
    return this.http.get<Wallet[]>(targetEndpoint)
      .pipe(
        tap(_ => this.log('fetched wallets')),
        catchError(this.handleError<Wallet[]>('getWallets', []))
      );
  }

  sendTransaction(wallets: Wallet[], amount: string): Observable<any> {
    return this.http.put(this.walletApiUrl + this.PUT_TRANSACTION_ENDPOINT + `/${amount}`, wallets).pipe(
      tap(_ => this.log(`Transaction published!`)),
      catchError(this.handleError<any>('sendTransaction'))
    );
  }

  private log(message: string) {
    this.messageService.add(`WalletService: ${message}`);
  }

  private handleError<T>(
    operation = 'operation',
    result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      }
    }
}
