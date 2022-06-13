import { PetPageComponent } from './main/pet-page/pet-page.component';
import { MainComponent } from './main/main.component';
import { MyProfileComponent } from './my-profile/my-profile/my-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './home/signup/signup.component';
import { LoginComponent } from './home/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'myProfile', component: MyProfileComponent, canActivate: [AuthGuard], children: [
          { path: '', loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule) }
        ]
      },
      { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
      { path: 'petPage/:petId', component: PetPageComponent, canActivate: [AuthGuard]},
      { path: '**', component: MainComponent, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
