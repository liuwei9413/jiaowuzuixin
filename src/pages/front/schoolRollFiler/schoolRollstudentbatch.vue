<template>
  <div id="studentbatch" v-loading.lock="formSubmited" element-loading-text="数据导入中...">
    <div class="ev-page-return">
      <router-link  :to="{ path:'/studentManagement' }" class=" icon-back">返回 </router-link>
    </div>

    <div class="ev-report-page-panel">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="批量导入" name="one">

          <el-form :model="formData" method="post" action="/schadmin/import/importScore" enctype="multipart/form-data" id="importScoreForm">
            <ol>
              <li class="xiazai">
                <h3><i class="icon-download-File"></i> 1、下载模板</h3>
                <p>
                  点击下载导入模板<a :href="baseURLPage+'downloads/参测学生基本信息表.xls'" target="_blank"><el-button type="primary" class="download"> 下载</el-button></a>
                </p>
              </li>
              <li>
                <h3><i class="icon-lead-in-class"></i>2、选择学生所在班级</h3>
                <el-form-item label="年级：" :label-width="formLabelWidth">
                  <el-radio-group v-model="formData.gradeId">
                    <el-radio-button :label="grade.index" v-for="(grade,index) in gradeList" :key="index">{{grade.name}}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="班级：" :label-width="formLabelWidth" >
                  <el-radio-group v-model="formData.classId" v-if="formData.gradeId">
                    <el-radio-button :label="classes.index" v-for="(classes,index) in gradeList[formData.gradeId].classList" :key="index">{{classes.name}}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </li>
              <li class="file-box">
                <h3><i class="icon-import-file"></i>3、选择需要导入的EXCEL文件</h3>
                <el-form-item>
                  <input type='text' name='textfield' id='textfield' v-model="fielname"/>
                  <input type='button' class='select-btn' value='选择文件'/>
                  <input
                    name="file"
                    class="upload-demo"
                    accept=".xls,.xlsx,.csv"
                    type="file"
                    v-on:change="fileChange($event)">
                  <!-- multiple="multiple"-->
                  <el-button type="primary" class="submit" native-type="submit " v-on:click="submitForm($event)"> 导入</el-button>
                </el-form-item>
                <input type="hidden" name="examId" value="" v-model="formData.gradeId">
                <input type="hidden" name="classId" value="" v-model="formData.classId">
              </li>
            </ol>

          </el-form>

          <div>
            <div v-show="isError" style="margin-top: 20px;min-height:500px;" id="div1">
              <div class="icon-cue" style="font-size: 14px;color:red;padding: 10px 0 10px 0;"> 出错提示</div>
              <el-table
                :data="errorArr"
                border
                style="width: 100%" align="center">
                <el-table-column
                  prop="fileName"
                  label="问题文档"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="row"
                  label="问题行数"
                  width="200"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="出错人"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="content"
                  label="问题描述"
                  align="center">
                </el-table-column>
              </el-table>
            </div>
            <div id="error"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="操作指引" name="two">
          <div class="explain">
            <h3><i class="icon-case"></i>1、导入格式案例</h3>
            <div class="report-remark">
              参测学生基本信息表
            </div>
            <img src="../../../resources/front/imgs/studentExcel.png"/>
            <h3><i class="icon-attentions"></i>2、填写注意事项</h3>
            <p class="son-remark">1、每个班或测评组学生基本信息单独建立一个EXCEL文件。</p>
            <p class="son-remark">2、文件命名规则：年级+班级（或组号）。</p>
            <p class="son-remark">3、请严格按照示例格式填写基础信息，“性别、民族、是否独生子女、是否住校、监护人、父亲学历、父亲职业、母亲学历、母亲职业”选项请从下拉菜单中选择。</p>
            <h3><i class="icon-import-instructions"></i>3、导入说明</h3>
            <p class="son-remark">1、文件导入前请严格按照数据要求和格式要求填写。</p>
            <p class="son-remark">2、导入如果出现异常或数据问题，请修改后重新导入。</p>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
export default {
  data() {
    return {
      activeName: 'one',//切换默认显示内容
      formSubmited: false,
      formLabelWidth: '60px',
      gradeList: {},
      formData: {
        classId: '',
        gradeId: ''
      },
      //异常处理
      isError:false,
      errorArr:[],//储存批量导入的异常
      fielname:"",
      baseURLPage: ''
    };
  },
  beforeCreate() {
    let that = this
    that.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log()
    //获取班级列表
    that.$ajax('/teacher/getGradeList', {schoolId: that.userInfo.schools.schoolId})
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

  },
  mounted() {
    this.baseURLPage = this.baseURL;
  },
  methods: {
    //tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    fileChange: function(e) {
      if( this.formData.gradeId=='') {
        this.useAlert('error','请选择年级',function () {});
       /* this.$alert('请选择年级', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
           /!* this.$message({
              type: 'info',
              message: `action: ${ action }`
            });*!/
          }
        });*/
      }else if( this.formData.gradeId=='' || this.formData.classId=='' ) {
        this.useAlert('error','请选择班级',function () {});
       /* this.$alert('请选择年级班级', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
           /!* this.$message({
              type: 'info',
              message: `action: ${ action }`
            });*!/
          }
        });*/
      }
      console.log(e)
      let files = e.target.files || e.dataTransfer.files;

      this.fielname = files[0].name;
    },
    submitForm: function(e) {
      e.preventDefault()
      if( this.formData.gradeId=='') {
        /*this.$alert('请选择年级', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            /!*this.$message({
              type: 'info',
              message: `action: ${ action }`
            });*!/
          }
        });*/
        this.useAlert('error','请选择年级',function () {});
        return;
      }
      console.log(this.formData.classId);
      if(!this.formData.classId||this.formData.classId=='' ){
       /* this.$alert('请选择年级班级', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });*/
        this.useAlert('error','请选择班级',function () {});
        return;
      }

      if(!this.fielname){
        this.useAlert('error','请选择导入文件',function () {});
        return;
      }
      let that = this
      that.formSubmited = true
      let formData = new window.FormData(document.getElementById('importScoreForm'));
      $.ajax({
        url:this.staticResources+'/import/student?classId='+that.formData.classId+'&gradeId='+that.formData.gradeId+'&schoolId='+that.userInfo.schools.schoolId,
        type:"post",
        data:formData,
        xhrFields: {withCredentials: true},
        dataType: 'json',
        processData:false,
        contentType:false,
        success:function(res){
          if(res.code == 200||res.code == 400){
            that.formSubmited = false
//            console.log(data);
            that.$alert(res.message, '提示', {
              confirmButtonText: '确定',
            });
          }else {
            that.formSubmited = false
            that.isError=true;
            that.errorArr=res.data;
            that.useAlert('error', '导入失败，请稍后重试', function() {});
            that.$nextTick(function () {
              var anchor =$('#error');
              $("body,html").animate({
                scrollTop: anchor.offset().top
              })

            })
            /*  let row=errorArr[0].row;
             //              let content=errorArr[0].content;
             //              console.log(row)
             //              console.log(content)
             let errorInfo=''
             errorArr.forEach((item,index) =>{
             errorInfo+=item.row + item.content
             });
             that.$alert(res.message+errorInfo, '提示', {
             confirmButtonText: '确定',

             });*/
          }

        },
       /* error:function(e){
          that.formSubmited = false
          alert("错误！！");
        }*/
      });
    }
  }

}
</script>

<style>
  #studentbatch .dialog-footer{
    text-align: center;
  }
  #studentbatch  .el-form-item__label{
    padding: 16px 12px 11px 0;
  }
  #studentbatch .el-radio-button{
    margin-right: 10px;
    margin-top:5px;
    border-left:1px solid #bfcbd9;
  }
  #studentbatch  .el-radio-button:first-child .el-radio-button__inner{
    border-radius:0 0 0 0;
    border-left:none;
  }
  #studentbatch  .el-radio-button:last-child .el-radio-button__inner{
    border-radius:0 0 0 0 ;
  }
  #studentbatch  .el-radio-button__inner{
    border-radius:0 0 0 0 ;
    display: inline-block;
    width:70px;
    padding: 10px 8px;
  }
  #studentbatch .ev-report-page-panel .el-tab-pane li:nth-of-type(1) i {background-color: #1ec56b;}
  #studentbatch .ev-report-page-panel .el-tab-pane li:nth-of-type(2) i {background-color: #0d9ee9;}
  #studentbatch .ev-report-page-panel .el-tab-pane li:nth-of-type(3) i {background-color: #ff773b;}
</style>
