import { Chat } from './chat';
import { chats } from '../../mock-data/data.js';
import Block from '../../services/Block';
import Search from '../../components/search';
import ChatList from '../../components/chatList';
import ChatItem from '../../components/chatItem';
import Messages from '../../components/messages';
import Message from '../../components/message';
import InputMessage from '../../components/inputMessage';
import { validateMessage } from '../../utils/validate';

const search = new Search('div', {
  name: 'search',
  value: '',
});

const chatItems: Block[] = [];
const messagesItems: Block[] = [];

chats.forEach((chat) => {
  const lastMessage = chat.messages[chat.messages.length - 1];
  const chatItem = new ChatItem('li', {
    avatar: chat.avatar,
    title: chat.title,
    time: lastMessage.time,
    text: lastMessage.text,
    unread: chat.unread,
    attrs: {
      class: 'chat-item'
    }
  });

  chatItems.push(chatItem);
})

chats[0].messages.forEach((message) => {
  const messageItem = new Message('li', {
    text: message?.text,
    file: message?.file,
    time: message.time,
    me_author: message?.me_author,
    attrs: {
      class: `message ${message?.me_author ? "message-outgoing" : ""}`
    }
  });

  messagesItems.push(messageItem);
})

const inputMessage = new InputMessage('div', {
  type: 'text',
  name: 'message',
  placeholder: 'Сообщение',
  value: '',
  validate: validateMessage,
  error: '',
  attrs: {
    class: 'input-message__container'
  }
});

const messages = new Messages('div', {
  avatar: chats[0].avatar,
  title: chats[0].title,
  messagesItems: messagesItems,
  inputMessage: inputMessage,
  attrs: {
    class: 'messages'
  }
})

const chatList = new ChatList('ul', {
  chats: chatItems,
  attrs: {
    class: 'chat-list'
  }
})

export const ChatPage = new Chat('main', {
  search: search,
  chatList: chatList,
  messages: messages,
  attrs: {
    class: 'chat'
  }
})
