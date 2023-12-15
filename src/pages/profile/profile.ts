import InputLarge from '../../components/inputLarge';
import FormProfile from '../../components/formProfile';
import Avatar from '../../components/avatar';
import imgUrl from '../../assets/default.jpg';
import Block from '../../services/Block';
import { BaseProps } from '../../services/types';
import Button from '../../components/button';
import AuthController from '../../services/Controllers/AuthController';
import connect from '../../services/Store/Connect';
import tpl from './tpl';
import router from '../../services/Router/Router';
import { Routes } from '../../..';
import isEqual from '../../utils/isEqual';

const emailInput = new InputLarge('label', {
  type: 'text',
  name: 'email',
  id: 'email',
  placeholder: '',
  value: '',
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
  value: '',
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
  value: '',
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
  value: '',
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
  value: '',
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
  value: '',
  label: 'Телефон',
  error: '',
  readonly: 'true',
  attrs: {
    class: 'input-large',
  },
});

type Props = {
  avatarImage: Avatar,
  form: FormProfile,
  buttons: boolean,
  editProfileBtn: Button,
  editPasswordBtn: Button,
  logoutBtn: Button
} & BaseProps;

class ProfilePage extends Block<Props> {
  constructor(tagName: string, props: Props) {
    (props.avatarImage = new Avatar('div', {
      src: props.avatar || imgUrl,
    })),
    (props.form = new FormProfile('form', {
      inputs: [
        emailInput,
        loginInput,
        firstNameInput,
        secondNameInput,
        displayNameInput,
        phoneInput,
      ],
      attrs: {
        class: 'profile__form',
      },
    }));
    (props.buttons = true),
    props.editProfileBtn = new Button('button', {
      text: 'Изменить данные',
      events: {
        click: () => {
          router.go(Routes.EditProfile);
        }
      },
      attrs: {
        class: 'profile__link',
      },
    });
    props.editPasswordBtn = new Button('button', {
      text: 'Изменить пароль',
      events: {
        click: () => {
          router.go(Routes.EditPassword);
        }
      },
      attrs: {
        class: 'profile__link',
      },
    });
    (props.logout = new Button('a', {
      text: 'Выйти',
      attrs: {
        class: 'profile__link profile__link--red',
      },
      events: {
        click: async (e) => {
          e.preventDefault();
          const response = await AuthController.logout();
          if (response.success) {
            router.go(Routes.Login);
          } else {
            console.log(response.error);
          }
        },
      },
    }));
    super(tagName, props);

    (this._children.form as FormProfile).getInputs().forEach((input: InputLarge) => {
      input.setProps({ value: this._props[input.getName()] as string });
    });
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    (this._children.form as FormProfile).getInputs().forEach((input: InputLarge) => {
      input.setProps({ value: this._props[input.getName()] as string });
    });
    
    (this._children.avatarImage as Block).setProps({src: newProps['avatar']});

    return !isEqual(oldProps, newProps);
  }

  public render() {
    return this.compile(tpl, this._props);
  }
}

export const connectProfile = connect(ProfilePage, (state) => {
  return {
    name: state.user?.first_name,
    email: state.user?.email,
    login: state.user?.login,
    first_name: state.user?.first_name,
    second_name: state.user?.second_name,
    display_name: state.user?.display_name,
    phone: state.user?.phone,
    avatar: state.user?.avatar,
  };
});
