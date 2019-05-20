//change.js
const userUrl = require('../../../config.js').userUrl
Page({
    data: {
      lastText: '',
      changeText: '',
      changeWhat:'',
      title:'',
      is_other: false,
      is_date: false,
      is_sex: true,
      now_date: '2019-2-25',
      array: ['男', '女', '保密'],
      index: 0,
    },

    onChange(event) {
      // event.detail 为当前输入的值
      this.data.changeText = event.detail
    },

  bindDateChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      changeText: e.detail.value
    })
  },
  bindPickerChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      changeText: this.data.array[e.detail.value]
    })
  },
    onLoad(e){
      console.log(e)
      if(e.changeWhat == 'school_time')
      {
        this.setData({
          changeWhat: e.changeWhat,
          title: e.changeWhat,
          changeText:e.info,
          lastText: e.info,
          is_other: false,
          is_sex: false,
          is_date: true
        })
      } else if(e.changeWhat == 'sex'){
        if(e.info == '男'){
          this.data.index = 0
        } else if (e.info == '女') {
          this.data.index = 1
        } else if (e.info == '保密') {
          this.data.index = 2
        }
        this.setData({
          changeWhat: e.changeWhat,
          title: e.changeWhat,
          index: this.data.index,
          changeText: e.info,
          lastText: e.info,
          is_other: false,
          is_sex: true,
          is_date: false
        })
      } else {
        this.setData({
          changeWhat: e.changeWhat,
          title: e.changeWhat,
          changeText: e.info,
          lastText: e.info,
          is_other: true,
          is_sex: false,
          is_date: false
        })
      }
    },

    save(e){
      // console.log(this.data.changeText)
      // var
      if(this.data.changeText == '' || this.data.changeText == this.data.lastText){
        console.log("2")
        wx.navigateBack({// todo 注意异步同步问题
          delta: 1
        })
      }else{
        const openid = wx.getStorageSync('openid')
        wx.request({
          url: userUrl + 'changeInfo',
          data: {
            changeWhat: this.data.changeWhat,
            changeText: this.data.changeText,
            openid: openid,
          },
          success(e) {
            console.log('改变时返回', e)
            wx.removeStorageSync('userInfo')
            wx.setStorageSync('userInfo', e.data.data[0])
            wx.navigateBack({// todo 注意异步同步问题
              delta: 1
            })
          }
        })
      }
    }
})