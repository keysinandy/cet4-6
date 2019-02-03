// pages/index/cet4/readmind/readmind.js

var app = getApp();
const config = require('../../../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    save:'star-o',
    is_save:'收藏',
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
    active: 0,

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
  onchange(e){
    console.log(e.detail);
    let cid = e.detail;
    switch (cid) {
      case 0:
        break;
      case 1:
        wx.showModal({
          title: '提示',
          content: '还在做',
        })
        break;
      case 2:

        break;
    }
  },
  save(e){
    if (this.data.save == 'star-o') {
      this.setData({
        save: 'star',
        is_save: '已收藏'
      })
    } else {
      this.setData({
        save: 'star-o',
        is_save: '收藏'
      })
    }
  }
})