import { paramToUrl } from '@/assets/script/util';

describe('util - paramToUrl', () => {
  it('when url has not query', () => {
    const url = 'https://baidu.com';
    expect(paramToUrl(url, { a: 1, b: 2 })).toEqual(`${url}?a=1&b=2`);
  });

  it('when url has query', () => {
    const url = 'https://baidu.com';
    expect(paramToUrl(url + '?x=1', { a: 1, b: 2 })).toEqual(`${url}?x=1&a=1&b=2`);
  });
});
