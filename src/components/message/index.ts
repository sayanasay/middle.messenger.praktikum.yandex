import Block from '../../services/Block';
import tpl from './tpl';
import { BaseProps } from '../../services/types';

type Props = {
  text?: string,
  file?: string,
  time: string,
  me_author?: string
} & BaseProps;

export default class Message extends Block<Props> {
  public render() {
    return this.compile(tpl, this._props);
  }
}
