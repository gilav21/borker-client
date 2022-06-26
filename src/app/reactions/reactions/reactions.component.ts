import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faFaceAngry, faFaceSmile, faFaceLaugh, faFaceGrinHearts } from '@fortawesome/free-regular-svg-icons';
import { ReactionTypes } from '../../models/IReaction';

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss']
})
export class ReactionsComponent implements OnInit {

  @Output() reactionSelected = new EventEmitter();
  @Input() selectedIndex: number;

  icons = [];

  constructor() {
    this.icons = [faFaceSmile, faFaceLaugh, faFaceGrinHearts, faFaceAngry]
  }

  ngOnInit(): void {
  }

  selectReaction(type: ReactionTypes) {
    console.log(ReactionTypes[type]);
    this.reactionSelected.emit(ReactionTypes[type]);
    this.selectedIndex = type;
  }

}
