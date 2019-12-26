const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qian:"",
    jie:""
  },
  about:function(){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  bangQian: function(){
    this.OpenidDelete();
  },

  OpenidDelete: function () {
    wx.login({
      success(res) {
        wx.request({
          url: 'https://ayaya.press/xcx/mainXCX.php', //服务器地址
          data: {
            code: res.code,//请求参数
            num: -1,
            mode: 0,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (codRes) {
            app.BtnFlag = 0;
            wx.showModal({
              title: '提示',
              content: '已经把签诗绑上了哦',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  wx.clearStorage();
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          },
          fail: function (codRes){
            wx.showToast({
              title: '未知错误',
              showCancel: false
            })
          },
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'Q',
      success: function(res) {
        that.setData({
          qian:res.data,
        })
      },
    })
    wx.getStorage({
      key: 'J',
      success: function (res) {
        that.setData({
          jie: res.data,
        })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})