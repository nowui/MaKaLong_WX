const constant = require("../../util/constant.js");
const storage = require("../../util/storage.js");
const http = require("../../util/http.js");
const wechat = require("../../util/wechat.js");

Page({
  data: {
    color: constant.color,
    member: {},
    member_total_amount: parseFloat(0).toFixed(2),
    WAIT_PAY: 0,
    WAIT_SEND: 0,
    WAIT_RECEIVE: 0
  },
  onUnload: function () {

  },
  onLoad: function () {
    
  },
  onReady: function () {

  },
  onShow: function () {
    this.setData({
      member: storage.getMember()
    });
  },
  onHide: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  handleLoad: function () {
    http.request({
      is_toast: false,
      url: '/member/my/find',
      data: {

      },
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].product_image_file = constant.host + data[i].product_image_file;
          data[i].product_price = data[i].product_price.toFixed(2);
        }

        this.setData({
          member_total_amount: data.member_total_amount,
          WAIT_PAY: data.WAIT_PAY,
          WAIT_SEND: data.WAIT_SEND,
          WAIT_RECEIVE: data.WAIT_RECEIVE
        });
      }.bind(this)
    });
  },
  handleUser: function (event) {
    wechat.auth({
      success: function (data) {
        this.setData({
          member: storage.getMember()
        });
      }.bind(this),
      fail: function () {

      }
    });
  },
  handleOrder: function (event) {
    wechat.auth({
      success: function (data) {
        wx.navigateTo({
          url: '/view/order/index?order_flow=ALL'
        });
      },
      fail: function () {

      }
    });
  },
  handleVideo: function (event) {
    wechat.auth({
      success: function (data) {
        wx.navigateTo({
          url: '/view/video/index'
        });
      },
      fail: function () {

      }
    });
  }
});
