import Button from '../../components/button';
import InputLarge from '../../components/inputLarge';
import FormProfile from '../../components/formProfile';
import Avatar from '../../components/avatar';
import { validatePassword } from '../../utils/validate';
import imgUrl from '../../assets/default.jpg';
import Block from '../../services/Block';
import tpl from '../profile/tpl';
import UserController from '../../services/Controllers/UserController';
import { BaseProps } from '../../services/types';
import connect from '../../services/Store/Connect';
import isEqual from '../../utils/isEqual';

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
  validate: validatePassword,
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
  validate: validatePassword,
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

type Props = {
  avatarImage: Avatar;
  form: FormProfile;
} & BaseProps;

class EditPassword extends Block<Props> {
  constructor(tagName: string, props: Props) {
    (props.avatarImage = new Avatar('div', {
      src: props.avatar || imgUrl,
    })),
      (props.form = new FormProfile('form', {
        inputs: [oldPasswordInput, newPasswordInput, passwordRepeatInput],
        button: button,
        events: {
          submit: async (e) => {
            e.preventDefault();
            if (props.form.validate()) {
              const response = await UserController.changePassword({
                oldPassword: oldPasswordInput.getValue(),
                newPassword: newPasswordInput.getValue(),
              });
              if (response.success) {
                props.form.setProps({ error: null });
                props.form.clearInputs();
              } else {
                props.form.setProps({ error: response.error?.reason });
              }
            }
          },
        },
        attrs: {
          class: 'profile__form',
        },
      })),
      super(tagName, props);
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    (this._children.avatarImage as Block).setProps({src: newProps['avatar']});
    return !isEqual(oldProps, newProps);
  }

  public render() {
    return this.compile(tpl, this._props);
  }
}

export const connectEditPassword = connect(EditPassword, (state) => ({
  avatar: state.user?.avatar,
}));
