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
    private env: EnviromentService
  ) { }


  uploadPetImages(petId: string, images: Array<Blob>) {
    const formData = new FormData();
    formData.append('id', petId);
    if (images && images.length > 0) {
      images.forEach(image => {
        formData.append('files', image);
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

  getPetsByUserID(userId: string) {
    return this.http.get(this.env.PETS_BY_USER_ID + `?userId=${userId}`);
  }

  getPetImage(filename: string) {
    return this.http.get(this.env.GET_PET_IMAGE + filename);
  }
}
