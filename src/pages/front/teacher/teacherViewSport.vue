<template>
  <div class="teacherSportScore teacherViewScore"v-loading="loadingStatus">
    <div class="publicPadding">
      <div class="callBackBtn">
        <el-button @click="callBackPages" type="text" icon="arrow-left">返回</el-button>
      </div>
    </div>
      <div class="publicPadding examMsgWrap">
        <div class="examTitle">考试名称：{{examName}}</div>
        <div class="examGardeClass">
          <div class="examGarde">年级：{{gradeName}}</div>
          <div class="examClass">班级：{{className}}</div>
        </div>
      </div>
      <div class="areaSection">
        <div class="publicPadding subjectScore" v-if="noScore == false">
          <div class="titleWrapStyle">
            <i class="title-icon"></i>
            <span class="title-text">学生体育考试成绩单</span>
            <div class="countWrap">
              <div class="headcount">合计人数：{{count}}人</div>
            </div>
          </div>
          <div class="scoreTable scrollTable">
            <!--<div class="countWrap">-->
            <!--<div class="headcount">合计：{{count}}人</div>-->
            <!--</div>-->
            <table class="table">
              <thead :class="scrollState > 16 ? 'theadFixed' : ''">
              <tr v-for="tableTh in tableData.tableHeader">
                <th :title="thData.text" v-for="thData in tableTh" :rowspan="thData.rowNum == 0 ? '' : thData.rowNum" :colspan="thData.colNum == 0 ? '' : thData.colNum">{{thData.text}}</th>
              </tr>
              </thead>
              <tbody :class="scrollState > 16 ? 'tbodyScroll' : ''">
              <tr ref="tr" v-for="tableTrBody in tableData.tableBody" :class="scrollState > 16 ? 'trFixed' : ''">
                <td :title="tdValue" v-for="(tdValue, tdKey) in tableTrBody" v-show="tdKey != 'studentId' ">
                  {{tdValue}}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="noData" v-if="noScore == true">
          <p class="empty-text">暂无成绩信息</p>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'teacherSportScore',
    data() {
      return {
        teacherId:'',
        active:0,
        classId:"",
        examId:"",
        gradeName:"",
        className:"",
        examName:"",
        schoolYear:"",
        schoolId:"",
        term:"",
        count:"",
        tableData:"",
        value:"",
        indexNum:'',
        loadingStatus:true,
        classList:'',
        noScore:false,
        scrollState:0,//成绩人员列表数
      }
    },
    mounted(){
      this.getParamsInfo();
    },
    methods: {
      getParamsInfo(){
        let self = this;
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo.roleId == 1){
//          获取班主任权限信息
          this.classId = this.$route.query.classId || userInfo.classInfo.classId;
          this.gradeId = this.$route.query.gradeId || userInfo.classInfo.gradeId;
          this.examId = this.$route.query.examId;
          this.gradeName = userInfo.classInfo.gradeName;
          this.className = userInfo.classInfo.className;
          this.schoolId = userInfo.schools.schoolId;
          this.teacherId = userInfo.id;
          this.fetchDate();

        }else if(userInfo.roleId == 8 || userInfo.roleId == 16 ){
          //      普通教师及校长获取参数信息
          this.classId = this.$route.query.classId || userInfo.classInfo.classId;
          this.gradeId = this.$route.query.gradeId || userInfo.classInfo.gradeId;
          this.className = userInfo.classInfo.className;
          this.gradeName = userInfo.classInfo.gradeName;
          this.schoolId = userInfo.schools.schoolId;
          this.examId = this.$route.query.examId;
          this.teacherId = userInfo.id;
          this.fetchDate();
        }
      },
      callBackPages(){
//          返回上一页
        this.$router.push({ path: '/sportScoreList',  query: {'classId':this.classId,'gradeId':this.gradeId}});
//        this.$router.go(-1);
      },
      fetchDate(){
//        页面渲染请求
        let self = this;
        self.loadingStatus = true;
        this.$ajax('physical/getClassScore',
          {'examId':self.examId,'classId':self.classId,'schoolId':self.schoolId,'teacherId':self.teacherId}
        )
          .then(function (response) {
//             声明初始化变量
//            console.log(response);
            if (response.code == 200){
              self.loadingStatus = false;
              self.schoolYear = response.data.schoolYear;
              self.examName = response.data.examName;
              self.term = response.data.term;
              self.tableData = response.data.tableData;
              if(!!response.data.tableData.tableHeader && !!response.data.tableData.tableBody){
                if (self.tableData.tableBody.length<1 || self.tableData.tableHeader.first.length<1 || self.tableData.tableHeader.second.length<1 ){
                  self.noScore = true;
                }else{
                  self.noScore = false;
                  self.count = response.data.count;
                  self.scrollState = response.data.tableData.tableBody.length;
                }
              }else {
                self.noScore = true;
              }
//              self.value = response.data.tableList[0].examId;
//              console.log(self.noScore)
            }else {
              self.loadingStatus = false;
              self.$alert(response.message, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {}
            });
            }
//  self.tableData = response.data
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
//      "$route": "fetchDate",
      "$route": "getParamsInfo"
    }
  }
</script>
<style >
  @import "../../../resources/front/css/common/teacherScore.css";
</style>
