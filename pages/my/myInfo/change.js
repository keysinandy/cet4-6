//change.js
const userUrl = require('../../../config.js').userUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: '请输入内容',
    changeWhat: '',
    titleArray: {
      name: "姓名",
      number: "学号",
      tel: "手机号",
      school: "学校",
      sex: "性别",
      year: "入学年份"
    },
    sexArray: {
      0: '未知',
      1: '男',
      2: '女'
    },
    value: "",
    tmp: "",
    userInfo: wx.getStorageSync('userInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调试时发现会有“延迟”，即修改某个值之后再点进去还是修改之前的值，但storage中的信息已经更新了，经排查发现是userInfo数组没更新的原因，因此每次加载都再读取一次
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
    })
    this.setData({
      changeWhat: options.changeWhat,
      placeholder: '请输入' + this.data.titleArray[options.changeWhat],
      value: this.data.userInfo[options.changeWhat]
    })
    if (options.changeWhat == 'Sex') {
      this.setData({
        value: this.data.sexArray[this.data.userInfo[options.changeWhat]]
      })
    }



    wx.setNavigationBarTitle({
      title: '修改' + this.data.titleArray[options.changeWhat],
    })
  },

  submit: function (res) {
    if (this.data.tmp == '') {
      console.log(res)
      wx.showToast({
        title: '不能为空',
        icon: 'none'
      })
      return
    }
    if (this.data.changeWhat == 'name') {
      //todo长度判断

    } else if (this.data.changeWhat == 'sex') {
      //todo输入内容判断，只能输入男、女或未知

      //将字段转化成数字type
      if (this.data.tmp == '男') {
        this.data.tmp = 1
      } else if (this.data.tmp == '女') {
        this.data.tmp = 2
      } else {
        this.data.tmp = 0
      }
    }
    //todo 以及各种输入判断

    //判断无误之后向后台发送数据
    if (this.data.tmp == this.data.userInfo[this.data.changeWhat]) {
      wx.navigateBack()
    }
    console.log(this.data.changeWhat),
      // console.log(this.data.tmp)
      wx.request({
        url: userUrl + '/updateInfo',
        data: {
          openid: wx.getStorageSync('jiaoxue_OPENID'),
          change: this.data.changeWhat,
          value: this.data.tmp
        },
        success: res => {
          //修改成功之后更新本地的storage并跳转回“我的”页面
          //console.log(this.data)
          if (res.data.success) {

            this.data.userInfo[this.data.changeWhat] = this.data.tmp
            wx.setStorageSync('userInfo', this.data.userInfo)
            wx.navigateBack()
          } else {
            wx.showToast({
              title: '修改失败',
              icon: 'none'
            })
            wx.navigateBack()
          }
        },
        fail: res => {
        },
      })
  },

  valueChange: function (res) {
    this.setData({
      tmp: res.detail.value

    })
  },



  onShow: function (e) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  }

})