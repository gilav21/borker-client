import { IComment } from './../models/IComment';
import { IReaction, ReactionTypes } from './../models/IReaction';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPet } from 'src/app/models/IPet';
import { PhotoDialogComponent } from './photo-dialog/photo-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { IPhoto } from '../models/IPhoto';
import { Store } from '@ngrx/store';
import { BorkerActions, BorkerSelectors } from '../redux/borker.types';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private dialog: MatDialog, private http: HttpClient, private env: EnviromentService, private store: Store<any>) { }

  openPhotoDialog(photoId: string, isFirst: boolean, isLast: boolean, pet: IPet): MatDialogRef<PhotoDialogComponent, string> {
    this.store.dispatch(BorkerActions.setCurrentPet({ pet }));
    const photoIndex  = pet.photos.findIndex(photo => photo._id === photoId);
    this.store.dispatch(BorkerActions.setCurrentPhotoIndex({index: photoIndex}));
    return this.dialog.open(PhotoDialogComponent, {
      data: {
        isFirst,
        isLast,
      },
      panelClass: 'no-padding-dialog',
      height: '90%',
      width: '90%'
    });
  }

  getPhoto(photoId: string) {
    this.http.get<{ message: string, photo: IPhoto }>(this.env.PHOTOS_API + photoId).subscribe(results => {
      this.store.select(BorkerSelectors.selectCurrentPet).subscribe(pet => {
        if (pet) {
          const newPet = { ...pet };
          const photos = [...pet.photos];
          const photoIndex = photos.findIndex(photo => photo._id === results.photo._id);
          if (photoIndex > -1) {
            photos[photoIndex] = results.photo;
          }
          newPet.photos = photos;
          this.store.dispatch(BorkerActions.setPetPhotos({ photos }));
          this.store.dispatch(BorkerActions.setCurrentPet({ pet: newPet }));
        }
      });
    });
  }

  addPhotoReaction(photoId: string, reaction: ReactionTypes) {
    const body = {
      photoId,
      reaction
    }
    this.http.post<{ message: string, reaction: IReaction }>(this.env.ADD_PHOTO_REACTION, body).subscribe(results => {
      this.store.dispatch(BorkerActions.setCurrentPhotoReaction({reactionType: reaction}));
    });
  }

  deletePhotoReaction(photoId: string, reactionId: string) {
    const body = {
      photoId,
      reactionId
    }
    this.http.post<{ message: string }>(this.env.DELETE_PHOTO_REACTION, body).subscribe(results => {
    });
  }

  deletePhotoComment(photoId: string, commentId: string) {
    const body = {
      photoId,
      commentId
    }
    this.http.post<{ message: string }>(this.env.DELETE_PHOTO_COMMENT, body).subscribe(results => {
      this.getPhoto(photoId);
    });
  }

  addPhotoComment(photoId: string, comment: string) {
    const body = {
      photoId,
      comment
    }
    this.http.post<{ message: string, comment: IComment }>(this.env.ADD_PHOTO_COMMENT, body).subscribe(results => {
      this.getPhoto(photoId);
    });
  }
}
