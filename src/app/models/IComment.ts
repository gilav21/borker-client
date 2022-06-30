import { IUserDetails } from './ILoginDetails';
import { IReaction } from "./IReaction";

export interface IComment {
  _id?: string,
  userId: IUserDetails,
  comment: string,
  reactions: IReaction[],
  comments: IComment[]
}
