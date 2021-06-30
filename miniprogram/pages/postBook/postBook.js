// pages/postBook/postBook.js
var utils = require('../postBook/util.js');
Page({
  data: {
    connect:'',
    showImg: '',
    nowtime: '1',
    count: 3,
    price: 0,
    active_step: 0,
    fangshi: '默认',
    username: ' ',
    bookname: '默认',
    minusStatus: true,
    imgURL: [],
    courseCount: 1, //设置出售数量相关变量
    imgbox: [], //选择图片
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
//图片上传
  // 删除照片 &&
  deleteImg: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 选择图片 &&&
  addImage: function (e) {
    var imgbox = this.data.imgbox;
    var that = this;
    var n = 5;
    if (5 > imgbox.length > 0) {
      n = 5 - imgbox.length;
    } else if (imgbox.length == 5) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (5 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imgbox: imgbox
        });
      }
    })
  },

   //图片
   imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
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
  setconnect(e){
    this.setData({ connect: e.detail.value })
  },
  //提交信息
  submit() {
    this.setData({active_step: 1})
    // 云函数入口文件
    var TIME = utils.formatTime(new Date())
    this.setData({nowtime:TIME}) 
    const db = wx.cloud.database()
    //获取缓存中的用户名
    var value = wx.getStorageSync('user')
    this.setData({username: value.nickName})
    //上传图片到云存储
    console.log('总图片数量：'+this.data.imgbox.length)
    let promiseArr = [];
    wx.showLoading({
      title: '图片上传中',
      mask: true,
    })
    for (let i = 0; i < this.data.imgbox.length; i++) {
      promiseArr.push(new Promise((reslove, reject) => {
        let item = this.data.imgbox[i];
        let suffix = /\.\w+$/.exec(item)[0]; //正则表达式返回文件的扩展名
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
          filePath: item, // 小程序临时文件路径
          success: res => {
            this.setData({
              fileIDs: this.data.fileIDs.concat(res.fileID),
            });
            console.log(this.data.fileIDs)
            console.log(res.fileID) //输出上传后图片的返回地址
            reslove();
          },
          fail: res => {
            wx.hideLoading();
            wx.showToast({
              title: "上传失败",
            })
          }
        })
      }));
    }
    db.collection('fabujilu').add({
      data: {
        //属性:变量名,
        bookname: this.data.bookname,
        booknum: this.data.courseCount,
        getfangshi: this.data.fangshi,
        subject: this.data.selector,
        imgurl: this.data.imgURL,
        connect: this.data.connect,
        username: this.data.username,
        price: this.data.price,
        time: this.data.nowtime
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

  /*
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

  */
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
  }
})