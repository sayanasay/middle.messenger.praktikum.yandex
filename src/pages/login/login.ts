import Input from '../../components/input';
import FormAuth from '../../components/formAuth';
import Button from '../../components/button';
import CenterLayout from '../../components/layouts/center';
import { validateLogin, validatePassword } from '../../utils/validate';

const loginInput = new Input('div', {
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

const passwordInput = new Input('div', {
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
  link: '/signup',
  'link-text': 'Нет аккаунта?',
  attrs: {
    class: 'form-auth',
  },
});

export const LoginPage = new CenterLayout('main', {
  content: form,
  attrs: {
    class: 'container container-center',
  },
});
