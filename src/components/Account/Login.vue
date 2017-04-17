<template>
  <Row style="padding-top: 100px">
    <Col span="14" offset="5">
    <div class="login-form">
      <h2 class="title">{{systemName}}</h2>
      <Form ref="formInline" :model="loginform" :rules="loginRule">
        <Form-item prop="username">
          <Input type="text" v-model="loginform.username" size="large" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input type="password" v-model="loginform.password" size="large" placeholder="密码">
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
          <Checkbox v-model="loginform.rememberMe">记住我</Checkbox>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit('loginform')" size="large" :loading="loading" long icon="log-in">登录
          </Button>
        </Form-item>
      </Form>
    </div>
    </Col>
  </Row>
</template>
<script>
  import http from '../../assets/js/http.js'
  export default {
    data () {
      return {
        loginform: {
          username: '',
          password: '',
          verifyCode: '',
          rememberMe: true
        },
        loginRule: {
          username: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          verifyCode: [
            {required: false, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        title: '',
        systemName: '',
        loading: false,
        requireVerify: false,
        verifyUrl: '',
        verifyImg: window.HOST + 'captcha.html',
      }
    },
    created(){
      //第一次如果是记住密码的话  会到本地存储中取出相关数据 然后自动登录
      this.checkIsRememberPwd()
      //没有设置记住密码 的话 或者是第一次登陆的情况下 会到后台获取基本的配置数据
      this.apiPost('index/common/getConfigInfo').then((res) => {
        this.handelResponse(res, (data) => {
          axios.defaults.headers.sessionId = data.session_id;
          Lockr.set('session_id', data.session_id)
          document.title = data.SYSTEM_NAME
          this.systemName = data.SYSTEM_NAME
          if (!parseInt(data.IDENTIFYING_CODE)) {
            this.requireVerify = true
            this.loginRule.verifyCode[0].required = true
          }
        })
      })
      this.apiPost('index/common/getCaptcha').then((res) => {
        this.handelResponse(res, (data) => {
          console.log(data);
        })
      })
      this.verifyUrl = this.verifyImg
    },
    methods: {
      refreshVerify() {
        this.verifyUrl = ''
        setTimeout(() => {
          this.verifyUrl = this.verifyImg + '?v=' + moment().unix()
        }, 300)
      },
      checkIsRememberPwd() {
        if (Cookies.get('rememberPwd')) {
          let data = {
            rememberKey: Lockr.get('rememberKey')
          }
          this.apiPost('index/login/relogin', data).then((res) => {
            this.handelResponse(res, (data) => {
              this.resetCommonData(data)
            })
          })
        }
      },
      handleSubmit(form) {
        if (this.loading) return
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = !this.loading
            this.resetCommonData()
          } else {
            return false
          }
        })
      },
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
    margin: 120px auto;
    width: 450px;
    border: 2px solid #8492A6;
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
