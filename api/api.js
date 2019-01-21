//请求失败码映射
const statusCodeMap = {};
const URL ="http://localhost:8989"


/**
 * 封装微信请求
 * @param {object} options - 请求配置项
 * @returns {object} 响应promise
 */
const request = options => {
  return new Promise((resolve, reject) => {
    wx.showNavigationBarLoading();
    wx.request(
      Object.assign(options, {
        success: function (res) {
          //success
          console.log(res);
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(res);
          }
        },
        fail: function (err) {
          // fail
          console.log(err);
          reject;
        },
        complete: function () {
          wx.hideNavigationBarLoading();
        }
      })
    );
  });
};

/**
 * 请求模块
 * @module requests
 */
module.exports = {
  upLoadLost(){
    return request({
      url:`${url}/`
    })
  },
  getAllLost(){
    return request({
      url: `${URL}/user`
    })
  },
  getAllFound(){
    return request({
      url:`${URL}/LostAndFound/SearchFound`
    })
  }

};
