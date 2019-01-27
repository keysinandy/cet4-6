// pages/levelf/dailytext/dailytext.js
Page({

  /**
   * 页面的初始数据
   */

    data: {
      grids: [0, 1, 2],
      i_name: ['每日一练', '真题模考', '高频练习'],
      i_url: ['/images/1.png', '/images/2.png', '/images/3.png'],
      naUrl: ['../dailytest/dailytest','../trueexam/trueexam','../flextext/flextext'],
      swiper: {
        imgUrls: [
          'https://sanleisen.cn/photo/000.jpg',
          'https://sanleisen.cn/photo/001.jpg',
          'https://sanleisen.cn/photo/000.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
      },
      have_done:0,
      pro_percent: 30,
      list: [
        {
          id: 'write',
          name: 'Writing',
          open: false,
          pages: [{ 'name': '2014.1', 'url': '../writing/writing', 'percent': '10' }, { 'name': '2014.2', 'url': '../writing/writing', 'percent': '20' }, { 'name': '2014.3', 'url': '../writing/writing', 'percent': '30' }, { 'name': '2014.4', 'url': '../writing/writing', 'percent': '40' }, { 'name': '2014.5', 'url': '../writing/writing', 'percent': '50' }],
          percent:'5',
          all:'1234',
          uhave_done:'21'
        },
        {
          id: 'read',
          name: 'Readminding',
          open: false,
          pages: [{ 'name': '2014.1', 'url': '../readmind/readmind', 'percent': '10' }, { 'name': '2014.2', 'url': '../readmind/readmind', 'percent': '10' }, { 'name': '2014.3', 'url': '../readmind/readmind', 'percent': '10' }, { 'name': '2014.4', 'url': '../readmind/readmind', 'percent': '10' }, { 'name': '2014.5', 'url': '../readmind/readmind', 'percent': '10' }],
          percent: '5',
          all: '1234',
          uhave_done: '21'
        },
        {
          id: 'cloze',
          name: 'Clozing',
          open: false,
          pages: [{ 'name': '2016.1', 'url': '../cloze/cloze', 'percent': '10' }, { 'name': '2016.2', 'url': '../cloze/cloze', 'percent': '10' }, { 'name': '2016.3', 'url': '../cloze/cloze', 'percent': '10' }, { 'name': '2016.4', 'url': '../cloze/cloze', 'percent': '10' }, { 'name': '2016.5', 'url': '../cloze/cloze', 'percent': '10'}],
          percent: '5',
          all: '1234',
          uhave_done: '21'
        },
        {
          id: 'match',
          name: 'Matching',
          open: false,
          pages: [{ 'name': '2015.1', 'url': '../match/match', 'percent': '10' }, { 'name': '2015.2', 'url': '../match/match', 'percent': '10' }, { 'name': '2015.3', 'url': '../match/match', 'percent': '10' }, { 'name': '2015.4', 'url': '../match/match', 'percent': '10' }, { 'name': '2015.5', 'url': '../match/match', 'percent': '10'}],
          percent: '5',
          all: '1234',
          uhave_done: '21'
        },
        {
          id: 'trans',
          name: 'Translation',
          open: false,
          pages: [{ 'name': '2014.1', 'url': '../translate/translate', 'percent': '10' }, { 'name': '2014.2', 'url': '../translate/translate', 'percent': '10' }, { 'name': '2014.3', 'url': '../translate/translate', 'percent': '10' }, { 'name': '2014.4', 'url': '../translate/translate', 'percent': '10' }, { 'name': '2014.5', 'url': '../translate/translate', 'percent': '10'}],
          percent: '5',
          all: '1234',
          uhave_done: '21'
        }
      ],
      sort:'',
      
    },
  onLoad: function (options) {
      let s = options.cet
      this.data.have_done = options.have_done
      switch(s){
        case '4':
          this.setData({
            sort: '四级'
          })
          break;
        case '6':
          this.setData({
            sort: '六级'
          })
          break;
      }
  },
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
  dailytap(e){
    console.log("dailytap",e)
    let bid = e.target.id
    switch (bid){
      case '0':
        if (this.data.have_done == 1) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '今天任务已经提交过啦',
            success(e) {
            }
          })
        } else {
          wx.navigateTo({
            url: '../dailytest/dailytest',
          })
        }
        break;
      case '1':
        wx.navigateTo({
          url: '../trueexam/trueexam',
        })
        break;
      case '2':
        wx.navigateTo({
          url: '../flextext/flextext',
        })
        break;

    }
  }
})