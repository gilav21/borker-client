import { BorkerSelectors, BorkerActions } from 'src/app/redux/borker.types';
import { Observable } from 'rxjs';
import { PhotosService } from './../photos.service';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { IPet } from 'src/app/models/IPet';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IPhoto } from 'src/app/models/IPhoto';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements OnInit {

  isFirst: boolean;
  isLast: boolean;

  photo$: Observable<IPhoto>;
  pet$: Observable<IPet>;
  photoUrl$: Observable<string>;

  leftIcon: IconDefinition;
  rightIcon: IconDefinition;

  constructor(private dialogRef: MatDialogRef<PhotoDialogComponent>,
    private env: EnviromentService,
    private store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public data) { }

    ngOnInit(): void {
    this.photo$ = this.store.select(BorkerSelectors.selectCurrentPhoto);
    this.pet$ = this.store.select(BorkerSelectors.selectCurrentPet);
    this.leftIcon = faArrowLeft;
    this.rightIcon = faArrowRight;
    const photoId = this.data.photoId;
    this.photoUrl$ = this.store.select(BorkerSelectors.selectCurrentPhotoUrl);
    this.isFirst = this.data.isFirst;
    this.isLast = this.data.isLast;

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
