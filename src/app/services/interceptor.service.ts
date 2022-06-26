import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EnviromentService } from './enviroment.service';
import { LoginService } from './login.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";



@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  token: string;

  constructor(private dialog: MatDialog,private login: LoginService, private jwtHelper: JwtHelperService, private env: EnviromentService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip requests that do not need a JWT token.
    if (!this.shouldAttemptJwtTokenInjection(req)) {
      return next.handle(req);
    }
    this.token = this.login.loginDetails.token;
    if (this.token) {
      if (!this.jwtHelper.isTokenExpired(this.token)) {
        this.login.resetIdleCounter();
        const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
        return next.handle(tokenizedReq);
      } else {
        // if (this.login.getLoginStatus()) {
        //   this.login.renewToken();
        // } else {
        //   this.dialog.closeAll();
        //   this.router.navigate(['/login']);
        // }
          this.dialog.closeAll();
          this.router.navigate(['/login']);
      }
    }
    return next.handle(req);
  }

  shouldAttemptJwtTokenInjection(req: HttpRequest<any>): boolean {
    const blackList = [
      this.env.LOGIN,
      this.env.SIGNUP,
      this.env.CHECK_USERNAME,
      this.env.CHECK_EMAIL
    ]

    for (let i = 0; i < blackList.length; i++) {
      if (req.url.includes(blackList[i])) {
        return false;
      }
    }

    return true;
  }
}
