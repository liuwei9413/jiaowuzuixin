<template>
  <div id="teacherPersonal" v-loading.lock="fullscreenLoading">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="教师基本信息" name="teacherpersonageinfo">
        <section>
          <!-- <left-sidebar></left-sidebar> -->
          <!-- <right-wrap></right-wrap> -->

          <div class="main-content" >
            <div id="editteachers" class="addeditinfo">

              <div class="btns tabs-header text-right">
                <!--   <el-button type="text" class="text-left"> <router-link :to="{ path:  '/teacherManagement' }" >< 返回 </router-link></el-button>-->
                <el-button type="success"  @click="editOrgInfoForm" v-if="type != 'detail' && !isEditing">
                  编辑
                </el-button>
                <el-button type="info"  @click="cancelOrgInfoForm" v-if="isEditing">取消</el-button>
                <el-button type="success" class="white-color  el-button el-button--primary" @click="saveteacherInfoForm" v-if="isEditing">保存</el-button>
              </div>

              <!-- type="border-card" -->


              <el-form ref="form" :model="teacherInfoForm" :rules="teacherInfoRules" label-width="200px" class="edit"
                       :class="[{ editing: isEditing }] ">
                <div class="blackDiv1">

                <div class="title"><i></i><span>教师基本信息</span></div>
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="teacherInfoForm.name"  class="inputWidth" :maxlength="40"></el-input>
                  <p class="pcolor"> {{ teacherInfoForm.name }} </p>
                </el-form-item>
                <el-form-item label="所带班级年级：" v-if="isshowgradeClass">
                  <div > {{ gradeClass }} </div>
                </el-form-item>
                <el-form-item label="担任班主任总年限：" prop="teacherAge">
                  <el-input v-model="teacherInfoForm.teacherAge"  class="inputWidth" :maxlength="2"></el-input>
                  <p class="pcolor"> {{ teacherInfoForm.teacherAge }} </p>
                </el-form-item>
                <el-form-item label="性别：" prop="sex">
                  <el-radio-group v-model="teacherInfoForm.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                  </el-radio-group>
                  <p class="pcolor"  v-if="teacherInfoForm.sex =='1'">男</p>
                  <p class="pcolor" v-else="teacherInfoForm.sex =='2'">女</p>
                </el-form-item>
                <!--民族-->
                <el-form-item label="民族："  prop="national" >
                  <el-select v-model="teacherInfoForm.national"   class="inputWidth" filterable placeholder="请选择民族">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p class="pcolor">{{teacherInfoForm.national}}</p>
                </el-form-item>
                <!--手机-->
                <el-form-item label="手机号码：" prop="phone">
                  <!-- <el-input v-model="orgInfoForm.phone"></el-input>-->
                  <div> {{ teacherInfoForm.phone }} &nbsp&nbsp&nbsp<a href="javascript:" class="changephone" @click="UpdPhone()">手机号码变更</a></div>

                </el-form-item>
                <el-form-item label="身份证号：" prop="idCard">
                  <el-input v-model="teacherInfoForm.idCard"  class="inputWidth" :maxlength="18"></el-input>
                  <p class="pcolor">{{teacherInfoForm.idCard}}</p>
                </el-form-item>
                <el-form-item label="教龄：" prop="schoolAge">
                  <el-input v-model="teacherInfoForm.schoolAge"  class="inputWidth" :maxlength="2"></el-input>
                  <p class="pcolor"> {{ teacherInfoForm.schoolAge }} </p>
                </el-form-item>
                <!--第一学历-->
                <el-form-item label="第一学历：" prop="education">
                  <el-select v-model="teacherInfoForm.education" class="inputWidth"  placeholder="请选择第一学历" required>
                    <el-option
                      v-for="item in maxEducation"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p class="pcolor"> {{ teacherInfoForm.education }} </p>
                </el-form-item>
                <el-form-item label="毕业学校：" prop="graduatedFromSchool">
                  <el-input v-model="teacherInfoForm.graduatedFromSchool" class="inputWidth" ></el-input>
                  <p class="pcolor">{{ teacherInfoForm.graduatedFromSchool }}</p>
                </el-form-item>
                <el-form-item label="高校类别：" prop="schoolType">
                  <el-select v-model="teacherInfoForm.schoolType" class="inputWidth"  placeholder="请选择高校类别">
                    <el-option
                      v-for="item in schoolType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p class="pcolor"> {{ teacherInfoForm.schoolType }}</p>
                </el-form-item>
                <el-form-item label="是否为师范专业：" prop="ifNormal">
                  <el-radio-group v-model="teacherInfoForm.ifNormal">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p  class="pcolor"  v-if="teacherInfoForm.ifNormal =='1'">是</p>
                  <p  class="pcolor" v-else-if="teacherInfoForm.ifNormal =='0'">否</p>
                  <p  class="pcolor" v-else></p>
                </el-form-item>
                <el-form-item class="block" label="毕业时间：" prop="graduationOfYear">
                  <el-date-picker
                    v-model="teacherInfoForm.graduationOfYear"
                    align="right"
                    type="year"
                    style="width:652px;"
                    placeholder="请选择毕业时间">
                  </el-date-picker>
                  <p class="pcolor">{{teacherInfoForm.graduationOfYear}}</p>
                </el-form-item>
                <!--第二学历-->
                <el-form-item label="最高学历：" prop="maxEducation">
                  <el-select v-model="teacherInfoForm.maxEducation"  class="inputWidth" placeholder="请选择最高学历">
                    <el-option
                      v-for="item in maxEducation"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p class="pcolor">{{teacherInfoForm.maxEducation}}</p>
                </el-form-item>
                <el-form-item label="考取途径：" prop="maxGetTheWay">
                  <el-select v-model="teacherInfoForm.maxGetTheWay"  class="inputWidth" placeholder="请选择考取途径">
                    <el-option
                      v-for="item in maxGetTheWay"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p class="pcolor">{{teacherInfoForm.maxGetTheWay}}</p>
                </el-form-item>
                <el-form-item label="毕业学校：" prop="maxGraduatedFromSchool">
                  <el-input v-model="teacherInfoForm.maxGraduatedFromSchool"  class="inputWidth"></el-input>
                  <p class="pcolor">{{teacherInfoForm.maxGraduatedFromSchool}}</p>
                </el-form-item>
                <el-form-item label="是否为师范专业：" prop="maxIfNormal">
                  <el-radio-group v-model="teacherInfoForm.maxIfNormal">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p  class="pcolor" v-if="teacherInfoForm.maxIfNormal =='1'">是</p>
                  <p class="pcolor" v-else-if="teacherInfoForm.maxIfNormal =='0'">不是</p>
                  <p class="pcolor" v-else></p>
                </el-form-item>
                <el-form-item class="block" label="毕业时间：" prop="maxGraduationOfYear">
                  <el-date-picker
                    v-model="teacherInfoForm.maxGraduationOfYear"
                    align="right"
                    type="year"
                    style="width: 652px;"
                    placeholder="选择毕业时间">
                  </el-date-picker>
                  <p class="pcolor">{{teacherInfoForm.maxGraduationOfYear}}</p>
                </el-form-item>
                </div>
                <div class="blackDiv2">
                <div class="title title2"><i></i>
                  <span>教师任教信息</span></div>
                <el-form-item label="职称：" prop="jobTitle">
                  <el-select v-model="teacherInfoForm.jobTitle"  class="inputWidth" placeholder="请选择职称">
                    <el-option
                      v-for="item in jobTitle"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p class="pcolor">{{teacherInfoForm.jobTitle}}</p>
                </el-form-item>
                <el-form-item label="是否为教务主任：" prop="educationLeader">
                  <el-radio-group v-model="teacherInfoForm.educationLeader">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p class="pcolor" v-if="teacherInfoForm.educationLeader =='1'">是</p>
                  <p class="pcolor" v-else-if="teacherInfoForm.educationLeader =='0'">不是</p>
                  <p class="pcolor" v-else></p>

                </el-form-item>
                <el-form-item label="是否为年级主任/组长：" prop="classTeacher">
                  <el-radio-group v-model="teacherInfoForm.classTeacher">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p class="pcolor" v-if="teacherInfoForm.classTeacher =='1'">是</p>
                  <p class="pcolor" v-else-if="teacherInfoForm.classTeacher =='0'">不是</p>
                  <p class="pcolor" v-else></p>

                </el-form-item>
                <el-form-item label="民办教师：" prop="privateTeacher">
                  <el-radio-group v-model="teacherInfoForm.privateTeacher">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p class="pcolor" v-if="teacherInfoForm.privateTeacher =='1'">是</p>
                  <p class="pcolor" v-else-if="teacherInfoForm.privateTeacher =='0'">不是</p>
                  <p class="pcolor" v-else></p>

                </el-form-item>
                <el-form-item label="骨干教师：" prop="backboneTeacher">
                  <el-radio-group v-model="teacherInfoForm.backboneTeacher">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p class="pcolor" v-if="teacherInfoForm.backboneTeacher =='1'">是</p>
                  <p class="pcolor" v-else-if="teacherInfoForm.backboneTeacher =='0'">不是</p>
                  <p class="pcolor" v-else></p>
                </el-form-item>
                <el-form-item label="学科带头人：" prop="theLeader">
                  <el-radio-group v-model="teacherInfoForm.theLeader">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p class="pcolor" v-if="teacherInfoForm.theLeader =='1'">是</p>
                  <p class="pcolor" v-else-if="teacherInfoForm.theLeader =='0'">不是</p>
                  <p class="pcolor" v-else></p>
                </el-form-item>
                <el-form-item label="专、兼职教研员：" prop="fullOrNot">
                  <el-select v-model="teacherInfoForm.fullOrNot" class="inputWidth" placeholder="请选择专、兼职教研员">
                    <el-option label="专职" value="专职"></el-option>
                    <el-option label="兼职" value="兼职"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                  <p class="pcolor">{{teacherInfoForm.fullOrNot}}</p>
                </el-form-item>
                <el-form-item class="note"  label="近三年获奖或发表文章情况：（按照奖项、获奖时间、获奖级别、获奖内容顺序填写）" prop="note">
                  <el-input type="textarea" v-model="teacherInfoForm.note" class="item-text" :maxlength="200" style="width: 540px;"></el-input>
                  <p class="pcolor"> {{teacherInfoForm.note }} </p>
                </el-form-item>
                </div>
              </el-form>
            </div>
          </div>
          <!--新增部分-->
          <el-dialog title="手机号码变更" top="50%" v-model="dialogupd" class="dialogupd" :close-on-click-modal="false">

            <div class="Tel_From">
              <el-form :model="UpdateForm" ref="UpdateForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="原始手机号码：" prop="oldtel">
                  <el-input :disabled="true" v-model="UpdateForm.oldtel" placeholder="原始手机号码"></el-input>
                </el-form-item>
                <el-form-item style="text-align:left;" label="短信验证码：" prop="code">
                  <el-row :gutter="20">
                    <el-col :span="14" style="padding:0;height:36px; width:170px">
                      <el-input style="margin-left:0; width:100%" v-model="UpdateForm.code"
                                placeholder="短信验证码："></el-input>
                    </el-col>
                    <el-col :span="8" style="padding-left:8px;">
                      <el-button  :disabled="time"  v-text="Btnmsg" @click="GetVercode()" style="padding:9px 10px;"></el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="新手机号码：" prop="newtel">

                  <el-input v-model="UpdateForm.newtel" placeholder="新手机号码"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="info" style="width:120px;letter-spacing:2px;" @click="ClearTel()">取消</el-button>
              <el-button type="success" style="width:120px;letter-spacing:2px;" @click="SureTel()">确定</el-button>
            </div>

          </el-dialog>
        </section>


      </el-tab-pane>
      <el-tab-pane label="教师执教信息" name="teacherteachinginfo">
        <!--选择教学信息-->
        <div class="teachingMsg">
          <!--<div class="callBackBtn">-->
          <!--<div class="editBtn" :class="{hideStatus: !hideBtnState}">-->
          <!--<el-button @click="editPages" type="success"> <i class="icon-edit svgStyle"></i> 编辑</el-button>-->
          <!--</div>-->
          <!--<div class="hideBtn" :class="{hideStatus: hideBtnState}">-->
          <!--<el-button @click="cancelPages" type="primary"><i class="icon-cancel svgStyle"></i>取消</el-button>-->
          <!--<el-button @click="savePages" type="success"><i class="icon-conserve svgStyle"></i>保存</el-button>-->
          <!--</div>-->
          <!--</div>-->
          <div class="titleContent">
            <i class="title-icon"></i>
            <span class="title-text">任教班级科目</span>
          </div>
          <div class="paddingTen">
            <div class="gradeContent">
              <el-radio-group v-model="currentGradeId" @change="getCurrentGradeId(currentGradeId)">
                <el-radio-button v-for="(item,index) in gradeList" :label="item" :key="index"> {{item.gradeName}}
                </el-radio-button>
              </el-radio-group>
            </div>
            <div class="scoreTable">
                <table class="table" v-for="(item,index) in gradeList" border="1" v-show="item.gradeId == currentGradeId.gradeId" v-if="item.classInfo.length>0">
                  <tr>
                    <th>班级</th>
                    <th v-for="subject in item.classInfo[0].subjectInfo">{{subject.subjectName}}</th>
                  </tr>
                  <tr v-for="classList in item.classInfo">
                    <td :title="classData" ref="td" v-for="classData in classList" v-if="classData == classList.className">{{classData}}</td>
                    <td :title="teacherData.teachingInfo.teacherName" ref="td" v-for="teacherData in classList.subjectInfo"
                        :class="teacherData.teachingInfo.teacherName == '' ? 'AllowClick' : 'hasPeople'"
                        @click="getTarget(classList,teacherData,$event)"
                        v-html="teacherData.teachingInfo.teacherId == userInfo.id ? queryRight : teacherData.teachingInfo.teacherName"></td>
                  </tr>
                </table>
                <div class="noData" v-for="(item,index) in gradeList" v-show="item.gradeId == currentGradeId.gradeId" v-if="item.classInfo.length <= 0">
                  <p class="empty-text">暂无科目信息</p>
                </div>
            </div>
          </div>
          <div class="querySubWrap">
            <div class="titleContent">
              <!--<i class="title-icon"></i>-->
              <span class="title-text">已选课程：</span>
            </div>
            <ul class="subjectNameContent">
              <li class="subjectInfo" v-for="teacherData in selectSubject">{{teacherData.gradeName}}
              <span>{{teacherData.className}}（{{teacherData.subjectName}}）</span>
              </li>
            </ul>
            <div class="gradeContentBtn">
              <!--<el-button class="primary" type="primary" @click="submitSubject">保存</el-button>-->
              <!--<el-button  type="text"  @click="skipSubject">跳过</el-button>-->
            </div>
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  var restInterval='';
  export default {
    name: 'teacherPersonal',
    data () {
      var regExp = /select|update|delete|truncate|join|union|exec|insert|drop|count|script|src|alert|window|document|location|>|<|%/i;
      var checkNote = (rule, value, callback) => {
        if(value == null || value == ""){
          callback();
        }else if(value.length > 200){
          callback(new Error("最多可输入200个字！"))
        }else if(regExp.test(value)){
          callback(new Error("输入中不能包含特殊字符！"))
        }else{
          callback();
        }
      };
      return {
        //民族选项
        options: this.nations,
        schoolType: this.schoolType,
        maxEducation: this.maxEducation,
        maxGetTheWay: this.maxGetTheWay,
        jobTitle: this.jobTitle,
        activeName: 'teacherpersonageinfo',
        //新增部分
        dialogupd: false,
        Btnmsg: "发送验证码",
        time:false,
        bool: true,
        UpdateForm: {oldtel: '', code: '', newtel: ''},
        Usercode: '',

        isshowgradeClass: false,
        gradeClass: '',
        type: this.$route.params.type,
        value: '',
        // 全屏遮罩层
        fullscreenLoading: true,
        // 编辑输入框
        teacherInfoForm: {
          id: this.$route.params.id,
          teacherAge:'',
          name: '',
          sex: '',
          national: '',
          phone: '',
          idCard: '',
          schoolAge: '',//教龄
          //第一学历
          education: '',//第一学历
          graduatedFromSchool: '',//毕业学校
          schoolType: '',//高校类别
          ifNormal: '',//是否为师范专业
          graduationOfYear: '',//毕业年份
          // 第二学历
          maxEducation: '',
          maxGraduatedFromSchool: '',
          maxGetTheWay: '',
          highestIfNormal: '',
          highestGraduationOfYear: '',
          //个人信息
          jobTitle: '',//职称
          educationLeader: '',//是否为教务主任
          classTeacher: '',//是否为年级主任
          privateTeacher: '',//是否为民办教师
          backboneTeacher: '',//是否为骨干教师
          theLeader: '',//学科带头人
          fullOrNot: '',//专兼职
          note: '',
          maxGraduationOfYear:''
        },
        teacherInfoForm2:{},
        //民族参数
        restaurants: [],
        nation: '',
        // 校验
        teacherInfoRules: {
          name: [
            {required: true, message: '请输入机构名称', trigger: 'change'},
            {pattern:  /^[\S]{1,40}$/, message: '用户名为小于40个的字符'},
          ],
          teacherAge:[
            {pattern: /^\d{1,2}$/, message: '请输入1到2位数的数字'},
          ],
          national: [
            {required: true, message: '请选择民族', trigger: 'change'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          phone: [
            {required: true, message: '请输入电话号', trigger: 'change'},
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/, message: '请输入正确的电话号码'},
            {min: 11, max: 11, message: '请输入11个数字', trigger: 'blur'}
          ],
          idCard: [
            {required: false, message: '请输入身份证号', trigger: 'change'},
            {pattern: /^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9xX]))|((yt)\S{0,18})$/i,message: '身份证号格式输入错误！'},
          ],
          schoolAge: [
            {required: true, message: '请输入教龄', trigger: 'change'},
            {pattern: /^\d{1,2}$/, message: '请输入1到2位数的数字'},
          ],
          education: [
            {required: true, message: '请选择第一学历', trigger: 'change'}
          ],
          note: [
            {validator: checkNote, trigger: 'blur' }
            ]
        },


        // 编辑切换
        isEditing: false,
        currentGradeId: '',//d 班级id
        teacherId: '',
        gradeList: [],
        selectSubject: [],
        editStatus: false,
        hideBtnState: true,
        oldSubMsg: '',
        oldSelectSubject: [],
        queryRight: '<i class="el-icon-check queryRight"></i>',
        allowEdit: false
      }
    },
    computed: mapState({
        userInfo: state => state.userInfo,
    }),
    mounted(){
      /* this.getOrgTree()
       this.getOrgUserLists()
       this.getAreaTree()
       // this.getOrgInfo(this.orgInfoId)*/
//      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.teacherId = this.userInfo.id;
//      Ding begin
      // 判断是否由综评跳转过来
      if (!!this.userInfo.jumpStatus && this.userInfo.jumpStatus == 1){
        this.userInfo.headTeacherClassList.forEach((item, index) => {
          this.gradeClass += item.gradeName + '（' + item.className + '）、';
      });
        this.gradeClass = this.gradeClass.substring(0, this.gradeClass.length - 1);
        this.isshowgradeClass = true;
      }else {
        if(this.userInfo.roleId == 1){//班主任权限判断
          this.userInfo.headTeacherClassList.headteacher.forEach((item, index) => {
              this.gradeClass += item.gradeName + '（' + item.className + '）、';
          });
          this.gradeClass = this.gradeClass.substring(0, this.gradeClass.length - 1);
          this.isshowgradeClass = true;
        }else { //普通教师权限
          this.userInfo.teachClassList.forEach((item, index) => {
            this.gradeClass += item.gradeName + '（' + item.className + '）、';
          });
          this.gradeClass = this.gradeClass.substring(0, this.gradeClass.length - 1);
          this.isshowgradeClass = true;
        }
      };
//      Ding end
      /* console.log(this.gradeClass);
       console.log(this.userInfo.headTeacherClassList.gradeName);
       console.log(this.userInfo.headTeacherClassList.className);
       console.log(this.userInfo.id);*/
      this.getteacherInfo();
      this.getSubjectMsg();
    },
    methods: {
      //tab切换
      handleClick(tab, event) {

        /*if (tab.name == 'teacherteachinginfo') {
          this.fullscreenLoading = true;

        }*/


      },
      // begin D
      getSubjectMsg(){
        const self = this;
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        self.$ajax('teacher/findTeachingBySchoolId',
          {"schoolId": userInfo.schools.schoolId}
//            {"schoolId":1}
        ).then(function (response) {
//            console.log(response);
          if (response.code == 200) {
            self.fullscreenLoading = false;
            self.gradeList = response.data;
            self.oldSubMsg = response.data;
            self.currentGradeId = response.data[0];
            var gradeData = response.data;
            self.selectSubject = [];
            self.oldSelectSubject = [];
            gradeData.forEach((item, i) => {
              item.classInfo.forEach((subjectInfo, c) => {
                subjectInfo.gradeId = item.gradeId;
                subjectInfo.gradeName = item.gradeName;
                subjectInfo.subjectInfo.forEach((teaching, o) => {
                  teaching.classId = subjectInfo.classId;
                  teaching.gradeId = subjectInfo.gradeId;
                  teaching.gradeName = subjectInfo.gradeName;
                  teaching.className = subjectInfo.className;

                  if (teaching.teachingInfo.teacherId == self.teacherId) {
                    self.selectSubject.push(teaching);
                    self.oldSelectSubject.push(teaching);
                  }
//                });
                });
              });
            });
          } else {
            self.$alert(response.message, '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
        }).catch(function (error) {
          console.log(error);
        });
      },

      getCurrentGradeId(GradeId,){
//         console.log(GradeId);
//        this.currentGradeId = GradeId;
//        this.getTeachingMsg()
      },
      // 添加选择的科目
      getTarget(item, list, event){
//        console.log(1,this.allowEdit);
        if (this.allowEdit == true) {
          let data = list;
          if (list.teachingInfo.teacherName == "" || list.teachingInfo.teacherId == this.teacherId) {
            data.classId = item.classId;
            data.className = item.className;
            data.gradeId = this.currentGradeId.gradeId;
            data.gradeName = this.currentGradeId.gradeName;
            //              console.log(event.target.tagName)
            var queryRight = '<i class="el-icon-check queryRight"></i>';
            if (event.target.innerHTML == "" && event.target.tagName == "TD") {
              event.target.innerHTML = queryRight;
              this.selectSubject.push(data);
//                console.log(this.selectSubject);


            } else if (event.target.tagName == "I") {
              event.target.parentNode.innerHTML = '';
              this.selectSubject.forEach((item, i) => {
                if (item == data) {
                  this.selectSubject.splice(i, 1);
                }
              });
            } else {
              event.target.innerHTML = '';
              this.selectSubject.forEach((item, i) => {
                if (item == data) {
                  this.selectSubject.splice(i, 1);
                }
              });
            }
//            console.log(item,list);
//            console.log(this.selectSubject);
          }
        }
      },

      //新增部分
      UpdPhone(){
        this.dialogupd = true;
        this.UpdateForm.oldtel = this.teacherInfoForm.phone;
      },
      GetVercode(){
        var _self = this;
        if (!this.bool)return;
        var contlength =60;
        restInterval = window.setInterval(function () {
          if (contlength == 0) {
            clearInterval(restInterval);
            _self.Btnmsg = "获取验证码";
            _self.bool = true;
            _self.time = false;
            return;
          }
          _self.Btnmsg = contlength+'s后可重发';
          contlength--;
          _self.time = true;
        }, 1000);
        let params = {
          phone: this.teacherInfoForm.phone,
        };

        this.$ajax('/teacher/sms/send', params).then(res => {
          if (res.code == 200) {
//            console.log(res);
//            console.log(res.data)
            _self.Usercode = res.data;
//            console.log(_self.Usercode)
            //
          } else if(res.code == 400){
            clearInterval(restInterval);
            _self.Btnmsg = "获取验证码";
            this.useAlert('error',res.message,function () {});
            _self.time = true;

          }
        });
      },
      ClearTel(){
        this.dialogupd = false;
        this.UpdateForm.code="";
        this.UpdateForm.newtel="";
        clearInterval(restInterval);
        this.Btnmsg ="获取验证码";
        this.time = false;
        //this.bool=true;
      },
      SureTel(){
        var _self = this.UpdateForm;
        //if(_self.code =="")
        var ph = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
        var flag = ph.test(_self.newtel);
        if(!this.Usercode){
          this.useAlert('error','请获取验证码',function () {});
          return;
        }
        if(_self.code==""){
          this.useAlert('error','请输入验证码',function () {});
          return;
        }
        if(_self.code!=''&&_self.code!=this.Usercode){
          this.useAlert('error','验证码错误',function () {});
          return;
        }
        if(!flag)
        {
          this.useAlert('error','手机格式错误',function () {});
          return;
        }
//        console.log('确定后的值：'+_self.code+'  '+this.Usercode);

        this.$ajax('/changeLoginName', {
          oldPhone: _self.oldtel,
          newPhone: _self.newtel,
          isSchoolHeader: 0
        }).then(res => {
          if (res.code == 200) {
            this.useAlert('success','修改成功',function () {});
            this.teacherInfoForm.phone = _self.newtel;
            this.dialogupd = false;
          } else {
            this.useAlert('error',res.message,function () {});
          }
        });
      },

      // 获取教师基本信息
      getteacherInfo(id){
        let params = {
          //schoolId:  this.userInfo.schools.schoolId,
          teacherId: this.userInfo.id,
          //isSchoolHeader:1
        };
        this.$ajax('/teacher/ceneter/getInfo', params)
          .then(res => {
            this.teacherInfoForm = res.data;
//            console.log(JSON.stringify( this.teacherInfoForm))
            // sessionStorage.setItem('teacherInfoForm',JSON.stringify(this.teacherInfoForm))
            this.teacherInfoForm2=_.cloneDeep(this.teacherInfoForm);

            this.fullscreenLoading = false;
          });
      },
      //编辑保存教师基本信息
      saveteacherInfoForm(cb){
        this.$refs.form.validate((valid) => {
          if (valid) {

            this.teacherInfoForm.graduationOfYear = Object.prototype.toString.call(this.teacherInfoForm.graduationOfYear) === '[object Date]' ? this.teacherInfoForm.graduationOfYear.getFullYear() : this.teacherInfoForm.graduationOfYear;
            this.teacherInfoForm.maxGraduationOfYear = Object.prototype.toString.call(this.teacherInfoForm.maxGraduationOfYear) === '[object Date]' ? this.teacherInfoForm.maxGraduationOfYear.getFullYear() : this.teacherInfoForm.maxGraduationOfYear;
            let params = {
              schoolId: this.userInfo.schools.schoolId,
              teacherId: this.$route.params.id,
              id: this.teacherInfoForm.id,
              teacherAge:this.teacherInfoForm.teacherAge,
              name: this.teacherInfoForm.name,
              sex: this.teacherInfoForm.sex,
              national: this.teacherInfoForm.national,
              phone: this.teacherInfoForm.phone,
              idCard: this.teacherInfoForm.idCard,
              schoolAge: this.teacherInfoForm.schoolAge,
              /*第一学历*/
              education: this.teacherInfoForm.education,
              graduatedFromSchool: this.teacherInfoForm.graduatedFromSchool,
              schoolType: this.teacherInfoForm.schoolType,
              ifNormal: this.teacherInfoForm.ifNormal,
              graduationOfYear: this.teacherInfoForm.graduationOfYear,
              /*第一学历*/
              maxEducation: this.teacherInfoForm.maxEducation,
              maxGraduatedFromSchool: this.teacherInfoForm.maxGraduatedFromSchool,
              maxGetTheWay: this.teacherInfoForm.maxGetTheWay,
              maxIfNormal: this.teacherInfoForm.maxIfNormal,
              maxGraduationOfYear: this.teacherInfoForm.maxGraduationOfYear,
              /*个人信息*/
              jobTitle: this.teacherInfoForm.jobTitle,
              educationLeader: this.teacherInfoForm.educationLeader,
              classTeacher: this.teacherInfoForm.classTeacher,
              privateTeacher: this.teacherInfoForm.privateTeacher,
              backboneTeacher: this.teacherInfoForm.backboneTeacher,
              theLeader: this.teacherInfoForm.theLeader,
              fullOrNot: this.teacherInfoForm.fullOrNot,
              note: this.teacherInfoForm.note,

              /* orgId: this.selectedCounty || this.selectedCity || this.selectedProvince,*/
            };
            let self = this;
            this.$ajax('/teacher/ceneter/editInfo', params)
              .then(res => {
                if (res.code == 200) {
                  let _this = this;
                  this.useAlert('success','保存成功',function () {
                    if(typeof cb == 'function'){
                      cb()
                    }
                    //回调函数
                    _this.searchIsOk = false;
                    self.$store.commit('storeSetUserName',{'name':self.teacherInfoForm.name})
                  });
                  this.isEditing = false;
                } else {
                  this.useAlert('error','保存失败',function () {
                    //回调函数
                  });
                  this.getteacherInfo();
                  this.isEditing = false;
                }

              });
          } else {
            // return false;
            this.useAlert('error','必填项未填写',function () {});
          }
        });

      },
      // 编辑机构信息
      editOrgInfoForm(){

        this.isEditing = true;

      },
      // 取消机构信息
      cancelOrgInfoForm(){
        this.isEditing = false;
        this.getteacherInfo(this.teacherInfoForm)
      },
      setValue:function(){
        this.teacherInfoForm2=_.cloneDeep(this.teacherInfoForm);
      }
    },
    watch: {
      searchText(val) {
        this.$refs.orgLists.filter(val);
      },
      teacherInfoForm: {
        handler: function (after, before) {
          var _this = this;
//          console.log(JSON.stringify(after))
          // console.log(sessionStorage.getItem('teacherInfoForm'));
          // this.searchIsOk = JSON.stringify(after) !== sessionStorage.getItem('teacherInfoForm');
          this.searchIsOk = JSON.stringify(after) !== JSON.stringify(_this.teacherInfoForm2);

//          console.log(this.searchIsOk);
        },
        deep: true
      }
    },
    beforeRouteLeave  (to, from, next) {

        if (this.searchIsOk) {
          this.$confirm('您当前做了编辑操作，是否需要保存？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
//              type: 'warning'
          }).then(() => {
            //确定
            this.saveteacherInfoForm(next());

          }).catch(() => {
            next()
          });
        } else {
          next()
        }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*  #editteachers .blackDiv1{
    border-bottom: none;

  }
  #editteachers .blackDiv2{
    border-bottom: none;

  }*/

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

  /* 查看显示p  隐藏输入框*/
  /*输入框*/
  .edit .el-input {
    display: none;
  }

  .edit .item-text {
    display: none;
  }

  /*下拉框*/
  .edit .el-select {
    display: none;
    /* display: inline-block; */
  }

  /*民族*/
  .edit .el-autocomplete {
    display: none;
  }

  /*单选*/
  .edit .el-radio-group {
    display: none;
  }

  /* 编辑状态隐藏p  显示输入框*/
  .edit.editing p {
    display: none;
  }
  /*改变详情p的文字颜色*/
  #teacherPersonal .pcolor{
    font-size: 14px;
    color:#666666;
    border-bottom: 1px dotted #f0f0f0;
    height: 36px;
  }
  /*输入框*/
  .edit.editing .el-input {
    display: inline-block;
  }

  /*下拉框*/
  .edit.editing .el-select {
    display: inline-block;
  }

  /*单选*/
  .edit.editing .el-radio-group {
    line-height: 36px;
    display: block;
  }

  .edit.editing .item-text {
    display: block;
  }

  /*民族*/
  .edit.editing .el-autocomplete {
    display: block;
  }

  .pagination {
    margin-top: 30px;
  }

  b {
    font-weight: normal;
  }

  .blind {
    clip: rect(1px, 1px, 1px, 1px);
    clip: rect(1px 1px 1px 1px);
    position: absolute;
  }

  /* .el-select .el-input .el-input__icon{
     right:420px;
   }*/


  #teacherPersonal {
    padding: 20px;
  }
  #teacherPersonal .teachingMsg{
    padding: 20px;
  }
/*   #teacherPersonal .el-form-item__content{
  height: 36px;
} */
  #teacherPersonal .callBackBtn {
    border-bottom: 1px solid #ECEDEF;
    padding-bottom: 25px;
    padding-top: 15px;
    position: relative;
  }

  #teacherPersonal .svgStyle {
    margin-right: 5px;
  }

  #teacherPersonal .el-button--text {
    font-size: 16px;
    color: #666666;
  }

  #teacherPersonal .editBtn {
    /*margin: 20px 0;*/
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
    text-align: right;
  }

  #teacherPersonal .callBackBtn button {
    padding: 0;
    width: 84px;
    height: 28px;
    text-align: center;
    line-height: 28px;
  }

  #teacherPersonal .hideBtn {
    position: absolute;
    right: 0;
    top: 0;
  }

  #teacherPersonal .hideStatus {
    display: none;
  }

  #teacherPersonal .AllowClick {
    cursor: pointer;
  }

  /*选择科目样式*/
  #teacherPersonal .gradeContent {
    text-align: left;
    margin-top: 15px;
  }
  #teacherPersonal .subjectNameContent {
    margin-top: 10px;
  }

  #teacherPersonal .scoreTable .table {
    width: 100%;
    border: 1px solid #dfe6ec;
    margin-top: 10px;
  }

  #teacherPersonal .scoreTable .table tr, #teacherPersonal .scoreTable .table td {
    text-align: center;
    border-bottom: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
  }

  #teacherPersonal .scoreTable .table tr:nth-child(1) th {
    font-size: 14px;
    height: 34px;
    font-weight: 500;
  }

  #teacherPersonal .hasPeople {
    color: #acacac;
  }

  #teacherPersonal .scoreTable .table th {
    box-sizing: border-box;
    text-align: center;
    background-color: #effaff;
    color: #007dc4;
    border: none;
    border-left: 1px solid #a5defa;
    border-top: 1px solid #a5defa;
    padding: 2px 1px
  }

  #teacherPersonal .scoreTable .table td {
    box-sizing: border-box;
    height: 44px;
  }

  #teacherPersonal .gradeContentBtn {
    width: 300px;
    margin: 20px auto;
  }

  #teacherPersonal .gradeContentBtn button {
    width: 30%;
    height: 36px;
    margin-right: 11px;
  }

  #teacherPersonal .queryRight {
    color: #24c178;
    /*width: 60px;*/
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
    border-radius: 2px;
    background: #f7f7f7;
  }
  #teacherPersonal .paddingTen {
    padding: 0 10px;
    box-sizing: border-box;
  }

  #teacherPersonal .querySubWrap {
    margin-top: 20px;
    text-align: left;
  }

  #teacherPersonal .subjectInfo {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    background: #effaff;
    border-radius: 5px;
    padding: 0 10px;
    margin: 0 10px 10px 0;
  }

  #teacherPersonal .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0;
  }

  #teacherPersonal .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
  }

  #teacherPersonal .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    color: #fff;
    background-color: #0d9ee9;
    border-color: #0d9ee9;
  }

  #teacherPersonal .el-radio-button {
    margin-right: 8px;
  }

  #teacherPersonal .el-radio-button__inner {
    border: 1px solid #bfcbd9;
  }
  #teacherPersonal .noData{
    background: url("../../../resources/front/imgs/nodata.png") no-repeat center;
    margin-top: 50px;
    height: 233px;
    margin-bottom: 40px;
    position: relative;
  }

  #teacherPersonal .noData .empty-text{
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    bottom:-30px;
    font-size: 14px;
    color: #b6b6b6;
  }
  #teacherPersonal .title-icon {
    display: inline-block;
    width: 3px;
    height: 14px;
    background: #0e9deb;
    vertical-align: middle;
  }
  #teacherPersonal .title-text {
    display: inline-block;
    margin-left: 7px;
    /*font-size: 14px;*/
    color: #0d9ee9;
    /*font-family: "\5B8B\4F53";*/
    vertical-align: middle;
  }
  #teacherPersonal  .changephone{
    text-decoration:underline;
    color: #0d9ee9;
  }
  /*tab切换*/
  #teacherPersonal .el-tabs__active-bar{
    bottom: initial;
  }
  #teacherPersonal .el-tabs__item.is-active{
    border-bottom: 1px solid #fff;
  }
  #teacherPersonal .el-tabs__item {
    border: 1px solid #cedaea;
  }
  #teacherPersonal .el-tabs__item + .el-tabs__item{
    margin-left: -1px;
  }
  #teacherPersonal .el-tabs__content{
 /*   position: relative;
    top: 10px;*/
    border: 1px solid #cedaea;
  /*  padding:10px 20px 100px 20px ;*/
    border-top: none;
  }
  #teacherPersonal .el-tabs__header{
    margin: 0;
  }
  #teacherPersonal .text-right {
   padding-bottom: 10px;
   padding-top: 10px;
    text-align: right;
    border-bottom: 1px solid #cedaea;
  }
  #teacherPersonal .scoreTable .table{
    table-layout:fixed;
    word-wrap:break-word;
  }
  #teacherPersonal .scoreTable .table td{
    white-space:nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
    /*max-width: 200px;*/
    /*width: 50px;*/
  }
  .dialogupd.el-dialog__wrapper .el-dialog{
    width: 420px;
  }
  .dialogupd.el-dialog__wrapper .el-dialog .el-dialog__header{
    background-color: #0d9ee9;
    background-position: 80px 0px;
  }
</style>

