var appData = getApp().globalData,
  app = getApp();
var js_date_time = require("../../../utils/util.js").js_date_time;
var dorecorddetailUrl = require('../../../config.js').dorecorddetailUrl
Page({
  data: {
    contentInfo: [],
    loading: true,
    footTitle: '没有更多题目了',
    hidden: true,
    hasInfo: false,
    from_name: [],
    page: 1,
    have_record: 0,
    show_false: false,
    type: ''
  },
  onClick(event) {
    this.data.page = 1
    this.setData({
      contentInfo: []
    })
    // this.data.contentInfo = []
    var index = parseInt(event.detail.index) + 1;
    wx.setStorageSync("type", index.toString());
    this.getdatalist(wx.getStorageSync("type"));
  },
  tap(event) {
    // 跳转解析页面，使用event.currentTarget.dataset.id
    var type_id = event.currentTarget.dataset.id
    type_id = type_id.substring(2)
    wx.navigateTo({
      url: "/pages/index/cet/analyse/analyse?chapter=" + wx.getStorageSync("chapter") + "&type=" + event.currentTarget.dataset.id[0] + "&id=" + type_id + "&from=" + this.data.from_name[event.currentTarget.id],
    })
  },
  getdatalist: function (typeid) {
    const openid = wx.getStorageSync('openid')
    // console.log(typeid);
    // this.data.contentInfo = []
    var that = this;
    wx.request({
      url: dorecorddetailUrl,
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
        if (res.data.msg !== "get_dorecorddetail success!" && that.data.page == 1) {
        } else if (res.data.msg !== "get_dorecorddetail success!" && that.data.page !== 1) {
        } else {
          var arr1 = that.data.contentInfo; //从data获取当前datalist数组
          // console.log('arr1',arr1)
          var arr2 = res.data.data; //从此次请求返回的数据中获取新数组
          var from_name1 = that.data.from_name
          // 转换时间
          for (var i = 0; i < res.data.data.length; i++) {
            arr2[i].done_time = js_date_time(res.data.data[i].done_time);
            from_name1[i] = arr2[i].src
            switch (arr2[i].src) {
              case 'trueexam': arr2[i].src = '真题练习'; break;
              case 'order': arr2[i].src = '顺序练习'; break;
              case 'daily': arr2[i].src = '每日一练'; break;
              default: arr2[i].src = '';
            }
          }
          //解决setdata爆炸所做的措施
          // var res_data = res.data.data
          // const { contentInfo } = that.data;
          // const start = contentInfo.length;
          // const updatecontentInfo = res_data.reduce((updatecontentInfo, item, index) => {
          //   const key = `contentInfo[${start + index}]`;
          //   updatecontentInfo[key] = item;
          //   return updatecontentInfo;
          // }, {})
          // console.log(updatecontentInfo)
          arr1 = arr1.concat(arr2); //合并数组
          // console.log('合并 arr1',arr1)
          from_name1 = from_name1.concat(from_name1)
          that.setData({
            contentInfo: arr1,
            from_name: from_name1
          })
        }
      },
      fail: res => {
      }
    })
  },

  onLoad: function (options) {
    // console.log('onload')
    var chapter = parseInt(options.id) + 1;
    wx.setStorageSync("chapter", chapter.toString());
    this.setData({
      show_false: options.show_false
    })
    this.getdatalist("1")
  },
  onShow(){
    console.log('onShow')
  },
  onReachBottom: function () {
    var that = this;
    var page = that.data.page + 1; //获取当前页数并+1
    that.data.page = page
    that.getdatalist(wx.getStorageSync("type"));
  }
})