import { ChatAPI } from '../../api/ChatAPI';
import { ChangeChatUsersType } from '../../api/types';
import { Actions } from '../Store';
import MessagesController from './MessagesController';

const chatApi = new ChatAPI();

export default class ChatController {
  static async getChats() {
    try {
      const chats = await chatApi.getChats({});
      Actions.setChats(chats);
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  static async createChat(title: string) {
    try {
      await chatApi.createChat(title);
      await this.getChats();
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  static async selectChat(chatId: number) {
    Actions.setCurrentChat(chatId);
    try {
      const { token } = await this.getToken(chatId);
      await MessagesController.connect(chatId, token);
    } catch (error) {
      console.log(error);
    }
  }

  static async addUserToChat(data: ChangeChatUsersType) {
    try {
      await chatApi.addUserToChat(data);
      await this.getChats();
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  static async deleteUserFromChat(data: ChangeChatUsersType) {
    try {
      await chatApi.deleteUserFromChat(data);
      await this.getChats();
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  static async deleteChat(chatId: number) {
    try {
      await chatApi.deleteChat(chatId);
      Actions.setCurrentChat(null);
      await this.getChats();
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  static async getToken(id: number) {
    return chatApi.getToken(id);
  }
}
