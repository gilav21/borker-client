import { EnviromentService } from 'src/app/services/enviroment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MainService } from './../../services/main.service';
import { IComment } from './../../models/IComment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: IComment;

  profilePhoto;

  constructor(private mainService: MainService, private env: EnviromentService) { }

  ngOnInit(): void {
    if (this.comment.userId.profilePhoto) {

      this.profilePhoto = this.env.GET_PET_IMAGE + this.comment.userId.profilePhoto;
    }
  }

}
