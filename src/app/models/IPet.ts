import { IPhoto } from 'src/app/models/IPhoto';
import { IUserDetails } from './ILoginDetails';
export interface IPet {
  _id?: string,
  name: string,
  owners: IUserDetails[],
  photos: IPhoto [],
  profilePhoto: IPhoto,
  description: string,
  createdBy?: IUserDetails,
  createdAt?: string
}

export interface IPetCreatable {
  _id?: string,
  name: string,
  owners: string[],
  photos: string [],
  profilePhoto: string,
  description: string,
  createdBy?: string,
  createdAt?: string
}
