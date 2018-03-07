<template>
  <div id="addstudent" class="addeditinfo">

    <el-form :model="studentForm" :rules="rules" ref="studentForm" label-width="140px" class="demo-studentForm">
      <div>
        <!--按钮部分-->
        <!--<div class="saveDiv">
        <el-button type="text" class="text-left"><router-link :to="{ path:  '/studentManagement' }" > < 返回 </router-link></el-button>
        <el-button type="primary"  class="text-right"   @click="submitForm('studentForm')">保存</el-button>
        &lt;!&ndash;<el-button @click="resetForm('studentForm')">取消</el-button>&ndash;&gt;
      </div>-->
        <div class="btns">
          <a href="javascript:;" @click="remindSave"  class=" icon-back">返回 </a>
          <el-button style="float: right;" class="white-color  el-button el-button--primary"
                     type="primary" @click="submitForm"><!--<i class="icon-conserve"></i>--><span>保存</span></el-button>

        </div>

        <!--选择班级年级-->
      <div class="gradeClass">
          <div class="title title0"><i></i><span>选择新添班级</span></div>
          <el-form-item label="年级：" prop="gradeIndex">
            <el-radio-group v-model="studentForm.gradeIndex">
              <el-radio-button :label="grade.index" v-for="(grade,index) in gradeList" :key="index">{{grade.name}}

              </el-radio-button>
              <!--  <el-radio :label="grade.index" v-for="(grade,index) in gradeList" :key="index">{{grade.name}}</el-radio>-->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="班级：" prop="classIndex">
            <el-radio-group v-model="studentForm.classIndex" v-if="studentForm.gradeIndex">
              <el-radio-button :label="classes.index"
                               v-for="(classes,index) in gradeList[studentForm.gradeIndex].classList" :key="index">
                {{classes.name}}

              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </div></div>
      <!--学生信息-->
      <div class="blackDiv1">
      <div class="title"><i></i><span>学生信息</span></div>

      <el-form-item label="学籍号：" prop="sid">
        <el-input v-model.trim="studentForm.sid"class="inputWidth" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model.trim="studentForm.name" :maxlength="40"class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio-group v-model="studentForm.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--民族-->
      <el-form-item label="民族："  prop="nation" >
        <el-select v-model="studentForm.nation"  class="inputWidth" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--民族结束-->
      <el-form-item label="身份证号：" prop="idCard">
        <el-input v-model.trim="studentForm.idCard"class="inputWidth" :maxlength="18"></el-input>
      </el-form-item>
      <el-form-item label="出生年月日：" prop="birthday">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker  format="yyyy-MM-dd" placeholder="选择日期" v-model="studentForm.birthday"
                          style="width: 652px;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item class="block" label="入学年份：" prop="schoolYear">
        <el-date-picker
          v-model="studentForm.schoolYear"
          align="right"
          type="year"
          style="width: 652px;"
          placeholder="选择年">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否是独生子女：" prop="isOneChile">
        <el-radio-group v-model="studentForm.isOneChile">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否住校：" prop="isZhuXiao">
        <el-radio-group v-model="studentForm.isZhuXiao">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="监护人：" prop="guardian">
        <el-select v-model="studentForm.guardian" placeholder="请选择监护人" class="inputWidth">
          <el-option
            v-for="item in guardians"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </div>
      <div class="blackDiv2">
      <div class="title title2"><i></i><span>家庭信息</span></div>
      <el-form-item label="父亲学历：" prop="fatherDucation" class="inputWidth">
        <el-select v-model="studentForm.fatherDucation" placeholder="请选择父亲学历" class="inputWidth">
          <el-option
            v-for="item in ducations"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="父亲职业：" prop="fatherCareer">
        <el-select v-model="studentForm.fatherCareer" placeholder="请选择父亲职业" class="inputWidth">
          <el-option
            v-for="item in careers"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话：" prop="fatherPhone" >
        <el-input v-model.trim="studentForm.fatherPhone" placeholder="请填写父亲电话" class="inputWidth"></el-input>
      </el-form-item>

      <el-form-item label="母亲学历：" prop="motherDucation">
        <el-select v-model="studentForm.motherDucation" placeholder="请选择母亲学历" class="inputWidth">
          <el-option
            v-for="item in ducations"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="母亲职业：" prop="motherCareer">
        <el-select v-model="studentForm.motherCareer" placeholder="请选择母亲职业" class="inputWidth">
          <el-option
            v-for="item in careers"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话：" prop="motherPhone">
        <el-input v-model.trim="studentForm.motherPhone" placeholder="请填写母亲电话" class="inputWidth"></el-input>
      </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>
  import Minority from '@/pages/components/Minority'
  export default {
    data() {
      return {
        //民族选项
        options: this.nations,
        ducations: this.ducations,
        careers: this.careers,
        guardians: this.guardians,
        userInfo: "",
        gradeList: {},
        studentForm: {
          schoolId: '',
          classIndex: '',
          gradeIndex: '',
          sid: '',
          name: '',
          sex: '',
          nation: '',
          idCard: '',
          birthday: '',    //出生日期
          schoolYear: '',//入学年份
          isOneChile: '',
          isZhuXiao: '',
          guardian: '',
          fatherDucation: '',
          fatherCareer: '',
          fatherPhone: '',
          motherDucation: '',
          motherCareer: '',
          motherPhone: '',
        },
        studentForm2:'',
        isReturnPage: false, //是否是返回入口
        isSavebtn: true, //是否是点击保存入口
        studentresData: '',
        //民族参数
        restaurants: [],
        nation: '',
        rules: {
        /*  classIndex: [
            {required: true, message: '请选择班级', trigger: 'change'},
          ],
          gradeIndex: [
            {required: true, message: '请选择年级', trigger: 'change'},
          ],*/
          sid: [
            {required: true, message: '请输入学籍号', trigger: 'blur'},
            {pattern:/^[\S]{8,20}$/,message: '学籍号输入在8-20个非空字符！'}
          ],
          name: [
            {required: true, message: '姓名不能为空！', trigger: 'blur' },
            {pattern:/^[\S]{2,40}$/,message: '姓名输入在2~40个字！'}
          ],
          nation: [
            { required: true, message: '民族不能为空！', trigger: 'change' },
          ],
          sex: [
            { required: true, message: '性别不能为空！', trigger: 'change' }
          ],
          idCard: [
            { required: false, message: '请输入身份证号', trigger: 'blur' },
            {pattern: /^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9xX]))|((yt)\S{0,18})$/i,message: '身份证号格式输入错误！'},
          ],
          fatherPhone: [
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/, message: '电话格式输入错误！'}
          ],
          motherPhone: [
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/, message: '电话格式输入错误！'}
          ],


        }
      };
    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(this.userInfo.schools.schoolId)
    },
    beforeCreate() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      //console.log(this.userInfo.schools.schoolId)
      let that = this;
      //获取班级列表
      that.$ajax('/teacher/getGradeList', {schoolId: that.userInfo.schools.schoolId})
        .then(res => {
          if (res.code == 200 && res.data && res.data.length) {
            that.gradeList = {};
            res.data.forEach((grade, index) => {
              if (!that.gradeList[grade.index]) {
                that.gradeList[grade.index] = grade;
              }
            })
           // console.log(that.gradeList);
          }
        });
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
            this.submitForm();
          }).catch(() => {
            //取消
//            alert(1)
            this.$router.go(-1);
          });
        }
      },

      /*保存*/
      submitForm(studentForm) {
        this.isReturnPage = true;
        if( this.studentForm.gradeIndex=='') {
          this.$alert('请选择年级', '标题名称', {
            confirmButtonText: '确定',
          });
        }else if( this.studentForm.gradeIndex=='' || this.studentForm.classIndex=='' ) {
          this.$alert('请选择年级班级', '标题名称', {
            confirmButtonText: '确定',
          });
        }



        this.$refs.studentForm.validate((valid) => {
          if (valid) {
           // console.log(this.studentForm.birthday)
            var nowDate = this.studentForm.birthday;
           // console.log(nowDate)
            if (Object.prototype.toString.call(nowDate) === '[object Date]') {
              var nowMonth = (nowDate.getMonth() + 1) > 9 ? (nowDate.getMonth() + 1) : ('0' + (nowDate.getMonth() + 1));
              var nowday = (nowDate.getDate() ) > 9 ? (nowDate.getDate()) : ('0' + (nowDate.getDate()));
              nowDate = nowDate.getFullYear() + '-' + nowMonth + '-' +nowday;
            }
            this.studentForm.birthday = nowDate;

            this.studentForm.schoolYear = Object.prototype.toString.call(this.studentForm.schoolYear) === '[object Date]' ? this.studentForm.schoolYear.getFullYear() : this.studentForm.schoolYear;
            var params = Object.assign({}, this.studentForm, {schoolId: this.userInfo.schools.schoolId});
            const self = this;
            this.$ajax('/teacher/saveOneStudent', params)
              .then(res => {
                if (res.code == 200) {
                  this.$refs['studentForm'].resetFields();
                  this.setValue();
                  this.useAlert('success',res.message,function () {
                    if(self.isSavebtn){ self.$router.go(-1); }
                   //回调函数
                  });
                } else {
                  this.useAlert('error',res.message,function () {
                    //回调函数
                  });
                }
              });
          } else {
            this.useAlert('error','缺少必填信息或格式错误，请填写完整',function () {});
            // return false;
          }
        });
      },
      setValue:function(){
        this.studentForm2=_.cloneDeep(this.studentForm);
      }
    },
    watch: {
      studentForm: {
        handler: function (after, before) {
          var _this = this;
          console.log(JSON.stringify(after))
          console.log(JSON.stringify(_this.studentForm2));
          this.searchIsOk = JSON.stringify(after) !== JSON.stringify(_this.studentForm2);

//          this.searchIsOk = Object.keys(after).some( function( prop ) {
//            return after[prop] !== _this.teacherInfoForm2[prop];
//          });
          console.log(this.searchIsOk);
          this.setValue();
        },
        deep: true
      }
    },

    components: {
      Minority
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
            this.submitForm();
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
/*选择班级年级按钮*/
#addstudent .gradeClass{
  padding:0 30px  20px 30px;
  border-bottom: 12px solid whitesmoke;
}
#addstudent .gradeClass .el-form-item__label{
  padding: 16px 12px 11px 0;
}
#addstudent .gradeClass .el-radio-button{
  margin-left: 10px;
  margin-top:5px;
  border-left:1px solid #bfcbd9;
}
#addstudent .gradeClass .el-radio-button:first-child .el-radio-button__inner{
  border-left:none;
  border-radius:0;
}
#addstudent .gradeClass .el-radio-button:last-child .el-radio-button__inner{
  border-radius:0;
}
#addstudent .gradeClass .el-radio-button .el-radio-button__inner{
  display: inline-block;
  width:70px;
  padding: 10px 8px;
}
</style>
