/**
 * Created by David on 2018/5/16.
 */
const host=":http://youzuoer.com";
function postRequest(action, obj, successFun,errorFun) {
    let JSONobj=JSON.stringify(obj)
    wx.request({
        url: host+action, //仅为示例，并非真实的接口地址
        data:JSONobj,
        method: 'POST',
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            if(typeof successFun == "function"){
                successFun(res)
            }

        },
        fail: function() {
            if(typeof errorFun == "function"){
                errorFun(res);
            }
        },
    })
}

module.exports = {
    postRequest:postRequest
}