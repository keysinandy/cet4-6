const app = getApp()
const userUrl = require('../../config.js').userUrl 

Page({
  data: {
    info: [{
        'name': ''
      },
      {
        'school': ''
      },
      {
        'sex': ''
      },
      {
        'phone_num': ''
      },
      {
        'school_time': ''
      },
      {
        'school_num':''
      }
    ],
    error: [
      '','','','','',''
    ],
  },
  onChange(event) {
    // event.detail 为当前输入的值
    let inid = event.currentTarget.id
    var that = this
    switch (inid) {// 规范格式判断
      case '1':
      that.data.info[0]=event.detail
        break;
      case '2':
        that.data.info[1] = event.detail
        break;
      case '3':
        that.data.info[2] = event.detail
        break;
      case '4':
        that.data.info[3] = event.detail
        break;
      case '5':
        that.data.info[4] = event.detail
        break;
      case '6':
        that.data.info[5] = event.detail
        break;
    }

  },
  formSubmit(e){
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: userUrl+'setInfo',
      data:{
        'name':e.detail.value.name,
        'school': e.detail.value.school,
        'school_num': e.detail.value.school_num,
        'school_time': e.detail.value.school_time,
        'sex': e.detail.value.sex,
        'phone_num': e.detail.value.phone_num,
        'openid':openid
      },
      success(e){
        console.log("注册返回信息：",e)
        wx.setStorageSync('userInfo', e.data.data[0])
        wx.navigateBack({
          delta:111,
        })
        
      }
    })
  },
  onGotUserInfo(e){
    wx.getSetting({
      success(e){
        console.log(e)
      }
    })
  }
})