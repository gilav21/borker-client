import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscriptions: Subscription[] = [];
  firstEntrence = true;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('home destroyed');
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(sub => {
        sub.unsubscribe();
      });
    }
  }

}
