// pages/index/cet/trueexamcard/trueexamcard.js
const Url = require("../../../../config.js").Url
const openid = wx.getStorageSync('openid')
var usr = wx.getStorageSync('userInfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    istrue_analyse: false,
    is_show:true,
    is_show2:false,
    is_show3:false,
    active:0,
    is_navigateback: 0,
    cet:'',
    from:'',// order: 顺序练习进入参数，trueexam：真题模考进入参数, daily: 每日一练进入参数
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
    order_list:[],
    order_type:'',
    type_num: 0,
    title: "答题卡",
    all_nodone: 4,
    return_info: '',
    mark: 0
  },

  /**
   * 下拉折叠面板逻辑
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

  // onShow(e){
  //   console.log(e)
  // },
  onLoad: function (e) {
    // console.log(e)
    const openid = wx.getStorageSync('openid')
    if(e.from == 'trueexam'){// is_show真题练习模块，is_show2顺序练习大答题模块，is_show3每日一练大答题模块
      if(e.return_info != null){
        this.data.return_info = 'analyse'
        this.data.istrue_analyse = true
        wx.setNavigationBarTitle({
          title: '答题情况',
        })
      }
      this.setData({
        return_info: this.data.return_info,
        istrue_analyse: this.data.istrue_analyse,
        is_show:true,
        is_show2:false,
        is_show3:false,
        title: e.name,
        cet: e.cet,
        from: e.from
      })
    }else if(e.from == 'order'){
      if(e.type == 'writing'){
        this.data.type_num = 1
      } else if (e.type == 'readmind'){
        this.data.type_num = 2
      } else if (e.type == 'cloze') {
        this.data.type_num = 3
      } else if (e.type == 'match') {
        this.data.type_num = 4
      } else if (e.type == 'translation') {
        this.data.type_num = 5
      }
      this.setData({
        is_show:false,
        is_show2: true,
        is_show3: false,
        title: e.name,
        cet: e.cet,
        from: e.from,
        order_type: e.type
      })
    }else if(e.from == 'daily'){
      this.setData({
        is_show:false,
        is_show2: false,
        is_show3: true,
        title: e.name,
        cet: e.cet,
        from: e.from
      })
    }

    var that = this
    // console.log('that',that.data)
    if(e.from == 'trueexam'){
    wx.request({
      url: Url +'/Question/get_cardlistinfo',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      data: {
        'name': e.name,
      },
      success(e){
        var thhu = that
        if(that.data.return_info == 'analyse'){
          wx.request({
            url: Url + '/Dorecord/get_analyserecord',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            method: 'POST',
            data: {
              openid: openid,
              from: 'trueexam',
              writing_id: e.data.data.write_num.id
            },
            success(e) {
              thhu.data.mark = e.data.data
              // console.log(thhu.data.mark)
              thhu.setData({
                mark: thhu.data.mark
              })
            },fail(e){
              wx.showToast({
                title: '网络开小差了',
                icon: 'none'
              })
            }
          })
        }
        var datap = e.data.data
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
        /////////////// //// // // /// /// /// /// /// /// /// /// ///
        // 对象动态复制
        array = that.data.list
          array.writing.page[0] = datap.write_num
          if(that.data.istrue_analyse == false){// 解析界面的分类
            array.writing.page[0].url = "../writing/writing?name2=" + that.data.title + "&cet=" + that.data.cet + "&from=trueexam" + "&id=" + datap.write_num.id
          } else {
            array.writing.page[0].url = "../analyse/analyse?chapter=" + that.data.cet + "&type=1&from=trueexam&id=" + datap.write_num.id
          }
          
          array.writing.page[0].is_done = '0'
          array.writing.open = false
          array.writing.name = 'writing'
          array.writing.id = 'write'
        for (let n = 0; n < datap.readmind_num.length; n++) {
          array.readmind.page[n] = datap.readmind_num[n]
          if (that.data.istrue_analyse == false) {
            array.readmind.page[n].url = "../readmind/readmind?name2=" + that.data.title + "&cet=" + that.data.cet + "&from=trueexam" + "&id=" + datap.readmind_num[n].id
          } else {
            array.readmind.page[n].url = "../analyse/analyse?chapter=" + that.data.cet + "&type=2&from=trueexam&id=" + datap.readmind_num[n].id
          }
          array.readmind.page[n].is_done = '0'
          array.readmind.open = false
          array.readmind.name = 'readmind'
          array.readmind.id = 'read'
        }

          array.cloze.page[0] = datap.cloze_num
          if (that.data.istrue_analyse == false) {
            array.cloze.page[0].url = "../cloze/cloze?name2=" + that.data.title + "&cet=" + that.data.cet + "&from=trueexam" + "&id=" + datap.cloze_num.id
          } else {
            array.cloze.page[0].url = "../analyse/analyse?chapter=" + that.data.cet + "&type=3&from=trueexam&id=" + datap.cloze_num.id
          }
          array.cloze.page[0].is_done = '0'
          array.cloze.open = false
          array.cloze.name = 'cloze'
          array.cloze.id = 'cloze'


          array.match.page[0] = datap.match_num
          if (that.data.istrue_analyse == false) {
            array.match.page[0].url = "../match/match?name2=" + that.data.title + "&cet=" + that.data.cet + "&from=trueexam" + "&id=" + datap.match_num.id
          } else {
            array.match.page[0].url = "../analyse/analyse?chapter=" + that.data.cet + "&type=4&from=trueexam&id=" + datap.match_num.id
          }
          array.match.page[0].is_done = '0'
          array.match.open = false
          array.match.name = 'match'
          array.match.id = 'match'

          array.translation.page[0] = datap.translation_num
          if (that.data.istrue_analyse == false) {
            array.translation.page[0].url = "../translation/translation?name2=" + that.data.title + "&cet=" + that.data.cet + "&from=trueexam" + "&id=" + datap.translation_num.id
          } else {
            array.translation.page[0].url = "../analyse/analyse?chapter=" + that.data.cet + "&type=5&from=trueexam&id=" + datap.translation_num.id
          }
          array.translation.page[0].is_done = '0'
          array.translation.open = false
          array.translation.name = 'translation'
          array.translation.id = 'trans'

        that.setData({ // 刷新渲染数据
          list:array
        })
      },
      fail(e){
        wx.showToast({
          title: '网络开小差了',
          icon: 'none'
        })
      }
    })
  }else if(e.from=='order'){
    // console.log(e)
      const openid = wx.getStorageSync('openid')
    wx.request({
      url: Url+'/Question/get_ordercardlist',
      method:'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data:{
        chapter: that.data.cet,
        name :that.data.title,
        type: that.data.order_type
      },
      success(e){
        // console.log(e)
        var datap = e.data.data
        var array = that.data.order_list 
        for(let i = 0;i<datap.length;i++ ){
          array[i] = datap[i]
        }
        wx.request({
          url: Url + '/Dorecord/get_orderdorecord',
          method: 'POST',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: {
            openid:openid,
            chapter: that.data.cet,
            name: that.data.title,
            type: that.data.type_num
          },
          success(e){
            // console.log(e)
            if(e.data.status !== "100"){
              // console.log('做过题目的id',e.data.data)
              for (let h = 0; h < that.data.order_list.length; h++){
                for (let i = 0; i < e.data.data.length; i++){
                  if (that.data.order_list[h].id==e.data.data[i].test_id){
                    that.data.order_list[h].icon = 'medel'
                    that.data.order_list[h].is_done = 1
                    that.data.order_list[h].color = 'green'
                  } else if (that.data.order_list[h].is_done == undefined){
                    that.data.order_list[h].icon = 'medel-o'
                    that.data.order_list[h].is_done = 0
                    that.data.order_list[h].color = ''
                  }
                }
              }
            }else{
              for (let h = 0; h < that.data.order_list.length; h++) {
                that.data.order_list[h].icon = 'medel-o'
                that.data.order_list[h].is_done = 0
                that.data.order_list[h].color = ''
              }
            }
              that.setData({
                order_list: array
              })
            }
          })
        }
      })
    }
  },
  onShow(){
    this.onLoad({'name':this.data.title,'from':this.data.from,'cet':this.data.cet,'type':this.data.order_type})
    var that = this
    wx.getStorageInfo({
      success: function (res) {
        that.data.all_nodone = 9-res.keys.length
      },
    })
  },

  submit(e){
    const openid = wx.getStorageSync('openid')
    var that = this
    if(this.data.all_nodone!=0){
      wx.showModal({
        title: '提示',
        content: '你还有' + this.data.all_nodone + '道题目还没做确认提交嘛？',
        success(e){
          // console.log(that.data)
          if(e.cancel==false){  
            console.log('确认提交')
            //  直接提交到后台
            if (that.data.from == 'daily') {
              wx.navigateTo({
                url: '../text/text?have_done=1&cet='+that.data.cet+"&openid="+wx.getStorageSync('openid'),
              })
            }else if (that.data.from == 'trueexam') {// 返回后台判断正确性并跳转到解析界面
              var readmind_arr = []
              // console.log(that.data.list.readmind.page[0].id)
              for (let i = 0; i < Object.keys(that.data.list.readmind.page).length ; i++){
                var test_name = 'readmind_answer' + that.data.list.readmind.page[i].id
                // console.log(wx.getStorageSync(test_name))
                if (wx.getStorageSync(test_name) != ''){
                  readmind_arr[i] = wx.getStorageSync(test_name).join(',')
                }
              }
              // console.log(readmind_arr.join(', '))
              wx.request({
                url: Url+'/Dorecord/set_dorecordfromtrue',
                method: 'POST',
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                data:{
                  openid: openid,
                  name: that.data.title,
                  readmind_answer: readmind_arr.join(', '),
                  cloze_answer: wx.getStorageSync('cloze_answer' + that.data.list.cloze.page[0].id),
                  match_answer: wx.getStorageSync('match_answer' + that.data.list.match.page[0].id)
                },
                success(e) {
                  // console.log(e)
                  wx.getStorageInfo({
                    success: function (res) {
                      for (let i = 4; i < res.keys.length; i++) {
                        wx.removeStorageSync(res.keys[i])
                      }
                    },
                  })
                  if (e.data.message == 'success') {
                    // todo 查看解析
                    wx.showToast({
                      title: '提交成功',
                    })
                    // wx.navigateBack({
                    //   delta: 111
                    // })
                    that.onLoad({ name: that.data.title, from: 'trueexam', cet: that.data.cet, return_info: 'analyse' })
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
                      setTimeout(function (e) {
                        wx.hideLoading()
                      }, 400)
                    }
                  })
                }
              })
              // wx.navigateBack({
              //   delta:111
              // })
            }
          }else{
            console.log('取消提交')
          }
        }
      })
    }else{
    //  直接提交到后台
      const openid = wx.getStorageSync('openid')
      if(that.data.from == 'daily'){
        wx.navigateTo({
          url: '../text/text?have_done=1&cet=' + that.data.cet + "&openid=" + wx.getStorageSync('openid'),
        })
      }else if(that.data.from == 'trueexam'){
        var readmind_arr = []
        // console.log(that.data.list.readmind.page[0].id)
        for (let i = 0; i < Object.keys(that.data.list.readmind.page).length; i++) {
          var test_name = 'readmind_answer' + that.data.list.readmind.page[i].id
          if (wx.getStorageSync(test_name) != '') {
            readmind_arr[i] = wx.getStorageSync(test_name).join(',')
          }
        }

        wx.getStorageInfo({
          success: function (res) {
            for(let i =4;i<res.keys.length;i++){
              wx.removeStorageSync(res.keys[i])
            }
          },
        })
        var that = this
        const openid = wx.getStorageSync('openid')
        wx.request({
          url: Url + '/Dorecord/set_dorecordfromtrue',
          method: 'POST',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: {
            openid: openid,
            name: that.data.title,
            readmind_answer: [readmind_arr],
            cloze_answer: wx.getStorageSync('cloze_answer' + that.data.list.cloze.page[0].id),
            match_answer: wx.getStorageSync('match_answer' + that.data.list.match.page[0].id)
          },
          success(e) {
            // console.log(e)
            if (e.data.message == 'success') {
              // todo 查看解析
              wx.showToast({
                title: '提交成功',
              })
              // wx.navigateBack({
              //   delta: 111
              // })
              that.onLoad({name: that.data.title,from: 'trueexam',cet: that.data.cet,return_info: 'analyse'})
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
                setTimeout(function (e) {
                  wx.hideLoading()
                }, 400)
              }
            })
          }
        })
        wx.navigateBack({// 跳转到解析界面
          delta:111
        })
      }
    }
  },
  onUnload(){
    wx.getStorageInfo({
      success: function (res) {
        for (let i = 4; i < res.keys.length; i++) {
          wx.removeStorageSync(res.keys[i])
        }
      },
    })
  }
})