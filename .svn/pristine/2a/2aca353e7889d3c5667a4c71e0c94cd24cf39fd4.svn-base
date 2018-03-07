<template>
  <div class="loginCheck">
      <div class="nav_container">
        <div class="nav-centre">
          <img :class="{ 'region': isRegion }" :src="logoUrl" alt="logo图标">
        </div>
      </div>
    <div class="navForget">

    </div>
      <!--<div class="ms-title">教务管理系统</div>-->
      <div class="contentBody" v-loading.lock="fullscreenLoading">
        <!--重置密码-->
        <div class="resetPass" v-if="needResetPassword">
          <div class="ms-login">
            <div class="loginTitleName">设置新密码</div>
            <div class="loginBodyMsg">
            <div class="tip">您的密码为初始密码，安全性较低，请及时更改您的登录密码</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="" class="demo-ruleForm">
              <el-form-item prop="password" label="">
                <el-input :maxlength="18" id="passWord" @change="changeValue(ruleForm)" v-model="ruleForm.password" placeholder="6-18位字符，区分大小写"></el-input>
                <div class="userIcon"><i class="icon-password"></i></div>
              </el-form-item>
              <div class="login-btn">
                <el-button class="primary" type="primary" :disabled="editNewPassword==false" @click="submitForm('ruleForm')">确认修改</el-button>
                <el-button  type="text"  @click="skip()">跳过修改</el-button>
              </div>
            </el-form>
            </div>
          </div>
        </div>
        <!--多个学校选择-->
        <div class="schoolSelect" v-else-if="schoolListIsShow">
          <h3>请选择一个学校登录操作</h3>
          <ul>
            <li class="schoolNameStyle" @click="selectSchool(school)" v-for="school in schoolList">{{school.schoolName}}</li>
          </ul>
        </div>
        <!--选择教学信息-->
        <div class="teachingMsg" v-else-if="needChooseObject">
          <div class="gradeContent">
            <el-radio-group v-model="currentGradeId" @change="getCurrentGradeId(currentGradeId)">
              <el-radio-button v-for="(item,index) in gradeList" :label="item" :key="index"> {{item.gradeName}} </el-radio-button>
            </el-radio-group>
          </div>
          <div class="scoreTable">

            <table class="table" v-for="(item,index) in gradeList" border="1" v-show="item.gradeId == currentGradeId.gradeId" v-if="item.classInfo.length>0">
                <tr>
                  <th>班级</th>
                  <th v-for="subject in item.classInfo[0].subjectInfo">{{subject.subjectName}}</th>
                </tr>
                <tr v-for="classList in item.classInfo">
                  <td :title="classData" ref="td" v-for="classData in classList" v-if="classData == classList.className">{{classData}}</td>
                  <td :title="teacherData.teachingInfo.teacherName" ref="td" v-for="teacherData in classList.subjectInfo"
                      :class="teacherData.teachingInfo.teacherName == '' ? 'AllowClick' : 'hasPeople'"
                      @click="getTarget(classList,teacherData,$event)"
                      v-html="teacherData.teachingInfo.teacherId == userInfo.id ? queryRight : teacherData.teachingInfo.teacherName"></td>
                </tr>
            </table>
            <div class="noData" v-for="(item,index) in gradeList" v-show="item.gradeId == currentGradeId.gradeId" v-if="item.classInfo.length <= 0">
              <p class="empty-text">暂无科目信息</p>
            </div>
          </div>
          <div class="querySubWrap">
            <ul>
              <li class="subjectInfo" v-for="teacherData in selectSubject">{{teacherData.gradeName}}
                <span>{{teacherData.className}}（{{teacherData.subjectName}}）</span>
              </li>
            </ul>
            <div class="gradeContentBtn">
              <el-button class="primary" type="primary" @click="submitSubject">保存</el-button>
              <el-button  type="text"  @click="skipSubject">跳过</el-button>
            </div>
          </div>
        </div>
        <div v-else-if="headTeacherClassShow">
          <div class="classWrapStyle" v-if="headTeacherClassList.headteacher.length>0">
            <h3>请选择一个班主任班级登录操作</h3>
            <ul>
              <li class="schoolNameStyle" @click="headTeacherSelectClass(classInfo)" v-for="classInfo in headTeacherClassList.headteacher">{{classInfo.gradeName}}（{{classInfo.className}}）</li>
            </ul>
          </div>
          <div class="classWrapStyle" v-if="headTeacherClassList.teacher.length>0">
            <h3>请选择一个科目代课班级登录操作</h3>
            <ul>
              <li class="schoolNameStyle" @click="selectClass(classInfo)" v-for="classInfo in headTeacherClassList.teacher">{{classInfo.gradeName}}（{{classInfo.className}}）</li>
            </ul>
          </div>

        </div>
      </div>
  </div>
</template>

<script>

  export default {
    name:"loginCheck",
    data: function(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          var patrn=/^(\w){6,19}$/;
          if (!patrn.exec(value)) {
//                  this.$refs.ruleForm2.validateField('checkPass');
            callback(new Error('至少6位不包含空格及特殊符号的密码'));
          }else{
            callback();
          }
        }
      };
      return {
        ruleForm: {
          password: '',
        },
        rules: {
          password: [
            { validator:validatePass, trigger: 'blur' }
          ]
        },
        state:false,
        userInfo : {
            name:'',
            id:''
        },
        isRegion: false, //默认区域定制为false, 为true时显示后台拿到的logo
        logoUrl: sessionStorage.getItem('logoUrl'), //返回的是区域定制的logo
        fullscreenLoading:true,
        editNewPassword:false,
        nextAllData:{},//下一步取得的所有信息
        // 选取教师
        teachingInfo:'',
        // 获取班级的科目名称
        subjectInfo:'',
        gradeList:[],
        currentGradeId:'',
        selectSubject:[],// 选择的科目集合
        roleId:'', //权限身份id
        firstLogin:'',//判断是否第一次登陆
        needResetPassword:false, //判断是否需要重置密码
        schoolLength : '',  //当前角色学校数量
        schoolList:[],   //角色对应多个学校列表
        schoolListIsShow:false, // 学校列表是否展示
        chooseSchoolId : '',//当前选择学校id
        needChooseObject:false, // 是否需要选择科目
//        chooseGrade:'',
        headTeacherClassList:[], // 班主任所带班级列表
        teachClassList:[], // 普通教师所带班级列表
        headTeacherClassShow:false,// 班主任所带班级列表显示状态
        schools:{}, // 学校信息,
        classInfo :{},
        queryRight: '<i class="el-icon-check queryRight"></i>',
      }
    },
    mounted(){
      this.getNextInfo();
    },
    methods: {
      //获取next 下一步验证
      getNextInfo(){
        const self = this;
        self.$ajax('next',
        ).then(function (response) {
//        console.log(response);
          if (response.code == 200){
            self.fullscreenLoading = false;
            self.nextAllData = response;
            self.userInfo.name = response.data.name;
            self.userInfo.id = response.data.teacherId;
            self.schoolLength = response.data.schools.length;
            self.schoolList = response.data.schools;
            self.firstLogin = response.data.firstLogin;
//            判断是否被禁用登录
            if (self.schoolLength== 0){
              self.roleId = response.data.topRole.roleId;
              if(self.roleId== 1 || self.roleId== 2 || self.roleId== 8 || self.roleId== 16){
                self.$alert('当前帐号已被禁用。', '提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                    self.toLoginOut();
                return;
              }
              });
              }
            };
            self.needResetPassword = response.data.needResetPassword;

            // 验证是否修改初始密码的下一步验证
            self.resetPassState(self,response);
          }else {
            self.fullscreenLoading = false;
            self.useAlert('error',response.message,function () {});
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      submitForm(formName) {
        const self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$ajax('password/change',
              self.ruleForm
            ).then(function (response) {
                if (response.code == 200){
                  self.useAlert('success',response.message,function () {
                    self.needResetPassword = false;
                    self.resetPassState(self,self.nextAllData);
                  });
              }else {
                  self.useAlert('error',response.message,function () {});
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
      skip(){
        this.needResetPassword = false;
        this.resetPassState(this,this.nextAllData);
      },
      // 验证是否修改初始密码的下一步验证
      resetPassState(vm,res){
        const self =  vm;
        const response =  res;
        if (self.needResetPassword == false){
          if (self.schoolLength > 1){
            self.schoolListIsShow = true;
          }else if (self.schoolLength <= 0){
//                学校列表为空,
            self.schoolListIsShow = false;
            self.needChooseObject = false;
            self.roleId = response.data.topRole.roleId;
//              判断是否为机构管理员身份
            if (self.roleId == 32){
              var userInfo = self.userInfo;
              userInfo.roleId = self.roleId;
              userInfo.firstLogin = self.firstLogin;
              //              存储admin机构管理员信息
              userInfo = JSON.stringify(userInfo);
              localStorage.setItem('userInfo',userInfo);
              self.$router.push('/admin');
            }else if(self.roleId== 4 ){
              // 教育局登录
              var userInfo = self.userInfo;
              userInfo.roleId = self.roleId;
              userInfo.firstLogin = self.firstLogin;
              userInfo.education = response.data.education;
              //              存储教育局登录信息
              userInfo = JSON.stringify(userInfo);
              localStorage.setItem('userInfo',userInfo);
              self.$router.push('/admin');
            }else if(self.roleId== 1 || self.roleId== 2 || self.roleId== 8 || self.roleId== 16){
                self.$alert('当前帐号已被禁用。', '提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                    self.toLoginOut();
                  }
            });
            }
          }else{
//              只有一个学校的情况
            self.userInfo.name = response.data.schools[0].name;
            self.userInfo.id = response.data.schools[0].teacherId;
            self.schoolListIsShow = false;
            self.needChooseObject = response.data.schools[0].needChooseObject;
            self.roleId = response.data.topRole.roleId;
            self.chooseSchoolId = response.data.schools[0].schoolId;
            self.schools = response.data.schools[0];
//            TODO 学校id需要验证是否被禁用（加接口）
//            console.log(self.schools);
            if (self.schoolLength == 1 && self.needChooseObject == false){
              if (self.roleId == 1){
//                      班主任权限
                  self.headTeacherClass();
              }else {
//                self.$ajax('teacher/classes',
//                  {"schoolId":self.chooseSchoolId,"teacherId":self.userInfo.id}).then(function (response) {
//                  console.log(response);});
                var userInfo = self.userInfo;
                userInfo.roleId = self.roleId;
                userInfo.firstLogin = self.firstLogin;
                userInfo.schools = response.data.schools[0];
                //              存储普通教师登录信息或者学校管理员
                if(self.roleId == '8' || self.roleId == '16'){
                  self.teacherGetClass();
                }else if (self.roleId == '2'){
                  userInfo = JSON.stringify(userInfo);
                  localStorage.setItem('userInfo',userInfo);
                  self.$router.push('/schoolManagement');
                }
              }

            }else if(self.schoolLength == 1 && self.needChooseObject == true){
              //需要选择教学信息
              this.getSubjectInfo();
            }

          } ;
        }
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
      //选择学校操作
      selectSchool(school){
        this.fullscreenLoading = true;
        const self = this;
        this.userInfo.name = school.name;
        this.userInfo.id = school.teacherId;
//            TODO 学校id需要验证是否被禁用（加接口）
        self.$ajax('choose/school',
          {"schoolId":school.schoolId,'teacherId':school.teacherId}
        ).then(function (response) {

          if (response.code == 200){
            self.fullscreenLoading = false;
            self.schoolListIsShow = false;
            self.schools = school;
            self.needChooseObject = school.needChooseObject;
            self.chooseSchoolId = school.schoolId;
            self.roleId = school.schoolTopRole.roleId;
            //判断是否需要选择教学信息
            if(self.needChooseObject == true){
                self.getSubjectInfo();
            }else{
              if (self.roleId == 1){
                //选择完科目的班主任
                self.headTeacherClass();
//
              }else if (self.roleId == 8 || self.roleId == 16){
                // 选择完科目的普通教师和校长
                  self.teacherGetClass();

              }else if (self.roleId == 2){
                // 学校管理员
                var userInfo = self.userInfo;
                userInfo.roleId = self.roleId;
                userInfo.firstLogin = self.firstLogin;
                userInfo.schools = school;
                //              存储学校管理员信息
                userInfo = JSON.stringify(userInfo);
                localStorage.setItem('userInfo',userInfo);
                self.$router.push('/schoolManagement');
              }
            }
          }else {
            self.fullscreenLoading = false;
            self.useAlert('error',response.message,function () {});
//            self.$alert(response.message, '提示', {
//              confirmButtonText: '确定',
//              callback: action => {}
//            });
          }
        }).catch(function (error) {
          console.log(error);
        });

      },
      getSubjectInfo(){
        let self = this;
        self.fullscreenLoading = true;
        self.$ajax('teacher/findTeachingBySchoolId',
          {"schoolId":self.schools.schoolId}
        ).then(function (response) {
//            console.log(response);
          if (response.code == 200){
            self.fullscreenLoading = false;
            self.gradeList = response.data;
            self.currentGradeId = response.data[0];
            var gradeData = response.data;
            self.selectSubject = [];
            gradeData.forEach((item, i) => {
                item.classInfo.forEach((subjectInfo, c) => {
                subjectInfo.gradeId = item.gradeId;
              subjectInfo.gradeName = item.gradeName;
                subjectInfo.subjectInfo.forEach((teaching, o) => {
                  teaching.classId = subjectInfo.classId;
                teaching.gradeId = subjectInfo.gradeId;
                teaching.gradeName = subjectInfo.gradeName;
                teaching.className = subjectInfo.className;

                if (teaching.teachingInfo.teacherId == self.userInfo.id) {
                  self.selectSubject.push(teaching);
                }
    //                });
              });
            });
          });
          }else {
            self.fullscreenLoading = false;
            self.useAlert('error',response.message,function () {});
//                  self.$alert(response.message, '提示', {
//                    confirmButtonText: '确定',
//                    callback: action => {}
//                  });
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
//      添加选择的科目
      getTarget(item,list,event){
//          console.log(item,list);
        let data = list;
        if (list.teachingInfo.teacherName == "" || list.teachingInfo.teacherId == this.userInfo.id) {
          data.classId = item.classId;
          data.className = item.className;
          data.gradeId = this.currentGradeId.gradeId;
          data.gradeName = this.currentGradeId.gradeName;
          //              console.log(event.target.tagName)
          var queryRight = '<i class="el-icon-check queryRight"></i>';
          if (event.target.innerHTML == "" && event.target.tagName == "TD") {
            event.target.innerHTML = queryRight;
            this.selectSubject.push(data);
//                console.log(this.selectSubject);


          } else if (event.target.tagName == "I") {
            event.target.parentNode.innerHTML = '';
            this.selectSubject.forEach((item, i) => {
              if (item == data) {
                this.selectSubject.splice(i, 1);
              }
            });
          } else {
            event.target.innerHTML = '';
            this.selectSubject.forEach((item, i) => {
              if (item == data) {
                this.selectSubject.splice(i, 1);
              }
            });
          }
//            console.log(item,list);
//            console.log(this.selectSubject);
        }
      },
//      提交勾选的学科
      submitSubject(){
          let subjectData = [];
          let sub = {};
          let self = this;
          if(this.selectSubject != "" && this.selectSubject.length>0){
            this.selectSubject.forEach( ( item, i ) => {
              let sub = new Object();
              sub.classId = item.classId;
              sub.subjectId = item.subjectId;
              sub.teacherId = this.userInfo.id;
              subjectData.push(sub);
            });
            subjectData = JSON.stringify(subjectData);
            self.fullscreenLoading = true;
            this.$ajax('teacher/batchSaveClassTeacherSubject',
              {"data":subjectData}
            ).then(function (response) {
              if (response.code == 200){
                self.fullscreenLoading = false;
                self.useAlert('success',response.message,function () {
                  self.judgeTeacher();
                });
//                self.$alert(response.message, '提示', {
//                  confirmButtonText: '确定',
//                  callback: action => {
//                    self.judgeTeacher();
//                  }
//                });
              }else {
                self.fullscreenLoading = false;
                self.useAlert('error',response.message,function () {});
//                self.$alert(response.message, '提示', {
//                  confirmButtonText: '确定',
//                  callback: action => {}
//                });
              }
            }).catch(function (error) {
              console.log(error);
            });

          }else {
            this.useAlert('error','请选择任课学科后再点击保存',function () {});
//            this.$alert('请选择任课学科后再点击保存', '提示', {
//              confirmButtonText: '确定',+
//              callback: action => {
////                  this.$message({
////                    type: 'info',
////                    message: `action: ${ action }`
////                  });
//              }
//            });
          }
//        console.log(JSON.stringify(this.selectSubject))
      },
//      判断当前教师角色，存储信息
      judgeTeacher(){
        let self = this;
        if(this.roleId == 1){
//              角色为班主任
            self.headTeacherClass();
//              alert("班主任");
//          self.fullscreenLoading = true;
//          this.$ajax('headteacher/classes',
//            {"schoolId":self.chooseSchoolId,"teacherId":self.userInfo.id}
//          ).then(function (response) {
//            if (response.code == 200){
//              self.fullscreenLoading = false;
//              self.headTeacherClassList = response.data;
//              if(response.data.length > 1){
//                self.needChooseObject = false;
//                self.headTeacherClassShow = true;
//              }else {
//                //一个班级的情况直接跳转
//                var userInfo = self.userInfo;
//                userInfo.roleId = self.roleId;
//                userInfo.schools = self.schools;
//                userInfo.headTeacherClassList = self.headTeacherClassList;
//                userInfo.firstLogin = self.firstLogin;
//                userInfo.classInfo = response.data[0];
//                self.classInfo = response.data[0];
//                //              存储班主任信息
//                userInfo = JSON.stringify(userInfo);
//                localStorage.setItem('userInfo',userInfo);
//                self.$router.push({ path: '/teacherPersonal',  query: {'classId':self.classInfo.classId,'gradeId':self.classInfo.gradeId}});
//              }
//
//            }else {
//              self.fullscreenLoading = false;
//              self.useAlert('error',response.message,function () {});
//            }
//          }).catch(function (error) {
//            console.log(error);
//          });

        }else {
//          非班主任普通教师||校长
          self.teacherGetClass();
        }
      },
      //选择科目时切换年级
      getCurrentGradeId(currentGradeId){
          console.log(currentGradeId);
      },
//      取消提交学科
      skipSubject(){
        this.judgeTeacher();
        let tdList = this.$refs.td;
        tdList.forEach((item, i) => {
          if (item.innerHTML == this.queryRight) {
            item.innerHTML='';
        }
      });

      },
      //普通教师选择班级操作
      selectClass(classInfo){
//          console.log(classInfo);
        var userInfo = this.userInfo;
        userInfo.roleId = classInfo.roleId || 8;
        userInfo.schools = this.schools;
        userInfo.firstLogin = this.firstLogin;
//        userInfo.headTeacherClassList = this.headTeacherClassList;
//        userInfo.classInfo = classInfo;
        //              判断是否为体育教师
        var subjectInfo = classInfo.subject;
        userInfo.classInfo = classInfo;
        userInfo.teachClassList = this.teachClassList;
        var otherRole; //1代表单科体育教师，2代表体育和科目都任教
        subjectInfo.forEach((item, i) => {
          if(item.subjectName.indexOf('体育') != -1){
            //是体育教师
              if (i>0){
                  otherRole = 2;
              }else {
                  otherRole = 1;
              }
            };
         });
        userInfo.otherRole = otherRole;
        console.log(userInfo);
        //              存储教师信息
        userInfo = JSON.stringify(userInfo);
        localStorage.setItem('userInfo',userInfo);
        this.$router.push({ path: '/teacherPersonal',  query: {'classId':classInfo.classId,'gradeId':classInfo.gradeId}});
      },
      //班主任选择班级操作
      headTeacherSelectClass(classInfo){
//          console.log(classInfo);
        var userInfo = this.userInfo;
        userInfo.roleId = this.roleId;
        userInfo.schools = this.schools;
        userInfo.firstLogin = this.firstLogin;
        userInfo.headTeacherClassList = this.headTeacherClassList;
        userInfo.classInfo = classInfo;
        //              存储班主任信息
        userInfo = JSON.stringify(userInfo);
        localStorage.setItem('userInfo',userInfo);
        this.$router.push({ path: '/teacherPersonal',  query: {'classId':classInfo.classId,'gradeId':classInfo.gradeId}});
      },
      changeValue(val){
        if (val.password.length > 0) {
          this.editNewPassword = true;
        } else {
          this.editNewPassword = false;
        }
      },
//      普通教师||校长获取任课班级
      teacherGetClass(){
        let self = this;
        self.fullscreenLoading = true;
        self.$ajax('teacher/classes',
          {"schoolId":this.chooseSchoolId,"teacherId":this.userInfo.id}).then(function (response) {
          if (response.code == 200){
            self.fullscreenLoading = false;
            self.headTeacherClassList = response.data;
            self.teachClassList = response.data.teacher;
            if(response.data.teacher.length == 1){
              //一个班级的情况直接跳转
              var userInfo = self.userInfo;
              userInfo.schools = self.schools;
              userInfo.firstLogin = self.firstLogin;
              userInfo.roleId = response.data.teacher[0].roleId || 8;
//              判断是否为体育教师
              var subjectInfo = response.data.teacher[0].subject;
              userInfo.teachClassList = self.teachClassList;
              let classInfo = response.data.teacher[0];
              userInfo.classInfo = classInfo;
              var otherRole = 0; //1代表单科体育教师，2代表体育和科目都任教
              subjectInfo.forEach((item, i) => {
                if(item.subjectName.indexOf('体育') != -1){
                //是体育教师
                if (i>0){
                  otherRole = 2;
                }else {
                  otherRole = 1;
                }
              };
            });
              userInfo.otherRole = otherRole;
//              存储教师信息
              userInfo = JSON.stringify(userInfo);
              localStorage.setItem('userInfo',userInfo);
              self.$router.push({ path: '/teacherPersonal',  query: {'classId':classInfo.classId,'gradeId':classInfo.gradeId}});

            }else if(response.data.teacher.length == 0){
//              self.$router.push({ path: '/teacherPersonal',  query: {}});
              self.useAlert('error','您当前暂未选择任课班级，需选择班级后进入',function () {});
              self.needChooseObject = true;
              self.headTeacherClassShow = false;
              self.getSubjectInfo();

            }else {
              self.needChooseObject = false;
              self.headTeacherClassShow = true;
            };
          }else {
            self.useAlert('error',response.message,function () {});
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      //班主任获取任课班级
      headTeacherClass(){
        let self = this;
        self.fullscreenLoading = true;
        self.$ajax('teacher/classes',
          {"schoolId":self.chooseSchoolId,"teacherId":self.userInfo.id}).then(function (response) {
          console.log(response);
          if (response.code == 200){
            self.fullscreenLoading = false;
            self.headTeacherClassList = response.data;
            self.teachClassList = response.data.teacher;
            if(response.data.headteacher.length == 1 && response.data.teacher.length == 0 ){
              //一个班级的情况直接跳转
              self.headTeacherClassShow = false;
              var userInfo = self.userInfo;
              userInfo.roleId = self.roleId;
              userInfo.schools = self.schools;
              userInfo.headTeacherClassList = self.headTeacherClassList;
              userInfo.firstLogin = self.firstLogin;
              userInfo.classInfo = response.data.headteacher[0];
              self.classInfo = response.data.headteacher[0];
              //              存储班主任信息
              userInfo = JSON.stringify(userInfo);
              localStorage.setItem('userInfo',userInfo);
              self.$router.push({ path: '/teacherPersonal',  query: {'classId':self.classInfo.classId,'gradeId':self.classInfo.gradeId}});

            }else if(response.data.headteacher.length == 0){
              self.useAlert('error','您当前暂未选择任课班级，需选择班级后进入',function () {});
              self.needChooseObject = true;
              self.headTeacherClassShow = false;
              self.getSubjectInfo();
            }else {
              self.needChooseObject = false;
              self.headTeacherClassShow = true;
            }
          }else {
            self.fullscreenLoading = false;
            self.useAlert('error',response.message,function () {});
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style>
  .loginCheck{
    color: #7b7b7b;
  }
  .loginCheck .nav_container {
    width: 100%;
    height: auto;
    position: relative;
    z-index: 100;
    background: #fff;
  }
  .loginCheck .nav-centre {
    width: 1024px;
    height: 48px;
    background: #fff;
    margin: 0 auto;
    overflow: hidden;
  }
  .loginCheck .nav_container img {
    /*width: 192px;*/
    height: 38px;
    margin-top: 5px;
    float: left;
    margin-right: 57px;
  }
  .loginCheck .contentBody {
    padding: 60px 20px 20px 20px;
    width: 1024px;
    min-height: 774px;
    background: #ffffff;
    /*border-top: 5px solid #0C9EE9;*/
    margin:  0 auto;
    text-align: center;
  }
  .loginCheck .ms-login{
    display: inline-block;
    width:306px;
    height:261px;
    /*padding:40px 30px 40px 14px;*/
    border-radius: 5px;
    background: #fff;
    border: 1px solid #e0e0e0;
  }
  .loginCheck .ms-login .loginTitleName{
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e0e0e0;
    /*margin-bottom: 20px;*/
  }
  .loginCheck .ms-login .loginBodyMsg{
    padding: 16px 30px 40px 30px;
  }
  .loginCheck .ms-login .loginBodyMsg .tip{
    font-size: 14px;
    text-align: left;
    margin-bottom: 15px;
  }
  .loginCheck #passWord{
    position: relative;
  }
  .loginCheck .ms-login .userIcon {
    font-size: 17px;
    position: absolute;
    top: 0;
    left: 0;
    width: 42px;
    text-align: center;
  }
  .loginCheck .ms-login .userIcon i {
    color: #0d9ee9;
    display: inline-block;
    width: 100%;
    border-right: 1px solid #e0e0e0;
  }
  .loginCheck #passWord input {
    text-indent: 40px;
  }

  .loginCheck .login-btn{
    margin-top: 20px;
    text-align: right;
  }
  .loginCheck .el-button+.el-button{
    margin:0;
    margin-top: 10px;
  }
  .loginCheck .login-btn button{
    width:100%;
    height:36px;
    /*margin-right: 11px;*/
  }
  .loginCheck .pageTwo table {
    width: 100%;
    text-align: center;
  }
  .loginCheck .pageTwo table th {
    text-align: center;
  }
  .loginCheck .gradeWrap {
    text-align: left;
  }
  .loginCheck .gradeWrap ul {
    display: inline-block;
    margin: 20px 0;
  }
  .loginCheck .gradeWrap li {
    margin: 0 5px;
    display: inline-block;
    width: 100px;
    height: 35px;
    line-height: 35px;
    border: 1px solid grey;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
  .loginCheck .gradeWrap li:hover {
    background: lightblue;
    color: white;
    border: 1px solid rgba(0,0,0,0);
  }
  .loginCheck .gradeWrap li.active {
    background: cornflowerblue;
    color: white;
    border: 1px solid rgba(0,0,0,0);
  }
  .loginCheck .subjectMgt-body{
    margin-top: 10px;
  }
  .loginCheck .subjectMgt-body table{
    width: 100%;
    text-align: center;
  }
  .loginCheck .subjectMgt-body table th{
    text-align: center;
  }
  .loginCheck .subjectMgt-body table th,
  .loginCheck .subjectMgt-body table td{
    padding: 0;
    box-sizing: border-box;
    border: 1px solid #dfe6ec;
    height: 40px;
  }
  .loginCheck .teacherName {
    display: inline-block;
    width: 100%;
    height: 35px;
    line-height: 35px;
  }
  .loginCheck .teacherName >i {
    color: brown;
  }
  .loginCheck .schoolSelect >ul {
    margin-top: 30px;
    text-align: center;
  }
  .loginCheck .schoolNameStyle {
    display: block;
    height: 35px;
    color: grey;
    line-height: 35px;
    border-radius: 10px;
    width: 30%;
    margin: 20px 35%;
    cursor: pointer;
    border: 1px solid gray;
  }
  .loginCheck .schoolNameStyle:hover{
    color: #007dc4;
    border: 1px solid #0C9EE9;
  }
  .loginCheck .queryRight{
    color: #24c178;
    /*width: 60px;*/
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
    border-radius: 2px;
    background: #f7f7f7;
  }
  .loginCheck .AllowClick {
    cursor: pointer;
  }
  /*选择科目样式*/
  .loginCheck .gradeContent{
    text-align: left;
  }
  .loginCheck .scoreTable .table {
    width: 100%;
    border: 1px solid #dfe6ec;
    margin-top: 10px;
  }
  .loginCheck .scoreTable .table tr,.loginCheck .scoreTable .table td {
    text-align: center;
    border-bottom: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
  }
  .loginCheck .scoreTable .table tr:nth-child(1) th{
    font-size: 14px;
    height: 34px;
    font-weight: 500;
  }
  .loginCheck .scoreTable .table th { box-sizing:border-box; text-align: center; background-color: #effaff; color: #007dc4; border:none; border-left: 1px solid #a5defa; border-top: 1px solid #a5defa;padding: 2px 1px}
  .loginCheck .scoreTable .table td {
    box-sizing: border-box;
    height: 44px;
  }
  .loginCheck .gradeContentBtn {
    width: 600px;
    margin: 40px auto;
    text-align: center;
  }
  .loginCheck .gradeContentBtn button{
    /*display: block;*/
    width: 180px;
    height:36px;
    margin-right: 21px;
  }


  .loginCheck .querySubWrap{
    margin-top: 20px;
    text-align: left;
  }
  .loginCheck .subjectInfo {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    background: #effaff;
    color: #007dc4;
    border-radius: 5px;
    padding: 0 10px;
    margin: 0 10px 10px 0;
  }
  .loginCheck .el-radio-button:last-child .el-radio-button__inner{
    border-radius: 0;
  }
  .loginCheck .el-radio-button:first-child .el-radio-button__inner{
    border-radius: 0;
  }
  .loginCheck .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    color: #fff;
    background-color: #0d9ee9;
    border-color: #0d9ee9;
  }
  .loginCheck .el-radio-button{
    margin-right: 8px;
  }
  .loginCheck .el-radio-button__inner{
    border: 1px solid #bfcbd9;
  }
  .loginCheck .ms-login .el-form-item__error {
    font-family: 'icomoon' !important;
  }
  .loginCheck .ms-login .el-form-item__error:before{
    content: '\e90b';
    display: inline-block;
    vertical-align: -0.8px;
    margin-right: 1px;
  }

  .loginCheck .noData{
    background: url("../../resources/front/imgs/nodata.png") no-repeat center;
    margin-top: 50px;
    height: 233px;
    margin-bottom: 40px;
    position: relative;
  }

  .loginCheck .noData .empty-text{
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    bottom:-30px;
    font-size: 14px;
    color: #b6b6b6;
  }
  .loginCheck .el-input__inner {
    border-radius: 1px;
  }
  .loginCheck .navForget {
    display: block;
    width: 100%;
    height: 42px;
    background-color: #0d9ee9;
    position: relative;
  }
  .loginCheck .scoreTable .table{
    table-layout:fixed;
    word-wrap:break-word;
  }
  .loginCheck .scoreTable .table td{
    white-space:nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
    /*max-width: 200px;*/
    /*width: 50px;*/
  }
  /*选择班级底部样式*/
  .loginCheck .classWrapStyle{
    margin-bottom: 50px;
  }
</style>
