const notification = require('../../util/notification.js');
const constant = require("../../util/constant.js");
const http = require("../../util/http.js");
const storage = require("../../util/storage.js");
const wechat = require("../../util/wechat.js");

Page({
  data: {
    order: {
      order_id: '',
      product_list: [],
      order_product_amount: 0,
      order_freight_amount: 0,
      order_amount: 0,
    }
  },
  onUnload: function () {

  },
  onLoad: function (option) {
    this.setData({
      order_id: option.order_id
    });
  },
  onReady: function () {

  },
  onShow: function () {
    this.handleLoad();
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
      url: '/order/find',
      data: {
        order_id: this.data.order_id
      },
      success: function (data) {
        var order_status_list = constant.order_status_list;
        for (var i = 0; i < order_status_list.length; i++) {
          if (order_status_list[i].order_status_value == data.order_flow) {
            data.order_flow_text = order_status_list[i].order_status_name;

            break;
          }
        }

        for (var i = 0; i < data.product_list.length; i++) {
          data.product_list[i].product_image_file = constant.host + data.product_list[i].product_image_file;
        }

        this.setData({
          order: data
        });
      }.bind(this)
    });
  },
  handlePay: function () {
    if (this.data.order.order_id == '') {
      return;
    }

    wechat.auth({
      success: function (data) {
        http.request({
          url: '/order/pay',
          data: {
            order_id: this.data.order.order_id,
            open_id: storage.getOpenId(),
            pay_type: 'WX'
          },
          success: function (data) {
            var order_id = data.orderId;

            wx.requestPayment({
              timeStamp: data.timeStamp,
              nonceStr: data.nonceStr,
              package: data.package,
              signType: data.signType,
              paySign: data.paySign,
              appId: constant.app_id,
              success: function (response) {
                wx.navigateTo({
                  url: '/view/order/result?order_id=' + order_id
                });
              },
              fail: function (response) {

              }
            })
          }.bind(this)
        });
      }.bind(this),
      fail: function () {

      }
    });
  }
});