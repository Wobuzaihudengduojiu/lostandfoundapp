//app.js
const app = getApp()
App({
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  onLaunch: function () {
    // 获取用户信息
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      success(res) {
        console.log(res);
      },
      fail(err) {
        console.log(err, '获取用户信息失败');
        wx.showModal({
          title: '警告',
          content: '尚未经行授权，请点击确定跳转到授权页面进行授权',
          success: function (res) {
            if (res.confirm) {
              console.log("用户点击确定")
              wx.switchTab({
                url: '../my/my',
              })
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
    imageUrl: null,
    nickName: null
  }
})