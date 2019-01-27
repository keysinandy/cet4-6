//app.js
const wxUrl  = require('./config.js').wxUrl
const appid   = require('./config.js').appid
const userUrl = require('./config.js').userUrl
var courseId = ''

App({
  onLaunch: function() {
    // 展示本地存储能力
    wx.showLoading({
      title: '加载中',
      mask:'true'
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now()) 
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: wxUrl +'code_openid',
          data: {
            'code': res.code,
            'appid': appid,
            'grant_type': 'authorization_code',
          },
          success: function(res) {
            //将SESSIONID保存到本地storage
            console.log("成功返回了")
            wx.setStorageSync('session_key',res.data.session_key)
            wx.setStorageSync('openid', res.data.openid)
            console.log(res)
            if (!res.data.is_register) {
              wx.showModal({
                title: '提示',
                content: '请先注册',
                showCancel: false,
                confirmText: "确定",
                success: function(res) {
                  wx.navigateTo({
                    url: '/pages/register/register',
                  })
                }
              })
            }
          },
          fail: function(res) {
            console.log('res' + res)
            wx.showModal({
              title: '提示',
              content: res.data,
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
  }
})