import { Component, EventEmitter, Input, OnInit, Output, Sanitizer } from '@angular/core';

@Component({
  selector: 'app-my-photo',
  templateUrl: './my-photo.component.html',
  styleUrls: ['./my-photo.component.scss']
})
export class MyPhotoComponent implements OnInit {

  @Input() url: string = '';
  @Output() photoClicked = new EventEmitter();
  constructor(private sanitazer: Sanitizer) { }

  ngOnInit(): void {
    if (!this.url) {
      this.url = 'assets/images/defaultAvatar.png';
    }
  }

  onPhotoClicked() {
    this.photoClicked.emit();
  }

}
