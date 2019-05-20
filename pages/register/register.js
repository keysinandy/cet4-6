const app = getApp()
const userUrl = require('../../config.js').userUrl
Page({
  data: {
    array: ['男', '女', '保密'],
    index: 0,
    info: {
      'name': '',
      'school': '',
      'sex': '',
      'phone_num': '',
      'school_time': '',
      'school_num': ''
    },
    error: [
      '', '', '', '', '', ''
    ],
    is_na: 0,
    flag: 0,
    now_date: '2019-02-25',
    date: '请选择入学时间:',
    haveshouquan: 0
  },
  onChange(event) {
    // event.detail 为当前输入的值
    let inid = event.currentTarget.id
    var that = this
    switch (inid) { // 规范格式判断
      case '1':
        that.data.info.name = event.detail
        break;
      case '2':
        that.data.info.school = event.detail
        break;
      case '3':
        that.data.info.school_num = event.detail
        break;
      case '4':
        that.data.info.school_time = event.detail
        break;
      case '5':
        that.data.info.sex = event.detail
        break;
      case '6':
        that.data.info.phone_num = event.detail
        break;
    }
  },
  bindDateChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value,
      })
  },
  formSubmit(e) {
    if (this.data.flag == 0) {
      var that = this
      var veg_tel = /^1(3|4|5|7|8)\d{9}$/
      var veg_num = /^\+?[1-9][0-9]*$/
      var isright_tel = veg_tel.test(this.data.info.phone_num)
      var isright_num = veg_num.test(this.data.info.school_num)
      console.log(isright_tel)
      console.log(isright_num)

      if (e.detail.value.name == ''){
        wx.showToast({
          title: '昵称不可为空',
          icon: 'none'
        })
      }
      //  else if (e.detail.value.school == '') {
      //   wx.showToast({
      //     title: '院校不可为空',
      //     icon: 'none'
      //   })
      // } else if (e.detail.value.school_num == '') {
      //   wx.showToast({
      //     title: '学号不可为空',
      //     icon: 'none'
      //   })
      // } 
      // else if (this.data.date == '请选择入学时间:') {
      //   wx.showToast({
      //     title: '入学时间不可为空',
      //     icon: 'none'
      //   })
      // }
      // else if (isright_num == false) {
      //   wx.showToast({
      //     title: '请输入正确的学号',
      //     icon: 'none'
      //   })
      // } 
      else if (isright_tel == false){
        wx.showToast({
          title: '请输入正确的联系方式',
          icon: 'none'
        })
      } else if (this.data.haveshouquan == 0) {
        wx.showModal({
          title: '提示',
          content: '您还未授权哦，授权入口在信息设置，还可以在那里授权哦',
        })
        this.data.haveshouquan = 1
      }else {
        var openid = wx.getStorageSync('openid')
        if (this.data.date == '请选择入学时间:'){
          this.data.date = '未设置'
        }
        var openid = wx.getStorageSync('openid')
        wx.request({
          url: userUrl + 'setInfo',
          data: {
            'name': e.detail.value.name,
            'school': e.detail.value.school,
            'school_num': e.detail.value.school_num,
            'school_time': this.data.date,
            'sex': this.data.array[this.data.index],
            'phone_num': e.detail.value.phone_num,
            'openid': openid
          },
          success(e) {
            // console.log("注册返回信息：", e)
            wx.setStorageSync('userInfo', e.data.data[0])
            that.data.flag = 1
            wx.switchTab({
              url: '/pages/index/index/index',
            })
          },
          fail(e) {
            wx.showToast({
              title: '网络开小差了',
              icon: 'none'
            })
          }
        })
      }
    }else{
      wx.showToast({
        title: '已经在注册啦',
      })
    }
  },
  onGotUserInfo(e){
    // console.log(e)
      var usr = wx.getStorageSync('userInfo')
      var that = this
      // console.log("userInfo=",usr)
      if (e.detail.errMsg == "getUserInfo:fail auth deny") {
        wx.showModal({
          title: '提示',
          content: '授权失败可能导致有些功能无法正常使用哦,请到信息设置进行授权哦',
          showCancel: false,
          success(e) {
            if (e.confirm === true) {
              // wx.switchTab({
              //   url: '/pages/index/index/index',
              // })
            }
          }
        })
      } else {
        if(that.data.haveshouquan == 0){
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
            'openid': usr.openid,
            'name': that.data.info.name,
            'province': e.detail.userInfo.province,
          },
          success(e) {
            console.log(e.data.data)
            // wx.switchTab({
            //   url: '/pages/index/index/index',
            // })
            that.data.haveshouquan = 1
            wx.showToast({
              title: '授权成功',
              icon: 'none'
            })
          }
        })
        }else{
          wx.showToast({
            title: '已经授权过啦',
            icon: 'none'
          })
        }
      }
  },
  onUnload(e){
    if(this.data.flag == 0){
      wx.showModal({
        title: '注意',
        content: '未完善信息，可能会导致某些功能无法正常工作哦，请到信息设置完善'
    }) 
    }
  }
})