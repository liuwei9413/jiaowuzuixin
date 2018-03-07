<template>
  <div class="header-wrapper">
    <div class="header">
      <div class="logo">
        <img :class="{ 'region': isRegion }" :src="logoUrl" alt="logo图标">
      </div>
      <div class="user-info" :class="{'activeUser':activeUser}">
        <el-dropdown menu-align="end"  trigger="click" @visible-change="activeUserEvent" @command="handleCommand">
                  <span class="el-dropdown-link">
                    <i class="icon-account"></i>
                      <!--<img class="user-logo" src="../../resources/front/imgs/common/cat.png">-->
                      <span class="user-name">欢迎回来，
                        <span class="nameColor">{{userName}}</span>
                      </span>
                  </span>
          <el-dropdown-menu slot="dropdown" class="leaveWrapList">
            <el-dropdown-item command="changePassWord" class="leaveList"> <i class="icon-edit-data"></i>修改密码</el-dropdown-item>
            <el-dropdown-item divided command="loginout" class="leaveList"> <i class="icon-quit"></i>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!--修改密码弹框-->
    <el-dialog v-model="passWordFormVisible" title="修改密码" size="small" top="50%" :close-on-click-modal="false" @close="resetPWForm('pwForms')" class="form-dialog">
      <el-form :model="ruleForm" :rules="pwFormRules" ref="pwForms" label-width="76px" class="addForm">
        <el-form-item label="原密码：" prop="oldPass">
          <el-input type="password" :maxlength="18" v-model="ruleForm.oldPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPass">
          <el-input type="password" :maxlength="18" v-model="ruleForm.newPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input type="password" :maxlength="18" v-model="ruleForm.checkPass" auto-complete="off" @keyup.enter.native="submitForm('pwForms')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetPWForm('pwForms')">取消</el-button>
        <el-button type="primary" @click.native="submitForm('pwForms')" :loading="pwLoading">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  export default {
    data() {
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        } else {
          var patrn=/^(\w){6,18}$/;
          if(!patrn.exec(value)){
            callback(new Error('至少6位不包含空格及特殊符号的密码'));
          }else {
//            if (this.ruleForm.checkPass !== '') {
//              this.$refs.pwForms.validateField('checkPass');
//            }
            callback();
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          var patrn=/^(\w){6,18}$/;
          if(!patrn.exec(value)){
            callback(new Error('至少6位不包含空格及特殊符号的密码'));
          }else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.pwForms.validateField('checkPass');
            }
            callback();
          }
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        name: '',
        isRegion: false, //默认区域定制为false, 为true时显示后台拿到的logo
        logoUrl: sessionStorage.getItem('logoUrl'), //返回的是区域定制的logo
        passWordFormVisible: false, //新增界面是否显示
        activeUser: false, //头像点击状态
        pwFormRules: {
          oldPass: [
            { validator: validateOldPass, trigger: 'blur' }
          ],
          newPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        pwLoading: false,
        ruleForm: {
          oldPass: '',
          newPass: '',
          checkPass: ''
        },
        userId:'',
      }
    },
    beforeCreate(){
      this.$store.commit('storeUserInfo', JSON.parse(localStorage.getItem('userInfo')));
    },
    computed: mapState({
        userName: state => state.userName,
    }),
//    computed:{
//      username(){
//        let username = JSON.parse(localStorage.getItem('userInfo')).name;
//        return username ? username : this.name;
//      }
//    },
    mounted() {
      if (localStorage.getItem('userInfo') == '' || localStorage.getItem('userInfo') == null) {
        this.$router.push({path: '/login', query: ''});
        return;
      };
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.userId = userInfo.id;
    },
    methods:{
      handleCommand(command) {
        let self = this;

        if(command == 'loginout'){
//          调用本地退出
          self.toLoginOut();
        }else if(command == 'changePassWord'){
            self.passWordFormVisible = true;
        }
      },
      activeUserEvent(val){
          this.activeUser = val;
      },
      submitForm(formName) {
        var self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            self.pwLoading = true;
            let params = {
              "userId": self.userId,
              "oldPwd" : self.ruleForm.oldPass,
              "newPwd" : self.ruleForm.newPass,
            };
            self.$ajax('password/edit',
              params
            ).then(function (response) {
              self.pwLoading = false;
              if (response.code == 200){
                self.$alert(response.message, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                    self.resetPWForm(formName);
                    self.toLoginOut();
              }
              });
              }else {
                self.useAlert('error',response.message,function () {});
                self.resetForm(formName);
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
      //调用退出接口 退出登录
      toLoginOut(){
        //          调用本地退出
        let self = this;
        this.$ajax('logout',
        ).then(function (response) {
          if (response.code == 200){
            //调用单点退出
            if(!!self.pointLoginStatus){
              self.$ajax(self.pointLoginURL+'logout',
              ).then(function (response) {
                if(response.indexOf("注销成功") != -1){
                  localStorage.removeItem('userInfo')
                  sessionStorage.removeItem("orgListsData")
                  self.$router.push('/login');
                }else {
                  self.useAlert('error','退出失败，请重试',function () {});
                }
              }).catch(function (error) {
                console.log(error);
              });
            }else {
              localStorage.removeItem('userInfo')
              sessionStorage.removeItem("orgListsData")
              self.$router.push('/login');
            }
          }else {
            self.useAlert('error',response.message,function () {});
          }
        }).catch(function (error) {
          self.useAlert('error','退出失败，请检查网络连接',function () {});
        });
      },
      resetPWForm(formName) {
        this.passWordFormVisible = false;
        this.pwLoading = false;
        this.resetForm(formName);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
  .header-wrapper {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 48px;
    /*font-size: 22px;*/
    line-height: 70px;
    color: black;
    background: #fff;
  }
  .header-wrapper .header {
    width: 1024px;
    margin: 0 auto;
  }
  .header-wrapper .header .logo{
    float: left;
    width:262px;
    text-align: center;
  }
  .header-wrapper .header .logo img {
    /*width: 192px;*/
    height: 38px;
    margin-top: 5px;
    float: left;
    margin-left: 20px;
  }
  .header-wrapper .user-info {
    float: right;
    color: black;
    height: 48px;
    min-width: 184px;
    line-height: 48px;
  }
  .header-wrapper .activeUser{
    background: #f1f3f4;
  }
  .header-wrapper .el-dropdown {
    height: 30px;
    min-width: 185px;
    top:0;
  }
  .header-wrapper .user-info .el-dropdown-link{
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    color: black;
    cursor: pointer;
    vertical-align: middle;
  }
  .header-wrapper .user-info .el-dropdown-link .icon-account{
    font-size: 16px;
  }
  .header-wrapper .user-info .user-logo{
    width:30px;
    height:30px;
    border-radius: 50%;
    margin-left: 8px;
    color: #333333;
  }
  .header-wrapper .user-info .nameColor{
    color: #0d9ee9;
  }
  .header-wrapper .user-info .user-name{
    margin-left: 5px;
    font-size: 14px;
    vertical-align: top;
  }
  .header-wrapper .el-dropdown-menu__item{
    text-align: center;
  }
   .leaveWrapList {
    min-height: 50px;
    margin-top: 18px;
    /*margin-left: 30px;*/
    border-radius: 3px;
  }
   .leaveList{
     color: #666666;
    /*width: 116px;*/
    width: 162px;
     /*margin: 0 23px;*/
    font-size: 14px;
    height: 43px;
    margin-top: 0px;
    text-align: center;
     line-height: 43px;
  }
   .leaveList i {
     margin-right: 15px;
   }
 .el-dropdown-menu__item--divided {
    position: relative;
    margin-top: 0px;
    border-top: 1px dashed #d1dbe5;
  }
  .el-dropdown-menu__item--divided:before {
    content: '';
    height: 0px;
    display: block;
    margin: 0 -10px;
    background-color: #fff;
  }
</style>
