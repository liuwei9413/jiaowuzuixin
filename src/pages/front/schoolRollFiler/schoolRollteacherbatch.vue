<template>
  <div id="schoolRollteacherbatch" v-loading.lock="formSubmited" element-loading-text="数据导入中...">
    <div class="ev-page-return">
      <router-link  :to="{ path:'/teacherManagement' }" class=" icon-back">返回 </router-link>
    </div>
    <div class="ev-report-page-panel">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="批量导入" name="one">
          <el-form method="post" action="/schadmin/import/importScore" enctype="multipart/form-data" id="importScoreForm">
            <ol>
              <li class="xiazai">
                <h3><i class="icon-download-File"></i>1、下载模板</h3>
                <p >点击下载导入模板&nbsp&nbsp&nbsp<a :href="baseURLPage+'downloads/参测教师基本信息表.xls'" target="_blank"><el-button type="primary" class="download">下载</el-button></a></p>
              </li>
              <li class="file-box">
                <h3><i class="icon-import-file"></i>2、选择需要导入的EXCEL文件</h3>
                <el-form-item>
                  <input type='text' name='textfield' id='textfield' v-model="fielname">
                  <input type='button' class='select-btn' value='选择文件'/>
                  <input  @change="fileChange($event)"
                          name="file"
                          class="upload-demo"
                          accept=".xls,.xlsx,.csv"
                          type="file">
                  <!-- multiple="multiple"-->
                  <el-button type="primary" class="submit" native-type="submit"  v-on:click="submitForm($event)"> 导入</el-button>
                </el-form-item>
              </li>
            </ol>
          </el-form>
          <!--异常处理-->
          <div >
            <div style="margin-top: 20px;min-height:500px;" v-show="isError">
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

        <!--说明-->
        <div class="explain">
          <h3><i class="icon-case"></i>1、导入格式案例</h3>
          <div class="report-remark">
            参测教师基本信息表
          </div>
          <img  src="../../../resources/front/imgs/teacherinfomoban.png">
          <h3><i class="icon-attentions"></i>2、填写注意事项</h3>
          <p class="son-remark">1、标明橙色的项为必填项。</p>
          <p class="son-remark">2、在填写下列信息时，请从备选项中选择符合自己情况的一项：</p>
          <p class="son-remark level-remark">a&nbsp;&nbsp;第一学历与最高学历（高中、中专、大专、本科、硕士及以上、其它）：</p>
          <p class="son-remark level-remark">b&nbsp;&nbsp;高校类别（本科提前批次、本科第一批次、本科第二批次、本科第三批次、专科、其它）</p>
          <p class="son-remark level-remark">c&nbsp;&nbsp;考取途径（统招、自考、成招、专升本、在职、其它）</p>
          <p class="son-remark level-remark">d&nbsp;&nbsp;职称（正高级、高级、一级、二级、三级、无）</p>
          <p class="son-remark level-remark">e&nbsp;&nbsp;专、兼职教研员（专职、兼职、否）</p>
          <p class="son-remark">3、请严格按照示例格式填写基础信息。</p>
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
        fileList:[],
        formData:'',
        formSubmited: false,
        isError:false,
        errorArr:[],//储存批量导入的异常
        fielname:'',
      /*

        formLabelWidth: '120px',
        dialogFormVisible: false,

        addOrEdit: 0,
        paperList: {
        },
        schoolYears: [],
        schoolYearId: '',
        firstSchoolYearId: '',
        errorMsg: '',
        showErrorMsg: false*/
        baseURLPage: ''
      };
    },
    beforeCreate() {

    },
    mounted() {
      this.baseURLPage = this.baseURL;
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(this.userInfo.schools.schoolId)
    },
    methods: {
//tab切换
      handleClick(tab, event) {
        console.log(tab, event);
      },


      fileChange:function (e) {
//        console.log(e)
        let files = e.target.files || e.dataTransfer.files;

        this.fielname = files[0].name;

//        console.log(this.filename)

      },
      submitForm: function(e) {
        e.preventDefault()
        if(!this.fielname){
          this.useAlert('error','请选择导入文件',function () {});
          return;
        }
        let that = this
        that.formSubmited = true
        let formData = new window.FormData(document.getElementById('importScoreForm'));
        $.ajax({
          url:this.staticResources+'/schoolProvider/importTeacher?type=teacher&schoolId='+that.userInfo.schools.schoolId,
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
          /*error:function(res){
            alert(2)
            that.formSubmited = false
            if(res.code == 500){
              that.formSubmited = false
//            console.log(data);
              let errorArr=res.data;
              console.log(errorArr);
//              let row=errorArr[0].row;
//              let content=errorArr[0].content;
//              console.log(row)
//              console.log(content)
              let errorInfo='';
              errorArr.forEach( (item,index) =>{
                errorInfo+=item.row + item.content
              });
              that.$alert(res.message+errorInfo, '提示', {
                confirmButtonText: '确定',

              });
            }
          }*/
        });
      }
    }

  }


</script>

<style>
  #schoolRollteacherbatc  .dialog-footer{
    text-align: center;
  }
</style>
