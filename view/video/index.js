const constant = require("../../util/constant.js");
const http = require("../../util/http.js");

Page({
  data: {
    window_width: getApp().globalData.window_width,
    is_load: false,
    product_list: []
  },
  onUnload: function () {

  },
  onLoad: function () {
    http.request({
      url: '/product/my/list',
      data: {

      },
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].product_image_file = constant.host + data[i].product_image_file;
          data[i].product_price = data[i].product_price.toFixed(2);
        }

        this.setData({
          product_list: data
        });
      }.bind(this)
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
