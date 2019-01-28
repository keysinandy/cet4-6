//index.js
//获取应用实例
const app = getApp()
const { $Message } = require('../../../compenent/dist/base/index.js');
Page({
  data: {
    count: [1, 2, 3, 4, 5],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputShowed: false,
    inputVal: "",
    active: 0,
    percent: 0,
    status: 'normal',
  },
  onLoad: function () {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow(){
    this.setData({
      active: 0
    })
  },
  getUserInfo: function (e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  f0: function (event) {
    wx.navigateTo({
      url: '/pages/my/myinfo',
    })

  },


  suo: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  // 跳转4/6
  goToCetFour: function () {
    wx.navigateTo({
      url: '../cet/text/text?cet=4',
      success(e){
        wx.showLoading({
          title: '加载中',
        })

        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
    })
  },
  goToCetSix: function () {
    wx.navigateTo({
      url: '../cet/text/text?cet=6',
      success(e) {
        wx.showLoading({
          title: '加载中',
        })

        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
    })
  },
  // 跳转每日一句
  goToDaily: function (e) {
    var theindex = e.currentTarget.dataset.index + 1;
    wx.navigateTo({
      url: '../daily/daily?index=' + theindex,
    })
  },
  // 查看全部
  more:function(){
    wx.navigateTo({
      url: '../daily/more',
    })
  },
})









