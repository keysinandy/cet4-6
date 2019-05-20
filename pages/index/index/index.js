//index.js
//获取应用实例
const app = getApp()
const { $Message } = require('../../../compenent/dist/base/index.js');
var openid = wx.getStorageSync('openid')
const userUrl = require('../../../config.js').userUrl
const Url = require('../../../config.js').Url
Page({
  data: {
    from_cetday: 0,
    status: 'normal',
    online_time: 0,
    aim_record: 0,
    font_size: 0,
    circlr_margin: 0,
    top_backcolor: 0,
    whole_circlrmargin: 0,
    tuoyuan_margin: 0,
    circle_height: 0,
    circle_width: 0,
    word_topmargin: 0,
    tuoyuan_top: 0,
    whole_height: 0,
    whole_topmargin: 0,
    multiArray: [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
    multiIndex: [0, 0, 0],
    swiper: {
      autoplay: false,
      interval: 5000,
      duration: 1000,
    },
    meiwen_info: [],
  },
  onLoad: function () {
    const openid = wx.getStorageSync('openid')
    wx.showLoading({
      title: 'Loading',
      mask: true
    })
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res)
        var margin = res.windowWidth/5 - 35
        // console.log(margin)
        that.setData({
          circlr_margin: margin,
          whole_height: (82 / 812) * res.screenHeight * 1.5,
          top_backcolor: res.windowHeight/ 2.4,
          whole_circlrmargin: (res.windowWidth / 2) - ((90/ 812) * res.screenHeight * 1.5)/2,
          tuoyuan_margin: (res.windowWidth / 2) -105,
          circle_height: (82/812) * res.screenHeight,
          circle_width: (82 / 375) * res.screenWidth,
          word_topmargin: (16 / 812) * res.screenHeight,
          tuoyuan_top: (250 / 812) * res.screenHeight,
          whole_topmargin: (105 / 812) * res.screenHeight,
          font_size: (17/812)*res.screenHeight
        })
      },
    })

    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp)
    wx.request({
      url: Url + '/meiwen/get_meiwentitle',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
      },
      success(e) {
        // console.log(e)
        that.data.meiwen_info = e.data.data
        let array = e.data.data
        for(let i = 0;i < array.length;i++){
          var monthArr = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec");
          var suffix = new Array("st", "nd", "rd", "th");
          var date = new Date(parseInt(e.data.data[i].time) * 1000);
          var year = date.getFullYear(); //年
          var month = monthArr[date.getMonth()]; //月
          var ddate = date.getDate(); //日

          if (ddate % 10 < 1 || ddate % 10 > 3) {
            ddate = ddate + suffix[3];
          } else if (ddate % 10 == 1) {
            ddate = ddate + suffix[0];
          } else if (ddate % 10 == 2) {
            ddate = ddate + suffix[1];
          } else {
            ddate = ddate + suffix[2];
          }
          that.data.meiwen_info[i].time = ddate + " " + month + " " + year
        }

        that.setData({
          meiwen_info: that.data.meiwen_info
        })
        wx.hideLoading()
      }
    })
  },
  onShow(){
    var cet_timestamp = 1560528000
    var now_stamp = new Date()/1000
    this.data.from_cetday = parseInt((cet_timestamp - now_stamp) / (3600*24))
    // wx.showLoading({
    //   title: 'Loading',
    // })
    this._get_online(this)
    this.setData({
      from_cetday: this.data.from_cetday,
      active: 0
    })
  },

  _get_online(e){
    const openid = wx.getStorageSync('openid')
    var that = e
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res)
        if (res.errMsg == "getStorage:ok") {
          var openid = res.data
          wx.request({
            url: userUrl + 'get_onlinetime',
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              openid: openid
            },
            success(e) {
              // console.log(e)
              if (e.data.status == 200) {
                that.data.online_time = parseInt(e.data.data.count_minute) + parseInt(app.globalData.online_time / 60)
                var array = []
                array[0] = e.data.data.goal[0]
                array[1] = e.data.data.goal[1]
                array[2] = e.data.data.goal[2]
                that.setData({
                  online_time: that.data.online_time,
                  multiIndex: array
                })
              } else {
                wx.showToast({
                  title: '网络出小差了',
                  icon: 'none'
                })
              }
            },
            fail(e) {
              wx.showToast({
                title: '网络开小差了',
                icon: 'none'
              })
            }
          })
        } else {
          wx.showToast({
            title: '网络开小差了',
            icon: 'none'
          })
        }
      }, fail(e) {
        that._get_online(that)
      }
    })
  },

  bindMultiPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 7:
            data.multiArray[1] = [0,1]
            break
          case 6:
            data.multiArray[1] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            data.multiArray[2] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            break
          case 5:
            data.multiArray[1] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            data.multiArray[2] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            break
          case 4:
            data.multiArray[1] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            data.multiArray[2] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            break
          case 3:
            data.multiArray[1] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            data.multiArray[2] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            break
          case 2:
            data.multiArray[1] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            data.multiArray[2] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            break
          case 1:
            data.multiArray[1] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            data.multiArray[2] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            break
          case 0:
            data.multiArray[1] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            data.multiArray[2] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            break
        }
        data.multiIndex[1] = 0
        data.multiIndex[2] = 0
        break
      case 1:
        switch (data.multiIndex[0]) {
          case 7:
            switch (data.multiIndex[1]) {
              case 1:
                data.multiArray[2] = [0]
                break
              case 0:
                data.multiArray[2] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                break
            }
            break
        }
        data.multiIndex[2] = 0
        break
    }
    console.log(data.multiIndex)
    this.setData(data)
  },

  aim_change(e){

  },
  bindMultiPickerChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    var that = this
    var goal = e.detail.value
    const openid = wx.getStorageSync('openid')
    wx.request({
      url: userUrl + 'set_goal',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        openid: openid,
        goal: goal.join('')
      },
      success(e) {
        console.log(e)
        wx.showToast({
          title: '制定成功',
          icon: 'none'
        })
      }
    })
  },

  navigate_do(e){
    wx.navigateTo({
      url: '../cet/text/text?cet=' + e.currentTarget.id,
    })
  },
  // 跳转每日一句
  goToDaily: function (e) {
    var theindex = e.currentTarget.dataset.index + 1;
    wx.navigateTo({
      url: '../daily/daily?index=' + theindex,
    })
  },
  // 查看全部 todo 传输标题索引
  meiwen(e){
    // console.log(e)
    wx.navigateTo({
      url: '../daily/daily?id=' + this.data.meiwen_info[e.currentTarget.id].id + "&time=" + this.data.meiwen_info[e.currentTarget.id].time,
    })
  }
})









