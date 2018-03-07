<template>
  <div class="admin">
    <!-- <left-sidebar></left-sidebar> -->
    <!-- <right-wrap></right-wrap> -->

    <div class="main-content" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="tabs">
        <!-- type="border-card" -->
        <el-tabs>
          <el-tab-pane label="教师基本信息">
            <div class="tabs-header text-right">
              <el-button type="success" icon="edit" @click="editOrgInfoForm" v-if="!isEditing">编辑</el-button>
              <el-button type="success" icon="edit" @click="cancelOrgInfoForm" v-if="isEditing">取消</el-button>
              <el-button type="success" icon="edit" @click="saveOrgInfoForm" v-if="isEditing">保存</el-button>
            </div>


            <div class="tabs-body">
              <el-form ref="form" :model="orgInfoForm" :rules="orgInfoRules" label-width="170px" class="edit"
                       :class="[{ editing: isEditing }] ">
                <el-form-item label="姓名：" prop="orgInfoName">
                  <el-input v-model="orgInfoForm.name"></el-input>
                  <p> {{ orgInfoForm.name }} </p>
                </el-form-item>
                <el-form-item label="性别：" prop="sex">
                  <el-radio-group  v-model="orgInfoForm.sex">
                    <el-radio label="1" >男</el-radio>
                    <el-radio label="2">女</el-radio>
                   </el-radio-group>
                  <p v-if="orgInfoForm.sex =='1'">男</p>
                  <p v-if="orgInfoForm.sex =='2'">女</p>

                </el-form-item>

                <!--民族-->
                <minority>   </minority><p style="position: absolute;top:166px;
    left: 170px;
">{{orgInfoForm.national}}</p>

                <!--手机-->
                <el-form-item label="手机号码：" prop="phone">
                  <el-input v-model="orgInfoForm.phone"></el-input>
                  <p> {{ orgInfoForm.phone }} </p>
                </el-form-item>
                <!--身份证号-->
                <el-form-item label="身份证号：" prop="idCard">
                  <el-input v-model="orgInfoForm.idCard"></el-input>
                  <p> {{ orgInfoForm.idCard }} </p>
                </el-form-item>
                <!--第一学历-->
                <el-form-item label="教龄（年）：" prop="schoolAge">
                  <el-input v-model="orgInfoForm.schoolAge"></el-input>
                  <p> {{ orgInfoForm.schoolAge }} </p>
                </el-form-item>
                <el-form-item label="第一学历：" prop="firstEducation">
                  <el-select v-model="orgInfoForm.firstEducation" placeholder="请选择学历" required>
                    <el-option label="高中" value="高中">高中</el-option>
                    <el-option label="中专"  value="中专">中专</el-option>
                    <el-option label="大专" value="大专">大专</el-option>
                    <el-option label="本科" value="本科">本科</el-option>
                    <el-option label="硕士及以上" value="硕士及以上">硕士及以上</el-option>
                    <el-option label="其他" value="其他">其他</el-option>
                  </el-select>
                  <p> {{ orgInfoForm.firstEducation }} </p>
                </el-form-item>
                <el-form-item label="毕业学校：" prop="firstGraduatedFromSchool">
                  <el-input v-model="orgInfoForm.firstGraduatedFromSchool"></el-input>
                  <p>{{ orgInfoForm.firstGraduatedFromSchool }}</p>
                </el-form-item>
                <el-form-item label="高校类别：" prop="firstSchoolType">
                  <el-select v-model="orgInfoForm.firstSchoolType" placeholder="请选择高校类别">
                    <el-option label="本科提前批次" value="本科提前批次" >本科提前批次</el-option>
                    <el-option label="本科第一批次" value="本科第一批次">本科第一批次</el-option>
                    <el-option label="本科第二批次"  value="本科第二批次">本科第二批次</el-option>
                    <el-option label="本科第三批次" value="本科第三批次">本科第三批次</el-option>
                    <el-option label="专科" value="专科">专科</el-option>
                    <el-option label="其他" vlaue="其他">其他</el-option>
                  </el-select>
                  <p> {{ orgInfoForm.firstSchoolType }} </p>
                </el-form-item>
                <el-form-item label="是否为师范专业：" prop="firstIfNormal">
                  <el-radio-group v-model="orgInfoForm.firstIfNormal">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p v-if="orgInfoForm.firstIfNormal =='1'">是</p>
                  <p v-if="orgInfoForm.firstIfNormal =='0'">不是</p>
                  <p v-else></p>
                </el-form-item>
                <el-form-item class="block" label="毕业时间：" prop="firstGraduationOfYear">
                  <el-date-picker
                    v-model="orgInfoForm.firstGraduationOfYear"
                    align="right"
                    type="year"
                    placeholder="选择年">
                  </el-date-picker>
                  <p>{{orgInfoForm.firstGraduationOfYear}}</p>
                </el-form-item>
                <!--第二学历-->
                <el-form-item label="最高学历：" prop="highestEducation">
                  <el-select v-model="orgInfoForm.highestEducation" placeholder="请选择父亲学历">
                    <el-option label="高中" value="高中">高中</el-option>
                    <el-option label="中专" value="中专">中专</el-option>
                    <el-option label="大专" value="大专">大专</el-option>
                    <el-option label="本科" value="本科">本科</el-option>
                    <el-option label="硕士及以上" value="硕士及以上">硕士及以上</el-option>
                    <el-option label="其他" value="其他">其他</el-option>
                  </el-select>
                  <p>{{orgInfoForm.highestEducation}}</p>
                </el-form-item>

                <el-form-item label="考取途径：" prop="highestSchoolType">
                  <el-select v-model="orgInfoForm.highestSchoolType" placeholder="请选择考取">
                    <el-option label="统招" value="统招">统招</el-option>
                    <el-option label="自考" value="自考">自考</el-option>
                    <el-option label="成招" value="成招">成招</el-option>
                    <el-option label="专升本" value="专升本">专升本</el-option>
                    <el-option label="在职" value="在职">在职</el-option>
                    <el-option label="其他"  value="其他">其他</el-option>
                  </el-select>
                  <p>{{orgInfoForm.highestSchoolType}}</p>
                </el-form-item>

                <el-form-item label="毕业学校：" prop="highestGraduatedFromSchool">
                  <el-input v-model="orgInfoForm.highestGraduatedFromSchool"></el-input>
                  <p>{{orgInfoForm.highestGraduatedFromSchool}}</p>
                </el-form-item>

                <el-form-item label="是否为师范专业：" prop="highestIfNormal">
                  <el-radio-group v-model="orgInfoForm.highestIfNormal">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p v-if="orgInfoForm.highestIfNormal =='1'">是</p>
                  <p v-if="orgInfoForm.highestIfNormal =='0'">不是</p>
                  <p v-else></p>
                </el-form-item>

                <el-form-item class="block" label="毕业时间：" prop="highestGraduationOfYear">
                  <el-date-picker
                    v-model="orgInfoForm.highestGraduationOfYear"
                    align="right"
                    type="year"
                    placeholder="选择年">
                  </el-date-picker>
                  <p >{{orgInfoForm.highestGraduationOfYear}}</p>
                </el-form-item>


                <div class="title"><i></i>
                  <span>教师任教信息</span></div>
                <el-form-item label="职称：" prop="jobTitle">
                  <el-select v-model="orgInfoForm.jobTitle" placeholder="请选择职称">
                    <el-option label="正高级" value="高中"></el-option>
                    <el-option label="高级" value="专科"></el-option>
                    <el-option label="一级" value="专科"></el-option>
                    <el-option label="二级" value="专科"></el-option>
                    <el-option label="三级" value="专科"></el-option>
                    <el-option label="无" value="专科"></el-option>
                  </el-select>
                  <p>{{orgInfoForm.jobTitle}}</p>
                </el-form-item>

                <el-form-item label="是否为教务主任：" prop="educationLeader">
                  <el-radio-group v-model="orgInfoForm.educationLeader">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p v-if="orgInfoForm.educationLeader =='1'">是</p>
                  <p v-if="orgInfoForm.educationLeader =='0'">不是</p>
                  <p v-else></p>
                </el-form-item>

                <el-form-item label="是否为年级主任/组长：" prop="classTeacher">
                  <el-radio-group v-model="orgInfoForm.classTeacher">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p v-if="orgInfoForm.classTeacher =='1'">是</p>
                  <p v-if="orgInfoForm.classTeacher =='0'">不是</p>
                  <p v-else></p>
                </el-form-item>

                <el-form-item label="民办教师：" prop="privateTeacher">
                  <el-radio-group v-model="orgInfoForm.privateTeacher">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p v-if="orgInfoForm.privateTeacher =='1'">是</p>
                  <p v-if="orgInfoForm.privateTeacher =='0'">不是</p>
                  <p v-else></p>
                </el-form-item>

                <el-form-item label="骨干教师：" prop="backboneTeacher">
                  <el-radio-group v-model="orgInfoForm.backboneTeacher">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p v-if="orgInfoForm.backboneTeacher =='1'">是</p>
                  <p v-if="orgInfoForm.backboneTeacher =='0'">不是</p>
                  <p v-else></p>
                </el-form-item>

                <el-form-item label="学科带头人：" prop="theLeader">
                  <el-radio-group v-model="orgInfoForm.theLeader">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p v-if="orgInfoForm.theLeader =='1'">是</p>
                  <p v-if="orgInfoForm.theLeader =='0'">不是</p>
                </el-form-item>

                <el-form-item label="专、兼职教研员：" prop="fullOrNot">
                  <el-radio-group v-model="orgInfoForm.fullOrNot">
                    <el-radio label="专职" value="专职"></el-radio>
                    <el-radio label="兼职" value="兼职"></el-radio>
                  </el-radio-group>
                 <p>{{orgInfoForm.fullOrNot}}</p>
                </el-form-item>

                <el-form-item label="近三年获奖或发表文章情况:（按照奖项、获奖时间、获奖级别、获奖内容顺序填写）" prop="desc">
                  <el-input type="textarea"  v-model="orgInfoForm.desc" class="item-text"></el-input>
                  <p> {{ orgInfoForm.desc }} </p>
                </el-form-item>

              </el-form>
            </div>
          </el-tab-pane>


        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  // import leftSidebar from './leftSidebar.vue';
  // import rightWrap from './rightWrap.vue';
  import Minority from '@/pages/components/Minority'


  export default {
    name: 'admin',
    data() {
      return {
        // 全屏遮罩层
        fullscreenLoading: false,
        // 编辑输入框
        orgInfoForm: {
          name: '',
          sex:'',
          phone: '',
          idCard: '',
          schoolAge: '',
          firstEducation:'',
          firstGraduatedFromSchool:'',
          firstSchoolType:'',
          firstIfNormal:'',
          firstGraduationOfYear:'',
          highestEducation:'',
          highestGraduatedFromSchool:'',
          highestSchoolType:'',
          highestIfNormal:'',
          highestGraduationOfYear:'',

          jobTitle: '',
          educationLeader: '',
          classTeacher: '',
          privateTeacher: '',
          backboneTeacher: '',
          theLeader: '',
          fullOrNot: '',
          desc: '',
        },
        sex:'',
        // 校验
        orgInfoRules: {
          orgInfoName: [
            {required: true, message: '请输入机构名称', trigger: 'blur'},
            {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'},
            { pattern:/^[A-Za-z0-9]+$/, message: '用户名只能为字母和数字'}
          ],
          national: [
            {required: true, message: '请输入电话号码', trigger: 'change'},
          ],
          phone: [
            {required: true, message: '请输入电话号码', trigger: 'change'},
            { pattern:/^1[34578]\d{9}$/, message: '请输入中国国内的手机号码'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'},
          ],
          education: [
            {required: true, message: '请选择学历', trigger: 'change'},
          ],
          //职称
          jobTitle: [
            {required: true, message: '请选择职称', trigger: 'change'},
          ],
        },
        // 机构列表
        orgListsData: [],
        // 文本搜索
        searchText: '',

        // 选择机构id
        chooseOrgId: '',
        // 客户来源
        organizationSource: '',
        // 机构类型

        // 编辑切换
        isEditing: false,
        // 机构人员
        orgUsers: [],
        // 机构人员总数
        orgUserTotal: 0,


        // 隐藏对话框
        dialogVisibleAdd: false,
        dialogVisibleEdit: false,
      }
    },
    mounted(){
      // this.getOrgUserLists()
      // this.getOrgInfo(this.orgInfoId)
      this.getOrgInfo()
    },
    methods: {


      // 获取机构信息
      getOrgInfo(id){
        this.$ajax('/teacher/ceneter/getInfo',)

          .then(res => {
            this.orgInfoForm = res.data;
          });
      },

      // 编辑机构信息（改为编辑状态）
      editOrgInfoForm(){

        this.isEditing = true;



      },
      // 选择机构
      chooseOrg(){

      },
      // 取消机构信息
      cancelOrgInfoForm(){
        this.isEditing = false;
      },
      // 保存机构信息（编辑后保存）
      saveOrgInfoForm(){
        console.log(22)
        console.log(this.orgInfoForm)
        this.$ajax('teacher/ceneter/getInfo', this.orgInfoForm)
          .then(res => {
            console.log(res.data)
            this.orgListsData = res.data
            alert(orgListsData)
          });
      },
    },
    components: {
      Minority
    },
    watch: {
      searchText(val) {
        this.$refs.orgLists.filter(val);
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .admin {
    margin-top: 15px;
    height: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }

  .menus {
    width: 200px;
    border: 1px solid #20A0FF;
  }

  .menus-head {
    background: #20A0FF;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .menus-head .title {
    font-size: 14px;

  }

  .menus-head .add-btn {
    color: #fff;
    border: 1px solid #fff;
    font-size: 12px;
    padding: 2px;
  }

  .seach-bar {
    padding: 10px;
  }

  .seach-bar input {
    height: 30px;
    width: 100%;
    border: 1px solid #20A0FF;
  }

  .main-content {
    width: 800px;
  }

  /* .tabs .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    border-top: 3px solid;
  }
  .tabs .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    border-top: 3px solid;
  } */

  .el-tabs__active-bar {
    top: 0;
  }

  .el-tree-node.is-current {
    color: #20A0FF;
  }

  .tabs-header {

    margin-bottom: 10px;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .space-between {
    display: flex;
    justify-content: space-between;
  }

  .space-around {
    display: flex;
    justify-content: space-around;
  }

  .tabs-header .editor {
    padding: 10px;
    display: block;
  }

  /* .el-form-item.is-required .el-form-item__label:before{
    content: '•';
    color: #999;
  } */

  .edit .el-input {
    display: none;
  }
  .edit .el-radio-group  {
    display: none;
  }
  .edit .el-input,.el-select,el-autocomplete {
    display: none;
  }
  .edit.editing .el-input,.el-select,el-autocomplete{
    display: block;
  }
  .edit.editing .el-radio-group {
    display: block;
  }
  .edit.editing p {
    display: none;
  }
  .item-text{
    display: none;
    /* display: inline-block; */
  }
  .edit.editing .item-text{
    display: inline-block;
    width: 200px;
  }
  .pagination {
    margin-top: 30px;
  }

  b {
    font-weight: normal;
  }
  /*标题样式*/
  .title{
    padding: 20px 0 18px 0;
    /* border-bottom: 1px solid #e9edf1;*/
  }
  .title i{
    display: inline-block;
    height:16px;
    width:3px;
    margin-right:7px;
    background:#0d9ee9 ;
  }
  .title span{
    font-size:14px;
    color: #0d9ee9;
    display:inline-block;
    line-height: 12px;
  }
</style>
