// pages/postBook/postBook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minusStatus: true,
    courseCount: 1, //设置出售数量相关变量
    steps:[
      {
        text:'设置图书信息'
      },
      {
        text:'填写联系方式'
      }
    ],
    selectorItems:['信息','理学','文法','经管']
  },
  //加减数量
  addNum: function() {
    var courseCount = this.data.courseCount;
    courseCount++;
    this.setData({
      courseCount: courseCount,
      minusStatus: false
    })
  },
  //数字减1
  minusNum: function() {
    var courseCount = this.data.courseCount;
    if (courseCount > 1) {
      courseCount--;
    }
    //数字<=1时，开启 - 按钮的disable状态
    var minusStatus = courseCount <= 1 ? true : false; 
    this.setData({
      courseCount: courseCount,
      minusStatus: minusStatus
    });
  }
,
  /*科目选择滚动条,将选择到的显示*/
  selectorChange:function(e){
    let i=e.detail.value;
    let value=this.data.selectorItems[i];
    this.setData({selector:value});
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

  }
})