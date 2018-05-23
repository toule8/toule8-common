'use strict';

const _ = require('lodash');

const config = c => {
  _.merge(config, c);
};

module.exports = config;
