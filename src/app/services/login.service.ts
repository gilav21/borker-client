import { BorkerActions } from 'src/app/redux/borker.types';
import { Router } from '@angular/router';
import { IUserDetails } from './../models/ILoginDetails';
import { EnviromentService } from './enviroment.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginDetails } from '../models/ILoginDetails';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _loginDetails: ILoginDetails;
  private idleTimer;
  private logoutTime: number = 1000* 60 * 30;


  get loginDetails(): ILoginDetails {
    return this._loginDetails;
  }

  set loginDetails(details: ILoginDetails) {
    this._loginDetails = details;
  }

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }

  setIsLoggedIn$(isLoggedIn: boolean) {
    this._isLoggedIn$.next(isLoggedIn);
  }

  getLoginStatus(): boolean {
    return this._isLoggedIn$.value;
  }

  constructor(private http: HttpClient, private env: EnviromentService, private jwtHelper: JwtHelperService, private router: Router, private store: Store) {
    const token = localStorage.getItem('token');
    if (!jwtHelper.isTokenExpired(token?.toString())) {
      const expiresString = localStorage.getItem('expriesIn');
      this._loginDetails = {
        token: token,
        user: JSON.parse(localStorage.getItem('user')),
        expiresIn: expiresString ? +expiresString : null
      }
      this.setIsLoggedIn$(true);
      this.store.dispatch(BorkerActions.setUser(this._loginDetails));
    }
    this.resetIdleCounter();
  }

  resetIdleCounter() {
    console.log('resetting idle counter');
    if (this.idleTimer) {
      clearTimeout(this.idleTimer)
    }
    this.idleTimer = setTimeout(()=> {
      console.log('idle timedout');
      this.setIsLoggedIn$(false);
      this.router.navigate(['/login']);
    },this.logoutTime );
  }

  login(email: string, password: string) {
    const body = {
      email,
      password
    }
    return this.http.post<ILoginDetails>(this.env.LOGIN, body).pipe(map(details => {
      this.loginDetails = details;
      localStorage.setItem('token', details.token);
      localStorage.setItem('user', JSON.stringify(details.user));
      localStorage.setItem('expiresIn', details.expiresIn.toString());
      console.log('logged in: ', this.loginDetails);
      this.setIsLoggedIn$(true);
      this.store.dispatch(BorkerActions.setUser(this.loginDetails));
      return details;
    }));
  }

  signup(user: IUserDetails, password: string) {
    const body = {
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password
    }

    return this.http.post(this.env.SIGNUP, body);
  }

  renewToken() {
    const body = {
      token: this._loginDetails.token
    }
    this.http.post(this.env.RENEW_TOKEN, body).subscribe({
      next: (results: {token: string})=> {
        this._loginDetails.token = results.token;
      },
      error: err=> {
        this.router.navigate(['/login']);
      }
    })
  }

  tokenTest() {
    return this.http.get(this.env.USERS_API);
  }

  checkUserName(userName: string) {
    return this.http.get(this.env.CHECK_USERNAME + `?userName=${userName}`);
  }

  checkEmail(email: string) {
    return this.http.get(this.env.CHECK_EMAIL + `?email=${email}`);
  }

}
