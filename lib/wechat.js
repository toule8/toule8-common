'use strict';

const _ = require('lodash'),
  config = require('./config'),
  crypto = require('crypto');

const self = module.exports = {
  decrypt: (encryptedData, iv, sessionKey) => {
    sessionKey = Buffer.from(sessionKey, 'base64');
    encryptedData = Buffer.from(encryptedData, 'base64');
    iv = Buffer.from(iv, 'base64');

    try {
      const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
      decipher.setAutoPadding(true);
      let decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');

      const result = JSON.parse(decoded);
      if (result.watermark.appid !== config.appId) {
        throw new Error('invalid appId: ' + result.watermark.appid);
      }
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
