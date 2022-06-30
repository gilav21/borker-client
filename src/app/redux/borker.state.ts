import { IPhoto } from 'src/app/models/IPhoto';
import { IUserDetails } from "../models/ILoginDetails";
import { IPet } from "../models/IPet";

export const BorkerFeatureKey = 'borker';

export interface BorkerState {
  user: IUserDetails;
  isLoggedIn: boolean;
  isLoading: boolean;
  pets: IPet[];
  currentPet: IPet;
  currentPhotoIndex: number;
}

export const initialBorkerState: BorkerState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  pets: [],
  currentPet: null,
  currentPhotoIndex: null
};
