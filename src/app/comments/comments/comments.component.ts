import { MainService } from './../../services/main.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IComment } from 'src/app/models/IComment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments: IComment[] = [];
  @Input() inputMaxLength: number = 250;

  @Output() newComment = new EventEmitter<string>();
  @Output() removeComment = new EventEmitter<IComment>();

  isEmpty: boolean = true;
  newCommentContent: string = '';


  constructor(private mainService: MainService) {

  }

  ngOnInit(): void {
  }

  onValueChanged(value: string) {
    if( value && value.length > 0) {
      this.isEmpty = false;
      this.newCommentContent = value;
    } else {
      this.isEmpty = true;
      this.newCommentContent = '';
    }
  }
y
  onSaveComment() {
    this.newComment.emit(this.newCommentContent);
    this.isEmpty = true;
  }

  onRemoveComment(comment: IComment) {
    this.removeComment.emit(comment);
  }


}
