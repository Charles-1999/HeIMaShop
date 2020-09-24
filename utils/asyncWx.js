/* promise 形式的 getSetting */
export const getSetting = () =>{
    return new Promise((resolve, reject)=>{
        wx.getSetting({
            success:(res)=>{
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}

/* promise 形式的 chooseAddress */
export const chooseAddress = () =>{
    return new Promise((resolve, reject)=>{
        wx.chooseAddress({
            success:(res)=>{
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}

/* promise 形式的 openSetting */
export const openSetting = () =>{
    return new Promise((resolve, reject)=>{
        wx.openSetting({
            success:(res)=>{
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}

/* promise 形式的 authorize */
export const authorize = ({scope}) => {
    return new Promise((resolve,reject)=>{
        wx.authorize({
            scope:scope,
            success:(res)=>{
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}

/* promise 形式的 showToast */
export const showToast = ({title}) =>{
    return new Promise((resolve, reject)=>{
        wx.showToast({
            title:title,
            icon:'none',
            success:(res)=>{
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}

/* promise 形式的 login */
export const login = () => {
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result)=>{
                resolve(result)
            },
        });
    })
}