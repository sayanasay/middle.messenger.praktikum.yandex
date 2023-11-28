enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}

type OptionsData = Record<string, string>;

type RequestOptions = {
  headers?: Record<string, string>;
  data?: OptionsData;
  method?: METHODS.GET | METHODS.POST | METHODS.PUT | METHODS.DELETE;
  timeout?: number;
}

type Method = (url: string,  options?: RequestOptions) => Promise<unknown>;

function queryStringify(data: OptionsData) {
	if (typeof data !== 'object') {
			throw new Error('Data must be object');
	}

	const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
  public get: Method = (url, options = {}) => {
      return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };

  public post: Method = (url, options = {}) => {
      return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  public put: Method = (url, options = {}) => {
      return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };

  public delete: Method = (url, options = {}) => { 
      return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  public request = (url: string, options: RequestOptions = {}, timeout = 5000) => {
      const {headers = {}, method, data} = options;

      return new Promise(function(resolve, reject) {
          if (!method) {
              reject('No method');
              return;
          }

          const xhr = new XMLHttpRequest();
          const isGet = method === METHODS.GET;

          xhr.open(
              method, 
              isGet && !!data
                  ? `${url}${queryStringify(data)}`
                  : url,
          );

          Object.keys(headers).forEach(key => {
              xhr.setRequestHeader(key, headers[key]);
          });
      
          xhr.onload = function() {
              resolve(xhr);
          };
      
          xhr.onabort = reject;
          xhr.onerror = reject;
      
          xhr.timeout = timeout;
          xhr.ontimeout = reject;
          
          if (isGet || !data) {
              xhr.send();
          } else {
              xhr.send(JSON.stringify(data));
          }
      });
  };
}

export default HTTPTransport;
