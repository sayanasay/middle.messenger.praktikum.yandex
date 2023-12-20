import Block from '../../services/Block';
import { BaseProps } from '../../services/types';
import connect from '../../services/Store/Connect';
import Message from '../message';
import { MessageType } from '../../services/Store/types';

type Props = {
  messageItems: Message[];
} & BaseProps;

class MessagesListComponent extends Block<Props> {
  constructor(tagName: string, props: Props) {
    super(tagName, props);
  }

  public scrollToLast = () => {
    const messages = this._children.messageItems as Message[];
    if (messages.length) {
      const lastElement = (
        messages[messages.length - 1] as Block
      ).getContent() as HTMLElement;
      lastElement.scrollIntoView();
    }
  };

  public componentDidUpdate() {
    setTimeout(() => {
      this.scrollToLast();
    }, 0);
    return true;
  }

  public render() {
    return this.compile('{{{ messageItems }}}', this._props);
  }
}

const MessagesList = connect(MessagesListComponent, (state) => {
  const chatId = state.current_chat;

  if (chatId) {
    const messages = state.messages?.[chatId];
    const userId = state.user?.id;
    const messageItems =
      messages && messages.length
        ? messages.map((message: MessageType) => {
            return new Message('li', {
              text: message.content,
              time: message.time,
              attrs: {
                class: `message ${
                  userId === Number(message.user_id) ? 'message-outgoing' : ''
                }`,
              },
            });
          })
        : [];
    return {
      messageItems,
    };
  } else {
    return { messageItems: [] };
  }
});

export default MessagesList;
