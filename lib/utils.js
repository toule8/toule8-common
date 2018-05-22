'use strict';

const _ = require('lodash');

async function json(f, res) {
  try {
    let r;
    if (_.isFunction(f)) {
      r = await f();
    } else {
      r = await f;
    }
    res.json({
      code: 1,
      data: r,
      msg: ''
    });
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({
      code: 0,
      msg: e.message
    });
  }
}

function processValues(obj, processor, ...paths) {
  if (!paths || paths.length === 0)
    return processor(obj);
  _.forEach(paths, path => {
    let value;
    if (path === '*') {
      _.forIn(obj, v => processValues(v, processor, ..._.slice(paths, 1)));
      return false;
    }
    if (path === '')
      value = obj;
    else
      value = _.get(obj, path);
    if (_.isArray(value)) {
      _.set(obj, path, _.map(value, v => processValues(v, processor, ..._.slice(paths, 1))));
      return false;
    } else if (_.isObject(value)) {
      processValues(value, processor, ..._.slice(paths, 1));
      return false;
    } else if (value !== undefined) {
      _.set(obj, path, processor(value));
    }
  });
  return obj;
}

async function save(doc) {
  doc.markModified('data');
  return doc.save();
}

module.exports = {
  json: json,
  processValues: processValues,
  save: save
};
