// pages/levelf/dailytext/dailytext.js
const Url = require('../../../../config.js').Url;
var openid = wx.getStorageSync('openid')
Page({

  /**
   * 页面的初始数据
   */
    data: {
      cet:'',
      grids: [0, 1, 2],
      // i_name: ['每日一练', '真题模考', '高频练习'],
      // i_url: ['/images/1.png', '/images/2.png', '/images/3.png'],
      // naUrl: ['../dailytest/dailytest','../trueexam/trueexam','../flextext/flextext'],
      i_name: ['', '真题模考', ''],
      i_url: ['', '/images/3.png', ''],
      naUrl: ['', '../trueexam/trueexam', ''],
      swiper: {
        imgUrls: [
          'https://sanleisen.cn/photo/001.jpg'
        ],
        autoplay: false,
        interval: 5000,
        duration: 1000,
      },
      currentItemId: 2,
      have_done:0,
      pro_percent: 1,
      list:{
          'writing':{
            page:{}
          },
          'readmind':{
            page:{}
          },
          'cloze':{
            page:{}
          },
          'match':{
            page:{}
          },
          'translation':{
            page:{}
          }
      },
      sort:'',      
    },
  onLoad: function (options) {
    wx.showLoading({
      title: 'Loading',
    })
    console.log(options)
      let s = options.cet
      var openid = wx.getStorageSync('openid')
      this.data.have_done = options.have_done
      switch(s){
        case '1':
          this.setData({
            sort: '四级',
            cet: 1,
          })
          break;
        case '2':
          this.setData({
            sort: '六级',
            cet: 2
          })
          break;
      }
      var that = this
      wx.request({
        url: Url+'/Question/get_orderinfo',
        method:'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded"  },
        data:{
          'chapter' : this.data.cet,
          'openid' : openid
        },
        success(e){
          var datap = e.data.data
          // console.log(datap)
          var array = {
            'writing': {
              page:{}
            },
            'readmind': {
              page:{}
            },
            'cloze': {
              page:{}
            },
            'match': {
              page:{}
            },
            'translation': {
              page:{}
            }
            }
            // 请求返回对象动态赋值
            array = that.data.list
            var writing_all = 0,writing_done = 0
          for(let i = 0 ; i<datap.writing.length;i++) {
            array.writing.page[i] = datap.writing[i]
            array.writing.page[i].url = "../card/card?name=" + datap.writing[i].name + "&from=order&cet=" +that.data.cet + "&type=writing"
            array.writing.page[i].percent = datap.writing[i].percent
            array.writing.open = false
            array.writing.name = 'writing'
            array.writing.id = 'write'
            writing_all = writing_all + parseInt(datap.writing[i].all)
            writing_done = writing_done + parseInt(datap.writing[i].done)
            // array.writing.percent = datap.writing.all_percent
          }
          array.writing.all_percent = ((writing_done/writing_all)*100).toFixed(2)
          var readmind_all = 0, readmind_done = 0
          for (let n = 0; n < datap.readmind.length; n++) {
            array.readmind.page[n] = datap.readmind[n]
            array.readmind.page[n].url = "../card/card?name=" + datap.readmind[n].name + "&from=order&cet=" + that.data.cet+"&type=readmind"
            array.readmind.page[n].percent = datap.readmind[n].percent
            array.readmind.open = false
            array.readmind.name = 'readmind'
            array.readmind.id = 'read'
            readmind_all = readmind_all + parseInt(datap.readmind[n].all)
            readmind_done = readmind_done + parseInt(datap.readmind[n].done)
            // array.readmind.percent = datap.readmind.all_percent
          }
          array.readmind.all_percent = ((readmind_done/readmind_all)*100).toFixed(2)
          var cloze_all = 0, cloze_done = 0
          for (let a = 0; a < datap.cloze.length; a++) {
            array.cloze.page[a] = datap.cloze[a]
            array.cloze.page[a].url = "../card/card?name=" + datap.cloze[a].name + "&from=order&cet=" + that.data.cet + "&type=cloze"
            array.cloze.page[a].percent = datap.cloze[a].percent
            array.cloze.open = false
            array.cloze.name = 'cloze'
            array.cloze.id = 'cloze'
            cloze_all = cloze_all + parseInt(datap.cloze[a].all)
            cloze_done = cloze_done + parseInt(datap.cloze[a].done)
            // array.cloze.percent = datap.cloze.all_percent
          }
          array.cloze.all_percent = ((cloze_done/cloze_all)*100).toFixed(2)
          var match_all = 0, match_done = 0
          for (let b = 0; b < datap.match.length; b++) {
            array.match.page[b] = datap.match[b]
            array.match.page[b].url = "../card/card?name=" + datap.match[b].name + "&from=order&cet=" + that.data.cet + "&type=match"
            array.match.page[b].percent = datap.match[b].percent
            array.match.open = false
            array.match.name = 'match'
            array.match.id = 'match'
            match_all = match_all + parseInt(datap.match[b].all)
            match_done = match_done + parseInt(datap.match[b].done)
            // array.match.percent = datap.match.all_percent
          }
          array.match.all_percent = ((match_done/match_all)*100).toFixed(2)
          var translation_all = 0, translation_done = 0
          for (let c = 0; c < datap.translation.length; c++) {
            array.translation.page[c] = datap.translation[c]
            array.translation.page[c].url = "../card/card?name=" + datap.translation[c].name + "&from=order&cet=" + that.data.cet + "&type=translation"
            array.translation.page[c].percent = datap.translation[c].percent
            array.translation.open = false
            array.translation.name = 'translation'
            array.translation.id = 'trans'
            translation_all = translation_all + parseInt(datap.translation[c].all)
            translation_done = translation_done + parseInt(datap.translation[c].done)
            // array.translation.percent = datap.translation.all_percent
          }
          // 获取个模块进度
          array.translation.all_percent = ((translation_done/translation_all)*100).toFixed(2)
          // 获取总进度
          that.data.pro_percent = (((parseInt(translation_done) + parseInt(match_done) + parseInt(cloze_done) + parseInt(readmind_done) + parseInt(writing_done)) / (parseInt(translation_all) + parseInt(match_all) + parseInt(cloze_all) + parseInt(readmind_all) + parseInt(writing_all)))*100).toFixed(3)

            that.setData({
              list: array,
              pro_percent: that.data.pro_percent
            })
            wx.hideLoading()
          // console.log(that.data.list)
          // console.log(that.data.pro_percent)
        }
      })
  },
  onShow(e){
    // wx.hideLoading()
    this.onLoad({cet:this.data.cet})
  },
  kindToggle: function (e) {
    // console.log(e)
    var id = e.currentTarget.id, list = this.data.list;
    if(list.writing.id == id){
      list.writing.open = !list.writing.open
    } else{
      list.writing.open = false
    }

    if(list.cloze.id == id){
      list.cloze.open = !list.cloze.open
    } else{
      list.cloze.open = false
    }
    if(list.match.id == id) {
      list.match.open = !list.match.open
    } else{
      list.match.open = false
    }
    if(list.readmind.id == id) {
      list.readmind.open = !list.readmind.open
    }else{
      list.readmind.open = false
    } 
    if(list.translation.id == id) {
      list.translation.open = !list.translation.open
    }else{
      list.translation.open = false
    }
    this.setData({
      list: list
    });
  },

  dailytap(e){
    console.log("dailytap",e)
    let bid = e.target.id
    switch (bid){
      case '0':
        // if (this.data.have_done == 1) {
        //   wx.showModal({
        //     title: '提示',
        //     showCancel: false,
        //     content: '今天任务已经提交过啦',
        //     success(e) {
        //     }
        //   })
        // } else {
        //   wx.navigateTo({
        //     url: "../card/card?name=每日一练&cet="+this.data.cet+"&from=daily",
        //   })
        // }
        break;
      case '1':
      var that = this
        wx.request({
          url: Url+'/Match/get_trueexaminfo',
          data:{
            'chapter': this.data.cet,
            'openid': openid
          },
          success(e){
            let data = encodeURIComponent(JSON.stringify(e.data.data))
            wx.navigateTo({
              url: "../trueexam/trueexam?data=" + data +"&cet=" +that.data.cet ,
            })
          },
          fail(e){
            console.log(e)
            wx.showToast({
              title: '网络开小差了',
              icon: 'none'
            })
          }
        })
        break;
      case '2':
        // wx.navigateTo({
        //   url: '../flextext/flextext',
        // })
        break;

    }
  },
  onPullDownRefresh(e){
    this.onLoad({cet:this.data.cet})
  }
})