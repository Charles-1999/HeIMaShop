import { getSetting, chooseAddress, openSetting, showToast } from "../../utils/asyncWx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    cart: [],
    allChecked: false,
    payment: 0,
    itemCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow() {
    this.setData({
      address: wx.getStorageSync("address"),
    })
    let cart = wx.getStorageSync("cart") || [];
    this.setCart(cart)
  },

  // 选择收货地址
  async handlechooseAddress() {
    try {
      // 1 获取权限状态
      const result = await getSetting()
      const scopeAddress = result.authSetting["scope.address"]
      // 2 判断权限状态
      if (scopeAddress === false) {
        // 诱导用户打开授权页面
        await openSetting()
      }
      // 调用获取收货地址api
      let address = await chooseAddress()
      address.full = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync("address", address);

      // wx.getSetting({
      //   success: (result)=>{
      //     const scopeAddress = result.authSetting["scope.address"]
      //     if(scopeAddress===false){
      //       // 用户没有授权 重新引导用户授权
      //       wx.openSetting({
      //         success: (result1)=>{
      //           wx.chooseAddress({
      //             success: (result2)=>{
      //               console.log(result2)
      //             },
      //           });
      //         },
      //       });
      //     }else{
      //       // 用户授权过了true 或者 undefined  直接调用
      //       wx.chooseAddress({
      //         success: (result3)=>{
      //           console.log(result3)
      //         },
      //       });
      //     }
      //   },
      // });
    } catch (error) {
      console.log(error)
    }
  },

  // 商品数量改变事件
  handleItemNumChange(e) {
    const { goods_id, op } = e.currentTarget.dataset
    let { cart } = this.data
    const index = cart.findIndex(v => v.goods_id === goods_id)
    if (cart[index].num === 1 && op === -1) {
      wx.showToast({
        title: '宝贝数量不能再减少了！',
        icon: 'none',
        mask: false,
      });
    } else {
      cart[index].num += op
    }
    this.setCart(cart)
  },

  // 复选框改变事件
  handleCheckedChange(e) {
    const { goods_id } = e.currentTarget.dataset
    let { cart } = this.data
    const index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },

  // 全选框改变事件
  handleAllCheckedChange() {
    this.setData({
      allChecked: !this.data.allChecked
    })
    let { cart } = this.data
    cart.forEach(element => {
      element.checked = this.data.allChecked
    });
    this.setCart(cart)
  },

  // 设置购物车所选商品价格以及数量 
  setCart(cart) {
    let payment = 0
    let itemCount = 0
    let allChecked = true
    cart.forEach(e => {
      if (e.checked) {
        payment += e.goods_price * e.num
        itemCount += e.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length ? allChecked : false

    this.setData({
      payment,
      itemCount,
      allChecked,
      cart
    })
    wx.setStorageSync("cart", cart);
  },

  // 结算按钮事件
  async handleCounter(e) {
    const { itemCount, address } = this.data
    if (!address.userName) {
      await showToast({ title: "你还没有添加收货地址" })
      return
    }
    if (itemCount === 0) {
      await showToast({ title: "你还没有勾选商品" })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }

})