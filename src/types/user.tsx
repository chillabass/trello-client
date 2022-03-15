export interface IUser {
  id: number;
  login: string;
  email: string;
  fullName: string;
  role: string;
};

export interface IUserData {
  user: IUser;
  token: string;
  message?: string;
};
