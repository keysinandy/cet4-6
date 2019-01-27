// pages/index/cet/trueexamcard/trueexamcard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: 'write',
        name: 'Writing',
        open: false,
        pages: [{ 'name': 'writing', 'url':'../readmind/readmind'}]
      },
      {
        id: 'read',
        name: 'Readminding',
        open: false,
        pages: [{ 'name': 'sessionA', 'url': '../readmind/readmind' }, { 'name': 'sessionB', 'url': '../readmind/readmind' }, { 'name': 'sessionC', 'url': '../readmind/readmind' }, { 'name': 'sessionD', 'url': '../readmind/readmind' }]
      },
      {
        id: 'cloze',
        name: 'Clozing',
        open: false,
        pages: [{ 'name': 'sessionA', 'url': '../cloze/cloze' }]
      },
      {
        id: 'match',
        name: 'Matching',
        open: false,
        pages: [{ 'name': 'sessionA', 'url': '../match/match' }]
      },
      {
        id: 'trans',
        name: 'Translation',
        open: false,
        pages: [{ 'name': 'sessionA', 'url': '../translate/translate' }]
      }
    ],
    title: "每日一练"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  onLoad: function (options) {

  },
  onChange(e) {
    console.log(e.detail);
    let cid = e.detail;
    switch (cid) {
      case 0:
        wx.showModal({
          title: '提示',
          content: '收藏吗'
        })
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

})