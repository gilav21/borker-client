import { ReactionTypes } from './../models/IReaction';
import { on, createReducer } from "@ngrx/store";
import { BorkerState, initialBorkerState } from './borker.state';
import { BorkerActions } from "./borker.types";
import { SlicePipe } from '@angular/common';

export const borkerReducer = createReducer(initialBorkerState,
  on(BorkerActions.setUser, (state: BorkerState, action) => {
    return {
      ...state,
      user: action.user
    };
  }
  ),
  on(BorkerActions.setPets, (state: BorkerState, action) => {
    return {
      ...state,
      pets: action.pets
    };
  }
  ),
  on(BorkerActions.setCurrentPet, (state: BorkerState, action) => {
    return {
      ...state,
      currentPet: action.pet
    };
  }
  ),
  on(BorkerActions.setIsLoading, (state: BorkerState, action) => {
    return {
      ...state,
      isLoading: action.isLoading
    };
  }
  ),
  on(BorkerActions.setIsLoggedIn, (state: BorkerState, action) => {
    return {
      ...state,
      isLoggedIn: action.isLoggedIn
    };
  }
  ),
  on(BorkerActions.setIsLoggedOut, (state: BorkerState, action) => {
    return {
      ...state,
      isLoggedIn: action.isLoggedIn
    };
  }
  ),
  on(BorkerActions.setIsLoggedInError, (state, action) => {
    return {
      ...state,
      isLoggedIn: action.isLoggedIn
    };
  }
  ),
  on(BorkerActions.setIsLoggedOutError, (state, action) => {
    return {
      ...state,
      isLoggedIn: action.isLoggedIn
    };
  }
  ),
  on(BorkerActions.setIsLoadingError, (state, action) => {
    return {
      ...state,
      isLoading: action.isLoading
    };
  }
  ),
  on(BorkerActions.setCurrentPhotoIndex, (state, action) => {
    return {
      ...state,
      currentPhotoIndex: action.index
    }
  }),
  on(BorkerActions.setCurrentPhotoReaction, (state, action) => {
    const reactionIndex = state.currentPet.photos[state.currentPhotoIndex].reactions.findIndex(reaction => reaction.userId._id === state.user._id);
    if (reactionIndex > -1) {
      return {
        ...state,
        currentPet: {
          ...state.currentPet,
          photos: [
            ...state.currentPet.photos.slice(0, state.currentPhotoIndex),
            {
              ...state.currentPet.photos[state.currentPhotoIndex],
              reactions: [
                ...state.currentPet.photos[state.currentPhotoIndex].reactions.slice(0, reactionIndex),
                {
                  ...state.currentPet.photos[state.currentPhotoIndex].reactions[reactionIndex],
                  type: ReactionTypes[action.reactionType]
                },
                ...state.currentPet.photos[state.currentPhotoIndex].reactions.slice(reactionIndex + 1),
              ]

            },
            ...state.currentPet.photos.slice(state.currentPhotoIndex + 1),
          ]
        }
      }
    } else {
      return {
        ...state,
        currentPet: {
          ...state.currentPet,
          photos: [
            ...state.currentPet.photos.slice(0, state.currentPhotoIndex),
            {
              ...state.currentPet.photos[state.currentPhotoIndex],
              reactions: [
                {
                  userId: state.user,
                  type: ReactionTypes[action.reactionType]
                },
              ]

            },
            ...state.currentPet.photos.slice(state.currentPhotoIndex + 1),
          ]
        }
      }
    }
    return state;
  }),
  on(BorkerActions.addCurrentPhotoComment, (state, action) => {
    action.comment;
    return {
      ...state,
      currentPet: {
        ...state.currentPet,
        photos: [
          ...state.currentPet.photos.slice(0, state.currentPhotoIndex),
          {
            ...state.currentPet.photos[state.currentPhotoIndex],
            comments: [
              ...state.currentPet.photos[state.currentPhotoIndex].comments,
              action.comment
            ]
          },
          ...state.currentPet.photos.slice(state.currentPhotoIndex + 1),
        ]
      }
    }
  }),
  on(BorkerActions.prevPhoto, (state) => {
    return {
      ...state,
      currentPhotoIndex: state.currentPhotoIndex - 1
    }
  }),
  on(BorkerActions.nextPhoto, (state) => {
    return {
      ...state,
      currentPhotoIndex: state.currentPhotoIndex + 1
    }
  }),
);


