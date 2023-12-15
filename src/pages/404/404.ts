import Button from '../../components/button';
import { Error } from '../../components/error';
import Block from '../../services/Block';
import router from '../../services/Router/Router';
import { Routes } from '../../..';

const content =  new Error('div', {
  title: '404',
  text:'Не туда попали',
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

export class Page404 extends Block {
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
