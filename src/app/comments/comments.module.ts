import { MaterialModule } from './../material/material.module';
import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    CommentsComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    MaterialModule,
    FontAwesomeModule
  ],
  exports: [
    CommentsComponent
  ]
})
export class CommentsModule { }
