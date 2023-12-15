import { AuthAPI } from '../../api/AuthAPI';
import { SignupRequestType, SigninRequestType } from '../../api/types';
import Store, { Actions } from '../Store';
import MessagesController from './MessagesController';

const authApi = new AuthAPI();

export default class AuthController {
  static async signup(data: SignupRequestType) {
    try {
      await authApi.signUp(data);
      return {
        success: true,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  }

  static async login(data: SigninRequestType) {
    Store.removeState();
    try {
      await authApi.login(data);
      await this.getUser();
      return {
        success: true,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  }

  static async getUser() {
    try {
      const user = await authApi.getUser();
      Actions.setUserData(user);
      return {
        success: true,
        error: null,
        user
      }
    } catch (error) {
      return {
        success: false,
        error: error, 
        user: null
      }
    }
  }

  static async logout() {
    try {
      await authApi.logout();
      Store.removeState();
      MessagesController.closeAll();
      return {
        success: true,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  }
}
