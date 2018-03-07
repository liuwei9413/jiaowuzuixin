<template>
<section>
  <!-- <left-sidebar></left-sidebar> -->
  <!-- <right-wrap></right-wrap> -->

  <div class="main-content" v-loading.fullscreen.lock="fullscreenLoading">
    <div id="editteachers" class="addeditinfo">

      <div  class="btns">
        <a href="javascript:;" @click="remindSave" class=" icon-back">返回 </a>
        <el-button style="float: right;" class="white-color  el-button el-button--primary"
                   type="primary"  @click="saveteacherInfoForm" v-if="type != 'detail'"><!--<i class="icon-conserve"></i>--><span>保存</span></el-button>

      </div>
      <!-- type="border-card" -->


      <el-form ref="teacherInfoForm" :model="teacherInfoForm" :rules="teacherInfoRules" :show-message="type != 'detail'" label-width="200px" class="edit"
               :class="[{ editing:type != 'detail' }] ">
<div class="blackDiv1">
        <div class="title"><i></i><span>教师任教信息</span></div>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model.trim="teacherInfoForm.name" class="inputWidth"></el-input>
          <p> {{ teacherInfoForm.name }} </p>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-radio-group v-model="teacherInfoForm.sex">
            <el-radio label="1" >男</el-radio>
            <el-radio label="2" >女</el-radio>

          </el-radio-group>
          <p v-if="teacherInfoForm.sex =='1'">男</p>
          <p v-if="teacherInfoForm.sex =='2'">女</p>

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
          <p>{{teacherInfoForm.national}}</p>
        </el-form-item>
        <!--民族结束-->
        <!--手机-->
        <el-form-item label="手机号码：" prop="phone">
         <!-- <el-input v-model="orgInfoForm.phone"></el-input>-->
          <p style="display:inline-block;"> {{ teacherInfoForm.phone }} </p>&nbsp&nbsp&nbsp<a href="javascript:" class="changephone" v-show=" type != 'detail'"  @click="UpdPhone()">手机号码变更</a>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCard">
          <el-input v-model.trim="teacherInfoForm.idCard" class="inputWidth" :maxlength="18"></el-input>
          <p>{{teacherInfoForm.idCard}}</p>
        </el-form-item>
        <el-form-item label="教龄：" prop="schoolAge">
          <el-input v-model.trim="teacherInfoForm.schoolAge" class="inputWidth"></el-input>
          <p> {{ teacherInfoForm.schoolAge }} </p>
        </el-form-item>
        <!--第一学历-->
        <el-form-item label="第一学历：" prop="education">
          <el-select v-model="teacherInfoForm.education" placeholder="请选择第一学历" class="inputWidth" required>
            <el-option
              v-for="item in maxEducation"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p> {{ teacherInfoForm.education }} </p>
        </el-form-item>
        <el-form-item label="毕业学校：" prop="graduatedFromSchool">
          <el-input v-model.trim="teacherInfoForm.graduatedFromSchool" class="inputWidth"></el-input>
          <p>{{ teacherInfoForm.graduatedFromSchool }}</p>
        </el-form-item>
        <el-form-item label="高校类别：" prop="schoolType">
          <el-select v-model="teacherInfoForm.schoolType" placeholder="请选择高校类别" class="inputWidth">
            <el-option
              v-for="item in schoolType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p> {{ teacherInfoForm.schoolType}}</p>
        </el-form-item>
        <el-form-item label="是否为师范专业：" prop="ifNormal">
          <el-radio-group v-model="teacherInfoForm.ifNormal">
            <el-radio label="1" >是</el-radio>
            <el-radio label="0" >否</el-radio>
          </el-radio-group>
          <p v-if="teacherInfoForm.ifNormal =='1'">是</p>
          <p v-if="teacherInfoForm.ifNormal =='0'">否</p>
          <p v-else></p>
        </el-form-item>
        <el-form-item class="block" label="毕业时间：" prop="graduationOfYear">
          <el-date-picker
            v-model="teacherInfoForm.graduationOfYear"
            align="right"
            type="year"
            style="width:652px;"
            placeholder="请选择毕业时间">
          </el-date-picker>
          <p>{{teacherInfoForm.graduationOfYear}}</p>
        </el-form-item>
        <!--第二学历-->
        <el-form-item label="最高学历：" prop="maxEducation">
          <el-select v-model="teacherInfoForm.maxEducation" placeholder="请选择最高学历" class="inputWidth">
            <el-option
              v-for="item in maxEducation"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p>{{teacherInfoForm.maxEducation}}</p>
        </el-form-item>

        <el-form-item label="考取途径：" prop="maxGetTheWay">
          <el-select v-model="teacherInfoForm.maxGetTheWay" placeholder="请选择考取途径" class="inputWidth">
            <el-option
              v-for="item in maxGetTheWay"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p>{{teacherInfoForm.maxGetTheWay}}</p>
        </el-form-item>

        <el-form-item label="毕业学校：" prop="maxGraduatedFromSchool">
          <el-input v-model.trim="teacherInfoForm.maxGraduatedFromSchool" class="inputWidth"></el-input>
          <p>{{teacherInfoForm.maxGraduatedFromSchool}}</p>
        </el-form-item>

        <el-form-item label="是否为师范专业：" prop="maxIfNormal">
          <el-radio-group v-model="teacherInfoForm.maxIfNormal">
            <el-radio label="1" >是</el-radio>
            <el-radio label="0" >否</el-radio>
          </el-radio-group>
          <p v-if="teacherInfoForm.maxIfNormal =='1'">是</p>
          <p v-if="teacherInfoForm.maxIfNormal =='0'">否</p>
          <p v-else></p>
        </el-form-item>

        <el-form-item class="block" label="毕业时间：" prop="maxGraduationOfYear">
          <el-date-picker
            v-model="teacherInfoForm.maxGraduationOfYear"
            align="right"
            style="width:652px;"
            type="year"
            placeholder="选择毕业时间">
          </el-date-picker>
          <p >{{teacherInfoForm.maxGraduationOfYear}}</p>
        </el-form-item>
</div>


        <div class="blackDiv2">
        <div class="title title2"><i></i><span>教师任教信息</span></div>

        <el-form-item label="职称：" prop="jobTitle">
          <el-select v-model="teacherInfoForm.jobTitle" placeholder="请选择职称" class="inputWidth">
            <el-option
              v-for="item in jobTitle"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p>{{teacherInfoForm.jobTitle}}</p>
        </el-form-item>

        <el-form-item label="是否为教务主任：" prop="educationLeader">
          <el-radio-group v-model="teacherInfoForm.educationLeader">
            <el-radio label="1" >是</el-radio>
            <el-radio label="0" >否</el-radio>
          </el-radio-group>
          <p v-if="teacherInfoForm.educationLeader =='1'">是</p>
          <p v-if="teacherInfoForm.educationLeader =='0'">否</p>

        </el-form-item>

        <el-form-item label="是否为年级主任/组长：" prop="classTeacher">
          <el-radio-group v-model="teacherInfoForm.classTeacher">
            <el-radio label="1" >是</el-radio>
            <el-radio label="0" >否</el-radio>
          </el-radio-group>
          <p v-if="teacherInfoForm.classTeacher =='1'">是</p>
          <p v-if="teacherInfoForm.classTeacher =='0'">否</p>

        </el-form-item>

        <el-form-item label="民办教师：" prop="privateTeacher">
          <el-radio-group v-model="teacherInfoForm.privateTeacher">
            <el-radio label="1" >是</el-radio>
            <el-radio label="0" >否</el-radio>
          </el-radio-group>
          <p v-if="teacherInfoForm.privateTeacher =='1'">是</p>
          <p v-if="teacherInfoForm.privateTeacher =='0'">否</p>

        </el-form-item>

        <el-form-item label="骨干教师：" prop="backboneTeacher">
          <el-radio-group v-model="teacherInfoForm.backboneTeacher">
            <el-radio label="1" >是</el-radio>
            <el-radio label="0" >否</el-radio>
          </el-radio-group>
          <p v-if="teacherInfoForm.backboneTeacher =='1'">是</p>
          <p v-if="teacherInfoForm.backboneTeacher =='0'">否</p>

        </el-form-item>

        <el-form-item label="学科带头人：" prop="theLeader">
          <el-radio-group v-model="teacherInfoForm.theLeader">
            <el-radio label="1">是</el-radio>
            <el-radio label="0" >否</el-radio>
          </el-radio-group>
          <p v-if="teacherInfoForm.theLeader =='1'">是</p>
          <p v-if="teacherInfoForm.theLeader =='0'">否</p>
        </el-form-item>

        <el-form-item label="专、兼职教研员：" prop="fullOrNot">
          <el-select v-model="teacherInfoForm.fullOrNot" placeholder="请选择专、兼职教研员" class="inputWidth">
            <el-option label="专职" value="专职"></el-option>
            <el-option label="兼职" value="兼职"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
          <p>{{teacherInfoForm.fullOrNot}}</p>
        </el-form-item>

        <el-form-item class="note" label="近三年获奖或发表文章情况：（按照奖项、获奖时间、获奖级别、获奖内容顺序填写）" prop="note">
          <el-input type="textarea" v-model.trim="teacherInfoForm.note" class="item-text" style="width:652px;"></el-input>
          <p> {{teacherInfoForm.note }} </p>
        </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
  <!--新增部分-->
  <!-- <div v-show="dialogupd" class="Tel_dialog">
        <div class="Tel_title">手机号码变更</div>
        <div class="Tel_From">
          <el-form :model="UpdateForm" ref="UpdateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原始手机号码" prop="oldtel">
              <el-input :disabled="true" v-model.trim="UpdateForm.oldtel" placeholder="原始手机号码"></el-input>
            </el-form-item>
            <el-form-item style="text-align:left;" label="短信验证码" prop="code">
              <el-row :gutter="20">
                <el-col :span="14" style="padding:0;height:36px"><el-input style="margin-left:0; width:100%" v-model.trim="UpdateForm.code" placeholder="请输入验证码" ></el-input></el-col>
                <el-col :span="8" style="padding-left:8px;"><el-button :disabled="time" v-text="Btnmsg" style="padding:10px  10px;" @click="GetVercode()" ></el-button></el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="新手机号码" prop="newtel">
              <el-input v-model.trim="UpdateForm.newtel" placeholder="新手机号码"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="Tel_footer">
          <el-row>
            <el-col :span="12"><el-button type="info" style="width:120px;letter-spacing:2px;" @click="ClearTel()">取消</el-button></el-col>
            <el-col :span="12"><el-button type="success" style="width:120px;letter-spacing:2px;" @click="SureTel()">确定</el-button></el-col>
          </el-row>
        </div>
      </div> -->
  <!-- <div class="mask" v-show="dialogupd"></div> -->

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
</template>

<script>
  // import leftSidebar from './leftSidebar.vue';
  // import rightWrap from './rightWrap.vue';

  var restInterval='';
  export default {
    data() {

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
        //新增部分
        dialogupd:false,
				Btnmsg:"发送验证码",
				time:false,
				bool:true,
				UpdateForm: {oldtel:'',code: '',newtel:''},
        Usercode:'',


        searchIsOk: false,
        userInfo:'',
        type:this.$route.params.type,
        value:'',
        // 全屏遮罩层
        fullscreenLoading: true,
        // 编辑输入框
        teacherInfoForm:{
          id:this.$route.params.id,
          name:'',
          sex:'',
          national:'',
          phone:'',
          idCard:'',
          schoolAge:'',//教龄
          //第一学历
          education:'',//第一学历
          graduatedFromSchool:'',//毕业学校
          schoolType:'',//高校类别
          ifNormal:'',//是否为师范专业
          graduationOfYear:'',//毕业年份
          // 第二学历
          maxEducation:'',
          maxGraduatedFromSchool:'',
          maxGetTheWay:'',
          maxIfNormal:'',
          maxGraduationOfYear:'',
          //个人信息
          jobTitle:'',//职称
          educationLeader:'',//是否为教务主任
          classTeacher:'',//是否为年级主任
          privateTeacher:'',//是否为民办教师
          backboneTeacher:'',//是否为骨干教师
          theLeader:'',//学科带头人
          fullOrNot:'',//专兼职
          note:'',
        },
        //
        teacherInfoForm2:{},
        isReturnPage: false, //是否是返回入口
        isSavebtn: true, //是否是点击保存入口
          //民族参数
        restaurants: [],
        nation: '',
        // 校验
        teacherInfoRules: {
          name: [
            {required: true, message: '姓名不能为空！', trigger: 'blur' },
            {pattern:/^[\S]{2,40}$/,message: '姓名输入在2~40个字！'}
          ],
          national: [
            { required: true, message: '民族不能为空！', trigger: 'change' },
          ],
          sex: [
            { required: true, message: '性别不能为空！', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '手机号码不能为空！', trigger: 'blur' },
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message: '手机号码格式输入错误！'},
            { min: 11, max: 11, message: '手机号码输入为11位数字！', trigger: 'blur' }
          ],
          idCard: [
            { required: false, message: '请输入身份证号', trigger: 'blur' },
            {pattern: /^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9xX]))|((yt)\S{0,18})$/i,message: '身份证号格式输入错误！'},
          ],
          schoolAge: [
            { required: true, message: '教龄不能为空！', trigger: 'change' },
            {pattern: /^\d{1,2}$/,message: '教龄输入为1~2位数字！'},
          ],
          education : [
            { required: true, message: '第一学历不能为空！', trigger: 'change' }
          ],
          /*note: [
           {required: false, message: '请输入描述信息', trigger: 'blur' },
           {pattern: /^[\S]{0,200}$/, message: '长度在 0 到 200 个字符' },
           ]*/
          note: [
            {validator: checkNote, trigger: 'blur' }
          ]
        /*  IDnumber: [
            { required: false, message: '请输入身份证号', trigger: 'blur' },
            {pattern: /^[1-9]\d{13,16}(\d|X)$/,message: '请正确输入身份证号码'},
          ],
          date1: [
            { type: 'date', required: false, message: '请选择日期', trigger: 'change' }
          ],


          fatherprofession : [
            { required: false, message: '请选择父亲职业', trigger: 'change' }
          ],

          mathereducation : [
            { required: false, message: '请选择父亲学历', trigger: 'change' }
          ],
          matherprofession : [
            { required: false, message: '请选择父亲职业', trigger: 'change' }
          ],
          phone2: [
            { required: false, message: '请输入电话号', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入11个数字', trigger: 'blur' }
          ],
          desc: [
            { required: false, message: '请填写活动形式', trigger: 'blur' }
          ]*/
        },


        // 编辑切换
        isEditing:false,

      }
    },
    mounted(){
     /* this.getOrgTree()
      this.getOrgUserLists()
      this.getAreaTree()
      // this.getOrgInfo(this.orgInfoId)*/
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(this.userInfo.schools.schoolId);

      this.getteacherInfo();
    },
    methods: {
      //返回提醒保存
      remindSave(){
        this.isReturnPage = true;
        if (this.type == 'detail' || !this.searchIsOk) {
          this.$router.go(-1);
          return;
        } else {
          this.$confirm('你当前做了编辑操作，是否要保存？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
          }).then(() => {
            //确定
            /*this.$router.replace('/eduSchoolManagement');*/
            this.saveteacherInfoForm();
          }).catch(() => {
            //取消
            this.$router.go(-1);
          });
        }
      },
      //新增部分
      UpdPhone(){
				this.dialogupd=true;
				this.UpdateForm.oldtel = this.teacherInfoForm.phone;
			},
      GetVercode(){
				var _self = this;
				if(!this.bool)return;
				var contlength=59;

				 restInterval = window.setInterval(function() {
				if(contlength==0){
					clearInterval(restInterval);
					_self.Btnmsg ="获取验证码";
					_self.bool=true;
          _self.time=false;
					return;
				}
				_self.Btnmsg=contlength+'s后可重发';
				contlength--;
          _self.time=true;
				},1000);

        let params={
          phone:this.teacherInfoForm.phone,
        };
        this.$ajax('/teacher/sms/send', params).then(res => {
          if (res.code == 200) {
            console.log(res);
            console.log(res.data);
            _self.Usercode=res.data;
            console.log(_self.Usercode)
            //
          }else if(res.code == 400){
            clearInterval(restInterval);
            _self.Btnmsg = "获取验证码";
            _self.time = true;//这个就是置灰的
            this.useAlert('error',res.message,function () {});
          }
        });
			},
			ClearTel(){
				this.dialogupd=false;
        this.UpdateForm.code="";
        this.UpdateForm.newtel="";
        clearInterval(restInterval);//运行
        this.Btnmsg="获取验证码";
        this.time = false;//这个就是置灰的
				//this.bool=true;
			},
			SureTel(){
				var _self = this.UpdateForm;
				//if(_self.code =="")
				var ph =/^1[3|4|5|7|8][0-9]\d{4,8}$/;
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
				console.log('确定后的值：'+_self.code+'  '+this.Usercode);//这样试试应该没问题
        this.$ajax('/changeLoginName',{oldPhone:_self.oldtel,newPhone:_self.newtel,isSchoolHeader:0}).then(res => {
            		if(res.code == 200) {
                  this.useAlert('success','修改成功',function () {});
                  this.teacherInfoForm.phone =_self.newtel;
                  this.dialogupd=false;
           			 }else{
                  this.useAlert('error',res.message,function () {});
            		}
          		});
			},
      // 获取教师基本信息
      getteacherInfo(id){
        let params={
          schoolId:  this.userInfo.schools.schoolId,
          teacherId: this.$route.params.id,
          isSchoolHeader:0
        };
        this.$ajax('/teacher/ceneter/getInfo',params)
          .then(res => {
            this.teacherInfoForm=res.data;
            this.teacherInfoForm2=_.cloneDeep(this.teacherInfoForm);
            this.fullscreenLoading=false;

//            this.setValue();
          });
      },
      //编辑保存教师基本信息
      saveteacherInfoForm(){
        // if(!this.searchIsOk) return;
        let that = this;
        this.$refs.teacherInfoForm.validate((valid) => {
          if (valid) {
            this.teacherInfoForm.graduationOfYear = Object.prototype.toString.call(this.teacherInfoForm.graduationOfYear) === '[object Date]'? this.teacherInfoForm.graduationOfYear.getFullYear(): this.teacherInfoForm.graduationOfYear;
            this.teacherInfoForm.maxGraduationOfYear = Object.prototype.toString.call(this.teacherInfoForm.maxGraduationOfYear) === '[object Date]'? this.teacherInfoForm.maxGraduationOfYear.getFullYear(): this.teacherInfoForm.maxGraduationOfYear;
            let params={
              schoolId:  this.userInfo.schools.schoolId,
              teacherId: this.$route.params.id,
              isSchoolHeader:0,
              id: this.teacherInfoForm.id ,
              name: this.teacherInfoForm.name,
              sex: this.teacherInfoForm.sex,
              national: this.teacherInfoForm.national,
              phone:this.teacherInfoForm.phone,
              idCard:this.teacherInfoForm. idCard,
              schoolAge:this.teacherInfoForm.schoolAge,
              /*第一学历*/
              education:this.teacherInfoForm.education,
              graduatedFromSchool:this.teacherInfoForm.graduatedFromSchool,
              schoolType:this.teacherInfoForm.schoolType,
              ifNormal:this.teacherInfoForm.ifNormal,
              graduationOfYear:this.teacherInfoForm.graduationOfYear,
              /*第一学历*/
              maxEducation:this.teacherInfoForm.maxEducation,
              maxGraduatedFromSchool:this.teacherInfoForm.maxGraduatedFromSchool,
              maxGetTheWay:this.teacherInfoForm.maxGetTheWay,
              maxIfNormal:this.teacherInfoForm.maxIfNormal,
              maxGraduationOfYear:this.teacherInfoForm.maxGraduationOfYear,
              /*个人信息*/
              jobTitle:this.teacherInfoForm.jobTitle,
              educationLeader:this.teacherInfoForm.educationLeader,
              classTeacher:this.teacherInfoForm. classTeacher,
              privateTeacher:this.teacherInfoForm. privateTeacher,
              backboneTeacher:this.teacherInfoForm. backboneTeacher,
              theLeader:this.teacherInfoForm. theLeader,
              fullOrNot:this.teacherInfoForm. fullOrNot,
              note:this.teacherInfoForm.  note,

             /* orgId: this.selectedCounty || this.selectedCity || this.selectedProvince,*/
            };
            const self = this;
            this.$ajax('/teacher/ceneter/editInfo',params)
              .then(res => {
                if(res.code == 200){
                  this.getteacherInfo();
                  this.useAlert('success',"保存成功",function () {
                    if(self.isSavebtn){  self.$router.go(-1); }
                  //回调函数
                  });
                  this.isEditing=false;
                }else{
                  this.useAlert('error','保存失败：'+res.message,function () {
                    //回调函数
                  });
                  this.isEditing=false;
                }

              });

          } else {
            this.useAlert('error','验证未通过',function () {
              that.isSaveOk= false;//是否验证通过
              return;
            });
            // return false;
          }
        });




      },
      // 编辑机构信息
      editOrgInfoForm(){

        this.isEditing=true;

      },

      // 取消机构信息
      cancelOrgInfoForm(){
        this.isEditing=false;
        this.getOrgInfo(this.orgInfoId)

      },
      setValue:function(){
        this.teacherInfoForm2=_.cloneDeep(this.teacherInfoForm);
      }

    },


    watch: {

      teacherInfoForm: {
        handler: function (after, before) {
          var _this = this;
          // console.log(JSON.stringify(after))
          // console.log(JSON.stringify(_this.teacherInfoForm2));
          this.searchIsOk = JSON.stringify(after) !== JSON.stringify(_this.teacherInfoForm2);

//          this.searchIsOk = Object.keys(after).some( function( prop ) {
//            return after[prop] !== _this.teacherInfoForm2[prop];
//          });
          // console.log(this.searchIsOk);
          this.setValue();
        },
        deep: true
      }
    },
    beforeRouteLeave  (to, from, next) {
      if (this.isReturnPage) {
        next();
      } else {
        if (this.searchIsOk) {
          this.$confirm('您当前做了编辑操作，是否需要保存？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
//              type: 'warning'
          }).then(() => {
            //确定
            this.isSavebtn=false;
            this.saveteacherInfoForm();
            next()
          }).catch(() => {
            next()
          });
        }else{
          next()
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#editteachers .space-between{
    display: flex;
    justify-content: space-between;
  }
#editteachers  .space-around{
    display: flex;
    justify-content: space-around;
  }
#editteachers  .tabs-header .editor{
    padding: 10px;
    display: block;
  }


#editteachers  .pagination{
    margin-top: 30px;
  }
#editteachers  b{
    font-weight: normal;
  }
#editteachers   .blind{
    clip: rect(1px,1px,1px,1px);
    clip: rect(1px 1px 1px 1px);
    position: absolute;
  }
 /* .el-select .el-input .el-input__icon{
    right:420px;
  }*/
  /*负责人样式*/
/*
  .space-between{
    line-height: 50px;
    float: right;
    margin-left: 20px;

  }
  .el-table{width:742px;margin: 0 auto;}
  .principal-top span{display: inline-block;}
  .principal-top{width:984px;height:50px;line-height: 50px;   border-bottom: 1px solid #e9edf1;margin-bottom:16px;}
*/
.dialogupd.el-dialog__wrapper .el-dialog{
  width: 420px;
}
.dialogupd.el-dialog__wrapper .el-dialog .el-dialog__header{
  background-color: #0d9ee9;
  background-position: 80px 0px;
}
</style>
