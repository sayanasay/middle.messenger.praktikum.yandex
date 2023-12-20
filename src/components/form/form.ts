import Block from '../../services/Block';
import { BaseProps } from '../../services/types';
import Input from '../input';

export type FormProps = {
  name?: string;
  inputs: Input[];
  button?: Block;
  'form-name'?: string;
  link?: Block;
  'link-text'?: string;
  avatar?: Block;
  buttons?: boolean;
} & BaseProps;

export default abstract class Form<Props extends FormProps = FormProps> extends Block<Props> {
  public validate(): boolean {
    const inputs = this._children.inputs as Input[];

    const errors = inputs.filter((input) => input.validate() !== '');
    if (errors.length > 0) {
      return false;
    }
    return true;
  }

  public getInputs(): Input[] {
    return this._children.inputs as Input[];
  }

  public clearInputs() {
    const inputs = this._children.inputs as Input[];

    inputs.forEach((input) => {
      input.setProps({ value: '' });
    });
  }
}
