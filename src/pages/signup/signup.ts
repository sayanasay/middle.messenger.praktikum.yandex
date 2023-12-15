import InputBase from '../../components/inputBase';
import FormAuth from '../../components/formAuth';
import Button from '../../components/button';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from '../../utils/validate';
import Block from '../../services/Block';
import { BaseProps } from '../../services/types';
import AuthController from '../../services/Controllers/AuthController';
import router from '../../services/Router/Router';
import { Routes } from '../../..';

const emailInput = new InputBase('div', {
  type: 'text',
  name: 'email',
  id: 'email',
  placeholder: '',
  value: '',
  label: 'Почта',
  error: '',
  attrs: {
    class: 'input',
  },
  validate: validateEmail,
});

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

const firstNameInput = new InputBase('div', {
  type: 'text',
  name: 'first_name',
  id: 'first_name',
  placeholder: '',
  value: '',
  label: 'Имя',
  error: '',
  attrs: {
    class: 'input',
  },
  validate: validateName,
});

const secondNameInput = new InputBase('div', {
  type: 'text',
  name: 'second_name',
  id: 'second_name',
  placeholder: '',
  value: '',
  label: 'Фамилия',
  error: '',
  attrs: {
    class: 'input',
  },
  validate: validateName,
});

const phoneInput = new InputBase('div', {
  type: 'text',
  name: 'phone',
  id: 'phone',
  placeholder: '',
  value: '',
  label: 'Телефон',
  error: '',
  attrs: {
    class: 'input',
  },
  validate: validatePhone,
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

const passwordRepeatInput = new InputBase('div', {
  type: 'password',
  name: 'password',
  id: 'password-repeat',
  placeholder: '',
  value: '',
  label: 'Пароль (еще раз)',
  error: '',
  attrs: {
    class: 'input',
  },
  validate: validatePassword,
});

passwordRepeatInput.validate = () => {
  passwordRepeatInput.setProps({
    value: passwordRepeatInput.getValue(),
    error: '',
  });
  const error = validatePassword(passwordRepeatInput.getValue());
  if (error) {
    passwordRepeatInput.setProps({
      value: passwordRepeatInput.getValue(),
      error,
    });
    return error;
  } else {
    const isPasswordEqual =
      passwordInput.getValue() === passwordRepeatInput.getValue();
    if (!isPasswordEqual) {
      passwordRepeatInput.setProps({
        value: passwordRepeatInput.getValue(),
        error: 'Пароли не совпадают',
      });
      return 'Пароли не совпадают';
    } else {
      return '';
    }
  }
};

const button = new Button('button', {
  text: 'Зарегистрироваться',
  attrs: {
    class: 'button',
    type: 'submit',
  },
});

const form = new FormAuth('form', {
  inputs: [
    emailInput,
    loginInput,
    firstNameInput,
    secondNameInput,
    phoneInput,
    passwordInput,
    passwordRepeatInput,
  ],
  button: button,
  'form-name': 'Регистрация',
  link: new Button('a', {
    text: 'Войти',
    events: {
      click: () => {
        router.go(Routes.Login);
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
        const response = await AuthController.signup({
          email: emailInput.getValue(),
          login: loginInput.getValue(),
          first_name: firstNameInput.getValue(),
          second_name: secondNameInput.getValue(),
          phone: phoneInput.getValue(),
          password: passwordInput.getValue(),
        });
        if (response.success) {
          form.setProps({ error: null });
          form.clearInputs();
          router.go(Routes.Login);
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

export class SignupPage extends Block<Props> {
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
