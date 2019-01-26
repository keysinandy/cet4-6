// pages/index/daily/daily.js
// const isempty =  require('../../../..//utils/isempty.js');
Page({
  data: {
    // undefined防止页面渲染图片路径时报错
    // theindex: undefined,
    // today: {}
    itemstyle1: "item active",
    itemstyle2:"item",
    questions:"1随着科技的进步，现在看电影的方式不一，既可以在家看DVD、网络电影，也可以选择在电影院观看电影。对此，你的看法呢？",
    article: "/images/articles/1.png",
    title:"美文题干",
    trueorfalse:true,
    btnanswer:"查看优选答案"
  },
  onLoad: function (options) {
    // 拿到参数
    // 请求后台数据
    // wx.request({
    //   url: '',
    // })

    // 得到参数
    // this.setData({
    //   theindex: options.index,
    //   today: this.data.dailyArray[options.index - 1]
    // })




  },
  // navbar切换
  changestyle:function(e){
    // 这里需要获取后台的题目和回答，赋值给questions和aiticle

    // 获取data自定义
    var index = e.target.dataset.index;
    if(index == "a"){
      this.setData({
        itemstyle1: "item active",
        itemstyle2:"item",
        questions:"1随着科技的进步，现在看电影的方式不一，既可以在家看DVD、网络电影，也可以选择在电影院观看电影。对此，你的看法呢？",
        article:"/images/articles/1.png",
        btnanswer: "查看优选答案",
        trueorfalse: true,
        title:"作文题目"
      })
    }else{
      this.setData({
        itemstyle1: "item",
        itemstyle2: "item active",
        questions: "2随着科技的进步，现在看电影的方式不一，既可以在家看DVD、网络电影，也可以选择在电影院观看电影。对此，你的看法呢？",
        article: "/images/translate/2.png",
        btnanswer: "查看优选答案",
        trueorfalse: true,
        title: "翻译题目"
      })
    }
  },
  checkanswer:function(){
    if (this.data.btnanswer =="查看优选答案"){
      this.setData({
        btnanswer: "收起答案",
        trueorfalse: false
      })
    }else{
      this.setData({
        btnanswer: "查看优选答案",
        trueorfalse: true
      })
    }
  },
  thenextqustion:function(){
      // 从后台重新请求数据
  }
})