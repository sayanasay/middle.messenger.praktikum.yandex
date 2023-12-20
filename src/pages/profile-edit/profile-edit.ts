import Button from '../../components/button';
import InputLarge from '../../components/inputLarge';
import FormProfile from '../../components/formProfile';
import Avatar from '../../components/avatar';
import { validateEmail, validateLogin, validateName, validatePhone } from '../../utils/validate';
import imgUrl from '../../assets/default.jpg';
import connect from '../../services/Store/Connect';
import tpl from '../profile/tpl';
import Block from '../../services/Block';
import UserController from '../../services/Controllers/UserController';
import { BaseProps } from '../../services/types';
import isEqual from '../../utils/isEqual';

type Props = {
  avatarImage: Avatar,
  form: FormProfile,
  buttons: boolean,
} & BaseProps

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

class ProfileEditPage extends Block<Props> {
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
      button: button,
      attrs: {
        class: 'profile__form',
      },
    }));
    (props.buttons = false);
    props.events = {
      submit: async (e: Event) => {
        e.preventDefault();

        if (props.form.validate()) {
          const response = await UserController.changeProfile({
            email: emailInput.getValue(),
            login: loginInput.getValue(),
            first_name: firstNameInput.getValue(),
            second_name: secondNameInput.getValue(),
            display_name: displayNameInput.getValue(),
            phone: phoneInput.getValue(),
          });
          if (response.success) {
            props.form.setProps({ error: null });
          } else {
            props.form.setProps({ error: JSON.stringify(response.error?.reason) });
          }
        }
      },
    };

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

export const connectProfileEdit = connect(ProfileEditPage, (state) => {
  return {
    name: state.user?.first_name,
    email: state.user?.email,
    login: state.user?.login,
    first_name: state.user?.first_name,
    second_name: state.user?.second_name,
    display_name: state.user?.display_name,
    phone: state.user?.phone,
    avatar: state.user?.avatar,
  }
});
