import { MainService } from './../../services/main.service';
import { IPet } from 'src/app/models/IPet';
import { Component, Input, OnInit } from '@angular/core';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.scss']
})
export class PetPageComponent implements OnInit {

  pet: IPet;
  petPhotos: { filePath: string, name: string, file?: File }[] = [];
  profilePhoto: string;
  constructor(private env: EnviromentService, private activatedRoute: ActivatedRoute, private mainService: MainService) { }

  ngOnInit(): void {
    const routeParams$ = this.activatedRoute.params.subscribe(params => {
      const petId = params['petId'];
      this.mainService.getPetById(petId).subscribe(
        {
          next: (pet: { message: string, pet: IPet }) => {
            this.pet = pet.pet;
            if (this.pet.photos && this.pet.photos.length > 0) {
              this.petPhotos = this.pet.photos.map(photo => {
                return { filePath: this.env.GET_PET_IMAGE + photo, name: '' }
              });
              this.profilePhoto = this.env.GET_PET_IMAGE + (this.pet.profilePhoto? this.pet.profilePhoto : this.pet.photos[0]);
            }
            routeParams$.unsubscribe();
          },
          error: err => {
            console.error('error occured while retriving pet', err);
            routeParams$.unsubscribe();
          }
        }

      )
    });

  }


  getPetImage() {
  }


}
