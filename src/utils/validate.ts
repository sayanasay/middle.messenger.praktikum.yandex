export const validateLogin = (value: string) => {
  if (value.length === 0) {
    return 'Логин не может быть пустым';
  }
  if (value.length < 3) {
    return 'Длина логина не может быть менее 3 символов';
  }
  if (value.length > 20) {
    return 'Длина логина не может быть более 20 символов';
  }
  if (!value.match(/(?=.*[a-z])/)) {
    return 'Логин должен содержать латинские буквы';
  }
  if (!value.match(/^[a-zA-Z0-9_-]{3,}$/)) {
    return 'Логин не должен содержать пробелы и спецсимволы (кроме "-" и "_") может содержать цифры';
  }
  return '';
};

export const validatePassword = (value: string) => {
  if (value.length === 0) {
    return 'Пароль не может быть пустым';
  }
  if (value.length < 8) {
    return 'Длина пароля не может быть менее 8 символов';
  }
  if (value.length > 40) {
    return 'Длина пароля не может быть более 40 символов';
  }
  if (!value.match(/(?=.*[A-Z])/)) {
    return 'Пароль должен содержать хотя бы одну заглавную букву';
  }
  if (!value.match(/(?=.*[0-9])/)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }
  return '';
};

export const validateName = (value: string) => {
  if (value.length === 0) {
    return 'Поле не может быть пустым';
  }
  if (!value.match(/^[A-ZА-ЯЁ]+/)) {
    return 'Первая буква должна быть заглавной';
  }
  if (!value.match(/^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/)) {
    return 'Разрешены только буквы и символ дефиса';
  }
  return '';
};

export const validatePhone = (value: string) => {
  if (value.length === 0) {
    return 'Поле не может быть пустым';
  }
  if (!value.match(/^\+?\d{10,15}$/)) {
    return 'В поле должно быть от 10 до 15 символов, только цифры';
  }
  return '';
};

export const validateEmail = (value: string) => {
  if (value.length === 0) {
    return 'Поле не может быть пустым';
  }
  if (!value.match(/^[a-zA-Z0-9\-_]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
    return 'Неверный email';
  }
  return '';
};

export const validateMessage = (value: string) => {
  if (value.length === 0) {
    return 'Поле не может быть пустым';
  }
  return '';
};

