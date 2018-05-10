//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        maskVisable:false,
        seatVisable: false,
        payVisable:false,
        title:'',
        id:'',
        price: 5,
        userInfo: {
          
        },
          totalPerson:'',//人数
          totalPrice:'',//出价
          code:'',//验证码
          phone:'',//手机号
          mark:'',//备注
          getVerifyCodeText:'获取验证码',
          count:6,
          intervalId:'',
          disabled:false
        
    },
    totalPerson: function (e) {
      var that = this;
      that.setData({
        totalPerson: e.detail.value
      })
    },//人数
    totalPrice: function (e) {
      var that = this;
      that.setData({
        totalPrice: e.detail.value
      })
    },//出价
    code: function (e) {
      var that = this;
      that.setData({
        code: e.detail.value
      })
    },//验证码
    phone: function (e) {
      var that = this;
      that.setData({
        phone: e.detail.value
      })
    },//手机号
    mark: function (e) {
      var that = this;
      that.setData({
        mark: e.detail.value
      })
    },//备注
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    //电话沟通
    bindMakePhoneCall:function(){
      wx.makePhoneCall({
        phoneNumber: '17316146229' 
      })
    },
    
    //关闭抢座弹出框
    bindSeatPop: function () {
      this.setData({
        maskVisable: false,
        seatVisable: false
      })
    },
    //关闭抢座弹出框
    bindParPop: function () {
      this.setData({
        payVisable: false,
        seatVisable: true
      })
    },
    //发送验证码按钮--------------------------------------------------begin
    bindSendCodeTap: function () {
      this.disabled = true;
      console.log(11111)
      this.setData({
        disabled: true
      })
      this.countDown();
      this.setData({
       
      })
    },
    numInterval: function () {
      var that = this;
      that.setData({
        getVerifyCodeText: that.data.count + '秒后重发'
      })

    
      that.data.count--;
      if (that.data.count <= 0) {
        clearInterval(that.data.intervalId);
        that.setData({
          getVerifyCodeText: '获取验证码'
        })
        that.setData({
          count:60
        })
        that.setData({
          disabled: false
        })
        // that.getVerifyCodeText = '获取验证码';
        // that.getVerifyCodeDisabled = false;
        // that.borderColor = "#ff9959";
        // that.count = 60;
      }
    },
    countDown: function () { // 倒计时
      var that = this;
      that.setData({
        intervalId: setInterval(function () {
          that.numInterval();
        }, 1000)
      })


    },
    //发送验证码按钮--------------------------------------------------end


    //确认抢座按钮
    bindSeatBtn: function () {
      this.setData({
        payVisable: true,
        seatVisable: false
      })
    },
    //确认支付按钮
    bindPayBtn: function () {
      this.setData({
        maskVisable: false,
        payVisable: false
      })

      wx.requestPayment(
        {
          'timeStamp': '',
          'nonceStr': '',
          'package': '',
          'signType': 'MD5',
          'paySign': '',
          'success': function (res) { },
          'fail': function (res) { },
          'complete': function (res) { }
        }) 


    },
    onLoad: function (options) {
        console.log('onLoad');
      
        this.setData({
          maskVisable: true,
          seatVisable: true
        })
        var that = this;
        // that.setData({
        //   title: options.title//options为页面路由过程中传递的参数
        // })
        // wx.setNavigationBarTitle({
        //   title: that.data.title//页面标题为路由参数
        // })
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            })
            console.log(that.data.userInfo);
        })
    }
})