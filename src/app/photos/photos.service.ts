import { IPet } from 'src/app/models/IPet';
import { PhotoDialogComponent } from './photo-dialog/photo-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private dialog: MatDialog) { }

  openPhotoDialog(url: string, isFirst: boolean, isLast: boolean, pet: IPet): MatDialogRef<PhotoDialogComponent, string> {
    return this.dialog.open(PhotoDialogComponent, {
      data: {
        url,
        isFirst,
        isLast,
        pet
       },
      panelClass: 'no-padding-dialog',
      height: '90%',
      width: '90%'
    });
  }
}
