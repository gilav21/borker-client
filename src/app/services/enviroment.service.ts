import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {

  constructor() { }

  readonly WEB_API = "http://localhost:3000/api/";

  // Users
  readonly USERS_API = this.WEB_API + 'users/';
  readonly LOGIN = this.USERS_API + 'login';
  readonly SIGNUP = this.USERS_API + 'signup';
  readonly CHECK_USERNAME = this.USERS_API + 'checkUserName';
  readonly CHECK_EMAIL = this.USERS_API + 'checkEmail';
  readonly RENEW_TOKEN = this.USERS_API + 'renewToken';

  // Pets
  readonly PETS_API = this.WEB_API + 'pets/';
  readonly PET_BY_ID = this.PETS_API + 'pet/';
  readonly PET_IMAGES = this.PETS_API + 'petImages';
  readonly ADD_PET = this.PETS_API + 'createPet';
  readonly PETS_BY_USER_ID = this.PETS_API + 'petsByUserId';
  readonly GET_PET_IMAGE = this.PETS_API + 'petImage/';
  readonly SET_PET_PROFILE_PHOTO = this.PETS_API + 'changeProfileImage';

  // Pee and poo
  readonly PEE_AND_POO_API = this.WEB_API + 'peeAndPoo/';
  readonly CREATE_PEE_AND_POO = this.PEE_AND_POO_API + 'createPeeAndPoo';

  // Photos
  readonly PHOTOS_API = this.WEB_API + 'photos/';
  readonly ADD_PHOTO_REACTION = this.PHOTOS_API + 'addReaction';
  readonly ADD_PHOTO_COMMENT = this.PHOTOS_API + 'addComment';

}

