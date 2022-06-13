import { IPet } from 'src/app/models/IPet';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FontawesomeObject, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

  leftIcon: IconDefinition;
  rightIcon: IconDefinition;

  constructor(private dialogRef: MatDialogRef<PhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.leftIcon = faArrowLeft;
    this.rightIcon = faArrowRight;

    this.photoUrl = this.data.url;
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
