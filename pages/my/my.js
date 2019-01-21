// pages/my/my.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  jumpmyrelease: function () {
    wx.navigateTo({
      url: '../myrelease/myrelease'
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    console.log("getUserInfo成功")
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    app.globalData.nickName = e.detail.userInfo.nickName
    app.globalData.imageUrl = e.detail.userInfo.avatarUrl


    var user = wx.getStorageInfoSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    if ((!user.openId || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {

      // 登录
      wx.login({
        success: res => {
          if (res.code) {
            var appid = 'wxb691f0da5d916c90';//appid需自己提供
            var secret ='c48a65d70320e42d4386256d3e8982d1';//secret需自己提供
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({
              url: l,
              data: {},
              method: 'GET',
              success: function (res) {
                console.log(res.data.openid)
                var obj = {};
                obj.openid = res.data.openid;
                obj.expires_in = Date.now() + res.data.expires_in;
                console.log(res);
                wx.setStorageSync('user', obj);
                app.globalData.openId = res.data.openid;
                wx.request({
                  url: "http://localhost:8989/user",
                  data: {
                    userOpenid: obj.openid,
                    userName: app.globalData.nickName,
                    userImage: app.globalData.imageUrl,                  
                  },
                  method: "POST",
                  header: {
                    'content-type': 'application/json'
                  },
                  success(r) {
                    console.log(r.data);
                  }
                })
              }            
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        },
        fail: function (res) {
          console.log("failed");
        }
      });
    }
    //获取信息后返回首页
    wx.switchTab({
      url: '../index/index',
    })

  },

})