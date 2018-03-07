<template>
  <div id="addSportScore">
    <div class="btns">
      <a href="javascript:;" @click="goBack" class="icon-back">返回 </a>
      <el-button style="float: right;" class="white-color  el-button el-button--primary" type="primary" @click="submitForm(formData)"><span>保存</span></el-button>
    </div>

    <div class="score-content">
      <div class="score-title"><i class="icon-essential-information" style="background-color: #49a9ff; color: #fff;"></i><span>考试基本信息</span></div>
      <div class="score-form">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="120px">
          <el-form-item label="考试名称：" prop="name">
            <el-input v-model.trim="formData.name" placeholder="考试名称不可重复"></el-input>
          </el-form-item>
          <el-form-item label="学年：" prop="schoolYear">
            <span class="year-term">{{ schoolYear }}</span>
          </el-form-item>
          <el-form-item label="学期：" prop="term">
            <span class="year-term">{{ termText }}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'addSportScore',
    data () {
      return {
        schoolId: JSON.parse(localStorage.userInfo).schools.schoolId,
        testName: this.$route.query.examName,
        schoolYear: this.$route.query.schoolYear,
        term: this.$route.query.term,
        termText: this.$route.query.term == '1' ? '下学期' : '上学期',
        examId: this.$route.query.examId,
        webType: this.$route.path.indexOf('addSportScore') >= 0 ? 'add' : 'edit',  //edit => 编辑  add => 新增
        isEdited: false, //是否有输入改动
        initFormData: '',  //默认的数据 用以比对是否改变
        formData: {
        },
        rules: {
          name: [
            { required: true, message: '请输入考试名称', trigger: 'blur' },
            { max: 30, message: '名称不能超过30个字', trigger: 'blur' },
//            { pattern: /^[\u4E00-\u9FA5]+$/, message: '试卷名只能输入中文', trigger: 'blur'}
          ]
        },
        routeLeaveAction: true,
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
      //提交表单 isOk=undefined  => 正常保存跳转到列表页
      submitForm(formData, isOk, next) {
        const url = this.webType === 'add' ? '/physical/examination/add' : '/physical/examination/edit';
        const params = Object.assign({}, { schoolId: this.schoolId, id: this.examId }, formData);
        this.$refs['formData'].validate((valid) => {
          if (valid && this.isEdited) {
            this.$ajax(url, params).then( (res) => {
              if ( res.code == '200' ) {
                this.$alert(res.message, '提示', {
                  confirmButtonText: '确定',
                  callback: () => {
                    if ( !isOk ) {
                      this.routeLeaveAction = false;  //正常跳转路由，不出保存提示
                      this.$router.push({ path: '/sportManagement' })
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
        this.$router.push({ path: '/sportManagement' });
      },
    },
    beforeMount(){
      this.formData = {
        name: this.testName,
        schoolYear: this.schoolYear,
        term: this.term
      };
      this.initFormData = JSON.stringify(this.formData);
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
  #addSportScore { background: #f5f5f5;}
  #addSportScore .btns { margin-bottom: 12px; height: 34px; padding: 8px 20px; background: #fff;}
  #addSportScore .btns a { font-size: 14px; color: #666; cursor: pointer; line-height: 34px;}
  #addSportScore .score-title { padding: 14px 0; height: 22px; line-height: 22px; border-bottom: 1px solid #eeeeee;}
  #addSportScore .score-title i { display: inline-block; width: 22px; height: 22px; border-radius: 50%; margin-right: 10px; font-size: 12px; line-height: 22px; text-align: center; vertical-align: middle;}
  #addSportScore .score-title span { font-size: 16px; color: #333333; vertical-align: middle;}
  #addSportScore .score-content { margin-bottom: 12px; padding: 0 20px; background: #fff;}
  #addSportScore .score-form { padding-top: 20px; padding-bottom: 6px; overflow: hidden;}
  #addSportScore .score-form .el-form-item { margin-bottom: 14px;}
  #addSportScore .score-form .el-form-item__label{ color: #666666;}
  #addSportScore .score-form .el-input__inner { height: 34px;}
  #addSportScore .el-form-item.is-required .el-form-item__label:before { margin-right: 10px; vertical-align: text-bottom;}
  #addSportScore .year-term { display: inline-block; padding-left: 10px;}
</style>
