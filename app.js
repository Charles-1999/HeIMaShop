//app.js
App({
    globalData:{
        isIphoneX:false,
    },

    //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
    onLaunch: function(options) {
        this.onGetSysInfo()
    },
    onShow: function(options) {

    },
    onHide: function() {

    },
    onError: function(msg) {

    },
    //options(path,query,isEntryPage)
    onPageNotFound: function(options) {

    },
    onGetSysInfo() {
        // 先缓存获取
        let isiPhoneX = wx.getStorageSync('isiPhoneX') || false
        // 缓存没有 再获取
        if (!isiPhoneX) {
            wx.getSystemInfo({
                success: res => {
                    // 手机品牌
                    let modelmes = res.model;
                    // 如果是 X,XS,XR,XS MAX,11均可适配
                    if (modelmes.indexOf('iPhone X') != -1 || modelmes.indexOf('iPhone 11') != -1 || 
                    modelmes.indexOf('iPhone 11 Pro') != -1 || modelmes.indexOf('iPhone 11 Pro Max') != -1) {
                        // 存储型号
                        this.globalData.isiPhoneX = true
                        wx.setStorageSync('isiPhoneX', true)
                        // 加入回调
                        this.sysCallback && this.sysCallback()
                    }
                },
            })
        } else {
            this.globalData.isiPhoneX = isiPhoneX
        }
    }
});
  