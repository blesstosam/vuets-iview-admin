import {paramToUrl} from '@/assets/script/util';
import {expect} from 'chai'

describe('util - paramToUrl', () => {
  it('when url has not query', () => {

    const url = 'https://baidu.com'
    expect(paramToUrl(url, {a: 1, b: 2})).to.eq(`${url}?a=1&b=2`);
  });

  it('when url has query', () => {

    const url = 'https://baidu.com'
    expect(paramToUrl(url + '?x=1', {a: 1, b: 2})).to.eq(`${url}?x=1&a=1&b=2`);
  });
});
