<template>
  <div class="querySubjectScore publicScore"v-loading="loadingStatus">
    <div class="publicPadding">
      <div class="callBackBtn">
        <el-button @click="callBackPages" type="text" icon="arrow-left">返回</el-button>
      </div>
    </div>

    <!--<div class="examMsg">考试名称：<p>{{examName}}</p></div>-->
    <!--<div class="gradeWrapMsg">-->
    <!--<div>年级：<p>{{gradeName}}</p></div>-->
    <!--<div class="classMsg">班级：<p>{{className}}</p></div>-->
    <!--</div>-->
    <div class="studentMgt-filter publicPadding" >
      <div class="clearfix">
        <div class="classTitle">年级：</div>
        <div class="grades">
          <el-radio-group v-model="gradeId" @change="getCurrentGradeId(gradeId)">
            <el-radio-button v-for="(item,index) in grades" :label="item.index" :key="index"> {{item.name}} </el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <div class="clearfix">
        <div class="classTitle">班级：</div>
        <div class="classes" v-if="classes.length != 0">
          <el-radio-group v-model="classId">
            <el-radio-button v-for="(item,index) in classes" :label="item.index" :key="index"> {{item.name}} </el-radio-button>
          </el-radio-group>
        </div>
        <div class="classes" v-if="classes.length == 0">
          <div class="el-radio-button">
            <div class="el-radio-button__inner">该年级下暂无班级</div>
          </div>
        </div>
      </div>
    </div>
    <div class="areaSection" v-if="GSTableBody.length>0">
      <div class="publicPadding subjectScore">
        <div class="titleWrapStyle">
          <i class="title-icon"></i>
          <span class="title-text">年级科目总分</span>
          <div class="scoreEditWrap">
            <div class="editBtn" :class="{hideStatus: !allScoreEditStatus}">
              <button @click="toEditScore" class="scoreEditBtn"> 编辑</button>
            </div>
            <div class="hideBtn" :class="{hideStatus: !!allScoreEditStatus}">
              <button @click="cancelEditScore" class="cancelBtn">取消</button>
              <button @click="saveEditScore" class="scoreEditBtn">保存</button>
            </div>
          </div>
        </div>
        <div class="scoreTable">
          <table class="gradeTable">
            <tr>
              <th v-for="thValue in GSTableBody">{{thValue.subName}}</th>
            </tr>
            <tr>
              <td v-for="tdValue in GSTableBody">
                <!--<div>{{tdValue}}</div>-->
                <el-input  v-model="tdValue.score" @change="regTest(tdValue.score)" :disabled="allScoreEditStatus"  :class="{'error': !/^\d{0,3}$/.test(tdValue.score)}"></el-input>

              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="areaSection">
      <div class="publicPadding"  v-if="!noData">
        <div class="titleWrapStyle">
          <i class="title-icon"></i>
          <span class="title-text">学生考试成绩单</span>
          <div class="countWrap">
            <div class="headcount">合计人数：{{count}}人</div>
          </div>
          <div class="scoreEditWrap">
            <div class="editBtn" :class="{hideStatus: !hideBtnState}">
              <button @click="editPages" class="scoreEditBtn"> 编辑</button>
            </div>
            <div class="hideBtn" :class="{hideStatus: hideBtnState}">
              <button @click="cancelPages" class="cancelBtn">取消</button>
              <button @click="savePages" class="scoreEditBtn">保存</button>
            </div>
          </div>
        </div>
        <div class="scoreTable scrollTable">
          <table class="table form-table">
            <thead :class="scrollState > 16 ? 'theadFixed' : ''">
            <tr v-for="tableTh in tableDataHeader">
              <th v-for="thData in tableTh" :rowspan="thData.rowNum == 0 ? '' : thData.rowNum" :colspan="thData.colNum == 0 ? '' : thData.colNum">{{thData.text}}</th>
            </tr>
            </thead>
            <tbody :class="scrollState > 16 ? 'tbodyScroll' : ''">
            <tr ref="tr" v-for="tableTrBody in tableDataBody" :class="scrollState > 16 ? 'trFixed' : ''">
              <td v-for="(tdValue, tdKey) in tableTrBody" v-if="tdKey != 'studentId' ">
                <input v-if="tdKey=='studentName'" :title="tableTrBody[tdKey]" v-model="tableTrBody[tdKey]" disabled>
                <input type="text" :title="tableTrBody[tdKey]" v-else-if="tdKey=='sid'" v-model="tableTrBody[tdKey]" disabled>
                <input type="text" v-else ref="input" maxlength="5" :title="tableTrBody[tdKey]" @input="updateErrorStatus(tableTrBody[tdKey])"  :class="{'error': !/(^(0|\d{1,2}|\d{1,3})(\.\d)?$)|(^[\u4e00-\u9fa5]{2,3}$)|(^[A-z]{1}$)|(^\s+$)|(^$)/.test(tableTrBody[tdKey])}" :disabled="hideBtnState" :value="tdValue" v-model="tableTrBody[tdKey]">
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="noData" v-else>
        <p class="empty-text">暂无成绩信息</p>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'querySubjectScore',
    data() {
      return {
        examName:"",
        examId:"",
        gradeName:"",
        className:"",
        schoolYear:"",
        classId:"",
        term:"",
        count:"",
        tableDataHeader:[],
        tableDataBody:[],
        oldScoreData: [],
        hideBtnState:true,//成绩
        editStatus: false,//科目总分
        queryChangeCount:'',//被编辑的输入框验证情况集合字符串
        scoreEditStatus:true,//输入框验证 true=>验证通过 false=>验证失败
        errorMsg:0,
        loadingStatus:false,
        scrollState : '', // 是否滚动表格
        classes:'',
        gradeId:'',
        grades:'',
        schoolId:'',
        scoreId:{
          examId:'',
          classId:'',
        },
        noData:true,
        GSTableBody:[],//年级总分表体
        OldGSTableBody:[],//年级总分表体
        GSTableHeader:[],//年级总分表头
        allScoreEditStatus:true,//科目总分编辑状态
        regIsTrue: true,  //输入框验证 true=>验证通过 false=>验证失败
        regIsTrueStr: '', //被编辑的输入框验证情况集合字符串
      }
    },
    mounted(){

      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.schoolId = this.userInfo.schools.schoolId;
//        页面渲染请求
      let self = this;
      //获取query传递的参数
      let scoreIds = this.$route.query;
      self.examId = scoreIds.examId;
      self.scoreId.examId = self.examId;

//    获取年级信息
      this.getEditGrade();
    },
    watch:{
      classId:function (classId) {
        if (classId == ''){
          return;
        }else {
          this.getCurrentClassId(classId)
        }
      }
    },
    beforeRouteLeave  (to, from, next) {
      if(this.hideBtnState == false){

        this.$confirm('您当前做了编辑操作，是否需要保存？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
//              type: 'warning'
        }).then(() => {
          //确定
          this.submitScoreTable();
        next()

      }).catch(() => {
          //取消
          next()
        });


      }else if (this.allScoreEditStatus == false){
        this.$confirm('您当前做了编辑操作，是否需要保存？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
//              type: 'warning'
        }).then(() => {
          //确定
          this.saveEditScore();
        next()

      }).catch(() => {
          //取消
          next()
        });
      }else if(this.allScoreEditStatus == false && this.hideBtnState == false){
        this.$confirm('您当前做了编辑操作，是否需要保存？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
//              type: 'warning'
        }).then(() => {
          //确定
          this.saveEditScore();
          this.submitScoreTable();
        next()

      }).catch(() => {
          //取消
          next()
        });
      }else{
        next()
      }
    },
    methods: {
      callBackPages(){
//          返回上一页
        this.$router.go(-1);
      },
//          编辑表格
      editPages(){
        this.$confirm('您将编辑当前的表格, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
//          type: 'warning'
        }).then(() => {
          this.hideBtnState = false;
      }).catch(() => {
//          this.useAlert('error','已取消操作',function () {});
        });
      },
      //取消编辑
      cancelPages(){
        let oldData = this.oldScoreData;
        for ( var i = 0; i < oldData.length; i++){
          this.$set(this.tableDataBody,i,oldData[i])
        }
        this.hideBtnState = true;
        this.oldScoreData = _.cloneDeep(this.tableDataBody);
        this.queryChangeCount = '';
      },
      //      提交保存的成绩数据
      submitScoreTable(){
        let self = this;
        if (this.queryChangeCount.length>0){
          let userData = self.tableDataBody;
          userData.forEach(function (item,i) {
            item.studentId = item.studentId.toString()+"";
          });
          userData = JSON.stringify(userData);
          self.loadingStatus = true;
          this.$ajax('schadmin/updateScoreByClassIdAndExamId',
            {
              "examId":self.examId,
              "classId":self.classId,
              "schoolYear":self.schoolYear,
              "term":self.term,
              "data":userData
            }
          )
            .then(function (response) {
              self.loadingStatus = false;
              if(response.code == 200){
                self.useAlert('success',response.message,function () {});
                self.oldScoreData = _.cloneDeep(self.tableDataBody);
                self.queryChangeCount = '';
              }else {
                self.useAlert('error',response.message,function () {});
              }
            })
            .catch(function (error) {
              self.useAlert('error','网络连接失败',function () {});
            });
//        userData = JSON.parse(userData);
//        this.oldData.tableBody = userData;
          self.hideBtnState = true;
        }else {
          this.hideBtnState = true;
        };
      },
//          保存提交数据
      savePages(){
        const self = this;
        if (!!this.scoreEditStatus){
          if (this.queryChangeCount.length>0){
            this.$confirm('您将保存当前已编辑过的成绩表格, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              self.submitScoreTable();
          }).catch(() => {
              self.useAlert('error','已取消操作',function () {});
          });
          }else {
            this.hideBtnState = true;
          }

        }else {
          this.$alert('您输入修改的成绩格式有误,请您修改后重新提交', '提示', {
              confirmButtonText: '确定',
              callback: () => {}
         });

        }
      },
//      监测输入错误状态
      updateErrorStatus(value){
        this.queryChangeCount += /(^(0|\d{1,2}|\d{1,3})(\.\d)?$)|(^[\u4e00-\u9fa5]{2,3}$)|(^[A-z]{1}$)|(^\s+$)|(^$)/.test(value) ? '1' : '0';
        this.scoreEditStatus = this.queryChangeCount.substring(this.queryChangeCount.length-1) == 0 ? false : true;
      },
      // 获取当前年级信息
      getCurrentGradeId(gradeId){
        this.gradeId=gradeId;
        this.getClass(gradeId);
        this.getGradeAllScore(gradeId);
      },
      // 获取当前班级信息
      getCurrentClassId(classId){
//        this.classId = classId;
        this.scoreId.classId = classId;
        this.getScoreTable(this.scoreId);
      },
      // 获取年级列表
      getEditGrade(){

        let params={
          schoolId:this.schoolId
        };
        this.$ajax('/headteacher/findGradeByCurrentUser',params)
          .then(res => {
          if (res.code == 200) {
          if(res.data.length ==0){
            return false
          }else{
            this.grades=res.data;
            this.gradeId = this.grades[0].index;
          }

        }else{
          this.useAlert('error',res.message,function () {});
        }

      }).catch((res) => {
          this.useAlert('error',res.message,function () {});
      });
      },
      // 班级列表
      getClass(gradeId){
        let params={
          schoolId:this.schoolId,
          gradeId: gradeId
        };
        this.loadingStatus=true;
        this.$ajax('/findClassByGradeIdAndSchoolId',params)
          .then(res => {
          if(res.code ==200){
          this.classes=res.data;
          if(this.classes.length == 0){
            this.classes =[];
            this.loadingStatus=false;
            this.className='';
            this.noData=true;
            this.classId = "";
          }else{
            this.classId = this.classes[0].index;
            this.noData=false;
          }
        }else{
          this.useAlert('error',res.message,function () {});
        }

      }).catch((res) => {

          this.useAlert('error',res.message,function () {});
      });

      },
      // 获取年级总分
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
          this.loadingStatus=false;
        if(res.code ==200){
          this.GSTableBody = res.data.tableBody;
          this.OldGSTableBody=_.cloneDeep(this.GSTableBody);
        }else{
          this.useAlert('error',res.message,function () {});
        }

      }).catch((res) => {

          this.useAlert('error',res.message,function () {});
      });

      },
      //获取成绩表格数据
      getScoreTable(scoreId){
        let self = this;
        self.loadingStatus = true;
        this.$ajax('teacher/findClassStudentScoreTableByCondition',
          scoreId
        ).then(function (response) {
          self.loadingStatus = false;
//             声明初始化变量
          if(response.code == 200){
           if(!!response.data.tableData.tableBody && !!response.data.tableData.tableHeader){
             if(response.data.tableData.tableBody.length<1 || response.data.tableData.tableHeader.length<1){
               self.noData = true;
             }else {
               self.noData = false;
               self.tableDataHeader = response.data.tableData.tableHeader;
               self.tableDataBody = response.data.tableData.tableBody;
               self.scrollState = response.data.tableData.tableBody.length;
               self.oldScoreData = _.cloneDeep(self.tableDataBody);
             }
           }else {
             self.noData = true;
           }
            self.examName = response.data.examName;
            self.gradeName = response.data.gradeName;
            self.className = response.data.className;
            self.schoolYear = response.data.schoolYear;
            self.term = response.data.term;
            self.count = response.data.count;
//             self.useAlert('success',response.message,function () {});
          }else {
            self.useAlert('error',response.message,function () {});
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      //编辑科目总分事件
      toEditScore(){
        this.$confirm('您将编辑当前的科目总分, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.allScoreEditStatus = false;
      }).catch(() => {
//          this.useAlert('error','已取消操作',function () {});
        });
      },
      //取消编辑科目总分
      cancelEditScore(){
        this.allScoreEditStatus = true;
        let tableData = this.OldGSTableBody;
        for ( var i = 0; i < tableData.length; i++){
          this.$set(this.GSTableBody,i,tableData[i])
        };
        this.OldGSTableBody = _.cloneDeep(this.GSTableBody);
        this.regIsTrueStr = '';
      },
//      保存编辑的科目总分
      saveEditScore(){
        if(this.regIsTrueStr.length>0){
          if(!!this.regIsTrue){
            this.allScoreEditStatus = true;
//            let scoreIds = [];
//            scoreIds.push(this.GSTableBody));
            let params ={
              examId:this.examId,
              schoolId:this.schoolId,
              tableBody:JSON.stringify(this.GSTableBody),
            };
            this.loadingStatus=true;
            this.$ajax('/teacher/saveSubjectScoreByGrade',params)
              .then(res => {
              this.loadingStatus=false;
            if(res.code ==200){
              this.useAlert('success',res.message,function () {});
              this.OldGSTableBody = _.cloneDeep(this.GSTableBody);
              this.regIsTrueStr = '';
            }else{
              this.useAlert('error',res.message,function () {});
            }

          }).catch((res) => {
              this.useAlert('error',res.message,function () {});
          });
//            console.log(this.GSTableBody);
          }else {
            this.$alert('您输入修改的成绩格式有误,请您修改后重新提交', '提示', {
                confirmButtonText: '确定',
                callback: () => {}
          });
          }
        }else {
          this.allScoreEditStatus = true;
        }
      },
      regTest(value){
        this.regIsTrueStr += /^\d{0,3}$/.test(value) ? '1' : '0';
        this.regIsTrue = this.regIsTrueStr.substring(this.regIsTrueStr.length-1) == 0 ? false : true;
      }
    }
  }
</script>
<style>
  @import "../../../resources/front/css/common/scoreAndSport.css";
</style>
