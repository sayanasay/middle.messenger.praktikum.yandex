import Input from '../input';
import tpl from './tpl';

export default class InputFile extends Input {
  public render() {
    return this.compile(tpl, this._props);
  }
}
