import { WSTransport, WSTransportEvents } from '../WSTransport';
import Store from '../Store';
import { addMessages } from '../Store/Actions';
import { MessageType } from '../Store/types';

export default class MessagesController {
  private static sockets: Map<number, WSTransport> = new Map();

  static async connect(chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return;
    }

    const userId = Store.getState().user?.id;

    const transport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );
    this.sockets.set(chatId, transport);
    await transport.connect();
    this.subscribe(transport, chatId);
    this.fetchOldMessages(chatId);
  }

  static sendMessage(chatId: number, message: string) {
    const socket = this.sockets.get(chatId);

    if (!socket) {
      throw new Error(`Чат ${chatId} не подключен`);
    }

    socket.send({
      type: 'message',
      content: message,
    });
  }

  static fetchOldMessages(chatId: number) {
    const socket = this.sockets.get(chatId);

    if (!socket) {
      throw new Error(`Чат ${chatId} не подключен`);
    }

    socket.send({
      type: 'get old',
      content: '0',
    });
  }

  static onMessage(chatId: number, messages: MessageType | MessageType[]) {
    const newMessages = Array.isArray(messages) ? messages.reverse() : [messages];
    addMessages(chatId, newMessages);
  }

  static onClose(chatId: number) {
    this.sockets.delete(chatId);
  }

  static closeAll() {
    for (const [, socket] of this.sockets) {
      socket.close();
    }
  }

  static subscribe(transport: WSTransport, chatId: number) {
    transport.on(WSTransportEvents.Message, (message: MessageType) => {
      this.onMessage(chatId, message);
    });
    transport.on(WSTransportEvents.Close, () => this.onClose(chatId));
  }
}
