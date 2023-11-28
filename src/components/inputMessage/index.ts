import tpl from './tpl';
import Input from '../input';

export default class InputMessage extends Input {
  public render() {
    return this.compile(tpl, this._props);
  }
}
