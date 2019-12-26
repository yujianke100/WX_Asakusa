// pages/index/index.js
const app = getApp(); 
const util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    BtnInfo:"抽取今日份的签",
    qian:"",
    QianMode:"none",
    titleStyle:"",
    btnStyle:"",
    waitStyle:"opacity: 0",
    bgiStyle:"opacity: 0.5",
    name:"",
  },

  change: function (qianYan, mode) {
    let that = this;
    if (!app.BtnFlag) {
      app.BtnFlag = 1;
      setTimeout(function () {
        that.setData({
          QianMode: "display:flex;opacity:1;",
          BtnInfo: "查看详情",
          qian: qianYan[0],
          waitStyle: "opacity: 0",
        });
        if (mode) {
          util.showSuccess("今天已经抽过了哦");
        }
      }, 1000);
      setTimeout(function () {
        that.setData({
          btnStyle: "opacity: 1",
        })
      }, 2000);
    }
    else {
      wx.navigateTo({
        url: '/pages/detail/detail',
      })
    }
  },

  Openid: function () {
    let that = this;
    if (!app.BtnFlag){
      that.setData({
        titleStyle: "opacity: 0",
        btnStyle: "opacity: 0",
        waitStyle: "opacity: 1",
        bgiStyle: "opacity: 0.2"
      });
    }
    let qianYan;
    let num = Math.ceil(Math.random() * 100);
    let mode = 0;
    wx.login({
      success(res) {
        wx.request({
            url: 'https://ayaya.press/xcx/mainXCX.php', //服务器地址
            data: {
              code: res.code,//请求参数
              num: num,
              mode: 1,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (codRes) {
              if (!codRes.data){
                qianYan = util.ChouQian(num);
              }
              else if (codRes.data >= 1 && codRes.data <= 100){
                qianYan = util.ChouQian(codRes.data);
                mode = 1;
              }
              else{
                console.log(codRes.data);
                wx.showToast({
                  title: '未知错误：' + codRes.data,
                })
                return;
              }
              wx.setStorageSync('Q', qianYan[0]);
              wx.setStorageSync('J', qianYan[1]);
              that.change(qianYan, mode);
            },
      })
    }
    })
  },

  launch: function(e){
    
    this.Openid();
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

  }
})