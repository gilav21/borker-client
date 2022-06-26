import { IReaction, ReactionTypes } from './../models/IReaction';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPet } from 'src/app/models/IPet';
import { PhotoDialogComponent } from './photo-dialog/photo-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { IPhoto } from '../models/IPhoto';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private dialog: MatDialog, private http: HttpClient, private env: EnviromentService) { }

  openPhotoDialog(photoId: string, isFirst: boolean, isLast: boolean, pet: IPet): MatDialogRef<PhotoDialogComponent, string> {
    return this.dialog.open(PhotoDialogComponent, {
      data: {
        photoId,
        isFirst,
        isLast,
        pet
      },
      panelClass: 'no-padding-dialog',
      height: '90%',
      width: '90%'
    });
  }

  getPhoto(photoId: string): Observable<{ message: string, photo: IPhoto }> {
    return this.http.get<{ message: string, photo: IPhoto }>(this.env.PHOTOS_API + photoId);
  }

  addPhotoReaction(photoId: string, reaction: string): Observable<{ message: string, reaction: IReaction }> {
    const body = {
      photoId,
      reaction
    }
    return this.http.post<{ message: string, reaction: IReaction }>(this.env.ADD_PHOTO_REACTION, body);
  }
}
