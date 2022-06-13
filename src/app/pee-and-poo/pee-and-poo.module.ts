import { PhotosModule } from './../photos/photos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeeAndPooEntryComponent } from './pee-and-poo-entry/pee-and-poo-entry.component';
import { PeeAndPooListComponent } from './pee-and-poo-list/pee-and-poo-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { QualitySelectorComponent } from './quality-selector/quality-selector.component';



@NgModule({
  declarations: [
    PeeAndPooEntryComponent,
    PeeAndPooListComponent,
    QualitySelectorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    PhotosModule
  ],
  exports: [
    PeeAndPooListComponent
  ]
})
export class PeeAndPooModule { }
