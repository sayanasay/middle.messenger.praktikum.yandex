import Block from '../../services/Block';
import tpl from './tpl';
import { BaseProps } from '../../services/types';

type Props = {
  src: string,
} & BaseProps;

export default class Avatar extends Block<Props> {
  public render() {
    return this.compile(tpl, this._props);
  }
}
