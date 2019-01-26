//change.js
const userUrl = require('../../../config.js').userUrl
Page({
    data: {
      changeText: '',
      changeWhat:'',
      title:''
    },

    onChange(event) {
      // event.detail 为当前输入的值
      this.data.changeText = event.detail
    },

    onLoad(e){
      this.data.changeWhat = e.changeWhat
      this.data.title = e.changeWhat

    },

    save(e){
      console.log(this.data.changeText)
      var openid = wx.getStorageSync('openid')
      wx.request({
        url: userUrl+'changeInfo',
        data:{
          changeWhat: this.data.changeWhat,
          changeText: this.data.changeText,
          openid : openid,
        },
        success(e){
          console.log('改变时返回',e)
          wx.removeStorageSync('userInfo')
          wx.setStorageSync('userInfo',e.data.data[0])
        }
      })
      wx.navigateBack({// todo 注意异步同步问题
        delta:2
      })
    }
})