import tpl from './tpl';
import Block from '../../services/Block';

export default class Modal extends Block {
  public render() {
    return this.compile(tpl, this._props)
  }
}
