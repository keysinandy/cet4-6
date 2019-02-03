var appData = getApp().globalData;
 const userUrl = require('../../../config.js').userUrl;


Page({
  data: {
    sUrl: "https://sanleisen.cn:443/photo/CET/", //提供页面图标的服务器地址
    //isLogined: wx.getStorageSync('flag'),供登录使用
    bottonClr: [
      "white", "white", "white", "white", "white", "white", "white"
    ],
    setArr: [{
        id: "2",
        name: "周期打卡",
        img: "medal",
        margin: "0"
      },
      {
        id: "3",
        name: "学习记录",
        img: "ticket",
        margin: "30"
      },
      {
        id: "4",
        name: "我的收藏",
        img: "favorite",
        margin: "0"
      },
      {
        id: "5",
        name: "天梯排行",
        img: "ranking",
        margin: "30"
      },
      {
        id: "1",
        name: "信息设置",
        img: "option",
        margin: "0"
      },
      {
        id: "6",
        name: "问题反馈",
        img: "help",
        margin: "10"
      },
    ],
    bin: '',
  },

  tap: e => {
    var btnID = e.currentTarget.id
    switch (btnID) {
      case "0":
        break;
      case "1":
        wx.navigateTo({
          url: '../myInfo/myInfo',
        });
        break;
      case "2":
        wx.navigateTo({
          url: '../sign/sign',
        });
        break;
      case "3":
        wx.navigateTo({
          url: '../record/record'
        });
        break;
      case "4":
        wx.navigateTo({
          url: '/pages/index/answer/answer_chapter/chapter?subject=&type=zjlx'
        });
        break;
      case "5":
        wx.navigateTo({
          url: '../rank/rank'
        });
        break;
      case "6":
        wx.navigateTo({
          url: '../help/help',
        });
        break;
    }

  },

  //******************************************
  CA: function(e) {
    var btn = e.currentTarget.id
    this.setData({
      [`bottonClr[${btn}]`]: "#ddd"
    })
  },

  CB: function(e) {
    var btn = e.currentTarget.id
    this.setData({
      [`bottonClr[${btn}]`]: "white"
    })

    /*console.log('转入')*/
  },

  onShow: function() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      opacity: 0
    })
    this.op(40)
  },

  op: function(times) {
    if (!times) return 0
    var that = this
    setTimeout(function() {
      that.setData({
        opacity: that.data.opacity += 0.025
      })
      times--
      that.op(times)
    }, 35);
  },



  onShareAppMessage: function() {

  }
})