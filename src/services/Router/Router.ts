import { BaseProps, BlockType } from '../types';
import Route from "./Route";

class Router {
  protected routes: Route[];
  protected history: History;
  protected _currentRoute: Route | null;
  protected _rootQuery: string;
  static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: string, block: BlockType, tag: string = 'div', props: BaseProps = {}) {
    const route = new Route(pathname, block, tag, { ...props, rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = (event: Event) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    window.history.back();
  }

  public forward() {
    window.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('.app');
