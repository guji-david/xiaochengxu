//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        zoneList: ['北京', '上海', '天津', '山西', '四川'],
       /* zoneList: [
            {key:'beijing',value:'北京'},
            {key:'shagnhai',value:'上海'},
            {key:'tianjin',value:'天津'},
            {key:'shangxi',value:'山西'},
            {key:'sichuan',value:'四川'},
        ],*/
        casIndex:2,
        // arrowToggle:false,
        char_lt:'<',//小于号
        menus:[
            {id:0,logo:'/static/img/logo.jpg',title:'丰茂烧烤11',scores:1,type:'烧烤1',price:'15',distance:'10',num:'2000'},
            {id:1,logo:'/static/img/logo.jpg',title:'丰茂烧烤22',scores:2,type:'烧烤2',price:'25',distance:'20',num:'3000'},
            {id:2,logo:'/static/img/logo.jpg',title:'丰茂烧烤33',scores:3,type:'烧烤3',price:'35',distance:'30',num:'4000'},
            {id:3,logo:'/static/img/logo.jpg',title:'丰茂烧烤44',scores:4,type:'烧烤4',price:'45',distance:'40',num:'5000'},
            {id:4,logo:'/static/img/logo.jpg',title:'丰茂烧烤44',scores:5,type:'烧烤5',price:'55',distance:'50',num:'6000'},
        ]
    },
    //箭头反转事件
    bindViewPicker:function () {
        this.setData({    arrowToggle: !this.data.arrowToggle   })

    },
    // 生命周期函数--监听页面加载
    bindCasPickerChange: function (e) {

        this.setData({casIndex: e.detail.value })
        console.log(this.data.casIndex);
        /*if (e.detail.value == 4) {
            this.setData({ reply: true })
        } else {
            this.setData({ reply: false })   }*/
              },
    searchNameInput:function (e) {
        wx.navigateTo({
            url: '/pages/search/search?zone='+this.data.zoneList[this.data.casIndex]　
        })
        console.log(e.detail.value);
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            })
        })
        /* wx.showModal({
         title: '提示',
         content: '模态弹窗',
         success: function (res) {
         if (res.confirm) {
         console.log('用户点击确定')
         }else{
         console.log('用户点击取消')
         }

         }
         })*/
    }
})