import { BorkerState, BorkerFeatureKey } from './borker.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { environment } from 'src/environments/environment';

export const selectState =
  createFeatureSelector<BorkerState>(BorkerFeatureKey);

export const selectPets =
  createSelector(selectState, (state) => {
    if (state) {
      return state.pets
    }
    return null;
  });

export const selectCurrentPet =
  createSelector(selectState, (state) => {
    console.log('select current pet:', state.currentPet);
    return state.currentPet
  });

export const selectPetPhotos =
  createSelector(selectCurrentPet, (pet) => {
    console.log('select pet photos:', pet);
    if (pet) {
      return pet.photos;
    } else {
      return [];
    }
  });

export const selectUser =
  createSelector(selectState, (state) => {
    console.log('select user:', state.user);
    return state.user;
  });

export const selectIsLoggedIn =
  createSelector(selectState, (state) => (state.isLoggedIn));

export const selectIsLoading =
 createSelector(selectState, (state) => (state.isLoading));

 export const selectCurrentPhotoIndex = createSelector(selectState, (state) => {
  console.log('select photo index :', state.currentPhotoIndex);
  return state.currentPhotoIndex;
});

export const selectCurrentPhoto =
  createSelector(selectCurrentPet, selectCurrentPhotoIndex, (statePet, index) => {
    const photo = statePet.photos[index];
    console.log('select current photo:', statePet, index);
    return photo;
  });

  export const selectPhotoComments = createSelector(selectCurrentPhoto, (currentPhoto) => {
    console.log('select photo comments :', currentPhoto);
    return currentPhoto.comments;
  });

  export const selectPhotoReactions = createSelector(selectCurrentPhoto, (currentPhoto) => {
    console.log('select photo reactions :', currentPhoto);
    return currentPhoto.reactions;
  });

  export const selectUserSelectedReaction = createSelector(selectCurrentPhoto, selectUser, (currentPhoto, user) => {
    console.log('select users reaction :', currentPhoto, user);
    if (currentPhoto) {
      const reactions = currentPhoto.reactions;
      const userReaction = reactions.find(reaction => reaction.userId._id === user._id);
      console.log('userReaction :', userReaction);
      return userReaction;
    }
    return null;
  });


  export const selectCurrentPhotoUrl = createSelector (selectCurrentPhoto, (currentPhoto) => {
    console.log('select photo url :', currentPhoto);
    return environment.GET_PET_IMAGE +  currentPhoto._id;
  });


  export const selectIsFirstPhoto = createSelector(selectCurrentPhotoIndex, (index) => {
    console.log('select is first photo :', index);
    return index === 0;
  });

  export const selectIsLastPhoto = createSelector(selectCurrentPhotoIndex, selectPetPhotos, (index, photos) => {
    console.log('select is last photo :', index);
    return index === (photos.length - 1);
  });
