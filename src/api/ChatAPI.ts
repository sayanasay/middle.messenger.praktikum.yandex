import HTTPTransport from '../services/HTTTPTransport';
import { Chat } from '../services/Store/types';
import { ChangeChatUsersType, GetChatsRequestType } from './types';

export class ChatAPI {
  private authAPIInstance = new HTTPTransport('/chats');

  public getChats(data: GetChatsRequestType): Promise<Chat[]> {
    return this.authAPIInstance.get('', { data });
  }

  public createChat(title: string) {
    return this.authAPIInstance.post('', { data: { title } });
  }

  public addUserToChat(data: ChangeChatUsersType) {
    return this.authAPIInstance.put('/users', { data });
  }

  public deleteUserFromChat(data: ChangeChatUsersType) {
    return this.authAPIInstance.delete('/users', { data });
  }

  public deleteChat(chatId: number) {
    return this.authAPIInstance.delete('', { data: { chatId } });
  }

  public changeChatAvatar(data: { chatId: number; avatar: FormData }) {
    return this.authAPIInstance.put('/avatar', { data });
  }

  public getToken(id: number): Promise<{ token: string }> {
    return this.authAPIInstance.post(`/token/${id}`);
  }
}
