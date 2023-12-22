import sinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';
import { use, expect } from 'chai';
import HTTPTransport from './HTTTPTransport';

describe('HTTPTransport', () => {
  use(sinonChai);
  const sandbox = createSandbox();
  let http: HTTPTransport;
  let request: SinonStub;

  beforeEach(() => {
    http = new HTTPTransport('');
    request = sandbox
      .stub(http, 'request' as keyof typeof http)
      .callsFake(() => Promise.resolve());
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('stringify query', () => {
    it('should stringify query object for GET request where all parameteres are strings', () => {
      http.get('', { data: { a: 'b', c: 'd' } });

      expect(request).calledWithMatch('?a=b&c=d', { method: 'GET' });
    });

    it('should stringify query object for GET request where parameteres are strings and numbers', () => {
      http.get('', { data: { a: '1', c: 'd' } });

      expect(request).calledWithMatch('?a=1&c=d', { method: 'GET' });
    });

    it('should encode special characters for GET query', () => {
      http.get('', { data: { a: '1=a&b' } });

      expect(request).calledWithMatch('?a=1%3Da%26b', { method: 'GET' });
    });

    it('should encode special characters in parameter name for GET query', () => {
      http.get('', { data: { 'a=3&c': '1=2&2' } });

      expect(request).calledWithMatch('?a%3D3%26c=1%3D2%262', {
        method: 'GET',
      });
    });

    it('should encode special characters as key and value to query', () => {
      void http.get('', { data: { 'a=x&4': 'q=w&e' } });

      expect(request).calledWithMatch('?a%3Dx%264=q%3Dw%26e', {
        method: 'GET',
      });
    });
  });

  describe('requests', () => {
    it('GET', () => {
      http.get('/test');

      expect(request).to.have.been.calledWith(`${http.BASE_API_URL}/test`, {
        method: 'GET',
      });
    });

    it('POST', () => {
      http.post('/test');

      expect(request).to.have.been.calledWith(`${http.BASE_API_URL}/test`, {
        method: 'POST',
      });
    });

    it('PUT', () => {
      http.put('/test');

      expect(request).to.have.been.calledWith(`${http.BASE_API_URL}/test`, {
        method: 'PUT',
      });
    });

    it('DELETE', () => {
      http.delete('/test');

      expect(request).to.have.been.calledWith(`${http.BASE_API_URL}/test`, {
        method: 'DELETE',
      });
    });
  });
});
