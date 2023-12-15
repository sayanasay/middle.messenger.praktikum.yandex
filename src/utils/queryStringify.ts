import { PlainObject } from './types';
import { isArrayOrObject, isPlainObject } from './isTypes';

const getKey = (key: string, parentKey?: string) => {
  return parentKey ? `${parentKey}[${key}]` : key;
}

const getParams = (data: PlainObject | [], parentKey?: string) => {
  const result: [string, string][] = [];

  for(const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

export const queryStringify = (data: PlainObject) => {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data).map(arr => arr.join('=')).join('&');
}
