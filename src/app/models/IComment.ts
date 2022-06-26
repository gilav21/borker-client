import { IUserDetails } from './ILoginDetails';
import { IReaction } from "./IReaction";

export interface IComment {
  userId: IUserDetails,
  comment: string,
  reactions: IReaction[],
  comments: IComment[]
}
