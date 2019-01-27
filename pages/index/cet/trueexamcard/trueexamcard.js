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
        pages: [{ 'name': '2014.1', 'url': '../readmind/readmind' }, { 'name': '2014.2', 'url': '../readmind/readmind' }, { 'name': '2014.3', 'url': '../readmind/readmind' }, { 'name': '2014.4', 'url': '../readmind/readmind' }, { 'name': '2014.5', 'url': '../readmind/readmind' }]
      },
      {
        id: 'read',
        name: 'Readminding',
        open: false,
        pages: [{ 'name': '2014.1', 'url': '../readmind/readmind' }, { 'name': '2014.2', 'url': '../readmind/readmind' }, { 'name': '2014.3', 'url': '../readmind/readmind' }, { 'name': '2014.4', 'url': '../readmind/readmind' }, { 'name': '2014.5', 'url': '../readmind/readmind' }]
      },
      {
        id: 'cloze',
        name: 'Clozing',
        open: false,
        pages: [{ 'name': '2016.1', 'url': '../cloze/cloze' }, { 'name': '2016.2', 'url': '../cloze/cloze' }, { 'name': '2016.3', 'url': '../cloze/cloze' }, { 'name': '2016.4', 'url': '../cloze/cloze' }, { 'name': '2016.5', 'url': '../cloze/cloze' }]
      },
      {
        id: 'match',
        name: 'Matching',
        open: false,
        pages: [{ 'name': '2015.1', 'url': '../match/match' }, { 'name': '2015.2', 'url': '../match/match' }, { 'name': '2015.3', 'url': '../match/match' }, { 'name': '2015.4', 'url': '../match/match' }, { 'name': '2015.5', 'url': '../match/match' }]
      },
      {
        id: 'trans',
        name: 'Translation',
        open: false,
        pages: [{ 'name': '2014.1', 'url': '../translate/translate' }, { 'name': '2014.2', 'url': '../translate/translate' }, { 'name': '2014.3', 'url': '../translate/translate' }, { 'name': '2014.4', 'url': '../translate/translate' }, { 'name': '2014.5', 'url': '../translate/translate' }]
      }
    ],
    title:"2018秋季六级考试"
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