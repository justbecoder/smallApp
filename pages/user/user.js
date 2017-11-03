// 加载自定义的js模块
const config = require('../../api/config.js')

// pages/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义用户的信息
    user: ''
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
    // 获取用户是否已经登录了
    let app = getApp();

    console.log(app)

    if (app.user) {
      this.setData({
        user: app.user
      })
    }
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

  /**
   * 定义用户扫一扫获取CNode社区用户二维码信息，用于登录
   * 
  */
  login () {
    // 存储this对象
    let that = this

    // 调用扫一扫
    // console.log('扫一扫')
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)

        // 提示正在登录
        wx.showLoading({
          title: '登录验证中...'
        })

        // 发送数据请求验证
        wx.request({
          url: config.apiUrl + '/accesstoken',
          method: 'POST',
          data: {
            accesstoken: res.result
          },
          success: (result) => {
            that.setData({
              user: result.data
            })

            // 要存储的数据
            let storageData = {
              id: result.data.id,
              accesstoken: res.result,
              loginname: result.data.loginname,
              avatar_url: result.data.avatar_url
            }

            console.log(storageData);

            // 将用户登录的信息存储到本地的
            wx.setStorage({
              key: 'user',
              data: storageData,
              success: () => {
                // 关闭loading
                wx.hideLoading()
              }
            })
          },

          // 是否是一个合法的Token值(是否是CNode社区的)
          fail: (error) => {
            // 手动关闭
            wx.hideLoading()

            // 提供错误提示
          }
        })
      },

      // fail判断时，判定是否是一个合法的二维码
      fail: (error) => {
        wx.showToast({
          title: '二维码无效',
          duration: 5000,
          mask: true,
          icon: 'loading',

          // 自定义图标
          image: '/images/error.png'
        })
        

        /*
        wx.showModal({
          title: '标题',
          content: '内容',
        })
        */
      }
    })
  }
})