<template>
  <div class="teacherSubjectScore teacherViewScore"v-loading="loadingStatus">
    <div class="publicPadding">
      <div class="callBackBtn">
        <el-button @click="callBackPages" type="text" icon="arrow-left">返回</el-button>
      </div>
    </div>
    <!--<div v-if="!noClass">-->
      <div class="publicPadding examMsgWrap">
        <div class="examTitle">考试名称：{{examName}}</div>
        <div class="examGardeClass">
          <div class="examGarde">年级：{{gradeName}}</div>
          <div class="examClass">班级：{{className}}</div>
        </div>
      </div>
      <div class="areaSection" v-if="GSTableBody.length>0">
        <div class="publicPadding subjectScore">
          <div class="titleWrapStyle">
            <i class="title-icon"></i>
            <span class="title-text">年级科目总分</span>
          </div>
          <div class="scoreTable">
            <table class="gradeTable">
              <tr>
                <th v-for="thValue in GSTableBody">{{thValue.subName}}</th>
              </tr>
              <tr>
                <td v-for="tdValue in GSTableBody">
                  <!--<div>{{tdValue}}</div>-->
                  <el-input  v-model="tdValue.score" :disabled="true" ></el-input>

                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="areaSection">
        <div class="publicPadding subjectScore" v-if="!noScore">
          <div class="titleWrapStyle">
            <i class="title-icon"></i>
            <span class="title-text">学生考试成绩单</span>
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
        <div class="noData" v-if="noScore">
          <p class="empty-text">暂无成绩信息</p>
        </div>
      </div>
    <!--</div>-->
    <!--<div class="noData" v-else>-->
      <!--<p class="empty-text">暂无成绩信息</p>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'teacherSubjectScore',
    data() {
      return {
        teacherId:'',
        roleId:'',
        active:0,
        classId:"",
        gradeId:"",
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
        noClass:false,
        noScore:false,
        GSTableBody:{},//年级总分表体
        GSTableHeader:[],//年级总分表头
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
//      this.$ajax('teacher/findGradeClassByTeacherId',
//        {'teacherId':userInfo.id}
//      )
//        .then(function (response) {
////             声明初始化变量
////            console.log(response);
//          if (response.code == 200){
//            self.loadingStatus = false;
//            self.classList = response.data;
//            if (response.data.length > 0){
//              self.classId = response.data[0].classId;
//              self.fetchDate();
//              self.noClass = true;
//
//            }else {
//              self.noClass = false;
//            }
////            console.log(self.noClass);
//          }else {
//            self.loadingStatus = false;
//            self.useAlert('error',response.message,function () {});
//          }
//        })
//        .catch(function (error) {
//          console.log(error);
//        });
        this.roleId = userInfo.roleId;
        if (userInfo.roleId == 1){
//          获取班主任权限信息
          this.classId = this.$route.query.classId || userInfo.classInfo.classId;
          this.gradeId = this.$route.query.gradeId || userInfo.classInfo.gradeId;
          this.examId = this.$route.query.examId;
          this.className = userInfo.classInfo.className;
          this.gradeName = userInfo.classInfo.gradeName;
          this.schoolId = userInfo.schools.schoolId;
          this.teacherId = userInfo.id;
          this.fetchDate();
          this.getGradeAllScore(this.gradeId);

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
          this.teacherGetGradeAllScore(this.gradeId);
        }
      },
      callBackPages(){
//          返回上一页
//        this.$router.go(-1);
        this.$router.push({ path: '/subjectScoreList',  query: {'classId':this.classId,'gradeId':this.gradeId}});
      },
      fetchDate(){
//        页面渲染请求
          if (this.roleId == 1){
              this.headerTeacherScore()
          }else{
              this.teacherScore();
          };

      },
//      班主任获取考试成绩
      headerTeacherScore(){
        let self = this;
        self.loadingStatus = true;
        this.$ajax('/teacher/findClassStudentScoreTableByCondition',
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
                  self.scrollState = response.data.tableData.tableBody.length;
                  self.count = response.data.count;
                }
              }else {
                self.noScore = true;
              }
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
//      普通教师获取考试成绩
      teacherScore(){
        let self = this;
        self.loadingStatus = true;
        this.$ajax('/teacher/findSubjectStudentScoreTableByCondition',
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
                }
              }else {
                self.noScore = true;
              }
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
      // 班主任获取年级总分
      getGradeAllScore(gradeId){
        let params={
          schoolId:this.schoolId,
          gradeIndex: gradeId,
          examId: this.examId
        };
//        let params={
//          schoolId: 110101119,
//          gradeIndex: "739847054670434304",
//          examId: 250
//        };
        this.loadingStatus=true;
        this.$ajax('teacher/getSubjectScoreByGradeAndClass',params)
          .then(res => {
          if(res.code ==200){
          this.GSTableBody = res.data.tableBody;
          this.loadingStatus=false;
        }else{
          this.loadingStatus=false;
          this.useAlert('error',res.message,function () {});
        }

      }).catch((res) => {

          this.useAlert('error',res.message,function () {});
      });

      },
      // 普通教师获取年级总分
      teacherGetGradeAllScore(gradeId){
        let params={
          schoolId:this.schoolId,
          gradeIndex: gradeId,
          examId: this.examId,
          classId:this.classId,
          teacherId:this.teacherId
        };
        this.loadingStatus=true;
        this.$ajax('teacher/getSubjectScoreByteacher',params)
          .then(res => {
          if(res.code ==200){
          this.GSTableBody = res.data.tableBody;
          this.loadingStatus=false;
        }else{
          this.loadingStatus=false;
          this.useAlert('error',res.message,function () {});
        }

      }).catch((res) => {

          this.useAlert('error',res.message,function () {});
      });

      },

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": "fetchDate",
      "$route": "getParamsInfo"
    }
  }
</script>
<style >
  @import "../../../resources/front/css/common/teacherScore.css";
</style>
