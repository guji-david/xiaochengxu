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
            { id: 0, name:'1丰茂烧烤靠11'},
            { id: 1, name:'2丰茂烧烤靠22'},
            { id: 2, name:'3丰茂烧烤靠33'},
            { id: 3, name:'4丰茂烧烤靠44'},
        ],
        historySearchList:[
          // { id: 0, name:'12345丰茂烧烤地方'},
          // { id: 1, name:'23456丰茂烧烤'},
          // { id: 2, name:'34567丰茂烧烤'},
          // { id: 3, name:'56789丰茂烧烤'},
        ]
    },
    //展示搜索框
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    //隐蔽搜索框
    hideInput: function () {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    //清空搜索框
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping: function (e) {
     
      this.setData({
        inputVal: e.detail.value
      });
      if (!!e.detail.value){
        this.saveHistorySearchList(e.detail.value);
        this.navigateBack(e.detail.value)
      }
     
     
    },
  //  保存历史搜索列表
    saveHistorySearchList:function(name){
      let list = util.getList('historySearchList')
      list.unshift({name:name});
      list = util.unique(list);
      this.setData({
        'historySearchList': list
      })
      util.setList('historySearchList', this.data.historySearchList)
      
    },
    //模糊搜索item点击
    bindMemoryNameTap: function (event){
      
      this.setData({
        inputVal: event.currentTarget.dataset.name
      });
     
      this.saveHistorySearchList(event.currentTarget.dataset.name);
      this.navigateBack(event.currentTarget.dataset.name)
 },
  //  传递到上页参数
     navigateBack:function(name){
      let pages = getCurrentPages();//当前页面
      let prevPage = pages[pages.length - 2];//上一页面
      prevPage.setData({//直接给上移页面赋值
        inputVal:name,

      });
      wx.navigateBack({//返回
        delta: 1
      })
    },
    onLoad: function () {
       
      //  wx.clearStorageSync();
       this.setData({
         historySearchList: util.getList('historySearchList')
      });
      console.log(this.data.historySearchList);
    }
})