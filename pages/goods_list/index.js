import {request} from "../../requests/index.js"

Page({

  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      },
    ],
    // 接口返回的商品列表
    goodsList:[]
  },

  // 接口所需参数
  QueryParams: {
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  // 总页数
  totalPages:1,

  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getgoodsList();
  },

  // 触底事件
  onReachBottom(){
    if(this.QueryParams.pagenum >= this.totalPages){
      // 没有下一页
      wx:wx.showToast({
        title: '已经到底啦！',
        icon: 'none',
        duration: 1500,
        mask: false,
      });
    }else{
      this.QueryParams.pagenum++;
      this.getgoodsList()
    }
  },

  // 下拉事件
  onPullDownRefresh(){
    // 1 重置数组
    this.setData({
      goodsList:[]
    })
    // 2 重置当前页码
    this.QueryParams.pagenum=1
    // 3 发送请求
    this.getgoodsList();
  },

  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    // 1 获取被点击的标题索引
    const {index}=e.detail
    // 2 修改原数组
    let {tabs}=this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },

  // 获取商品列表
  async getgoodsList(){
    const result = await request({url:"/goods/search", data:this.QueryParams})
    // 获取总条数
    const total = result.total
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      // 拼接数组
      goodsList:[...this.data.goodsList,...result.goods]
    })
    // 关闭下拉刷新的窗口
    wx:wx.stopPullDownRefresh();
  }

})