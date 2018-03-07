<template>
 <div class="scoreManagement scoreManagementSport">
     <div class="scoreManagement-header" id="scoreManagementHeader">
      <div class="scoreManagement-header-innner" >
        <div class=" btns" v-if="isAuthority">
          <router-link :to="{ path: '/sportManagement/addSportScore', query: { examId: '',examName:'',schoolYear:schoolYear,term:term }}" class="el-button el-button--success"> <span>新增考试</span></router-link>
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
      </div>

   </div>
   <div class="noData" v-if="noData">
     <p class="empty-text">暂无体育成绩</p>
   </div>

   <div class="examTypeLists" id="examTypeLists" v-show="!noData">
     <div class="examTypeList" v-for="item in examListsSeach" :key="item.id">
       <div class="examTypeList-title-con clearfix">
         <div class="examTypeList-title">
           {{item.name}}
         </div>
         <div class="examTypeList-tool btns" v-if="isAuthority">
           <!-- <el-button type="primary">编辑</el-button> -->
           <router-link :to="{ path: '/sportManagement/editSportScore', query: { examId: item.id,examName:item.name,schoolYear:schoolYear,term:term,}}" class="el-button el-button--primary"> <span>编辑</span></router-link>
           <el-button type="danger" class="del-btn" @click="deleteExamList(item.id)">删除</el-button>
         </div>
       </div>
       <div class="examTypeList-desc-con clearfix">
         <ul class="examTypeList-desc-list clearfix">
           <li class="desc-list">创建时间：{{item.createTime}}</li>
           <li class="desc-list"> 已导入学生：{{item.amount}}人</li>
         </ul>
         <ul class="examTypeList-operation clearfix">
           <li v-if="roleId ==2"><router-link :to="{ path: '/sportManagement/tySubjectbatch', query: { examId: item.id,schoolYear:schoolYear,term:term,}}">导入成绩</router-link></li>
           <!-- <li><router-link :to="{ path: '/sportManagement/editSportScore', query: { examId: item.id,schoolYear:schoolYear,term:term }}">查看成绩</router-link></li> -->
           <li @click="checkExam(item)">查看成绩</li>
           <li @click="downloadExam(item,$event)">下载成绩</li>
           <!-- <li><a :href="isDownloadExam" @click="downloadExam(item,$event)">下载成绩</a></li> -->
         </ul>

       </div>
     </div>
   </div>
  </div>
</template>

<script>
  export default {
    name: 'sportManagement',
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
        selectExamType:'全部',
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
        return this.examsData.filter(item => item.name.indexOf(this.searchExamName) != '-1' )
      }
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
        }
        this.$ajax('physical/list',params)
          .then( res => {

            if (res.code == 200){

              this.schoolYear = res.data.schoolYear;
              this.term = res.data.term;
              this.examsData = res.data.list;
              if(this.examsData.length ==0){
                this.noData=true;
              }else{
                this.noData=false;
              }
            }else {
              this.useAlert('error',res.message);
            }
          }).catch( res => {
            this.useAlert('error',res.message);
          });
      },
      // 搜索试卷

      // 删除当前试卷
      deleteExamList(id){
        this.$confirm('是否确定删除当前考试及其下班级成绩?', '提示', {

          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {

          let params = {
            id: id
          };

          this.$ajax('physical/examination/delete',params).then(res => {
            if(res.code == 200){

              this.useAlert('success','删除成功',function () {

              });
              this.getExamLists()
            }else{
              this.useAlert('error',res.message,function () {});
            }

          }).catch(res => {
            this.useAlert('error',res.message,function () {});
          });

        }).catch(res => {

        });
      },
      // 查看成绩
      checkExam(item){
        //
        if(this.userInfo.roleId == 2){

          this.$router.push({ path: '/sportManagement/querySportScore',  query: { examId: item.id,schoolYear:this.schoolYear,term:this.term}});

        }else{
        let queryObj = this.$route.query;
        this.$router.push({ path: '/sportScoreList/teacherViewSport',  query: { examId: item.id,schoolYear:this.schoolYear,term:this.term,classId:queryObj.classId,gradeId:queryObj.gradeId}});

        }
      },
      // 下载成绩提示

      downloadExam(item,event){

        if(!item.amount){
          // this.isDownloadExam= 'javascript:;'
          this.$alert('当前考试，暂无考试成绩', '提示', {
            confirmButtonText: '确定',
          });
        }else{
          if( this.userInfo.roleId ==2 ){
            location.href = this.staticResources+'physical/exportClassScore?schoolId='+this.schoolId+'&examId='+item.id+'&schoolYear='+this.schoolYear+'&term='+this.term;
          } else {

          location.href = this.staticResources+'physical/exportClassScore?schoolId='+this.schoolId+'&examId='+item.id+'&schoolYear='+this.schoolYear+'&term='+this.term+'&classId='+this.classId;
          }
        }
      }
    },

  }

</script>
<style >
@import "../../../resources/front/css/common/adm-stu-tea-mgt.css";

</style>

