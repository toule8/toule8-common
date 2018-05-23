'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  rp = require('request-promise'),
  sha1 = require('sha1'),
  config = require('./config'),
  utils = require('./utils'),
  wechat = require('./wechat'),
  WxSession = mongoose.model('WxSession'),
  UserInfo = mongoose.model('UserInfo'),
  _ = require('lodash');

const self = module.exports = {
  get: async id => {
    return UserInfo.findOne({'data.id': id});
  },
  userSession: async (code, userinfo) => {
    const data = await rp(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.appId}&secret=${config.appSecret}&grant_type=authorization_code&js_code=${code}`, {
      json: true
    });
    if (data.errcode) {
      throw new Error(data.errmsg);
    } else {
      // update or create wx session
      const wxSessions = await WxSession.find({
        'data.openid': data.openid
      });
      let wxSession;
      if (_.isEmpty(wxSessions)) {
        data.session = cuid();
        wxSession = new WxSession({
          data: data
        });
        await wxSession.save();
      } else {
        await Promise.all(_.map(wxSessions, s => {
          return () => {
            s.data = _.assign(s.data, data);
            return utils.save(s);
          };
        }));
        wxSession = wxSessions[0];
      }
      // get or create user
      const id = data.openid;
      let user = await self.get(id);
      if (!user) {
        user = new UserInfo({
          data: {
            id: id,
            openId: data.openid
          }
        });
        await utils.save(user);
      }
      // if have ext info then update user
      if (!_.isEmpty(userinfo)) {
        if (sha1(userinfo.rawData + data.session_key) !== userinfo.signature) throw new Error('verify userinfo failure');
        const infoExt = wechat.decrypt(userinfo.encryptedData, userinfo.iv, data.session_key);
        user.data = _.merge(user.data, infoExt);
        await utils.save(user);
      }
      return _.merge({
        session: wxSession.data.session
      }, _.pick(user.data, ['nickName', 'avatarUrl', 'gender', 'city', 'province', 'country']));
    }
  }
};

