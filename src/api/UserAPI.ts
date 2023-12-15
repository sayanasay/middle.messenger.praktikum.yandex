import HTTPTransport from '../services/HTTTPTransport';
import { User } from '../services/Store/types';
import { ChangePasswordRequestType, ChangeProfileRequestType, SearchUserRequestType } from './types';

export class UserAPI {
  private authAPIInstance = new HTTPTransport('/user');

  public changeProfile(data: ChangeProfileRequestType): Promise<User> {
    return this.authAPIInstance.put('/profile', { data });
  }

  public changePassword(data: ChangePasswordRequestType) {
    return this.authAPIInstance.put('/password', { data });
  }

  public changeAvatar(data: FormData): Promise<User> {
    return this.authAPIInstance.put('/profile/avatar', { data });
  }

  public getUserById(id: number) {
    return this.authAPIInstance.get(`/:${id}`);
  }

  public searchUsers(data: SearchUserRequestType) {
    return this.authAPIInstance.post('/search', { data });
  }
}
