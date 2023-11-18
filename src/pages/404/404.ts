import { Error } from '../../components/error';
import CenterLayout from '../../components/layouts/center';

const content =  new Error('div', {
  title: '404',
  text:'Не туда попали',
  link: '/',
  'link-text': 'Назад к чатам',
  attrs: {
    class: 'error'
  }
});

export const Page404 = new CenterLayout('main', {
  content: content,
  attrs: {
    class: 'container container-center',
  },
});
