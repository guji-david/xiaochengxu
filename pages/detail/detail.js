//index.js
var util = require('../../utils/util.js');
//获取应用实例
var app = getApp()
Page({
    data: {
        maskVisable:false,
        seatGiveVisable:false,
        payVisable:false,
        orderModalVisable:true,
        orederCancelVisable:false,
        orederSeatVisable:false,
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
          disabled:false,
          desensPhone:'',
          noticeMsg:'花钱省时间,支付成功后,你将可以随时消抢座,平台将退回所支付金额(如果你的抢订单被接单后,取消需要口3元服务)',
          seatsdate:'',
         seatRushVisable:true
        
    },
    //toast 全局调用
    toastApply:function(msg){
        app.toastShow(this,msg);
    },
    //人数 方法
    totalPerson: function (e) {
        if (!util.checkNum(e.detail.value)) {
            this.toastApply("请输入长度不超过2的数字");
            return;
        }
      var that = this;
      that.setData({
        totalPerson: e.detail.value
      })
    },
    //出价 方法
    totalPrice: function (e) {
        if (!util.checkNum(e.detail.value)) {
            this.toastApply("出价不能为空");
            return;
        }
      var that = this;
      that.setData({
        totalPrice: e.detail.value
      })
    },

    //手机号 方法
    phone: function (e) {
        if (!util.checkTel(e.detail.value)){
            this.toastApply("请输入正确的手机号");
        }
        var that = this;
        that.setData({
            phone: e.detail.value
        })
        util.setList('mobile', this.data.phone)
    },
    //验证码 方法
    code: function (e) {
        if (!util.checkCode(e.detail.value)) {
            this.toastApply("请输入6位验证号");
            return;
        }
      var that = this;
      that.setData({
        code: e.detail.value
      })
    },
  
    //备注 方法
    mark:function (e) {
      var that = this;
      that.setData({
        mark: e.detail.value
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
        seatGiveVisable: false
      })
    },
    //
    bindParPop: function () {
      this.setData({
        payVisable: false,
        seatGiveVisable: true
      })
    },
    //发送验证码按钮--------------------------------------------------begin
    bindSendCodeTap: function () {
        if (!util.checkTel(this.data.phone)) {
            this.toastApply("请输入6位验证号");
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
    bindSeatBtn:function () {
        console.log(1111)
        if (!util.checkNum(this.data.totalPerson)) {
            console.log(22222)
            this.toastApply("人数不能为空或超过100");
            return;
        }
        if (!util.checkNum(this.data.totalPrice)) {
            this.toastApply("出价不能为空");
            return;
        }
        if (!util.checkTel(this.data.phone)) {
            this.toastApply("请输入正确的手机号");
            return;
        }
        if (!util.checkCode(this.data.code)) {
            this.toastApply("请输入正确的验证码");
            return;
        }

      this.setData({
          desensPhone:util.desensitization(util.getList('mobile')),
        payVisable: true,
        seatGiveVisable:false
      })
    },
    //确认支付按钮
    bindPayBtn: function () {
      this.setData({
        maskVisable: false,
        payVisable: false,

      })
      //  调用微信接口
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
    // 设置抢座时间
        this.setData({
            seatsdate:util.formatTime(new Date()),
            orederCancelVisable:true
        })


    },
    //取消订单
    cancelOrder:function(){
        this.setData({
            orderModalVisable:false
        })
    },
    //弹出框确认按钮
    orderModalConfirm:function () {
    //    调用微信退换支付接口
        this.setData({
            orderModalVisable:true,
            orederCancelVisable:false,
            orederSeatVisable:true,
        })
    },
    //弹出框取消按钮
    orderModalCancel:function(){
        this.setData({
            orderModalVisable:true,
        })
    },
    //给他让座按钮
    seatModalBtn:function(){
        this.setData({
            seatRushVisable:false,
        })
    },
    //给他让座确定按钮
    seatModaComfirmlBtn:function(){
        this.setData({
            seatRushVisable:true,
        })
    },
    //关闭让座弹出框
    bindGiveSeatPop: function () {
        this.setData({
            seatRushVisable:true
        })
    },
    onLoad: function (options) {
        this.setData({
            // seatRushVisable:false
          maskVisable: true,
          seatGiveVisable: true
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