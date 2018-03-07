<template>
 <div class="scoreManagement scoreManagementSport">
     <div class="scoreManagement-header" id="scoreManagementHeader">
      <div class="scoreManagement-header-innner">
        <div class=" btns" v-if="isAuthority">
          <router-link to="/scoreManagement/addScore" class="el-button el-button--success"> <span>新增考试</span></router-link>
        </div>
        <div class="yearTime ">
          <span class="school-year-text"> {{schoolYear}}学年  {{term==0? '上学期' : "下学期"}} </span>
        </div>

        <div class="labelWrap">
          <span class="label-title">试卷名称:</span>
          <div class="label-content">
            <el-input v-model="searchExamName" icon="search" placeholder="请输入试卷名称"></el-input>
          </div>
        </div>
        <div class="examTypes labelWrap">
          <span class="label-title">考试类型:</span>
          <div class="label-content">
            <el-radio-group v-model="selectExamType">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button v-for="(item,index) in examType" :label="item.label" :key="index"> {{item.name}} </el-radio-button>
            </el-radio-group>
            <!-- {{ selectExamType }} -->
          </div>

        </div>
      </div>

   </div>
   <div class="noData" v-if="noData" >
     <p class="empty-text">暂无科目成绩</p>
   </div>

   <div class="examTypeLists" id="examTypeLists" v-show="!noData">
     <div class="examTypeList" v-for="item in examListsSeach" :key="item.id">
       <div class="examTypeList-title-con clearfix">
         <div class="examTypeList-title">
           {{item.name}}
         </div>
         <div class="examTypeList-tool btns" v-if="isAuthority">
           <!-- <el-button type="primary">编辑</el-button> -->
           <router-link :to="{ path: '/scoreManagement/editScore', query: { examId: item.id }}" class="el-button el-button--primary move"> <span>编辑</span></router-link>
           <el-button type="danger" class="del-btn" @click="deleteExamList(item.id)">删除</el-button>
         </div>
       </div>
       <div class="examTypeList-desc-con clearfix">
         <ul class="examTypeList-desc-list clearfix">
           <li class="desc-list">创建时间：{{item.createTimeStr}}</li>
           <!-- <li class="desc-list"> {{item.typeStr}} </li> -->
           <li class="desc-list"> {{item.typeStr}} </li>
           <li class="desc-list"> 已导入学生：{{item.studentCount}}人</li>
         </ul>
         <ul class="examTypeList-operation clearfix">
           <li v-if="roleId ==2"><router-link :to="{ path: '/scoreManagement/subjectbatch', query: { examId: item.id,schoolYear:schoolYear,term:term}}">导入成绩</router-link></li>
           <li @click="checkExam(item)">查看成绩</li>
           <!-- <li><a :href="isDownloadExam" @click="downloadExam(item,$event)">下载成绩</a></li> -->
           <li @click="downloadExam(item,$event)">下载成绩</li>
         </ul>

       </div>
     </div>
   </div>
  </div>
</template>

<script>
  export default {
    name: 'scoreManagement',
    data() {
      return {
        noData:false,
        userInfo:JSON.parse(localStorage.getItem('userInfo')),
        schoolId:'',
        // 学期时间
        schoolYear:'',
        // 学期
        term:'',
        // 搜索试卷名
        searchExamName:'',
        // 选择试卷类型
        selectExamType:'',
        // 试卷类型
        examType:[],
        // 试卷集合
        examsData:[],
        // 班级
        classId:'',
        // 角色
        roleId:'',
        // 权限
        isAuthority:false,
        // 是否可以下载试卷
        isDownloadExam:'',
      }
    },
    watch:{
      $route () {
        this.getParams();
      }
    },
    computed:{
      examListsSeach:function(){
        // item.name.indexOf(this.searchExamName) != '-1' || item.type.toString().indexOf(this.selectExamType) != '-1'
        return this.examsData.filter(item => !this.selectExamType && this.searchExamName  ? item.name.indexOf(this.searchExamName) != '-1' : item.type.toString().indexOf(this.selectExamType) != '-1');
      },
    },
    mounted() {
      if(!this.userInfo.roleId) return;
      this.roleId=this.userInfo.roleId;
      if(this.roleId == 2){this.isAuthority=true}
      this.schoolId=this.userInfo.schools.schoolId;
      this.getParams();

      var winHeight = document.documentElement.clientHeight || document.body.clientHeight;

      var examTypeLists = document.getElementById('examTypeLists');
      var scoreManagementHeader = document.getElementById('scoreManagementHeader');

      examTypeLists.style.minHeight = winHeight - scoreManagementHeader.offsetTop - 90 +'px'
    },
    methods: {
      // 判断路由参数
      getParams(){
        // 判断是否是空对象
        function isEmptyObject(obj) {
          for (var key in obj) {
            return false;
          }
          return true;
        };
        // 是否获取到对应参数
        if(isEmptyObject(this.$route.query)){
          this.classId='';
        }else{
          if(!this.$route.query.classId) return;
          this.classId = this.$route.query.classId;
        }


        this.getExamLists();
      },
      // 获取体育试卷成绩列表
      getExamLists(){
        let params={
          schoolId:this.schoolId,
          classId:this.classId,
          roleId:this.roleId,
          teacherId:this.userInfo.schools.teacherId
        }
        this.$ajax('teacher/examinationList',params)
          .then( res => {

            if (res.code == 200){

              this.schoolYear = res.data.SchoolYear;
              this.term = res.data.schoolTerm;

              this.examsData = res.data.examinationList;
              if(this.examsData.length ==0){
                this.noData=true;
              }else{
                this.noData=false;
              }
              this.examType = res.data.examType;

              // console.log(this.examType)
            }else {
              this.useAlert('error',res.message);
            }
          }).catch( res => {
            this.useAlert('error',res.message);
          });
      },
      // 筛选试卷
      filterExams(){

      },
      // 删除当前试卷
      deleteExamList(id){
        this.$confirm('是否确定删除当前考试及其下班级成绩?', '提示', {

          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {

          let params = {
            schoolId: this.schoolId,
            examId: id
          };

          this.$ajax('schadmin/deleteExamination',params).then(res => {
            if(res.code == 200){

              this.useAlert('success','删除成功',function () {

              });
              this.getExamLists()
            }else{
              this.useAlert('error',"删除失败",function () {});
            }

          }).catch(res => {
            this.useAlert('error',res.message,function () {});
          });

        }).catch(res => {

        });
      },
      // 查看成绩
      checkExam(item){
        if(this.userInfo.roleId == 2){

        this.$router.push({ path: '/scoreManagement/querySubjectScore',  query: { examId: item.id,schoolYear:this.schoolYear,term:this.term}});
        }else{
        let queryObj = this.$route.query;
        this.$router.push({ path: '/subjectScoreList/teacherViewScore',  query: { examId: item.id,schoolYear:this.schoolYear,term:this.term,classId:queryObj.classId,gradeId:queryObj.gradeId}});

        }
      },
      // 下载成绩提示

      downloadExam(item,event){

        if(!item.studentCount){
          // this.isDownloadExam= 'javascript:;'
          this.$alert('当前考试，暂无考试成绩', '提示', {
            confirmButtonText: '确定',
          });
        }else{
          if(this.userInfo.roleId == 8 ){
            location.href = this.staticResources+'teacher/schoolExaminationScoreDownload?schoolId='+this.schoolId+'&examId='+item.id+'&schoolYear='+this.schoolYear+'&term='+this.term+'&classId='+this.classId+'&teacherId='+this.userInfo.schools.teacherId+'&roleId='+this.userInfo.roleId;
          }else{
            location.href = this.staticResources+'teacher/schoolExaminationScoreDownload?schoolId='+this.schoolId+'&examId='+item.id+'&schoolYear='+this.schoolYear+'&term='+this.term+'&classId='+this.classId;
          }



        }
      }
    },

  }

</script>
<style >
@import "../../../resources/front/css/common/adm-stu-tea-mgt.css";
</style>

