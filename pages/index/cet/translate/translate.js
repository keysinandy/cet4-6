// pages/index/cet/translate/translate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onChange(e) {
    console.log(e.detail);
    let cid = e.detail;
    switch (cid) {
      case 0:
        wx.showModal({
          title: '提示',
          content: '收藏吗'
        })
        break;
      case 1:
        wx.showModal({
          title: '提示',
          content: '还在做',
        })
        break;
      case 2:

        break;
    }
  },

})