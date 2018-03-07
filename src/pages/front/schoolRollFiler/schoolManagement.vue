<template>
  <div id="schoolBaseInfo"  class="addeditinfo" style="text-align: left">
    <div class="main-content" v-loading.fullscreen.lock="fullscreenLoading">
      <el-form :model="ruleForm" :rules="rules" :show-message="!isShowSchool" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-on:submit="submitForm">
        <div class="btns">
        <!--  <i></i> <span class="bluespan">基础信息</span>-->
          <div style="float: right;">
            <el-button style="float:right;" class="white-color el-button el-button--primary" type="primary" v-if="isShowSchool" @click="changeShowSchool" > 编辑</el-button>

            <el-button  class="white-color el-button   el-button--primary" type="primary" v-if="!isShowSchool" @click="cancelSaveClick" > 取消</el-button>
            <el-button class="white-color el-button el-button--primary"  type="primary" v-if="!isShowSchool"  @click="submitForm()"  > 保存</el-button>
          </div>
        </div>
        <el-form-item label="所属机构：" prop="id">
          <span>{{childrenName}}</span>
        </el-form-item>
        <el-form-item label="学校名称：" prop="name" :class="{'no-star': isShowSchool != false}" >
          <el-input v-model.trim="ruleForm.name" v-show="isShowSchool == false" :maxlength="30"  class="inputWidth"></el-input>
          <p v-show="isShowSchool != false" >{{ruleForm.name}}</p>
        </el-form-item>
        <el-form-item label="学校类型：" prop="schoolType" :class="{'no-star': isShowSchool!=false}">
          <el-select name="schoolType" id="ruleForm.schoolType" v-model="ruleForm.schoolType"  class="inputWidth" v-on:change="changeSchoolType" v-show="isShowSchool == false">
            <el-option label="请选择" value="">请选择</el-option>
            <!--<el-option label="大学" value="1">大学</el-option>-->
            <el-option label="高中" value="2">高中</el-option>
            <el-option label="初中" value="3">初中</el-option>
            <el-option label="完中" value="4">完中</el-option>
            <el-option label="九年一贯制" value="5">九年一贯制</el-option>
            <el-option label="小学" value="6">小学</el-option>
            <!--  <el-option label="教学点" value="7">教学点</el-option>-->
            <el-option label="完小" value="8">完小</el-option>
            <el-option label="职业高中(职高)" value="9">职业高中(职高)</el-option>
            <el-option label="中等专业学校(中专)" value="10">中等专业学校(中专)</el-option>
            <!--  <el-option label="技工学校(技校)" value="11">技工学校(技校)</el-option>
              <el-option label="普通高等学校(体校、军校)" value="12">普通高等学校(体校、军校)</el-option>-->
            <el-option label="十二年一贯制" value="13">十二年一贯制</el-option>
          </el-select>
          <p v-show="isShowSchool != false" >{{convertSchoolType(ruleForm.schoolType)}}</p>
        </el-form-item>
        <el-form-item label="学制：" prop="codeType" :class="{'no-star': isShowSchool!=false}">
          <!-- 学制不可选择情况：职高、职专、高中、其它情况；-->
          <el-select  @change="changeSchooling"  class="inputWidth" v-show="isShowSchool == false" :placeholder="codeTypeCovert.showStr" v-model="codeTypeCovert.saveVal">
            <el-option label='六三制' value="1">六三制</el-option>
            <el-option label='五四制' value="2">五四制</el-option>
          </el-select>
          <p v-show="isShowSchool != false" >{{convertCodeType(ruleForm.codeType)}}</p>
        </el-form-item>
        <el-form-item label="教学范围：" prop="codeStart" :class="{'no-star': isShowSchool!=false, 'region': true}">
          <ul class="grads" v-show="isShowSchool == false">
            <li v-for="(grad, index) in grads" v-show="grad['display'] === true">
              <label v-bind:for="'grad' + index" v-bind:class="{ disabled:grad['disabled'], checked:grad['checked'] }">{{grad['name']}}</label>
              <input type="checkbox" v-bind:id="'grad' + index" name="grad[]" v-bind:disabled="grad['disabled']" v-bind:checked="grad['checked']" class="blind" v-on:change="changeGrad(index, $event)">
            </li>
          </ul>
          <p v-show="isShowSchool != false" >{{convertGrads()}}</p>
        </el-form-item>
        <el-form-item label="地理位置：" prop="position"  :class="{'no-star': isShowSchool!=false}">
          <el-select v-model="ruleForm.position"  class="inputWidth" v-show="isShowSchool == false">
           <!-- <el-select style="width:288px;"  :placeholder="positionCovert.showStr" v-model="positionCovert.saveVal" @change="setPositionFunc" v-show="isShowSchool == false">-->
            <el-option label="中心城区" value="1"></el-option>
            <el-option label="城乡结合" value="2"></el-option>
            <el-option label="近郊" value="3"></el-option>
            <el-option label="远郊" value="4"></el-option>
           <!-- <el-option label="山区" value="5"></el-option>-->
          </el-select>
          <p v-show="isShowSchool != false" >{{convertPosition(ruleForm.position)}}</p>
        </el-form-item>
        <el-form-item label="教师数量：">
          <p>{{ruleForm.teacherCount}}&nbsp;人</p>
        </el-form-item>
        <el-form-item label="学生数量：">
          <p>{{ruleForm.studentCount}}&nbsp;人</p>
        </el-form-item>
        <!--------------------------学校地址-------------------------------->
        <el-form-item label="学校地址：" prop="address">
          <el-select v-model="selectedDZProvince" @change="dzProvinceChange" style="width:288px;margin-bottom: 10px;"  v-show="isShowSchool == false"  :placeholder="selectedDZProvince.name || '省份'">
            <el-option
              v-for="item in dzProvince"
              :label="item.name"
              :value="item"
              :key="item.id"
            >
            </el-option>
          </el-select>
          <el-select v-model="selectedDZCity" @change="dzCityChange" style="margin-bottom: 10px;"  :placeholder="selectedDZCity.name || '城市'" v-show="isShowSchool == false">
            <el-option
              v-for="item in dzCity"
              :label="item.name"
              :value="item"
              :key="item.id"
            >
            </el-option>
          </el-select>
          <el-select v-model="selectedDZCounty" @change="dzCountyChange" style="margin-bottom: 10px;"  :placeholder="selectedDZCounty.name || '区域'" v-show="isShowSchool == false">
            <el-option
              v-for="item in dzCounty"
              :label="item.name"
              :value="item"
              :key="item.id"
            >
            </el-option>
          </el-select>

          <el-input type="textarea" class="address" v-model.trim="ruleForm.address"   placeholder="请输入详细地址" v-show="isShowSchool == false" :maxlength="50"></el-input>
          <p v-show="isShowSchool != false" >{{(selectedDZProvince.name || '')+' '+( selectedDZCity.name || '')+' '+( selectedDZCounty.name || '')+' '+(ruleForm.address)}}</p>
        </el-form-item>
        <!--------------------------学校地址结束-------------------------------->
        <el-form-item label="描述：" prop="describe">
          <el-input type="textarea" v-model.trim="ruleForm.describe" v-show="isShowSchool == false"   :maxlength="200"></el-input>
          <p v-show="isShowSchool != false" >{{ruleForm.describe}}</p>
        </el-form-item>
      </el-form>

      <div class="tabs-body">
        <el-dialog title="信息提示" :close-on-click-modal="false" :show-close="false" v-model="showSchoolYearDialog" top="50%"  size="tiny">
          <div class="text-center">
            <p>学年升级：<span>{{nowSchoolYear}}</span>学年</p>
            <p>请前往班级管理界面做班级维护！ </p>
          </div>
          <span slot="footer" class="text-center dialog-footer">
              <el-button type="primary" @click="toStudentsMgr">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import ElIcon from "../../../../node_modules/element-ui/packages/icon/src/icon";

  if(!Array.prototype.remove) {
    Array.prototype.remove = function(item) {
      var i = this.indexOf(item);
      if(i === -1) {
        return;
      }
      this.splice(i, 1);
    };
  }
  function arrange(source) {
    var t;
    var ta;
    var r = [];
    source.forEach(function(v) {
      if (t === v) {
        ta.push(t);
        t++;
        return;
      }

      ta = [v];
      t = v + 1;
      r.push(ta);
    });
    return r;
  }
  var grads_default = [
    {
      checked:false,
      name:'一年级',
      display: true
    },
    {
      checked:false,
      name:'二年级',
      display: true
    },
    {
      checked:false,
      name:'三年级',
      display: true
    },
    {
      checked:false,
      name:'四年级',
      display: true
    },
    {
      checked:false,
      name:'五年级',
      display: true
    },
    {
      checked:false,
      name:'六年级',
      display: true
    },
    {
      checked:false,
      name:'初一',
      display: true
    },
    {
      checked:false,
      name:'初二',
      display: true
    },
    {
      checked:false,
      name:'初三',
      display: true
    },
    {
      checked:false,
      name:'初四',
      display: false
    },
    {
      checked:false,
      name:'高一',
      display: true
    },
    {
      checked:false,
      name:'高二',
      display: true
    },
    {
      checked:false,
      name:'高三',
      display: true
    }
  ];
  export default {
    components: {ElIcon},
    data() {
      var regExp = /select|update|delete|truncate|join|union|exec|insert|drop|count|script|src|alert|window|document|location|>|<|%/i;
      var checkSchoolName = (rule, value, callback) => {
        if(value == null || value == ""){
          callback(new Error("学校名称不能为空！"));
        }else if(value.length > 30){
          callback(new Error("最多可输入30个字！"))
        }else if(regExp.test(value)){
          callback(new Error("输入中不能包含特殊字符！"))
        }else{
          callback();
        }
      };
      var checkAddress = (rule, value, callback) => {
        if(value == null || value == ""){
          callback();
        }else if(value.length > 50){
          callback(new Error("最多可输入50个字！"))
        }else if(regExp.test(value)){
          callback(new Error("输入中不能包含特殊字符！"))
        }else{
          callback();
        }
      };
      var checkDescribe = (rule, value, callback) => {
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
      var checkCodeType = (rule, value, callback) => {
        if(value == null || value == ""){
          callback(new Error("学制不能为空！"))
        }
        else{
          callback();
        }
      };
      return {
      	isRouterLeave: false, //不是菜单点击切换
        isShowSchool: true, //是否呈现学校基本信息
        fullscreenLoading:  true, //是否全屏遮罩
        userInfo:'', //用户基本信息
        schoolId: '',//当前学校ID
        educationStr: '',  //保存成功后返显的机构名称
        childrenName: '',
        grads: '',
        selectedGrad: [],
        codeVal: '', //学制value值，Number类型
        indexStart: '',
        indexEnd: '',
        isUpgrade: 0, //是否升学年
        nowSchoolYear: '', //当前学年
        showSchoolYearDialog: false, //是否展示升学年窗口
        ruleForm: {
          orgId: '',       //区域ID
          name: '',        //学校名称
          schoolType: '',  //学校类型
          codeType: '',    //学制
          codeStart: '',   //教学开始
          codeEnd: '',      //教学结束
          position: '',   //地理位置
          address: '',     //详细地址
          describe: '',         //描述
        },
        oldSchoolInfo: {},
        positionCovert: {
          showStr: '',
          saveVal: ''
        },
        codeTypeCovert: {
          showStr: '',
          saveVal: '' //学制value值，Number类型
        },
        editInitCode: {
          initCodeStart: '',
          initCodeEnd: '',
          initSchoolType: '',
          initCodeType: ''
        },
        //所在地址
        dzProvince: [],
        dzCity: [],
        dzCounty: [],
        selectedDZProvince: {},
        selectedDZCity: {},
        selectedDZCounty: {},
        addrOrgNameStr: '',
        editInitAddressOrg:{
          provinceId: '',
          provinceName: '',
          cityId: '',
          cityName: '',
          countyId: '',
          countyName: ''
        },
        //校验
        rules: {
          name: [
           /* {required: true, message: '学校名称不能为空！', trigger: 'change'},
            {min: 1, max: 30, message: '请输入1~30个汉字！', trigger: 'blur'},
            { pattern: /^[\u4e00-\u9fa5]{1,30}$/, message: '请输入1~30个汉字！'}*/
            {required: true, validator: checkSchoolName, trigger: 'blur' }
          ],
          schoolType:[
            {required: true, message: '学校类型不能为空！', trigger: 'blur'},
          ],
          codeType:[
            {required: true,validator: checkCodeType, trigger: 'blur'}
          ],
          codeStart: [
            {required: true, type: 'number', message: '教学范围必须选择！', trigger: 'blur' }
          ],
          position:[
            {required: true, message: '地理位置不能为空！', trigger: 'blur'},
          ],
          address: [
            {validator: checkAddress, trigger: 'blur' }
          ],
          describe: [
            {validator: checkDescribe, trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      //获取机构树
//      this.getEduOrgTree();
      //获取当前学校基本信息
      this.getSchoolDetail();
      //获取地址树
      this.getDzProvinceList();
    },
    methods: {
      //学校类型转换
      convertSchoolType(schoolType){
        let schoolTypeArr = ['','大学','高中','初中','完中','九年一贯制','小学','教学点','完小','职业高中(职高)','中等专业学校(中专)','技工学校(技校)','普通高等学校(体校、军校)','十二年一贯制'];
        return schoolTypeArr[schoolType || 0] || '';
      },
      //学制转换
      convertCodeType(codeType){
        if(codeType == '5-4'){
          return "五四制"
        }
        else{
          return "六三制";
        }
      },
      //教学范围选中呈现
      convertGrads(){
      	let grads = this.grads;
        let gradStr = '';
        for(let i =0; i<grads.length; i++){
          let grad = grads[i];
          if(grad.checked == true){
            if(gradStr == ''){
              gradStr += grad.name;
            }else{
              gradStr += '、'+grad.name;
            }
          }
        }
        return gradStr;
      },
      //地理位置转换
      convertPosition(position){
        let positionArrs = ['','中心城区','城乡结合','近郊','远郊','山区'];
        return positionArrs[position || 0] || '';
      },
      //设置地理位置
      setPositionFunc(val){
        this.positionCovert.showStr = this.convertPosition(val);
      },
      //教学范围-学校类型改变事件
      changeSchoolType: function(val) {
        var that = this;
        //设置是否切换了学制（若当前学制不等于初始学制，那么不是设定的初始code值）
        if(that.ruleForm.schoolType != that.editInitCode.initSchoolType){
          that.isSetInitCode = false;
        }
        that.changeSchooling();
      },
      //教学范围-学制改变事件
      changeSchooling: function(val){
        var that = this;
        if(val == null ||  val == ""){
//          console.log('初始化教学范围-val为""的时候~~~~codeType='+that.ruleForm.codeType);
          //还未切换学制，初始化进入
          that.codeVal =  that.ruleForm.codeType == '5-4' ? 2 : 1;
        }
        else{
          //切换了学制
          that.isSetInitCode = false;
          that.codeTypeCovert.showStr = this.convertCodeType(val);
          that.codeVal = val;
//          console.log('初始化教学范围-val不为""的时候~~~~codeTypeNumberVal='+val);
          that.ruleForm.codeStart = 1;
          that.indexStart = 0;
        }
        that.grads = JSON.parse(JSON.stringify(grads_default));
        that.selectedGrad = [];
        if(!that.ruleForm.schoolType) {
          return;
        }
        if(that.codeVal == 2) {
          //五四制
          that.grads[5].display = false;
          that.grads[9].display = true;
        }
        else {
          that.grads[5].display = true;
          that.grads[9].display = false;
        }
        if(!that.isSetInitCode){
          //小学，完小
          if(Number(that.ruleForm.schoolType) == 6 || Number(that.ruleForm.schoolType) == 8) {
            if(val == null  ||  val == ""){
              that.ruleForm.codeStart = 1;
              that.indexStart = 0;
            }
            that.ruleForm.codeEnd = 7 - (Number(that.codeVal) || 1);
            that.indexEnd = 6 - (Number(that.codeVal) || 1);
          }
          //初中，九年一贯制
          if(Number(that.ruleForm.schoolType) == 3 || Number(that.ruleForm.schoolType) == 5) {
            if(Number(that.ruleForm.schoolType) == 3) {
              if(that.codeVal == 2){
                //初中，五四制，下标6-9，存储6-9
                that.ruleForm.codeStart = 6;
                that.indexStart = 6;
              }
              else{
                that.ruleForm.codeStart = 7;
                that.indexStart = 6;
              }
            }
            else{
              that.ruleForm.codeStart = 1;
              that.indexStart = 0;
            }
            that.ruleForm.codeEnd = 9;
            that.indexEnd = 9;
          }
          //高中，完中，职高，职专
          if([2,4,9,10].indexOf(Number(that.ruleForm.schoolType) || 0) != -1) {
            if(Number(that.ruleForm.schoolType) == 4 && that.codeVal == 1){
              //完中-六三制
              that.ruleForm.codeStart = 7;
              that.indexStart = 6;
            }
            else if(Number(that.ruleForm.schoolType) == 4 && that.codeVal == 2){
              //完中-五四制
              that.ruleForm.codeStart = 6;
              that.indexStart = 6;
            }
            else {
              that.ruleForm.codeStart = 10;
              that.indexStart = 10;
            }
            that.ruleForm.codeEnd = 12;
            that.indexEnd = 12;
          }
          //十二年一贯制
          if(Number(that.ruleForm.schoolType) == 13){
            that.ruleForm.codeStart = 1;
            that.indexStart = 0;
            that.ruleForm.codeEnd = 12;
            that.indexEnd = 12;
          }
        }
        else{
          //初始化情况
          //五四制情况：1-5年级下标减1；其它年级下标不变
          //六三制情况：1-9年级下标减1；其它年级下标不变
          if (
            (that.editInitCode.initCodeEnd <= 5 && that.codeVal == 2) ||
            (that.editInitCode.initCodeEnd <= 9 && that.codeVal == 1)
          ) {
            that.indexEnd = Number(that.editInitCode.initCodeEnd) - 1;
          }
          else {
            that.indexEnd = Number(that.editInitCode.initCodeEnd);
          }
          if (
            (that.editInitCode.initCodeStart <= 5 && that.codeVal == 2) ||
            (that.editInitCode.initCodeStart <= 9 && that.codeVal == 1)
          ) {
            that.indexStart = Number(that.editInitCode.initCodeStart) - 1;
          }
          else {
            that.indexStart = Number(that.editInitCode.initCodeStart);
          }
        }
        //匹配下标选中与未选中状态
        for(let j = that.indexStart;j <= that.indexEnd;j++) {
          //抛除特殊的
          if(Number(that.codeVal) == 2 && j == 5){
            //五四制  --6年级下标ID=5刨除
            continue;
          }
          if(Number(that.codeVal) == 1 && j == 9){
            //六三制  --初四下标I=9刨除
            continue;
          }
          that.grads[j].checked = true;
          that.selectedGrad.push(j);
        }
      },
      setCodeSEnd(minGradeName, maxGradeName, thisName){
        var that = this;
        let codeListBy63 = [
          {name: '一年级', codeIndex: 1},
          {name: '二年级', codeIndex: 2},
          {name: '三年级', codeIndex: 3},
          {name: '四年级', codeIndex: 4},
          {name: '五年级', codeIndex: 5},
          {name: '六年级', codeIndex: 6},
          {name: '初一', codeIndex: 7},
          {name: '初二', codeIndex: 8},
          {name: '初三', codeIndex: 9},
          {name: '高一', codeIndex: 10},
          {name: '高二', codeIndex: 11},
          {name: '高三', codeIndex: 12},
        ];
        let codeListBy54 = [
          {name: '一年级', codeIndex: 1},
          {name: '二年级', codeIndex: 2},
          {name: '三年级', codeIndex: 3},
          {name: '四年级', codeIndex: 4},
          {name: '五年级', codeIndex: 5},
          {name: '初一', codeIndex: 6},
          {name: '初二', codeIndex: 7},
          {name: '初三', codeIndex: 8},
          {name: '初四', codeIndex: 9},
          {name: '高一', codeIndex: 10},
          {name: '高二', codeIndex: 11},
          {name: '高三', codeIndex: 12},
        ];
//        let codeMinVal = 0;
//        let codeMaxVal = 0;
        let eachLists = [];
        if(that.codeVal == 2){
          //五四制
          eachLists = codeListBy54;
        }
        else{
          //六三制
          eachLists = codeListBy63;
        }
        let thisCode = 0;
        for(let j = 0; j<eachLists.length; j++){
          if(thisName != null && thisName != ""){
            thisCode = eachLists[j].codeIndex;
          }
          else{
            if(eachLists[j].name == minGradeName){
//        		codeMinVal = eachLists[j].codeIndex;
              that.ruleForm.codeStart = eachLists[j].codeIndex;
            }
            if(eachLists[j].name == maxGradeName){
//        		codeMaxVal = eachLists[j].codeIndex;
              that.ruleForm.codeEnd = eachLists[j].codeIndex;
            }
          }
        }
        return thisCode;
      },
      //扩范围选中或中途点击取消，重置选中的下标数
      setSelectedGradByBetween(tempIndex){
        let that = this;
        if(that.selectedGrad != null && that.selectedGrad.length == 0){
          this.ruleForm.codeStart = '';
          this.ruleForm.codeEnd = '';
          this.$refs.ruleForm.validateField('codeStart').validate = false;
        }
        else {
          //如果是范围的选取，那么应该填入范围内的数据
          if (that.selectedGrad.length > 0) {
            let minS = Math.min.apply(Math, that.selectedGrad.sort(function (a, b) {
              return a - b;
            }));
            let maxS = Math.max.apply(Math, that.selectedGrad.sort(function (a, b) {
              return a - b;
            }));
            let removeTSIndex = -1;
            //console.log('多次选中处理,此时min=' + minS + ',max=' + maxS);
            if (this.codeVal == 2) {
              removeTSIndex = 5;
            }
            else {
              removeTSIndex = 9;
            }
            for (let z = minS; z <= maxS; z++) {
              if (removeTSIndex != z) {
                tempIndex.push(z);
              }
            }
          }
          //        console.log('学制改变changeGrade：'+event.currentTarget.checked+',index='+index);
          //        console.log(that.grads);
          //        console.log(that.selectedGrad);
          //        console.log('去重合并数组');
          let newSelectedGrad = _.unionWith(that.selectedGrad, tempIndex, _.isEqual);
          that.selectedGrad = newSelectedGrad;
          //        console.log(that.selectedGrad);
        }
      },
      //教学范围-教学范围改变事件
      changeGrad(index, event) {
        var that = this;
        that.isSetInitCode = false;
        let tempIndex = [];

        if(event.currentTarget.checked) {
          that.selectedGrad.push(index);
          that.grads[index].checked = true;
        } else {
          that.selectedGrad.remove(index);
          that.grads[index].checked = false;
        }
        //扩范围选中或中途点击取消，重置选中的下标数
        this.setSelectedGradByBetween(tempIndex);
        if(that.selectedGrad.length > 0) {
          var min = Math.min.apply(Math, that.selectedGrad.sort(function (a, b) {
            return a - b;
          }));
          var max = Math.max.apply(Math, that.selectedGrad.sort(function (a, b) {
            return a - b;
          }));
          let minGradeName = that.grads[min].name;
          let maxGradeName = that.grads[max].name;
          for (var j = min; j <= max; j++) {
            if (!that.grads[j].checked && that.grads[j].display) {
              that.grads[j].checked = true;
            }
          }
          this.setCodeSEnd(minGradeName, maxGradeName, null);
        }
        else{

        }

        //验证下
        this.$refs.ruleForm.validateField('codeStart');
      },
      //控制表单呈现数据还是修改内容
      changeShowSchool(){
        this.isShowSchool = false; //不呈现信息，应该是可编辑状态
      },
      resetGradesByDefault(){
        this.grads = JSON.parse(JSON.stringify(grads_default));
        this.selectedGrad = [];
        //初始化情况
        //五四制情况：1-5年级下标减1；其它年级下标不变
        //六三制情况：1-9年级下标减1；其它年级下标不变
        if (
          (this.editInitCode.initCodeEnd <= 5 && this.codeVal == 2) ||
          (this.editInitCode.initCodeEnd <= 9 && this.codeVal == 1)
        ) {
          this.indexEnd = Number(this.editInitCode.initCodeEnd) - 1;
        }
        else {
          this.indexEnd = Number(this.editInitCode.initCodeEnd);
        }
        if (
          (this.editInitCode.initCodeStart <= 5 && this.codeVal == 2) ||
          (this.editInitCode.initCodeStart <= 9 && this.codeVal == 1)
        ) {
          this.indexStart = Number(this.editInitCode.initCodeStart) - 1;
        }
        else {
          this.indexStart = Number(this.editInitCode.initCodeStart);
        }
        //匹配下标选中与未选中状态
        for(let j = this.indexStart;j <= this.indexEnd;j++) {
          //抛除特殊的
          if(Number(this.codeVal) == 2 && j == 5){
            //五四制  --6年级下标ID=5刨除
            continue;
          }
          if(Number(this.codeVal) == 1 && j == 9){
            //六三制  --初四下标I=9刨除
            continue;
          }
          this.grads[j].checked = true;
          this.selectedGrad.push(j);
        }
      },
      //取消修改的信息
      cancelSaveClick(){
        this.isShowSchool = true;
        this.codeVal = _.cloneDeep(this.oldSchoolInfo.codeVal);
        console.log('取消修改，查看旧版的codeVal='+this.codeVal);
        this.codeTypeCovert.showStr = _.cloneDeep(this.oldSchoolInfo.codeTypeInitShowStr);
        this.codeTypeCovert.saveVal = _.cloneDeep(this.oldSchoolInfo.saveVal);
        this.ruleForm = _.cloneDeep(this.oldSchoolInfo.data);
        //重置grads
        this.resetGradesByDefault();
      },
      //判断你是否空对象
      isEmptyData(name){
        return name !== undefined && name !== null && name !== '' ? false : true;
      },
      //跳转至学生管理界面
      toStudentsMgr(){
      	this.showSchoolYearDialog = false;
      	this.$router.replace('/classManagement');
      },

      //获取地址
      getDzProvinceList(){
        let params = {
          id: 0,
          type: 2
        };
        this.$ajax('/schadmin/getAreaChilds',params)
          .then(res => {
            this.dzProvince = res.data;
          }).catch(() => {
        });
      },
      dzProvinceChange(item){
        this.selectedDZCity = {};
        this.selectedDZCountry = {};
        this.dzCounty=[];
        if(item.id == null || item.id == ''){
          return;
        }
        let params={
          id: item.id,
          type: 2
        };
        this.$ajax('/schadmin/getAreaChilds',params)
          .then(res => {
            this.dzCity = res.data;
            if(this.editInitAddressOrg.cityId != null && this.editInitAddressOrg.cityId != ''){
              for(let dzI = 0; dzI<this.dzCity.length; dzI++){
                if(this.dzCity[dzI].id == this.editInitAddressOrg.cityId && this.selectedDZProvince.id == this.editInitAddressOrg.provinceId){
                  this.selectedDZCity = this.dzCity[dzI];
                  break;
                }
              }
            }
          }).catch(() => {
        });

      },
      dzCityChange(item){
        this.selectedDZCounty = {};
        if(item.id == null || item.id == ''){
          return;
        }
        let params={
          id: item.id,
          type: 2
        };
        this.$ajax('/schadmin/getAreaChilds',params)
          .then(res => {
            this.dzCounty = res.data;
            if(this.editInitAddressOrg.countyId != null && this.editInitAddressOrg.countyId != ''){
              for(let dzI = 0; dzI<this.dzCounty.length; dzI++){
                if(this.dzCounty[dzI].id == this.editInitAddressOrg.countyId && this.selectedDZCity.id == this.editInitAddressOrg.cityId){
                  this.selectedDZCounty = this.dzCounty[dzI];
                  break;
                }
              }
            }
          }).catch(() => {
        });
      },
      dzCountyChange(item){
        this.selectedDZCounty = item;
      },
      //当前学校所在地址信息
      loadSetCurrentAddressOrg(data, that){
        that.editInitAddressOrg = Object.assign({}, data.orgInfoV3);
        //初始设定呈现
        if(that.editInitAddressOrg.provinceId != null && that.editInitAddressOrg.provinceId != ''){
          for(let dzI = 0; dzI<that.dzProvince.length; dzI++){
            if(that.dzProvince[dzI].id == data.orgInfoV3.provinceId){
              that.selectedDZProvince = that.dzProvince[dzI];
              break;
            }
          }
          //拿取市
          that.dzProvinceChange({
            id: that.editInitAddressOrg.provinceId,
            name: that.editInitAddressOrg.provinceName
          });
        }
        if(that.editInitAddressOrg.cityId != null && that.editInitAddressOrg.cityId != ''){
          //拿取区
          that.dzCityChange({
            id: that.editInitAddressOrg.cityId,
            name: that.editInitAddressOrg.cityName
          });
        }
      },

      //获取当前学校信息
      getSchoolDetail(){
        let schoolDetailPath = '/schadmin/getOneSchool?id='+this.schoolId;
        this.$ajax(schoolDetailPath)
          .then(res => {
            if(res.code == 200){
              this.ruleForm = res.data; //学校信息
              this.ruleForm.position = res.data.position+'';
              this.educationStr = res.data.eduOrganPojo.name || '';
              this.childrenName = res.data.eduOrganPojo.childrenName || '';
              this.editInitCode.initCodeStart = res.data.codeStart || '';
              this.editInitCode.initCodeEnd = res.data.codeEnd || '';
              this.editInitCode.initSchoolType = res.data.schoolType;
              this.editInitCode.initCodeType = res.data.codeType || '';
              this.isSetInitCode = true;
              this.positionCovert.showStr = this.convertPosition(this.ruleForm.position);
              this.codeTypeCovert.showStr= this.convertCodeType(res.data.codeType);
              this.codeVal = res.data.codeType == '5-4' ? 2 : 1;

              //初始设置当前所在地址
              this.loadSetCurrentAddressOrg(res.data, this);

//              console.log('初始化的时候~~~~codeType-Val='+res.data.codeType);
//              console.log('初始化的时候~~~~ruleForm.codeType='+this.ruleForm.codeType);
              this.fullscreenLoading = false;
              this.oldSchoolInfo = {
                codeVal: res.data.codeType == '5-4' ? 2 : 1,
                data: {
                  name: res.data.name || '',
                  schoolType: res.data.schoolType,
                  codeType: res.data.codeType || '',
                  codeStart: res.data.codeStart || '',
                  codeEnd: res.data.codeEnd || '',
                  position: res.data.position || '',
                  positionStr: res.data.positionStr || '',
                  studentCount: res.data.studentCount || 0,
                  teacherCount: res.data.teacherCount || 0,
                  address: res.data.address || '',
                  describe: res.data.describe || '',
                  eduOrganPojo: res.data.eduOrganPojo || {},
                  educationId: res.data.educationId || '',
                  fuserListStr: res.data.fuserListStr || '',
                  id: res.data.id || '',
                  orgId: res.data.orgId || '',
                  orgList: res.data.orgList,
                  delFlag: res.data.delFlag || '',
                  type: res.data.type || '',
                },
                codeTypeInitShowStr: this.convertCodeType(res.data.codeType)
              };
              this.isUpgrade = res.data.isUpgrade; // isUpgrade; //是否在升级 0:否,1:是  默认0
              if(this.isUpgrade == 1){
                //调取学年接口
                this.$ajax('schadmin/findNextSchoolYear').then(res => {
                  if(res.code == 200){
                    this.nowSchoolYear = res.data || '';
                    this.showSchoolYearDialog = true;
                   /* this.$alert('学年升级：'+this.nowSchoolYear+'学年；请前往班级管理界面做班级维护！','信息提示',{
                    	confirmButtonText: '确定', callback:() => {
                      }
                    })*/
                  }else{
                    this.showSchoolYearDialog = false;
                  }
                }).catch({});
              }
            }
          });
      },
      //获取最后选中地址ID
      getSaveAddrOrgId(){
        let orgDZTempObj = {id: '', name: '',addrOrgNameStr: ''};
        if(this.selectedDZCounty.id != null && this.selectedDZCounty.id != '' ){
          orgDZTempObj.id = this.selectedDZCounty.id;
          orgDZTempObj.name = this.selectedDZCounty.name;
          orgDZTempObj.addrOrgNameStr = this.selectedDZProvince.name+' '+this.selectedDZCity.name+' '+this.selectedDZCounty.name;
          //console.log(1);
        }
        else if(this.selectedDZCity.id != null && this.selectedDZCity.id != ''){
          orgDZTempObj.id = this.selectedDZCity.id;
          orgDZTempObj.name = this.selectedDZCity.name;
          orgDZTempObj.addrOrgNameStr = this.selectedDZProvince.name+' '+this.selectedDZCity.name;
          //console.log(2);
        }
        else if(this.selectedDZProvince.id != null && this.selectedDZProvince.id != ''){
          orgDZTempObj.id = this.selectedDZProvince.id;
          orgDZTempObj.name = this.selectedDZProvince.name;
          orgDZTempObj.addrOrgNameStr = this.selectedDZProvince.name;
          //console.log(3);
        }
        //console.log('存储所在地址：id='+orgDZTempObj.id+',name='+orgDZTempObj.name+',nameStr='+orgDZTempObj.addrOrgNameStr);
        return orgDZTempObj;
      },
      //保存数据
      submitForm(next) {
        var that = this;
        this.ruleForm.codeType = that.codeVal == 2 ? '5-4' : '6-3';
        //所在地址
        let addressTempObj = this.getSaveAddrOrgId();

        //选中教学范围
        //修改验证及请求
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let saveObj  = {
              orgId: this.ruleForm.orgId,  //orgID直接从读取到的数据返回
              id : that.schoolId,
              name: that.ruleForm.name, //学校名称
              address: that.ruleForm.address || '', //学校地址
              position: that.ruleForm.position || '',   //地理位置
              schoolType:  that.ruleForm.schoolType || '',  //学校类型
              codeType: that.ruleForm.codeType || '',    //学制
              codeStart: that.ruleForm.codeStart || '',   //教学开始
              codeEnd: that.ruleForm.codeEnd || '',      //教学结束
              describe: that.ruleForm.describe || '', //描述
              addressOrgId: addressTempObj.id
            };
//            console.log('验证成功~~~~');
//            console.log(saveObj.schoolType+','+saveObj.codeType+','+saveObj.codeStart+','+saveObj.codeEnd);
            this.$ajax('/schadmin/updateOneSchoolExecute', saveObj)
              .then(res => {
                if(res.code == 200) {
//                  this.buildGrade(); //调用新增年级接口（后台自动生成年级）
                  let _that = this;
                  this.useAlert('success', '修改成功',function () {
                  	//修改成功，展示文本
                    if(!_that.isRouterLeave){
                      _that.isShowSchool = true;
                    }
                    else{
                      next();
                    }
//                      _that.$router.replace('/schoolManagement');
                  });
                }else{
                  this.useAlert('error', res.message,function () {});
                }
              });
          } else {
            this.useAlert('error', '请先填写相关信息!',function () {});
            return false;
          }
        });
      },
      buildGrade(schoolId) {
        //console.log(this.ruleForm)
        //  var params = Object.assign( this.ruleForm, {educationId : this.userInfo.education.educationId},{orgId : this.userInfo.education.orgId});
        this.$ajax('/schadmin/buildGrade', {schoolId: this.schoolId})
          .then(res => {
          });
      },
      //判断字段是否改变的状态值集合
      checkChangeField(){
        //基本信息判断-----isEmptyData 是空对象 返回 true
        let nameFlag = (this.ruleForm.name|| '' ) == this.oldSchoolInfo.data.name;
        let schoolFlag = (this.ruleForm.schoolType|| '' ) == this.editInitCode.initSchoolType;
        let codeType = this.codeVal == 2 ? '5-4' :'6-3';
        let codeFlag = codeType == this.editInitCode.initCodeType;
        let codeStartFlag = (this.ruleForm.codeStart|| '' ) == this.editInitCode.initCodeStart;
        let codeEndFlag = (this.ruleForm.codeEnd|| '' ) == this.editInitCode.initCodeEnd;
        let positionFlag = (this.ruleForm.position || '') == this.oldSchoolInfo.data.position;
        let addressFlag = (this.ruleForm.address || '' ) == this.oldSchoolInfo.data.address;
        let describeFlag = (this.ruleForm.describe|| '' ) == this.oldSchoolInfo.data.describe;

        //所在地址修改判断
        let addressOrgId = this.getSaveAddrOrgId().id;
        let defaultAddressId = '';
        if(this.editInitAddressOrg.countyId != null && this.editInitAddressOrg.countyId != ""){
          defaultAddressId = this.editInitAddressOrg.countyId;
        }
        else if(this.editInitAddressOrg.cityId != null && this.editInitAddressOrg.cityId != ""){
          defaultAddressId = this.editInitAddressOrg.cityId;
        }
        else if(this.editInitAddressOrg.provinceId != null && this.editInitAddressOrg.provinceId != ""){
          defaultAddressId = this.editInitAddressOrg.provinceId;
        }
        let addressIdFlag = (addressOrgId == defaultAddressId) ? true: false;

//            console.log(orgIdFlag);
        let flagList = [nameFlag, schoolFlag, codeFlag, codeStartFlag, codeEndFlag, positionFlag, addressFlag, describeFlag, addressIdFlag];
        //console.log(flagList);
        return flagList;
      },
    },
    created: function() {
      this.grads = JSON.parse(JSON.stringify(grads_default));
    },
    beforeMount(){
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.schoolId = this.userInfo.schools.schoolId;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    beforeRouteLeave  (to, from, next) {
    	this.isRouterLeave = true;
      if(this.isShowSchool){
        next()
      }
      else{
        //基本信息判断-----isEmptyData 是空对象 返回 true
        let flagList = this.checkChangeField();
        //未进行任何更改，返回
        //有更改提示
        if(flagList.indexOf(false) != -1){
          this.$confirm('你当前做了编辑操作，是否要保存？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
//            type: 'warning'
          }).then(() => {
            //确定
            this.submitForm(next);
          }).catch(() => {
            //取消
            next()
          });
        }
        else{
//          console.log('结果中都是空数据，未进行任何更改');
          next()
        }
      }
    }
  }
</script>
<style >
  #schoolBaseInfo{
    padding: 0 20px 50px 20px;
    min-height:830px;
  }
  #schoolBaseInfo  .el-form-item.is-required.no-star .el-form-item__label:before{
    content: '';
    color: #ff4949;
    margin-right: 4px;
  }
  #schoolBaseInfo .el-dialog__title{color: #fff;}
  #schoolBaseInfo .el-dialog__footer{text-align: center;}
  #schoolBaseInfo .el-dialog__footer .el-button:nth-of-type(1){float: none;margin-top: 10px;}
/*  系统自带*/
  #schoolBaseInfo .el-form-item {
      margin-bottom: 14px;
    }
  #schoolBaseInfo  .el-form-item__error {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    position: absolute;
    top: 90%;
    left: 0;
  }
  #schoolBaseInfo  .el-form-item__label{
    color:#333;
  }

  /*顶部保存*/
  #schoolBaseInfo .btns {
    padding-bottom: 10px;
    padding-top:10px;
    height:34px;
    line-height: 30px;
    border-bottom: none;
  }
  #schoolBaseInfo .btns a {
    font-size: 14px;
    color: #666;
    line-height: 30px;
  }
  .icon-back:before{
    position: relative;
    top:1px;
  }
  #schoolBaseInfo .icon-conserve:before{
    margin-right: 3px;
  }
  #schoolBaseInfo .el-button span{
    color: #fff;
  }
  /*表格边框问题*/
  .el-table table{
    width: 100%;
  }
  /*标题样式*/
  #schoolBaseInfo  .title{
    padding: 20px 0 18px 0;
    display: inline-block;
    width:100%;
    /* border-bottom: 1px solid #e9edf1;*/
  }
  #schoolBaseInfo  .title i{
    display: inline-block;
    height:16px;
    width:3px;
    margin-right:7px;
    background:#0d9ee9 ;
    position: relative;
    top:3px;
  }
  #schoolBaseInfo .title .bluespan{
    font-size:14px;
    color: #0d9ee9;
    display:inline-block;
    line-height: 12px;
  }

  #schoolBaseInfo .tabs-header{
    float: right;
  }
  /*保存*/
  #schoolBaseInfo .submitForm{
    text-align: right;
    height:50px;
    border-bottom:1px solid #e9edf1;
  }
  #schoolBaseInfo .submitForm .el-button--primary{
    margin-top:8px;
    margin-bottom:0px;
  }

  #schoolBaseInfo p, #schoolBaseInfo span {
    font-size: 14px;
    color: #666;
    font-family: "微软雅黑"
  }

  /*省市区*/
  #schoolBaseInfo .item-text .address{
    margin-top: 22px;
    height: 40px;
    display: block;
  }


  /*添加按钮*/
  #schoolBaseInfo .el-button--info{
    width:40px;
    float: right;
    text-align: center;
  }
  #schoolBaseInfo .grads li{list-style:none;float:left;margin-right:10px}
  #schoolBaseInfo .grads label{border:1px solid lightblue;width:50px;text-align:center;display:inline-block;cursor:pointer}
  #schoolBaseInfo .grads li label.disabled{background:lightgray;color:#000;cursor:not-allowed}
  #schoolBaseInfo .grads li label.checked{background:lightblue;color:#fff}
  #schoolBaseInfo .blind{
    clip: rect(1px,1px,1px,1px);
    clip: rect(1px 1px 1px 1px);
    position: absolute;
  }


  #schoolBaseInfo a, input, textarea, keygen, select, button{font-family:"微软雅黑";}
  #schoolBaseInfo .el-input.is-disabled .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolBaseInfo .el-input.is-disabled .el-input__inner::-moz-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolBaseInfo .el-input.is-disabled .el-input__inner:-ms-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolBaseInfo .el-input.is-disabled .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolBaseInfo .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑"}
  #schoolBaseInfo .el-input__inner::-moz-placeholder{color:#1f2d3d;}
  #schoolBaseInfo .el-input__inner:-ms-input-placeholder{color:#1f2d3d;}
  #schoolBaseInfo .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  /*机构负责人*/

  .text-center p{text-align: center;margin: 5px auto;}
  .text-center.el-dialog__footer{
    text-align: center;
  }
</style>
