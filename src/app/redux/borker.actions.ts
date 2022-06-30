import { IComment } from 'src/app/models/IComment';
import { ReactionTypes } from './../models/IReaction';
import { IUserDetails } from '../models/ILoginDetails';
import { IPet } from '../models/IPet';
import { createAction, props } from "@ngrx/store";
import { IPhoto } from '../models/IPhoto';

export const setUser = createAction(
  '[User] Set User',
  props<{ user: IUserDetails }>()
);

export const setPets = createAction(
  '[Pets] Set Pets',
  props<{ pets: IPet[] }>()
);

export const setCurrentPet = createAction(
  '[Pet] Set Current Pet',
  props<{ pet: IPet }>()
);

export const setIsLoading = createAction(
  '[General] Set Is Loading',
  props<{ isLoading: boolean }>()
);

export const setIsLoggedIn = createAction(
  '[General] Set Is Logged In',
  props<{ isLoggedIn: boolean }>()
);

export const setIsLoggedOut = createAction(
  '[General] Set Is Logged Out',
  props<{ isLoggedIn: boolean }>()
);

export const setIsLoggedInError = createAction(
  '[General] Set Is Logged In Error',
  props<{ isLoggedIn: boolean }>()
);

export const setIsLoggedOutError = createAction(
  '[General] Set Is Logged Out Error',
  props<{ isLoggedIn: boolean }>()
);

export const setIsLoadingError = createAction(
  '[General] Set Is Loading Error',
  props<{ isLoading: boolean }>()
);

export const setPetPhotos = createAction(
  '[Pet] Set Pet Photos',
  props<{ photos: IPhoto[] }>()
);

export const setCurrentPhotoIndex = createAction(
  '[Pet] Set Current Photo Index',
  props<{ index: number }>()
);

export const setPetProfilePhoto = createAction(
  '[Pet] Set Pet Profile Photo',
  props<{ photo: IPhoto }>()
);


export const setCurrentPhotoReaction = createAction(
  '[Pet] Set Current Photo Reaction',
  props<{ reactionType: ReactionTypes }>()
);

export const addCurrentPhotoComment = createAction(
  '[Pet] Add Current Photo Comment',
  props<{ comment: IComment }>()
);

export const prevPhoto = createAction(
  '[Pet] Decrements Current Photo Index'
)

export const nextPhoto = createAction(
  '[Pet] Increment Current Photo Index'
)

