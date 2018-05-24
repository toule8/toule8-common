'use strict';

const _ = require('lodash'),
  should = require('should'),
  wechat = require('../lib/wechat'),
  config = require('../lib/config'),
  crypto = require('crypto');

describe('Utils tests', () => {
  describe('decrypt', () => {
    it('decrypt', async () => {
      config({
        appId: 'wx9bd0397df0bebfe9',
        appSecret: 'xxx'
      });
      const r = wechat.decrypt(
        'JnuGly/6FcQgYowBLdn1Q37Mh1sd+r2GbkiC1X7fwetvPz+2yRkDq7g9n6lJ66Ti/rNq4pfFgyuMjaSIA22H94HhtvUtURL+mbwyCnRgea/dUWSeRcexbv8L5qFDnED7UwUBZBRoL4c8uqzWpYhTbluBBRi/p2Nh3ZcoDP5IgJniRASe56JreVVIMrI6reA7NUxwwgytqanMrMDtfK/0yZ0Zz82ef1qLAg9efPjgj+jXEr+RqiqsRp9GBdYNTGG5pgkWOyN8KxvTbpd2gKPomo1RtGCfv/afCnXfFuQ8x2j1t2j/HMht32Gl2kHj3ilnUr9tX9yO+ygetyD5UNbOKh13fx73RUYs63LlAhDzZ3p8rq/HBnCUn2ZC5I02kO5qT3g9gz6IQGYSTSNlRJSHcqZLw/fZdK2Wl6yi+jZTrXrG7qu4EFz0QkKKZOVQ2a0gp1e4PQE03gd1uQiBm9rNiK3jjVguQ42Q0ZipmaVlrcRIXwjh+12nR8RC+kyvz2mi7e+Ken1f23INbB0B31tf5Q=='
        , '4ZeQ4Ny4iYvWzPpSKa1ahw==', 'XIFB8Qx1JHk2SafucWVu+A==');
      console.log(r);
    });
  });
});
