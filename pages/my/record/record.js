var dorecordlistUrl = require('../../../config.js').dorecordlistUrl
Page({
  data: {
    // 模拟的数据库返回数据
    type: []
  },
  tap: function (e) {
    wx.navigateTo({
      url: 'content?id=' + e.currentTarget.id,
    })
  },
  onLoad: function (options) {
    // 判断options是0还是1，如果是0的话，就获取四级数据，如果是1的话就获取六级数据
    if (options.id == "0") {
      wx.request({
        url: dorecordlistUrl,
        method: "POST",
        data: {
          openid: wx.getStorageSync('openid'),
          chapter: 1
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          console.log(res.data.type);
          this.setData({
            type: res.data.type
          })
        },
        fail: res => {
          console.log(res);
        }
      })
    } else {
      wx.request({
        url: dorecordlistUrl,
        method: "POST",
        data: {
          openid: wx.getStorageSync('openid'),
          chapter: 2
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          this.setData({
            type: res.data.type
          })
        },
        fail: res => {
          console.log(res);
        }
      })
    }

  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onShareAppMessage: function () {

  }
})