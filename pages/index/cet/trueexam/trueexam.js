// pages/index/cet/trueexam/trueexam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paper:[
    ],
    name: 112,
    cet:''
  },

  onLoad(e){
    let datap = JSON.parse(decodeURIComponent(e.data))
    // console.log(datap)
    var array = this.data.paper
    // array[index]
    for(var i = 0;i < datap.length ; i++){
      array[i] = datap[i]
      this.setData({
        paper:array
      })
    }
    // console.log("paper",this.data.paper,e.cet)
    this.setData({
      cet:e.cet
    })
  },
  onShow(e){
  }
  

  
})