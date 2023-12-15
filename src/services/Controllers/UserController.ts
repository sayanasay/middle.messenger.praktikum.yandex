import { UserAPI } from '../../api/UserAPI';
import { ChangePasswordRequestType, ChangeProfileRequestType, SearchUserRequestType } from '../../api/types';
import { Actions } from '../Store';

const userApi = new(UserAPI);

export default class UserController {
  static async changeProfile(data: ChangeProfileRequestType) {
    try {
      const user = await userApi.changeProfile(data);
      Actions.setUserData(user);
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

  static async changePassword(data: ChangePasswordRequestType) {
    try {
      await userApi.changePassword(data);
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

  static async changeAvatar(data: FormData) {
    try {
      const user = await userApi.changeAvatar(data);
      Actions.setUserData(user);
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

  static async searchUsers(data: SearchUserRequestType) {
    try {
      userApi.searchUsers(data);
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
