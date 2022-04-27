import { ILoginDetails } from './../../models/ILoginDetails';
import { LoginService } from './../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  hasError: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private login: LoginService) {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
  }

  onLoginClicked() {
    const { email, password } = this.formGroup.getRawValue()
    console.log('login:', email, password);
    this.login.login(email, password).subscribe((details:ILoginDetails) => {
      this.hasError = false;
      console.log('moveTo home page ?');
    }, err => {
      this.hasError = true;
      console.log('has Error', err);
    })
  }

}
