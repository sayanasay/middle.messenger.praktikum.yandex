import tpl from './tpl';
import Block from '../../services/Block';
import { BaseProps } from '../../services/types';
import Input from '../input';

type Props = {
  inputs: Block[];
  button?: Block;
  buttons?: boolean;
} & BaseProps;

export default class FormProfile extends Block<Props> {
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
  
  public render() {
    return this.compile(tpl, this._props);
  }
}
