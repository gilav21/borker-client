import { PhotosService } from './photos.service';
import { PipesModule } from './../pipes/pipes.module';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPhotosComponent } from './upload-photos/upload-photos.component';
import { PhotosViewComponent } from './photos-view/photos-view.component';
import { PhotoDialogComponent } from './photo-dialog/photo-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';



@NgModule({
  declarations: [
    UploadPhotosComponent,
    PhotosViewComponent,
    PhotoDialogComponent,
    PhotoDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    FontAwesomeModule
  ],
  exports: [
    UploadPhotosComponent,
    PhotosViewComponent
  ],
  providers: [PhotosService]
})
export class PhotosModule { }
