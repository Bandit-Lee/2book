//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
        env: "abysswatcher-zxkmf"
    }),
    this.globalData = {}
  }
})
