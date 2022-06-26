import { LoginService } from './../../services/login.service';
import { PhotosService } from './../photos.service';
import { IReaction, ReactionTypes } from './../../models/IReaction';
import { IPhoto } from './../../models/IPhoto';
import { IPet } from 'src/app/models/IPet';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnChanges {

  @Input() pet: IPet;
  @Input() photo: IPhoto;

  usersReactionIndex: number;

  constructor(private photosService: PhotosService, private loginService: LoginService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('pet')) {

    }
    if (changes.hasOwnProperty('photo')) {
      if (this.photo && this.photo.reactions) {
        const userReaction = this.photo.reactions.find(reaction => reaction.userId._id === this.loginService.loginDetails.user._id);
        if (userReaction) {
          this.usersReactionIndex = ReactionTypes[userReaction.type];
        }
      }
    }
  }

  onReactionSelected(reaction: string) {
    this.photosService.addPhotoReaction(this.photo._id, reaction).subscribe(results => {
      console.log(results);
    });
  }

}
