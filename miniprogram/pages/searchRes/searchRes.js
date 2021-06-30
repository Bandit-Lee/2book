const db = wx.cloud.database();//初始化数据库
Page({
  data:{
    searchKey:'',//记录输入的查询字段
    search_list:[],
   },

   feedBackInput(e) {//输入框输入数据
    this.setData({
      searchKey: e.detail.value//赋值
    })
   },
   search: function () {
    //连接数据库
    if(!this.data.searchKey){
      wx.showToast({
        title: '还没输入书名呢……',
        icon: 'none',
        duration: 2000
        }) 
    }else{
      const db = wx.cloud.database()
    var that = this
    db.collection('fabujilu').where({
      //使用正则查询，实现对搜索的模糊查询
      bookname: db.RegExp({
        regexp: '.*' + that.data.searchKey,
        //从搜索栏中获取的value作为规则进行匹配。
        options: 'i',
        //大小写不区分
      }),
    }).get({
      success: res => {
        console.log(res)
        console.log(that.data.searchKey)
        that.setData({
          search_list: res.data,
        })
        console.log(this.data.search_list)
      }
    })
    }
  },
  toDetail:function(e){
    wx.navigateTo({
      url: '../bookInfo/bookInfo',
    })
    this.setData({
      book_id:e.currentTarget.dataset.idx,
    })
  },
  })
