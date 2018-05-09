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
        userInfoObj:{
          totalPerson:'',
          totalPrice:'',
          phone:'',
          mark:''
        }
    },
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
    //确认抢座按钮
    bindSeatBtn: function () {
      this.setData({
        payVisable: true,
        seatVisable: false
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