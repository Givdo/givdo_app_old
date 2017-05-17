import { User } from '../user/user';

export interface Session {
  user: User,
  token: string,
  expiresIn: string,
}
