// pages/index/cet/trueexamcard/trueexamcard.js
const Url = require("../../../../config.js").Url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    cet:'',
    from:'',
    list: {
      'writing': {
        page: {}
      },
      'readmind': {
        page: {}
      },
      'cloze': {
        page: {}
      },
      'match': {
        page: {}
      },
      'translation': {
        page: {}
      }
    },
    title: "答题卡",
    all_nodone: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  kindToggle: function (e) {
    // console.log(e)
    var id = e.currentTarget.id, list = this.data.list;
    if (list.writing.id == id) {
      list.writing.open = !list.writing.open
    } else {
      list.writing.open = false
    }

    if (list.cloze.id == id) {
      list.cloze.open = !list.cloze.open
    } else {
      list.cloze.open = false
    }
    if (list.match.id == id) {
      list.match.open = !list.match.open
    } else {
      list.match.open = false
    }
    if (list.readmind.id == id) {
      list.readmind.open = !list.readmind.open
    } else {
      list.readmind.open = false
    }
    if (list.translation.id == id) {
      list.translation.open = !list.translation.open
    } else {
      list.translation.open = false
    }
    this.setData({
      list: list
    });
  },
  onLoad: function (e) {
    // 判断做题数量
    var list = this.data.list;
      for (var i = 0, len = list.length; i < len; ++i){
        for (var n = 0, len1 = list[i].pages.length ; n < len1 ; ++n){
          if (list[i].pages[0].is_done == 0){
            this.data.all_nodone  = this.data.all_nodone + 1
          }
        }
      }
      // console.log(this.data.all_nodone)
    
    // console.log(e)
    var that = this
    this.setData({
      title: e.name,
      cet:e.cet
    })
    if(e.from == 'trueexam'){
    wx.request({
      url: Url +'/Question/get_cardlistinfo',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      data: {
        'name': e.name,
        // 'chapter': e.cet
      },
      success(e){
        // console.log(e.data.data)//tou
        var datap = e.data.data
        // console.log(datap)
        var array = {
          'writing': {
            page: {}
          },
          'readmind': {
            page: {}
          },
          'cloze': {
            page: {}
          },
          'match': {
            page: {}
          },
          'translation': {
            page: {}
          }
        }

        array = that.data.list
        for (var i = 0; i <datap.write_num.length; i++) {
          array.writing.page[i]= datap.write_num[i]
          array.writing.page[i].url = "../writing/writing?name="+that.data.title+"&cet="+that.data.cet
          array.writing.open = false
          array.writing.name = 'writing'
          array.writing.id = 'write'
        }
        for (var n = 0; n < datap.readmind_num.length; n++) {
          array.readmind.page[n] = datap.readmind_num[n]
          array.readmind.page[n].url = "../readmind/readmind?name=" + that.data.title + "&cet=" + that.data.cet
          array.readmind.open = false
          array.readmind.name = 'readmind'
          array.readmind.id = 'read'
        }
        for (var a = 0; a < datap.cloze_num.length; a++) {
          array.cloze.page[a] = datap.cloze_num[a]
          array.cloze.page[a].url = "../cloze/cloze?name=" + that.data.title + "&cet=" + that.data.cet
          array.cloze.open = false
          array.cloze.name = 'cloze'
          array.cloze.id = 'cloze'
        }
        for (var b = 0; b < datap.match_num.length; b++) {
          array.match.page[b] = datap.match_num[b]
          array.match.page[b].url = "../match/match?name=" + that.data.title + "&cet=" + that.data.cet
          array.match.open = false
          array.match.name = 'match'
          array.match.id = 'match'
        }
        for (var c = 0; c < datap.translation_num.length; c++) {
          array.translation.page[c] = datap.translation_num[c]
          array.translation.page[c].url = "../translate/translate?name=" + that.data.title + "&cet=" + that.data.cet
          array.translation.open = false
          array.translation.name = 'translation'
          array.translation.id = 'trans'
        }

        // console.log(that.data.list)
        that.setData({
          list:array
        })
      }
    })
  }


  },
  submit(e){
    if(this.data.all_nodone!=0){
      wx.showModal({
        title: '提示',
        content: '你还有' + this.data.all_nodone + '道题目还没做确认提交嘛？',
        success(e){
          console.log(e)
          if(e.cancel==false){
            console.log('确认提交')
            // todo 直接提交到后台
            wx.navigateTo({
              url: '../text/text?have_done=1',
            })
          }else{
            console.log('取消提交')
          }
        }
      })
    }else{
    // todo 直接提交到后台
      wx.navigateTo({
        url: '../text/text?have_done=1',
      })
    }
  }
})