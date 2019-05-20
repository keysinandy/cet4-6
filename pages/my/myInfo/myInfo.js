var usr = {};
const userUrl = require('../../../config.js').userUrl
Page({

  data: {
    bottonClr: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
    is_show: false
  },


  onLoad: function (e) {
    var that = this
    wx.getSetting({
      success(e) {
        // console.log(JSON.stringify(e.authSetting)=="{}")  判断有无授权
        if (e.authSetting['scope.userInfo'] == false || JSON.stringify(e.authSetting) == "{}") {
          that.setData({
            is_show: true
          })
        }else{
          that.setData({
            is_show: false
          })
        }
      }
    })
    usr = wx.getStorageSync('userInfo')
    if (usr.school == "null" || usr.school == undefined){
      usr.school = '未设置'
    } if (usr.school_num == "null" || usr.school_num == undefined){
      usr.school_num = '未设置'
    } if (usr.school_time == null || usr.school_time == undefined) {
      usr.school_time = '未设置'
    } if (usr.name == null || usr.name == undefined) {
      usr.name = '未设置'
    } if (usr.phone_num == null || usr.phone_num == undefined) {
      usr.phone_num = '未设置'
    } if (usr.sex == null || usr.sex == undefined) {
      usr.sex = '未设置'
    }
    this.setData({
      info: [
        { id: "1", name: "姓名", info: usr.name, margin: "0" },
        { id: "2", name: "手机号", info: usr.phone_num, margin: "0" },
        { id: "3", name: "性别", info: usr.sex, margin: "30" },
        { id: "4", name: "学校", info: usr.school, margin: "0" },
        { id: "5", name: "学号", info: usr.school_num, margin: "0" },
        { id: "6", name: "入学年份", info: usr.school_time, margin: "0" },
      ]
    })
  },
  onShow(e){
    wx.hideLoading()
    this.onLoad()
  },
  tap: function (e) {
    var that = this;
    if (e.currentTarget.id == '0') {
      wx.showToast({
        title: '暂不支持更改头像',
        icon: 'none'
      })
      return 0;
    }
    var url = ['', 'name', 'phone_num', 'sex', 'school', 'school_num', 'school_time']
    wx.navigateTo({
      url: '/pages/my/myInfo/change?changeWhat=' + url[e.currentTarget.id] + "&info=" + this.data.info[e.currentTarget.id-1].info,
    })
  },

  CA: function (e) { this.setData({ [`bottonClr[${e.currentTarget.id}]`]: "#ddd" }) },
  CB: function (e) { this.setData({ [`bottonClr[${e.currentTarget.id}]`]: "#fff" }) },

  getUserInfo(e){
    console.log(e)
    var that = this
    let openid = wx.getStorageSync('openid')
    var usr = wx.getStorageSync('userInfo')
    // console.log("userInfo=",usr)
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      wx.showModal({
        title: '提示',
        content: '授权失败可能导致有些功能无法正常使用哦',
        success(e) {
          that.onLoad()
        }
      })
    } else {
      console.log("用户信息返回：", e.detail.userInfo)
      wx.request({
        url: userUrl + 'setweixinInfo',
        data: {
          'avatarUrl': e.detail.userInfo.avatarUrl,
          'city': e.detail.userInfo.city,
          'country': e.detail.userInfo.country,
          'gender': e.detail.userInfo.gender,
          'language': e.detail.userInfo.language,
          'nickName': encodeURIComponent(e.detail.userInfo.nickName),// 由于昵称有特殊字符的存在，考虑到编码保存到数据库（对应decodeURIComponent解码）
          'province': e.detail.userInfo.province,
          'openid': openid,
          'name': usr.name
        },
        success(e) {
          // console.log(e.data.data)
          that.onLoad()
        }
      })
    }
  }
})