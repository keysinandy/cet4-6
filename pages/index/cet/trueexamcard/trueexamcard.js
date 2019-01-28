// pages/index/cet/trueexamcard/trueexamcard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list: [
      {
        id: 'write',
        name: 'Writing',
        open: false,
        pages: [{ 'name': 'writing', 'url': '../readmind/readmind', 'is_done': 0 }]
      },
      {
        id: 'read',
        name: 'Readminding',
        open: false,
        pages: [{ 'name': 'sessionA', 'url': '../readmind/readmind', 'is_done': 0 }, { 'name': 'sessionB', 'url': '../readmind/readmind', 'is_done': 0 }, { 'name': 'sessionC', 'url': '../readmind/readmind', 'is_done': 0 }, { 'name': 'sessionD', 'url': '../readmind/readmind', 'is_done': 0 }]
      },
      {
        id: 'cloze',
        name: 'Clozing',
        open: false,
        pages: [{ 'name': 'sessionA', 'url': '../cloze/cloze', 'is_done': 0 }]
      },
      {
        id: 'match',
        name: 'Matching',
        open: false,
        pages: [{ 'name': 'sessionA', 'url': '../match/match', 'is_done': 0 }]
      },
      {
        id: 'trans',
        name: 'Translation',
        open: false,
        pages: [{ 'name': 'sessionA', 'url': '../translate/translate', 'is_done': 0 }]
      }
    ],
    title: "每日一练",
    all_nodone: 0,
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
    var list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      for (var n = 0, len1 = list[i].pages.length; n < len1; ++n) {
        if (list[i].pages[0].is_done == 0) {
          this.data.all_nodone = this.data.all_nodone + 1
        }
      }
    }
    console.log(this.data.all_nodone)
  },
  submit(e) {
    if (this.data.all_nodone != 0) {
      wx.showModal({
        title: '提示',
        content: '你还有' + this.data.all_nodone + '道题目还没做确认提交嘛？',
        success(e) {
          console.log(e)
          if (e.cancel == false) {
            console.log('确认提交')
            // todo 直接提交到后台
            wx.navigateTo({
              url: '../text/text?have_done=1',
            })
          } else {
            console.log('取消提交')
          }
        }
      })
    } else {
      // todo 直接提交到后台
      wx.navigateTo({
        url: '../text/text?have_done=1',
      })
    }
  }
})