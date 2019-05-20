var appData = getApp().globalData;
const Url = require("../../../config.js").Url
const openid = wx.getStorageSync('openid')

Page({
  data: {
    sUrl: "https://sanleisen.cn:443/photo/CET/",//提供页面图标的服务器地址
    img_url: "'https://sanleisen.cn:443/photo/CET/signBG.jpg'",
    //isLogined: wx.getStorageSync('flag'),供登录使用
    task: [{
      name: '每日任务',
      detail: [
        { id: 0, name: "每日签到", img: "medal", exp: 10, n1: 0, n2: 1, status: '进行中' ,btn_status: 'primary'},
        { id: 1, name: "学习30分钟", img: "ticket", exp: 10, n1: 0, n2: 30, status: '进行中', btn_status: 'primary' },
        { id: 2, name: "答题得分", img: "favorite", exp: 40, n1: 0, n2: 40, status: '进行中', btn_status: 'primary' },
      ]
    }, {
      name: '每月任务', detail: [
        { id: 3, name: "连续打卡30天", img: "medal", exp: 100, n1: 0, n2: 30, status: '进行中', btn_status: 'primary'},
      ]
    }],
    bin: '',
    have_signin: '签到',
    always_signin: 0,
    sum_signin: 0,
    daily_signin_flag: 0,
    daily_time_flag: 0,
    daily_record_flag: 0,
    month_signin_flag: 0,
    signin_flag: 0,
    today_timerenwu: 0,
    // task_requestflag:0,
  },

  // ******************************************
  onLoad(e){
    var openid = wx.getStorageSync('openid')
    wx.showLoading({
      title: 'Loading',
    })
    console.log(appData.renwu_time)
    var timestamp = Date.parse(new Date())
    timestamp = timestamp / 1000
    var that = this
    wx.request({
      url: Url + '/Signin/get_signininfo',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        openid: openid,
        now_time: timestamp
      },
      success(e){
        // console.log(e)
        if(e.data.status == 200){
          that.data.always_signin = e.data.always_info
          that.data.sum_signin = e.data.allsignin_count
          if (e.data.have_signin == 0) {
            that.data.have_signin = '签到'
          } else {
            that.data.have_signin = '已签到'
          }
          that.setData({
            always_signin: that.data.always_signin,
            sum_signin: that.data.sum_signin,
            have_signin: that.data.have_signin
          })
          const openid = wx.getStorageSync('openid')
          wx.request({
            url: Url + '/User/get_renwuinfo',
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data: {
              openid: openid,
              timestamp: timestamp
            },
            success(e){
              wx.request({
                url: Url+'/User/get_signinimg',
                method: 'POST',
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                data: {
                  openid: openid
                },
                success(e){
                  console.log(e)
                  if(e.data.img != null){
                    that.setData({
                      img_url: e.data.img
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
              if (e.data.data.return_info.daily_signin == 0 || that.data.have_signin == '签到') {
                that.data.task[0].detail[0].status = '进行中'
                that.data.task[0].detail[0].btn_status = 'primary'

                // if(that.data.have_signin == '已签到'){
                //   that.data.task[0].detail[0].n1 = 1
                //   that.data.task[0].detail[0].status = '领取奖励'
                //   that.data.task[0].detail[0].btn_status = 'warning'
                // }else{
                //   that.data.task[0].detail[0].n1 = 0
                // }
              } else if (e.data.data.return_info.daily_signin == 2 && that.data.have_signin == '已签到') {
                that.data.task[0].detail[0].status = '已结束'
                that.data.task[0].detail[0].btn_status = 'warning'
                that.data.task[0].detail[0].n1 = 1
              } else if (e.data.data.return_info.daily_signin == null) {
                that.data.task[1].detail[0].status = '进行中'
                that.data.task[1].detail[0].btn_status = 'primary'
                that.data.task[1].detail[0].n1 = 0
              }else {
                that.data.task[0].detail[0].status = '领取奖励'
                that.data.task[0].detail[0].btn_status = 'warning'
                that.data.task[0].detail[0].n1 = 1
              }

              if (e.data.data.return_info.daily_time == 0) {
                that.data.task[0].detail[1].status = '进行中'
                that.data.task[0].detail[1].btn_status = 'primary'
                that.data.task[0].detail[1].n1 = parseInt(appData.renwu_time / 60)
              } else if (e.data.data.return_info.daily_time == 2) {
                that.data.task[0].detail[1].status = '已结束'
                that.data.task[0].detail[1].btn_status = 'warning'
                that.data.task[0].detail[1].n1 = 30
              } else if (e.data.data.return_info.daily_time == null) {
                that.data.task[1].detail[0].status = '进行中'
                that.data.task[1].detail[0].btn_status = 'primary'
                that.data.task[1].detail[0].n1 = 0
              } else {
                that.data.task[0].detail[1].status = '领取奖励'
                that.data.task[0].detail[1].btn_status = 'warning'
                that.data.task[0].detail[1].n1 = 30
              }

              if (e.data.data.return_info.daily_record == 0) {
                that.data.task[0].detail[2].status = '进行中'
                that.data.task[0].detail[2].btn_status = 'primary'
                that.data.task[0].detail[2].n1 = e.data.data.record_info
              } else if (e.data.data.return_info.daily_record == 2) {
                that.data.task[0].detail[2].status = '已结束'
                that.data.task[0].detail[2].btn_status = 'warning'
                that.data.task[0].detail[2].n1 = 40
              } else if (e.data.data.return_info.daily_record == null) {
                that.data.task[1].detail[0].status = '进行中'
                that.data.task[1].detail[0].btn_status = 'primary'
                that.data.task[1].detail[0].n1 = 0
              } else {
                that.data.task[0].detail[2].status = '领取奖励'
                that.data.task[0].detail[2].btn_status = 'warning'
                that.data.task[0].detail[2].n1 = 40
              }

              if (e.data.data.return_info.month_signin == 0) {
                that.data.task[1].detail[0].status = '进行中'
                that.data.task[1].detail[0].btn_status = 'primary'
                that.data.task[1].detail[0].n1 =parseInt(that.data.always_signin) % 30
              } else if (e.data.data.return_info.month_signin == 2) {
                that.data.task[1].detail[0].status = '已结束'
                that.data.task[1].detail[0].btn_status = 'warning'
                that.data.task[1].detail[0].n1 = 30
              } else if (e.data.data.return_info.month_signin == null){
                that.data.task[1].detail[0].status = '进行中'
                that.data.task[1].detail[0].btn_status = 'primary'
                that.data.task[1].detail[0].n1 = 0
              }else {
                that.data.task[1].detail[0].status = '领取奖励'
                that.data.task[1].detail[0].btn_status = 'warning'
                that.data.task[1].detail[0].n1 = 30
              }

              // console.log(e.data.data.return_info.daily_record)
              if (30 <= parseInt(appData.renwu_time / 60) && e.data.data.return_info.daily_time != 2) {
                that.data.task[0].detail[1].n1 = 30
                that.data.task[0].detail[1].status = '领取奖励'
                that.data.task[0].detail[1].btn_status = 'warning'
                that.setData({
                  task: that.data.task
                })
              }else{
                that.setData({
                  task: that.data.task,
                  // task_requestflag: 1
                })
              }
              wx.hideLoading()
              
            },
            fail(e){
              wx.showToast({
                title: '网络开小差了',
                icon: 'none'
              })
              wx.hideLoading()
            }
          })
        }else{
          wx.showToast({
            title: '网络开小差了',
            icon: 'none'
          })
          wx.hideLoading()
        }
      },
      fail(e){
        wx.showToast({
          title: '网络出小差了',
          icon: 'none'
        })
        wx.hideLoading()
      }
    })
  },
  onShow: function () {
    var list = [];
    for (let i = 0; i < 30; i++) list.push("white");
    this.setData({ bottonClr: list })
    
  },
  _set_learntime(e){
    var that = e
    if(that.data.task_requestflag == 0){
      that._set_learntime(that)
    }else{
      if (30 < parseInt(appData.renwu_time / 60)) {
        that.data.task[0].detail[1].n1 = 30
        that.data.task[0].detail[1].status = '领取奖励'
        that.data.task[0].detail[1].btn_status = 'warning'
        that.setData({
          task: that.data.task
        })
      }
    }
  },
  set_submit(e){
    var timestamp = Date.parse(new Date())
    timestamp = timestamp / 1000
    const openid = wx.getStorageSync('openid')
    if(this.data.signin_flag == 0){
      if (this.data.have_signin == '签到') {
        var that = this
        wx.request({
          url: Url + '/Signin/set_signininfo',
          method: 'POST',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: {
            openid: openid,
            now_time: timestamp
          },
          success(e) {
            that.data.signin_flag = 1
            that.onLoad()
          },
          fail(e) {
            wx.showToast({
              title: '网络出小差了',
              icon: 'none'
            })
          }
        })
      } else {
        wx.showToast({
          title: '今天已经签到过了哦',
          icon: 'none'
        })
      }
    }else{
      wx.showToast({
        title: '不要点太快啦',
        icon: 'none'
      })
    }
  },
  change_back(e){
    var that = this
    var openid = wx.getStorageSync('openid')
    console.log(e)
    wx.showModal({
      title: '注意',
      content: '确定更换背景吗？',
      success(e){
        if (e.confirm == true){
          wx.chooseImage({
            success: function(e) {
              console.log(e)
              wx.getImageInfo({
                src: e.tempFilePaths[0],
                success(e){
                  console.log(e)
                }
              })
              that.setData({
                img_url : e.tempFilePaths[0]
              })
              wx.request({
                url: Url+'/User/set_signinimg',
                method: 'POST',
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                data: {
                  openid: openid,
                  signin_img: that.data.img_url
                },
                success(e){
                  console.log(e)
                },
                fail(e){
                  wx.showToast({
                    title: e,
                    icon: 'none'
                  })
                }
              })
            },
          })
        }
      }
    })
  },
  renwu(e){
    const openid = wx.getStorageSync('openid')
    // console.log(e.currentTarget.id)
    var that = this
    var id = e.currentTarget.id
    switch(id){
      case '0':
        if (that.data.task[0].detail[0].status == '进行中'){
          wx.showToast({
            title: '还没学习够哦',
            icon: 'none'
          })
        } else if (that.data.task[0].detail[0].status == '已结束'){
          wx.showToast({
            title: '已经结束了哦',
            icon: 'none'
          })
        } else if (that.data.task[0].detail[0].status == '领取奖励' && that.data.daily_signin_flag == 0){
          const openid = wx.getStorageSync('openid')
          wx.request({
            url: Url + '/User/catch_dailysignin',
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data: {
              openid: openid,
            },
            success(e){
              if(e.data.status == 200){
                wx.showToast({
                  title: '领取成功!',
                })
                that.data.task[0].detail[0].status = '已结束'
                that.data.daily_signin_flag = 1
                that.setData({
                  task: that.data.task
                })
              }else{
                wx.showToast({
                  title: '网络开小差了哦',
                  icon: 'none'
                })
              }
            },fail(e){
              wx.showToast({
                title: '网络开小差了',
                icon: 'none'
              })
            }
          })
        }else{
          wx.showToast({
            title: '不要点太快啦',
            icon: 'none'
          })
        }
        break;
      case '1':
        
        if (that.data.task[0].detail[1].status == '进行中') {
          wx.showToast({
            title: '还没满足条件哦',
            icon: 'none'
          })
        } else if (that.data.task[0].detail[1].status == '已结束') {
          wx.showToast({
            title: '已经结束了哦',
            icon: 'none'
          })
        } else if (that.data.task[0].detail[1].status == '领取奖励' && that.data.daily_time_flag == 0) {
          wx.request({
            url: Url + '/User/catch_dailytime',
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data: {
              openid: openid,
            },
            success(e) {
              if (e.data.status == 200) {
                wx.showToast({
                  title: '领取成功!',
                })
                that.data.task[0].detail[1].status = '已结束'
                that.data.daily_time_flag = 1
                that.setData({
                  task: that.data.task
                })
              } else {
                wx.showToast({
                  title: '网络开小差了哦',
                  icon: 'none'
                })
              }
            }, fail(e) {
              wx.showToast({
                title: '网络开小差了',
                icon: 'none'
              })
            }
          })
        } else {
          wx.showToast({
            title: '不要点太快啦',
            icon: 'none'
          })
        }
        break;
      case '2':
        
        if (that.data.task[0].detail[2].status == '进行中') {
          wx.showToast({
            title: '还没满足条件哦',
            icon: 'none'
          })
        } else if (that.data.task[0].detail[2].status == '已结束') {
          wx.showToast({
            title: '已经结束了哦',
            icon: 'none'
          })
        } else if (that.data.task[0].detail[2].status == '领取奖励' && that.data.daily_record_flag == 0) {
          wx.request({
            url: Url + '/User/catch_dailyrecord',
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data: {
              openid: openid,
            },
            success(e) {
              if (e.data.status == 200) {
                wx.showToast({
                  title: '领取成功!',
                })
                that.data.task[0].detail[2].status = '已结束'
                that.data.daily_record_flag = 1
                that.setData({
                  task: that.data.task
                })
              } else {
                wx.showToast({
                  title: '网络开小差了哦',
                  icon: 'none'
                })
              }
            }, fail(e) {
              wx.showToast({
                title: '网络开小差了',
                icon: 'none'
              })
            }
          })
        } else {
          wx.showToast({
            title: '不要点太快啦',
            icon: 'none'
          })
        }
        break;
      case '3':
        
        if (that.data.task[1].detail[0].status == '进行中') {
          wx.showToast({
            title: '还没满足条件哦',
            icon: 'none'
          })
        } else if (that.data.task[1].detail[0].status == '已结束') {
          wx.showToast({
            title: '已经结束了哦',
            icon: 'none'
          })
        } else if (that.data.task[1].detail[0].status == '领取奖励' && that.data.month_signin_flag == 0) {
          wx.request({
            url: Url + '/User/catch_monthsignin',
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data: {
              openid: openid,
            },
            success(e) {
              if (e.data.status == 200) {
                wx.showToast({
                  title: '领取成功!',
                })
                that.data.task[1].detail[0].status = '已结束'
                that.data.month_signin_flag = 1
                that.setData({
                  task: that.data.task
                })
              } else {
                wx.showToast({
                  title: '网络开小差了哦',
                  icon: 'none'
                })
              }
            }, fail(e) {
              wx.showToast({
                title: '网络开小差了',
                icon: 'none'
              })
            }
          })
        } else {
          wx.showToast({
            title: '不要点太快啦',
            icon: 'none'
          })
        }
        break;
    }
  },
  onPullDownRefresh(e){
    this.onLoad()
  }
})