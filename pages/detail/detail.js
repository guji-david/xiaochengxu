//index.js
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
//获取应用实例
var app = getApp()
Page({
    data: {
        maskVisable:false,
        seatGiveVisable:false,
        payVisable:false,
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
        count:60,
        intervalId:'',
        disabled:false,

        desensPhone:'',
        noticeMsg:'花钱省时间,支付成功后,你将可以随时消抢座,平台将退回所支付金额(如果你的抢订单被接单后,取消需要口3元服务)',
        seatsdate:'',
        orderVisableModal:true,
        seatVisableModal:true,
        seatSuccessModal:true,
        seatDetail:'',
        seatPhone:'',
        seatCode:'',
        seatDisabled:false

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
        }else{
            // 调用获取验证码接口
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
   
    // //电话沟通
    // bindMakePhoneCall:function(){
    //   wx.makePhoneCall({
    //     phoneNumber: '17316146229'
    //   })
    // },
    
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
        }else{
            //  调用验证码接口
        }


      this.disabled = true;
      this.setData({
        disabled: true
      })
      this.countDown();

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
        if (!util.checkNum(this.data.totalPerson)) {
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
            orderVisableModal:false
        })
    },
    //弹出框确认按钮
    orderModalConfirm:function () {
    //    调用微信退换支付接口
        this.setData({
            orderVisableModal:true,
            orederCancelVisable:false,
            orederSeatVisable:true,
        })
    },
    //弹出框取消按钮
    orderModalCancel:function(){
        this.setData({
            orderVisableModal:true,
        })
    },
    //给他让座按钮
    seatModalBtn:function(){
        this.setData({
            seatVisableModal:false,
        })
    },

    //关闭让座弹出框
    bindGiveSeatPop: function () {
        this.setData({
            seatVisableModal:true
        })
    },
    /*----------------------------- 让座信息 ---------------------------------*/
    //座位信息，包厢名称
    seatDetail: function (e) {
        if (!e.detail.value){
            this.toastApply("请输入正确的座位信息");
            return;
        }else if(e.detail.value.length>=50){
            this.toastApply("您输入的长度过长");
            return;
        }
        var that = this;
        that.setData({
            seatDetail: e.detail.value
        })
    },
    //手机号 方法
    seatPhone: function (e) {
        if (!util.checkTel(e.detail.value)){
            this.toastApply("请输入正确的手机号");
        }
        var that = this;
        that.setData({
            seatPhone: e.detail.value
        })
        util.setList('seatMobile', this.data.phone)
    },

    //验证码 方法
    seatCode: function (e) {
        if (!util.checkCode(e.detail.value)) {
            this.toastApply("请输入6位验证号");
            return;
        }else{
            // 调用获取验证码接口
        }
        var that = this;
        that.setData({
            seatCode: e.detail.value
        })
    },

    //发送验证码按钮
    bindSeatSendCodeTap: function () {

        if (!util.checkTel(this.data.phone)) {
            this.toastApply("请输入6位验证号");
            return;
        }else{
            //  调用验证码接口
        }

        this.setData({
            seatDisabled: true
        })
        this.countDown();

    },
    //给他让座确定按钮
    seatModaComfirmBtn:function(){
        if (!this.data.seatPhone){
            this.toastApply("请输入正确的座位信息");
            return;
        }else if(this.data.seatPhone.length>=50){
            this.toastApply("您输入的长度过长");
            return;
        }
        if (!util.checkTel(this.data.seatPhone)) {
            this.toastApply("请输入正确的手机号");
            return;
        }
        if (!util.checkCode(this.data.seatCode)) {
            this.toastApply("请输入6位验证号！！");
            return;
        }else{
            // 调用获取验证码接口
        }
        this.setData({
            seatVisableModal:true,
            seatSuccessModal:false,
        })
    },
    //座位互换成功之后 通知
    seatSuccessModalBtn:function () {
        this.setData({
            seatSuccessModal:true,
        })
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: options.title
        })
        this.setData({
            // seatVisableModal:false
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