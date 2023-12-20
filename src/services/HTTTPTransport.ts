import { BASE_API } from '../API_URL';
import { queryStringify } from '../utils/queryStringify';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type OptionsData = Record<string, unknown>;

type RequestOptions = {
  headers?: Record<string, string>;
  data?: OptionsData | FormData;
  method?: METHODS.GET | METHODS.POST | METHODS.PUT | METHODS.DELETE;
  timeout?: number;
  withCredentials?: boolean;
};

type Method = <Response=unknown>(url: string, options?: RequestOptions) => Promise<Response>;

class HTTPTransport {
  private readonly apiUrl: string = '';

  constructor(url: string = '') {
    this.apiUrl = `${BASE_API}${url}`;
  }

  public get: Method = (url, options = {}) => {
    return this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  public post: Method = (url, options = {}) => {
    return this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  public put: Method = (url, options = {}) => {
    return this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  public delete: Method = (url, options = {}) => {
    return this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  public request = <Response>(
    url: string,
    options: RequestOptions = {},
    timeout = 5000
  ): Promise<Response> => {
    const { headers = {}, method, data, withCredentials = true } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data as OptionsData)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        const status = xhr.status || 0;
        if (status >= 200 && status < 300) {
          resolve(xhr.response);
        } else {
          const message = {
            '0': 'Abort',
            '100': 'Information',
            '200': 'Ok',
            '300': 'Redirect failed',
            '400': 'Access error',
            '500': 'Internal server error'
          }[Math.floor(status / 100) * 100];
          reject({status, reason: xhr.response?.reason || message})
        }
      }

      xhr.onabort = () => reject({reason: 'abort'});
      xhr.onerror = () => reject({reason: 'network error'});
      xhr.ontimeout = () => reject({reason: 'timeout'});

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.responseType = 'json';

      if (isGet || !data) {
        xhr.send();
      } else if ( data instanceof FormData){
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
