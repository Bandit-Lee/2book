// pages/postBook/postBook.js
Page({
  data: {
    price: 0,
    active_step: 0,
    fangshi: '默认',
    username: ' ',
    bookname: '默认',
    minusStatus: true,
    imgURL: '',
    courseCount: 1, //设置出售数量相关变量
    imgs: [],//本地图片地址数组
    picPaths: [],//网络路径
    steps: [
      {
        text: '填写图书信息'
      },
      {
        text: '发布完成'
      }
    ],
    selectorItems: ['计算机', '土木工程', '机电', '林学', '经济管理', '理学']
  },
  //获取填写的信息
  setprice(e){
    this.setData({price: e.detail.value})
  },
  setbookname(e) {
    this.setData({ bookname: e.detail.value })
  },
  setfangshi(e) {
    this.setData({ fangshi: e.detail.value })
  },
  //提交信息
  submit() {
    this.setData({active_step: 1})
    // 云函数入口文件
    const db = wx.cloud.database()
    //获取缓存中的用户名
    var value = wx.getStorageSync('user')
    this.setData({username: value.nickName})
    db.collection('fabujilu').add({
      data: {
        //属性:变量名,
        bookname: this.data.bookname,
        booknum: this.data.courseCount,
        getfangshi: this.data.fangshi,
        subject: this.data.selector,
        imgurl: this.data.imgURL,
        username: this.data.username,
        price: this.data.price
      },
      success(res) {
        console.log("提交成功", res);
      },
      fail(err) {
        console.log("失败", err);
      }
    })
    wx.showToast({
      title: '发布成功',
      duration: 1000
    })
  },
  //添加上传图片
  chooseImageTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  //图片本地路径
  chooseWxImage: function (type) {
    var that = this;
    var imgsPaths = that.data.imgs;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths[0]);
        that.uploadImage(res.tempFilePaths[0], 0) //调用上传方法
      }
    })
  },
  //上传云存储并获取url
  uploadImage(fileURL) {
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
      filePath: fileURL, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log("上传成功", res)
        //获取文件路径
        this.setData({
          imgURL: res.fileID
        })
      },
      fail: console.error
    })
  },
  //加减数量
  addNum: function () {
    var courseCount = this.data.courseCount;
    courseCount++;
    this.setData({
      courseCount: courseCount,
      minusStatus: false
    })
  },
  //数字减1
  minusNum: function () {
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
  selectorChange: function (e) {
    let i = e.detail.value;
    let value = this.data.selectorItems[i];
    this.setData({ selector: value });
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