// pages/index/cet/translate/translate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    save: 'star-o',
    is_save: '收藏'
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
        break;
      case 1:
        wx.navigateTo({
          url: '../card/card',
        })
        break;
      case 2:
        break;
    }
  },

  save(e){
    // console.log(e)
    if(this.data.save == 'star-o')
    {
      this.setData({
        save : 'star',
        is_save : "已收藏"
      })
    }else{// todo 发送题目到后台 
      this.setData({
        save : 'star-o',
        is_save : '收藏'
      })
    }
  }

})