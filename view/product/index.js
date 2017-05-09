const constant = require("../../util/constant.js");
const notification = require('../../util/notification.js');
const storage = require("../../util/storage.js");
const http = require("../../util/http.js");
const wechat = require("../../util/wechat.js");
const util = require("../../util/util.js");
const htmlToWxml = require('../../util/htmlToWxml.js');

Page(Object.assign({}, {
  data: {
    product_quantity: {
      quantity: 1,
      min: 1,
      max: 1
    },
    window_width: getApp().globalData.window_width,
    tab_index: 0,
    slider_offset: 0,
    slider_left: 0,
    slider_width: 0,
    product_is_pay: false,
    sku_id: '',
    product_id: '',
    product_name: '',
    product_price: 0.00,
    product_image_file: '',
    product_image_file_list: [],
    product_content: [],
    cart_count: []
  },
  onUnload: function () {

  },
  onLoad: function (option) {
    http.request({
      url: '/product/video/find',
      data: {
        product_id: option.product_id
      },
      success: function (data) {
        for (var i = 0; i < data.product_image_file_list.length; i++) {
          data.product_image_file_list[i].file_path = util.decrypt(data.product_image_file_list[i].file_path);
          data.product_image_file_list[i].file_image = constant.host + data.product_image_file_list[i].file_image;
        }

        this.setData({
          sku_id: data.sku_list[0].sku_id,
          product_id: data.product_id,
          product_name: data.product_name,
          product_price: JSON.parse(data.sku_list[0].product_price)[0].product_price.toFixed(2),
          product_image_file: data.product_image_file,
          product_image_file_list: data.product_image_file_list,
          product_content: htmlToWxml.html2json(data.product_content)
        });
      }.bind(this)
    });

    this.setData({
      slider_left: 0,
      slider_offset: this.data.window_width / 2 * this.data.tab_index,
      slider_width: this.data.window_width / 2
    });
  },
  onReady: function () {

  },
  onShow: function () {
    this.setData({
      cart_count: storage.getCart().length
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
  handleTab: function (event) {
    this.setData({
      slider_offset: event.currentTarget.offsetLeft,
      tab_index: event.currentTarget.id
    });
  },
  handleZanQuantityChange(event) {
    var componentId = event.componentId;
    var quantity = event.quantity;

    this.setData({
      [`${componentId}.quantity`]: quantity
    });
  },
  handleImageLoad: function (event) {
    var width = event.detail.width;
    var height = event.detail.height;
    var index = event.currentTarget.dataset.index;
    this.data.product_content[index].attr.height = (height / width) * wx.getSystemInfoSync().windowWidth;
    this.setData({
      product_content: this.data.product_content
    });
  },
  handleCart: function () {
    wx.navigateTo({
      url: '/view/cart/detail'
    })
  },
  handleFavor: function () {
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 1500
    });
  },
  handleAddCart: function () {
    if (this.data.product_id == '') {
      return;
    }

    storage.addCart({
      sku_id: this.data.sku_id,
      product_id: this.data.product_id,
      product_name: this.data.product_name,
      product_image_file: constant.host + this.data.product_image_file,
      product_price: this.data.product_price,
      product_quantity: this.data.product_quantity,
      product_stock: this.data.product_quantity.max
    });

    this.setData({
      cart_count: storage.getCart().length
    });

    notification.emit('notification_cart_index_load', '');

    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1500
    });
  },
  handleBuy: function () {
    if (this.data.product_id == '') {
      return;
    }

    // storage.setProduct([{
    //     sku_id: this.data.sku_id,
    //     product_id: this.data.product_id,
    //     product_name: this.data.product_name,
    //     product_image_file: constant.host + this.data.product_image_file,
    //     product_price: this.data.product_price,
    //     product_quantity: {
    //         quantity: this.data.product_quantity.quantity,
    //         min: 1,
    //         max: 99999
    //     },
    //     product_stock: this.data.product_quantity.max
    // }]);

    // wx.navigateTo({
    //     url: '/view/order/check'
    // });

    wechat.auth({
      success: function (data) {
        var product_list = [{
          sku_id: this.data.sku_id,
          product_id: this.data.product_id,
          product_name: this.data.product_name,
          product_image_file: constant.host + this.data.product_image_file,
          product_price: this.data.product_price,
          product_quantity: this.data.product_quantity.quantity,
          product_stock: this.data.product_quantity.max
        }]

        http.request({
          url: '/order/save',
          data: {
            order_delivery_name: '',
            order_delivery_phone: '',
            order_delivery_address: '',
            order_message: '',
            order_pay_type: 'WECHAT_PAY',
            product_list: product_list,
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
                wx.redirectTo({
                  url: '/view/order/result'
                });
              },
              fail: function (response) {
                wx.redirectTo({
                  url: '/view/order/index?order_flow=ALL'
                });
              }
            })
          }.bind(this)
        });
      }.bind(this),
      fail: function () {

      }
    });
  }
}));