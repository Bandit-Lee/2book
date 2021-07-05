const db = wx.cloud.database(); //初始化数据库
Page({
  data: {
    searchKey: '', //记录输入的查询字段
    search_list: [],
    searchHistory: []
  },
  onLoad: function(){
    if(!wx.getStorageSync('searchHistory')){ //第一次初始化
      wx.setStorageSync('searchHistory', this.data.searchHistory)
    }
    this.setData({
      searchHistory: wx.getStorageSync('searchHistory')
    })
  },
  feedBackInput(e) { //输入框输入数据
    this.setData({
      searchKey: e.detail.value, //赋值
    })
  },
  search: function () {
    //连接数据库
    if (!this.data.searchKey) {
      wx.showToast({
        title: '还没输入书名呢……',
        icon: 'none',
        duration: 1000
      })
    } else {
      //历史搜索
      this.setData({
        searchHistory: this.data.searchHistory.concat(this.data.searchKey)
      })
      wx.setStorageSync('searchHistory', this.data.searchHistory);

      const db = wx.cloud.database()
      var that = this
      db.collection('fabujilu').where({
        //使用正则查询，实现对搜索的模糊查询
        bookstatus: 'notbuy',
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
          if (this.data.search_list == '') {
            wx.showToast({
              title: '抱歉，搜索结果为空！',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '../bookInfo/bookInfo',
    })
    this.setData({
      book_id: e.currentTarget.dataset.idx,
    })
  },
  delete: function () {
    let that = this;
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '提示',
      content: '确定清除全部搜索历史吗?',
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('searchHistory', [])
          that.setData({
            searchHistory: []
          })
        } else {
          console.log('用户取消删除');
        }
      }
    })
  },
  historySearch: function(e){
    this.setData({
      searchKey: e.currentTarget.dataset.item
    })
    //连接数据库
      const db = wx.cloud.database()
      var that = this
      db.collection('fabujilu').where({
        //使用正则查询，实现对搜索的模糊查询
        bookstatus: 'notbuy',
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
          if (this.data.search_list == '') {
            wx.showToast({
              title: '抱歉，搜索结果为空！',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }
})
