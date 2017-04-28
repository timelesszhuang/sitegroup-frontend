<template>
  <div>
    <Row>
      <Col span="14" offset="5">
      <div class="alert-title">
        <Alert type="success" show-icon v-show="successShow">
          {{successMsg}}
          <span slot="desc"> </span>
        </Alert>
        <Alert type="warning" show-icon v-show="warningShow">
          {{warningMsg}}
          <span slot="desc"> </span>
        </Alert>
      </div>
      </Col>
    </Row>
    <Row>
      <Col span="14" offset="5">
      <div class="login-form" v-show="showlogin">
        <h2 class="title">{{systemName}}</h2>
        <Form ref="loginform" :model="loginform" :rules="loginRule">
          <Form-item prop="user_name">
            <Input type="text" v-model="loginform.user_name" size="large" placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item prop="pwd">
            <Input type="password" v-model="loginform.pwd" size="large" placeholder="密码">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item prop="verifyCode">
            <Row>
              <Col span="8">
              <Input type="text" v-model="loginform.verifyCode" size="large" placeholder="验证码">
              <Icon type="images" slot="prepend"></Icon>
              </Input>
              </Col>
              <Col span="12">
              <img :src="verifyUrl" @click="refreshVerify()" class="verify-pos"/>
              </Col>
            </Row>
          </Form-item>
          <Form-item>
            <Checkbox v-model="rememberMe">记住我</Checkbox>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="handleSubmit('loginform')" size="large" :loading="loading" long
                    icon="log-in">登录
            </Button>
          </Form-item>
        </Form>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import http from '../../assets/js/http.js'
  export default {
    data () {
      return {
        showlogin: false,
        loginform: {
          user_name: '',
          pwd: '',
          verifyCode: '',
        },
        loginRule: {
          user_name: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          verifyCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        title: '',
        systemName: '',
        loading: false,
        verifyUrl: '',
        verifyImg: window.HOST + 'captcha.html',
        successMsg: '',
        successShow: false,
        warningMsg: '',
        warningShow: false,
        rememberMe: true
      }
    },
    methods: {
      showTitle(data){
        this.systemName = data.SYSTEM_NAME;
        document.title = data.SYSTEM_NAME;
      },
      showMsg(type, msg){
        switch (type) {
          case 'warning':
            this.warningMsg = msg;
            this.warningShow = true;
            break;
          case 'success':
            this.successMsg = msg;
            this.successShow = true;
        }
      },
      refreshVerify() {
        this.verifyUrl = ''
        setTimeout(() => {
          this.verifyUrl = this.verifyImg + '?v=' + moment().unix()
        }, 300)
      },
      checkIsRememberPwd() {
        if (Cookies.get('rememberMe')) {
          this.$Message.success('正在尝试自动登录......');
          let data = {
            remember: Lockr.get('rememberKey'),
            user_id: Lockr.get('user_id')
          }
          this.apiPost('common/login/autoLogin', data).then((res) => {
            this.handelResponse(res, (data, msg) => {
              //成功的操作
//              console.log(data);
              this.resetCommonData(data, msg)
            }, (data, msg) => {
              //失败的操作
              this.showMsg('warning', '自动登录失败，请重新登陆')
              Cookies.set('rememberMe', false)
              this.showlogin = true
            })
          })
        } else {
          this.showlogin = true;
        }
      },
      handleSubmit(form) {
        if (this.loading) return
        this.$refs.loginform.validate((valid) => {
          if (valid) {
            let data = {}
            data.user_name = this.loginform.user_name
            data.pwd = this.loginform.pwd
            data.verifyCode = this.loginform.verifyCode
            this.loading = !this.loading
            console.log(data);
            this.apiPost('common/login/login', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                if (this.rememberMe) {
                  Cookies.set('rememberMe', true, {expires: 7})
                  Cookies.set('code', data.remember, {expire: 7});
                }
                this.resetCommonData(data)
              }, (data, msg) => {
                //根据状态来判断登陆状态
                this.refreshVerify()
                this.loading = !this.loading
                this.showMsg('warning', msg);
              })
            }, (res) => {
              //处理错误信息
              this.showMsg('warning', '网络异常，请稍后重试');
            })
          } else {
            return false
          }
        })
      },
    },
    created(){
      //第一次如果是记住密码的话  会到本地存储中取出相关数据 然后自动登录
      this.checkIsRememberPwd()
      //没有设置记住密码 的话 或者是第一次登陆的情况下 会到后台获取基本的配置数据
      this.apiGet('common/login/getNoauth').then((res) => {
        this.handelResponse(res, (data, msg) => {
          this.showTitle(data)
        }, (data, msg) => {
          this.showMsg('warning', msg);
        })
      }, (data) => {
        this.showMsg('warning', '网络异常，请稍后重试');
      })
      this.verifyUrl = this.verifyImg
    },
    mixins: [http]
  }
</script>


<style scoped>
  .login-form {
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 20px auto;
    width: 450px;
    border: 2px solid #8492A6;
  }

  .alert-title {
    width: 450px;
    margin: 30px auto;
  }

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
  }

  .verify-pos {
    position: absolute;
    right: 50px;
    top: 0px;
  }

  .card-box {
    padding: 20px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 120px auto;
    width: 400px;
    border: 2px solid #8492A6;
  }

</style>
