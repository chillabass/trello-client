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
