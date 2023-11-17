import Block from '../../services/Block';
import { BaseProps } from '../../services/types';

type Props = {
  text: string;
} & BaseProps;

export default class Button extends Block<Props> {
  public render() {
    return this.compile(`{{text}}`, this._props);
  }
}
