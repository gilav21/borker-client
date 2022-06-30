import { EnviromentService } from './../../services/enviroment.service';
import { MainService } from './../../services/main.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IPet } from 'src/app/models/IPet';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pet-menu-item',
  templateUrl: './pet-menu-item.component.html',
  styleUrls: ['./pet-menu-item.component.scss']
})
export class PetMenuItemComponent implements OnChanges {

  @Input() pet: IPet;

  petImage;

  constructor(private env: EnviromentService, private sanitaizer: DomSanitizer) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('pet')) {
      this.getPetImage();
    }
  }

  getPetImage() {
    if (this.pet && this.pet.photos && this.pet.photos.length > 0) {
      this.petImage = this.env.GET_PET_IMAGE + this.pet.photos[0]._id;
    }
  }

}
