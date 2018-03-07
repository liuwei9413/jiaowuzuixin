<template>
  <div class="subjectManagement" v-loading.lock="fullscreenLoading">
    <div class="subjectMgt-header">
      <el-radio-group v-model="currentGradeId" @change="getCurrentGradeId(currentGradeId)">
        <el-radio-button v-for="(item,index) in grades" :label="item.index" :key="index"> {{item.name}} </el-radio-button>
      </el-radio-group>
    </div>

    <div class="subjectMgt-body">
      <div class="subjectMgt-body-tool" v-if="teachingInfo != 0 ">
        <el-button type="success" @click="addNewSubject(currentGradeId)"   v-if="subjectState">新增科目</el-button>
      </div>
      <div class="noData" v-if="noData" >
        <p class="empty-text">暂无科目信息</p>
      </div>

      <div class="table-wrap" :class="[{ scroll: subjectInfo.length > 8}]" ref="scroll">
        <table class="table-striped" v-if="teachingInfo != 0">
          <thead>
            <tr>
              <th><div class="cell">分班</div></th>

              <th v-for="(item,index) in subjectInfo " :key="index">
                <!-- <el-tooltip  content="删除科目" placement="right">
                    <el-button type="text" @click="deleteSubject(item)">{{ item.subjectName }}</el-button>
                </el-tooltip> -->
                <div class="tooltip-warp">
                  <span class="subject-name">{{ item.subjectName }}</span>
                  <!-- <div class="tooltip-content" @click="deleteSubject(item)">删除科目</div> -->
                  <div class="tooltip-content" @click="deleteSubject(item)"> <i class="icon-fail"></i> </div>
                </div>
               </th>




            </tr>
          </thead>
          <tbody >
            <tr v-for="(item,index) in teachingInfo" :key="index">
              <td><div class="cell"> {{item.className}} </div></td>
              <td v-for="(list,index) in item.subjectInfo"  >
                <!-- <el-tooltip  content="删除教师" placement="right">
                  <el-button type="text" @click="deleteTeacher(item)">{{ list.teachingInfo.teacherName }}</el-button>
                </el-tooltip> -->

                <div class="tooltip-warp" :class="[{ fullCell: !list.teachingInfo.teacherName }]">

                  <a href="javascript:;" class="teacherName"  :class="[{ fullCell: !list.teachingInfo.teacherName },{ 'icon-new': !list.teachingInfo.teacherName }]" @click="getTargetAdd(item,list)" >{{ list.teachingInfo.teacherName }}</a>

                  <!-- <div class="tooltip-content" @click="deleteTeacher(list,item)" v-if=" list.teachingInfo.teacherName != '' ">删除教师</div> -->

                  <div class="tooltip-content"  v-if=" list.teachingInfo.teacherName != '' ">
                    <div class="item" @click="getTargetEdit(item,list)">
                      <i class="icon-edit"></i>编辑
                    </div>
                    <div class="item" @click="deleteTeacher(list,item)">
                      <i class="icon-delete" ></i>删除
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-if="teachingInfo.length == 0">
            <tr>
              <td :colspan=" subjectsLenght+1 ">
                暂无数据
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <el-dialog title="编辑科目教师信息" v-model="dialogVisibleEditTeacher" top="50%" :close-on-click-modal="false" size="tiny" >
      <el-form ref="teacherEdit" :model="teacherEdit" label-width="0px">

        <el-form-item label="" prop="currentTeacherId"
        :rules="{
          type: 'number', required: true, message: '请选择教师', trigger: 'change'
        }"
        >
          <el-select v-model="teacherEdit.currentTeacherId"  no-data-text="请前往教师管理界面维护教师信息" >
            <el-option
              v-for=" (item,index) in teachers"
              :label="item.name"
              :value="item.id"
              :key="item.id"
              >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right;">{{ item.phone }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditTeacher">取 消</el-button>
        <el-button type="primary" @click="teacherEditSaveData">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加科目教师信息" v-model="dialogVisibleAddTeacher" top="50%"  :close-on-click-modal="false" size="tiny" :before-close="cancelAddTeacher">
      <el-form ref="teacherAdd" :model="teacherAdd" label-width="0px">
      <!-- :filter-method="" -->
        <el-form-item label="" prop="currentTeacherId"
        :rules="{
          type: 'number', required: true, message: '请选择教师', trigger: 'change'
        }"
        >

          <el-select v-model="teacherAdd.currentTeacherId"  filterable   placeholder="姓名/手机号搜索" no-data-text="请前往教师管理界面维护教师信息" :filter-method="queryTeacherInfo">
            <el-option
              v-for=" (item,index) in teachersQuery"
              :label="item.name"
              :value="item.id"
              :key="item.id"
              >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right;">{{ item.phone }}</span>
            </el-option>
          </el-select>
          <!-- <el-autocomplete

                v-model="teacherAdd.currentTeacherId"
                :fetch-suggestions="querySearch"
                placeholder="请选择教师"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddTeacher">取 消</el-button>
        <el-button type="primary" @click="teacherAddSaveData">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增科目" v-model="dialogVisibleAddSubject" top="50%" :close-on-click-modal="false" size="tiny" :before-close="cancelNewSubjectData">
      <el-form ref="adddSubjectForm" :model="adddSubjectForm" label-width="0px">

        <el-form-item label="" prop="adddSubjectId"
        :rules="{
          type: 'number', required: true, message: '请选择科目', trigger: 'change'
        }"
        >
          <el-select v-model="adddSubjectForm.adddSubjectId"   placeholder="请选择" no-data-text="暂无科目">
            <el-option
              v-for="(item,index) in SubjectDBs"
              :label="item.name"
              :value="item.id"
              :key="index"
              >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelNewSubjectData">取 消</el-button>
        <el-button type="primary" @click="addNewSubjectData">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'subjectManagement',
    data () {
      return{
        noData:false,
        // 全屏遮罩层
        fullscreenLoading: false,
        // 默认学校
        schoolId:'',
        // 默认年级
        gradeId:'',
        // 是否删除了当前科目
        subjectState: true,
        // 选择当前年级
        currentGradeId: 0,
        // 教师
        teachers:[],
        teachersQuery:[],
        // 年级
        grades:[],

        dialogVisibleEditTeacher:false,
        dialogVisibleAddTeacher:false,
        dialogVisibleAddSubject:false,

        // 编辑教师
        teacherEdit:{
          // 选中当前教师id
          currentTeacherId: '',
        },
        // 添加教师
        teacherAdd:{
          // 选中当前教师id
          currentTeacherId: '',
        },

        defaultTeacher:'',
        defaultTeacherId:'',
        // 获取科目
        subjects:[],
        // 科目数量
        subjectsLenght:'',
        oldSubjectsLenght:'',
        // 科目id
        subjectId:'',
        // 班级id
        classId:'',

        // 教师id
        teacherId:'',
        adddSubjectForm:{
          // 添加科目id
          adddSubjectId:'',
        },

        // 选取教师
        teachingInfo:'',
        // 获取班级的科目名称
        subjectInfo:'',

        // 获取科目数量
        SubjectDBs:[],
      }
    },
    mounted(){
      this.getUserInfo();
      this.getGrade();

      this.getTeacher();


    },
    watch:{
      'teacherAdd.currentTeacherId':function(newVal,oldVal){
        // console.log(newVal)
        if(newVal == 0){
          this.teacherEdit.currentTeacherId=''
        }
        // console.log(this.teacherEdit.currentTeacherId)
      }
    },
    computed:{
      teachersFilter:function(){
        return this.teachers.filter(item => item.name.indexOf(this.gradesSearchText) != '-1' || item.phone.indexOf(this.gradesSearchText) != '-1' )
      }
    },
    methods:{
      // 获取角色信息
      getUserInfo(){

        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.schoolId = this.userInfo.schools.schoolId;
        // this.schoolId = 1;
        // console.log(this.schoolId)
      },

      // 获取教师
      getTeacher(){
        let params={
          schoolId:this.schoolId
        };
        this.$ajax('/schadmin/getTeacherBySchoolId',params)

        .then(res => {
          if(res.code == 200){

            this.teachers=res.data;

            this.teachersQuery = this.teachers;

          }else{
            this.useAlert('error',res.message,function () {});
          }



        }).catch((res) => {
          this.useAlert('error',res.message,function () {});
        });
      },

      // 年级列表
      getGrade(){
        this.fullscreenLoading=true;
        let params={
          schoolId:this.schoolId
        };
        this.$ajax('/headteacher/findGradeByCurrentUser',params)

        .then(res => {
          if (res.code == 200) {
            this.grades=res.data;

            this.currentGradeId = this.grades[0].index;

            this.getSubjectDB();
            this.getSubjects();

            this.fullscreenLoading=false;
            // console.log(this.grades[0].index)
            // console.log(this.grades[0])
          }else{
            this.useAlert('error',res.message,function () {});
          }


        }).catch((res) => {
          this.useAlert('error',res.message,function () {});
        });
      },
      // 获取当前年级
      getCurrentGradeId(GradeId){

        this.currentGradeId = GradeId;


        this.getTeaching()
        this.getSubjectDB()

        // this.getSubjects()

        // console.log(this.currentGradeId)
      },
      // 获取科目
      getSubjects(){

        let params={
          schoolId:this.schoolId,
          gradeId:this.currentGradeId
        };

        this.$ajax('/schadmin/findSubjectBySchoolIdAndGradeId',params)

        .then(res => {
            if(res.code ==200){

              this.subjects=res.data;

              if(this.subjects.length == 0){

                this.noData=true;

              }else{
                this.noData=false;
              }

            }else{
              this.useAlert('error',res.message,function () {});
            }

            // this.subjectsLenght = this.subjects.length;

        }).catch((res) => {
          this.useAlert('error',res.message,function () {});
        });
      },

      // 查询教学信息
      getTeaching(){

        this.fullscreenLoading=true;
        let params={
          gradeId:this.currentGradeId
        };

        this.$ajax('/teacher/findTeaching',params)

        .then(res => {

            if(res.code ==200){

              this.teachingInfo=res.data;

              if(this.teachingInfo.length == 0){

                this.fullscreenLoading=false;

                this.noData=true;

              }else{



                // console.log(this.teachingInfo)

                this.subjectInfo=this.teachingInfo[0].subjectInfo;

                this.subjectsLenght = this.subjectInfo.length;

                this.noData=false;

                this.fullscreenLoading=false;

                this.$nextTick(function(){
                  this.$refs.scroll.scrollLeft = 0
                })
              }

            }else{
              this.useAlert('error',res.message,function () {});
            }



        }).catch((res) => {


        });
      },
      // 获取当前点击对象
      getTargetEdit(item,list){
        // console.log(item,list)

        this.teacherEdit.currentTeacherId =  list.teachingInfo.teacherId;

        this.classId= item.classId;

        this.subjectId= list.subjectId;

        this.dialogVisibleEditTeacher=true;

        // console.log(item.classId,list.subjectId)
        // console.log(item)
      },
      getTargetAdd(item,list){
        if(list.teachingInfo.teacherName) return;
        // console.log(item,list)

        this.classId= item.classId;

        this.subjectId= list.subjectId;

        this.dialogVisibleAddTeacher=true;
      },
      // 筛选教师信息
      queryTeacherInfo(val){

        this.teachersQuery = this.teachers.filter(item => {
          return item.name.indexOf(val) > -1 || item.phone.indexOf(val) > -1;
        })
      },
      /*clearTeacher(){
        this.teacherEdit.currentTeacherId='';
        this.queryTeacherInfo(val);
      },*/
      /*queryTeacherInfo(val){

        this.teachersQuery = this.teachers.filter(item => {
          return item.name.indexOf(val) > -1 || item.phone.indexOf(val) > -1;
        })
      },*/
      teacherSave(teacherId){
        let params={
          classId : this.classId,
          subjectId: this.subjectId,
          teacherId: teacherId
        };

        this.$ajax('/schadmin/saveOrUpdateClassTeacherSubject',params)

        .then(res => {
              if(res.code == 200){

                this.useAlert('success','添加成功',function () {});

                this.getTeaching()



              }else{
                this.useAlert('error',res.message,function () {});
              }

        }).catch((res) => {
          this.useAlert('error',res.message,function () {});
        });

      },
      teacherEditSaveData(){
        this.teacherSave(this.teacherEdit.currentTeacherId);
        this.dialogVisibleEditTeacher=false;
        this.$refs.teacherEdit.resetFields();
      },
      // 保存选择教师
      teacherAddSaveData(){

        this.$refs.teacherAdd.validate((valid) => {
         if (valid) {

          this.teacherSave(this.teacherAdd.currentTeacherId);
          this.dialogVisibleAddTeacher=false;
          this.$refs.teacherAdd.resetFields();

         } else {

           return false;
         }
        });


      },
      cancelEditTeacher(){
        this.dialogVisibleEditTeacher=false;
        this.$refs.teacherEdit.resetFields();
      },

      cancelAddTeacher(){
        this.dialogVisibleAddTeacher=false;
        this.$refs.teacherAdd.resetFields();
      },

      // 查询科目字典表
      getSubjectDB(){
        let params={
          schoolId:this.schoolId,
          gradeId: this.currentGradeId
        };
        // console.log(this.currentGradeId)
        this.$ajax('/schadmin/findSubjectDBBySchoolIdAndGradeId',params)

        .then(res => {
          if(res.code ==200){

            if(res.data.length ==0){

              this.subjectState=false;

            }else{

              this.SubjectDBs=res.data;

              this.subjectState=true;
            }

          }else{
            this.useAlert('error',res.message,function () {});
          }

        }).catch((res) => {
          this.useAlert('error',res.message,function () {});
        });
      },
      // 添加科目
      addNewSubject(currentGradeId){
        // console.log(currentGradeId)
        this.dialogVisibleAddSubject=true

        this.getSubjectDB();


      },
      cancelNewSubjectData(){
        this.dialogVisibleAddSubject=false;
        this.$refs.adddSubjectForm.resetFields();
      },
      // 确定添加科目
      addNewSubjectData(){

        this.$refs.adddSubjectForm.validate((valid) => {
          if (valid) {
            let params={
              schoolId: this.schoolId,
              gradeId : this.currentGradeId,
              subjectId: this.adddSubjectForm.adddSubjectId
            };
            this.$ajax('/schadmin/saveSchoolGradeSubject',params)

            .then(res => {

                  if(res.code == 200){

                    this.useAlert('success','添加成功',function () {});

                    this.dialogVisibleAddSubject = false;

                    this.getTeaching();
                    this.getSubjectDB();

                    this.$refs.adddSubjectForm.resetFields();

                  }else{
                    this.useAlert('error',res.message,function () {});
                  }

            }).catch((res) => {
              this.useAlert('error',res.message,function () {});
            });
          } else {

            return false;
          }
        });

      },
      // 删除学科

      deleteSubject(item){


        // 获取全部科目
        let subjectAll=[];
        let subjectsSameId=[];

        for (var i = 0; i < this.teachingInfo.length; i++) {
                for (var j = 0; j < this.teachingInfo[i].subjectInfo.length; j++) {
                    subjectAll.push(this.teachingInfo[i].subjectInfo[j])
                }
        }
        // 科目相同的id

        subjectsSameId =subjectAll.filter(function(x){

            return x.subjectId ==  item.subjectId
        });


        // 判断是否是空对象
        function isEmptyObject(obj) {
          for (var key in obj) {
            return false;
          }
          return true;
        };

        // 判断相同科目是否有老师
        function haveTeacher() {
               for (var i = 0; i < subjectsSameId.length; i++) {

                if (!isEmptyObject( subjectsSameId[i].teachingInfo ) && subjectsSameId[i].teachingInfo.teacherId != 0 ) {

                    return true
                }
            }

            return false;

        };

        if( haveTeacher() ){

          this.$alert('该学科下存在教师，请先解除教师学科之间的关系', '提示', {
                    confirmButtonText: '确定',
                  });


        }else{

          this.$confirm('是否要删除当前科目?', '提示', {

            confirmButtonText: '删除',
            cancelButtonText: '取消',
          }).then(() => {
            let params={
              schoolId:this.schoolId,
              gradeId :this.currentGradeId,
              subjectId: item.subjectId
            };
            this.$ajax('/schadmin/deleteSubjectBySchoolIdAndGradeId',params)

            .then(res => {
                  if(res.code == 200){
                    this.useAlert('success','删除成功',function () {});
                    // this.useAlert('success', '删除成功')


                    this.getSubjects();



                    this.subjectsLenght = this.subjectInfo.length;

                    this.dialogVisibleAddSubject = false;

                    this.getTeaching();

                    this.getSubjectDB();

                  }else{

                    this.useAlert('error',res.message,function () {});

                    this.dialogVisibleAddSubject = true;
                  }

            })
          }).catch((res) => {

          });
        }


      },

      // 删除当前选中教师
      deleteTeacher(list,item){
        // console.log(list, item )
        this.$confirm('是否要删除当前教师?', '提示', {

          confirmButtonText: '删除',
          cancelButtonText: '取消',
        }).then(() => {
          let params={
            classId :item.classId,
            subjectId: list.subjectId
          };
          this.$ajax('/schadmin/deleteClassTeacherSubjectByCondition',params)

          .then(res => {
                if(res.code == 200){
                  this.useAlert('success','删除成功',function () {});
                  // this.useAlert('success', '删除成功')

                  this.getSubjects()
                  this.getTeaching()

                  this.dialogVisibleAddSubject = false;


                }else{

                  this.useAlert('error',res.message,function () {});
                  this.dialogVisibleAddSubject = true;
                }

          })
        }).catch((res) => {

        });
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import "../../../resources/front/css/common/adm-stu-tea-mgt.css";
.subjectManagement{
  padding: 20px;
}
.subjectManagement .subjectMgt-header{
  text-align: left;
  position: relative;
  z-index: 10;

}
.subjectManagement .subjectMgt-body{
  /* margin-top: 10px; */
  padding: 20px;
  border:1px solid  #cbdcec;
  position: relative;
  z-index: 0;
  top: -1px;
}
.subjectManagement .table-wrap{
  /* overflow-y: hidden; */
  padding-bottom: 30px;
}
.subjectManagement .table-wrap.scroll{
  overflow-x: auto;
}
.subjectManagement .subjectMgt-body-tool{
  text-align: right;
  margin-bottom: 10px;
}
.subjectManagement .subjectMgt-body table{
  width: 100%;
  text-align: center;
  font-size: 14px;
}
.subjectManagement .subjectMgt-body .cell{
  width: 80px;
}
.subjectManagement .subjectMgt-body table th{
  text-align: center;
  color: #007dc4;
  border: 1px solid #a5defa;
  height: 40px;
  position: relative;
  overflow: hidden;
}
.subjectManagement .subjectMgt-body table th:first-child:hover{
  background: none;
  color: #007dc0;
}
.subjectManagement .subjectMgt-body table tr:nth-child(2n) td:first-child:hover{
  background: #f9f9f9;
}
.subjectManagement .subjectMgt-body table td:first-child:hover{
  background: none;
  color: #333;
}
.subjectManagement .subjectMgt-body table th:hover{
  background: #0d9ee9;
  color: #fff;
}
.subjectManagement .subjectMgt-body table td{
  border: 1px solid #dfe6ec;
  height: 40px;
  position: relative;
}

.subjectManagement table  .tooltip-warp{
  position: relative;


}

.subjectManagement table th .tooltip-warp{
  display: inline-block;
  left:0px;
  transition:all 0.1s;
}
.subjectManagement table td .tooltip-warp{
  display: block;
}
.subjectManagement th:hover .tooltip-warp{
  left:-15px;

}
.subjectManagement th  .tooltip-warp .subject-name{


}
.subjectManagement th:hover  .tooltip-warp .subject-name{
  width: 40px;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.subjectManagement .subjectMgt-body table th:hover .tooltip-content,
.subjectManagement .subjectMgt-body table td:hover .tooltip-content{
  visibility: visible;
  opacity: 1;
  transition:all 0.5s;

}
.subjectManagement .fullCell,
.subjectManagement .icon-new{
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  color: #c9c9c9;
}
.subjectManagement .icon-new:before{
  position: absolute;
  /* content:'+'; */
  top: 50% ;
  left: 50%;
  transform:translate(-50%,-50%);
  z-index: 0;
}
.subjectManagement .tooltip-content{
  font-size: 12px;
  position: absolute;
  padding: 5px;
  right: -30px;
  white-space: nowrap;
  top: 50%;
  transform: translate(0,-50%);
  z-index: 1000;

  color: #fff;
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
}
.subjectManagement .subjectMgt-body table td .tooltip-content{
  background: #fff;
  top: 23px;
  /* padding: 0 10px; */
  right:-80px;
  border: 1px solid #dedede;
  padding: 0;
}


/* .teacherName{
  width: 100%;
  height: 100%;
} */
.subjectManagement .subjectMgt-body table td .tooltip-content .item{
  text-align: left;
  width: 65px;
  line-height: 34px;
  color: #666;
  border-bottom: 1px dashed #e7e7e7;
  padding: 0 10px;
}
.subjectManagement .subjectMgt-body table tr:nth-child(2n) td:hover,
.subjectManagement .subjectMgt-body table td:hover{
  background: #0d9ee9;
}
.subjectManagement .subjectMgt-body table td:hover .tooltip-warp.fullCell{
  background: none;
}
.subjectManagement .subjectMgt-body table td .teacherName{
  width: 80px;
  overflow: hidden;
  display: inline-block;
  white-space: nowrap;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.subjectManagement .subjectMgt-body table td:hover .teacherName{
  color: #fff;
}
.subjectManagement .subjectMgt-body table td .tooltip-content .item:hover{
  background: #0d9ee9;
  color: #fff;
  border-bottom: 1px solid #0d9ee9;
}
.subjectManagement .subjectMgt-body table td .tooltip-content .item:hover  [class^=icon-]{
  color: #fff;

}
.subjectManagement .subjectMgt-body table td .tooltip-content .item:last-child{
  border-bottom: 1px solid #fff;
}
.subjectManagement .subjectMgt-body table td .tooltip-content .item:hover:last-child{
  border-bottom: 1px solid #0d9ee9;
}
.subjectManagement .subjectMgt-body table td .tooltip-content:after{
  position: absolute;
  content: '';
  height: 0;
  width: 0;
  border-width: 5px;
  border-style: dashed solid  dashed    dashed  ;
  border-color:  transparent #e7e7e7  transparent   transparent ;
  left: -10px;
  top: 15px;
}
.subjectManagement .subjectMgt-body table td:last-child .tooltip-content{
  right:60px;
}
.subjectManagement .subjectMgt-body table td:last-child .tooltip-content:after{
  border-style: dashed   dashed    dashed  solid;
  border-color:  transparent   transparent   transparent #e7e7e7;
  left:85px;
}
.subjectManagement .el-button a{
  color: #fff;
}
/* .subjectManagement .el-radio-button{
  margin-right: 15px;
} */
.subjectManagement .el-radio-button:first-child .el-radio-button__inner{
  border-left: 1px solid #cbdcec;
}
.subjectManagement .el-radio-button.is-active .el-radio-button__inner:after{
  position: absolute;
  border-top: 3px solid #0d9ee9;
  top:0;
  left: 0;
  content:'';
  width: 100%;
}
.subjectManagement .el-radio-button.is-active .el-radio-button__inner{
  /* border: 1px solid #20a0ff; */
  background: none;
  color: #20a0ff;
  box-shadow: 0 0 0 0 #20a0ff;
  border-bottom: 1px solid #fff;
}
.subjectManagement .el-radio-button .el-radio-button__inner{
  /* border: 1px solid #bfcbd9; */
  padding: 10px 20px;
  border: 1px solid #cbdcec;
  border-left: 0;
}
.subjectManagement .el-radio-button:last-child .el-radio-button__inner,
.subjectManagement .el-radio-button:first-child .el-radio-button__inner{
  border-radius:0;
}

.subjectMgt-body.table-striped tr:nth-child(2n) td{
  background: #f9f9f9;
}
.subjectManagement .noData{
  margin-bottom: 40px;
}
</style>
