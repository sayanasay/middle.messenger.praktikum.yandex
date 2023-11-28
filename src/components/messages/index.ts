import Block from '../../services/Block';
import tpl from './tpl';
import { BaseProps } from '../../services/types';

type Props = {
  avatar: string,
  title: string,
  messagesItems: Block[],
  inputMessage: Block,
} & BaseProps;

export default class Messages extends Block<Props> {
  public render() {
    return this.compile(tpl, this._props);
  }
}
