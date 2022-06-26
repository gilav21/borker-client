import { IComment } from "./IComment";
import { IReaction } from "./IReaction";

export interface IPhoto {
  _id?: string,
  title: string,
  petId:string,
  url: string,
  description: string,
  comments: IComment[],
  reactions: IReaction[],
  createdAt: Date,
  createdBy: string
}
