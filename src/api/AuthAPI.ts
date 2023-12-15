import HTTPTransport from '../services/HTTTPTransport';
import { User } from '../services/Store/types';
import { SigninRequestType, SignupRequestType } from './types';

export class AuthAPI {
  private authAPIInstance = new HTTPTransport('/auth');

  public signUp(data: SignupRequestType) {
    return this.authAPIInstance.post('/signup', { data });
  }

  public login(data: SigninRequestType) {
    return this.authAPIInstance.post('/signin', { data });
  }

  public getUser(): Promise<User> {
    return this.authAPIInstance.get('/user');
  }

  public logout() {
    return this.authAPIInstance.post('/logout ');
  }
}
