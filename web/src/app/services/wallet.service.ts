import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Wallet } from '../interfaces/wallet'

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private walletApiUrl = 'http://localhost:8080';
  private GET_WALLETS_ENDPOINT = '/wallets';
  private PUT_TRANSACTION_ENDPOINT = '/transaction';
  private REGISTER_WALLET_ENDPOINT = '/wallet/add'
  private POST_FUND_WALLET_ENDPOINT = '/fund-account'


  constructor(
    private http: HttpClient) { }

  getWallets(): Observable<Wallet[]> {
    let targetEndpoint = this.walletApiUrl + this.GET_WALLETS_ENDPOINT;
    return this.http.get<Wallet[]>(targetEndpoint).pipe(
      catchError(this.handleError<Wallet[]>("getWallets", []))
    );
  }

  sendTransaction(wallets: Wallet[], amount: string): Observable<any> {
    return this.http.put(this.walletApiUrl + this.PUT_TRANSACTION_ENDPOINT + `/${amount}`, wallets).pipe(
      tap(_ => console.log("Transaction completed")),
      catchError(this.handleError<any>("sendTransaction", []))
    );;
  }

  registerWallet(walletSecretKey: string | null): Observable<any> {
    return this.http.post(this.walletApiUrl + this.REGISTER_WALLET_ENDPOINT + `/${walletSecretKey}`, "").pipe(
      catchError(this.handleError<any>("getWallets"))
    );;
  }

  fundWallet(walletPublicKey: string | null): Observable<any> {
    return this.http.post(this.walletApiUrl + this.POST_FUND_WALLET_ENDPOINT + `/${walletPublicKey}`, "").pipe(
      catchError(this.handleError<any>("fundWallet"))
    );
    ;
  }

  private handleError<T>(
    operation = 'operation',
    result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        return of(result as T);
      }
    }
}
