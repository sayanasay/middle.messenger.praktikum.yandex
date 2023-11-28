import { Error } from '../../components/error';
import CenterLayout from '../../components/layouts/center';

const content =  new Error('div', {
  title: '500',
  text:'Мы уже фиксим',
  link: '/',
  'link-text': 'Назад к чатам',
  attrs: {
    class: 'error'
  }
});

export const Page500 = new CenterLayout('main', {
  content: content,
  attrs: {
    class: 'container container-center',
  },
});
