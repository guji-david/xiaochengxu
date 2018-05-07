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
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
// --------------------------------------正则表达式----------------------------
//检查手机号码
function checkTel(tel) {
  var reg = /^[1][0-9]{10}$/;
  return tel && reg.test(tel);
}

//--------------------------------------------------------------------window.sessionStorage 保存对象
 function setList(key, value) {

  try {
    wx.setStorageSync('key', 'value')
  } catch (e) {
    console.log(e)
  }
  
}
// 获取用户昵称
export function getList(key) {
  
  var value = wx.getStorageSync(key)
  if (!value) {
    return [];
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return [];
  }
}











module.exports = {
    formatTime:formatTime,
    checkTel: checkTel
}