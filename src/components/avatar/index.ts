import Block from '../../services/Block';
import tpl from './tpl';
import { BaseProps } from '../../services/types';
import render from '../../utils/render';
import Modal from '../modal';
import InputFile from '../inputFile';
import Button from '../button';
import UserController from '../../services/Controllers/UserController';
import FormAuth from '../formAuth';

type Props = {
  src: string;
} & BaseProps;

const changeAvatarModal = new Modal('div', {
  title: 'Загрузите файл',
  content: new FormAuth('form', {
    inputs: [
      new InputFile('div', {
        type: 'file',
        name: 'file',
        value: '',
        label: 'Выбрать файл на компьютере',
      })
    ],
    button: new Button('button', {
      text: 'Поменять',
      attrs: {
        class: 'button',
      },
    }),
    events: {
      submit: async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const avatar = document.getElementById('file') as HTMLInputElement;
        if (avatar && avatar.files) {
          const file = avatar.files[0];
          formData.append('avatar', file);
          const response = await UserController.changeAvatar(formData);
          if (response.success) {
            changeAvatarModal.setProps({ error: null });
            changeAvatarModal.hide();
          } else {
            changeAvatarModal.setProps({ error: response.error?.reason });
          }
        }
      },
    },
  }),
  closeButton: new Button('a', {
    text: 'Отмена',
    events: {
      click: () => {
        changeAvatarModal.hide();
      }
    },
    attrs: {
      class: 'modal__close-btn',
    },
  }),
  attrs: {
    class: 'modal__content',
  },
});

export default class Avatar extends Block<Props> {
  constructor(tagName: string, props: Props) {
    (props.events = {
      click: () => {
        render('.modal', changeAvatarModal);
        changeAvatarModal.show();
      },
    }),
      (props.attrs = {
        class: 'avatar',
      });
    super(tagName, props);
  }

  public render() {
    return this.compile(tpl, this._props);
  }
}
