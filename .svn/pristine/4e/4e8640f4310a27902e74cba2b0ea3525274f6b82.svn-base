<template>
  <div id="addScore">
    <div class="btns">
      <a href="javascript:;" @click="goBack" class="icon-back">返回 </a>
      <el-button style="float: right;" class="white-color  el-button el-button--primary" type="primary" @click="submitForm(formData)"><span>保存</span></el-button>
    </div>

    <div class="score-content">
      <div class="score-title"><i class="icon-essential-information" style="background-color: #49a9ff; color: #fff;"></i><span>考试基本信息</span></div>
      <div class="score-form">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="120px">
          <el-form-item label="考试名称：" prop="examinationName">
            <el-input v-model.trim="formData.examinationName" placeholder="考试名称不可重复"></el-input>
          </el-form-item>
          <el-form-item label="学年：" prop="schoolYear">
            <span class="year-term">{{ formData.schoolYear }}</span>
          </el-form-item>
          <el-form-item label="学期：" prop="schoolTerm">
            <span class="year-term">{{ schoolTerm }}</span>
          </el-form-item>
          <el-form-item label="考试类型：" prop="examinationType">
            <el-radio-group v-model.number="formData.examinationType">
              <el-radio-button :label="item.label" v-for="(item, index) in formData.examType" :key="index" :disabled="(item.label != formData.examinationType && webType == 'edit')">{{ item.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="score-content" style=" padding-bottom: 50px;">
      <div class="score-title"><i class="icon-full-marks" style="background-color: #5cc563; color: #fff;"></i><span>考试科目满分设置</span></div>
      <div class="score-list" v-if="this.formData.smaTableData !== undefined">
        <div class="school-title">小学</div>
          <el-table :data="smaTableBody" border stripe>
          <el-table-column :label="item.text" v-for="(item, key) in smaTableHeader" :key="key">
            <template scope="scope">
              <span v-if="item.text === 'gradeName'">{{scope.row[item.text]}}</span>
              <el-input v-else v-model="scope.row[item.text]" @change="regFn(scope.row[item.text])" :class="{'error': !/^\d{0,3}$/.test(scope.row[item.text])}"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="score-list" v-if="this.formData.midTableData !== undefined">
        <div class="school-title">初中</div>
        <el-table :data="midTableBody" border stripe>
          <el-table-column :label="item.text" v-for="(item, key) in midTableHeader" :key="key">
            <template scope="scope">
              <span v-if="item.text === 'gradeName'">{{scope.row[item.text]}}</span>
              <el-input v-else v-model="scope.row[item.text]" @change="regFn(scope.row[item.text])" :class="{'error': !/^\d{0,3}$/.test(scope.row[item.text])}"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="score-list" v-if="this.formData.higTableData !== undefined">
        <div class="school-title">高中</div>
        <el-table :data="higTableBody" border stripe>
          <el-table-column :label="item.text" v-for="(item, key) in higTableHeader" :key="key">
            <template scope="scope">
              <span v-if="item.text === 'gradeName'">{{scope.row[item.text]}}</span>
              <el-input v-else v-model="scope.row[item.text]" @change="regFn(scope.row[item.text])" :class="{'error': !/^\d{0,3}$/.test(scope.row[item.text])}"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'addScore',
    data () {
      return {
        schoolId: JSON.parse(localStorage.userInfo).schools.schoolId,
        schoolTerm: '',
        webType: this.$route.path.indexOf('addScore') >= 0 ? 'add' : 'edit',  //edit => 编辑  add => 新增
        isEdited: false, //是否有输入改动
        initFormData: '',  //默认的数据 用以比对是否改变
        formData: {
          examinationType: '',
        },
        rules: {
          examinationName: [
            { required: true, message: '请输入考试名称', trigger: 'blur' },
            { max: 30, message: '名称不能超过30个字', trigger: 'blur' },
//            { pattern: /^[\u4E00-\u9FA5]+$/, message: '试卷名只能输入中文', trigger: 'blur'}
          ],
          examinationType: [
            { type: 'number', required: true, message: '请选择考试类型', trigger: 'blur' }
          ]
        },
        regIsTrue: true,  //输入框验证 true=>验证通过 false=>验证失败
        regIsTrueStr: '', //被编辑的输入框验证情况集合字符串
        smaTableBody: [], //考试科目满分数据——表格内容
        smaTableHeader: [], //考试科目满分数据——表头
        midTableBody: [],
        midTableHeader: [],
        higTableBody: [],
        higTableHeader: [],
        routeLeaveAction: true, //路由跳转是否出编辑提示
      }
    },
    watch: {
      //监听是否有值变化
      formData: {
        handler: function (after, before) {
//          console.log(this.initFormData);
//          console.log(JSON.stringify(after));
          this.isEdited = this.initFormData !== JSON.stringify(after);
          console.log(this.isEdited);
        },
        deep: true
      }
    },
    methods:{
      //初始化
      initData() {
        const params = {
          schoolId: this.schoolId,
          oldExamId: this.$route.query.examId
        };
        this.$ajax('/schadmin/getExaminationSujectScore', params).then( (res) => {
          if ( res.code === '200' ) {
            this.formData = Object.assign({}, this.formData, res.data);
            this.schoolTerm = this.formData.schoolTerm == 1 ? '下学期' : '上学期';
//            this.formData.examinationType = 1;
            this.initFormData = JSON.stringify(this.formData);
//            this.examType = res.data.examinationType || 1;
//            this.examType = 1;

            if ( res.data.smaTableData !== undefined && Object.keys(res.data.smaTableData).length !== 0 ) {
              this.smaTableBody = res.data.smaTableData.tableBody;
              this.smaTableHeader = res.data.smaTableData.tableHeader.first;
            }
            if ( res.data.midTableData !== undefined && Object.keys(res.data.midTableData).length !== 0 ) {
              this.midTableBody = res.data.midTableData.tableBody;
              this.midTableHeader = res.data.midTableData.tableHeader.first;
            }
            if ( res.data.higTableData !== undefined && Object.keys(res.data.higTableData).length !== 0 ) {
              this.higTableBody = res.data.higTableData.tableBody;
              this.higTableHeader = res.data.higTableData.tableHeader.first;
            }
          }
        })
      },
      regFn(value) {
        this.regIsTrueStr += /^\d{0,3}$/.test(value) ? 1 : 0;
        this.regIsTrue = this.regIsTrueStr.indexOf('0') >= 0 ? false : true;
      },
      //提交表单 isOk=undefined  => 正常保存跳转到列表页
      submitForm(formData, isOk, next) {
        const params = Object.assign({}, { schoolId: this.schoolId, oldExamId: this.$route.query.examId }, formData);
        const params2 = {};
        for ( let i in params ) {
          params2[i] = typeof params[i] === 'object' ? JSON.stringify( params[i] ) : params[i];
        };
//        console.log(params2);
        this.$refs['formData'].validate((valid) => {
          if (valid && this.regIsTrue && this.isEdited) {
            //http://192.168.10.140:8088/yitai-educational-web/schadmin/saveExamination
            this.$ajax('/schadmin/saveExamination', params2).then( (res) => {
              if ( res.code == '200' ) {
                this.$alert(res.message, '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    if ( !isOk ) {
                      this.routeLeaveAction = false;  //正常跳转路由，不出保存提示
                      this.$router.push({ path: '/scoreManagement' })
                    } else {
                      next();
                    }
                  }
                });
              } else {
                this.$alert(res.message, '提示', {
                  confirmButtonText: '确定',
                  callback: () => {

                  }
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //返回
      goBack() {
        this.$router.push({ path: '/scoreManagement' });
      },
    },
    beforeMount(){
//      console.log(this.$route.query.examId);
      this.initData();
    },
    beforeRouteLeave  (to, from, next) {
      if(this.isEdited && this.routeLeaveAction){
        this.$confirm('您当前做了编辑操作，是否需要保存？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          closeOnClickModal: false,
          closeOnPressEscape: false,
        }).then(() => {
          this.submitForm(this.formData, true, next);
        }).catch(() => {
          next()
        });
      }else{
        next()
      }
    }
  }
</script>

<style>
  #addScore { background: #f5f5f5;}
  #addScore .btns { margin-bottom: 12px; height: 34px; padding: 8px 20px; background: #fff;}
  #addScore .btns a { font-size: 14px; color: #666; cursor: pointer; line-height: 34px;}
  #addScore .score-title { padding: 14px 0; height: 22px; line-height: 22px; border-bottom: 1px solid #eeeeee;}
  #addScore .score-title i { display: inline-block; width: 22px; height: 22px; border-radius: 50%; margin-right: 10px; font-size: 12px; line-height: 22px; text-align: center; vertical-align: middle;}
  #addScore .score-title span { font-size: 16px; color: #333333; vertical-align: middle;}
  #addScore .score-content { margin-bottom: 12px; padding: 0 20px; background: #fff;}
  #addScore .school-title { margin: 18px 0; padding-left: 10px; height: 14px; line-height: 14px; font-size: 14px; color: #333333; border-left: 4px solid #0d9ee9;}
  #addScore .score-form { padding-top: 20px; padding-bottom: 6px; overflow: hidden;}
  #addScore .score-form .el-form-item { margin-bottom: 14px;}
  #addScore .score-form .el-form-item__label{ color: #666666;}
  #addScore .score-form .el-input__inner { height: 34px;}
  #addScore .el-form-item.is-required .el-form-item__label:before { margin-right: 10px; vertical-align: text-bottom;}
  #addScore .year-term { display: inline-block; padding-left: 10px;}

  #addScore .el-radio-button{ margin-right: 12px;}
  #addScore .el-radio-button__inner{ width: 100px; height: 32px; padding: 0; text-align: center; line-height: 32px; border-radius: 0; border: 1px solid #e6e6e6; }
  #addScore .el-radio-button__orig-radio:checked+.el-radio-button__inner{ background: none; color: #0d9ee9; box-shadow: none; border-color: #0d9ee9;}


  #addScore .el-table__header-wrapper tr th:nth-of-type(1) { text-indent: -99999px;}
  #addScore .error input { border-color: #ff4949;}
  #addScore .el-table__header-wrapper .cell { text-align: center;}
  #addScore .el-table__body-wrapper .cell{ padding: 5px 10%; text-align: center;}
  #addScore table .el-input__inner { text-align: center;}
  /*#addScore .el-table table thead tr .is-leaf:nth-last-child(1) { border-right: 1px solid #a5defa;}*/
  #addScore .el-table table thead tr th:nth-last-child(1) { width: 1px!important; border-right: none;}
</style>
