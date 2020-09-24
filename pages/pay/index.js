import {getSetting, openSetting, authorize} from "../../utils/asyncWx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX:false,
    address:{},
    cart:[],
    payment:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp()
    let isIphoneX = app.globalData.isiPhoneX;
    this.setData({
      isIphoneX
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart");
    let checkedCart = cart.filter(v=>v.checked)
    let payment = 0
    checkedCart.forEach(e=>{
      payment += e.goods_price * e.num
    })
    this.setData({
      address,
      cart:checkedCart,
      payment
    })
  },

  // 支付按钮点击事件
  async handlePay(){
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return ;
    }
  }

})