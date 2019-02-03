
var appData = getApp().globalData,
  app = getApp();
Page({
  data: {
    info: [],
    loading: true,
    footTitle: '暂未领取优惠券',
  },
  tap: e => {
    console.log(e)
    wx.navigateTo({
      
    })
  },
  onLoad: function(op) {
    console.log('点击的id是：', op.id)
    wx.showLoading({ title: '加载中' })
    // 获取数据
    // wx.request({
    //   url: '',
    // })

    // 模拟从数据库获取的数据
    this.setData({
      questions: [
        { icon: '', src: '每日一练', intro: '...the _____ childern are...' },
        { icon: '', src: '专题训练', intro: '...finally, they _____ to...' },
        { icon: '', src: '每日一练', intro: '...why _____ the teachers...' },
      ],
      footTitle: '没有更多题目了',
      loading: false,
    })
    wx.hideLoading();
    this.setData({ footTitle: '没有更多题目了' })
  }

})