import { MyProfileComponent } from './my-profile/my-profile/my-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './home/signup/signup.component';
import { LoginComponent } from './home/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'myProfile', component: MyProfileComponent, canActivate: [AuthGuard], children: [
      // {path: '', component: }
    ]},
    {path: 'main', component: SignupComponent, canActivate: [AuthGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
