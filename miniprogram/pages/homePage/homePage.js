// pages/home/home.js
var app=getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zong:[],
    imgWidth: 0, imgHeight: 0,
    navbar:["计算机","土木","机电","林学","经管","理学"],
    currentTab:0,
  },
  navbarTap:function(e){
    this.setData({
      currentTab:e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*db.collection('book').get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
    })*/
    let that = this;
    wx.cloud.callFunction({
      name:'funcquery',
      success:function(res){
        console.log(res.data)
        that.setData({
          zong:res.result.data,
        })
        console.log(that.data.zong)
      },fail:function(res){
        console.log(res)
      }
    })
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
  searchBooks: function() {
    wx.navigateTo({
      url: '../searchRes/searchRes'
    })
  }
})