import Router from './Router/Router';
import { expect } from 'chai';
import { beforeEach } from 'mocha';
import Block from './Block';

describe('Router', () => {
  class TestPage extends Block {
    render() {
      return this.compile('<div></div>', this._props);
    }
  }

  beforeEach(() => {
    Router.use('/', TestPage).use('/sign-up', TestPage).start();
  });

  it('should render Registration page on route "/sign-up"', () => {
    Router.go('/sign-up');
    expect(window.location.href).to.be.eq('http://localhost:3000/sign-up');
  });

  it('should render Login page on route "/"', () => {
    Router.go('/');
    expect(window.location.href).to.be.eq('http://localhost:3000/');
  });

  it('should go back to previous page when going back', async () => {
    Router.back();

    await new Promise<void>((resolve) => {
      window.addEventListener('popstate', () => {
        resolve();
      });
    });

    expect(window.location.href).to.be.eq('http://localhost:3000/sign-up');
  });

  it('should go to forward page when going forward', async () => {
    Router.forward();

    await new Promise<void>((resolve) => {
      window.addEventListener('popstate', () => {
        resolve();
      });
    });

    expect(window.location.href).to.be.eq('http://localhost:3000/');
  });
});
