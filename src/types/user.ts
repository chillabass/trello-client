export interface IUser {
  id: number;
  login: string;
  email: string;
  fullName: string;
  role: string;
  avatar: string;
};

export interface IUserData {
  user: IUser;
  token: string;
  message?: string;
};

export interface IFetchSignUp {
  [login: string]: string;
  email: string;
  password: string;
  confirm: string;
  fullName: string;
};

export interface IFetchSignIn {
  login: string;
  password: string;
};

export interface IFetchEditProfile {
  fullName?: string;
  password?: string;
};

export interface IFetchChangeAvatar {
  name: string;
  file: Blob | string;
};
