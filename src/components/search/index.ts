import Block from '../../services/Block';
import tpl from './tpl';
import { BaseProps } from '../../services/types';

type Props = {
  name: string,
  value?: string,
} & BaseProps;

export default class Search extends Block<Props> {
  public render() {
    return this.compile(tpl, this._props);
  }
}
