var appData = getApp().globalData;
//  const Url = require('../../../config.js').Url;

Page({
  data: {
    sUrl: "https://sanleisen.cn:443/photo/CET/",//提供页面图标的服务器地址
    //isLogined: wx.getStorageSync('flag'),供登录使用
    task: [{
      name: '每日任务', detail: [
        { id: 0, name: "任务00", img: "medal", exp: 10, n1: 0, n2: 3 },
        { id: 1, name: "任务01", img: "ticket", exp: 10, n1: 0, n2: 3 },
        { id: 2, name: "任务02", img: "favorite", exp: 10, n1: 0, n2: 3 },
        { id: 3, name: "任务03", img: "ranking", exp: 10, n1: 0, n2: 3 },
      ]
    }, {
      name: '每周任务', detail: [
        { id: 10, name: "任务10", img: "medal", exp: 10, n1: 0, n2: 3 },
        { id: 11, name: "任务11", img: "ticket", exp: 10, n1: 0, n2: 3 },
        { id: 12, name: "任务12", img: "favorite", exp: 10, n1: 0, n2: 3 },
        { id: 13, name: "任务13", img: "ranking", exp: 10, n1: 0, n2: 3 },
      ]
    }, {
      name: '单次任务', detail: [
        { id: 20, name: "任务20", img: "medal", exp: 10, n1: 0, n2: 3 },
        { id: 21, name: "任务21", img: "ticket", exp: 10, n1: 0, n2: 3 },
        { id: 22, name: "任务22", img: "favorite", exp: 10, n1: 0, n2: 3 },
        { id: 23, name: "任务23", img: "ranking", exp: 10, n1: 0, n2: 3 },
      ]
    }],
    bin: '',
  },

  tap: e => {
    var btnID = e.currentTarget.id
  },

  //******************************************
  CA: function (e) {
    console.log(e.currentTarget.id)
    this.setData({ [`bottonClr[${e.currentTarget.id}]`]: "#ddd" })
  },

  CB: function (e) {
    console.log(e.currentTarget.id)
    this.setData({ [`bottonClr[${e.currentTarget.id}]`]: "white" })

    /*console.log('转入')*/
  },

  onShow: function () {
    var list = [];
    for (let i = 0; i < 30; i++) list.push("white");
    this.setData({ bottonClr: list })
  },

  onShareAppMessage: function () {

  }
})