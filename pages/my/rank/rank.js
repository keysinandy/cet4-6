var Url = 'https://sanleisen.cn'
var rankUrl = require('../../../config.js').rankUrl;
Page({
  data: {
    FourInfo1: [],
    FourInfo2: [],
    SixInfo1: [],
    SixInfo2: [],
    eggInfo1: [],
    eggInfo2: [],
    count_minute1: [],
    count_minute2: [],
    current:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    show_cet: false
  },

  onLoad: function (options) {
    const openid = wx.getStorageSync('openid')
    var usr = wx.getStorageSync('userInfo')
    wx.showLoading({
      title: 'Loading',
      mask:true
    })
    wx.getSetting({
      success(e) {
        console.log(e.authSetting)
        if (e.authSetting['scope.userInfo'] == false || JSON.stringify(e.authSetting) == "{}") {
          wx.showModal({
            title: '提示',
            content: '您未授权信息,天梯排行可能无法正常运行,请到信息设置授权',
            showCancel: false,
            success(e){
              wx.redirectTo({
                url: '../myInfo/myInfo',
              })
            }
          })
        } else if(usr.name == null){
          wx.showModal({
            title: '提示',
            content: '您的昵称未完善,天梯排行可能无法正常运行,请到信息设置完善昵称信息',
            showCancel: false,
            success(e) {
              wx.redirectTo({
                url: '../myInfo/myInfo',
              })
            }
          })
        }
      }
    })
    wx.request({
      url: rankUrl,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res.data);
        this.setData({
          FourInfo1: res.data.data.FoueInfo[0],
          FourInfo2: res.data.data.FoueInfo[1],
          SixInfo1: res.data.data.SixInfo[0],
          SixInfo2: res.data.data.SixInfo[1],
          eggInfo1: res.data.data.duck_egg[0],
          eggInfo2: res.data.data.duck_egg[1],
          count_minute1: res.data.data.count_minute[0],
          count_minute2: res.data.data.count_minute[1],
        })
        wx.hideLoading()
      },
      fail: res => {
        console.log(res);
      }
    })
  }
})
