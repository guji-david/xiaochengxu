//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        searchName:'',
        hotSearchList:[
            {id:0,name:'丰茂烧烤11'},
            {id:1,name:'丰茂烧烤22'},
            {id:2,name:'丰茂烧烤33'},
            {id:3,name:'丰茂烧烤44'},
        ],
        historySearchList:[
            {id:0,name:'丰茂烧烤55'},
            {id:1,name:'丰茂烧烤66'},
            {id:2,name:'丰茂烧烤77'},
            {id:3,name:'丰茂烧烤88'},
        ]
    },

    onLoad: function (option) {
        console.log(option);

    }
})