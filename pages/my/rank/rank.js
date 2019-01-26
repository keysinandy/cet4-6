// 后端所有需要请求的数据:用户的头像昵称和分数.赋值给userInfo1,userInfo2,在changestyle函数里赋值.
var Url = 'https://sanleisen.cn'
Page({
  data: {
    itemstyle1: "item active",
    itemstyle2: "item",
    title: "四级",
    // userInfo传入用户的头像，昵称，分数,以下为虚拟数据
    userInfo1:[
      { avatar: Url+"/photo/CET/avatars/1.jpg", username: '111', score: '740' },
      { avatar: Url +"/photo/CET/avatars/2.jpeg", username: '222', score: '710' },
      { avatar: Url +"/photo/CET/avatars/3.jpeg", username: '333', score: '700' }
    ],
    userInfo2:[
      { avatar: Url +"/photo/CET/avatars/4.jpeg", username: '444', score: '655' },
      { avatar: Url +"/photo/CET/avatars/5.jpeg", username: '555', score: '645' },
      { avatar: Url +"/photo/CET/avatars/6.jpeg", username: '666', score: '633' },
      { avatar: Url +"/photo/CET/avatars/7.jpeg", username: '777', score: '610' },
      { avatar: Url +"/photo/CET/avatars/8.jpg", username: '888', score: '592' },
      { avatar: Url +"/photo/CET/avatars/9.jpg", username: '999', score: '587' },
      { avatar: Url +"/photo/CET/avatars/10.jpeg", username: '1010101111111111111', score: '555' }
    ]
      },
  onLoad: function (options) {

  },
  // navbar切换
  changestyle: function (e) {
    var index = e.target.dataset.index;
    if (index == "a") {
      // 在这里请求四级数据赋值给userInfo1,userInfo2
      this.setData({
        itemstyle1: "item active",
        itemstyle2: "item",
        title: "四级"
      })
    } else {
      // 在这里请求六级数据赋值给userInfo1,userInfo2
      this.setData({
        itemstyle1: "item",
        itemstyle2: "item active",      
        title: "六级"
      })
    }
  },

  thenextqustion: function () {
    // 从后台重新请求数据
  }
})