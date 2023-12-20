import Block from '../../services/Block';
import Search from '../../components/search';
import ChatList from '../../components/chatList';
import { validateMessage } from '../../utils/validate';
import tpl from './tpl';
import Button from '../../components/button';
import ChatController from '../../services/Controllers/ChatController';
import Modal from '../../components/modal';
import InputBase from '../../components/inputBase';
import render from '../../utils/render';
import { BaseProps } from '../../services/types';
import router from '../../services/Router/Router';
import { Routes } from '../../..';
import FormAuth from '../../components/formAuth';
import Messages from './messages';
import { Actions } from '../../services/Store';

const search = new Search('div', {
  name: 'search',
  value: '',
});

const chatTitleInput = new InputBase('div', {
  type: 'text',
  name: 'title',
  id: 'chatName',
  placeholder: '',
  value: '',
  label: 'название чата',
  error: '',
  attrs: {
    class: 'input',
  },
  validate: validateMessage,
});

const createChatForm = new FormAuth('form', {
  inputs: [chatTitleInput],
  button: new Button('button', {
    text: 'Создать',
    type: 'submit',
    attrs: {
      class: 'button',
    },
  }),
  events: {
    submit: async (e) => {
      e.preventDefault();

      if (createChatForm.validate()) {
        const response = await ChatController.createChat(
          chatTitleInput.getValue()
        );
        if (response.success) {
          createChatForm.setProps({ error: null });
          createChatModal.hide();
          chatTitleInput.setProps({value: ''});
        } else {
          createChatForm.setProps({ error: response.error?.reason });
        }
      }
    },
  },
});

const createChatModal = new Modal('div', {
  title: 'Название чата',
  content: createChatForm,
  closeButton: new Button('a', {
    text: 'Отмена',
    events: {
      click: () => {
        createChatModal.hide();
      }
    },
    attrs: {
      class: 'modal__close-btn',
    },
  }),
  attrs: {
    class: 'modal__content',
  },
});

type Props = {
  createChatBtn: Button;
  search: Search;
  messages: Block;
} & BaseProps;

export class ChatPage extends Block<Props> {
  constructor(tagName: string) {
    super(tagName, {
      createChatBtn: new Button('button', {
        text: 'Создать чат',
        events: {
          click: () => {
            render('.modal', createChatModal);
            createChatModal.show();
          },
        },
        attrs: {
          class: 'chat__create',
        },
      }),
      profileLink: new Button('div', {
        text: 'Профиль',
        events: {
          click: () => {
            router.go(Routes.Settings);
          },
        },
        attrs: {
          class: 'chat__create',
        },
      }),
      search: search,
      chatList: new ChatList('ul', {
        attrs: {
          class: 'chat-list',
        },
      }),
      messages: new Messages('div', {
        attrs: {
          class: 'messages',
        },
      }),
      attrs: {
        class: 'chat',
      },
    });
  }

  public componentDidMount(): void {
    Actions.setCurrentChat(null);
  }

  public render() {
    return this.compile(tpl, this._props);
  }
}
