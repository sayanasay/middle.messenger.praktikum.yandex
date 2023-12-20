import Block from '../../services/Block';
import connect from '../../services/Store/Connect';
import { BaseProps } from '../../services/types';
import tpl from './messages.tpl';
import notpl from './no-messages.tpl';
import MessagesHeader from '../../components/messagesHeader';
import MessagesList from '../../components/messagesList';
import MessageForm from '../../components/messageForm';
import InputMessage from '../../components/inputMessage';
import { validateMessage } from '../../utils/validate';
import Button from '../../components/button';
import store from '../../services/Store';
import MessagesController from '../../services/Controllers/MessagesController';
import ChatController from '../../services/Controllers/ChatController';

const inputMessage = new InputMessage('div', {
  type: 'text',
  name: 'message',
  placeholder: 'Сообщение',
  value: '',
  validate: validateMessage,
  error: '',
  attrs: {
    class: 'input-message__container',
  },
});

type Props = {
  current_chat: number | null;
  messageForm: MessageForm;
  messagesHeader: Block;
  messagesItems: Block;
} & BaseProps;

class MessagesComponent extends Block<Props> {
  constructor(tagName: string, props: Props) {
    props.messageForm = new MessageForm('form', {
      inputs: [inputMessage],
      value: '',
      sendButton: new Button('button', {
        text: '',
        type: 'submit',
        attrs: {
          class: 'messages__send',
        },
      }),
      events: {
        submit: async (e) => {
          e.preventDefault();
          const inputValue = inputMessage.getValue();
          const chatId = store.getState().current_chat;
    
          if (props.messageForm.validate()) {
            if (inputValue && chatId) {
              try {
                await MessagesController.sendMessage(chatId, inputValue);
                inputMessage.setProps({ value: '' });
                await ChatController.getChats();
              } catch (error) {
                console.log(error);
              }
            }
          }
        },
      },
      attrs: {
        class: 'messages__footer',
      },
    });
    props.messagesHeader = new MessagesHeader('div', {
      attrs: {
        class: 'messages__header',
      },
    }),
    props.messagesItems = new MessagesList('ul', {
      attrs: {
        class: 'messages__list',
      },
    }),
    super(tagName, props);
  }

  public render() {
    return this.compile(this._props.current_chat ? tpl : notpl, this._props);
  }
}

const Messages = connect(MessagesComponent, (state) => ({
  current_chat: state.current_chat || null,
}));

export default Messages;
