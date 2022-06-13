import { PhotosModule } from './../photos/photos.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyPhotoComponent } from './my-photo/my-photo.component';
import { MyProfileRoutingModule } from './my-profile/my-profiles-routing.module';
import { AddPetComponent } from './my-profile/add-pet/add-pet.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyProfileComponent,
    MyPhotoComponent,
    AddPetComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    MyProfileRoutingModule,
    PhotosModule
  ],
  exports: [
    MyPhotoComponent
  ]
})
export class MyProfileModule { }
