<template>
  <div class="forgetPassword" v-loading.fullscreen.lock="loadingState">
    <div class="nav_container">
      <div class="nav-centre">
        <img :class="{ 'region': isRegion }" :src="logoUrl" alt="logo图标">
      </div>
    </div>
    <div class="navForget">
      <div class="navBar">
        <div class="navPass">找回密码</div>
      </div>
    </div>
    <div class="forgetBody">
      <div class="forgetBody-wrap">
        <!--<div class="stepsWrap">-->
          <!--<el-steps :space="230" :active="active" center>-->
            <!--<el-step title="1.验证身份" icon="edit">  <i class="icon-account" slot="icon"></i></el-step>-->
            <!--<el-step title="2.重置密码" icon="edit"></el-step>-->
            <!--<el-step title="3.找回成功" icon="check"></el-step>-->
          <!--</el-steps>-->
        <!--</div>-->
        <div class="stepsWrap">
          <div class="steps first" >1.验证身份</div>
          <div class="steps" :class="active>1 ? 'secondActive' : 'second'">2.重置密码</div>
          <div class="steps" :class="active>2 ? 'thirdActive' : 'third'">3.找回成功</div>
        </div>
        <div class="pageOne" v-show="active == 1">
          <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
              <el-form-item prop="phone" label="输入登录系统的手机号:">
                <el-input :maxlength="11" @change="queryMsgAllow(ruleForm)" id="phone" v-model="ruleForm.phone" placeholder="手机号码"></el-input>
              </el-form-item>
              <el-form-item prop="captcha" label="短信验证码:">
                <el-input :maxlength="8" id="captcha" @change="queryMsgAllow(ruleForm)" v-model="ruleForm.captcha" placeholder="验证码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                <div class="captchaWrap">
                  <!--<div @click="getCaptcha('ruleForm')" class="timeButton">-->
                    <!--<input id="countD"  :class="captchaClick ? 'allowCountDown' : 'notAllowClick' " readonly type="text" v-model="countDown">-->
                    <div class="timeButton" id="countD" type="primary" :class="captchaClick ? 'allowCountDown' : 'notAllowClick' " @click="getCaptcha('ruleForm')">{{countDown}}</div>
                  <!--</div>-->
                </div>
              </el-form-item>
              <div class="login-btn">
                <el-button :disabled="btnStatus==false" type="primary"  @click="submitForm('ruleForm')">确定</el-button>
              </div>
              <!--<p style="font-size:12px;line-height:30px;color:#999;text-align: left">Tips : 验证码有效期5分钟。</p>-->
              <!--<router-link to="/forgetPassword"><span class="forgetPassword">忘记密码</span></router-link>-->
            </el-form>
          </div>
        </div>
        <div class="pageTwo" v-show="active == 2">
          <div class="ms-login">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="115px" class="demo-ruleForm">
              <el-form-item label="输入密码" prop="pass">
                <el-input type="password" @change="querySamePass(ruleForm2)" v-model="ruleForm2.pass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="重新输入" prop="checkPass">
                <el-input type="password" @change="querySamePass(ruleForm2)" v-model="ruleForm2.checkPass" auto-complete="off" @keyup.enter.native="submitFormTwo('ruleForm2')"></el-input>
              </el-form-item>

              <div class="login-btn">
                <el-button :disabled="samePass==false" type="primary" class="primary" @click="submitFormTwo('ruleForm2')">确定</el-button>
              </div>
            </el-form>
          </div>
        </div>
        <div class="pageThree" v-show="active == 3">
          <div class="ms-login">
            <div class="tipRight">
              <i class="icon-success doneRight"></i>
              <p class="tipText">密码修改成功！</p>
            </div>
            <div class="login-btn">
              <el-button type="primary" class="primary" @click="submitFormThree()">重新登录</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function(){
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
          var patrn=/^1[34578]\d{9}$/;
          if (!patrn.exec(value)) {
//                  this.$refs.ruleForm2.validateField('checkPass');
            callback(new Error('请输入正确的11位手机号码'));
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
      // 第二步骤验证
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          var patrn=/^(\w){6,19}$/;
          if(!patrn.exec(value)){
            callback(new Error('至少6位不包含空格及特殊符号的密码'));
          }else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          phone: '',
          captcha: ''
        },
        rules: {
          phone: [
            { validator:validatePhone, trigger: 'blur' }
          ],
          captcha: [
            { validator:validateCaptcha, trigger: 'blur' }
          ]
        },
        ruleForm2: {
          pass: '',
          checkPass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        isRegion: false, //默认区域定制为false, 为true时显示后台拿到的logo
        logoUrl: sessionStorage.getItem('logoUrl'), //返回的是区域定制的logo
        loadingState:false,
        btnStatus : false,
        samePass: false,
        countDown : "获取验证码",
        captchaClick: true,
        active : 1
      }
    },
    methods: {
      submitForm(formName) {

        const self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$ajax('password/find/sms/verify',
              self.ruleForm
              ).then(function (response) {
              if (response.code == 200){
                self.active = 2;
              }else {
//                self.$alert(response.message, '提示', {
//                  confirmButtonText: '确定',
//                  callback: action => {
////                  this.$message({
////                    type: 'info',
////                    message: `action: ${ action }`
////                  });
//                    self.ruleForm.captcha = '';
//                  }
//                });
                self.useAlert('error',response.message,function () {self.ruleForm.captcha = '';});
              }
                }).catch(function (error) {
                    console.log(error);
                });

          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      queryMsgAllow(val){
        if (val.phone.length>0 && val.captcha.length>0){
          this.btnStatus = true;
        }else {
          this.btnStatus = false;
        }
      },
      querySamePass(val){
        if (val.pass.length>0 && val.checkPass.length>0){
          this.samePass = true;
        }else {
          this.samePass = false;
        }
      },
      getCaptcha(formName){
        if (this.captchaClick == false){
          return;
        }else {
          const self = this;
          var phone = "phone";
          self.$refs[formName].validateField(phone,(error) => {
            if (error == ''){
                self.loadingState = true;
//              发送手机验证码请求
              self.$ajax('password/find/sms/send',
                {"phone":self.ruleForm.phone}
              ).then(function (response) {
                    if (response.code == 200){
                      self.loadingState = false;
                      self.captchaClick = false;
                      self.countDown = "60s后可重发";
                      var count = 59;
                      var timer = setInterval(function () {
                        self.countDown = count+"s后可重发";
                        count -= 1;
                        if (count<1){
                          self.countDown = "重新发送";
                          self.captchaClick = true;
                          clearInterval(timer);
                        }
                      },1000);
                    }else {
                      self.loadingState = false;
                      self.useAlert('error',response.message,function () {});
                    }

              }).catch(function (error) {
                self.loadingState = false;
                console.log(error);
              });
            }
          });
        }
      },
      submitFormTwo(formName) {
          var $this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
//              console.log(self,$this)
//            alert('submit!');
            $this.$ajax('password/find/submit',
              {
                  "phone": $this.ruleForm.phone,
                  "password" : $this.ruleForm2.checkPass
              }
            ).then(function (response) {
                    if (response.code == 200){
                      $this.active = 3;
                    }else {
                      self.useAlert('error',response.message,function () {});
//                      self.$alert(response.message, '提示', {
//                        confirmButtonText: '确定',
//                        callback: action => {
////                  this.$message({
////                    type: 'info',
////                    message: `action: ${ action }`
////                  });
//                        }
//                      });
                    }

            }).catch(function (error) {
              console.log(error);
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitFormThree(){
        this.$router.push('/login');
      }
    }
  }
</script>

<style>
  .forgetPassword{
    margin: 0 auto;
    font-size: 14px;
  }
  .forgetPassword .nav_container {
    width: 100%;
    height: auto;
    position: relative;
    z-index: 100;
    background: #fff;
  }
  .forgetPassword .nav-centre {
    width: 1024px;
    height: 48px;
    background: #fff;
    margin: 0 auto;
    overflow: hidden;
  }
  .forgetPassword .nav_container img {
    /*width: 192px;*/
    height: 38px;
    margin-top: 5px;
    float: left;
    margin-left: 20px;
  }
  .forgetPassword .navBar {
    display: block;
    box-sizing: border-box;
    width: 1024px;
    height: 42px;
    margin: 0 auto;
    padding-left: 28px;
  }
  .forgetPassword .navForget {
    display: block;
    width: 100%;
    height: 42px;
    background-color: #0d9ee9;
    position: relative;
  }
  .forgetPassword .navPass{
    display: inline-block;
    height: 38px;
    /*width: ;*/
    padding: 0px 20px;
    background: #ffffff;
    color: #0d9ee9;
    margin-top: 5px;
    line-height: 35px;
    border-radius: 5px 5px 0 0;
    border: none;
  }


  .forgetPassword .forgetBody {
    box-sizing: border-box;
    padding: 30px;
    width: 1024px;
    background: #ffffff;
    /*border-top: 5px solid #0C9EE9;*/
    margin:  0 auto;
    text-align: center;
  }
  .forgetPassword .forgetBody-wrap {
    border: 1px solid #cedaea;
    height: 517px;
  }
  .forgetPassword .pageOne {
    margin: 0 auto;
  }
  .forgetPassword .ms-login{
    display: inline-block;
    width:410px;
    height:230px;
    padding:40px 30px 40px 14px;
    border-radius: 5px;
    background: #fff;
  }
  .forgetPassword .ms-login .el-form .el-form-item{
    height: 30px;
    margin-bottom: 20px;
  }
  .forgetPassword .el-form-item__label {
    padding: 8px 12px 8px 0;
  }
  .forgetPassword .ms-login .el-form .el-form-item .el-form-item__content {
    height: 30px;
    line-height: normal;
  }
  .forgetPassword .pageTwo .login-btn{
    box-sizing: border-box;
    margin-top: 23px;
    padding-left: 115px;
    text-align: left;
  }
  .forgetPassword .pageThree .login-btn{
    box-sizing: border-box;
    margin-top: 23px;
    /*padding-left: 135px;*/
    text-align: center;
  }
  .forgetPassword .pageOne .login-btn{
    box-sizing: border-box;
    margin-top: 23px;
    padding-left: 160px;
    text-align: left;
  }
  .forgetPassword .loginBtn button{
    width: 100%;
  }
  .forgetPassword .login-btn button{
    width: 104px;
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
  }
  .forgetPassword .el-form-item__content {
    text-align: left;
  }
  .forgetPassword #captcha {
    float: left;
    width: 160px;
    margin-left: 0px;
    height: 30px;
    line-height: normal;
  }
  .forgetPassword #captcha input{
    display: inline-block;
    width: 160px;
  }
  .forgetPassword .captchaWrap img {
    cursor: pointer;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .forgetPassword .el-form-item__content .captchaText{
    position: absolute;
    height: 0;
    right: 0;
    top: 35px;
    font-size: 12px;
    cursor: pointer;
    color: mediumblue;
    text-align: right;
    display: inline-block;
    text-decoration:underline;
    -moz-user-select:none;
    -webkit-user-select:none;
    user-select:none;
  }
  .forgetPassword .captchaText:active {
    color: blue;
    -moz-user-select:none;
    -webkit-user-select:none;
    user-select:none;
  }
  .forgetPassword .login-btn .notAllowBtn {
    background: gray;
    width:100%;
    height:36px;
    border: 1px solid gray;
  }
  .forgetPassword .notAllowBtn:hover {
    background: gray;
    width:100%;
    height:36px;
  }
  .forgetPassword .login-btn .notAllowBtn:active {
    background: gray;
    width:100%;
    height:36px;
  }
  .forgetPassword .captchaWrap {
    clear: both;
    vertical-align:top;
    display: inline-block;
    width: 90px;
    height: 30px;
  }
  .forgetPassword #countD{
    height: 30px;border-radius: 0;
    box-sizing: border-box;
    width: 90px;
    line-height: 28px;
    text-align: center;
    background: #f9f9f9;
    color: #0d9ee9;
    border: 1px solid #cedaea;
    border-left: none;
  }
  .forgetPassword .notAllowClick {
    background: grey;
    width: 100px;
    height: 30px;
    border-radius: 0;
    text-align: center;
    color: #ffffff;
    cursor: no-drop;
    border: none;
  }
  .forgetPassword .allowCountDown{

    width: 100px;
    height: 30px;
    /*border-radius: 5px;*/
    /*background: #0C9EE9;*/
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    /*border: none;*/
  }
  .forgetPassword .tipRight{
    padding: 10px;
    overflow: hidden;
    line-height: 40px;
  }
  .forgetPassword .tipRight .doneRight{
    display: inline-block;
    font-size: 32px;
    /*margin-top: 10px;*/
    color: #5dc151;
    /*float: left;*/
  }
  .forgetPassword .tipRight .tipText{
    margin-left: 9px;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    vertical-align: top;
    /*font-weight: 600;*/
  }
  .forgetPassword .el-input__inner {
    box-sizing: border-box;
    width: 250px;
    height: 30px;
    border-radius: 1px;
  }
  .forgetPassword .stepsWrap {
    width: 660px;
    margin:  0 auto;
    overflow: hidden;
  }
  .forgetPassword .stepsWrap .steps {
    margin-top: 30px;
    float: left;
    width: 220px;
    height: 32px;
    line-height: 32px;
  }
  .forgetPassword .first{
    background: url("../../resources/front/imgs/firstSteps.png");
    color: #ffffff;
  }
  .forgetPassword .second{
    background: url("../../resources/front/imgs/secondSteps.png");
  }
  .forgetPassword .secondActive{
    background: url("../../resources/front/imgs/secondStepsActive.png");
    color: #ffffff;
  }
  .forgetPassword .third{
    background: url("../../resources/front/imgs/thirdSteps.png");
  }
  .forgetPassword .thirdActive{
    background: url("../../resources/front/imgs/thirdStepsActive.png");
    color: #ffffff;
  }
  .forgetPassword .ms-login .el-form-item__error {
    font-family: 'icomoon' !important;
  }
  .forgetPassword .ms-login .el-form-item__error:before{
    content: '\e90b';
    display: inline-block;
    vertical-align: -0.8px;
    margin-right: 1px;
  }
  .forgetPassword .el-input__inner {
    border-radius: 1px;
  }
</style>
