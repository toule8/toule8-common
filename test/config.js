'use strict';

const _ = require('lodash'),
  should = require('should'),
  config = require('../lib/config'),
  crypto = require('crypto');

describe('config tests', () => {
  describe('decrypt', () => {
    it('decrypt', async () => {
      config({
        a: 1
      });
      console.log(config.a);
    });
  });
});
