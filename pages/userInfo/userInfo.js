//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},
        char_gt:"＞"
    },

    onLoad: function () {
        var that = this;
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