var usr = {};
const userUrl = require('../../../config.js').userUrl
Page({

  data: {
    bottonClr: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
  },


  onLoad: function (e) {
    usr = wx.getStorageSync('userInfo')
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
  tap: function (e) {
    var that = this;
    if (e.currentTarget.id == '0') {
      wx.chooseImage({
        sourceType: ['camera', 'album'],
        sizeType: ['compressed', 'original'],
        count: 1,
        success: function (res) {
          console.log(res)
          that.setData({ [`user.head_img`]: res.tempFilePaths[0]})
        }
      });
      return 0;
    }
    var url = ['', 'name', 'phone_num', 'sex', 'school', 'school_num', 'school_time']
    wx.navigateTo({
      url: '/pages/my/myInfo/change?changeWhat=' + url[e.currentTarget.id],
    })
  },

  CA: function (e) { this.setData({ [`bottonClr[${e.currentTarget.id}]`]: "#ddd" }) },
  CB: function (e) { this.setData({ [`bottonClr[${e.currentTarget.id}]`]: "#fff" }) },
})