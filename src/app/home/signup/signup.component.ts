import { IUserDetails } from './../../models/ILoginDetails';
import { Observable } from 'rxjs';
import { LoginService } from './../../services/login.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;
  userNameMessage = '';

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

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
    this.loginService.checkUserName(userName).subscribe((result: { message: string }) => {
      this.formGroup.controls['userName'].setErrors(null);
      this.userNameMessage = result.message;
    }, (err: { error: string }) => {
      this.formGroup.controls['userName'].setErrors({notUniqe: true});
      this.userNameMessage = err.error;
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
      console.log('signed up: ', details);
      this.loginService.login(user.email, formContent.password).subscribe(results => {
        console.log('logged in after signup!', results);
        // Navigate to home page
      }, err => {
        console.log('error while logging in after signup!', err);
      });
    }, err => {
      console.error('An error happend with signup', err);
    });
  }

}
