import EventBus from '../EventBus';
import set from '../../utils/set';
import { StoreType } from './types';

export enum StoreEvents {
  Updated = 'updated',
}

export default class Store extends EventBus {
  static _instance: Store;
  static STORE_NAME: string = 'myStore';
  private _state: StoreType = {};

  constructor() {
    if(Store._instance) {
      return Store._instance;
    }
    super();

    const savedState = localStorage.getItem(Store.STORE_NAME);

    this._state = savedState ? (JSON.parse(savedState) ?? {}) : {};

    Store._instance = this;

    this.on(StoreEvents.Updated, () => {
      localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state))
    })
  }

  public getState(): StoreType {
    return this._state;
  }

  public removeState() {
    this._state = {};
    this.emit(StoreEvents.Updated);
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value);
    this.emit(StoreEvents.Updated);
    return this;
  }
}
