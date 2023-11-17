import * as Pages from './src/pages';
import Block from './src/services/Block';
import render from './src/utils/render';

const paths: { [key: string]: Block } = {
  '/login': Pages.LoginPage,
  '/signup': Pages.SignupPage,
  '/profile': Pages.ProfilePage,
  '/profile-edit': Pages.ProfileEditPage,
  '/edit-password': Pages.EditPassword,
  '/chat': Pages.ChatPage,
  '/404': Pages.Page404,
  '/500': Pages.Page500,
};

const loadPageByPath = (path: string): Block => {
  if (path in paths) {
    return paths[path];
  } else {
    return Pages.LoginPage;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    if (!target.dataset.nav) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();

    const path = target.dataset.nav;
    render('.app', loadPageByPath(path));
  })
});
