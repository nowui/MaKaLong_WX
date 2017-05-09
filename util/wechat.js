const constant = require("./constant.js");
const http = require("./http.js");
const storage = require("./storage.js");

function auth(config) {
  var token = storage.getToken();
  if (token == '') {
    if (storage.getIsLanuch()) {
      wx.openSetting({
        success: (res) => {
          console.log(res.authSetting['scope.userInfo']);
          if (res.authSetting['scope.userInfo']) {
            login(config);
          }
        }
      });
    } else {
      storage.setIsLanuch();
      
      login(config);
    }
  } else {
    config.success();
  }
}

function login(config) {
  wx.login({
    success: function (res) {
      var code = res.code;
      if (code) {
        wx.getUserInfo({
          success: function (res) {
            http.request({
              url: '/member/wechat/wx/login',
              data: {
                js_code: code,
                encrypted_data: res.encryptedData,
                iv: res.iv
              },
              success: function (data) {
                storage.setToken(data.token);
                storage.setOpenId(data.open_id);
                storage.setMember({
                  user_name: data.user_name,
                  user_avatar: data.user_avatar,
                  member_level_id: data.member_level_id,
                  member_level_value: data.member_level_value
                });

                config.success();
              }.bind(this),
              fail: function () {
                config.fail();
              }
            });
          }.bind(this),
          fail: function (res) {
            config.fail();
          }
        });

      }
    }.bind(this),
    fail: function () {
      config.fail();
    }
  });
}

module.exports = {
  auth: auth
};