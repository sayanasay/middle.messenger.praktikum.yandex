import Block from '../../services/Block';
import tpl from './tpl';
import { BaseProps } from '../../services/types';

type Props = {
  avatar: string,
  title: string,
  time: string,
  text: string | undefined,
  unread: number,
} & BaseProps;

export default class ChatItem extends Block<Props> {
  public render() {
    return this.compile(tpl, this._props);
  }
}
