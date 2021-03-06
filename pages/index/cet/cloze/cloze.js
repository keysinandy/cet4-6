// pages/index/cet4/readmind/readmind.js
var app = getApp();
const config = require('../../../../config.js');
const Url = require('../../../../config.js').Url;
const openid = wx.getStorageSync('openid')
var usr = wx.getStorageSync('userInfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_show1: false,
    is_show2: true,
    save: 'star-o',
    is_save: '收藏',
    name: '',
    chapter: '',
    id: '',
    from: '',
    cloze_text: '',
    n: 1,
    answer: [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    ],
    check: [
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
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    textUrl: [],
    choose: [
      [],
    ],
    active: 0,
    current: [],
  },
  onLoad(e) {
    const openid = wx.getStorageSync('openid')
    // console.log(e)
    if (e.from == 'order') {
      this.setData({
        from: e.from,
        chapter: e.chapter,
        name: e.name,
        id: e.id,
        is_show1: false,
        is_show2: true
      })
      var that = this
      wx.request({
        url: Url + '/Cloze/get_questioninfo',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          name1: e.name,
          id: e.id
        },
        success(e) {
          // console.log(e)
          for (let a = 0; a < 10; a++) {
            that.data.textUrl[a] = "_____  (" + (a + 26) + ")"
          }
          for (let c = 0; c < 15; c++) {
            that.data.choose[c] = e.data.return[0]['option_' + (c + 1)]
          }
          // console.log(that.data.choose)
          that.setData({
            cloze_text: e.data.return[0].contents,
            textUrl: that.data.textUrl,
            choose: that.data.choose
          })
          wx.request({
            url: Url + '/Collectionlibrary/search_collect',
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              openid: openid,
              name: that.data.name,
              test_id: that.data.id,
              test_chapter: that.data.chapter,
              test_type: 3,
            },
            success(e) {
              // console.log(e)
              if (e.data.data == 'not_save') {
                that.setData({
                  save: 'star-o',
                  is_save: '收藏'
                })
              } else if (e.data.data == 'have_save') {
                that.setData({
                  save: 'star',
                  is_save: "已收藏"
                })
              } else {
                wx.showToast({
                  title: '网络开小差了',
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
        },
        fail(e) {
          wx.showToast({
            title: '网络开小差了',
            icon: 'none'
          })
        }
      })
    } else if (e.from == 'trueexam') {
      //获取答题缓存
      this.data.answer = wx.getStorageSync('cloze_answer' + e.id)
      // console.log(wx.getStorageSync('readmind_answer'))
      for (let i = 0; i < this.data.answer.length; i++) {
        // console.log(this.data.answer[i].charCodeAt())// charCodeAt()字母转换为ascll码，String.fromcode()转换为字母
        if (this.data.answer[i] != null) {
          this.data.check[i][(this.data.answer[i].charCodeAt() - 65)] = true
        }
      }

      this.setData({
        from: e.from,
        chapter: e.cet,
        name: e.name2,
        is_show1: true,
        is_show2: false,
        id: e.id,
        check: this.data.check
      })
      var that = this
      wx.request({
        url: Url + '/Cloze/get_questioninfofromtrue',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          name2: e.name2,
        },
        success(e) {
          // console.log(e)
          for (let a = 0; a < 15; a++) {
            that.data.textUrl[a] = "_____  (" + (a + 26) + ")"
          }
          for (let c = 0; c < 15; c++) {
            that.data.choose[c] = e.data.return[0]['option_' + (c + 1)]
          }
          var answer_info = e.data.return[0].contents
          var subStr = new RegExp('\n', 'ig'); //i 单个替换，ig全局
          var result = answer_info.replace(subStr, "\n&nbsp;&nbsp;&nbsp;");
          that.setData({
            cloze_text: result,
            textUrl: that.data.textUrl,
            choose: that.data.choose
          })
          wx.request({
            url: Url + '/Collectionlibrary/search_collect',
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              openid: openid,
              name: that.data.name,
              test_id: that.data.id,
              test_chapter: that.data.chapter,
              test_type: 3,
            },
            success(e) {
              // console.log(e)
              if (e.data.data == 'not_save') {
                that.setData({
                  save: 'star-o',
                  is_save: '收藏'
                })
              } else if (e.data.data == 'have_save') {
                that.setData({
                  save: 'star',
                  is_save: "已收藏"
                })
              } else {
                wx.showToast({
                  title: '网络开小差了',
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
        }
      })
    } else if (e.from == 'daily') {
      this.setData({
        from: e.from,
        chapter: e.chapter,
        name: e.name,
        id: e.id
      })
    }
  },
  roll: function(e) {
    this.setData({
      n: e.detail.current + 1
    })
  },

  xzgroup: function(e) {
    console.log(e)
    // console.log("icon:", e.detail.value[2])
    let i = e.detail.value[0]
    let n = e.detail.value[4]
    this.setData({
      ['answer[' + i + ']']: e.detail.value[2],
    })
    // console.log(this.data.answer)
  },
  save(e) {
    if (this.data.save == 'star-o') {
      this.setData({
        save: 'star',
        is_save: '已收藏'
      })
    } else {
      this.setData({
        save: 'star-o',
        is_save: '收藏'
      })
    }
  },
  submit(e) {
    const openid = wx.getStorageSync('openid')
    // console.log(usr)
    if (this.data.from == 'order') { // 发送答案到后台
      var that = this
      wx.showModal({
        title: '提示',
        content: '确定检查好了准备上交吗？',
        success(e) {
          if (e.confirm === true) {
            wx.request({
              url: Url + '/Dorecord/set_dorecord',
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                name: that.data.name,
                chapter: that.data.chapter,
                id: that.data.id,
                type: 'cloze',
                openid: openid,
                answer: that.data.answer,
                from: that.data.from
              },
              success(e) {
                // console.log(e)
                if (e.data.message == 'success') {
                  // todo 查看解析
                  wx.showToast({
                    title: '提交成功',
                  })
                  wx.redirectTo({
                    url: '../analyse/analyse?chapter=' + that.data.chapter + '&type=3&from=order&id=' + that.data.id,
                  })
                } else if (e.data.message == 'have_done') {
                  wx.showModal({
                    title: '提示',
                    content: '这道题目已经做过了哦，请在我的学习记录查看',
                    showCancel: false,
                    success(e) {
                      if (e.confirm === true) {
                        wx.navigateBack({
                          delta: 111
                        })
                      }
                    }
                  })
                } else {
                  wx.showToast({
                    title: '网络开小差了',
                    icon: 'none'
                  })
                }
              },
              fail(e) {
                wx.showToast({
                  title: '网络开小差了',
                  icon: 'none'
                })
              },
              complete(e) {
                wx.showLoading({
                  title: 'Loading',
                  mask: true,
                  success(e) {
                    setTimeout(function(e) {
                      wx.hideLoading()
                    }, 400)
                  }
                })
              }
            })
          }
        }
      })
    } else if (this.data.from == 'trueexam') {
      // wx.navigateTo({
      //   url: '../card/card?name=' + this.data.name + '&cet=' + this.data.chapter + '&from=' + this.data.from + '&type=writing',
      // })
      wx.navigateBack({})
    }
  },
  onUnload(e) {
    const openid = wx.getStorageSync('openid')
    wx.request({
      url: Url + '/Collectionlibrary/set_collect',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        openid: openid,
        name: this.data.name,
        test_id: this.data.id,
        test_chapter: this.data.chapter,
        test_type: 3,
        from: this.data.from,
        is_save: this.data.is_save
      },
      success(e) {
        // console.log(e)
      }
    })
    if (this.data.from == 'trueexam') {
      wx.setStorageSync('cloze_answer' + this.data.id, this.data.answer)
    }
  },
  // onHide(e) {
  //   wx.request({
  //     url: Url + '/Collectionlibrary/set_collect',
  //     method: 'POST',
  //     header: { "Content-Type": "application/x-www-form-urlencoded" },
  //     data: {
  //       openid: openid,
  //       name: this.data.name,
  //       test_id: this.data.id,
  //       test_chapter: this.data.chapter,
  //       test_type: 3,
  //       from: this.data.from,
  //       is_save: this.data.is_save
  //     },
  //     success(e) {
  //       console.log('onhide',e)
  //     }
  //   })
  // }
})