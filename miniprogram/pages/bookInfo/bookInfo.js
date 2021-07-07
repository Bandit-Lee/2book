// pages/bookInfo/bookInfo.js
const db =wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    zong2:[],
    buy_info:'',
  },
  buy:function(e){
    wx.showToast({
      title: '购买成功',
    })
    let that = this;
    db.collection('fabujilu').doc(this.data.id).update({
      data:{
        bookstatus:"alreadybuy",
        buy_openid:wx.getStorageSync('openid')
      },
      success:function(res){
        //console.log(that.data.id)
        that.fresh();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fresh();
    
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

  }
  ,
  fresh: function () {
    var pages = getCurrentPages();
    var prepage = pages[pages.length-2];
    this.setData({
        id:prepage.data.book_id,
    })
    //console.log(this.data.id)
    let that = this;
    wx.cloud.callFunction({
      name:'funcquery',
      success:function(res){
        that.setData({
          zong2:res.result.data,
        })
        that.data.zong2.forEach(function(item){
          if(item._id==that.data.id){
            //console.log(item.buystatus)
            if(item.bookstatus=="notbuy"){
              that.setData({
                buy_info:"购买"
              })
            }
            else{
              that.setData({
                buy_info:"交易中"
              })
            }
          }
        })
        //console.log(that.data.zong2)
      },fail:function(res){
        console.log(res)
      }
    })
    
  }
})