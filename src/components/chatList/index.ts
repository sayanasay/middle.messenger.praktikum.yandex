import Block from '../../services/Block';
import { BaseProps } from '../../services/types';

type Props = {
  chats: Block[]
} & BaseProps;

export default class ChatList extends Block<Props> {
  public render() {
    return this.compile('{{{ chats }}}', this._props);
  }
}
