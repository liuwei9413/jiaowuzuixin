<template>
  <div class="addeditinfo editstudent">
    <!-- <left-sidebar></left-sidebar> -->
    <!-- <right-wrap></right-wrap> -->

    <div class="main-content" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="btns">
        <a href="javascript:;" @click="remindSave" class=" icon-back">返回 </a>
        <!-- <el-button type="success" icon="edit" @click="cancelOrgInfoForm" v-if="isEditing">取消</el-button>-->
        <el-button type="primary" class="white-color  el-button el-button--primary" style="float: right;" @click="savestudentInfoForm" v-if="type != 'detail'"><!--<i class="icon-conserve"></i> --><span>保存</span></el-button>
      </div>

      <el-form ref="studentInfoForm" :model="studentInfoForm.studentChangeToPage" :rules="studentInfoRules"
               label-width="130px" class="edit" :show-message="type != 'detail'"
               :class="[{ editing:type != 'detail' }] ">
        <!--选择班级年级-->
        <div class="blackDiv1">
          <div class="title title0"><i></i><span>所在年级班级</span></div>
          <el-form-item label="年级：" prop="gradeId">
            <span>{{studentInfoForm.gradeName}}</span>
            <!-- <div v-model="studentInfoForm.gradeId">
               <span :label="grade.index" v-for="(grade,index) in gradeList" :key="index">{{grade.name}}
               </span>
             </div>-->
          </el-form-item>
          <el-form-item label="班级：" prop="classIndex">
            <!--  <div v-model="studentInfoForm.classIndex" v-if="studentInfoForm.gradeId">
                <span :label="classes.index" v-for="(classes,index) in gradeList[studentInfoForm.gradeId].classList" :key="index">
                  {{classes.name}}
                </span>
              </div>-->
            <span>{{studentInfoForm.className}}</span>
          </el-form-item>
        </div>
        <div class="blackDiv1">
          <div class="title"><i></i><span>学生基本信息</span></div>
          <el-form-item label="学籍号：" prop="sid">
            <span>{{studentInfoForm.studentChangeToPage.sid}}</span>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model.trim="studentInfoForm.studentChangeToPage.name" class="inputWidth"></el-input>
            <p>{{studentInfoForm.studentChangeToPage.name}}</p>
          </el-form-item>

          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="studentInfoForm.studentChangeToPage.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
            <p v-if="studentInfoForm.studentChangeToPage.sex =='1'">男</p>
            <p v-if="studentInfoForm.studentChangeToPage.sex =='2'">女</p>
          </el-form-item>
          <!--民族-->
          <el-form-item label="民族：" prop="nation">
            <el-select v-model="studentInfoForm.studentChangeToPage.nation" class="inputWidth" filterable
                       placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <p>{{studentInfoForm.studentChangeToPage.nation}}</p>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idCard">
            <el-input v-model.trim="studentInfoForm.studentChangeToPage.idCard" class="inputWidth" :maxlength="18"></el-input>
            <p>{{studentInfoForm.studentChangeToPage.idCard}}</p>
          </el-form-item>
          <el-form-item label="出生年月日：" prop="birthday">
            <el-date-picker type="date" placeholder="选择日期" v-model="studentInfoForm.studentChangeToPage.birthday"
                            style="width: 652px"></el-date-picker>
            <p>{{studentInfoForm.studentChangeToPage.birthday}}</p>
          </el-form-item>
          <el-form-item class="block" label="入学年份：" prop="schoolYear">
            <el-date-picker
              v-model="studentInfoForm.studentChangeToPage.schoolYear"
              align="right"
              type="year"
              style="width: 652px"
              placeholder="选择年">
            </el-date-picker>
            <p>{{studentInfoForm.studentChangeToPage.schoolYear}}</p>
          </el-form-item>
          <el-form-item label="是否是独生子女：" prop="isOneChile">
            <el-radio-group v-model="studentInfoForm.studentChangeToPage.isOneChile">
              <el-radio label="1" value="1">是</el-radio>
              <el-radio label="0" value="0">否</el-radio>
            </el-radio-group>
            <p v-if="studentInfoForm.studentChangeToPage.isOneChile==1">是</p>
            <p
              v-if="studentInfoForm.studentChangeToPage.isOneChile!=''&&studentInfoForm.studentChangeToPage.isOneChile==0">
              否</p>
          </el-form-item>
          <el-form-item label="是否住校：" prop="isZhuXiao">
            <el-radio-group v-model="studentInfoForm.studentChangeToPage.isZhuXiao">
              <el-radio label="1" value="1">是</el-radio>
              <el-radio label="0" value="0">否</el-radio>
            </el-radio-group>
            <p v-if="studentInfoForm.studentChangeToPage.isZhuXiao==1">是</p>
            <p
              v-if="studentInfoForm.studentChangeToPage.isZhuXiao!='' && studentInfoForm.studentChangeToPage.isZhuXiao==0">
              否</p>
          </el-form-item>
          <el-form-item label="监护人：" prop="guardian">
            <el-select v-model="studentInfoForm.studentChangeToPage.guardian" class="inputWidth" placeholder="请选择监护人">
              <el-option
                v-for="item in guardians"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <p v-if="studentInfoForm.guardian==1">有</p>
             <p v-if="studentInfoForm.guardian==0">无</p>-->
            <p>{{studentInfoForm.studentChangeToPage.guardian}}</p>
          </el-form-item>
        </div>
        <div class="blackDiv2">
          <div class="title title2"><i></i><span>家庭信息</span></div>
          <el-form-item label="父亲学历：" prop="fatherDucation">
            <el-select v-model="studentInfoForm.studentChangeToPage.fatherDucation" class="inputWidth"
                       placeholder="请选择父亲学历">
                         <el-option
                           v-for="item in ducations"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                         </el-option>
                       </el-select>
            <p>{{studentInfoForm.studentChangeToPage.fatherDucation}}</p>
          </el-form-item>
          <el-form-item label="父亲职业：" prop="fatherCareer">
            <el-select v-model="studentInfoForm.studentChangeToPage.fatherCareer" class="inputWidth"
                       placeholder="请选择父亲职业">
                         <el-option
                           v-for="item in careers"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                         </el-option>
                       </el-select>
            <p>{{studentInfoForm.studentChangeToPage.fatherCareer}}</p>
          </el-form-item>
          <el-form-item label="电话：" prop="fatherPhone">
            <el-input v-model.trim="studentInfoForm.studentChangeToPage.fatherPhone" class="inputWidth"></el-input>
            <p>{{studentInfoForm.studentChangeToPage.fatherPhone}}</p>
          </el-form-item>
          <el-form-item label="母亲学历：" prop="motherDucation">
            <el-select v-model="studentInfoForm.studentChangeToPage.motherDucation" class="inputWidth"
                       placeholder="请选择母亲学历">
                         <el-option
                           v-for="item in ducations"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                         </el-option>
                       </el-select>
            <p>{{studentInfoForm.studentChangeToPage.motherDucation}}</p>
          </el-form-item>
          <el-form-item label="母亲职业：" prop="motherCareer">
            <el-select v-model="studentInfoForm.studentChangeToPage.motherCareer" class="inputWidth"
                       placeholder="请选择母亲职业">
                         <el-option
                           v-for="item in careers"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                         </el-option>
                       </el-select>


            <p>{{studentInfoForm.studentChangeToPage.motherCareer}}</p>
          </el-form-item>
          <el-form-item label="电话：" prop="motherPhone">
            <el-input v-model.trim="studentInfoForm.studentChangeToPage.motherPhone" class="inputWidth"></el-input>
            <p>{{studentInfoForm.studentChangeToPage.motherPhone}}</p>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  // import leftSidebar from './leftSidebar.vue';
  // import rightWrap from './rightWrap.vue';
  if(!Array.prototype.remove) {
    Array.prototype.remove = function(item) {
      var i = this.indexOf(item);
      if(i === -1) {
        return;
      }
      this.splice(i, 1);
    };
  }
  function arrange(source) {
    var t;
    var ta;
    var r = [];

    source.forEach(function(v) {
      if (t === v) {
        ta.push(t);
        t++;
        return;
      }

      ta = [v];
      t = v + 1;
      r.push(ta);
    });

    return r;
  }
  var grads_default = [
    {
      checked:false,
      name:'一年级',
      display: true
    },
    {
      checked:false,
      name:'二年级',
      display: true
    },
    {
      checked:false,
      name:'三年级',
      display: true
    },
    {
      checked:false,
      name:'四年级',
      display: true
    },
    {
      checked:false,
      name:'五年级',
      display: true
    },
    {
      checked:false,
      name:'六年级',
      display: true
    },
    {
      checked:false,
      name:'初一',
      display: true
    },
    {
      checked:false,
      name:'初二',
      display: true
    },
    {
      checked:false,
      name:'初三',
      display: true
    },
    {
      checked:false,
      name:'初四',
      display: false
    },
    {
      checked:false,
      name:'高一',
      display: true
    },
    {
      checked:false,
      name:'高二',
      display: true
    },
    {
      checked:false,
      name:'高三',
      display: true
    }
  ];



  export default {
    data() {
      return {
        //民族选项
        options: this.nations,
        ducations: this.ducations,
        careers: this.careers,
        guardians: this.guardians,
        type:this.$route.params.type,
        value:'',
        // 全屏遮罩层
        fullscreenLoading: true,
        // 编辑输入框
        birthday:'',
        gradeList: {},

        studentInfoForm:{
         /* birthday:'',*/
         studentChangeToPage:{
          sid:'',
          name:'',
          sex:'',
          birthday:'',
          nation:'',
          idCard:'',


          schoolYear:'',
          isOneChile:'',
          isZhuXiao:'',
          guardian:'',
          //
          fatherDucation:'',
          fatherCareer:'',
          fatherPhone:'',
          motherDucation:'',
          motherCareer:'',
          motherPhone:'',
         }
        },
        studentInfoForm2:'',
        isReturnPage: false, //是否是返回入口
        isSavebtn: true, //是否是点击保存入口
        //民族参数
        restaurants: [],
        nation: '',
        // 校验
        studentInfoRules: {
         /* classIndex: [
            { required: true, message: '请选择班级', trigger: 'blur' },
          ],
          gradeId: [
            { required: true, message: '请选择年级', trigger: 'blur' },
          ],*/
          name: [
            {required: true, message: '姓名不能为空！', trigger: 'blur' },
            {pattern:/^[\S]{2,40}$/,message: '姓名输入在2~40个字！'}
          ],
          sex: [
            { required: true, message: '性别不能为空！', trigger: 'change' }
          ],
          nation: [
            { required: true, message: '民族不能为空！', trigger: 'change' },
          ],
          idCard: [
            { required: false, message: '请输入身份证号', trigger: 'blur' },
            {pattern: /^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9xX]))|((yt)\S{0,18})$/i,message: '身份证号格式输入错误！'},
          ],
         /* date1: [
            { type: 'date', required: false, message: '请选择日期', trigger: 'change' }
          ],*/
          fathereducation : [
            { required: false, message: '请选择父亲学历', trigger: 'change' }
          ],
          fatherprofession : [
            { required: false, message: '请选择父亲职业', trigger: 'change' }
          ],
          fatherPhone: [
            { required: false, message: '请输入电话', trigger: 'blur' },
            {pattern:/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message: '电话格式输入错误'},
          ],
          motherPhone: [
            { required: false, message: '请输入电话', trigger: 'blur' },
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message: '电话格式输入错误'},
          ]
        },


        // 编辑切换
        isEditing:false,

      }
    },
   /* beforeCreate() {
      let that = this
      //获取班级列表
      that.$ajax('/schadmin/getGradeList', {schoolId: 1})
        .then(res => {
          if(res.code == 200 && res.data && res.data.length) {
            that.gradeList = {};
            res.data.forEach((grade, index) => {
              if(!that.gradeList[grade.index]) {
                that.gradeList[grade.index] = grade;
              }
            })
            console.log(that.gradeList);
          }
        });
    },*/
    mounted(){
     /* this.getOrgTree()
      this.getOrgUserLists()
      this.getAreaTree()
      // this.getOrgInfo(this.orgInfoId)*/
      this.getOrgInfo();

    },
    methods: {
      //返回提醒保存
      remindSave(){
        this.isReturnPage = true;
        if (this.type == 'detail'|| !this.searchIsOk) {
          this.$router.go(-1);
          return;
        } else {
          this.$confirm('你当前做了编辑操作，是否要保存？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
          }).then(() => {
            //确定
            /*this.$router.replace('/eduSchoolManagement');*/
//            this.$router.go(-1);
            this.savestudentInfoForm();
            //保存
          }).catch(() => {
            //取消
            this.$router.go(-1);
          });
        }
      },
      // 获取学生基本信息
      getOrgInfo(id){
        let params={
          id:this.$route.params.id,//425120
        };
        this.$ajax('/teacher/getOneStu',params)
          .then(res => {
            this.studentInfoForm=res.data;
            this.studentInfoForm2=_.cloneDeep(this.studentInfoForm);
            this.fullscreenLoading=false;
          });
      },
      //编辑保存学生基本信息
      savestudentInfoForm(){
        let self = this;
        this.$refs.studentInfoForm.validate((valid) => {
            if (valid) {
        var nowDate = this.studentInfoForm.studentChangeToPage.birthday;
        if( Object.prototype.toString.call(nowDate) === '[object Date]'){
          var nowMonth = (nowDate.getMonth() + 1) > 9 ? (nowDate.getMonth() + 1) : ('0' + (nowDate.getMonth() + 1));
          var nowday = (nowDate.getDate() ) > 9 ? (nowDate.getDate()) : ('0' + (nowDate.getDate()));
          nowDate = nowDate.getFullYear() + '-' + nowMonth + '-' + nowday;
        }
        this.studentInfoForm.studentChangeToPage.birthday = nowDate;
        this.studentInfoForm.studentChangeToPage.schoolYear = Object.prototype.toString.call(this.studentInfoForm.studentChangeToPage.schoolYear) === '[object Date]' ? this.studentInfoForm.studentChangeToPage.schoolYear.getFullYear() : this.studentInfoForm.studentChangeToPage.schoolYear;

        let params={
          id:this.$route.params.id,
          name: this.studentInfoForm.studentChangeToPage.name,
          sex: this.studentInfoForm.studentChangeToPage.sex,
          nation: this.studentInfoForm.studentChangeToPage.nation,
          idCard: this.studentInfoForm.studentChangeToPage.idCard,
          schoolYear: this.studentInfoForm.studentChangeToPage.schoolYear,
          isOneChile: this.studentInfoForm.studentChangeToPage.isOneChile,
          isZhuXiao: this.studentInfoForm.studentChangeToPage.isZhuXiao,
          guardian: this.studentInfoForm.studentChangeToPage.guardian,
          birthday:this.studentInfoForm.studentChangeToPage.birthday,
          fatherDucation: this.studentInfoForm.studentChangeToPage.fatherDucation,
          fatherCareer: this.studentInfoForm.studentChangeToPage.fatherCareer,
          fatherPhone: this.studentInfoForm.studentChangeToPage.fatherPhone,
          motherDucation: this.studentInfoForm.studentChangeToPage.motherDucation,
          motherCareer: this.studentInfoForm.studentChangeToPage.motherCareer,
          motherPhone: this.studentInfoForm.studentChangeToPage.motherPhone,
         /* orgId: this.selectedCounty || this.selectedCity || this.selectedProvince,*/
        };
        this.$ajax('/teacher/updateOneStu',params)
          .then(res => {
            if(res.code == 200){
              this.getOrgInfo();
              this.useAlert('success',"保存成功",function () {
                if(self.isSavebtn){ self.$router.go(-1); }
               //回调函数
                self.isEditing=false;
                self.searchIsOk=false;
              });

            }else{
              this.useAlert('error','保存失败：'+res.message,function () {
                //回调函数
                self.isEditing=false;
              });
            }
          });
            } else {
              // return false;
              this.useAlert('error','缺少必填信息或格式错误，请填写完整',function () {});
            }
        });
      },
      // 编辑机构信息
      editOrgInfoForm(){

        this.isEditing=true;

      },

      // 取消机构信息
      cancelOrgInfoForm(){
        this.isEditing=false;
        this.getOrgInfo(this.orgInfoId)

      },
      setValue:function(){
        this. studentInfoForm2=_.cloneDeep(this. studentInfoForm);
      }
    },
    created: function() {
      this.grads = JSON.parse(JSON.stringify(grads_default));
    },
    watch: {
      studentInfoForm: {
        handler: function (after, before) {
          var _this = this;
          console.log(JSON.stringify(after))
          console.log(JSON.stringify(_this. studentInfoForm2));
          this.searchIsOk = JSON.stringify(after) !== JSON.stringify(_this. studentInfoForm2);

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
      }else {
        if (this.searchIsOk) {
          this.$confirm('您当前做了编辑操作，是否需要保存？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
//              type: 'warning'
          }).then(() => {
            //确定
            this.isSavebtn=false;
            this.savestudentInfoForm();
            next()
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


  .editstudent .menus{
    width: 200px;
    border: 1px solid #20A0FF;
  }
  .editstudent  .menus-head{
    background: #20A0FF;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  .editstudent  .menus-head .title{
    font-size: 14px;
  }
  .editstudent  .menus-head .add-btn{
    color:#fff;
    border: 1px solid #fff;
    font-size: 12px;
    padding: 2px;
  }
  .editstudent  .seach-bar input{
    height: 30px;
    width: 100%;
    border: 1px solid #20A0FF;
  }
  .editstudent  .el-tabs__active-bar{
    top: 0;
  }
  .editstudent  .el-tree-node.is-current{
    color: #20A0FF;
  }
  .editstudent .tabs-header{
    padding-bottom: 10px;
    border-bottom: 1px solid #e9edf1;
  }

  .editstudent .space-between{
    display: flex;
    justify-content: space-between;
  }
  .editstudent .space-around{
    display: flex;
    justify-content: space-around;
  }
  .editstudent .tabs-header .editor{
    padding: 10px;
    display: block;
  }

/*
!* 查看显示p  隐藏输入框*!
  !*输入框*!
  .editstudent .edit .el-input{
    display: none;
  }
  !*下拉框*!
  .editstudent  .edit .el-select{
    display: none;
    !* display: inline-block; *!
  }
     !*民族*!
  .editstudent  .edit .el-autocomplete{
    display: none;
  }
      !*单选*!
  .editstudent .edit  .el-radio-group{
    display: none;
  }
  !* 编辑状态隐藏p  显示输入框*!
  .edit.editing p{
  display: none;
  }
     !*输入框*!
  .editstudent .edit.editing .el-input{
    display: inline-block;
  }
     !*下拉框*!
  .editstudent .edit.editing .el-select{
    display: inline-block;
  }
     !*单选*!
  .editstudent .edit.editing .el-radio-group{
       line-height: 36px;
       display: block;
     }


*/





  .editstudent  .pagination{
    margin-top: 30px;
  }
  b{
    font-weight: normal;
  }
  .editstudent  .grads li{list-style:none;float:left;margin-right:10px}
  .editstudent  .grads label{border:1px solid lightblue;width:50px;text-align:center;display:inline-block;cursor:pointer}
  .editstudent .grads li label.disabled{background:lightgray;color:#000;cursor:not-allowed}
  .editstudent .grads li label.checked{background:lightblue;color:#fff}
  .editstudent  .blind{
    clip: rect(1px,1px,1px,1px);
    clip: rect(1px 1px 1px 1px);
    position: absolute;
  }

</style>
