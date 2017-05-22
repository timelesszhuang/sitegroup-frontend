/**
 * Created by timeless on 17-4-7.
 * @author 赵兴壮<834916321@qq.com>
 * 该组件 主要用于ajax 相关请求
 */

const ajaxMethods = {
  methods: {
    apiGet(url, data) {
      return new Promise((resolve, reject) => {
        axios.get(url, data).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
        })
      })
    },
    //ajax post相关的操作
    apiPost(url, data){
      return new Promise(function (resolve, reject) {
        axios.post(url, data).then((response) => {
          // console.log(response.data);
          resolve(response.data)
        }).catch(function (response) {
          reject(response)
        })
      })
    },
    apiDelete(url, id) {
      return new Promise((resolve, reject) => {
        axios.delete(url + id).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
        })
      })
    },
    apiPut(url,obj) {
      return new Promise((resolve, reject) => {
        axios.put(url, obj).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
        })
      })
    },
    handelResponse(res, cb, errCb) {
      if (res.status == 'success') {
        cb(res.data, res.msg)
      } else {
        if (typeof errCb == 'function') {
          errCb(res.data, res.msg)
        }
      }
    },
    resetCommonData(data) {
      //salt
      // console.log(data)
      Lockr.set('salt', data.salt)            // 权限认证
      //记住我
      Lockr.set('rememberKey', data.remember)      // 记住密码的加密字符串
      //用户基本信息
      Lockr.set('userInfo', data)
      //用户的id
      Lockr.set('user_id', data.id)
      //登陆名
      Lockr.set('name', data.name)
      //用户类型
      Lockr.set('type', data.type)
      //跳转到地方
      let routerUrl = ''
      if (data.type == 1) {
        routerUrl = '/sysadmin/'
      } else {
        routerUrl = '/admin/';
      }
      setTimeout(() => {
        let path = this.$router.path
        if (routerUrl != path) {
          router.replace(routerUrl)
        }
      }, 1000)
    },
  }
}
export default ajaxMethods
