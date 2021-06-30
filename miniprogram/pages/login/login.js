// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 授权登录
  chooseTap: function(e) {
    //如果未授权，就提示授权，如果授权了，就执行正常的业务逻辑
     if (!wx.getStorageSync('user')) {
       this.login()
       return
     }
     wx.switchTab({
      url: '../homePage/homePage'
    });
   },
  login: function(){
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '获取信息仅用于登录绿书账号,请放心授权',
      success(res) {
        console.log(res)
        //如果用户点击了确定按钮
        if (res.confirm) {
          wx.getUserProfile({
            desc: '获取你的昵称、头像、地区及性别',
            success: res => {
              app.globalData.userName = res.userInfo.nickName;
              app.globalData.userAvatar = res.userInfo.avatarUrl;
              console.log(res.userInfo);
              wx.setStorageSync('user', res.userInfo);
              console.log("获取昵称和头像成功");
              wx.cloud.callFunction({
                name: 'getOpenid',
                complete: res => {
                  // 获取到用户的 openid
                  console.log('云函数获取到的openid: ', res.result.openid);
                  wx.setStorageSync('openid', res.result.openid);
                  console.log(res);}
                })
              //跳转到主界面
              wx.showToast({
                title: '正在登录',
                icon: 'loading',
                duration: 2000
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '../homePage/homePage'
                });
              }, 2001)//延时 为获取openid提供时间
            },
            fail: res => {
              console.log(res)
              //拒绝授权
              wx.showToast({
                title: '登录失败',
                icon: 'error',
                duration: 2000
              });
              return;
            }
          });
        } else if (res.cancel) {
          //如果用户点击了取消按钮
          console.log(3);
          wx.showToast({
            title: '登录失败',
            icon: 'error',
            duration: 2000
          });
          return;
        }
      }
    })
  },
})