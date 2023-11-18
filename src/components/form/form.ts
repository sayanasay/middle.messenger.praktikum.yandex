import Block from '../../services/Block';
import { BaseProps } from '../../services/types';
import Input from '../input';

type FormProps = {
  inputs: Input[];
  button?: Block;
  'form-name'?: string;
  link?: string;
  'link-text'?: string;
  avatar?: Block;
  buttons?: boolean;
} & BaseProps;

export default abstract class Form<Props extends FormProps = FormProps> extends Block<Props> {
  constructor(tagName: string, props: Props) {
    props.events = {
      submit: (e) => {
        e.preventDefault();

        if (this.validate()) {
          const formData = new FormData(e.target as HTMLFormElement);
          console.log(JSON.stringify(Object.fromEntries(formData)));
        }
      },
    };
    super(tagName, props);
  }

  public validate(): boolean {
    const inputs = this._children.inputs as Input[];

    const errors = inputs.filter((input) => input.validate() !== '');
    if (errors.length > 0) {
      return false;
    }
    return true;
  }
}
