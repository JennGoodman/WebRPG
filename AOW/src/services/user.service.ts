import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { Config } from '../aow.config';

import { User } from '../models/User';

@Injectable()
export class UserService {

  private config = new Config();
  private MyURL = this.config.appURL + 'user';

  constructor(private http: HttpClient) {
  }

  add(user: User): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.post(this.MyURL, body, {
      headers: this.config.defaultHeaders
    })
      .map(
      resp => resp as User
      );
  }

  getAll(): Observable<User[]> {
    return this.http.get(this.MyURL, {
      headers: this.config.defaultHeaders
    })
      .map(
      resp => resp as User[]
      );
  }

  login(user: Object): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.post(this.config.appURL + 'login', body, {
      headers: this.config.defaultHeaders
    })
      .map(
      resp => resp as User
      );
  }

  update(user: User): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.put(this.MyURL, body, {
      headers: this.config.defaultHeaders
    })
      .map(
      resp => resp as User
      );
  }
}
