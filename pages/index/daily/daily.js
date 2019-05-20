// pages/index/daily/daily.js
// const isempty =  require('../../../..//utils/isempty.js');

const Url = require('../../../config.js').Url
Page({
  data: {
    topic_title: '',
    content: "",
    foot: "",
    translation: "",
    important_words: [
    ],
    id: 0,
    time: '',
  },
  onLoad: function (e) {
    this.data.id = e.id
    this.data.time = e.time
    const openid = wx.getStorageSync('openid')
    var that = this
    wx.request({
      url: Url + '/meiwen/get_meiweninfo',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: this.data.id
      },
      success(e) {
        // console.log(e.data.data)
        // console.log(e.data.data[0]['key_words'])
        if(e.data.status ==200){
          var word = e.data.data[0]['key_words']
          word = word.split('\n')
          console.log(word[0].split(' ').slice(1,).join(' ')) // split()字符串转换成数组,slice(取一部分数组),join(将数组转换回字符串)
          for(let j = 0,i = 0;i<word.length - 1;i++,j++){
            // console.log(word_obj)
            let word_obj = {}
            word_obj.words = word[i].split(' ')[0]
            word_obj.describe = word[i].split(' ').slice(1,).join(' ')
            // console.log(word_obj.describe)
            that.data.important_words[j] = word_obj
          }
          that.data.topic_title = e.data.data[0].title
          that.data.content = e.data.data[0].english_contents
          that.data.translation = e.data.data[0].chinese_contents
          if (e.data.data[0].foot != null){
            that.data.foot = e.data.data[0].foot
          }
          that.setData({
            topic_title: that.data.topic_title,
            time: that.data.time,
            content: that.data.content,
            translation: that.data.translation,
            foot: that.data.foot,
            important_words: that.data.important_words
          })
        }else{
          wx.showToast({
            title: '网络开小差了',
            icon: 'none'
          })
        }
      },
      fail(e){
        wx.showToast({
          title: '网络开小差了',
          icon: 'none'
        })
      }
    })

    // var topic_title = this.data.topic_title
    // var subStr = new RegExp('\n——', 'ig');//i 单个替换，ig全局
    // var result = topic_title.replace(subStr, "\n&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;——")
  },

  
})