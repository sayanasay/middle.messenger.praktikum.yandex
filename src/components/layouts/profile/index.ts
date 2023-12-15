import Block from '../../../services/Block';
import tpl from './tpl';
import { BaseProps } from '../../../services/types';
import Button from '../../button';
import router from '../../../services/Router/Router';
import { Routes } from '../../../..';

export default class ProfileLayout extends Block<BaseProps> {
  constructor(tagName: string, props: BaseProps) {
    props.toChatButton = new Button('div', {
      text: '',
      events: {
        click: () => {
          router.go(Routes.Messenger);
        },
      },
      attrs: {
        class: 'left',
      },
    });
    props.attrs = {
      class: 'container',
    };
    super(tagName, props);
  }

  public render() {
    return this.compile(tpl, this._props);
  }
}
