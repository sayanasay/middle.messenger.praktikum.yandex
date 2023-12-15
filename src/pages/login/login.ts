import InputBase from '../../components/inputBase';
import FormAuth from '../../components/formAuth';
import Button from '../../components/button';
import { validateLogin, validatePassword } from '../../utils/validate';
import Block from '../../services/Block';
import { BaseProps } from '../../services/types';
import AuthController from '../../services/Controllers/AuthController';
import router from '../../services/Router/Router';
import { Routes } from '../../..';

const loginInput = new InputBase('div', {
  type: 'text',
  name: 'login',
  id: 'login',
  placeholder: '',
  value: '',
  label: 'Логин',
  error: '',
  attrs: {
    class: 'input',
  },
  validate: validateLogin,
});

const passwordInput = new InputBase('div', {
  type: 'password',
  name: 'password',
  id: 'password',
  placeholder: '',
  value: '',
  label: 'Пароль',
  error: '',
  attrs: {
    class: 'input',
  },
  validate: validatePassword,
});

const button = new Button('button', {
  text: 'Войти',
  attrs: {
    class: 'button',
    type: 'submit',
  },
});

const form = new FormAuth('form', {
  inputs: [loginInput, passwordInput],
  button: button,
  'form-name': 'Вход',
  link: new Button('a', {
    text: 'Нет аккаунта?',
    events: {
      click: () => {
        router.go(Routes.Signup);
      }
    },
    attrs: {
      class: 'form-auth__link',
    },
  }),
  attrs: {
    class: 'form-auth',
  },
  events: {
    submit: async (e) => {
      e.preventDefault();

      if (form.validate()) {
        const response = await AuthController.login({
          login: loginInput.getValue(),
          password: passwordInput.getValue(),
        });
        if (response.success) {
          form.setProps({ error: null });
          router.go(Routes.Messenger);
          form.clearInputs();
        } else {
          form.setProps({ error: response.error?.reason });
        }
      }
    },
  },
});

type Props = {
  content: Block;
} & BaseProps;

export class LoginPage extends Block<Props> {
  constructor(tag: string) {
    super(tag, {
      content: form,
      attrs: {
        class: 'container container-center',
      },
    });
  }

  public render() {
    return this.compile('{{{ content }}}', this._props);
  }
}
