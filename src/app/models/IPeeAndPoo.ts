export interface IPeeAndPoo {
  _id?: string,
  petId: string,
  quality: string,
  type: PeeAndPooTypes,
  photos: string[],
  location: string,
  description: string,
  createdBy?: string,
  createdAt?: string
}

export enum PeeAndPooTypes {
  Pee,
  Poo
}
