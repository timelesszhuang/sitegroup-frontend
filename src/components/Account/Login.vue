<template>
  <div>
  <div class="innr1">
    <div class="loginlogo" style="width:150px;height:60px;">
      <div class="tp"><img src="../../../src/assets/img/loginlogo.png"></div>
    </div>
    <p style="float:left;font-size:20px;line-height:60px;">&nbsp;</p>
    <div class="logor">客服热线：4006-360-163 |
      <a href="http://www.salesman.cc/help.html" target="_blank">帮助</a>
    </div>
  </div>
    <div id="container">
      <div>
        <p ref="isBrowser" v-show="boswer_show" >
          请使用chrome或火狐浏览器
        </p>
        <Row>
            <!--<Col >-->
            <!--<div class="alert-title" style="margin-top:60px;width: 400px">-->
              <!--<Alert type="success" show-icon v-show="successShow">-->
                <!--{{successMsg}}-->
                <!--<span slot="desc"> </span>-->
              <!--</Alert>-->
              <!--<Alert type="warning" show-icon v-show="warningShow">-->
                <!--{{warningMsg}}-->
                <!--<span slot="desc"> </span>-->
              <!--</Alert>-->
            <!--</div>-->
            <!--</Col>-->
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
                <!--<Button @click="error(false)">错误</Button>-->
              </Form-item>
            </Form>
          </div>
          </Col>
        </Row>
      </div>
    </div>
    <div class="login_di">
      <ul>
        <li><a href="http://mail.qiyvkf.com/" target="_blank">易至信</a></li>
        <li><a href="http://www.youdao.so/" target="_blank">有道云协作</a></li>
        <li><a href="http://www.qiangbi.cc/" target="_blank">网站建设</a></li>
        <li class="no_border">客服专线：4006-360-163</li>
      </ul>
      <span class="login_bq">COPYRIGHT©北京易至信科技有限公司</span>
    </div>


  </div>
</template>
<script>
  import http from '../../assets/js/http.js'

  export default {
    data() {
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
        rememberMe: true,
        boswer_show: false
      }
    },
    methods: {
      showTitle(data) {
        this.systemName = data.SYSTEM_NAME;
        document.title = data.SYSTEM_NAME;
      },

      showMsg(type, msg) {
        switch (type) {
          case 'warning':
            this.warningMsg = msg;
            this.error(false)
            this.warningShow = true;
            break;
          case 'success':
            this.successMsg = msg;
            this.$Message.msg(msg)
            this.successShow = true;
        }
      },
      error (nodesc) {
        this.$Notice.error({
          title: this.warningMsg,
          desc: nodesc ? '' : ''
        });
      },
      refreshVerify() {
        this.verifyUrl = ''
        setTimeout(() => {
          this.verifyUrl = this.verifyImg + '?v=' + moment().unix()
        }, 300)
      },
      checkIsRememberPwd() {
        if (Cookies.get('rememberMe')) {
          this.$Message.success('正在自动登录......');
          let data = {
            remember: Lockr.get('rememberKey'),
            user_id: Lockr.get('user_id')
          }
          this.apiPost('common/login/autoLogin', data).then((res) => {
            this.handelResponse(res, (data, msg) => {
              //成功的操作
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
            this.apiPost('common/login/login', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                if (data.node_id == 0 && data.type == 2) {
                  this.loading = !this.loading
                  this.showMsg('warning', '此用户无管理权限');
                  return false
                }
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
    created() {
      let userAgent = navigator.userAgent;
      let isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
      let isFF = userAgent.indexOf("Firefox") > -1;
      if (!isChrome & !isFF) {
        this.boswer_show = true
        return;
      }
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

  .innr1 {
    max-width: 1250px;
    margin: 30px auto;
    overflow: hidden;
  }
  .loginlogo {
    float: left;
  }
  #container {
    position: relative;
    width: 100%;
    height: 580px;
    margin: 0 auto;
    overflow: hidden;
    background: url(../../../src/assets/img/login_bg02.jpg) no-repeat center center;
  }
  .logor {
    float: right;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    margin-right: 15px;
    color: #444;
  }
  .login-form {
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    background-color: #F9FAFC;
    border: 2px solid #8492A6;
    width: 400px;
    padding-top: 30px;
    background: rgba(255,255,255,0.8);
    position: absolute;
    right: -10%;
    top: 12%;
    margin-top: 65px;
  }
  .login_di {
    width: 720px;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 80px;
  }
  .login_di ul .no_border {
    border-right: none;
    color: #444;
  }
  .login_di ul li {
    font-size: 14px;
    color: #b53832;
    float: left;
    border-right: 1px solid #555;
    line-height: 14px;
    padding: 0 10px;
  }
  .login_bq {
    font-size: 14px;
    color: #444;
    float: right;
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
