// pages/index/cet/translate/translate.js
const Url = require('../../../../config.js').Url
var openid = wx.getStorageSync('openid')
var usr = wx.getStorageSync('userInfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_show1:false,
    is_show2:true,
    save: 'star-o',
    is_save: '收藏',
    name: '',
    chapter: '',
    id: '',
    from: '',
    trans_text:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
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
        url: Url + '/Translation/get_questioninfo',
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          name1: e.name,
          id: e.id
        },
        success(e) {
          // console.log(e)
          that.setData({
            trans_text: e.data.return[0].contents
          })
          wx.request({
            url: Url + '/Collectionlibrary/search_collect',
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data: {
              openid: openid,
              name: that.data.name,
              test_id: that.data.id,
              test_chapter: that.data.chapter,
              test_type: 5,
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
    } else if (e.from == 'trueexam') {
      this.setData({
        from: e.from,
        chapter: e.cet,
        name: e.name2,
        id: e.id,
        is_show1: true,
        is_show2: false
      })
      var that = this
      const openid = wx.getStorageSync('openid')
      wx.request({
        url: Url + '/Translation/get_questioninfofromtrue',
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          name2: e.name2,
        },
        success(e) {
          // console.log(e)
          that.setData({
            trans_text: e.data.return[0].contents
          })
          const openid = wx.getStorageSync('openid')
          wx.request({
            url: Url + '/Collectionlibrary/search_collect',
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data: {
              openid: openid,
              name: that.data.name,
              test_id: that.data.id,
              test_chapter: that.data.chapter,
              test_type: 5,
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
  save(e){
    if(this.data.save == 'star-o')
    {
      this.setData({
        save: 'star',
        is_save: '已收藏'
      })
    }else{
      this.setData({
        save : 'star-o',
        is_save: '收藏'
      })
    }
  },

  submit(e) {
    const openid = wx.getStorageSync('openid')
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
              header: { "Content-Type": "application/x-www-form-urlencoded" },
              data: {
                name: that.data.name,
                chapter: that.data.chapter,
                id: that.data.id,
                type: 'translation',
                openid: openid,
                username: usr.name,
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
                    url: '../analyse/analyse?chapter=' + that.data.chapter + '&type=5&from=order&id=' + that.data.id,
                  })
                } else if (e.data.message == 'have_done') {
                  wx.showModal({
                    title: '提示',
                    content: '这道题目已经做过了哦，请在我的学习记录查看',
                    showCancel: false,
                    success(e) {
                      if (e.confirm === true) {
                        wx.navigateBack({
                          delta:111  
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
                    setTimeout(function (e) {
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
        wx.navigateBack({
          delta: 1,
        })
    }
  },
  onUnload(e) {
    const openid = wx.getStorageSync('openid')
    wx.request({
      url: Url + '/Collectionlibrary/set_collect',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        openid: openid,
        name: this.data.name,
        test_id: this.data.id,
        test_chapter: this.data.chapter,
        test_type: 5,
        from: this.data.from,
        is_save: this.data.is_save
      },
      success(e) {
        // console.log(e)
      }
    })
  }

})