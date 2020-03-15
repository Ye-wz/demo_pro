module.exports = {
  login: function (success) {
    wx.login({
      success(res) {
        let code=res.code;
        wx.request({
          url: "http://127.0.0.1:3030/administrator/login",
          data: {code},
          method: "POST",
          success(res) {
            wx.setStorage({
              key: "openid",
              data: res.data.data
            });
            console.log( wx.getStorageSync('openid'));
            success();
          }
        })
      }
    })
  },
  request: function (option) {  //每次请求时添加会话秘钥
    let options = option;
    options.data = {};
    try{
      options.data.openid = wx.getStorageSync('openid');
    } catch (e) {
      console.log(e)
    }
    wx.request(options);
  },
  islogin: function (success) {
    this.request({
      url: "http://127.0.0.1:3030/administrator/verification",
      method: "POST",
      success: function (res) {
        console.log(res);
        success(res);
      }
    })
  },
  uploadFile: function (option) {  //每次上传添加会话秘钥
    let options = option;
    options.formData = {};
    try{
      options.formData.openid = wx.getStorageSync('openid');
    } catch (e) {
      console.log(e)
    }
    wx.uploadFile(options);
  },
};
