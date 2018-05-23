'use strict';

const _ = require('lodash'),
  crypto = require('crypto');

function decrypt(encryptedData, iv, sessionKey) {
  sessionKey = Buffer.from(sessionKey, 'base64');
  encryptedData = Buffer.from(encryptedData, 'base64');
  iv = Buffer.from(iv, 'base64');
  try {
    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
    decipher.setAutoPadding(true);
    let decoded = decipher.update(encryptedData, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    return JSON.parse(decoded);
  } catch (e) {
    throw new Error(e.message);
  }
}

const self = module.exports = {
  decrypt: decrypt
};
