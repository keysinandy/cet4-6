var app = getApp();
var appData = getApp().globalData;
var input = '';
Page({

  input: function (e) {
    input = e.detail.value;
    console.log(input);
  },

  ok: function (e) {
    // wx.request({
    //   url: '',
    // });
    if (input.length < 20) {
      wx.showModal({
        title: '信息太短',
        content: '提交的反馈太短，本次提交不能发送哦~',
      });
      return 0;
    }
    wx.showToast({
      title: '提交成功',
    });
  }
})