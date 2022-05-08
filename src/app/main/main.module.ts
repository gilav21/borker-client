import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { PetPageComponent } from './pet-page/pet-page.component';
import { PetMenuItemComponent } from './pet-menu-item/pet-menu-item.component';

@NgModule({
  declarations: [
    PetPageComponent,
    PetMenuItemComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    PetMenuItemComponent
  ]
})
export class MainModule { }
