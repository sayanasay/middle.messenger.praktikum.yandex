import Block from '../../services/Block';
import { BaseProps } from '../../services/types';
import ChatItem from '../chatItem';
import connect from '../../services/Store/Connect';
import ChatController from '../../services/Controllers/ChatController';
import imgUrl from '../../assets/default.jpg';
import isEqual from '../../utils/isEqual';
import { Chat } from '../../services/Store/types';

type Props = {
  chats: Chat[];
} & BaseProps;

const createItems = (props: Props): ChatItem[] => {
  return props.chats.map((chat) => {
    return new ChatItem('li', {
      avatar: chat.avatar || imgUrl,
      title: chat.title,
      time: chat.last_message?.time,
      text: chat.last_message?.content,
      unread: chat.unread_count,
      events: {
        click: async () => {
          ChatController.selectChat(chat.id);
        },
      },
      attrs: {
        class: 'chat-item',
      },
    });
  });
};

class ChatListComponent extends Block<Props> {
  constructor(tagName: string, props: Props) {
    props.chatItems = createItems(props);
    super(tagName, props);
  }

  public componentDidMount() {
    ChatController.getChats();
  }

  public componentDidUpdate(oldProps: Props, newProps: Props) {
    this._children.chatItems = createItems(newProps);
    return !isEqual(oldProps, newProps);
  }

  public render() {
    return this.compile('{{{ chatItems }}}', this._props);
  }
}

const ChatList = connect(ChatListComponent, (state) => ({
  chats: [...(state.chats || [{}])],
}));

export default ChatList;
