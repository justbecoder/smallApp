// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义变量
    tab: 'all',
    page: 1,
    limit: 40,
    topics: []
  },

  // 自定义方法
  switchTab (options) {
    let tab = options.target.dataset.tab

    // 小程序中更新数据
    this.setData({
      tab: tab
    });

    // 调用获取数据的方法
    this.getTopicData()
  },

  // 定义获取话题列表的方法
  getTopicData () {
    // 存储this上下文环境
    let that = this
    // console.log(this.data.tab)

    // 发送请求
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      data: {
        tab: this.data.tab,
        page: this.data.page,
        limit: this.data.limit
      },
      method: 'GET',
      success: (res) => {
        console.log(res.data.data)
        that.setData({
          topics: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 调用获取数据的函数
    this.getTopicData()
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