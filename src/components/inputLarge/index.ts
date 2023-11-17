import Block from '../../services/Block';
import tpl from './tpl';
import { BaseProps } from '../../services/types';

type Props = {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  label: string;
  error?: string;
  validate?: (value: string) => string;
} & BaseProps;

export default class InputLarge extends Block<Props> {
  constructor(tagName: string, props: Props) {
    props.events = {
      ...props.events,
      blur: () => {
        if (this._props.validate) { 
          this.validate();
        }
      },
    };
    super(tagName, props);
  }
  

  public addEvents() {
    const { events = {} } = this._props;
    const input = this._element && this._element.querySelector('input');
    if (!events) return;
    for (const [key, event] of Object.entries(events)) {
      input && input.addEventListener(key, event);
    }
  }

  public getValue() {
    return (this._element.querySelector('input') as HTMLInputElement).value;
  }

  public validate(): string {
    const input = this._element.querySelector('input');
    this._props.error = '';

    if (input) {
      const value = input.value;
      const error = this._props.validate?.(value.trim());
      this._props.value = value;
      this._props.error = error || '';
      this.setProps(this._props);
    }
    return this._props.error;
  }

  public render() {
    return this.compile(tpl, this._props);
  }
}
