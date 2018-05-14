//index.js
var util = require('../../utils/util.js');
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},
        hiddenmodalput: true,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
        getVerifyCodeText: '获取验证码',
        count: 60,
        intervalId: '',
        disabled: false,
        code: '',//验证码
        phone: '',//手机号
       
    },
    his_clear:function(){
        app.toastShow(this, "清除成功", "icon-correct");
    },
    //验证码输入框
    code: function (e) {
      var that = this;
      that.setData({
        code: e.detail.value
      })
    },
    //手机号输入框
    phone: function (e) {
      console.log(e.detail.value);
      var that = this;
      that.setData({
        phone: e.detail.value
      })
      if (!util.checkTel(e.detail.value)){
        wx.showToast({
          title: '请输入正确的手机号',
          // icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
    },
    //点击按钮指定的hiddenmodalput弹出框  


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
          count: 60
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





    modalinput: function () {
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
    },
    //取消按钮  
    cancel: function () {
      this.setData({
        hiddenmodalput: true
      });
    },
    //确认  
    confirm: function () {
      if (!util.checkTel(this.data.phone)) {
        this.his_clear();
     
      }
      // this.setData({
      //   hiddenmodalput: true
      // })
    } ,

    onLoad: function () {
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            })
          
        })
    }
})