export interface ILoginDetails {
  token: string | undefined | null,
  expiresIn: number | undefined | null,
  user: IUserDetails | undefined | null
}

export interface IUserDetails {
  _id?: string,
  email: string,
  userName: string,
  firstName: string,
  lastName: string,
  profilePhoto?: string,
  createdAt?: string
}
