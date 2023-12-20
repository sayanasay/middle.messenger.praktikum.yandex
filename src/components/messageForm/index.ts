import tpl from './tpl';
import Form, { FormProps } from '../form/form';
import Block from '../../services/Block';

type Props = {
  sendButton: Block,
} & FormProps;

export default class MessageForm extends Form<Props> {
  public render() {
    return this.compile(tpl, this._props);
  }
}
