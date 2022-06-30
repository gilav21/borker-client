import { Router } from '@angular/router';
import { IUserDetails } from './../../models/ILoginDetails';
import { Observable } from 'rxjs';
import { LoginService } from './../../services/login.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;
  userNameMessage = '';
  emailMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
     private loginService: LoginService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      userName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  testUserName(userName: string) {
    this.loginService.checkUserName(userName).subscribe({
      next: (result: { message: string }) => {
        this.formGroup.controls['userName'].setErrors(null);
        this.userNameMessage = result.message;
      }, error: (err: HttpErrorResponse) => {
        this.formGroup.controls['userName'].setErrors({ notUniqe: true });
        this.userNameMessage = err.error.error;
      }
    });
  }

  testEmail(email: string) {
    this.loginService.checkEmail(email).subscribe({
      next: (result: { message: string }) => {
        this.formGroup.controls['email'].setErrors(null);
        this.emailMessage = result.message;
      }, error: (err: HttpErrorResponse) => {
        this.formGroup.controls['email'].setErrors({ notUniqe: true });
        this.emailMessage = err.error.error;
      }
    });
  }

  onSignUp() {
    const formContent = this.formGroup.getRawValue();
    const user: IUserDetails = {
      email: formContent.email,
      userName: formContent.userName,
      firstName: formContent.firstName,
      lastName: formContent.lastName
    }
    this.loginService.signup(user, formContent.password).subscribe(details => {
      this.loginService.login(user.email, formContent.password).subscribe(results => {
        // Navigate to home page
        this.router.navigate(['/main'])
      }, err => {
        console.log('error while logging in after signup!', err);
      });
    }, err => {
      console.error('An error happend with signup', err);
    });
  }

}
