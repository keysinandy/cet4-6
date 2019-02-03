const app = getApp()
const userUrl = require('../../config.js').userUrl 
var openid = wx.getStorageSync('openid')
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
    is_na:0
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
        setTimeout(function(){
          wx.navigateBack({
            delta:111
          })
        },5000)
      }
    })
  },
  onGotUserInfo(e){
    var usr = wx.getStorageSync('userInfo')
    // console.log("userInfo=",usr)
    if (e.detail.errMsg == "getUserInfo:fail auth deny"){
      wx.showModal({
        title: '提示',
        content: '授权失败可能导致有些功能无法使用哦，记得到我的，信息设置授权哦',
        success(e){
          wx.showLoading({
            title: '请稍后',
          })
        }
      })
    }else{
      console.log("用户信息返回：", e.detail.userInfo)
      wx.request({
        url: userUrl+'setweixinInfo',
        data:{
          'avatarUrl': e.detail.userInfo.avatarUrl,
          'city': e.detail.userInfo.city,
          'country': e.detail.userInfo.country,
          'gender': e.detail.userInfo.gender,
          'language': e.detail.userInfo.language,
          'nickName': e.detail.userInfo.nickName,
          'province': e.detail.userInfo.province,
          'openid':openid,
          'name': usr.name
        },
        success(e){
          // console.log(e.data.data)
        }
      })
      wx.showLoading({
        title: '请稍后',
      })
    }
  }
})