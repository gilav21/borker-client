import { BorkerFeatureKey } from './../../redux/borker.state';
import { Store } from '@ngrx/store';
import { IComment } from 'src/app/models/IComment';
import { LoginService } from './../../services/login.service';
import { PhotosService } from './../photos.service';
import { IReaction, ReactionTypes } from './../../models/IReaction';
import { IPhoto } from './../../models/IPhoto';
import { IPet } from 'src/app/models/IPet';
import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { BorkerSelectors } from 'src/app/redux/borker.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoDetailsComponent implements OnInit{

  pet$: Observable<IPet>;
  photo$: Observable<IPhoto>;
  userReaction$: Observable<IReaction>;

  private photoId: string;

  constructor(private photosService: PhotosService, private store: Store<any>) { }

  ngOnInit() {
    this.pet$ = this.store.select<IPet>(BorkerSelectors.selectCurrentPet);
    this.photo$ = this.store.select<IPhoto>(BorkerSelectors.selectCurrentPhoto);
    this.userReaction$ = this.store.select<IReaction>(BorkerSelectors.selectUserSelectedReaction);

    this.photo$.subscribe(photo => {
      if (photo) {
        this.photoId = photo._id;
      }
    });
  }

  onReactionSelected (reaction: ReactionTypes) {
      this.photosService.addPhotoReaction(this.photoId, reaction);
  }

  onNewComment(commentContent: string) {
      this.photosService.addPhotoComment(this.photoId, commentContent);
  }

  onRemoveComment(comment: IComment) {
      this.photosService.deletePhotoComment(this.photoId, comment._id);
  }
}
