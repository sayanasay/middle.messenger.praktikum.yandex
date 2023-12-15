import Block from '../../../services/Block';
import { BaseProps } from '../../../services/types';

type Props = {
  content: Block,
} & BaseProps;

export default class CenterLayout extends Block<Props> {
  constructor(tagName: string, props: Props) {
    super(tagName, props);
  }
  public render() {
    return this.compile('{{{ content }}}', this._props);
  }
}
