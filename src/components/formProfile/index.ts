import tpl from './tpl';
import Form from '../form/form';

export default class FormProfile extends Form { 
  public render() {
    return this.compile(tpl, this._props);
  }
}
