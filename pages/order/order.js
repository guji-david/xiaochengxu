//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
      title: '',
      id: '',
      price: 5,
      userInfo: {},
      cancelOrderModal:true,
      seatSuccessModal:true,
  },

  bindMakePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '17316146229'
    })
  },
    //取消订单
    bindCancelTap:function () {
        this.setData({
            cancelOrderModal:false
        })
    },
    cancelOrderConfirmBtn:function(){
        this.setData({
            cancelOrderModal:true
        })
    },
    cancelOrderCancelBtn:function(){
        this.setData({
            cancelOrderModal:true
        })
    },
    //确认入座
    bindSuccessTap:function () {
        this.setData({
            seatSuccessModal:false
        })
    },
    cancelSeatConfirmBtn:function(){
        this.setData({
            seatSuccessModal:true
        })
    },
    cancelSeatCancelBtn:function(){
        this.setData({
            seatSuccessModal:true
        })
    },
  onLoad: function (options) {
    var that = this;

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
        console.log(userInfo)
    })
  }
})