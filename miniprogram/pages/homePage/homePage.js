// pages/home/home.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgWidth: 0, imgHeight: 0,
    navbar:["计算机","土木","机电","林学","经管","理学"],
    currentTab:0,
    books: [
      {
        title: '示例图片',
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F4b8af9baadb530af2dd38483204b1ac5e1ec0c94.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626309038&t=dbe2f7cbb5e45b9def2aa248914e099f',
      },
      {
        title: '示例图片',
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
      },
      {
        title: '示例图片',
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fe%2F5487ece43e51e.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626309119&t=0b597271c13d003f318610d5c49f1116',
      },
      {
        title: '示例图片',
        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2109100018,146501281&fm=26&gp=0.jpg',
      },
      {
        title: '示例图片',
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg'
      },
 
      {
        title: '示例图片',
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-12-22%2F5a3ccebc23851.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626309119&t=eb559675b6bcbd843845e5a30eee2ef7'
      },
      {
        title: '示例图片',
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-12-04%2F5a24f9e4559ba.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626309119&t=0df65d030ffd734d26a4fa35eb25aa8e'
      },
      {
        title: '示例图片',
        url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg'
      },
      {
        title: '示例图片',
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg'
      },
    ],
    books_jsj:[
      {
        title:'汇编',
        url:'../../images/计算机/汇编.jpg'
      },
      {
        title:'计网',
        url:'../../images/计算机/计网.jpg'
      },
      {
        title:'计组',
        url:'../../images/计算机/计组.jpg'
      },
      {
        title:'算法',
        url:'../../images/计算机/算法.jpg'
      },
      {
        title:'嵌入式',
        url:'../../images/计算机/嵌入式.jpg'
      },
      {
        title:'HTML5',
        url:'../../images/计算机/H5.jpeg'
      },
    ],
    books_tumu:[
      {
        title:'爆破工程',
        url:'../../images/土木/爆破工程.jpg'
      },
      {
        title:'测量',
        url:'../../images/土木/测量.jpg'
      },
      {
        title:'混凝土结构',
        url:'../../images/土木/混凝土结构.jpg'
      },
      {
        title:'力学',
        url:'../../images/土木/力学.jpg'
      },
      {
        title:'土木施工',
        url:'../../images/土木/土木施工.jpg'
      },
      {
        title:'cad',
        url:'../../images/土木/cad.jpg'
      },
    ]
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