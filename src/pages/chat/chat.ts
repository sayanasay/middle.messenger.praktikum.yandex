import Block from '../../services/Block';
import tpl from './tpl';
import { BaseProps } from '../../services/types';

type Props = {
  search: Block,
  chatList: Block,
  messages: Block,
} & BaseProps;

export class Chat extends Block<Props> {
  public render() {
    return this.compile(tpl, this._props);
  }
}
