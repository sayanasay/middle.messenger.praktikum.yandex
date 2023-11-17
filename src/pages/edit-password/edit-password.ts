import ProfileLayout from '../../components/layouts/profile';
import Button from '../../components/button';
import InputLarge from '../../components/inputLarge';
import FormProfile from '../../components/formProfile';
import Avatar from '../../components/avatar';
import { validatePassword } from '../../utils/validate';
import imgUrl from '../../assets/default.jpg';

const oldPasswordInput = new InputLarge('label', {
  type: 'password',
  name: 'oldPassword',
  id: 'oldPassword',
  placeholder: '',
  value: '',
  label: 'Старый пароль',
  error: '',
  attrs: {
    class: 'input-large',
  },
  validate: validatePassword
});

const newPasswordInput = new InputLarge('label', {
  type: 'password',
  name: 'newPassword',
  id: 'newPassword',
  placeholder: '',
  value: '',
  label: 'Новый пароль',
  error: '',
  attrs: {
    class: 'input-large',
  },
  validate: validatePassword
});

const passwordRepeatInput = new InputLarge('label', {
  type: 'password',
  name: 'newPassword',
  id: 'newPassword-repeat',
  placeholder: '',
  value: '',
  label: 'Повторите новый пароль',
  error: '',
  attrs: {
    class: 'input-large',
  },
  validate: validatePassword
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
      newPasswordInput.getValue() === passwordRepeatInput.getValue();
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
  text: 'Сохранить',
  attrs: {
    class: 'button',
    type: 'submit',
  },
});

const avatar = new Avatar('div', {
  src: imgUrl,
  attrs: {
    class: 'avatar'
  }
});

const form = new FormProfile('div', {
  inputs: [oldPasswordInput, newPasswordInput, passwordRepeatInput],
  button: button,
  avatar: avatar,
  attrs: {
    class: 'profile',
  },
});

export const EditPassword = new ProfileLayout('main', {
  content: form,
  attrs: {
    class: 'container'
  }
})
