type Events = Record<keyof DocumentEventMap, EventListenerOrEventListenerObject>;
import Block from './Block';

export type BaseProps = {
  [key: string]: unknown;
  events?: Partial<Events>;
  attrs?: Record<string, string>;
  settings?: { withInternalID: boolean };
};

export type SimpleProps<T extends Record<string, unknown>> = {
  [P in keyof T]: T[P] extends Block ? never : T[P];
};

export type ChildrenProps<T extends Record<string, unknown>> = {
  [P in keyof T]: T[P] extends Block ? T[P] | T[P][] : never;
};
