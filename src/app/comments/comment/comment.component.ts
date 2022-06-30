import { EnviromentService } from 'src/app/services/enviroment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MainService } from './../../services/main.service';
import { IComment } from './../../models/IComment';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: IComment;
  @Output() removeComment = new EventEmitter();

  profilePhoto;
  trashIcon;

  constructor(private mainService: MainService, private env: EnviromentService) { }

  ngOnInit(): void {
    this.trashIcon = faTrash;
    if (this.comment.userId.profilePhoto) {

      this.profilePhoto = this.env.GET_PET_IMAGE + this.comment.userId.profilePhoto;
    }
  }

  onRemoveComment() {
    this.removeComment.emit();
  }

}
