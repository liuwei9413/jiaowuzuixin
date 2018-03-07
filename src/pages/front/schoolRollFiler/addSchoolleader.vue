<template>
  <div id="addteacher" class="addeditinfo">
    <div  class="btns">
      <a href="javascript:;" @click="remindSave"  class=" icon-back">返回 </a>
     <!-- <el-button style="float: right;"  @click="resetForm('ruleForm')" class="white-color el-button el-
button&#45;&#45;primary"> <i class="icon-cancel"></i><span>取消</span></el-button>-->
      <el-button style="float: right;" class="white-color  el-button el-button--primary"
                 type="primary"  @click="saveteacherInfoForm" ><!--<i class="icon-conserve"></i>--><span>保存</span></el-button>

    </div>
    <!--表单-->
    <el-form  :model="teacherInfoForm" :rules="teacherInfoRules"  ref="teacherInfoForm"  label-width="200px" class="demo-ruleForm">
      <div class="blackDiv1">
      <div class="title"><i></i><span>校长基本信息</span></div>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model.trim="teacherInfoForm.name "  class="inputWidth" :maxlength="40"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio-group v-model="teacherInfoForm.sex">
          <el-radio label="1" >男</el-radio>
          <el-radio label="2" >女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="民族："  prop="national" >
        <el-select v-model="teacherInfoForm.national"   class="inputWidth" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone" >
        <el-input v-model.trim="teacherInfoForm.phone"  class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="身份证号：" prop="idCard"  >
        <el-input v-model.trim="teacherInfoForm.idCard" class="inputWidth" :maxlength="18"></el-input>
      </el-form-item>
      <el-form-item label="教龄（年）：" prop="schoolAge"  >
        <el-input v-model.trim="teacherInfoForm.schoolAge" class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="第一学历：" prop="education" >
        <el-select v-model="teacherInfoForm.education" placeholder="请选择第一学历"  class="inputWidth">
          <el-option
            v-for="item in maxEducation"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="毕业学校：" prop="graduatedFromSchool">
        <el-input v-model.trim="teacherInfoForm.graduatedFromSchool" :maxlength="20"  class="inputWidth" ></el-input>
      </el-form-item>
      <el-form-item label="高校类别：" prop="schoolType">
        <el-select v-model="teacherInfoForm.schoolType" placeholder="请选择高校类别"  class="inputWidth">
          <el-option
            v-for="item in schoolType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否为师范专业：" prop="ifNormal">
        <el-radio-group v-model="teacherInfoForm.ifNormal">
          <el-radio label="1" >是</el-radio>
          <el-radio label="0" >否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="block" label="毕业时间：" prop="graduationOfYear">
        <el-date-picker
          v-model="teacherInfoForm.graduationOfYear"
          align="right"
          type="year"
          style="width: 652px;"
          placeholder="选择毕业时间">
        </el-date-picker>
      </el-form-item>
      <!--第二学历-->
      <el-form-item label="最高学历：" prop="maxEducation">
        <el-select v-model="teacherInfoForm.maxEducation" placeholder="请选择最高学历"  class="inputWidth">
          <el-option
            v-for="item in maxEducation"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考取途径：" prop="maxGetTheWay">
        <el-select v-model="teacherInfoForm.maxGetTheWay" placeholder="请选择考取途径"  class="inputWidth">
          <el-option
            v-for="item in maxGetTheWay"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="毕业学校：" prop="maxGraduatedFromSchool">
        <el-input v-model.trim="teacherInfoForm.maxGraduatedFromSchool" :maxlength="20"  class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="是否为师范专业：" prop="maxIfNormal">
        <el-radio-group v-model="teacherInfoForm.maxIfNormal">
          <el-radio label="1" >是</el-radio>
          <el-radio label="0" >否</el-radio>
        </el-radio-group>

      </el-form-item>
      <el-form-item class="block" label="毕业时间："  prop="maxGraduationOfYear">
        <el-date-picker
          v-model="teacherInfoForm.maxGraduationOfYear"
          align="right"
          type="year"
          style="width: 652px;"
          placeholder="选择毕业时间">
        </el-date-picker>

      </el-form-item>
      </div>


<div class="blackDiv2">
      <div class="title title2"><i></i><span>校长任教信息</span></div>
      <el-form-item label="职称：" prop="jobTitle">
        <el-select v-model="teacherInfoForm.jobTitle" placeholder="请选择职称"  class="inputWidth">
          <el-option
            v-for="item in jobTitle"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职务：" prop="position">
        <el-select v-model="teacherInfoForm.position" placeholder="请选择职务"  class="inputWidth">
          <el-option label="正校长" value="正校长"></el-option>
          <el-option label="教学副校长" value="教学副校长"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="担任校长或者副校长年限：" prop="headerAge">
        <el-input v-model.trim="teacherInfoForm.headerAge"  class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="现任校长或者副校长年限：" prop="nowHeaderAge">
        <el-input v-model.trim="teacherInfoForm.nowHeaderAge"  class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="专、兼职教研员：" prop="fullOrNot">
        <el-select v-model="teacherInfoForm.fullOrNot" placeholder="请选择专、兼职教研员" class="inputWidth">
          <el-option label="专职" value="专职"></el-option>
          <el-option label="兼职" value="兼职"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="note" label="近三年获奖或发表文章情况：（按照奖项、获奖时间、获奖级别、获奖内容顺序填写）" prop="note">
        <el-input type="textarea" v-model.trim="teacherInfoForm.note" class="item-text"  :maxlength="200" style="width: 652px;"></el-input>
      </el-form-item>
</div>
    </el-form>

  </div>
</template>

<script>

  export default {
    data() {
      var regExp = /select|update|delete|truncate|join|union|exec|insert|drop|count|script|src|alert|window|document|location|>|<|%/i;
      var checkNote = (rule, value, callback) => {
        if(value == null || value == ""){
          callback();
        }else if(value.length > 200){
          callback(new Error("最多可输入200个字！"))
        }else if(regExp.test(value)){
          callback(new Error("输入中不能包含特殊字符！"))
        }else{
          callback();
        }
      };
      return {
        //民族选项
        options: this.nations,
        schoolType: this.schoolType,
        maxEducation: this.maxEducation,
        maxGetTheWay: this.maxGetTheWay,
        jobTitle: this.jobTitle,
        teacherInfoForm:{
          id:this.$route.params.id,
          name:'',
          sex:'',
          national:'',
          phone:'',
          idCard:'',
          schoolAge:'',//教龄
          //第一学历
          education:'',//第一学历
          graduatedFromSchool:'',//毕业学校
          schoolType:'',//高校类别
          ifNormal:'',//是否为师范专业
          graduationOfYear:'',//毕业年份
          // 第二学历
          maxEducation:'',
          maxGraduatedFromSchool:'',
          maxIfNormal:'',
          maxGraduationOfYear:'',
          maxGetTheWay:'',
          maxSchoolType:'',
          //个人信息
          jobTitle:'',//职称
          position:'',//职务
          headerAge:'',//是否为教务主任
          nowHeaderAge:'',//是否为年级主任
        /*  privateTeacher:'',//是否为民办教师
          backboneTeacher:'',//是否为骨干教师
          theLeader:'',//学科带头人*/
          fullOrNot:'',//专兼职
          note:'',
        },
        teacherInfoForm2:{},  //克隆的表单数据
        isReturnPage: false, //是否是返回入口
        isSavebtn: true, //是否是点击保存入口
        isSaveOk: true,//是否验证通过
        //民族参数
        restaurants: [],
        nation: '',
        // 校验
        teacherInfoRules: {
          name: [
            {required: true, message: '姓名不能为空！', trigger: 'blur' },
            {pattern:/^[\S]{2,40}$/,message: '姓名输入在2~40个字！'}
          ],
          national: [
            { required: true, message: '民族不能为空！', trigger: 'change' },
          ],
          sex: [
            { required: true, message: '性别不能为空！', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '手机号码不能为空！', trigger: 'blur' },
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message: '手机号码格式输入错误！'},
            { min: 11, max: 11, message: '手机号码输入为11位数字！', trigger: 'blur' }
          ],
          idCard: [
            { required: false, message: '请输入身份证号', trigger: 'blur' },
            {pattern: /^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9xX]))|((yt)\S{0,18})$/i,message: '身份证号格式输入错误！'},
          ],
          schoolAge: [
            { required: true, message: '教龄不能为空！', trigger: 'change' },
            {pattern: /^\d{1,2}$/,message: '教龄输入为1~2位数字！'},
          ],
          education : [
            { required: true, message: '第一学历不能为空！', trigger: 'change' }
          ],
          headerAge : [
            {pattern: /^\d{1,2}$/,message: '担任校长或者副校长年限输入为1~2位数字！'},
          ],
          nowHeaderAge : [
            {pattern: /^\d{1,2}$/,message: '现任校长或者副校长年限输入为1~2位数字！'},
          ],
          graduatedFromSchool:[
            {pattern: /^[\S]{0,20}$/, message: '最多可输入20个字！' },
          ],
          maxGraduatedFromSchool:[
            {pattern: /^[\S]{0,20}$/, message: '最多可输入20个字！' },
          ],
          /*note: [
            {required: false, message: '请输入描述信息', trigger: 'blur' },
            {pattern: /^[\S]{0,200}$/, message: '长度在 0 到 200 个字符' },
          ]*/
          note: [
            {validator: checkNote, trigger: 'blur' }
          ]

        },
      };
    },
    mounted(){
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      /*console.log(this.userInfo.schools.schoolId)*/

    },
    methods: {
      //返回提醒保存
      remindSave(){
        this.isReturnPage = true;
        if(!this.searchIsOk){
          this.$router.go(-1);
          return;
        }else {
          this.$confirm('你当前做了编辑操作，是否要保存？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
          }).then(() => {
            //确定
            /*this.$router.replace('/eduSchoolManagement');*/
            this.saveteacherInfoForm();
          }).catch(() => {
            //取消
            this.$router.go(-1);
          });
        }
      },

      /*提交*/
      saveteacherInfoForm(formName) {
      	let that = this;
        this.$refs.teacherInfoForm.validate((valid) => {
          if (valid) {
            this.teacherInfoForm.graduationOfYear = Object.prototype.toString.call(this.teacherInfoForm.graduationOfYear) === '[object Date]' ? this.teacherInfoForm.graduationOfYear.getFullYear() : this.teacherInfoForm.graduationOfYear;
            this.teacherInfoForm.maxGraduationOfYear = Object.prototype.toString.call(this.teacherInfoForm.maxGraduationOfYear) === '[object Date]' ? this.teacherInfoForm.maxGraduationOfYear.getFullYear() : this.teacherInfoForm.maxGraduationOfYear;
            console.log(this.teacherInfoForm)
            var params = Object.assign({}, this.teacherInfoForm, {isSchoolHeader: 1}, {schoolId: this.userInfo.schools.schoolId});

            this.$ajax('/schadmin/saveOneTeacher', params)
              .then(res => {
                if (res.code == 200) {
                 this.$refs['teacherInfoForm'].resetFields();
                 this.setValue();
                 this.useAlert('success',res.message,function () {
                   if(that.isSavebtn){ that.$router.go(-1); }
                //回调函数
                  });
                }else {
                  this.useAlert('error',res.message,function () {
                    that.isSaveOk=false; //回调函数
                  });
                }
              });

          } else {
            this.useAlert('error','验证未通过',function () {
              that.isSaveOk= false;//是否验证通过
              return;
            });
            // return false;
          }
        });


      },
      setValue:function(){
        this.teacherInfoForm2=_.cloneDeep(this.teacherInfoForm);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

    },
    watch: {
      teacherInfoForm: {
        handler: function (after, before) {
          var _this = this;
          console.log(JSON.stringify(after))
          console.log(JSON.stringify(_this.teacherInfoForm2));
          this.searchIsOk = JSON.stringify(after) !== JSON.stringify(_this.teacherInfoForm2);

//          this.searchIsOk = Object.keys(after).some( function( prop ) {
//            return after[prop] !== _this.teacherInfoForm2[prop];
//          });
          console.log(this.searchIsOk);
          this.setValue();
        },
        deep: true
      }
    },
    beforeRouteLeave  (to, from, next) {
      if (this.isReturnPage) {
        next();
      } else {
        if (this.searchIsOk) {
          this.$confirm('您当前做了编辑操作，是否需要保存？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
//              type: 'warning'
          }).then(() => {
            //确定
            this.isSavebtn=false;
            this.saveteacherInfoForm();
          }).catch(() => {
            next()
          });
        } else {
          next()
        }
      }
    }
  }
</script>
<style>
  .publicScore .scoreTable .table tr, td {
     border-bottom:none;
     border-right:none;
  }
  .el-month-table td .cell, .el-year-table td .cell {
    width: 48px;
    height: 32px;
    margin: auto;
    display: block;
    line-height: 32px;
  }
</style>

