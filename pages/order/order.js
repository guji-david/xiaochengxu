//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    title: '',
    id: '',
    price: 5,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindMakePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '17316146229'
    })
  },
  onLoad: function (options) {
    console.log('onLoad');
    var that = this;
    that.setData({
      title: options.title//options为页面路由过程中传递的参数
    })
    wx.setNavigationBarTitle({
      title: that.data.title//页面标题为路由参数
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      console.log(that.data.userInfo);
    })
  }
})