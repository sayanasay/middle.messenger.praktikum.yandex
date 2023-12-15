import * as Pages from './src/pages';
import router from './src/services/Router/Router';
import CenterLayout from './src/components/layouts/center';
import ProfileLayout from './src/components/layouts/profile';
// import Store from './src/services/Store';
import AuthController from './src/services/Controllers/AuthController';

export enum Routes {
  Login = '/',
  Signup = '/sign-up',
  Settings = '/settings',
  EditProfile = '/edit-profile',
  EditPassword = '/edit-password',
  Messenger = '/messenger',
  Page404 = '/404',
  Page500 = '/500',
}

// window.AppStore = Store;

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Login, CenterLayout, 'div', {
      content: new Pages.LoginPage('main'),
    })
    .use(Routes.Signup, CenterLayout, 'div', {
      content: new Pages.SignupPage('main'),
    })
    .use(Routes.Settings, ProfileLayout, 'main', {
      content: new Pages.ProfilePage('div'),
    })
    .use(Routes.EditProfile, ProfileLayout, 'main', {
      content: new Pages.ProfileEditPage('div'),
    })
    .use(Routes.EditPassword, ProfileLayout, 'main', {
      content: new Pages.EditPassword('div'),
    })
    .use(Routes.Messenger, CenterLayout, 'main', {
      content: new Pages.ChatPage('div'),
      attrs: {
        class: 'chat',
      },
    })
    .use(Routes.Page404, CenterLayout, 'div', {
      content: new Pages.Page404('main'),
    })
    .use(Routes.Page500, CenterLayout, 'div', {
      content: new Pages.Page500('main'),
    });

  const routes = Object.values(Routes).map((value) => value.toString());
  const { pathname } = window.location;

  let isPrivateRoute = true;

  switch (pathname) {
    case Routes.Login:
    case Routes.Signup:
      isPrivateRoute = false;
      break;
  }

  if (!routes.includes(pathname)) {
    router.go(Routes.Page404);
  }

  router.start();

  const user = await AuthController.getUser();
  if (user.user) {
    if (!isPrivateRoute) {
      router.go(Routes.Messenger);
    }
    return;
  }

  if (isPrivateRoute) {
    router.go(Routes.Login);
  }
});
