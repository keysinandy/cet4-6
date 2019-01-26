const Url = require("../config.js").apiUrl
var url = "wss://sanleisen.cn" 
// var url = "wss://sanleisen.cn:443/1/index.php/Api/Gateway/route?method=pingshifen.UserBase.websocket1" 


function connect(user, func) {

  wx.connectSocket({

    url: url,
    header: { 'content-type': 'application/x-www-form-urlencoded;' },
    // header: { 'content-type': 'application/json' },
    method: "GET",
    success: function () {

      console.log('信道连接成功~')

    },

    fail: function () {

      console.log('信道连接失败~')

    }

  })

  wx.onSocketOpen(function (res) {

    wx.showToast({

      title: '信道已开通~',

      icon: "success",

      duration: 2000

    })

    //接受服务器消息

    wx.onSocketMessage(func);//func回调可以拿到服务器返回的数据
        console.log(func)
  });

  wx.onSocketError(function (res) {

    wx.showToast({

      title: '信道连接失败，请检查！',

      icon: "none",

      duration: 2000

    })

  })

}

//发送消息

function send(msg) {

  wx.sendSocketMessage({

    data: msg

  });

}

module.exports = {

  connect: connect,

  send: send

}