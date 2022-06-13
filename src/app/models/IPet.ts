export interface IPet {
  _id?: string,
  name: string,
  owners: string[],
  photos: string [],
  profilePhoto: string,
  description: string,
  createdBy?: string,
  createdAt?: string
}
