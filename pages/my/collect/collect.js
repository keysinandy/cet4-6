var colloectUrl = require('../../../config.js').collectUrl

Page({
  data: {
    // 模拟的数据库返回数据
    type: []
  },
  tap: function (e) {
    console.log(e);
    wx.navigateTo({
      url: 'content?id=' + e.currentTarget.id,
    })
  },
  onLoad: function (options) {
    // console.log(colloectUrl)
    //   console.log(options);
    // 判断options是0还是1，如果是0的话，就获取四级数据，如果是1的话就获取六级数据
    if (options.id == "0") {
      wx.setStorageSync("chapter", "1");
      wx.request({
        url: colloectUrl,
        method: "POST",
        data: {
          openid: wx.getStorageSync('openid'),
          chapter: 1
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          this.setData({
            type: res.data.FourInfo
          })
        },
        fail: res => {
          console.log(res);
        }
      })
    } else {
      wx.setStorageSync("chapter", "2");
      wx.request({
        url: colloectUrl,
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
            type: res.data.SixInfo
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