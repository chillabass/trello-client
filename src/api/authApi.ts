import { IUser } from '../types/user';
import api from './index';

const path = '/auth';

const signIn = (data: { email: string; password: string }): Promise<{ user: IUser; token: string; }> => {
  return api.post(
    `${path}/sign-in`,
    data
  );
}

export default {
  signIn,
};
