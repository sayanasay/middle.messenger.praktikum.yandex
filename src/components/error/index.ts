import Block from '../../services/Block';
import tpl from './tpl';
import { BaseProps } from '../../services/types';

type Props = {
  title: string,
  text: string,
  link: string,
  'link-text': string
} & BaseProps;

export class Error extends Block<Props> {
  public render() {
    return this.compile(tpl, this._props);
  }
}
