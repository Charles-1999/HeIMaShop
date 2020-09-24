import {request} from "../../requests/index.js"

Page({

  data: {
    isIphoneX:false,
    // 商品数据
    goodsDetail:{}
  },
  // 接口返回的商品数据对象
  goodsObj:{},

  onLoad: function (options) {
    const app = getApp()
    let isIphoneX = app.globalData.isiPhoneX;
    this.setData({
      isIphoneX
    })
    const {goods_id} = options
    this.getgoodsDetail({goods_id})
  },

  // 获取商品详情数据
  async getgoodsDetail(goods_id){
    const result = await request({url:"/goods/detail", data:goods_id})
    this.goodsObj = result
    this.setData({
      goodsDetail:{
        goods_name:result.goods_name,
        goods_price:result.goods_price,
        goods_introduce:result.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:result.pics
      }
    })
  },

  // 点击放大预览
  handlePreviewImage(e){
    const urls = this.goodsObj.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    });
  },

  // 加入购物车
  handleAddCart(){
    // 1 获取缓存 若没有则是初始化为空数组
    let cart=wx.getStorageSync("cart") || [];
    // 2 获取商品索引
    let index=cart.findIndex(v=>v.goods_id===this.goodsObj.goods_id)
    // 3 判断购物车中是否存在
    if(index === -1){
      // 购物车中不存在该商品 则添加该商品进购物车
      this.goodsObj.num = 1
      this.goodsObj.checked = true
      cart.push(this.goodsObj)
    }else{
      // 购物车中存在该商品 直接num++
      cart[index].num++
    }
    // 4 把数据存入缓存中
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      mask: true,
    });
  }
  
})