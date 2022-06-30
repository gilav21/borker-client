// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const WEB_API = "http://localhost:3000/api/";

  // Users
  const USERS_API = WEB_API + 'users/';
  const LOGIN = USERS_API + 'login';
  const SIGNUP = USERS_API + 'signup';
  const CHECK_USERNAME = USERS_API + 'checkUserName';
  const CHECK_EMAIL = USERS_API + 'checkEmail';
  const RENEW_TOKEN = USERS_API + 'renewToken';

  // Pets
  const PETS_API = WEB_API + 'pets/';
  const PET_BY_ID = PETS_API + 'pet/';
  const PET_IMAGES = PETS_API + 'petImages';
  const ADD_PET = PETS_API + 'createPet';
  const PETS_BY_USER_ID = PETS_API + 'petsByUserId';
  const GET_PET_IMAGE = PETS_API + 'petImage/';
  const SET_PET_PROFILE_PHOTO = PETS_API + 'changeProfileImage';

  // Pee and poo
  const PEE_AND_POO_API = WEB_API + 'peeAndPoo/';
  const CREATE_PEE_AND_POO = PEE_AND_POO_API + 'createPeeAndPoo';

  // Photos
  const PHOTOS_API = WEB_API + 'photos/';
  const ADD_PHOTO_REACTION = PHOTOS_API + 'addReaction';
  const ADD_PHOTO_COMMENT = PHOTOS_API + 'addComment';
  const GET_PHOTO_COMMENTS = PHOTOS_API + 'getComments';
  const GET_PHOTO_REACTIONS = PHOTOS_API + 'getReactions';
  const DELETE_PHOTO_COMMENT = PHOTOS_API + 'deleteComment';
  const DELETE_PHOTO_REACTION = PHOTOS_API + 'deleteReaction';

  // Comments
  const COMMENTS_API = WEB_API + 'comments/';
  const REMOVE_COMMENT = COMMENTS_API + 'removeComment';



export const environment = {
  production: false,
  domain: 'http:localhost:3000',
  clientId: 'borker',
  ADD_PET,
  ADD_PHOTO_COMMENT,
  ADD_PHOTO_REACTION,
  CHECK_EMAIL,
  CHECK_USERNAME,
  COMMENTS_API,
  CREATE_PEE_AND_POO,
  DELETE_PHOTO_COMMENT,
  DELETE_PHOTO_REACTION,
  GET_PET_IMAGE,
  GET_PHOTO_COMMENTS,
  GET_PHOTO_REACTIONS,
  LOGIN,
  PEE_AND_POO_API,
  PETS_API,
  PETS_BY_USER_ID,
  PET_BY_ID,
  PET_IMAGES,
  PHOTOS_API,
  REMOVE_COMMENT,
  RENEW_TOKEN,
  SET_PET_PROFILE_PHOTO,
  SIGNUP,
  USERS_API,
  WEB_API
};


