import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {

  constructor() { }

  readonly WEB_API = "http://localhost:3000/api/";

  // Users
  readonly USERS_API = this.WEB_API + 'users/';
  readonly LOGIN = this.USERS_API + 'login';
  readonly SIGNUP = this.USERS_API + 'signup';
  readonly CHECK_USERNAME = this.USERS_API + 'checkUserName/';
  readonly RENEW_TOKEN = this.USERS_API + 'renewToken';
}

