const wechat = require("../../util/wechat.js");

Page({
  data: {

  },
  onUnload: function () {

  },
  onLoad: function () {
    wechat.auth({
      is_open_setting: false,
      success: function (data) {
        wx.switchTab({
          url: '/view/index/index'
        });
      },
      fail: function () {
        wx.switchTab({
          url: '/view/index/index'
        });
      }
    }); 
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
});
