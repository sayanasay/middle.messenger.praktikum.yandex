import { BASE_API } from '../../API_URL';
import Store from './Store';
import { Chat, MessageType, User } from './types';

const store = new Store();

const setUserData = (user: User | null) => {
  if (user) {
    const avatar = user.avatar ? `${BASE_API}/resources${user.avatar}` : null;
    store.set('user', { ...user, avatar });
  } else {
    store.set('user', null);
  }
};

const setChats = (chats: Chat[]) => {
  chats = chats.map((chat) => {
    return {
      ...chat,
      avatar: chat.avatar ? `${BASE_API}/resources${chat.avatar}` : null,
    };
  });
  store.set('chats', chats);
  const currentChat = store.getState().current_chat;
  if (currentChat) {
    if (!chats.find((chat) => chat.id === currentChat)) {
      store.set('current_chat', null);
    }
  }
};

const setCurrentChat = (id: number | null) => {
  store.set('current_chat', id);
};

const addMessages = (chatId: number, messages: MessageType[]) => {
  const currentMessages = store.getState().messages?.[chatId] || [];
  store.set(`messages.${chatId}`, [...currentMessages, ...messages]);
};

export { setUserData, setChats, setCurrentChat, addMessages };
