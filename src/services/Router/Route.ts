import render from '../../utils/render';
import Block from '../Block';
import { BaseProps, BlockType } from '../types';

type RouteProps = {
  rootQuery: string;
} & BaseProps

export default class Route {
  protected _pathname: string;
  private _component: BlockType;
  protected _block: Block | null;
  protected _props: RouteProps;
  protected tag: string;

  constructor(pathname:string, component: BlockType, tag: string = 'div', props: RouteProps) {
    this._pathname = pathname;
    this._component = component;
    this._block = null;
    this._props = props;
    this.tag = tag;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  public leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  public match(pathname: string) {
    return pathname == this._pathname;
  }

  public render() {
    this._block = new this._component(this.tag, this._props);
    render(this._props.rootQuery, this._block);
    return;
  }
}
