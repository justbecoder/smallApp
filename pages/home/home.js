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
    topics: [],
    isTop: false
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
    // 显示loading showLoading 不会自动消失
    wx.showLoading({
      title: '数据正在飞速传递...',
    })

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
        // 当前的数据 that.data.topics
        // 请求回来的数据 res.data.data
        let newTopics  = that.data.topics.concat(res.data.data)

        // 更新数据只能使用setData
        that.setData({
          topics: newTopics
        })

        // 手动关闭Loading状态
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 调用获取数据的函数
    this.getTopicData()

    let that = this
    // 读取本地是否用户已经登录了
    wx.getStorage({
      key: 'user',
      success: function (res) {
        // 调用getApp()
        let app = getApp()
        console.log(app.user)

        console.log(res)
        app.user = res.data

        console.log(app.user)
      },
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
    // 请求下一页的数据
    this.setData({
      page: this.data.page + 1
    })
    // console.log(this.data.page)

    // 再次调用函数
    this.getTopicData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 页面滚动事件
   * */ 
  onPageScroll: function (e) {
    if (e.scrollTop >= 300) {
      this.setData({
        isTop: true
      })
    }
  },

  /**
   * 定义回到顶部的方法
   * 
  */
  backToTop () {
    wx.pageScrollTo({
      scrollTop: 0
    })

    // 回到顶部元素，设置为false
    this.setData({
      isTop: false
    })
  },

  /**
   * imageError 当图片加载失败时，显示默认图片
   * 
  */
  imageError (e) {
    // console.log(e);

    /* 
      1. 要实现懒加载
      2. 当图片不能成功加载时，加载默认的图片
    */
  }
})