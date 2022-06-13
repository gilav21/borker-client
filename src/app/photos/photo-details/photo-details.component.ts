import { IPet } from 'src/app/models/IPet';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {

  @Input() pet: IPet;

  constructor() { }

  ngOnInit(): void {
  }

}
