var app = getApp()
var appData = getApp().globalData
var input = ''
const Url = require('../../../config.js').Url
Page({
  data: {
    report_text: ''
  },

  input: function (e) {
    this.data.report_text = e.detail.value;
    // console.log(input);
  },

  ok: function (e) {
    var openid = wx.getStorageSync('openid')
    var timestamp = Date.parse(new Date())/1000
    console.log(timestamp)
    if (this.data.report_text.length < 20) {
      wx.showModal({
        title: '信息太短',
        content: '提交的反馈太短，本次提交不能发送哦~',
      });
      return 0;
    }else{
      wx.showToast({
        title: '提交成功',
      })
      const openid = wx.getStorageSync('openid')
      wx.request({
        url: Url + '/Report/quereport',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          openid: openid,
          report_text: this.data.report_text,
          gmt_creat: timestamp
        },
        success(e){
          console.log(e)
        },
        fail(e){
          wx.showToast({
            title: '网络开小差了哦',
            icon: 'none'
          })
        }
      })
    }
  }
})