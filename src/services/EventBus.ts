export default class EventBus {
  private listeners: { [event: string]: Array<(...args: object[]) => void> } = {};
  
  constructor() {
    this.listeners = {};
  }

  public on(event: string, callback: (...args: object[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public off(event: string, callback: (...args: object[]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  public emit(event: string, ...args: object[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}
