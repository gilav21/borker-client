import { PhotosService } from './../photos.service';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { IPet } from 'src/app/models/IPet';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IPhoto } from 'src/app/models/IPhoto';

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements OnInit {

  pet: IPet;
  photoUrl: string;
  isFirst: boolean;
  isLast: boolean;
  photo: IPhoto;

  leftIcon: IconDefinition;
  rightIcon: IconDefinition;

  constructor(private dialogRef: MatDialogRef<PhotoDialogComponent>,
    private env: EnviromentService,
    private photosService: PhotosService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.leftIcon = faArrowLeft;
    this.rightIcon = faArrowRight;

    const photoId = this.data.photoId;
    this.photosService.getPhoto(photoId).subscribe({
      next: ((results: {message: string, photo: IPhoto}) => {
        console.log(results);
        this.photo = results.photo;
      }),
      error: (err => {
        console.error(err);
      })
    })
    this.photoUrl = this.env.GET_PET_IMAGE + photoId;
    this.isFirst = this.data.isFirst;
    this.isLast = this.data.isLast;
    this.pet = this.data.pet;
  }

  @HostListener('document:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        if (!this.isFirst) {
          this.onActionClicked('prev');
        }
        break;
      case 'ArrowRight':
        if (!this.isLast) {
          this.onActionClicked('next');
        }
        break;
    }

  }

  onActionClicked(action) {
    this.dialogRef.close(action);
  }
}
