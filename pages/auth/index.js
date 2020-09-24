import {login} from "../../utils/asyncWx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取用户信息事件
  async handleGetUserInfo(e){
    // 1 获取用户信息
    const {encryptedData, rawData, iv, signature} = e.detail;
    // 2 获取小程序登陆成功后的code
    const {code} = await login();
    console.log(code)
  }
})