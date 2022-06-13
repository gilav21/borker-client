import { MapDialogComponent } from './../map-dialog/map-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IPet } from './../models/IPet';
import { EnviromentService } from './enviroment.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient,
    private env: EnviromentService,
    private dialog: MatDialog
  ) { }


  uploadPetImages(petId: string, images: Array<Blob>) {
    const formData = new FormData();
    formData.append('id', petId);
    if (images && images.length > 0) {
      images.forEach(image => {
        formData.append('images', image);
      })
      return this.http.post(this.env.PET_IMAGES, formData);
    }
    return null;
  }

  getUsersBy(userName: string) {
    return this.http.get(this.env.USERS_API + `?user=${userName}`);
  }

  addPet(pet: IPet) {
    return this.http.post(this.env.ADD_PET, pet);
  }

  getPetById(petId: string) {
    return this.http.get(this.env.PET_BY_ID + petId);
  }

  getPetsByUserId(userId: string) {
    return this.http.get(this.env.PETS_BY_USER_ID + `?userId=${userId}`);
  }

  getPetImage(filename: string) {
    return this.http.get(this.env.GET_PET_IMAGE + filename);
  }

  changeProfileImage(petId: string, imageUrl: string) {
    const body = {
      petId,
      imageUrl
    };
    return this.http.post(this.env.SET_PET_PROFILE_PHOTO, body);
  }

  openMap(locationString?: string, location?: {lat: number, lng: number}) {
    let lat, lng;
    if (locationString) {
      const splited = locationString.split(':');
      lat = +splited[0];
      lng = +splited[1];
    } else if (location) {
      lat = location.lat;
      lng = location.lng;
    }

    const data = {lat,lng};
    const options : MatDialogConfig = {
      data,
      height: '90%',
      width: '90%',
      panelClass: 'no-padding-dialog',
    }
    const dialogRef = this.dialog.open(MapDialogComponent, options);

  }
}
