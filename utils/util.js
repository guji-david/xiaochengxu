/**
 * Created by David on 2018/4/26.
 */
// --------------------------------------公共事件----------------------------
// 格式化时间
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
function unique(list) {
  var res = [list[0]];
  for (var i = 1; i < list.length; i++) {
    var repeat = false;
    for (var j = 0; j < res.length; j++) {
      if (list[i].name == res[j].name) {
        repeat = true;
        break;
      }
    }

    
    if (!repeat) {
      res.push(list[i]);
    }
  }
  return res;
}
//数据脱敏
function desensitization(tel){
    if(!!tel){
        return tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }else{
        return tel;
    }
}
// --------------------------------------正则表达式----------------------------
//检查手机号码
function checkTel(tel) {
  var reg = /^[1][0-9]{10}$/;
  return tel && reg.test(tel);
}
//检查手机号码
function checkCode(code) {
  var reg = /^[0-9]{6}$/;
  return code && reg.test(code);
}
//检查数字
export function checkNum(num) {
    var reg =/^(\d{0,10})$/;
    return num && reg.test(num);
}
//--------------------------------------------------------------------window.sessionStorage 保存对象
//保存开户行手机号
export function setMobile(key,value){

    wx.setStorageSync(key,value)
}
//获取开户行手机号
export function getMobile(key){
    return   wx.getStorageSync(key)
}




 function setList(key,value) {
  try {
    wx.setStorageSync(key,value)
  } catch (e) {
    console.log(e)
  }
  
}
// 获取用户昵称
 function getList(key) {
    
 var value = wx.getStorageSync(key)
  if (!value) {
    return [];
  }else{
    return value
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return [];
  }
}











module.exports = {
    formatTime:formatTime,
    checkTel:checkTel,
    checkCode:checkCode,
    checkNum:checkNum,
    desensitization:desensitization ,
    setMobile: setMobile,
    getMobile: getMobile,
    setList: setList,
    getList: getList,
    unique: unique
}