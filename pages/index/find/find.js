// pages/index/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottonClr: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
    info: [
      { id: 1, name: "成绩查询", img: 'query', margin: "0" },
      { id: 2, name: "通知", img: 'notice', margin: "0" },
    ]
  },
  tap: function (e) {
    console.log(e);
    switch (e.currentTarget.id) {
      case '1':
        wx.navigateTo({ url: '../../find/query/query/query' })
        break;
      case '2':
        wx.navigateTo({ url: '../../find/notice/list/list' })
        break;
    }
  }
})