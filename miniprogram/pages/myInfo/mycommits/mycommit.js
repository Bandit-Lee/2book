var _app = getApp()
Page({

  data: {
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: [],
  },

  onLoad: function(options) {
    
    if (_app.globalData.openid) {
      this.setData({
        openid: _app.globalData.openid
      })
    }else{
      let that =this;
      wx.cloud.callFunction({
        name: 'getOpenid', 
        data: {},
        success: function(res) {
          console.log(res.result.openid) 
          that.setData({
            openid: res.result.openid
          })
        },
        fail: console.error
      })
    }
  },

  onQuery: function() {
    const db = wx.cloud.database()  
    console.log(this.data.openid);
    db.collection('fabujilu').where({
      _openid:this.data.openid,
    }).get({
      success: res => {
        if(res.data.length>0)
        this.setData({
          queryResult: res.data
        })
        else
        this.setData({
          queryResult: null
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
})