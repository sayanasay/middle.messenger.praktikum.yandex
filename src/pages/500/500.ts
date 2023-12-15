import { Error } from '../../components/error';
import router from '../../services/Router/Router';
import { Routes } from '../../..';
import Button from '../../components/button';
import Block from '../../services/Block';

const content =  new Error('div', {
  title: '500',
  text:'Мы уже фиксим',
  link: new Button('a', {
    text: 'Назад к чатам',
    events: {
      click: () => {
        router.go(Routes.Messenger)
      }
    },
    attrs: {
      class: 'error__link'
    }
  }),
  attrs: {
    class: 'error'
  }
});

export class Page500 extends Block {
  constructor(tag: string) {
    super(tag, {
      content: content,
      attrs: {
        class: 'container container-center',
      },
    });
  }

  public render() {
    return this.compile('{{{ content }}}', this._props);
  }
}
