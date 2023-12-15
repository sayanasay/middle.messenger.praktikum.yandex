import EventBus from './EventBus';
import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import { BaseProps, SimpleProps, ChildrenProps } from './types';
import isEqual from '../utils/isEqual';

export default abstract class Block<Props extends BaseProps = BaseProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  protected _props: SimpleProps<Props>;
  protected _children: ChildrenProps;
  private _eventBus: EventBus;
  protected _element: HTMLElement | HTMLTemplateElement;
  private _meta: { 
    tagName: string;
  };
  private _id: string;
  private _setUpdate: boolean = false;

  constructor(tagName: string = 'div', propsAndChildren: Props = {} as Props) {
    const { children, props } = this._getChildren(propsAndChildren);

    this._eventBus = new EventBus();
    this._meta = { tagName };
    this._id = makeUUID();
    this._children = this._makePropsProxy(children, this);
    this._props = this._makePropsProxy({ ...props, __id: this._id }, this) as SimpleProps<Props>;

    this._registerEvents();

    this._eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildren(propsAndChildren: Partial<Props>) {
    const children: Record<string, Block | Block[]> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block || this._isChildArray(value)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
  
    return { children, props };
  }

  private _registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this)
    );
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    this._eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  public init() {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this._children).forEach((child: Block | Block[]) => {
      if (this._isChildArray(child)) {
        child.forEach((item) => item.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  public componentDidMount() {}

  public dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  public componentDidUpdate(oldProps: Props, newProps: Props) {
    return !isEqual(oldProps, newProps);
  }

  public setProps(nextProps: Partial<Props>) {
    if (!nextProps) {
      return;
    }

    this._setUpdate = false;
    const oldProps = { ...this._props };

    const { children, props } = this._getChildren(nextProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }

    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this._props);
      this._setUpdate = false;
    }
  }

  get element() {
    return this._element;
  }

  public compile(template: string, props: Props): DocumentFragment {
    if (typeof props == 'undefined') {
      props = this._props;
    }

    const propsAndStubs: Record<string, unknown> = { ...props };

    (Object.entries(this._children) as [string, Block | Block[]][]).forEach(
      ([key, child]) => {
        if (this._isChildArray(child)) {
          propsAndStubs[key] = `<div data-id="__l_${key}"></div>`;
        } else {
          propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        }
      }
    );

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    (Object.entries(this._children) as [string, Block | Block[]][]).forEach(
      ([key, child]) => {
        if (this._isChildArray(child)) {
          const stub = fragment.content.querySelector(`[data-id="__l_${key}"]`);
          if (!stub) {
            return;
          }

          const listContent = this._createDocumentElement('template') as HTMLTemplateElement;
          child.forEach((item) => {
            listContent.content.append(item.getContent());
          })
          stub?.replaceWith(listContent.content);
        } else {
          const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
          stub?.replaceWith(child.getContent());
        }
      });

      return fragment.content;
  }

  private _render() {
    const block = this.render();
    this.removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this.addEvents();
    this._addAtributes();
  }

  public render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent() {
    return this._element;
  }

  private _makePropsProxy<P extends Record<string, unknown>>(props: P, block: Block) {
    props = new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value) => {
        if (target[prop] !== value) {
          target[prop as keyof P] = value;
          block._setUpdate = true;
        }
        return true;
      },
      deleteProperty: () => {
        throw new Error('Отказано в доступе');
      },
    });

    return props;
  }

  private _createDocumentElement(tagName: string): HTMLElement | HTMLTemplateElement {
    const element = document.createElement(tagName);
    if (this._props.settings?.withInternalID) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  public addEvents() {
    const { events = {} } = this._props;
    
    if (!events) return;
    for (const [key, event] of Object.entries(events)) {
      this._element.addEventListener(key, event);
    }
  }

  public removeEvents() {
    const { events = {} } = this._props;

    if (!events) return;
    for (const [key, event] of Object.entries(events)) {
      this._element.removeEventListener(key, event);
    }
  }

  private _addAtributes() {
    const { attrs = {} } = this._props;

    Object.entries(attrs).forEach(([key, value]) => {
      this._element.setAttribute(key, value);
    });
  }

  public show() {
    this.getContent().style.display = 'block';
  }

  public hide() {
    this.getContent().style.display = 'none';
  }

  private _isChildArray(value: unknown): value is Block[] {
    return (
      Array.isArray(value) && value.every(item => item instanceof Block)
    );
  }
}
