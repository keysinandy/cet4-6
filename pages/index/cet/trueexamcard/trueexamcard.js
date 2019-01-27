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
        pages: [{ 'name': '2014.1', 'url': '../readmind/readmind', 'is_done': 0 }, { 'name': '2014.2', 'url': '../readmind/readmind', 'is_done': 0 }, { 'name': '2014.3', 'url': '../readmind/readmind', 'is_done': 0}, { 'name': '2014.4', 'url': '../readmind/readmind', 'is_done': 0 }, { 'name': '2014.5', 'url': '../readmind/readmind', 'is_done': 0 }]
      },
      {
        id: 'cloze',
        name: 'Clozing',
        open: false,
        pages: [{ 'name': '2016.1', 'url': '../cloze/cloze', 'is_done': 0 }, { 'name': '2016.2', 'url': '../cloze/cloze', 'is_done': 0 }, { 'name': '2016.3', 'url': '../cloze/cloze', 'is_done': 0 }, { 'name': '2016.4', 'url': '../cloze/cloze', 'is_done': 0 }, { 'name': '2016.5', 'url': '../cloze/cloze', 'is_done': 0}]
      },
      {
        id: 'match',
        name: 'Matching',
        open: false,
        pages: [{ 'name': '2015.1', 'url': '../match/match', 'is_done': 0 }, { 'name': '2015.2', 'url': '../match/match', 'is_done': 0 }, { 'name': '2015.3', 'url': '../match/match', 'is_done': 0 }, { 'name': '2015.4', 'url': '../match/match', 'is_done': 0 }, { 'name': '2015.5', 'url': '../match/match', 'is_done': 0 }]
      },
      {
        id: 'trans',
        name: 'Translation',
        open: false,
        pages: [{ 'name': '2014.1', 'url': '../translate/translate', 'is_done': 0 }, { 'name': '2014.2', 'url': '../translate/translate', 'is_done': 0 }, { 'name': '2014.3', 'url': '../translate/translate', 'is_done': 0 }, { 'name': '2014.4', 'url': '../translate/translate', 'is_done': 0 }, { 'name': '2014.5', 'url': '../translate/translate', 'is_done': 0}]
      }
    ],
    title:"2018秋季六级考试",
    active:0,
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
  submit(e) {
    console.log(e)
  }

})