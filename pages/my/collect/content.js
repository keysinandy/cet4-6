var appData = getApp().globalData,
  app = getApp();
var js_date_time = require("../../../utils/util.js").js_date_time;
var collectdetailUrl = require('../../../config.js').collectdetailUrl;
Page({
  data: {
    contentInfo: [],
    loading: true,
    footTitle: '没有更多收藏了',
    hidden: true,
    hasInfo: false,
    page: 1,
    from_name: [],
    onLoad_flag: 0,
    active: 0,
  },
  onClick(event) {
    console.log('click')
    this.setData({
      page: 1,
      contentInfo: [],
    })
    var index = parseInt(event.detail.index) + 1;
    wx.setStorageSync("type", index.toString());
    this.getdatalist(wx.getStorageSync("type"));
  },
  // 跳转解析页面，使用event.currentTarget.dataset.id
  tap(event) {
    // console.log(parseFloat(this.data.contentInfo[0].intro))// 这里直接获得name1，然后跳转答题界面
    if(this.data.contentInfo[event.currentTarget.id].have_done == '已做'){
      var type_id = event.currentTarget.dataset.id
      type_id = type_id.substring(2)
      wx.navigateTo({
        url: "/pages/index/cet/analyse/analyse?chapter=" + wx.getStorageSync("chapter") + "&type=" + event.currentTarget.dataset.id[0] + "&id=" + type_id + "&from=" + this.data.from_name[event.currentTarget.id] ,
      })
    }
    else{
      switch(wx.getStorageSync('type')){
        case '1': var go = 'writing';break;
        case '2': var go = 'readmind'; break;
        case '3': var go = 'cloze'; break;
        case '4': var go = 'match'; break;
        case '5': var go = 'translation'; break;
      }
      var type_id = event.currentTarget.dataset.id
      type_id = type_id.substring(2)
      // console.log(type_id)
      wx.navigateTo({
        url: "/pages/index/cet/" + go + "/" + go + "?chapter=" + wx.getStorageSync("chapter") + "&type=" + event.currentTarget.dataset.id[0] + "&id=" + type_id + "&from=order" + "&name=" + parseFloat(this.data.contentInfo[event.currentTarget.id].intro) + "&cet=" + wx.getStorageSync("chapter") + "&name2=" + this.data.contentInfo[event.currentTarget.id].intro,
      })
    }

  },
  getdatalist: function (typeid) {
    var that = this;
    const openid = wx.getStorageSync('openid')
    wx.request({
      url: collectdetailUrl,
      method: "POST",
      data: {
        openid: wx.getStorageSync("openid"),
        chapter: wx.getStorageSync("chapter"),
        type: typeid,
        page: that.data.page.toString()
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        if (res.data.msg !== "get_collectdetail success!" && that.data.page == 1) {
          this.setData({
            isHidden: false
          })
        } else if (res.data.msg !== "get_collectdetail success!" && that.data.page !== 1) {
          console.log("到底了");
        } else {
          var arr1 = that.data.contentInfo; //从data获取当前datalist数组
          var arr2 = res.data.data; //从此次请求返回的数据中获取新数组
          var from_name1 = that.data.from_name
          for (var i = 0; i < res.data.data.length; i++) {
            from_name1[i] = 'order'
            switch (arr2[i].src) {
              case 'trueexam': arr2[i].src = '真题练习'; break;
              case 'order': arr2[i].src = '顺序练习'; break;
              case 'daily': arr2[i].src = '每日一练'; break;
              default: arr2[i].src = '';
            }

            if (arr2[i].have_done == "1") {
              arr2[i].have_done = "已做";
              arr2[i].color = "#07C160";
            } else {
              arr2[i].have_done = "未做";
              arr2[i].color = "#7232DD";
            }

          }
          arr1 = arr1.concat(arr2); //合并数组
          from_name1 = from_name1.concat(from_name1)
          // console.log('arr1',arr1)
          that.setData({
            contentInfo: arr1,
            from_name: from_name1
          });
          // console.log("content");
        }
      },
      fail: res => {
        console.log(res);
      }
    })
  },
  onLoad: function (options) {
    const openid = wx.getStorageSync('openid')
    console.log(options)
      this.setData({
        active: 0
      })
      this.data.contentInfo = []
      this.data.onLoad_flag = this.data.onLoad_flag + 1
      var chapter = parseInt(options.id) + 1;
      wx.setStorageSync("chapter", chapter.toString());
      wx.setStorageSync("type", "1");
      this.getdatalist("1");
  },
  onShow(){
    if(this.data.onLoad_flag >= 2){
      var idd = parseInt(wx.getStorageSync('chapter')) - 1
      this.onLoad({id: idd})
    }
    this.data.onLoad_flag = this.data.onLoad_flag+1
  },
  onReachBottom: function () {
    var that = this;
    var page = that.data.page + 1; //获取当前页数并+1
    that.setData({
      page: page, //更新当前页数
    })
    that.getdatalist(wx.getStorageSync("type"));
  }
})