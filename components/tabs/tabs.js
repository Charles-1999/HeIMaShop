Component({
  data: {},
  /* 接收父元素的数据 */
  properties: {
     tabs:{
       type:Array,
       value:[]
     }
  },
  methods: {
    handleTap(e){
      // 1 获取点击的索引
      const {index}=e.currentTarget.dataset
      // 触发父组件中的事件
      this.triggerEvent("tabsItemChange",{index})
    }
  }
})