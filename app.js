//app.js
const wxUrl  = require('./config.js').wxUrl
const appid   = require('./config.js').appid
const userUrl = require('./config.js').userUrl
var courseId = ''
const openid = wx.getStorageSync('openid')

App({
  onLaunch: function() {
    // 展示本地存储能力
    wx.showLoading({
      title: 'Loading',
      mask: true
    })
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now()) 
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        wx.request({
          // method:'POST',
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
            // console.log(wx.getStorageSync('userInfo'))
            if (!res.data.is_register) {
              wx.showModal({
                title: '提示',
                content: '请先注册',
                showCancel: false,
                confirmText: "确定",
                success: function(res) {
                  wx.hideLoading()
                  wx.navigateTo({
                    url: '/pages/register/register',
                  })
                }
              })
            }else{
              wx.hideLoading()
            }
            // console.log(wx.getStorageSync('userInfo') == '')
            if(wx.getStorageSync('userInfo') == ''){
              const openid = wx.getStorageSync('openid')
              wx.request({
                url: userUrl + 'getuserInfo',
                method: 'POST',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data:{
                  openid:openid
                },
                success(e){
                  wx.setStorage({
                    key: 'userInfo',
                    data: e.data.data[0],
                  })
                },
                fail(e){
                  wx.showToast({
                    title: '网络开小差了',
                    icon: 'none'
                  })
                }
              })
            }
          },
          fail: function(res) {
            console.log('res' + res)
            wx.showToast({
              title: '网络开小差了',
              icon: 'none'
            })
          }
        })
      }
    })
  },

  onShow(){
    console.log('又打开了')
    var that = this
    this._search_renwu(this)
    this.globalData.num = setInterval(
      function (e) {
        that.globalData.online_time = that.globalData.online_time + 1
        that.globalData.renwu_time = that.globalData.renwu_time + 1
        // console.log(e)
      }, 1000
    )
  },
  _search_renwu(e){
    var that = e
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        wx.request({
          url: userUrl + 'set_todayrenwutime',
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            openid: res.data,
            timestamp: timestamp
          },
          success(e) {
            // console.log(e)
           if(e.data.status == 200){
             that.globalData.renwu_time = parseInt(e.data.data)
           }else{
             wx.showToast({
               title: '网络开小差了',
               icon: 'none'
             })
           }
          }, fail(e) {
            wx.showToast({
              title: '网络开小差了',
              icon: 'none'
            })
          }
        })
      },
      fail(e){
        that._search_renwu(that)
      }
    })
  },
  onHide(e){
    console.log('小程序卸载了')
    var minute = parseInt(this.globalData.online_time / 60)
    var renwu_minute = parseInt(this.globalData.renwu_time)
    clearInterval(this.globalData.num)
    this.globalData.online_time = 0
    // console.log(minute)
    this.globalData.renwu_time = 0
    wx.request({
      url: userUrl + 'set_allminute',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        openid: openid,
        minute: minute,
        renwu_time: renwu_minute
      },
      success(e){
        console.log(e)
      },
      fail(e){
        wx.showToast({
          title: '网络开小差了',
          icon: 'none'
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    online_time: 0,
    renwu_time:0,
    num: 0,
  }
})