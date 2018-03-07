<template>
  <div id="classManagement">
    <div class="school-year">
      <i class="school-year-icon"></i>
      <span class="school-year-text">{{ schoolYear }}</span>
      <div class="remark">
        <span>注：</span>
        <i class="icon-headmaster color-ff9c00"></i>
        <span style="margin-right: 20px; color: #666;">有班主任</span>
        <i class="icon-headmaster color-0d9ee9"></i>
        <span>无班主任</span>
      </div>
    </div>
    <div class="grade-boxs-wrapper" v-loading="listLoading">
      <div class="clearfix grade-boxs" :style="{width: gradeBoxWidth}">
        <div class="grade-box" :class="{'grade-box-big': gradeList.length <= 6}" v-for="gradeItem in gradeList" :key="gradeItem.index">
          <div class="grade-btn btn">{{ gradeItem.name }}</div>
          <div class="class-box" v-for="classItem in gradeItem.classList">
            <div class="class-btn btn"> {{ classItem.name }}</div>
            <div class="class-edit-box">
              <el-tooltip class="item" effect="dark" :content="classItem.teacherName" placement="top-start" :disabled="classItem.teacherName.length <= 7">
                <div class="edit-btn" style="overflow: hidden; text-overflow: ellipsis;">
                  <i class="icon-account" style="font-size: 14px; display: inline-block; margin-right: 5px; vertical-align: baseline;"></i>
                  <span>班主任：{{ classItem.teacherName }}</span>
                </div>
              </el-tooltip>
              <div class="edit-btn" @click="editFormDialog(classItem, gradeItem.index)">
                <i class="icon-edit" style="font-size: 12px; display: inline-block; margin-right: 5px; vertical-align: baseline;"></i>
                <span>编辑</span>
              </div>
              <div class="edit-btn" @click="deleteDialog(classItem)">
                <i class="icon-delete" style="font-size: 12px; display: inline-block; margin-right: 5px; vertical-align: baseline;"></i>
                <span>删除</span>
              </div>
            </div>
            <i class="has-teacher icon-headmaster" :class="{'color-0d9ee9': !classItem.teacherName, 'color-ff9c00': classItem.teacherName}"></i>
          </div>
          <div class="addclass-btn btn">
            <el-button @click="addFormDialog(gradeItem.index)" type="primary" size="mini">新增班</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--新增界面-->
    <el-dialog v-model="addFormVisible" title="新增班级" size="small" top="50%" :close-on-click-modal="false" @close="resetAddForm('addForm')" class="form-dialog">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="94px" class="addForm">
        <el-form-item label="班级名称：" prop="name">
          <el-input v-model="addForm.name" placeholder="格式：一班，1班，一，1"></el-input>
        </el-form-item>
        <el-form-item label="选择班主任：" prop="teacherIdOld">
          <el-select v-model="addForm.teacherIdOld" filterable placeholder="请选择">
            <el-option
              v-for="item in teacherList" :key="item.id"
              :label="item.name + ' ' + item.phone"
              :value="item.id + ''">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetAddForm('addForm')">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">确定</el-button>
      </span>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog v-model="editFormVisible" title="编辑班级" size="small" top="50%" :close-on-click-modal="false" class="form-dialog">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="94px" class="editForm">
        <el-form-item label="班级名称：" prop="name" placeholder="格式：一班，1班，一，1">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="选择班主任：" prop="teacherIdNow">
          <el-select v-model="editForm.teacherIdNow" filterable placeholder="请选择">
            <el-option
              v-for="item in teacherList" :key="item.id"
              :label="item.name + ' ' + item.phone"
              :value="item.id + ''">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'classManagement',
    data () {
      return {
        schoolId: JSON.parse(localStorage.userInfo).schools.schoolId, //学校id
        schoolYear: '',
        gradeList: [],  //年级列表
        gradeBoxWidth: '',
        listLoading: false, //加载列表loading图
        teacherList: [],  //教师列表
        gradeIndex: '', //当前年级id
        classIndex: '', //当前班级id
        classTeacherId: '', //当前班级班主任id
        addFormVisible: false, //新增界面是否显示
        addLoading: false,
        //新增界面数据
        addForm: {
          name: '',
          teacherIdOld: ''
        },
        addFormRules: {
          name: [
            {required: true, message: '请输入班级名称', trigger: 'blur'},
            {min: 1, max: 4, message: '班级最多可输入4个字', trigger: 'blur'}
          ],
          teacherIdOld: [
//            {required: true, message: '请选择班主任', trigger: 'blur'}
          ]
        },
        editFormVisible: false, //编辑界面是否显示
        editLoading: false,
        //编辑界面数据
        editForm: {
          name: '',
          teacherIdNow: '',
          teacherIdOld: ''
        },
        editFormRules: {
          name: [
            {required: true, message: '请输入班级名称', trigger: 'blur'},
            {min: 1, max: 4, message: '班级最多可输入4个字', trigger: 'blur'}
          ],
          teacherIdNow: [
//            {required: true, message: '请选择班主任', trigger: 'blur'}
          ]
        },
      }
    },
    computed: {
    },
    methods: {
      //获取年级列表
      getGradeList(params) {
        var _this = this;
        this.listLoading = true;
          this.$ajax('teacher/getGradeList', params).then( res => {
            this.listLoading = false;
            if ( res.code === '200' ) {
              _this.gradeList = res.data;
              _this.gradeBoxWidth = (res.data.length * 109 < 984 ? 984 : res.data.length * 109) + 'px';
            } else {
              _this.useAlert('error', res.message, function() {});
            }
        } );
      },
      //新增班弹框
      addFormDialog(gradeIndex) {
        var _this = this;
        var params = Object.assign({}, {schoolId: this.schoolId});
//        this.addForm = {
//          name: '',
//          teacherIdOld: ''
//        };
        this.gradeIndex = gradeIndex;
        this.$ajax('teacher/schoolAllTeacher', params).then( res => {
          if ( res.code === '200' ) {
            if ( res.data.length > 0 ) {
              _this.teacherList = res.data;
              _this.addFormVisible = true;
            } else {
              this.$confirm('教师列表为空，请前往教师管理界面维护教师信息', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(function() {
                _this.$router.push({path: '/teacherManagement'});
//                alert('跳转到教师管理界面！');
              }).catch(function() {
              })
            }
          } else {
            _this.useAlert('error', res.message, function() {});
          }
        } );
      },
      resetAddForm(formName) {
        this.addFormVisible = false;
        this.resetForm(formName);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //新增
      addSubmit() {
        var _this = this;
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            _this.addLoading = true;
            var params = Object.assign({}, _this.addForm, { schoolId: _this.schoolId, gradeIndex: _this.gradeIndex, teacherIdNow: _this.addForm.teacherIdOld});
            _this.$ajax('teacher/saveClassOne', params).then( (res) => {
              _this.addLoading = false;
              if ( res.code === '200' ) {
                _this.useAlert('success', res.message, function() {});
                _this.$refs['addForm'].resetFields();
                _this.addFormVisible = false;
                _this.getGradeList({schoolId: _this.schoolId});
              } else {
                _this.useAlert('error', res.message, function() {});
              }
            } );
          }
        });
      },
      //编辑班级弹框
      editFormDialog(classItem, gradeIndex) {
        var _this = this;
        this.classIndex = classItem.index;
        this.gradeIndex = gradeIndex;
        this.classTeacherId = classItem.teacherIdOld;
        var params = Object.assign({}, {teacherId: this.classTeacherId, classIndex: this.classIndex, schoolId: this.schoolId});
        this.editForm.name = classItem.name;
        var url = '';
        if ( !!this.classTeacherId ) {
          //有班主任
          url =  'teacher/showClassTeacher';
        } else {
          url =  'teacher/schoolAllTeacher';
          this.editForm.teacherIdNow = this.editForm.teacherIdOld = '';
        }
        this.$ajax(url, params).then( res => {
          if ( res.code === '200' ) {
            _this.editFormVisible = true;
            _this.teacherList = res.data;
            res.data.forEach((item, index) => {
              if ( item.baDing ) {
                _this.editForm.teacherIdNow = _this.editForm.teacherIdOld = item.id + '';
              }
            });
          } else {
            _this.useAlert('error', res.message, function() {});
          }
        } );
      },
      //编辑提交
      editSubmit() {
        var _this = this;
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            _this.editLoading = true;
            var params = Object.assign({}, _this.editForm, { schoolId: _this.schoolId, index: _this.classIndex, gradeIndex: this.gradeIndex});
            _this.$ajax('schadmin/updateOne', params).then( (res) => {
              _this.editLoading = false;
              _this.editFormVisible = false;
              if ( res.code === '200' ) {
                _this.useAlert('success', res.message, function() {});
                _this.editFormVisible = false;
                _this.getGradeList({schoolId: _this.schoolId});
              } else {
                var message = res.message || '网络错误请刷新重试';
                _this.useAlert('error', message, function() {});
              }
            });
          }
        });
      },
      //删除弹框
      deleteDialog(classItem) {
//        console.log(classItem);
        this.classTeacherId = classItem.teacherIdOld;
        this.classIndex = classItem.index;
        var params = Object.assign({}, {classIndex: this.classIndex});
        var _this = this;
        this.$ajax('schadmin/deleteQuery', params).then( res => {
          if ( res.code === '200' ) {
            //班级下无学生，可删除
            _this.$confirm(res.message, '', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(function() {
              _this.deleteOne();
            }).catch(function() {
              console.log('取消')
            })
          } else {
            //班级下有学生，无法删除
            _this.useAlert('error', res.message, function() {});
          }
        } );
      },
      //删除
      deleteOne() {
        var _this = this;
        var params = Object.assign({}, {classIndex: this.classIndex, classTeacherId: this.classTeacherId});
        this.$ajax('schadmin/deleteOne', params).then(function(res) {
          if ( res.code === '200' ) {
            _this.useAlert('success', res.message, function() {});
            _this.getGradeList({schoolId: _this.schoolId});
          } else {
            var message = res.message || '网络错误请刷新重试';
            _this.useAlert('error', message, function() {});
          }
        }, function(err) {})
      },
      //获取当前学年
      getYear() {
        this.$ajax('schadmin/findNowSchoolYear').then((res) => {
          if ( res.code === '200' ) {
            this.schoolYear = res.data + '学年';
          } else {
            var message = res.message || '网络错误请刷新重试';
            this.useAlert('error', message, function() {});
          }
        }, (err) => {});
      }
    },
    beforeMount() {
      this.getGradeList({schoolId: this.schoolId});
      this.getYear();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #classManagement { padding: 20px; min-height: 600px;}
  #classManagement .white-color { color: #fff;}
  #classManagement .school-year { position: relative; margin-bottom: 20px; padding-bottom: 18px; border-bottom: 1px solid #ecedef;}
  #classManagement .school-year-icon { display: inline-block; width: 3px; height: 14px; background: #0e9deb; vertical-align: middle;}
  #classManagement .school-year-text { display: inline-block; font-size: 14px; color: #0d9ee9; font-family: "宋体"; vertical-align: middle;}
  #classManagement .remark { position: absolute; right: 0; top: 0; height: 14px; line-height: 16px; font-size: 14px; color: #666;}
  #classManagement .remark span, #classManagement .remark i { vertical-align: middle; height: 14px; line-height: 16px;}
  #classManagement .grade-boxs-wrapper { width: 984px; overflow-x: auto; overflow-y: hidden; padding-bottom: 40px;}
  #classManagement .grade-box { float: left; margin-right: 7px;}
  #classManagement .grade-box:nth-of-type(2n) { background-color: #f9f9f9;}
  #classManagement .class-box { position: relative;}
  #classManagement .btn { width: 100px; text-align: center;}
  #classManagement .grade-btn { height: 32px; line-height: 32px; font-size: 14px; border: 1px solid #a5defa; color: #007dc4; background: #effaff;}
  #classManagement .class-btn { height: 42px; line-height: 42px; font-size: 14px; color: #666666; border: 1px solid #e1e1e1; border-bottom-color: #efefef; border-top: none;}
  /*#classManagement .class-btn:hover { background-color: #0d9ee9; color: #fff;}*/
  #classManagement .class-box:hover .class-btn { background-color: #0d9ee9; color: #fff;}
  #classManagement .class-box:hover .color-0d9ee9 { color: #fff;}
  #classManagement .class-box:hover .color-ff9c00 { color: #fff;}
  #classManagement .has-teacher { position: absolute; right: 5px; top: 0;}
  #classManagement .color-0d9ee9 { color: #0d9ee9;}
  #classManagement .color-ff9c00 { color: #ff9c00;}
  #classManagement .addclass-btn { width: 84px; border: 1px solid #e1e1e1; border-top: none; height: 28px; line-height: 1; padding: 7px 8px;}
  #classManagement .addclass-btn .el-button { border-radius: 1px; background-color: #1ec56b; border-color: #1ec56b; padding: 0; width: 100%; height: 100%;}
  #classManagement .addclass-btn .el-button:hover { background-color: #43ca8b; border-color: #43ca8b;}
  #classManagement .addclass-btn .el-button:active { background-color: #1fa667; border-color: #1fa667;}
  #classManagement .class-edit-box { position: absolute; left: 101px; top:3px; z-index: 100; padding-left: 7px; padding-right: 1px; width: 152px; height: 110px; background: url("../../../resources/front/imgs/class/border.png") no-repeat center; overflow: hidden; display: none;}
  #classManagement .grade-box:nth-of-type(n+8) .class-edit-box { left: -159px; padding-left: 1px; padding-right: 7px; background-image: url("../../../resources/front/imgs/class/border2.png");}
  #classManagement .class-box:hover .class-edit-box { display: block;}
  #classManagement .edit-btn { padding-left: 14px; height: 35px; line-height: 35px; font-size: 14px; color: #666; cursor: pointer; border-bottom: 1px dotted #e3e3e3; overflow: hidden;}
  #classManagement .edit-btn:nth-of-type(1) { border-radius: 4px 4px 0 0;}
  #classManagement .edit-btn:nth-of-type(3) { border-radius: 0 0 4px 4px;}
  #classManagement .edit-btn:hover { background-color: #0d9ee9; color: #fff; border: 1px solid #0d9ee9;}
  #classManagement .edit-btn:last-child { border-bottom: none;}
  /*#classManagement .form-dialog .el-dialog{ max-width: 390px;}
  #classManagement .form-dialog .el-dialog__body { padding: 30px 33px 30px 20px;}*/
  #classManagement .el-loading-spinner { margin-top: 0;}
  /*年级个数6及以下样式处理*/
  #classManagement .grade-box-big { margin-right: 12px;}
  #classManagement .grade-boxs .grade-box-big:nth-last-of-type(1) { margin-right: 0;}
  #classManagement .grade-box-big .btn { width: 152px;}
  #classManagement .grade-box-big .addclass-btn { padding: 7px 16px; width: 120px; height: 28px;}
  #classManagement .grade-box-big .addclass-btn .el-button { padding: 0; width: 100%; height: 100%; line-height: 1;}
  #classManagement .grade-box-big .class-edit-box { left: 153px;}
  #classManagement .grade-box-big:nth-of-type(6) .class-edit-box { left: -159px; padding-left: 1px; padding-right: 7px; background-image: url("../../../resources/front/imgs/class/border2.png");}
</style>
