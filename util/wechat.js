const constant = require("./constant.js");
const http = require("./http.js");
const storage = require("./storage.js");

function auth(config) {
  var token = storage.getToken();
    if (token == '') {
        wx.login({
            success: function (res) {
                var code = res.code;
                if (code) {
                    wx.getUserInfo({
                      success: function (res) {
                        console.log(res.encryptedData);
                        console.log(res.iv);
                            http.request({
                              url: '/member/wechat/wx/login',
                                data: {
                                  js_code: code,
                                  encrypted_data: res.encryptedData,
                                  iv: res.iv
                                },
                                success: function (data) {
                                  storage.setToken(data.token);
                                  storage.setOpenId(data.opoen_id);
                                  storage.setMember({
                                    user_name: data.user_name,
                                    user_avatar: data.user_avatar,
                                    member_level_id: data.member_level_id,
                                    member_level_value: data.member_level_value
                                  });
                                }.bind(this)
                            });
                        }.bind(this)
                    });

                }
            }.bind(this)
        });
    } else {
        //config.success();
    }


}

module.exports = {
    auth: auth
};