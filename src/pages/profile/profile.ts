import ProfileLayout from '../../components/layouts/profile';
import InputLarge from '../../components/inputLarge';
import FormProfile from '../../components/formProfile';
import Avatar from '../../components/avatar';
import imgUrl from '../../assets/default.jpg';

const emailInput = new InputLarge('label', {
  type: 'text',
  name: 'email',
  id: 'email',
  placeholder: '',
  value: 'pochta@yandex.ru',
  label: 'Почта',
  error: '',
  readonly: 'true',
  attrs: {
    class: 'input-large',
  },
});

const loginInput = new InputLarge('label', {
  type: 'text',
  name: 'login',
  id: 'login',
  placeholder: '',
  value: 'dowjones',
  label: 'Логин',
  error: '',
  readonly: 'true',
  attrs: {
    class: 'input-large',
  },
});

const firstNameInput = new InputLarge('label', {
  type: 'text',
  name: 'first_name',
  id: 'first_name',
  placeholder: '',
  value: 'Dow',
  label: 'Имя',
  error: '',
  readonly: 'true',
  attrs: {
    class: 'input-large',
  },
});

const secondNameInput = new InputLarge('label', {
  type: 'text',
  name: 'second_name',
  id: 'second_name',
  placeholder: '',
  value: 'Jones',
  label: 'Фамилия',
  error: '',
  readonly: 'true',
  attrs: {
    class: 'input-large',
  },
});

const displayNameInput = new InputLarge('label', {
  type: 'text',
  name: 'display_name',
  id: 'display_name',
  placeholder: '',
  value: 'Dow',
  label: 'Имя в чате',
  error: '',
  readonly: 'true',
  attrs: {
    class: 'input-large',
  },
});

const phoneInput = new InputLarge('label', {
  type: 'text',
  name: 'phone',
  id: 'phone',
  placeholder: '',
  value: '+70000000000',
  label: 'Телефон',
  error: '',
  readonly: 'true',
  attrs: {
    class: 'input-large',
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
  avatar: avatar,
  buttons: true,
  attrs: {
    class: 'profile',
  },
});

export const ProfilePage = new ProfileLayout('main', {
  content: form,
  attrs: {
    class: 'container'
  }
})
