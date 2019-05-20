// pages/index/cet/analyse/analyse.js
const Url = require('../../../../config.js').Url;
const openid = wx.getStorageSync('openid')
var usr = wx.getStorageSync('userInfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now: 0,
    all: 10,
    from: 'trueexam',
    swiperError: 0,
    preIndex: 0,
    system_height: 100,
    title: 'writing',
    is_show: true,
    is_show2: false,
    is_show3: false,
    test_chapter: 1,
    test_type: 3,
    test_id: 1,
    contents: '',
    analyse_text: '',
    have_translation: 0,
    translation_text: '',
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    grids2: [0, 1, 2, 3, 4],
    textUrl: [],
    analysis2:[],
    analysis: '',
    choose2: [
      [],
      [],
      [],
      [],
      []
    ],
    choose: [
      [],
    ],
    right_answer3: [],
    your_choose3: [],
    havedone_all: [],
    all_truerace: [],
    easy_wrong: [],
    check2: [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ],
    check3: [
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    const openid = wx.getStorageSync('openid')
    wx.showLoading({
      title: 'Loading',
      mask: true
    })
    this.setData({
      test_chapter: e.chapter,
      test_type: e.type,
      test_id: e.id,
      from: e.from
    })
    var that = this
    if (this.data.test_type == 1) { // 模拟传入作文解析界面
      wx.request({
        url: Url + '/Writing/get_questionanalyseinfo',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          test_chapter: that.data.test_chapter,
          test_type: that.data.test_type,
          test_id: that.data.test_id,
          openid: openid
        },
        success(e) {
          var answer_info = e.data.return[0].right_answer
          var subStr = new RegExp('\r\n', 'ig'); //i 单个替换，ig全局
          var result = answer_info.replace(subStr, "\r\n &nbsp;&nbsp;&nbsp;");
          // console.log(result)
          if (e.data.return[0].analysis != null){
            that.data.analysis = e.data.return[0].analysis
          }
          that.setData({
            contents: e.data.return[0].contents,
            analyse_text: result,
            title: 'writing',
            is_show: false,
            is_show2: false,
            is_show3: true,
            analysis: that.data.analysis
          })
        },
        fail(e) {
          wx.showToast({
            title: '网络开小差了',
            icon: 'none'
          })
        }
      })
    } else if (this.data.test_type == 2) {
      this.setData({
        title: 'readmind',
        all: 5,
        is_show: false,
        is_show2: true,
        is_show3: false,
      })
      var that = this
      const openid = wx.getStorageSync('openid')
      wx.request({
        url: Url + '/Readmind/get_questionanalyseinfo',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          test_chapter: that.data.test_chapter,
          test_type: that.data.test_type,
          test_id: that.data.test_id,
          from: that.data.from,
          openid: openid
        },
        success(e) {
          console.log(e.data.return[0])
          // console.log(arraya)
          var right_race = []
          for (let a = 0; a < 5; a++) {
            that.data.textUrl[a] = e.data.return[0]['contents_' + (a + 1)]
            that.data.right_answer3[a] = e.data.return[0]['right_answer' + (a + 1)]
            that.data.your_choose3[a] = e.data.return[0].your_answer3[a]
            that.data.havedone_all[a] = e.data.all_info[a].have_doneall
            right_race[a] = e.data.all_info[a].right_race
            right_race[a] = 100 * (right_race[a].toFixed(2)) + '%'
            that.data.choose2[a][0] = e.data.return[0]['option_a' + (a + 1)]
            that.data.choose2[a][1] = e.data.return[0]['option_b' + (a + 1)]
            that.data.choose2[a][2] = e.data.return[0]['option_c' + (a + 1)]
            that.data.choose2[a][3] = e.data.return[0]['option_d' + (a + 1)]
            if (e.data.return[0].your_answer3[a][0] == '-') {
              that.data.your_choose3[a] = '未作答'
            } else {
              that.data.your_choose3[a] = that.data.your_choose3[a][0]
              that.data.check2[a][(that.data.your_choose3[a].charCodeAt() - 65)] = true
            }
            if (e.data.return[0]['analysis'+(a+1)] != null){
              that.data.analysis2[a] = e.data.return[0]['analysis' + (a + 1)]
            }
          }
          wx.getSystemInfo({
            success: function(e) {
              // console.log(e)
              that.setData({
                system_height: e.windowHeight
              })
            },
          })

          var contents = e.data.return[0].contents
          var subStr = new RegExp('\n', 'ig'); //i 单个替换，ig全局
          var result = contents.replace(subStr, "\n &nbsp;&nbsp;&nbsp;");

          that.setData({
            read_text: result,
            textUrl: that.data.textUrl,
            choose2: that.data.choose2,
            right_answer3: that.data.right_answer3,
            your_choose3: that.data.your_choose3,
            check2: that.data.check2,
            havedone_all: that.data.havedone_all,
            all_truerace: right_race,
            analysis2: that.data.analysis2
          })
        },
        fail(e) {
          wx.showToast({
            title: '网络开小差了',
            icon: 'none'
          })
        }
      })
    } else if (this.data.test_type == 3) {
      var that = this
      const openid = wx.getStorageSync('openid')
      wx.request({
        url: Url + '/Cloze/get_questionanalyseinfo',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          test_chapter: that.data.test_chapter,
          test_type: that.data.test_type,
          test_id: that.data.test_id,
          openid: openid,
          from: that.data.from
        },
        success(e) {
          console.log(e)
          for (let a = 0; a < 15; a++) {
            that.data.textUrl[a] = "_____  (" + (a + 26) + ")"
            that.data.choose[a] = e.data.return[0]['option_' + (a + 1)]
          }
          var right_race = []
          for (let i = 0; i < 10; i++) {
            that.data.right_answer3[i] = e.data.return[0]['right_answer' + (i + 1)]
            that.data.your_choose3[i] = e.data.return[0].your_answer3[i]
            that.data.havedone_all[i] = e.data.all_info[i].have_doneall
            right_race[i] = e.data.all_info[i].right_race
            right_race[i] = 100 * (right_race[i].toFixed(2)) + '%'
            if (e.data.return[0].your_answer3[i][0] == '-') {
              that.data.your_choose3[i] = '未作答'
            } else {
              that.data.your_choose3[i] = that.data.your_choose3[i][0]
              that.data.check3[i][(that.data.your_choose3[i].charCodeAt() - 65)] = true
            }
            if (e.data.return[0]['analysis' + (i + 1)] != null) {
              that.data.analysis2[i] = e.data.return[0]['analysis' + (i + 1)]
            }
          }
          // console.log(that.data.choose)
          wx.getSystemInfo({
            success: function(e) {
              // console.log(e)
              that.setData({
                system_height: e.windowHeight
              })
            },
          })
          var answer_info = e.data.return[0].contents
          var subStr = new RegExp('\n', 'ig'); //i 单个替换，ig全局
          var result = answer_info.replace(subStr, "\n&nbsp;&nbsp;&nbsp;&nbsp;");
          
          that.setData({
            contents: result,
            textUrl: that.data.textUrl,
            choose: that.data.choose,
            right_answer3: that.data.right_answer3,
            your_choose3: that.data.your_choose3,
            check3: that.data.check3,
            havedone_all: that.data.havedone_all,
            all_truerace: right_race,
            analysis2: that.data.analysis2
          })
        },
        fail(e) {
          wx.showToast({
            title: '网络开小差了',
            icon: 'none'
          })
        }
      })

      this.setData({
        title: 'cloze',
        all: 10,
        is_show: true,
        is_show2: false,
        is_show3: false,
      })
    } else if (this.data.test_type == 4) {
      var that = this
      const openid = wx.getStorageSync('openid')
      wx.request({
        url: Url + '/Match/get_questionanalyseinfo',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          test_chapter: that.data.test_chapter,
          test_type: that.data.test_type,
          test_id: that.data.test_id,
          openid: openid,
          from: that.data.from
        },
        success(e) {
          // console.log(e)
          for (let c = 0; c < 15; c++) {
            that.data.choose[c] = String.fromCharCode(65 + c)
          }
          var right_race = []
          for (let i = 0; i < 10; i++) {
            that.data.textUrl[i] = e.data.return[0]['option_' + (i + 1)]
            that.data.right_answer3[i] = e.data.return[0]['right_answer' + (i + 1)]
            that.data.your_choose3[i] = e.data.return[0].your_answer3[i]
            that.data.havedone_all[i] = e.data.all_info[i].have_doneall
            right_race[i] = e.data.all_info[i].right_race
            right_race[i] = 100 * (right_race[i].toFixed(2)) + '%'

            if (e.data.return[0].your_answer3[i][0] == '-') {
              that.data.your_choose3[i] = '未作答'
            } else {
              that.data.your_choose3[i] = that.data.your_choose3[i][0]
              that.data.check3[i][(that.data.your_choose3[i].charCodeAt() - 65)] = true
            }
            if (e.data.return[0]['analysis' + (i + 1)] != null) {
              that.data.analysis2[i] = e.data.return[0]['analysis' + (i + 1)]
            }
          }
          // console.log(that.data.choose)
          wx.getSystemInfo({
            success: function(e) {
              console.log(e)
              that.setData({
                system_height: e.windowHeight
              })
            },
          })
          var answer_info = e.data.return[0].contents
          var subStr = new RegExp('\n', 'ig'); //i 单个替换，ig全局
          var result = answer_info.replace(subStr, "\n&nbsp;&nbsp;&nbsp;&nbsp;");
          that.setData({
            contents: result,
            textUrl: that.data.textUrl,
            choose: that.data.choose,
            right_answer3: that.data.right_answer3,
            your_choose3: that.data.your_choose3,
            check3: that.data.check3,
            havedone_all: that.data.havedone_all,
            all_truerace: right_race,
            analysis2: that.data.analysis2
          })
        },
        fail(e) {
          wx.showToast({
            title: '网络开小差了',
            icon: 'none'
          })
        }
      })

      this.setData({
        title: 'match',
        all: 10,
        is_show: true,
        is_show2: false,
        is_show3: false,
      })
    } else if (this.data.test_type == 5) {
      const openid = wx.getStorageSync('openid')
      wx.request({
        url: Url + '/Translation/get_questionanalyseinfo',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          test_chapter: that.data.test_chapter,
          test_type: that.data.test_type,
          test_id: that.data.test_id,
          openid: openid,
          from: that.data.from
        },
        success(e) {
          // var answer_info = e.data.return[0].right_answer
          // var subStr = new RegExp('\r\n', 'ig');//i 单个替换，ig全局
          // var result = answer_info.replace(subStr, "\r\n &nbsp;&nbsp;&nbsp;");
          that.setData({
            contents: e.data.return[0].contents,
            analyse_text: e.data.return[0].right_answer,
            title: 'translation',
            is_show: false,
            is_show2: false,
            is_show3: true,
          })
        },
        fail(e) {
          wx.showToast({
            title: '网络开小差了',
            icon: 'none'
          })
        }
      })
    }
  },
  changenow(e) {
    // console.log(e)
    this.setData({
      now: e.detail.current
    })
  },
  changeGoodsSwip: function(detail) { // todo还是会卡死
    // console.log(detail)
    if (detail.detail.source == "touch") {
      //当页面卡死的时候，current的值会变成0 
      if (detail.detail.current == 0) {
        //有时候这算是正常情况，所以暂定连续出现3次就是卡了
        let swiperError = this.data.swiperError
        swiperError += 1
        this.setData({
          swiperError: swiperError
        })
        if (swiperError >= 3) { //在开关被触发3次以上
          console.error(this.data.swiperError)
          this.setData({
            now: this.data.preIndex
          }); //，重置current为正确索引
          this.setData({
            swiperError: 0
          })
        }
      } else { //正常轮播时，记录正确页码索引
        this.setData({
          preIndex: detail.detail.current
        });
        //将开关重置为0
        this.setData({
          swiperError: 0
        })
      }
    }
  },
  onShow(e) {
    wx.hideLoading()
  }
})