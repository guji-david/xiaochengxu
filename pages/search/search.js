//index.js
var util = require('../../utils/util.js');
//获取应用实例
var app = getApp()
Page({
    data: {
      inputShowed: false,
      selectShowed: false,
      inputVal: "",
        memorySearchList:[
          { id: 0, name: '啊1' },
          { id: 1, name: '啊啊2' },
          { id: 2, name: '啊啊啊3' },
          { id: 3, name: '啊啊啊啊4' },
        ],
        hotSearchList:[
            { id: 0, name:'丰茂烧烤靠11'},
            { id: 1, name:'丰茂烧烤靠22'},
            { id: 2, name:'丰茂烧烤靠33'},
            { id: 3, name:'丰茂烧烤靠44'},
        ],
        historySearchList:[
          { id: 0, name:'12345丰茂烧烤地方'},
          { id: 1, name:'23456丰茂烧烤'},
          { id: 2, name:'34567丰茂烧烤'},
          { id: 3, name:'56789丰茂烧烤'},
        ]
    },
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping: function (e) {
     
      this.setData({
        inputVal: e.detail.value
      });
      
      
    },
    bindInput:function(){
      // console.log(this.data.inputVal);
      
    },
    bindMemoryNameTap: function (event){
      
      this.setData({
        inputVal: event.currentTarget.dataset.name
      });
     

      let pages = getCurrentPages();//当前页面
      let prevPage = pages[pages.length - 2];//上一页面
      prevPage.setData({//直接给上移页面赋值
        inputVal: event.currentTarget.dataset.name,
        
      });
      wx.navigateBack({//返回
        delta: 1
      })











     
      
      // this.setData({
      //   inputVal: ''
      // });
     
    },
    onLoad: function (options) {
       
        

    }
})