import { IUserDetails } from './ILoginDetails';
export interface IReaction {
  type: string,
  userId: IUserDetails
}

export enum ReactionTypes {
  Smile,
  Laugh,
  Hearts,
  Angry
}
