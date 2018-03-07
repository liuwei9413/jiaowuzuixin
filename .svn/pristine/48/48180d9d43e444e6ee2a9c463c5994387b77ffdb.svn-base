<template>
  <div class="siderbar-wrapper">
      <!--横向导航-->
      <div id="sidebar" class="sidebar">
        <!--班主任权限-->
        <el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="roleId==1">
        <!--<el-menu-item index="/home">首页</el-menu-item>-->
        <el-menu-item index="/teacherPersonal">个人中心</el-menu-item>
        <el-menu-item index="/teacherMyClass">我的班级</el-menu-item>
        <el-menu-item index="/subjectScoreList">查看科目成绩</el-menu-item>
        <el-menu-item index="/sportScoreList">查看体育成绩</el-menu-item>
        <!-- <el-menu-item index="/xiaozhangtongji">学校统计</el-menu-item> -->
          <div class="classSelect" v-if="classInfoShow">
            <span>班级：</span>
            <el-select v-model="value" @change="querySelect(value)" placeholder="请选择">
              <el-option
                v-for="item in classList"
                :key="item.gradeId"
                :label="item.gradeName+'（'+item.className+'）'"
                @click.native="getGradeId(item,item.gradeId)"
                :value="item.classId">
              </el-option>
            </el-select>
          </div>
      </el-menu>

        <!--学校管理员权限-->
        <el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"  v-if="roleId==2">
          <!--<el-menu-item index="/home">首页</el-menu-item>-->
          <el-menu-item index="/schoolManagement">学校信息</el-menu-item>
          <el-menu-item index="/classManagement">班级管理</el-menu-item>
          <el-menu-item index="/studentManagement">学生管理</el-menu-item>
          <el-menu-item index="/leaderManagement">校长管理</el-menu-item>
          <el-menu-item index="/teacherManagement">教师管理</el-menu-item>
          <el-menu-item index="/subjectManagement">科目管理</el-menu-item>
          <el-menu-item index="/scoreManagement">科目成绩管理</el-menu-item>
          <el-menu-item index="/sportManagement">体育成绩管理</el-menu-item>
          <!-- <el-menu-item index="/xiaozhangtongji">学校统计</el-menu-item> -->
        </el-menu>


        <!--教育局权限-->
        <el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="roleId==4">
          <el-menu-item index="/admin">机构管理</el-menu-item>
          <el-menu-item index="/eduSchoolManagement">学校管理</el-menu-item>
        </el-menu>

        <!--普通教师权限-->
        <el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="roleId==8 || roleId==16">
          <!--<el-menu-item index="/home">首页</el-menu-item>-->
          <el-menu-item index="/teacherPersonal">个人中心</el-menu-item>
          <el-menu-item v-if="otherRole!=1" index="/subjectScoreList">查看科目成绩</el-menu-item>
          <el-menu-item v-if="otherRole" index="/sportScoreList">查看体育成绩</el-menu-item>
          <!-- <el-menu-item index="/xiaozhangtongji">学校统计</el-menu-item> -->
          <div class="classSelect" v-if="classInfoShow">
            <span>班级：</span>
            <el-select v-model="value" @change="querySelect(value)" placeholder="请选择">
              <el-option
                v-for="item in classList"
                :key="item.gradeId"
                :label="item.gradeName+'（'+item.className+'）'"
                @click.native="getGradeId(item,item.gradeId)"
                :value="item.classId">
              </el-option>
            </el-select>
          </div>
        </el-menu>

        <!--&lt;!&ndash;单科体育教师&ndash;&gt;-->
        <!--<el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="otherRole == 1 && roleId == 8">-->
          <!--&lt;!&ndash;<el-menu-item index="/home">首页</el-menu-item>&ndash;&gt;-->
          <!--<el-menu-item index="/teacherPersonal">个人中心</el-menu-item>-->
          <!--<el-menu-item index="/sportScoreList">查看体育成绩</el-menu-item>-->
          <!--<div class="classSelect" v-if="classInfoShow">-->
            <!--<span>班级：</span>-->
            <!--<el-select v-model="value" @change="querySelect(value)" placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in classList"-->
                <!--:key="item.gradeId"-->
                <!--:label="item.gradeName+'（'+item.className+'）'"-->
                <!--@click.native="getGradeId(item,item.gradeId)"-->
                <!--:value="item.classId">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</div>-->
        <!--</el-menu>-->

        <!--普通校长权限-->
        <!--<el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="roleId==16">-->
          <!--&lt;!&ndash;<el-menu-item index="/home">首页</el-menu-item>&ndash;&gt;-->
          <!--<el-menu-item index="/teacherPersonal">个人中心</el-menu-item>-->
          <!--<el-menu-item index="/subjectScoreList">查看科目成绩</el-menu-item>-->
          <!--<el-menu-item v-if="otherRole == 2" index="/sportScoreList">查看体育成绩</el-menu-item>-->
          <!--<div class="classSelect" v-if="classInfoShow">-->
            <!--<span>班级：</span>-->
            <!--<el-select v-model="value" @change="querySelect(value)" placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in classList"-->
                <!--:key="item.gradeId"-->
                <!--:label="item.gradeName+'（'+item.className+'）'"-->
                <!--@click.native="getGradeId(item,item.gradeId)"-->
                <!--:value="item.classId">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</div>-->
        <!--</el-menu>-->

        <!--admin权限-->
        <el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="roleId==32">
          <!--<el-menu-item index="/home">首页</el-menu-item>-->
          <el-menu-item index="/admin">机构管理</el-menu-item>
        </el-menu>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      return {
        roleId : userInfo.roleId,
        otherRole : userInfo.otherRole,
        activeIndex: '',
        value: '',
        classList: '',
        classId : '',
        gradeId:'',
        orgInfo: '',
        classInfoShow:true,
      };
    },
    mounted() {
      if (localStorage.getItem('userInfo') == '' || localStorage.getItem('userInfo') == null){
        this.$router.push({ path: '/login',  query: ''});
        return;
      }else {
//        判断班主任选择是否选择过班级
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if(userInfo.roleId == 1){
          let queryObj = this.$route.query;
          if(!queryObj.classId || queryObj.classId == '' || queryObj.gradeId == ''){
//            this.$router.push({ path: '/loginCheck',  query: ''});
            this.$router.push({ path: '/teacherPersonal',  query: {'classId':userInfo.classInfo.classId,'gradeId':userInfo.classInfo.gradeId}});
          }
        }
      };

//        查看成绩时控制切换班级的显示
//        let navName ='/'+this.$route.path.split('/')[1];
//        let navName ='/'+location.hash.split('#/')[1].split('?')[0];
//        if (navName.indexOf("/scoreManagement/querySubjectScore")>=0 || navName.indexOf("/scoreManagement/querySportScore")>=0 || navName.indexOf("/subjectScoreList/teacherViewScore")>=0 || navName.indexOf("/sportScoreList/teacherViewSport")>=0){
//          this.classInfoShow = false;
//        }else {
//          this.classInfoShow = true;
//        };
      this.activeIndex = '/'+this.$route.path.split('/')[1];
      let params = this.$route.query;
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.otherRole = userInfo.otherRole || 0;
      if(userInfo.roleId == 1){
        this.classId = params.classId || '';
        this.gradeId = params.gradeId || '';
        if (!!userInfo.jumpStatus && userInfo.jumpStatus == 1){
          this.classList = userInfo.headTeacherClassList;
        }else {
          this.classList = userInfo.headTeacherClassList.headteacher;
        };
        this.classList.forEach( ( item, i ) => {
          if (item.classId == this.classId){
            this.value = item.classId;
          }
        });

//        this.$router.push({ path: navName,  query: {'classId':this.classId,'gradeId':this.gradeId}});
      }else if(userInfo.roleId == 8 || userInfo.roleId == 16){
        this.classId = params.classId || '';
        this.gradeId = params.gradeId || '';
        this.classList = userInfo.teachClassList || '';
        this.classList.forEach( ( item, i ) => {
          if (item.classId == this.classId){
          this.value = item.classId;
        }
      });
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        if (localStorage.getItem('userInfo') == '' || localStorage.getItem('userInfo') == null){
          this.$router.push({ path: '/login',  query: ''});
          return;
        };
        let navName = '/'+this.$route.path.split('/')[1];
        this.activedIndex = keyPath;
        if (this.roleId == 1 || this.roleId == 8 || this.roleId == 16){
          this.$router.push({ path: key,  query: {'classId':this.classId,'gradeId':this.gradeId}});
        }else {
          this.$router.push({ path: key,  query: ''});
        }
      },
      querySelect(val){
        this.classId = val;
//        this.$router.go(0);
      },
      getGradeId(item,gradeId){
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userInfo.classInfo = item;
        let navName ='/'+location.hash.split('#/')[1].split('?')[0];

        if (this.roleId != 1){
          item.subject.forEach((items, i) => {
            if(items.subjectName.indexOf('体育') != -1){
            //是体育教师
            if (i>0){
              this.otherRole = 2; // 多科体育教师
              userInfo.otherRole = 2;
            }else {
              this.otherRole = 1; // 单科体育教师
              userInfo.otherRole = 1;
            }
            if (navName.indexOf("/subjectScoreList")>=0 ){
              this.$router.push({ path: '/teacherPersonal',  query: {'classId':this.classId,'gradeId':gradeId}});
            }
          }else {
            this.otherRole = 0;
            userInfo.otherRole = 0;
            if (navName.indexOf("/sportScoreList")>=0 ){
              this.$router.push({ path: '/teacherPersonal',  query: {'classId':this.classId,'gradeId':gradeId}});
            }
          };
        });

          this.roleId = userInfo.roleId;
        }



        localStorage.removeItem(userInfo);
        userInfo = JSON.stringify(userInfo);
        localStorage.setItem('userInfo',userInfo);
        this.classId = item.classId;
        this.gradeId = gradeId;


//        this.$router.push({ path: this.$route.path,  query: {'classId':this.classId,'gradeId':gradeId}});

//        查看成绩时切换班级时 切换参数

        if (navName.indexOf("/scoreManagement/querySubjectScore")>=0 || navName.indexOf("/scoreManagement/querySportScore")>=0 || navName.indexOf("/subjectScoreList/teacherViewScore")>=0 || navName.indexOf("/sportScoreList/teacherViewSport")>=0){
          let queryData = this.$route.query;
          this.$router.push({ path: this.$route.path,  query:{'examId':queryData.examId,'schoolYear':queryData.schoolYear,'term':queryData.term,'classId':this.classId,'gradeId':gradeId}});
        }else {
          this.$router.push({ path: this.$route.path,  query: {'classId':this.classId,'gradeId':gradeId}});
        };
      },
      isEmptyObject(obj) {
        for ( var i in obj ) {
          return false;
        }
        return true;
      },
      changeNav(){
//        let navName ='/'+location.hash.split('#/')[1].split('?')[0];
//        if (navName.indexOf("/scoreManagement/querySubjectScore")>=0 || navName.indexOf("/scoreManagement/querySportScore")>=0 || navName.indexOf("/subjectScoreList/teacherViewScore")>=0 || navName.indexOf("/sportScoreList/teacherViewSport")>=0){
//          this.classInfoShow = false;
//        }else {
//          this.classInfoShow = true;
//        };
        this.activeIndex = '/'+this.$route.path.split('/')[1];
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if(userInfo.roleId == 1){
          let queryObj = this.$route.query;
          if(!queryObj.classId || queryObj.classId == '' || queryObj.gradeId == ''){
            this.$router.push({ path: this.activeIndex,  query: {'classId':userInfo.classInfo.classId,'gradeId':userInfo.classInfo.gradeId}});
          }
        }
      }
    },
    computed:{
      onRoutes(){
        return this.$route.path.replace('','');
//        return this.$route.path.replace('/','');
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": "changeNav",
      otherRole:function (otherRole) {
        if (this.roleId == 8 || this.roleId == 16){
          let userInfo = JSON.parse(localStorage.getItem('userInfo'));
          userInfo.otherRole = otherRole;
          localStorage.removeItem(userInfo);
          userInfo = JSON.stringify(userInfo);
          localStorage.setItem('userInfo',userInfo);
          let navName ='/'+location.hash.split('#/')[1].split('?')[0];
          if (navName.indexOf("/subjectScoreList")>=0 ){
            this.$router.push({ path: '/teacherPersonal',  query: {'classId':this.classId,'gradeId':gradeId}});
          }
          if (navName.indexOf("/sportScoreList")>=0 ){
            this.$router.push({ path: '/teacherPersonal',  query: {'classId':this.classId,'gradeId':gradeId}});
          }
          this.$router.go(0);
        }
      }
    }
  }
</script>

<style>
/*横向导航*/
  .siderbar-wrapper {
    display: block;
    width: 100%;
    height: 42px;
    background-color: #0d9ee9;
    position: relative;
/*    margin-bottom: 12px;*/
  }
.siderbar-wrapper .sidebar #sidebarNav {
    box-sizing: border-box;
    position: absolute;
    width: 1024px;
    height: 42px;
    overflow: hidden;
  }
.siderbar-wrapper .sidebar{
    box-sizing: border-box;
    height: 42px;
    width: 1024px;
    margin: 0 auto;
  }
  .siderbar-wrapper .sidebar ul{
    padding-left: 30px;
  }
.siderbar-wrapper .el-menu--dark {
  background-color: #0d9ee9;
}
.siderbar-wrapper .el-menu--dark .el-menu-item,
.siderbar-wrapper .el-menu--dark .el-submenu__title {
  color: white;
}
.siderbar-wrapper #sidebar .el-menu--horizontal.el-menu--dark .el-menu-item.is-active {
  background: #ffffff;
  color: #0d9ee9;
  height: 38px;
  margin-top: 5px;
  line-height: 35px;
  border-radius: 5px 5px 0 0;
  border: none;
}
.siderbar-wrapper .el-menu--horizontal.el-menu--dark .el-menu-item:hover, .el-menu--horizontal.el-menu--dark .el-submenu__title:hover {
  background: #ffffff;
  color: #0d9ee9;
  height: 38px;
  margin-top: 5px;
  line-height: 35px;
  border-radius: 5px 5px 0 0;
  border: none;
}
.siderbar-wrapper .el-menu-item, .el-submenu__title{
  transition: 0s;
}
.siderbar-wrapper .el-menu--horizontal .el-menu-item{
  height: 38px;
  margin-top: 5px;
  line-height: 35px;
  margin-right: 1px;
  padding:0 16px;
}
.siderbar-wrapper .classSelect {
  color: #ffffff;
  position: absolute;
  top: 7px;
  right: 20px;
}
.siderbar-wrapper .classSelect span{
  display: inline-block;
  vertical-align: top;
  height: 30px;
  line-height: 30px;
}
.siderbar-wrapper .classSelect .el-input__inner {
    height: 30px;
    width: 200px;
    border-radius: 0;
  }
.siderbar-wrapper .el-menu{
    border-radius: 0;
  }


</style>
