import { PlainObject } from './types';

export const isPlainObject = (value: unknown): value is PlainObject => {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

export const isArray = (value: unknown): value is [] => {
  return Array.isArray(value);
}

export const isArrayOrObject = (value: unknown): value is [] | PlainObject => {
  return isPlainObject(value) || isArray(value);
}
