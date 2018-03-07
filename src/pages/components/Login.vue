<template>
    <div class="login-wrap">
        <div class="nav_container">
          <div class="nav-centre">
            <span class="logoWrap">
              <img :class="{ 'region': isRegion }" :src="logoUrl">
            </span>
          </div>
        </div>
        <!--<div class="ms-title">教务管理系统</div>-->
        <div class="loginBody">
          <div class="notice">{{notice}}</div>
          <div class="loginElement">
            <div class="ms-login">
              <div class="loginTitleName">
                {{loginFormName}}
              </div>
              <div class="loginBodyMsg">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="" class="demo-ruleForm"><!--60 -->
                  <el-form-item prop="username" label="">
                    <el-input :maxlength="20" @change="queryMsgAllow(ruleForm)" id="userName" v-model.trim="ruleForm.username" placeholder="请输入您的账号"></el-input>
                    <div class="userIcon"><i class="icon-account"></i></div>
                  </el-form-item>
                  <el-form-item prop="password" label="">
                    <el-input :maxlength="18" @change="queryMsgAllow(ruleForm)" id="passWord" type="password" placeholder="请输入您的密码" v-model.trim="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>      <div class="userIcon"><i class="icon-password"></i></div>
                  </el-form-item>
                  <el-form-item prop="captcha" label="">
                    <el-input :maxlength="8" id="captcha" @change="queryMsgAllow(ruleForm)" v-model.trim="ruleForm.captcha" placeholder="请输入验证码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    <div class="userIcon"><i class="icon-verification-code"></i></div>
                    <div class="captchaWrap">
                      <img @click="reloadImg" :src="captchaImg" alt="验证码">
                      <div @click="reloadImg" class="captchaText"><i class="icon-reload"></i></div>
                    </div>

                  </el-form-item>
                  <div class="forgetWrap">
                    <router-link to="/forgetPassword"><span class="forgetPasswordBtn">忘记密码</span></router-link>
                  </div>
                  <div class="login-btn">
                    <el-button :disabled="btnStatus==false || notSupportBrowser==true" type="primary"  @click="submitForm('ruleForm')">登录</el-button>
                  </div>
                  <!--<p style="font-size:12px;line-height:30px;color:#999;">Tips : 验证码随便填。</p>-->
                </el-form>
              </div>
            </div>
            <!--<div class="loginbg_left"></div>-->
            <!--<div class="loginbg_right"></div>-->
          </div>
        </div>
        <div class="footer">
          <div class="copyright-box">
            <p>Copyright © 2007-2017 北京译泰教育科技有限公司 版权所有 京ICP备14052628号</p>
            <p>地址：北京市朝阳区利泽中二路望京科技园B座二层</p>
          </div>
        </div>
    </div>
</template>

<script>
  import $ from "jquery";
  const Base64 = require('js-base64').Base64;
  const REGION_LOGO = 'region/index';
    var LOGOUT_ONE_PATH = '';
    var LOGOUT_TWO_PATH = '';
    //获取token令牌[第一步]
    var TOKEN_ONE_PATH = '';
    //获取token令牌[第二步]
    var TOKEN_TWO_PATH = '';
//    声明变量提升作用域
    var onVisibilityChange,visibilityChangeEvent,hiddenProperty;
    export default {
        data: function(){
          var validateUser = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入用户名'));
            } else {
              var patrn=/^(\w){1,20}$/;
              if (!patrn.exec(value)) {
//                  this.$refs.ruleForm2.validateField('checkPass');
                callback(new Error('用户名不包含汉字或空格及特殊符号'));
              }else{
                callback();
              }
            }
          };
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              var patrn=/^(\w){6,18}$/;
              if (!patrn.exec(value)) {
//                  this.$refs.ruleForm2.validateField('checkPass');
                callback(new Error('至少6位不包含空格及特殊符号的密码'));
              }else{
                callback();
              }
            }
          };
          var validateCaptcha = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入验证码'));
            } else {
              var patrn=/^(\w){4,10}$/;
              if (!patrn.exec(value)) {
//                  this.$refs.ruleForm2.validateField('checkPass');
                callback(new Error('数字字母的组合'));
              }else{
                callback();
              }
            }
          };
            return {
              ruleForm: {
                  username: '',
                  password: '',
                  captcha: ''
              },
              rules: {
                  username: [
                      { validator:validateUser, trigger: 'blur' }
                  ],
                  password: [
                      { validator:validatePass, trigger: 'blur' }
                  ],
                  captcha: [
                    { validator:validateCaptcha, trigger: 'blur' }
                  ]
              },
              captchaImgInfo:'',
              captchaImg:'',
              btnStatus : false,
              execution:'',
              isRegion: false, //默认区域定制为false, 为true时显示后台拿到的logo
              fullpageObj: {}, //返回的是区域定制的对象
              logoUrl: '', //返回的是区域定制的logo
              notSupportBrowser: false,
              notice: '公告：系统每周三晚10：00 - 次日10：00，系统升级维护，请合理安排工作！',
              loginFormName: '基础信息管理与应用系统'
            }
        },
        beforeRouteLeave (to, from, next) {
//           document.removeEventListener(visibilityChangeEvent,onVisibilityChange);
           next();
        },
        beforeMount:function () {
//          if(!!this.pointLoginStatus){
//            let self = this;
////          判断是否浏览当前页面
//            hiddenProperty = 'hidden' in document ? 'hidden' :
//              'webkitHidden' in document ? 'webkitHidden' :
//                'mozHidden' in document ? 'mozHidden' :
//                  null;
//            visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
//            onVisibilityChange = function(){
//              if (!document[hiddenProperty]) {
////              console.log('页面非激活');
//                self.changeLoginAddress();
//              }else{
////              console.log('页面激活')
//              }
//            };
//            document.addEventListener(visibilityChangeEvent, onVisibilityChange);
//          }
//          TODO 处理登录url参数解析，判断跳转来源
//          var strURL = Base64.encode('teacherId=200154&schoolId=110101091&roleId=2');//转换成base64编码
//          var strURL = Base64.decode("");//解析base64编码
//          console.log("base64 encode:" + strURL);
//          console.log("base64 decode:" + strURL);
//          处理？后参数转换成json对象

//          console.log(this.$route.query);
//          console.log(JSON.stringify(this.$route.query).length);







          this.changeLoginAddress();
        },
        mounted: function () {

          //检测浏览器是否有IE浏览器内核
          this.currentBrowser();

          //登录页面区域定制
          this.customMade();

          let self = this;
          var queryObj = self.getRequest();
          if(JSON.stringify(queryObj).length > 2){
//            存在参数，query对象有值
//            self.pointNext(queryObj);
          }else {
//            不存在参数，query对象为空
            if (localStorage.getItem('userInfo') == '' || localStorage.getItem('userInfo') == null){
            }else {
              this.$router.push({ path: '/loginCheck',  query: ''});
            };
          };

        },
        methods: {
          /**
           * 检测浏览器是否有IE浏览器内核
           * 如果有IE浏览器内核弹窗提示：“请使用Chrome或者Firefox浏览器”
           */
          currentBrowser(){
            let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

            //判断是IE浏览器
            let isIE = userAgent.indexOf("MSIE") > -1;

            //判断是否360兼容模式（适用于IE11->edge）
            let is360 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("WOW64") > -1;

            //如果是IE，跳到下载火狐浏览器页面
            if (isIE || is360) {
              this.useAlert('error', '为了更好的操作效果，请切换火狐（fireFox）或者谷歌（Google Chrome）浏览器', function () {
              });
              this.btnStatus = false;

              this.notSupportBrowser = true;
            }
          },
          //单点及本地登录配置信息
          changeLoginAddress(){
            LOGOUT_ONE_PATH = 'logout';
            LOGOUT_TWO_PATH = this.pointLoginURL+'logout';
            //获取token令牌[第一步]
            TOKEN_ONE_PATH = this.pointLoginURL+'login?service='+this.staticResources+'cas/login';
            //获取token令牌[第二步]
            TOKEN_TWO_PATH = this.pointLoginURL+'login';
            this.captchaImgInfo = !!this.pointLoginStatus ? 'kaptcha.jpg':'captcha' ;
            if (!!this.pointLoginStatus){
              this.captchaImg = this.pointLoginURL+this.captchaImgInfo+'?ts='+new Date().getTime();
              this.loginIn();
            }else {
              this.captchaImg = this.staticResources+this.captchaImgInfo+'?ts='+new Date().getTime();
            }
          },
//          提交表单登录
          submitForm(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
              if (valid) {
                if (!!this.pointLoginStatus){
//                  self.loginOut2();
                  if (self.execution != "") {
                    self.postFn(this.execution);
                  } else {
                    self.useAlert('error','不能登录！',function () {});
                  };
                }else {
                  self.toLogin();
                };
              } else {
                console.log('error submit!!');
            return false;
          }
          });
          },
          //拿取允许登录的token令牌-第一步
          loginIn(){
            let self = this;
            this.$ajax(TOKEN_ONE_PATH)
              .then(res => {
              if(res.toString().indexOf("Log In Successful") != -1 || res.code == 200){
              //已经登录过
              var queryObj = self.getRequest();
//              console.log(queryObj,JSON.stringify(queryObj).length);
              if(JSON.stringify(queryObj).length > 2){
//            存在参数，query对象有值
                self.pointNext(queryObj);

              }else {
//            不存在参数，query对象为空
                this.$router.push('/loginCheck');
                return;
              };
            }else if(res.code == 400){
              self.loginOut2();

            }else{
              //未登录过
              this.execution = $(res).find("input[name='execution']").eq(0).val();
            }
          }).catch((res) => {
              this.useAlert('error','网络连接失败',function () {});
          });
          },
          //拿取允许登录的token令牌-第二步
          postFn(para){
            let self = this;
            let params = {
              execution: para,
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              'g-recaptcha-response': this.ruleForm.captcha,
              _eventId: 'submit'
            };
            this.$ajax(TOKEN_TWO_PATH,params )
              .then(res => {
              if (res.code == 200) {
              self.$router.push('/loginCheck');
                }else if(res.code == 400){
                this.useAlert('error',res.message,function () {});
              } else {
                let errorInfo = $(res).find(".alert-danger span").html();
                if (errorInfo.length > 0) {
                  self.useAlert('error', errorInfo, function () {
                    self.ruleForm.password = "";
                    self.ruleForm.captcha = "";
                    self.reloadImg();
                    self.btnStatus = false;
                  });
                }
              }
          }).catch((res) => {
              this.useAlert('error','网络连接失败',function () {});
          });
          },
//      登出接口操作单点退出
          loginOut2(){
            this.$ajax(LOGOUT_TWO_PATH)
              .then(res => {
              if(res.indexOf("注销成功") != -1){
              localStorage.clear();
              this.loginIn();
              this.reloadImg();

            }else{
              this.useAlert('error',res,function () {});
            }
          }).catch((res) => {
              this.useAlert('error',res.message,function () {});
          });
          },
          // 处理url参数，字符转成json对象
          getRequest() {
            var theRequest = new Object();
            if(!!location.hash.split('?')[1]){
              var url = Base64.decode(location.hash.split('?')[1]); //获取url中"?"符后的字串处理加密
//            var url = location.hash.split('?')[1]; //获取url中"?"符后的字串非加密
              var strs = url.split("&");
              for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
              }
              return theRequest;
            }else {
              return theRequest;
            }
          },
//          单点附带参数跳转，定位菜单
          pointNext(params){
            let self = this;
            this.$ajax('sso/next',params)
              .then(res => {
              if (res.code == 200) {
              var userInfo = res.data;
              if(userInfo.roleId == 1){
//                  处理班主任信息
                userInfo.headTeacherClassList.forEach((item, i) => {
                    if(item.classId == params.classId){
                    userInfo.classInfo = item;
                  }
                });
                userInfo.jumpStatus = 1;
                var classInfo = userInfo.classInfo;
                //              存储班主任信息
                userInfo = JSON.stringify(userInfo);
                localStorage.setItem('userInfo',userInfo);
                self.$router.push({ path: '/teacherMyClass',  query: {'classId':classInfo.classId,'gradeId':classInfo.gradeId}});
              }else if(userInfo.roleId == 2){
//                  处理学校管理员缓存问题
                userInfo = JSON.stringify(userInfo);
                localStorage.setItem('userInfo',userInfo);
                self.$router.push({ path: '/schoolManagement',  query: {}});
              }

            }else{
              this.useAlert('error',res.message,function () {});
            }
          }).catch((res) => {
              this.useAlert('error',res.message,function () {});
          });
          },
//          loginOutAgain2(){
//            //和loginOut方法是通一个
//            this.$ajax(LOGOUT_ONE_PATH)
//              .then(res => {
//              if (res.code == 200) {
//              localStorage.clear();
//              this.loginIn();
//            }else{
//              this.useAlert('error',res.message,function () {});
//            }
//          }).catch((res) => {
//              this.useAlert('error',res.message,function () {});
//          });
//
//          },
//          登录
            toLogin(){
              const self = this;
              self.$ajax('login',
                self.ruleForm
              ).then(function (response) {
//                        console.log(response);
                if (response.code == 200){
//                          localStorage.setItem('ms_username',self.ruleForm.username);
                  self.$router.push('/loginCheck');
                }else {
                  self.useAlert('error',response.message,function () {
                    self.ruleForm.password = "";
                    self.ruleForm.captcha = "";
                    self.reloadImg();
                    self.btnStatus = false;
                    self.useAlert('error',response.message,function () {});
                  });
                }
              }).catch(function (error) {
                console.log(error);
              });
            },
            reloadImg(){
              if (!!this.pointLoginStatus){
                this.captchaImg = this.pointLoginURL+this.captchaImgInfo+'?ts='+new Date().getTime();
              }else {
                this.captchaImg = this.staticResources+this.captchaImgInfo+'?ts='+new Date().getTime();
              };
            },
            queryMsgAllow(val){
            if (val.username.length>0 && val.password.length>0 && val.captcha.length>0){
                this.btnStatus = true;
            }else {
                this.btnStatus = false;
            }
          },
          /**
           * 功能：登录页面区域定制
           * 方法[customMade（）]
           * 参数[params]( 二级域名）; eg：抚州的二级域名 -- fz ，则参数为 -- fz
           */
          customMade(){
            let fullPath = window.location.href;//截取地址栏中的二级域名：custom; eg:http://fz.yujingceping.com:8085/#/login
            let customNameStart = fullPath.indexOf("://")+3;//开始截取
            let customNameEnd = fullPath.indexOf("studentinfo") - 1;//结束截取，去掉“.”这位
            let customName = "";
            if(customNameEnd === -2){//没找到"yujingceping"应该返回-1，加上上面的运算变为-2; 显示默认图片
              customName = "";
            }else{//显示抚州图片
              customName = fullPath.substring(customNameStart, customNameEnd);
              this.isRegion = true;
            }
            let params= {
              region: customName
            }
            this.$ajax(REGION_LOGO, params).then( res => {
              if(res.code == 200){

                let fullpageObj = res.data.fullpageObj;
              console.log(fullpageObj.textImg.textUrl);
              console.log(this.staticResources)
                this.logoUrl = this.staticResources + fullpageObj.textImg.textUrl;
                sessionStorage.setItem('logoUrl',this.logoUrl);
                console.log(this.isRegion)
              }
            }).catch((res) => {
                this.useAlert('error','获取Logo失败！具体信息：'+res.message,function () {});
            });
          }
        }
    }
</script>

<style>
    .login-wrap{
      margin: 0 auto;
      color: #7b7b7b;
    }
    .login-wrap .nav_container {
      width: 100%;
      height: auto;
      position: relative;
      z-index: 100;
      background: #fff;
    }
    .login-wrap .nav-centre {
      width: 100%;
      height: 48px;
      background: #fff;
      margin: 0 auto;
      overflow: hidden;
    }
    .logoWrap{
      display: inline-block;
      width: 650px;
      height: 38px;
      margin-top: 5px;
      margin-left: 30px;
    }
    .logoWrap > img{
      /*width: 192px;*/
      height: 38px;
    }
    .login-wrap .loginBody {
      background: #2372b7;
      width: 100%;
      height: 609px;
    }
    .login-wrap .loginElement {
      position: relative;
      margin: 0 auto;
      width: 1024px;
      height: 609px;
      background: url(../../resources/front/imgs/login_bg.png);
    }
    .login-wrap .notice{
      position: absolute;
      z-index: 99999;
      width: 100%;
      padding: 10px 0;
      color: #e9edf1;
      background: #3483C6;
      text-align: center;
    }
    .login-wrap .ms-title{
        position: absolute;
        top:30%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: black;

    }
    .login-wrap .ms-login{
        box-sizing: border-box;
        position: absolute;
        left:50%;
        top:50%;
        width:306px;
        height:311px;
        margin-top:-156px;
        margin-left:-153px;
        /*padding:40px 30px 40px 14px;*/
        border-radius: 5px;
        background: #fff;
        box-shadow: 8px 8px 10px #3479ba;
        -webkit-box-shadow: #3479ba 8px 8px 10px;
        -moz-box-shadow: #3479ba 8px 8px 10px;
    }
    .login-wrap .ms-login .loginTitleName{
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e0e0e0;
    }
    .login-wrap #userName, .login-wrap #passWord, .login-wrap #captcha{
      position: relative;
    }
    .login-wrap .ms-login .userIcon {
      font-size: 17px;
      position: absolute;
      top: 0;
      left: 0;
      width: 42px;
      text-align: center;
    }
    .login-wrap .ms-login .userIcon i {
      color: #0d9ee9;
      display: inline-block;
      width: 100%;
      border-right: 1px solid #e0e0e0;
    }
    .login-wrap .ms-login .loginBodyMsg{
      padding: 16px 30px 40px 30px;
    }
    .login-wrap #userName input {
      text-indent: 40px;
    }
    .login-wrap #passWord input {
      text-indent: 40px;
    }
    .login-wrap #captcha input {
      /*box-sizing: border-box;*/
      text-indent: 40px;
      border-radius: 1px 0 0 1px;
      display: inline-block;
      width: 100%;
    }
    .login-wrap .ms-login .el-form .el-form-item{
      height: 36px;
    }
    .login-wrap .ms-login .el-form .el-form-item .el-form-item__content {
      height: 36px;
    }
    .login-wrap .login-btn{
        margin-top: 40px;
        text-align: center;
    }
    .login-wrap .login-btn button{
        width:100%;
        height:36px;
    }
    .login-wrap #captcha {
      width: 147px;
      box-sizing: border-box;
      height: 36px;
      line-height: normal;
      overflow: hidden;
    }
    .login-wrap .captchaWrap {
      box-sizing: border-box;
      vertical-align: top;
      margin-left: -4px;
      display: inline-block;
      width: 98px;
      height: 36px;
      border: 1px solid #bfcbd9;
      border-radius: 0 1px 1px 0;
      border-left: none;
    }
    .login-wrap .captchaWrap img {
      cursor: pointer;
      display: inline-block;
      width: 70%;
      height: 100%;
      /*margin-top: 5%;*/
  }
    .login-wrap .el-form-item__content .captchaText{
      display: inline-block;
      font-size: 14px;
      color: #0d9ee9;
      vertical-align: top;
      width: 24px;
      text-align: center;
      margin-left: -2px;
      cursor: pointer;
    }
    /*.login-wrap .login-btn .notAllowBtn {*/
      /*background: #8F8F8F;*/
      /*width:100%;*/
      /*height:36px;*/
      /*border: 1px solid #8F8F8F;*/
    /*}*/
    .login-wrap .notAllowBtn:hover {
      background: #8F8F8F;
      width:100%;
      height:36px;
    }
    .login-wrap .forgetWrap{
      /*position: absolute;*/
      /*width: 246px;*/
      /*height: 36px;*/
    }
    .login-wrap .forgetPasswordBtn {
    position: absolute;
    right: 30px;
    top: 225px;
    font-size: 12px;
    cursor: pointer;
    color: #0d9ee9;
    text-align: right;
    display: inline-block;
  }
    .login-wrap .forgetPasswordBtn:hover {
      color: mediumblue;
      text-decoration:underline;
    }
    .login-wrap .footer {
      width: 100%;
      height: 69px;
      background: #fff;
      padding-top: 10px;
    }
    .login-wrap .footer .copyright-box p {
      font-size: 12px;
      color: #8e8e8e;
      line-height: 24px;
      text-align: center;
    }
    .login-wrap .ms-login .el-form-item__error {
      font-family: 'icomoon' !important;
    }
    .login-wrap .ms-login .el-form-item__error:before{
      content: '\e90b';
      display: inline-block;
      vertical-align: -0.8px;
      margin-right: 1px;
    }
    .login-wrap .el-input__inner {
      border-radius: 1px;
    }
</style>
