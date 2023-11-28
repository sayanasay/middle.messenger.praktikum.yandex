import Block from '../../../services/Block';
import tpl from './tpl';

export default class ProfileLayout extends Block {
  public render() {
    return this.compile(tpl, this._props);
  }
}
