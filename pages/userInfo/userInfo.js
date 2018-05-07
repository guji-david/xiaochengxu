//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},
        hiddenmodalput: true,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
       
    },
    //点击按钮痰喘指定的hiddenmodalput弹出框  
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
      this.setData({
        hiddenmodalput: true
      })
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