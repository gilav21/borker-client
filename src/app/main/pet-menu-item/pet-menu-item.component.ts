import { Component, Input, OnInit } from '@angular/core';
import { IPet } from 'src/app/models/IPet';

@Component({
  selector: 'app-pet-menu-item',
  templateUrl: './pet-menu-item.component.html',
  styleUrls: ['./pet-menu-item.component.scss']
})
export class PetMenuItemComponent implements OnInit {

  @Input() pet: IPet;

  constructor() { }

  ngOnInit(): void {
  }

}
