<template>
  <div id="tySubjectBatch">
    <div class="ev-page-return">
      <router-link :to="{ path: '/sportManagement' }" class=" icon-back">返回 </router-link>
    </div>

    <div class="ev-report-page-panel">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="批量导入" name="one">
          <div>
            <ol>
              <li class="xiazaimoban">
                <h3><i class="icon-download-File"></i>下载模板</h3>
                <p style="margin-top:15px;margin-left: 36px;float: left;">点击下载导入模板&nbsp&nbsp&nbsp&nbsp&nbsp<a :href="baseURL+'downloads/体能成绩模板.zip'" target="_blank"><el-button type="primary" class="download"> 下载</el-button></a></p>
              </li>
              <li class="file-box">
                <h3 style="padding-left:13px; display: block;"><i class="icon-import-file" style=" background-color: #ff773b; color: #fff;"></i>选择需要导入的EXCEL文件</h3>
                <el-upload
                  class="upload-score"
                  ref="upload"
                  :data="formData"
                  accept=".xls,.xlsx,.csv"
                  :action="baseURL + 'import/physical'"
                  multiple
                  :before-upload="beforeUpload"
                  :on-change="handleChange"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :file-list="fileLists"
                  :auto-upload="false">
                  <el-button slot="trigger" class="select-btn" type="primary">选择文件</el-button>
                  <el-button class="upload-btn" type="success" @click="submitUpload">导入</el-button>
                  <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                </el-upload>
              </li>
            </ol>
          </div>

          <!--出错提示-->
          <div>
            <div v-if="errorArr.length > 0" style="margin-top: 20px;min-height:500px;">
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
            <h3><i class="icon-case"></i>导入格式案例</h3>
            <div class="report-remark" style="margin-bottom:20px;">
              体能模板中学
            </div>
            <img  src="../../../resources/front/imgs/tySubjectinfomoban.png">
            <h3><i class="icon-attentions"></i>填写注意事项</h3>
            <p class="son-remark">1、姓名和学籍号为必填项。</p>
            <p class="son-remark">2、学籍号需要输入全国统一学籍号且输入学籍号必须和系统学生学籍号保持一致。</p>
            <p class="son-remark">3、体育科目有成绩的填写，没成绩的可以为空</p>
            <h3><i class="icon-import-instructions"></i>导入说明</h3>
            <p class="son-remark">1、文件导入前请严格按照数据要求和格式要求填写。</p>
            <p class="son-remark">2、导入如果出现异常或数据问题，请修改后重新导入。</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import $ from 'jquery'
  export default {
    data() {
      return {
        activeName: 'one',//切换默认显示内容
        formData: { //上传表单参数
          schoolId: JSON.parse(localStorage.userInfo).schools.schoolId,
          examId:this.$route.query.examId,
          term: this.$route.query.term,
          schoolYear:this.$route.query.schoolYear,
        },
        fileLists: [],  //上传文件列表
        errorArr: [], //出错列表
      };
    },
    mounted() {

    },
    methods: {
      //tab切换
      handleClick(tab, event) {
//        console.log(tab, event);
      },
      selectFile() {
      },
      beforeUpload(file) {
        console.log(file.size / 1024 / 1024);
        const isLt2M = file.size / 1024 / 1024 <= 2; //小于2M
        if (!isLt2M) {
          this.$alert('上传单个文件大小不能超过2MB! 请修改后重新导入', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              location.reload();
            }
          });
//          this.useAlert('error', '上传文件大小不能超过 2MB!', function() {
//            location.reload();
//          });
        }
        return isLt2M;
      },
      submitUpload() {
        this.errorArr = []; //重置errorArr
        this.$refs.upload.submit();

      },
      handleChange(file, fileList) {
        $('#tySubjectBatch .upload-score li').each(function(index, item) {
          if ( $(item).text().indexOf(file.name) >= 0 ) {
            $(item).remove();
          }
        });
      },
      handleSuccess(response, file, fileList) {
        if ( response.code == '200' ) {
          this.useAlert('success', response.message, function() {
//            location.reload();
          });
        } else if ( response.code == '500' ) {
          this.errorArr = this.errorArr.concat(response.data);
          this.useAlert('error', '导入失败，请稍后重试', function() {
//            location.reload();
          });
          $('#tySubjectBatch .upload-score li').each(function(index, item) {
//            console.log($(item).text());
            if ( $(item).text().indexOf(file.name) >= 0 ) {
              $(item).remove();
            }
          });
//          this.fileLists = this.fileLists.filter(function(item) {
//            return item.name != file.name;
//          })
        }
      },
      handleError(err, file, fileList) {
//        this.useAlert('error', '网络错误请重试！', function() {
//          location.reload();
//        });
      },

    }
  }
</script>

<style >
  #tySubjectBatch .upload-score { width: 360px; padding: 0 36px 30px;}
  #tySubjectBatch .select-btn { margin-left: 10px; width: 90px; height: 34px;}
  #tySubjectBatch .upload-btn { margin-left: 10px; width: 90px; height: 34px;}
  #tySubjectBatch .el-upload-list { margin-top: 20px;}
  #tySubjectBatch .ev-report-page-panel .el-tab-pane p>a { margin-left: 0;}
</style>
