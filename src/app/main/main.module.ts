import { PeeAndPooModule } from './../pee-and-poo/pee-and-poo.module';
import { MaterialModule } from './../material/material.module';
import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { PetPageComponent } from './pet-page/pet-page.component';
import { PetMenuItemComponent } from './pet-menu-item/pet-menu-item.component';
import { PhotosModule } from '../photos/photos.module';

@NgModule({
  declarations: [
    PetPageComponent,
    PetMenuItemComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    PhotosModule,
    MaterialModule,
    PeeAndPooModule
  ],
  exports: [
    PetMenuItemComponent
  ]
})
export class MainModule { }
