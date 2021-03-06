import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { Config } from '../aow.config';

import { Transaction } from '../models/Transaction';
import { Inventory } from '../models/Inventory';

@Injectable()
export class TransactionService {

  private config = new Config();
  private MyURL = this.config.appURL + 'transaction';

  constructor(private http: HttpClient) { }

  add(user: Transaction): Observable<Transaction> {
    const body = JSON.stringify(user);
    return this.http.post(this.MyURL, body, {
      headers: this.config.defaultHeaders, withCredentials: true
    })
      .map(
      resp => resp as Transaction
      );
  }

  getAll(): Observable<Transaction[]> {
    return this.http.get(this.MyURL, {
      headers: this.config.defaultHeaders, withCredentials: true
    })
      .map(
      resp => resp as Transaction[]
      );
  }

  update(user: Transaction): Observable<Transaction> {
    const body = JSON.stringify(user);
    return this.http.put(this.MyURL, body, {
      headers: this.config.defaultHeaders, withCredentials: true
    })
      .map(
      resp => resp as Transaction
      );
  }

  maxOrder(): Observable<number> {
    return this.http.get(this.config.appURL + 'orderno', {
      headers: this.config.defaultHeaders, withCredentials: true
    })
      .map(
        resp => resp as number
      );
  }

  getByItemId(inv: Inventory): Observable<Transaction[]> {
    const body = JSON.stringify(inv);
    return this.http.post(this.config.appURL + 'orderno', body, {
      headers: this.config.defaultHeaders, withCredentials: true
    })
      .map(
        resp => resp as Transaction[]
      );
  }
}
