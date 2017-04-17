/**
 * Created by timeless on 17-4-7.
 * @author 赵兴壮<834916321@qq.com>
 * 该组件 主要用于ajax 相关请求
 */

const ajaxMethods = {
    methods: {
        //ajax post相关的操作
        apiPost(url, data){
            return new Promise(function (resolve, reject) {
                axios.post(url, data).then((response => {
                    // console.log('f', response)
                    resolve(response.data)
                })).catch(function (response) {
                    console.log('f', response)
                    resolve(response)
                })
            })
        },
        handelResponse(res, cb, errCb) {
            console.log(res);
            console.log(res.code);
            if (res.code == 200) {
                cb(res.data)
            } else {
                if (typeof errCb == 'function') {
                    errCb()
                }
                // this.handleError(res)
            }
        },
        resetCommonData(data) {
            /* Lockr.set('authKey', data.authKey)              // 权限认证
             Lockr.set('rememberKey', data.rememberKey)      // 记住密码的加密字符串
             Lockr.set('userInfo', data.userInfo)            // 用户信息
             window.axios.defaults.headers.authKey = Lockr.get('authKey') */
            let routerUrl = ''
            if (menulist[0].path) {
                routerUrl = menulist[0].path
            } else {
                routerUrl = menulist[0].child[0].path
            }
            setTimeout(() => {
                let path = this.$router.path
                if (routerUrl != path) {
                    router.replace(routerUrl)
                } else {
                    _g.shallowRefresh(this.$route.name)
                }
            }, 1000)
        },
    }
}
export default ajaxMethods
