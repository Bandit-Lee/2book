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
    array:[0,1,2,3,4,5],
    currentTab:'计算机',
    book_id:'',
    show_img:'',
  },
  navbarTap:function(e){
    this.setData({
      currentTab:e.currentTarget.dataset.idx
    })
  },
  toDetail:function(e){
    wx.navigateTo({
      url: '../bookInfo/bookInfo',
    })
    this.setData({
      book_id:e.currentTarget.dataset.idx,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.cloud.callFunction({
      name:'funcquery2',
      success:function(res){
        that.setData({
          zong:res.result.data,
        })
        console.log(res.result.data)
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
    this.onLoad()

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