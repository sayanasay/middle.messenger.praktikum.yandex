import ProfileLayout from '../../components/layouts/profile';
import Button from '../../components/button';
import InputLarge from '../../components/inputLarge';
import FormProfile from '../../components/formProfile';
import Avatar from '../../components/avatar';
import { validateEmail, validateLogin, validateName, validatePhone } from '../../utils/validate';
import imgUrl from '../../assets/default.jpg';

const emailInput = new InputLarge('label', {
  type: 'text',
  name: 'email',
  id: 'email',
  placeholder: '',
  value: 'pochta@yandex.ru',
  label: 'Почта',
  error: '',
  attrs: {
    class: 'input-large',
  },
  validate: validateEmail
});

const loginInput = new InputLarge('label', {
  type: 'text',
  name: 'login',
  id: 'login',
  placeholder: '',
  value: 'dowjones',
  label: 'Логин',
  error: '',
  attrs: {
    class: 'input-large',
  },
  validate: validateLogin
});

const firstNameInput = new InputLarge('label', {
  type: 'text',
  name: 'first_name',
  id: 'first_name',
  placeholder: '',
  value: 'Dow',
  label: 'Имя',
  error: '',
  attrs: {
    class: 'input-large',
  },
  validate: validateName,
});

const secondNameInput = new InputLarge('label', {
  type: 'text',
  name: 'second_name',
  id: 'second_name',
  placeholder: '',
  value: 'Jones',
  label: 'Фамилия',
  error: '',
  attrs: {
    class: 'input-large',
  },
  validate: validateName,
});


const displayNameInput = new InputLarge('label', {
  type: 'text',
  name: 'display_name',
  id: 'display_name',
  placeholder: '',
  value: 'Dow',
  label: 'Имя в чате',
  error: '',
  attrs: {
    class: 'input-large',
  },
  validate: validateName,
});

const phoneInput = new InputLarge('label', {
  type: 'text',
  name: 'phone',
  id: 'phone',
  placeholder: '',
  value: '+70000000000',
  label: 'Телефон',
  error: '',
  attrs: {
    class: 'input-large',
  },
  validate: validatePhone,
});


const button = new Button('button', {
  text: 'Сохранить',
  attrs: {
    class: 'button',
    type: 'submit'
  },
});

const avatar = new Avatar('div', {
  src: imgUrl,
  attrs: {
    class: 'avatar'
  }
});

const form = new FormProfile('div', {
  inputs: [emailInput, loginInput, firstNameInput, secondNameInput, displayNameInput, phoneInput],
  button: button,
  avatar: avatar,
  attrs: {
    class: 'profile',
  },
});


export const ProfileEditPage = new ProfileLayout('main', {
  content: form,
  attrs: {
    class: 'container'
  }
})
