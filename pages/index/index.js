// pages/index/index.js
var util = require("../../utils/util.js");
var num;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"金龙山浅草寺一百观音签",
    BtnInfo:"抽取今日份的签",
    BtnFlag:0,
    qian:"",
    QianMode:"none",
  },
  launch: function(e){
    if (!this.BtnFlag){
      let TimeWel = "";
      this.BtnFlag = 1;
      let date = new Date();
      let h = date.getHours();
      if (h >= 6 && h <= 11)
        TimeWel = "早上好，";
      else if (h >= 12 && h <= 18)
        TimeWel = "下午好，";
      else
        TimeWel = "晚上好，";
      let info = e.detail.userInfo;
      this.setData({
        name: TimeWel + info.nickName,
        BtnInfo: "抽取！"
      })
    }
    else if(this.BtnFlag == 1){
      this.BtnFlag = 2;
      num = Math.ceil(Math.random() * 100);
      let qianYan = util.ChouQian(num);
      wx.setStorageSync('Q', qianYan[0]);
      wx.setStorageSync('J', qianYan[1]);
      this.setData({
        qian:qianYan[0],
        QianMode:"flex",
        BtnInfo:"查看详情"
      });
    }
    else{
      wx.navigateTo({
        url: '/pages/detail/detail',
      })
    }
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