const constant = require("./util/constant.js");

App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: function (res) {
        this.globalData.window_width = res.windowWidth;
        this.globalData.window_height = res.windowHeight;
      }.bind(this)
    });

    
  },
  globalData: {
    userInfo: {},
    window_width: 0,
    window_height: 0,
    open_id: ''
  }
})