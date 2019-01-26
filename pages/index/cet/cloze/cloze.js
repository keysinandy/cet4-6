// pages/index/cet4/readmind/readmind.js

var app = getApp();
const config = require('../../../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    n: 1,
    answer: [
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
    ],
    tijiaoimg: config.Url + '/cet_images/tj.png',
    grids: [0, 1, 2, 3, 4],

    textUrl: [
      'What are researchers rediscovering through their studies?',
      "What do we learn about Betty's Brain ?",
      "How does teaching others benefit student tutors?",
      "What do students do to teach their teachable agents?",
      "What is the key factor that eases student tutors' learning?"
    ],
    choose: [
      [
        "A.Seneca's thinking is still applicable today.",
        "B.Better learners will become better teachers.",
        "C.Human intelligence tends to grow with age.",
        "D.Philosophical thinking improves instruction.",
      ],
      [
        "A.Seneca's thinking is still applicable today.",
        "B.Better learners will become better teachers.",
        "C.Human intelligence tends to grow with age.",
        "D.Philosophical thinking improves instruction.",
      ],
      [
        "A.Seneca's thinking is still applicable today.",
        "B.Better learners will become better teachers.",
        "C.Human intelligence tends to grow with age.",
        "D.Philosophical thinking improves instruction.",
      ],
      [
        "A.Seneca's thinking is still applicable today.",
        "B.Better learners will become better teachers.",
        "C.Human intelligence tends to grow with age.",
        "D.Philosophical thinking improves instruction.",
      ],
      [
        "A.Seneca's thinking is still applicable today.",
        "B.Better learners will become better teachers.",
        "C.Human intelligence tends to grow with age.",
        "D.Philosophical thinking improves instruction.",
      ],





    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  roll: function (e) {
    this.setData({
      n: e.detail.current + 1
    })
  },

  xzgroup: function (e) {
    console.log(e)
    console.log("icon:", e.detail.value[2])
    let i = e.detail.value[0]
    switch (i) {
      case "0":
        this.setData({
          ['answer[' + i + ']']: e.detail.value[2]
        })
        break;
      case "1":
        this.setData({
          ['answer[' + i + ']']: e.detail.value[2]
        })
        break;
      case "2":
        this.setData({
          ['answer[' + i + ']']: e.detail.value[2]
        })
        break;
      case "3":
        this.setData({
          ['answer[' + i + ']']: e.detail.value[2]
        })
        break;
      case "4":
        this.setData({
          ['answer[' + i + ']']: e.detail.value[2]
        })
        break;
    }
    console.log(this.data.answer[0])
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})