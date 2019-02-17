import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class RestProvider {
  private readonly _toplistApiUrl =
    'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
  private readonly _newsApiUrl =
    'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=popular';
  private readonly _priceApiUrl =
    'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,GBP,EUR';

  constructor(public http: HttpClient) {}

  /*
   *
   * GET
   *
   */

  public getToplistCryptoCurrencies(): Observable<string[]> {
    return this.http.get(this._toplistApiUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public getDailyHistoricalCryptoCurrency(
    cryptoCurrencyName: string
  ): Observable<string[]> {
    const apiUrl = `https://min-api.cryptocompare.com/data/histoday?fsym=${cryptoCurrencyName}&tsym=USD&limit=6&aggregate=10`;
    return this.http.get(apiUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public getCryptoCurrencyPrice(): Observable<string[]> {
    return this.http.get(this._priceApiUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public getNews(): Observable<string[]> {
    return this.http.get(this._newsApiUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  /*
   *
   * UTILS
   *
   */

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
