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

  constructor(private login: LoginService, private jwtHelper: JwtHelperService, private env: EnviromentService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip requests that do not need a JWT token.
    if (!this.shouldAttemptJwtTokenInjection(req)) {
      return next.handle(req);
    }
    this.token = this.login.loginDetails.token;
    if (this.token) {
      if (!this.jwtHelper.isTokenExpired(this.token)) {
        const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
        return next.handle(tokenizedReq);
      } else {
        this.login.renewToken(this.token).subscribe((results: any) => {
          this.token = results.token;
          const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
          return next.handle(tokenizedReq);
        });
      }
    }
    return next.handle(req);
  }

  shouldAttemptJwtTokenInjection(req: HttpRequest<any>): boolean {
    const blackList = [
      this.env.LOGIN,
      this.env.SIGNUP
    ]

    for (let i = 0; i < blackList.length; i++) {
      if (req.url.includes(blackList[i])) {
        return false;
      }
    }

    return true;
  }
}
