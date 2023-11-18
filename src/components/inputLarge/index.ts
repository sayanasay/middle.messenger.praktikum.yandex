import tpl from './tpl';
import Input from '../input';

export default class InputLarge extends Input {
  public render() {
    return this.compile(tpl, this._props);
  }
}
