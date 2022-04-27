import { MaterialModule } from './../material/material.module';
import { MyProfileModule } from './../my-profile/my-profile.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [HeaderComponent, MenuComponent],
  imports: [
    CommonModule,
    MyProfileModule,
    MaterialModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
