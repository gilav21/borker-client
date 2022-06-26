import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactionsComponent } from './reactions/reactions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ReactionsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ReactionsComponent
  ]
})
export class ReactionsModule { }
