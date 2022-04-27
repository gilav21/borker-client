import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyPhotoComponent } from './my-photo/my-photo.component';



@NgModule({
  declarations: [
    MyProfileComponent,
    MyPhotoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyPhotoComponent
  ]
})
export class MyProfileModule { }
