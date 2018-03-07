<template>
  <div id="studentbatch">
    <div class="ev-page-return">
      <a href="javascript:;"  @click="goBack" class=" icon-back">返回</a>
    </div>
    <div class="ev-report-page-panel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="批量导入" name="one">
            <el-form :model="formData" method="post" action="/schadmin/import/importScore" enctype="multipart/form-data" id="importScoreForm">
              <ol>
                <li class="xiazai">
                  <h3>1、下载模板</h3>
                  <p>点击下载导入模板&nbsp&nbsp&nbsp<a :href="baseURLPage+'downloads/参测学生基本信息表.xls'" target="_blank"><el-button type="primary" class="download">下载</el-button></a></p>
                </li>
                <li class="file-box">
                  <h3>2、选择需要导入的EXCEL文件</h3>
                  <el-form-item>
                    <input type='text' name='textfield' id='textfield' class='txt' v-model="fielname"/>
                    <input type='button' class='select-btn' value='选择文件'/>
                    <input   @change="fileChange($event)"
                            name="file"
                            class="upload-demo"
                            accept=".xls,.xlsx,.csv"
                            type="file"
                            v-on:change="fileChange($event)">
                    <!-- multiple="multiple"-->
                    <el-button type="primary" class="submit" native-type="submit " :loading="formSubmited" v-on:click="submitForm($event)"> 导入</el-button>
                  </el-form-item>
                  <input type="hidden" name="examId" value="" v-model="formData.gradeId">
                  <input type="hidden" name="classId" value="" v-model="formData.classId">
                </li>
              </ol>
            </el-form>
            <div>
              <div  v-show="isError " style="margin-top: 20px;min-height:500px;">
              <div   class="icon-cue" style="font-size: 14px;color:red;padding: 10px 0 10px 0;">  出错提示</div>
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
              <div id="errorDiv"></div>
            </div>
           </el-tab-pane>
          <el-tab-pane label="操作指引" name="two">
            <div class="explain">
              <h3>1、导入格式案例</h3>
              <div class="report-remark">
                参测学生基本信息表
              </div>
              <img src="../../../resources/front/imgs/studentExcel.png"/>
              <h3>2、填写注意事项：</h3>
              <p class="son-remark">1、每个班或测评组学生基本信息单独建立一个EXCEL文件。</p>
              <p class="son-remark">2、文件命名规则：年级+班级（或组号）。</p>
              <p class="son-remark">3、请严格按照示例格式填写基础信息，“性别、民族、是否独生子女、是否住校、监护人、父亲学历、父亲职业、母亲学历、母亲职业”选项请从下拉菜单中选择。</p>
              <h3>3、导入说明</h3>
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
          classId: this.$route.query.classId,
          gradeId:this.$route.query.gradeId,
        },
        //异常处理
        isError:false,
        errorArr:[],//储存批量导入的异常
        fielname:'',
        baseURLPage: ''
      };
    },
    beforeCreate() {
      let that = this
      that.userInfo = JSON.parse(localStorage.getItem("userInfo"));

    /*  //获取班级列表
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
        });*/

    },
    mounted(){
      this.baseURLPage = this.baseURL;
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      //document.body.scrollTop = anchor.offsetTop;
      /*console.log(this.userInfo.schools.schoolId)*/
    },
    methods: {
      //tab切换
      handleClick(tab, event) {
        console.log(tab, event);
      },


      goBack(){
        this.$router.go(-1);
      },
      fileChange: function(e) {
        if( this.formData.gradeId=='') {
          this.$alert('请选择学生所在年级', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }else if( this.formData.gradeId=='' || this.formData.classId=='' ) {
          this.$alert('请选择学生所在年级班级', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }
        let files = e.target.files || e.dataTransfer.files;

        this.fielname = files[0].name;


      },
      submitForm: function(e) {
/*        if( this.formData.gradeId=='') {
          this.$alert('请选择年级', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }else if( this.formData.gradeId=='' || this.formData.classId=='' ) {
          this.$alert('请选择年级班级', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }*/


        e.preventDefault()

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
              that.$nextTick(function () {
                var anchor =$('#errorDiv');
                $("body,html").animate({
                  scrollTop: anchor.offset().top
                })

              })
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
  #studentbatch .el-radio-button{
    margin-right: 10px;
    border-left:1px solid #bfcbd9;

  }
  #studentbatch  .el-radio-button:first-child .el-radio-button__inner{
    border-radius:0 0 0 0 ;
  }
  #studentbatch  .el-radio-button:last-child .el-radio-button__inner{
    border-radius:0 0 0 0 ;
  }
</style>
