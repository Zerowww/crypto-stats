import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class RestProvider {
  private _apiUrl = 'https://restcountries.eu/rest/v2/all';

  private _toplistApiUrl =
    'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

  private _newsApiIRL =
    'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=popular';

  constructor(public http: HttpClient) {}

  public getCountries(): Observable<string[]> {
    return this.http.get(this._apiUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public getToplistCryptoCurrencies(): Observable<string[]> {
    return this.http.get(this._toplistApiUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public getNews(): Observable<string[]> {
    return this.http.get(this._newsApiIRL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

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
