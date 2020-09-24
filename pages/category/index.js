import { request } from "../../requests/index.js"

// pages/category/index.js
Page({

  data: {
    // 左侧菜单数据数组
    leftMenuList:[],
    // 右侧商品数据数组
    rightContent:[],
    // 左侧被点击的菜单
    currentIndex:0,
    // 右侧内容滚动条距离顶部的距离
    scrollTop:0
  },
  // 分类数据数组
  catesList:[],

  onLoad: function (options) {
    /* 
    0 web中的本地存储 和小程序中的本地存储的区别
      1 写代码的方式不一样
        web： localStorage.setItem("key","value")  localStorage.getItem("key")
        小程序:  wx.setStorageSync("key","value")  wx.getStorageSync("key")
      2 存的时候 有没有做类型转换
        web： 不管存入的是什么类型的数据 都会调用一项 toString(),转成字符串 再存入进入
        小程序： 不存在类型转换  存什么类型数据进去  获取的时候就是什么类型数据
    1 先判断本地存储中有无旧的数据
      {time:Date.now(), data:[..]}
    2 没有旧数据 直接发送新请求
    3 有旧数据 同时 旧数据没有过期 直接使用本地存储中的旧数据
    */
    
    // 1 获取本地存储中的数据  (小程序中也存在本地存储的技术)
    const catesList=wx.getStorageSync("cates_key");
    // 2 判断
    if(!catesList){
      // 不存在 发送请求 获取数据
      this.getCatesList();
    }else{
      // 有旧的数据  暂时定义一个过期时间  10s
      if(Date.now()-catesList.time>1000*60){
        // 重新发送请求
        this.getCatesList();
      }else{
        // 可以使用旧的数据
        this.catesList=catesList.data;
        // 构造左侧菜单数据
        let leftMenuList=this.catesList.map(v=>v.cat_name);
        // 构造右侧的商品数据
        let rightContent=this.catesList[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // 获取分类数据
  async getCatesList(){
    // request({url:"/categories"})
    // .then(result=>{
    //   this.catesList=result.data.message;
    //   // 把数据存储到本地存储中
    //   wx.setStorageSync("cates_key", {time:Date.now(), data:this.catesList});

    //   // 构造左侧菜单数据
    //   let leftMenuList=this.catesList.map(v=>v.cat_name);
    //   // 构造右侧的商品数据
    //   let rightContent=this.catesList[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    // 使用es7的async await 来发送异步请求  这里的result 等于 上面的 result
    const result = await request({url:"/categories"})
    this.catesList=result;
    // 把数据存储到本地存储中
    wx.setStorageSync("cates_key", {time:Date.now(), data:this.catesList});

    // 构造左侧菜单数据
    let leftMenuList=this.catesList.map(v=>v.cat_name);
    // 构造右侧的商品数据
    let rightContent=this.catesList[0].children;
    this.setData({
       leftMenuList,
      rightContent
    })

  },
  // 左侧菜单的点击事件
  handleItemTap(e){
    /*
    1 获取当前被点击的索引
    2 给data中的currentIndex赋值
    3 根据不同的索引来渲染右侧的商品内容
    */
    const {index} = e.currentTarget.dataset;
    let rightContent=this.catesList[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
  }
})