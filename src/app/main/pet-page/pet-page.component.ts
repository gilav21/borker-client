import { ChangeDetectionStrategy } from '@angular/core';
import { MainService } from './../../services/main.service';
import { IPet } from 'src/app/models/IPet';
import { Component, Input, OnInit } from '@angular/core';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BorkerActions, BorkerSelectors } from 'src/app/redux/borker.types';
import { Observable } from 'rxjs';
import { IPhoto } from 'src/app/models/IPhoto';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetPageComponent implements OnInit {

  pet$: Observable<IPet>;
  petPhotos: { photoId: string, name: string, file?: File }[] = [];
  profilePhoto: string;
  constructor(private env: EnviromentService,
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
     private mainService: MainService) { }

  ngOnInit(): void {
    const routeParams$ = this.activatedRoute.params.subscribe(params => {
      const petId = params['petId'];
      this.mainService.getPetById(petId);
      this.pet$ = this.store.select<IPet>(BorkerSelectors.selectCurrentPet);
      this.store.select<IPhoto[]>(BorkerSelectors.selectPetPhotos).subscribe(photos => {
        this.petPhotos = photos.map(photo => {
          return {
            photoId: photo._id,
            name: photo.title,
            file: null
          }
        });
      });

      this.pet$.subscribe(pet => {
        if (pet) {
          this.profilePhoto = this.env.GET_PET_IMAGE + (pet.profilePhoto? pet.profilePhoto : pet.photos[0]._id);
        }
      });
      // this.mainService.getPetById(petId).subscribe(
      //   {
      //     next: (pet: { message: string, pet: IPet }) => {
      //       this.pet = pet.pet;
      //       if (this.pet.photos && this.pet.photos.length > 0) {
      //         this.petPhotos = this.pet.photos.map(photo => {
      //           return { photoId: photo, name: '' }
      //         });
      //         this.profilePhoto = this.env.GET_PET_IMAGE + (this.pet.profilePhoto? this.pet.profilePhoto : this.pet.photos[0]);
      //       }
      //       routeParams$.unsubscribe();
      //     },
      //     error: err => {
      //       console.error('error occured while retriving pet', err);
      //       routeParams$.unsubscribe();
      //     }
      //   }
      // );
    });

  }




}
