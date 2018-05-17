//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        zoneList: ['北京', '上海', '天津', '山西', '四川'],
        inputVal:'',
       /* zoneList: [
            {key:'beijing',value:'北京'},
            {key:'shagnhai',value:'上海'},
            {key:'tianjin',value:'天津'},
            {key:'shangxi',value:'山西'},
            {key:'sichuan',value:'四川'},
        ],*/
        casIndex:2,
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

              },
    searchNameInput:function (e) {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    },
    //事件处理函数
    bindViewTap: function (event) {
      //获取数据详情所有内容；
      //获取数据绑定的data- 所有的数据
      let title= event.currentTarget.dataset.title;
      
      //获取数据所有的id
        wx.navigateTo({
          url: '../detail/detail?title='+title
        })
    },
    onShow: function () {
      let pages = getCurrentPages();
      let currPage = pages[pages.length - 1];

      this.setData({//将携带的参数赋值
        inputVal: currPage.data.inputVal
      });
     
      
    },
    onLoad: function (options) {

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