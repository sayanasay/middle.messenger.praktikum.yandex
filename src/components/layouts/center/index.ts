import Block from '../../../services/Block';
import { BaseProps } from '../../../services/types';

type Props = {
  content: Block,
} & BaseProps;

export default class CenterLayout extends Block<Props> {
  public render() {
    return this.compile('{{{ content }}}', this._props);
  }
}
