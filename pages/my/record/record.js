Page({
  data: {
    // 模拟的数据库返回数据
    type: [{
      name: 'Writing',
      num: '120',
      date: '01-29',
    }, {
      name: 'Readminding',
      num: '170',
      date: '12-19',
    }, {
      name: 'Clozing',
      num: '80',
      date: '12-02',
    }, {
      name: 'Matching',
      num: '90',
      date: '01-19',
    }, {
      name: 'Translation',
      num: '10',
      date: '01-16',
    }]
  },
  tap: function(e){
    console.log(e);
    wx.navigateTo({
      url: 'content?id=' + e.currentTarget.id,
    })
  },
  onLoad: function(options) {

  },

  onReady: function() {

  },

  onShow: function() {

  },

  onHide: function() {

  },

  onUnload: function() {

  },

  onShareAppMessage: function() {

  }
})