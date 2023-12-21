import Block from '../../services/Block';
import tpl from './tpl';
import { BaseProps } from '../../services/types';
import connect from '../../services/Store/Connect';
import imgUrl from '../../assets/default.jpg';
import Modal from '../modal';
import Button from '../button';
import render from '../../utils/render';
import InputBase from '../inputBase';
import Store from '../../services/Store';
import ChatController from '../../services/Controllers/ChatController';
import FormAuth from '../formAuth';
import { validateMessage } from '../../utils/validate';
import InputFile from '../inputFile';

const addUserInput = new InputBase('div', {
  type: 'text',
  name: 'addUserId',
  id: 'addUserId',
  placeholder: '',
  value: '',
  label: 'id пользователя',
  error: '',
  attrs: {
    class: 'input',
  },
  validate: validateMessage
});

const deleteUserInput = new InputBase('div', {
  type: 'text',
  name: 'deleteUserId',
  id: 'deleteUserId',
  placeholder: '',
  value: '',
  label: 'id пользователя',
  error: '',
  attrs: {
    class: 'input',
  },
  validate: validateMessage
});

const addUserForm = new FormAuth('form', {
  inputs: [addUserInput],
  button: new Button('button', {
    text: 'Добавить',
    attrs: {
      class: 'button',
    },
  }),
  events: {
    submit: async (e) => {
      e.preventDefault();

      if (addUserForm.validate()) {
        const chatId = Store.getState()?.current_chat;
        if (chatId && addUserInput.getValue()) {
          const response = await ChatController.addUserToChat({ users: [Number(addUserInput.getValue())], chatId: chatId });
          if (response.success) {
            addUserForm.setProps({ error: null });
            addUserModal.hide();
            addUserInput.setProps({value: ''});
          } else {
            addUserForm.setProps({ error: response.error?.reason });
          }
        }
      }
    },
  },
});

const deleteUserForm = new FormAuth('form', {
  inputs: [deleteUserInput],
  button: new Button('button', {
    text: 'Удалить',
    attrs: {
      class: 'button',
    },
  }),
  events: {
    submit: async (e) => {
      e.preventDefault();

      if (deleteUserForm.validate()) {
        const chatId = Store.getState()?.current_chat;
        if (chatId && deleteUserInput.getValue()) {
          const response = await ChatController.deleteUserFromChat({ users: [Number(deleteUserInput.getValue())], chatId: chatId });
          if (response.success) {
            deleteUserForm.setProps({ error: null });
            deleteUserModal.hide();
            deleteUserInput.setProps({value: ''});
          } else {
            deleteUserForm.setProps({ error: response.error?.reason });
          }
        }
      }
    },
  },
});

const addUserModal = new Modal('div', {
  title: 'Добавить в чат',
  content: addUserForm,
  closeButton: new Button('a', {
    text: 'Отмена',
    events: {
      click: () => {
        addUserModal.hide();
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

const deleteUserModal = new Modal('div', {
  title: 'Удалить из чата',
  content: deleteUserForm,
  closeButton: new Button('a', {
    text: 'Отмена',
    events: {
      click: () => {
        deleteUserModal.hide();
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

const changeAvatarModal = new Modal('div', {
  title: 'Загрузите файл',
  content: new FormAuth('form', {
    inputs: [
      new InputFile('div', {
        type: 'file',
        name: 'file',
        value: '',
        label: 'Выбрать файл на компьютере',
      })
    ],
    button: new Button('button', {
      text: 'Поменять',
      attrs: {
        class: 'button',
      },
    }),
    events: {
      submit: async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const avatar = document.getElementById('file') as HTMLInputElement;
        const chatId = Store.getState()?.current_chat;
        if (chatId && avatar && avatar.files) {
          const file = avatar.files[0];
          formData.append('avatar', file);
          formData.append('chatId', chatId.toString());
          const response = await ChatController.changeAvatar(formData);
          if (response.success) {
            changeAvatarModal.setProps({ error: null });
            changeAvatarModal.hide();
          } else {
            changeAvatarModal.setProps({ error: response.error?.reason });
          }
        }
      },
    },
  }),
  closeButton: new Button('a', {
    text: 'Отмена',
    events: {
      click: () => {
        changeAvatarModal.hide();
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

const settingsModal = new Modal('div', {
  title: '',
  content: [
    new Button('div', {
      text: 'Добавить пользователя',
      events: {
        click: () => {
          render('.modal', addUserModal);
          addUserModal.show();
          settingsModal.hide();
        },
      },
      attrs: {
        class: 'modal__btn',
      },
    }),
    new Button('div', {
      text: 'Удалить пользователя',
      events: {
        click: () => {
          render('.modal', deleteUserModal);
          deleteUserModal.show();
          settingsModal.hide();
        },
      },
      attrs: {
        class: 'modal__btn',
      },
    }),
    new Button('div', {
      text: 'Изменить аватар чата',
      events: {
        click: () => {
          render('.modal', changeAvatarModal);
          changeAvatarModal.show();
          settingsModal.hide();
        },
      },
      attrs: {
        class: 'modal__btn',
      },
    }),
    new Button('div', {
      text: 'Удалить чат',
      events: {
        click: async () => {
          const chatId = Store.getState()?.current_chat;
          if (chatId) {
            const response = await ChatController.deleteChat(chatId);
            if (response.success) {
              settingsModal.setProps({ error: null });
              settingsModal.hide();
            } else {
              settingsModal.setProps({ error: response.error?.reason });
            }
          }
        },
      },
      attrs: {
        class: 'modal__btn',
      },
    }),
  ],
  closeButton: new Button('div', {
    text: 'Отмена',
    events: {
      click: () => {
        settingsModal.hide();
      },
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
  avatar: string;
  title: string;
} & BaseProps;

class MessagesHeaderComponent extends Block<Props> {
  constructor(tagName: string, props: Props) {
    props.settingsBtn = new Button('div', {
      text: '',
      events: {
        click: () => {
          render('.modal', settingsModal);
          settingsModal.show();
        },
      },
      attrs: {
        class: 'messages__settings',
      },
    });
    super(tagName, props);
  }

  public render() {
    return this.compile(this._props.title ? tpl : '', this._props);
  }
}

const MessagesHeader = connect(MessagesHeaderComponent, (state) => {
  const currentChatId = state.current_chat;
  return {
    avatar: state.chats?.find(chat => chat.id === currentChatId)?.avatar || imgUrl,
    title: state.chats?.find(chat => chat.id === currentChatId)?.title || '',
  };
});

export default MessagesHeader;
