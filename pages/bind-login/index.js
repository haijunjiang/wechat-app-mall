// pages/bind-login/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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

  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var that = this;
    
    var loginToken = wx.getStorageSync('token')
    var username = e.detail.value.username;
    var password = e.detail.value.password;

    if (!username || !password) {
      wx.showModal({
        title: '错误',
        content: '请填写完整',
        showCancel: false
      })
      return
    }

    var postData = {
      token: loginToken,
      username: username,
      password: password
    }

    wx.showLoading();
    wx.request({
      url: app.globalData.subDomain + '/user/bind/login',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: postData, // 设置请求的 参数
      success: (res) => {
        wx.hideLoading();
        if (res.data.code != 0) {
          var title = res.data.code == -2 ? '提示' : '错误';
          wx.showModal({
            title: title,
            content: res.data.msg,
            showCancel: false
          })
          return;
        }
        wx.setStorageSync('userid', res.data.data.userid);
        wx.navigateBack({});
        wx.showToast({
          title: '绑定成功',
          icon: 'none',
        });
      }
    })
  }
})