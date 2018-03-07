<template>
  <div class="studentManagement" v-loading.lock="fullscreenLoading" element-loading-text="页面加载中..." @click="helpCtlHelp">
    <div class="studentMgt-header btns " :class="[{ isMove: firstLogin }]">
       <router-link to="/studentManagement/addstudens" class="el-button el-button--success move"> <span>新建学生</span></router-link>
       <router-link to="/studentManagement/schoolRollstudentbatch" class="el-button el-button--primary move"> <span>批量导入</span></router-link>

      <el-button type="primary" @click="manageClass" class="move"><span>升级分班</span></el-button>
      <el-button type="primary" @click="downloadAccount" class="move"><span>下载账号</span></el-button>
      <el-button  @click.prevent="batchDeleteStudents" :disabled="listenStudentsMultipleSelection.length == 0" class="del-btn">删除学生</el-button>



    </div>
    <div class="studentMgt-filter" >
      <div class="grades">
        <el-radio-group v-model="gradeId" @change="getCurrentGradeId(gradeId)">
          <el-radio-button v-for="(item,index) in grades" :label="item.index" :key="index"> {{item.name}} </el-radio-button>
        </el-radio-group>
      </div>

      <div class="classes" v-if="classes.length != 0">
        <el-radio-group v-model="classId" @change="getCurrentClassId(classId)">
          <el-radio-button v-for="(item,index) in classes" :label="item.index" :key="index"> {{item.name}} </el-radio-button>
        </el-radio-group>
      </div>
      <div class="classes" v-if="classes.length == 0">
        <div class="el-radio-button">
          <div class="el-radio-button__inner">该年级下暂无班级</div>
        </div>
      </div>
    </div>
    <div class="studentMgt-body">
      <!-- <div class="studentMgt-body-title" v-if="classes.length != 0">
        <p v-if=" !isHeadTeacher "> 该班级暂无班主任 </p>
        <template v-if="isHeadTeacher">
          <h4 class="item"> 班主任：{{headTeacher.name}}</h4>
          <h4 class="item">手机号码：{{headTeacher.phone}}</h4>
        </template>

      </div> -->
      <div class="noData" v-if="noData" >
        <p class="empty-text">班级暂无学生，请通知班主任做分班操作</p>
      </div>
      <div class="studentMgt-body-table" v-if=" total != 0 ">


        <el-table
          :data="studentClassListsData"
          @row-click="getCurrentRowInfo"
          @selection-change="listenStudentsSelectionChange"
          @sort-change="sortTable"
          style="width: 100%"
          border
          stripe
          >
          <el-table-column
            type="selection"
            width="50"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100"
            show-overflow-tooltip
            sortable="custom"

            >
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="80">
            <template scope="scope">
              <span v-if=" scope.row.sex == 1 ">
                男
              </span>
              <span v-if=" scope.row.sex == 2 ">
                女
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nation"
            label="民族"
            show-overflow-tooltip
            >
          </el-table-column>

          <el-table-column
            prop="sid"
            label="学籍号"
            width="180"
            >
          </el-table-column>

          <el-table-column
            prop="schoolYear"
            label="入学年份">
          </el-table-column>
          <el-table-column

            label="状态">
            <template scope="scope">
              <el-dropdown trigger="click" menu-align="start" @command="changeStudensState">
                    <span class="el-dropdown-link">
                      <b v-if="scope.row.state == 0">正常</b>
                      <b v-else-if="scope.row.state == 1"> 禁用</b>
                      <b v-else-if="scope.row.state == 2">休学</b>
                      <b v-else="scope.row.state == 3">离校</b>

                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="0">正常</el-dropdown-item>
                      <el-dropdown-item command="1">禁用</el-dropdown-item>
                      <el-dropdown-item command="2">休学</el-dropdown-item>
                      <el-dropdown-item command="3">离校</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>


            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="270"
            >
            <template scope="scope">

                  <router-link :to="{ name: 'editstudent', params: {id: scope.row.id,type:'detail' , gradeId:gradeId, classId:classId  }}" class="el-button el-button--primary">详情</router-link>



                  <router-link :to="{ name: 'editstudent', params: { id: scope.row.id, type:'edit', gradeId:gradeId, classId:classId }}" class="el-button el-button--primary">编辑</router-link>

                <!-- <el-button
                  type="primary"
                  size="small"
                  @click="studentRestPwd(scope.$index, scope.row)"></el-button> -->
                <a href="javascript:;" class="el-button el-button--primary" @click="studentRestPwd(scope.$index, scope.row)">重置密码</a>
                <a href="javascript:;" class="el-button el-button--primary el-button--danger" @click="studentDelete(scope.$index, scope.row)">删除</a>

                <!-- <el-button
                  type="danger"
                  size="small"
                  @click="studentDelete(scope.$index, scope.row)">删除</el-button> -->
              </template>
          </el-table-column>

        </el-table>
        <div class="pagination">
            <el-pagination
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="total"
              :current-page="currentPage"
              @current-change="paginationCurrentChange"
              >
            </el-pagination>
        </div>
      </div>
    </div>
    <!-- 分班弹窗 -->

    <el-dialog title="分班管理" v-model="dialogVisible" top="50%" class="studentManagement managementDialog" :close-on-click-modal="false" @open="managementDialogOpen">

      <span class="icon-help" @click.stop="helpCtl"></span>
      <div class="help-con" :class="{show:isShowHelp}"></div>
      <div class="transfer-data">
        <div class="transfer-data-left">
          <div class="transfer-data-header">
            <h2 class="title">年级学生</h2>

            <el-select v-model="gradeName"   >
              <el-option
                v-for=" (item,index) in editGrades"
                :label="item.name"
                :value="item.serial"
                :key="index"
                >
              </el-option>
            </el-select>

            <el-input placeholder="学生姓名/学籍号/上学年班级筛选" v-model="gradesSearchText" class="icon-search">
              <!-- <el-button slot="append" icon="search" @click="gradesSearch(gradesSearchText)"></el-button> -->
            </el-input>
          </div>
          <div class="transfer-data-body">
              <!-- :data="studentGradeListsData" -->
            <el-table
              ref="studentsPoolTable"
              :data="studentGradeListsDataFilter"
              style="width: 100%"
              @selection-change="studentsSelectionChange"
              @select-all="addStudentsSelectionAll"
              empty-text="请通过新增学生或者批量导入学生的方式维护班级学生"
              border
              stripe
              max-height="270"
              >
              <!-- @row-click="studentsPoolSelectionChange" -->
              <el-table-column
                    type="selection"
                    width="30">
                  </el-table-column>
              <el-table-column
                prop="sid"
                label="学籍号"
                width="178"
                >
              </el-table-column>

              <el-table-column
                prop="name"
                label="姓名"
                width="74"
                show-overflow-tooltip
                >
              </el-table-column>
              <el-table-column
                 prop="className"
                label="上学年班级"
                max-width="90"
                >
              </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination
                  :page-size="10"
                  layout="prev, pager, next, jumper"
                  :total="gradesTotal"
                  @current-change="gradesPaginationCurrentChange"
                  >
                </el-pagination>
            </div> -->

          </div>
        </div>
        <div class="transfer-data-operation">

          <el-button type="primary" icon="arrow-right" @click="addStudent" :disabled=" addStudensState "></el-button>
          <el-button type="primary" icon="arrow-left"  @click="removeStudent"  :disabled=" removeStudensState "></el-button>
          <!-- <el-button type="primary" icon="upload" @click="saveStudents" :disabled=" saveStudensState ">保存</el-button> -->


        </div>
        <div class="transfer-data-right">

          <div class="transfer-data-header">
            <h2 class="title">所选班级</h2>
            <el-select v-model="gradeName"   >
              <el-option
                v-for=" (item,index) in editGrades"
                :label="item.name"
                :value="item.serial"
                :key="index"
                >
              </el-option>
            </el-select>
            <!--  @change="classSelected(className)" -->
            <el-select v-model="className"  :disabled="isClass">
              <el-option
                v-for=" (item,index) in editClasses"
                :label="item.name"
                :value="item.index"
                :key="index"
                >
              </el-option>
            </el-select>
            <el-input placeholder="按学籍号/姓名筛选" v-model="classesSearchText" :disabled="isClass" class="icon-search">
              <!-- <el-button slot="append" icon="search" @click="classesSearch(classesSearchText)"></el-button> -->
            </el-input>
          </div>
          <div class="transfer-data-body">
            <div class="no-class" v-if="this.editClasses.length ==0">
              <p class="el-table__empty-text">该年级下暂无班级，请前往<router-link to="/classManagement">班级管理</router-link>界面创建班级信息</p>
            </div>
            <el-table
              ref="gradesTable"
              :data="editStudentsListsDataFilter"
              style="width: 100%"
              border
              stripe
              @selection-change="removeStudentsSelectionChange"
              @select-all="removeStudentsSelectionAll"
              empty-text="暂无学生"
              v-else
              max-height="270"
              >
              <el-table-column
                type="selection"
                width="30">

              </el-table-column>
              <el-table-column
                prop="sid"
                label="学籍号"
                >
              </el-table-column>

              <el-table-column
                prop="name"
                label="姓名"
                show-overflow-tooltip
                width="60"
                >
              </el-table-column>
              <!-- <el-table-column
                prop="className"
                label="历史班级"
                width="80">
              </el-table-column> -->

            </el-table>
          </div>

        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveStudents" :disabled=" saveStudensState " >保 存</el-button>
      </div>
    </el-dialog>


    <el-dialog title="下载账号" top="50%" v-model="downloadAccountDialogVisible" class="downloadAccount"  :close-on-click-modal="false" size="tiny">

      <div class="downloadAccount">

        <h4 class="title">请选择需要下载的班级</h4>
        <div class="scroll-con">
          <el-form ref="downloadAccountForm" :model="downloadAccountForm" label-width="80px">
          <el-form-item :label="item.name+':'" v-for="(item,index) in downloadAccountGrades" :key="index">
            <el-checkbox-group v-model="downloadAccountForm.classSelectedVal">
              <el-checkbox :label="list.index" name="classSelectedVal" v-for="(list,index) in item.classList" :key="index">{{list.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

        </el-form>
        </div>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="downloadAccountDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="downloadAccountOk"  :disabled="downloadAccountForm.classSelectedVal.length == 0">下 载</el-button>
      </div>

    </el-dialog>
    <div class="guide-tips" v-if="firstLogin" @click="closeGuide">
      <div class="content">
        <div class="guide-tips-bg">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'studentManagement',

  data () {
    return {
      noData:false,
      // 全屏遮罩层
      fullscreenLoading: false,
      // 角色信息
      userInfo:'',
      firstLogin:true,
      // 默认学校
      schoolId:'',
      // 弹框
      dialogVisible:false,
      downloadAccountDialogVisible:false,
      // 班主任
      headTeacher:{},
      // 当前班级是否班主任
      isHeadTeacher:true,
      gradeAllName:'',

      gradeName:'',
      className:'',
      // 年级池当前班级id
      allCurrentGradeId:'',
      gradesAllSelectedIndex:'1',
      // 年级
      grades:[],
      // 所要编辑的年级
      editGrades:[],
      editGradeId:'',
      editGradeCodeId:'',
      // 默认年级
      gradeId:'',
      // 当前行信息
      currentRowInfo:'',
      // 年级轴
      serial:'',
      // 班级
      classes:[],
      isClass:true,
      // 所要编辑的班级
      editClasses:[],

      editClassId:'',
      // 默认班级
      classId:'',
      // 当前班级id
      currentClassId:'',
      // 当前年级学生列表数据
      studentGradeListsData:[],
      // 当前班级学生列表数据
      studentClassListsData:[],
      // 学生数量
      studentListslength:'',
      // 所要编辑的学生列表
      editStudentsListsData:[],
      // 所要编辑的年级当前id
      editCurrentGradeId:'',
      // 所要编辑的班级当前id
      editCurrentClassId:'',

      gradesSearchText:'',
      classesSearchText:'',
      //当前选中学生列表
      listenStudentsMultipleSelection:[],
      // 批量删除学生按钮状态
      batchDeleteStudentsState:true,

      // 当前年级总页数
      total:0,
      // 当前页
      currentPage:1,
      // 年级池总页数
      gradesTotal:0,
      // 选择添加学生集合
      addMultipleSelection:[],
      // 选择移除学生集合
      removeMultipleSelection:[],
      // 添加学生按钮状态
      addStudensState:true,
      // 移除学生按钮状态
      removeStudensState:true,
      // 保存学生按钮状态
      saveStudensState:true,

      // 所选账号
      downloadAccountForm:{
        classSelectedVal:[]
      },
      downloadAccountGrades:[],
      order:'',
      isShowHelp:false,
    };

  },
  mounted(){
    this.getUserInfo();
    this.getGrade();
    this.getEditGrade();
    this.getDownloadAccountGrades();

  },
  watch:{
    // 获取所要编辑年级
    gradeName:function(serial){
      this.allCurrentGradeId = serial;
      // console.log(serial)

      this.getSutdentGradeLists(serial);

      if(this.editGrades.length !=0){

      var gradeIndex = this.editGrades.filter(item => item.serial == serial )[0].index;
      this.getEditClass(gradeIndex)

      // console.log(this.classes)


    }



    },
    // 获取所要编辑班级
    className:function(classId){

      // console.log( classId)

      if(classId != ''){

        // console.log(classId)

        this.editCurrentClassId=classId;

        this.getEditStudentsLists(this.editCurrentClassId);

        this.getSutdentGradeLists(this.allCurrentGradeId);

      }else{

        return false
      }

    }
    /*classId:function(newVal){
      console.log(newVal)
    }*/
  },
  computed:{
    // 年级池筛选
    studentGradeListsDataFilter:function(){
      return this.studentGradeListsData.filter(item => item.name.indexOf(this.gradesSearchText) != '-1' || item.className.indexOf(this.gradesSearchText) != '-1' || item.sid.indexOf(this.gradesSearchText) != '-1' )
    },
    // 班级筛选
    editStudentsListsDataFilter:function(){
      return this.editStudentsListsData.filter(item => item.name.indexOf(this.classesSearchText) != '-1'  || item.sid.indexOf(this.classesSearchText) != '-1' )
    }
  },
  methods:{
    // 获取角色信息
    getUserInfo(){

      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.schoolId = this.userInfo.schools.schoolId;

      this.firstLogin=!localStorage.studentManagementFirstLogin && this.userInfo.firstLogin;


    },

    // 当前年级列表
    getGrade(){
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

              /*this.serial = this.grades[0].serial;

              this.getSutdentGradeLists(this.serial);*/
            }


          }else{
            this.useAlert('error',res.message,function () {});
          }




      }).catch((res) => {
        this.useAlert('error',res.message,function () {});
      });
    },

    // 获取当前年级
    getCurrentGradeId(gradeId){

      this.gradeId=gradeId;

      this.getClass(gradeId);

      this.serial= this.grades.filter(item=> item.index ==  this.gradeId)[0].serial;

      // console.log(gradeId)
      // console.log(this.serial)

      this.getSutdentGradeLists(this.serial);

      this.gradeName=this.serial;



    },


    // 班级列表
    getClass(gradeId){
      let params={
        schoolId:this.schoolId,
        gradeId: gradeId
      };

      this.$ajax('/findClassByGradeIdAndSchoolId',params)

      .then(res => {
          if(res.code ==200){

            // console.log(res.data)

            this.classes=res.data;

            if(this.classes.length == 0){

              /*this.$message({
                message: '暂无班级',
                type: 'info'
              });*/
              this.classes =[];
              this.studentClassListsData=[];

              this.editStudentsListsData=[];

              this.total = 0;

              this.fullscreenLoading=false;

              this.className='';

              this.noData=true;
            }else{

              this.classId = this.classes[0].index;

              this.noData=false;

              this.getHeadTeacher(this.classId)


              this.getSutdentClassLists(this.classId, this.currentPage)

              // this.getEditStudentsLists(this.classId)
            }

          }else{
            this.useAlert('error',res.message,function () {});
          }


      }).catch((res) => {

        this.useAlert('error',res.message,function () {});
      });

    },

    // 获取当前班级
    getCurrentClassId(classId){

      this.currentPage=1;

      // console.log(classId)

      this.currentClassId = classId;


      this.getSutdentClassLists(this.currentClassId,this.currentPage)

      this.className = this.currentClassId;

      this.getHeadTeacher(this.currentClassId)

      // this.getEditStudentsLists(this.currentClassId)
    },
    //按姓名排序
    sortTable(obj) {

      if ( obj.order === 'ascending' ) {
        this.order = 1;  //正序
      } else if ( obj.order === 'descending' ) {
        this.order = 2;  //倒序
      } else {
        this.order = '';
      }


      this.getSutdentClassLists(this.currentClassId || this.classId,this.currentPage)
    },
    // 获取当前班级学生列表
    getSutdentClassLists(currentClassId,currentPage){
      this.fullscreenLoading=true;
      let params={
          schoolId: this.schoolId,
          classIndex: currentClassId,
          pageSize:10,
          pageNumber:currentPage,
          order:this.order
        };
        this.$ajax('/findStudentByClassIdAndSchoolId',params)

        .then(res => {
            if(res.code ==200){
              this.studentClassListsData=res.data.resultList;

              if(this.studentClassListsData.length ==0){
                this.studentClassListsData=[];
                this.total = 0;
                this.noData=true;
                this.fullscreenLoading=false;

              }else{
                this.total = res.data.total;
                this.noData=false;
                this.fullscreenLoading=false;
              }


            }else{

              this.useAlert('error',res.message,function () {});
            }


        }).catch((res) => {
          this.useAlert('error',res.message,function () {});
        });

    },
    // 获取点击当前行信息
    getCurrentRowInfo(row, column, cell, event){
      // console.log(row)
      this.currentRowInfo = row;
    },
    // 设置学生状态
    changeStudensState(command){

        // console.log(this.currentRowInfo)
        // console.log(command)
        let params={
          id: this.currentRowInfo.id,
          state: command
        };

        this.$ajax('/changeStudentState',params).then((res) => {

          if(res.code == 200){
            this.useAlert('success','状态修改成功',function () {});

            this.getSutdentClassLists(this.currentClassId || this.classId,this.currentPage)
          }else{
            this.useAlert('error',res.message,function () {});
          }
      }).catch((res) => {
        this.useAlert('error',res.message,function () {});
      });
    },
    // 获取当前班级班主任
    getHeadTeacher(classId){
      let params={
          classId: classId,
          // classId: 21053,
        };
        this.$ajax('/findHeadTeacherByClassId',params)

        .then(res => {
            if(res.message == "success" ){

              this.headTeacher=res.data;

              this.isHeadTeacher=true;

            }else{

              this.isHeadTeacher=false;

            }

        }).catch((res) => {

        });
    },
    // 重置密码
    studentRestPwd(index,row){
      this.$confirm('是否确定重置密码?', '提示', {

        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {

        let params = {
          id: row.id
        };

        this.$ajax('/password/reset',params).then((res) => {
          if(res.code == 200){
            this.$alert(res.message, '新密码', {
              confirmButtonText: '确定',

            });

          }else{
            this.useAlert('error',res.message,function () {});
          }

        }).catch((res) => {
        this.useAlert('error',res.message,function () {});
      });

      }).catch((res) => {

      });
    },
    // 删除单个学生
    studentDelete(index,row){
      this.$confirm('确定要删除选中学生吗?', '提示', {

        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {

        // console.log(this.currentClassId || this.classId )
        // console.log(this.currentPage)

        let params = {
          id: row.id
        };

        this.$ajax('/teacher/delOneStudent',params).then((res) => {
          if(res.code == 200){
            this.useAlert('success','删除成功',function () {});

            this.getSutdentClassLists(this.currentClassId || this.classId,this.currentPage)

          }else{
            this.useAlert('error',res.message,function () {});
          }

        }).catch((res) => {
          this.useAlert('error',res.message,function () {});
        });

      }).catch((res) => {

        });
    },
    //获取列表选中列
    listenStudentsSelectionChange(val) {

      this.listenStudentsMultipleSelection = val;


    },

    // 批量删除机当前学生
    batchDeleteStudents(){
      var studentsIds = this.listenStudentsMultipleSelection.map(item => item.id).toString();
        this.$confirm('确定要删除选中学生吗?', '提示', {

          confirmButtonText: '删除',
          cancelButtonText: '取消',
        }).then(() => {

          let params = {
            ids: studentsIds
          };

          this.$ajax('/teacher/deleteManyStudent',params).then((res) => {
            if(res.code == 200){
              this.useAlert('success','删除成功',function () {});
              this.getSutdentClassLists(this.currentClassId || this.classId,this.currentPage);
            }else{
              this.useAlert('error',res.message,function () {});
            }
          }).catch((res) => {
            this.useAlert('error',res.message,function () {});
          });

        }).catch((res) => {

        });


    },


    // 管理分班弹窗
    manageClass(){

      this.saveStudensState=true;

      this.dialogVisible=true;

      this.getSutdentGradeLists(this.gradeName || this.serial);
      this.getEditStudentsLists(this.editCurrentClassId || this.editClassId);
    },
    // 班级列表分页
    paginationCurrentChange(val){

      this.fullscreenLoading=true;

      this.currentPage = val;

      this.getSutdentClassLists(this.currentClassId || this.classId,this.currentPage);
    },


    // 获取所要编辑年级列表
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

              this.editGrades=res.data;


              // console.log(this.editGrades)

              this.editGradeId = this.editGrades[0].index;

              this.gradeName = this.editGrades[0].serial;

              this.getSutdentGradeLists(this.gradeName);

              this.getEditClass(this.editGrades[0].index);

            }






          }else{
            this.useAlert('error',res.message,function () {});
          }




      }).catch((res) => {
        this.useAlert('error',res.message,function () {});
      });
    },
    // 获取所要编辑的班级列表
    getEditClass(gradeId){
      let params={
        schoolId:this.schoolId,
        gradeId: gradeId
      };

      this.$ajax('/findClassByGradeIdAndSchoolId',params)

      .then(res => {
        if(res.code == 200 ){
          if(res.data.length == 0){

            this.className='';

            this.editClasses=[];
            this.editStudentsListsData=[];
            this.isClass=true;
            /*this.$alert('该年级下暂无班级，请前往 班级管理 界面创建班级信息', '提示', {
              confirmButtonText: '确定',
              // callback: action => {
              //   this.dialogVisible = false;
              // }
            });*/

          }else{
            this.editClasses=res.data;

            this.className = this.editClasses[0].index;

            // this.className = this.editClasses[0].name;

            this.editClassId= this.editClasses[0].index ;

            this.getEditStudentsLists(this.editClassId);

            this.isClass=false;

            // console.log(this.editClassId)

            // this.classId= 152;
          }

        }else{
          this.useAlert('error',res.message,function () {});
        }






      }).catch((res) => {
        this.useAlert('error',res.message,function () {});
      });
    },
    // 获取当前年级池学生列表
    getSutdentGradeLists(gradeId){

      let params={
          schoolId: this.schoolId,
          gradeCode: gradeId,
          pageSize:0,
          currentPage:0
        };
        this.$ajax('/headteacher/findGradePoolByConditionAndPage',params)

        .then(res => {
          if(res.code == 200){
            if(res.data.rows.length == 0){
              this.studentGradeListsData=[];
              this.gradesTotal=0;
            }else{
              this.studentGradeListsData=res.data.rows;
              this.gradesTotal=res.data.totalCount;
            }

            // this.gradeName = this.grades[0].name
          }else{
            this.useAlert('error',res.message,function () {});
          }


        }).catch((res) => {
          this.useAlert('error',res.message,function () {});
        });

    },

    // 获取要编辑年级的学生列表 班级id获取学生列表

    getEditStudentsLists(classId){
      let params={
          // classId: this.currentClassId,
          classId: classId,
        };
        this.$ajax('/headteacher/findStudentByClassId',params)

        .then(res => {
          if(res.code == 200){
            if(res.data.length == 0){

              this.editStudentsListsData=[];

              return false
            }else{
              this.editStudentsListsData=res.data;

            }
          }else{
            this.useAlert('error',res.message,function () {});
          }

            // console.log(this.editStudentsListsData)
        }).catch((res) => {
          this.useAlert('error',res.message,function () {});
        });
    },
    // 班级搜索
    classesSearch(val){

      if(val != ''){
        let params={
            classId: this.editCurrentClassId || this.editClassId ,
            // classId: this.className,
            keyWord: val
          };
          this.$ajax('/headteacher/findStudentByClassId',params)

          .then(res => {
            if(res.code == 200){

              this.editStudentsListsData=res.data;
              this.classesSearchText='';
            }

          }).catch((res) => {

          });

      }else{
        return false
      }

    },
    // 选择添加学生改变时
    studentsSelectionChange(val){

      console.log(val)

      if(this.editClasses.length == 0){

        this.addStudensState=true;

      }else{
        this.addMultipleSelection=val;

        if(this.addMultipleSelection.length > 0){
          this.addStudensState=false;
          this.saveStudensState=true;
        }else if(this.addMultipleSelection.length == 0){
          this.addStudensState=true;
        }

        localStorage.setItem("addStudents", JSON.stringify(this.addMultipleSelection));
      }



    },
    // 点击行选中
    /*studentsPoolSelectionChange(row, event, column){
      // console.log(row)
      this.$refs.studentsPoolTable.toggleRowSelection(row)
    },*/
    // 添加到缓存列表
    addStudent(){

      // console.log(this.editClasses.length)

      let addStudentsItem = JSON.parse(localStorage.getItem("addStudents"));

      if(addStudentsItem.length > 0 && this.editClasses.length >0){

          this.editStudentsListsData=_.concat(addStudentsItem,this.editStudentsListsData,)


          this.studentGradeListsData = _.differenceWith(this.studentGradeListsData , addStudentsItem , _.isEqual )

          this.gradesSearchText='';
          this.addStudensState=true;

          this.saveStudensState=false;

      }else{
        return false

      }


    },

    // 选择移除学生改变时
    removeStudentsSelectionChange(val){


      if( val.length == 0){

        this.removeStudensState=true;

      }else{

        this.removeMultipleSelection=val;
        this.removeStudensState=false;

        this.saveStudensState=true;

        localStorage.setItem("removeStudents", JSON.stringify(this.removeMultipleSelection));
      }





    },
    // 添加学生全选，反选
    addStudentsSelectionAll(){

      this.addStudensState= !!this.addStudensState;
      this.saveStudensState= !this.addStudensState;

    },
    // 移除学生全选，反选
    removeStudentsSelectionAll(){
      this.removeStudensState= !!this.removeStudensState;
      this.saveStudensState= !this.removeStudensState;
    },

    // 移除学生
    removeStudent(){


      let removeStudentsItem = JSON.parse(localStorage.getItem("removeStudents"));

      if(removeStudentsItem.length > 0 && this.editClasses.length >0 ){

          this.studentGradeListsData=_.uniq(_.concat(removeStudentsItem,this.studentGradeListsData));

          this.editStudentsListsData = _.differenceWith(this.editStudentsListsData , removeStudentsItem , _.isEqual );
          this.classesSearchText='';
          this.removeStudensState=true;
          this.saveStudensState=false;

      }else{

        return false

      }

    },
    // 保存编辑学生数据
    saveStudents(){

      var sids= this.editStudentsListsData.map(item => item.sid).toString();

      // console.log(sids)
      // console.log(this.editCurrentClassId)
      // console.log(this.editClassId)

      let params={

          classId: this.editCurrentClassId || this.editClassId ,
          // classId: this.classId,
          sids:sids
        };
        this.$ajax('/headteacher/saveUpgradeStudent',params)

        .then(res => {
          if(res.code == 200){
            this.useAlert('success','保存成功',function () {});
            this.dialogVisible = false;

            localStorage.removeItem("addStudents");
            localStorage.removeItem("removeStudents");

            this.getSutdentClassLists(this.classId,this.currentPage);

          }else{
            this.useAlert('error',res.message,function () {});
          }



        }).catch((res) => {

        });
    },
    // 获取下载班级账号
    getDownloadAccountGrades(){
      let params={
          schoolId: this.schoolId,
          // schoolId: 11000003,
        };
        this.$ajax('/teacher/getGradeList',params)

        .then(res => {
            if(res.code==200){

              this.downloadAccountGrades = res.data;

            }else{
              this.useAlert('error',res.message,function () {});
            }

        }).catch((res) => {
          this.useAlert('error',res.message,function () {});
        });
    },
    // 下载账号
    downloadAccount(){
      this.downloadAccountDialogVisible=true;
      this.downloadAccountForm.classSelectedVal=[];
    },
    downloadAccountOk(){

      let classIds=this.downloadAccountForm.classSelectedVal.map(item => item).toString();

      this.downloadAccountDialogVisible=false;

      window.location.href=this.staticResources+`teacher/export/account/student?schoolId=${this.schoolId}&classIds=${classIds}`;

    },
    closeGuide(){
      if(this.firstLogin){

        this.firstLogin=false;
        this.isMove=false;
        localStorage.studentManagementFirstLogin = 'NO';
      }
    },
    helpCtl(){
      this.isShowHelp = !this.isShowHelp;
    },
    managementDialogOpen(){
      this.isShowHelp=false;
    },
    helpCtlHelp(){
      if(!this.isShowHelp) return;
      this.isShowHelp = false
    }
  }
};
</script>

<style>
@import "../../../resources/front/css/common/adm-stu-tea-mgt.css";
.studentManagement{
  padding:0 20px;
}
.studentManagement .studentMgt-header{
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ECEDEF;
}
.studentManagement .studentMgt-header .del-btn{
  float: right;
}
.studentManagement .studentMgt-header .el-button a{
  color: #fff;
}
.studentManagement .studentMgt-filter{
  /* padding-top: 10px; */
}
.studentManagement .studentMgt-filter .grades{
  margin-bottom: 10px;
}
.studentManagement .studentMgt-filter .classes{
  /* margin: 10px 0; */
  background: #f9f9f9;
  padding-bottom: 10px;
}
.studentManagement .pagination{
  margin-top: 20px;
  text-align: right;
}
.studentManagement .studentMgt-body-title{
  display: flex;
  font-size: 14px;
  padding-top: 20px;
}
.studentManagement .studentMgt-body-title .item:first-child{
  margin-right: 20px;
}
.studentManagement .studentMgt-body-table{
  margin-top: 10px;
}
.studentManagement .cell{
  text-align: center;
  white-space: nowrap;
}
.studentManagement .cell b{
  font-weight: normal;
}
.studentManagement .studentMgt-body-table .cell .el-button{
  color: #20a0ff;
  background: none;
  border: none;
  text-decoration: underline;
}
.studentManagement .studentMgt-body-table .cell .el-button.el-button--danger{
  color: #ff5353;
}
.studentManagement .studentMgt-body-table .el-button a{
  color: #20a0ff;
}
.studentManagement .transfer-data {
  display:flex;
}


.studentManagement .transfer-data-header .title{
  font-size: 14px;
  border-left:3px solid #0d9ee9;
  color: #0d9ee9;
  padding-left: 10px;

}
.studentManagement .transfer-data-header .el-select{
  display: inline-block;
  width: 122px;
}
.transfer-data-header .el-input{
  margin-top: 10px;
}

.studentManagement .transfer-data-operation{
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.studentManagement .transfer-data-operation .el-button{
  margin: 10px 0;
  background: #fff;
  border: 1px solid #0d9ee9;
}
.studentManagement .transfer-data-operation .el-button [class^=el-icon-arrow]{
  color: #0d9ee9;
}
.studentManagement .transfer-data-operation .el-button.is-disabled [class^=el-icon-arrow]{
  color: #bfcbd9;
}
.studentManagement .transfer-data-operation .el-button.is-disabled,
.studentManagement .transfer-data-operation .el-button.is-disabled:focus,
.studentManagement .transfer-data-operation .el-button.is-disabled:hover{
  background-image: none;
  background-color: #eef1f6;
  border-color: #d1dbe5;
}
.studentManagement .transfer-data-body{
  margin-top: 10px;
}

.studentManagement .transfer-data .el-table__empty-text {
  white-space: nowrap;
}

.studentManagement .studentMgt-filter .el-radio-button{
  margin-right: 15px;
}
.studentManagement .studentMgt-filter .el-radio-button.is-active .el-radio-button__inner{
  border: 1px solid #20a0ff;
  background: none;
  color: #20a0ff;
  box-shadow: 0 0 0 0 #20a0ff;
}
.studentManagement .studentMgt-filter .el-radio-button .el-radio-button__inner{
  border: 1px solid #bfcbd9;
  padding: 7px 8px;
  margin-top: 10px;
}

.studentManagement .studentMgt-filter .classes .el-radio-button .el-radio-button__inner{
  border: none;
  background: transparent;
}
.studentManagement .el-radio-button:last-child .el-radio-button__inner,
.studentManagement .el-radio-button:first-child .el-radio-button__inner{
  border-radius:0;
}
.studentManagement .el-input-group__append{
  border: 1px solid #e6e6e6;
  border-left: none;
}
.studentManagement .no-class{
  height: 240px;
  position: relative;

}
.studentManagement .no-class .el-table__empty-text{
  white-space: normal;
  width: 100%;
  margin-top: 47px;
}
.studentManagement .no-class .el-table__empty-text a{
  color: #20a0ff;

}
.downloadAccount .el-form-item{
  margin-bottom: 0px;
}
.downloadAccount .title{
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 16px;
}

.el-dialog__wrapper.downloadAccount .el-dialog.el-dialog--tiny{
  width: 530px;
}
.el-dialog__wrapper.downloadAccount .el-dialog__header{
  padding: 0 20px;
  border-bottom: 1px solid #efefef;
  background-color: #0d9ee9;
  background-position: 90% 0px;
}
.el-dialog__wrapper.downloadAccount  .el-dialog__body{
  padding: 20px;
}
.el-dialog__wrapper.downloadAccount .el-form-item__label{
  color: #333;
}
.el-dialog__wrapper.downloadAccount .el-checkbox__label{
  color: #666;
}
.el-dialog__wrapper.downloadAccount .el-checkbox{
  margin-left: 0;
  margin-right: 15px;
}
.downloadAccount .scroll-con{
  overflow: auto;
  height: 400px;
}
.el-table table thead tr th:nth-last-child(2){
  border-right: 1px solid #a5defa;
}
</style>
