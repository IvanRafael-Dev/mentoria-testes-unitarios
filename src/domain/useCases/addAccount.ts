import { AccountModel } from '../models/Account';
import { User } from '../models/User';

export interface AddAccount {
  register (user: User): Promise<AccountModel>
}
