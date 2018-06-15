//index.js
var util = require('../../utils/util.js');
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},
        hiddenmodalput: false,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
        getVerifyCodeText: '发送验证码',
        count: 60,
        intervalId: '',
        mobile:'',
        disabled: false,
        code: '',//验证码
        phone:'',//手机号
        maskVisable:false
    },
    //toast 全局调用
    toastApply:function(msg){
        app.toastShow(this,msg);
    },
    //验证码输入框
    code: function (e) {
      var that = this;
      that.setData({
        code: e.detail.value
      })
      if (!util.checkCode(e.detail.value)) {
        this.toastApply("请输入6位验证号");
        return;
      }
    },
    //手机号输入框
    phone: function (e) {
        if (!util.checkTel(e.detail.value)){
            this.toastApply("请输入正确的手机号");
        }
      var that = this;
      that.setData({
        phone: e.detail.value
      })

    },



    //发送验证码按钮--------------------------------------------------begin
    bindSendCodeTap: function () {
      if (!util.checkTel(this.data.phone)) {
        this.toastApply("请输入正确的手机号");

        return;
      }
      
      this.disabled = true;
      
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
          getVerifyCodeText: '发送验证码'
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
          maskVisable: !this.data.maskVisable,
        hiddenmodalput: !this.data.hiddenmodalput
      })
    },
    //取消按钮  
    cancel: function () {
      this.setData({
          maskVisable:false,
        hiddenmodalput: false
      });
    },
    //确认  
    confirm: function () {
      if (!util.checkTel(this.data.phone)) {
        this.toastApply("请输入正确的手机号");
       return;
      }
      if (!util.checkCode(this.data.code)) {
        this.toastApply("请输入6位验证号");
        return;
      }
      this.setData({
          maskVisable:false,
          hiddenmodalput: false,
          mobile :util.desensitization(this.data.phone)
      })
        util.setMobile('mobile', this.data.phone)
    } ,

    onLoad: function () {
        this.setData({
            mobile: util.desensitization(util.getMobile('mobile'))
        })
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