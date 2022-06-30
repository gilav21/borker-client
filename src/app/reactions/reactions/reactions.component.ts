import { PhotosService } from './../../photos/photos.service';
import { BorkerSelectors, BorkerActions } from 'src/app/redux/borker.types';
import { Store } from '@ngrx/store';
import { IReaction } from './../../models/IReaction';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { faFaceAngry, faFaceSmile, faFaceLaugh, faFaceGrinHearts } from '@fortawesome/free-regular-svg-icons';
import { ReactionTypes } from '../../models/IReaction';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactionsComponent implements OnInit {

  selected: IReaction;
  @Output() reactionSelected = new EventEmitter<ReactionTypes>();

  icons = [];

  constructor(private store: Store, private detector: ChangeDetectorRef, private photosService: PhotosService) {
    this.icons = [faFaceSmile, faFaceLaugh, faFaceGrinHearts, faFaceAngry]
  }

  ngOnInit(): void {
    this.store.select(BorkerSelectors.selectUserSelectedReaction).subscribe(reaction => {
      this.selected = reaction;
      this.detector.detectChanges();
    });
  }

  selectReaction(type: ReactionTypes) {
    console.log(ReactionTypes[type]);
    this.reactionSelected.emit(type);

  }

  isSelected(index) {
    return this.selected && ReactionTypes[this.selected.type] === index;
  }

}
