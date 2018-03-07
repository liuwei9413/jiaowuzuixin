<template>
  <div id="addschool" class="addeditinfo" style="text-align: left">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-on:submit="submitForm">
      <div  class="btns">
        <a href="javascript:;"  @click="toEduSchoolMgr" class=" icon-back">返回 </a>
      </div>
      <div class="blackDiv1">
        <div class="title btns"><i></i>
          <span class="titlespan">基础信息</span>
          <el-button style="float: right;" class="white-color  el-button   el-button--primary" type="primary" v-if="isSaveSchool == false" @click="submitForm('ruleForm')" >  保存</el-button>
        </div>
      <el-form-item label="校归属地区：" prop="orgInfo" :class="{'no-star': isSaveSchool != false}">
        <el-select v-model="selectedProvince" style="width:215px;" :placeholder="defaultProvince.name" @change="provinceChange" :disabled="defaultMaxLevel>=1" class="item-text"  v-show="isSaveSchool == false">
          <el-option
            v-for="item in province"
            :label="item.name"
            :value="item"
            :key="item.id"
          >
          </el-option>
        </el-select>
        <el-select v-model="selectedCity" style="width:215px;" @change="cityChange" :placeholder="defaultCity.name" class="item-text" v-if="city.length !=0 || (defaultProvince.id  != '' && defaultProvince.id != null )" :disabled="defaultMaxLevel>=2" v-show="isSaveSchool == false">
          <el-option
            v-for="item in city"
            :label="item.name"
            :value="item"
            :key="item.id"
          >
          </el-option>
        </el-select>
        <el-select v-model="selectedCounty" style="width:215px;" @change="countyChange" :placeholder="defaultCounty.name" class="item-text" v-if="county.length !=0 || (defaultCity.id  != '' && defaultCity.id != null )"  :disabled="defaultMaxLevel>=3" v-show="isSaveSchool == false">
          <el-option
            v-for="item in county"
            :label="item.name"
            :value="item"
            :key="item.id"
          >
          </el-option>
        </el-select>
        <p v-show="isSaveSchool != false">{{orgNameStr}}</p>

      </el-form-item>
      <el-form-item label="学校名称：" prop="name"  :class="{'no-star': isSaveSchool != false}">
        <el-input v-model.trim="ruleForm.name" v-show="isSaveSchool == false" :maxlength="30" class="inputWidth"></el-input>
        <p v-show="isSaveSchool != false" >{{ruleForm.name}}</p>
      </el-form-item >
      <el-form-item label="学校类型：" prop="schoolType"  :class="{'no-star': isSaveSchool != false}">
        <el-select name="schoolType" id="ruleForm.schoolType" v-model="ruleForm.schoolType" class="inputWidth"  v-on:change="changeSchoolType" v-show="isSaveSchool == false">
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
        <p v-show="isSaveSchool != false" >{{convertSchoolType(ruleForm.schoolType)}}</p>
      </el-form-item>
      <el-form-item label="学制：" prop="codeType"  :class="{'no-star': isSaveSchool != false}">
        <!-- 学制不可选择情况：职高、职专、高中、其它情况；-->
        <el-select name="codeType" v-model="codeVal"  class="inputWidth" v-on:change="changeSchooling"  v-show="isSaveSchool == false">
          <el-option label='六三制' value="1">六三制</el-option>
          <el-option label='五四制' value="2">五四制</el-option>
        </el-select>
        <p v-show="isSaveSchool != false" >{{convertCodeType(ruleForm.codeType)}}</p>
      </el-form-item>
      <el-form-item label="教学范围" prop="codeStart" class="region"  :class="{'no-star': isSaveSchool != false}">
            <ul class="grads" v-show="isSaveSchool == false">
              <li v-for="(grad, index) in grads" v-show="grad['display'] === true">
              <label v-bind:for="'grad' + index" v-bind:class="{ disabled:grad['disabled'], checked:grad['checked'] }">{{grad['name']}}</label>
              <input type="checkbox" v-bind:id="'grad' + index" name="grad[]" v-bind:disabled="grad['disabled']" v-bind:checked="grad['checked']" class="blind" v-on:change="changeGrad(index, $event)">
              </li>
            </ul>
            <p v-show="isSaveSchool != false" >{{convertGrads(grads)}}</p>
      </el-form-item>
      <el-form-item label="地理位置：" prop="position"  :class="{'no-star': isSaveSchool != false}">
        <el-select v-model="ruleForm.position" class="inputWidth"  placeholder="请选择地理位置"  v-show="isSaveSchool == false">
          <el-option label="中心城区" value="1"></el-option>
          <el-option label="城乡结合" value="2"></el-option>
          <el-option label="近郊" value="3"></el-option>
          <el-option label="远郊" value="4"></el-option>
         <!-- <el-option label="山区" value="5"></el-option>-->
        </el-select>
        <p v-show="isSaveSchool != false" >{{convertPosition(ruleForm.position)}}</p>
      </el-form-item>
      <!--------------------------所在地址-------------------------------->
      <el-form-item label="所在地址：" prop="address">
        <el-select v-model="selectedDZProvince" @change="dzProvinceChange" style="width:215px;margin-bottom: 10px;"  v-show="isSaveSchool == false" placeholder="省份">
          <el-option
            v-for="item in dzProvince"
            :label="item.name"
            :value="item"
            :key="item.id"
          >
          </el-option>
        </el-select>
        <el-select v-model="selectedDZCity" @change="dzCityChange" style="width:215px;margin-bottom: 10px;" placeholder="城市" v-show="isSaveSchool == false">
          <el-option
            v-for="item in dzCity"
            :label="item.name"
            :value="item"
            :key="item.id"
          >
          </el-option>
        </el-select>
        <el-select v-model="selectedDZCounty" @change="dzCountyChange" style="width:215px;margin-bottom: 10px;" placeholder="区域" v-show="isSaveSchool == false">
          <el-option
            v-for="item in dzCounty"
            :label="item.name"
            :value="item"
            :key="item.id"
          >
          </el-option>
        </el-select>

        <el-input type="textarea" class="address" v-model.trim="ruleForm.address"   placeholder="请输入详细地址" v-show="isSaveSchool == false" :maxlength="50"></el-input>
        <p v-show="isSaveSchool != false" >{{addrOrgNameStr}}&nbsp;{{ruleForm.address}}</p>
      </el-form-item>
      <!--------------------------所在地址结束-------------------------------->
      <el-form-item label="描述：" prop="describe">
        <el-input type="textarea" v-model.trim="ruleForm.describe" v-show="isSaveSchool == false" :maxlength="200"></el-input>
        <p v-show="isSaveSchool != false" >{{ruleForm.describe}}</p>
      </el-form-item>
      </div>
    </el-form>
    <!------------------机构人员----------------->

        <div id="userListDiv2" :class="{'blackDiv2': isAdd}">
          <div class="title btns"  v-show="isAdd">
            <i></i><span class="titlespan">负责人信息</span>
            <el-button type="success" @click="addOrgUser"  style="float: right;" class="white-color  el-button   el-button--primary">新建人员</el-button>
            <!-- <el-button type="danger" @click="orgUsersBatchDelete" icon="delete2" :disabled="true">批量删除</el-button> -->
          </div>

          <div class="tabs-body"  v-show="isAdd" >
            <el-table
              :data="orgUsers"
              border
              tooltip-effect="dark"
              @cell-click="getOrgUserCurrentInfo"
              @selection-change="orgUsersSelectionChange" >
              <!-- <el-table-column
								type="selection"
								width="55">
							</el-table-column> -->
              <el-table-column
                prop="name"
                label="姓名"
                width="190"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="phoneNumber"
                label="手机号"
                width="260">

              </el-table-column>
              <el-table-column
                label="操作"
                width="330"
              >

                <template scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="orgUsersEdit(scope.$index, scope.row)">编辑</el-button>
                  <!--  <el-button
                      type="primary"
                      size="small"
                      @click="orgUsersRestPwd(scope.$index, scope.row)">重置密码</el-button>-->
                  <el-button
                    type="danger"
                    size="small"
                    @click="orgUsersDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination text-right">
              <!-- <el-pagination
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="orgUserTotal"
                @current-change="paginationCurrentChange"
                >
              </el-pagination> -->
            </div>
            <el-dialog title="新建人员信息" v-model="dialogVisibleAdd"  :close-on-click-modal="false" size="tiny"  top="50%" :before-close="cancelUserAddData">
              <el-form ref="orgUserFormAdd" :model="orgUserFormAdd" :rules="orgUserAddRules" label-width="90px">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model.trim="orgUserFormAdd.name" :maxlength="40" :minlength="2"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="phone" >
                  <el-input v-model.trim="orgUserFormAdd.phone" :maxlength="11"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                  <el-button @click="cancelUserAddData()">取 消</el-button>
                  <el-button type="primary" @click="orgUserFormAddData()">添 加</el-button>
                </span>
            </el-dialog>
            <el-dialog title="编辑人员信息" v-model="dialogVisibleEdit"  :close-on-click-modal="false" size="tiny" top="50%"  :before-close="cancelUserEditData">
              <el-form ref="orgUserFormEdit" :model="orgUserFormEdit" :rules="orgUserAddRules" label-width="90px">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model.trim="orgUserFormEdit.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="phone" v-if=" userInfo.roleId != 4 ">
                  <el-input v-model.trim="orgUserFormEdit.phone"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                  <el-button @click="cancelUserEditData">取 消</el-button>
                  <el-button type="primary" @click="orgUserFormEditData()">保 存</el-button>
                </span>
            </el-dialog>
          </div>
        </div>

      </div>

</template>

<script>
  import $ from 'jquery';
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
        }else if(value && this.isNeedValidate){
          callback(new Error("学校名称不能重复！"))
        }else{
          callback();
        }
      };
      var checkUserName = (rule, value, callback) => {
        if(value == null || value == ""){
          callback(new Error("姓名不能为空！"));
        }else if(value.length < 2){
          callback(new Error("姓名输入在2~40个字！"))
        }else if(value.length > 40){
          callback(new Error("姓名输入在2~40个字！"))
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
      	isFilterZS: false, //传递给后台的机构ID，是否过滤省直属以及市直属
        isReturnPage: false, //是否是返回入口
        userInfo:'', //用户基本信息
        orgListsData: [], //机构列表
        orgNameStr: '',  //保存成功后返显的机构名称
        educationIds: [],  //机构选择层级id集合
        orgName:'',
        grads: '',
        selectedGrad: [],
        codeVal: '1', //学制value值，Number类型
        indexStart: '',
        indexEnd: '',

        ruleForm: {
          orgId: '',       //区域ID
//          educationId: '', //机构ID
          name: '',        //学校名称
          schoolType: '',  //学校类型
          codeType: '',    //学制
          codeStart: '',   //教学开始
          codeEnd: '',      //教学结束
          position: '',   //地理位置
          address: '',     //详细地址
          describe: '',         //描述
        },
        schoolId:'',
        isSaveSchool: false, //表单是否保存成功
        //校归属地区
        defaultMaxLevel: 0,
        defaultProvince: {
          id: '',
          name: '',
          level: 1
        }, //默认省
        defaultCity: {
          id: '',
          name: '',
          level: 2
        }, //默认市
        defaultCounty: {
          id: '',
          name: '',
          level: 3
        }, //默认区/县
        province:[],
        city:[],
        county:[],
        selectedProvince: {},
        selectedCity: {},
        selectedCounty: {},

        //所在地址
        dzProvince: [],
        dzCity: [],
        dzCounty: [],
        selectedDZProvince: {},
        selectedDZCity: {},
        selectedDZCounty: {},
        addrOrgNameStr: '',

        isAdd:false,
       //校验
        rules: {
          name: [
            {required: true, validator: checkSchoolName, trigger: 'blur change' }
          /*  {required: true, message: '学校名称不能为空！', trigger: 'change'},
            {min: 1, max: 30, message: '请输入1~30个汉字！', trigger: 'blur'},
            { pattern: /^[\u4e00-\u9fa5]{1,30}$/, message: '请输入1~30个汉字！'}*/
          ],
          schoolType:[
            {required: true, message: '学校类型不能为空！', trigger: 'change'},
          ],
          codeType:[
            {required: true,validator: checkCodeType, trigger: 'blur'}
          ],
          codeStart: [
            {required: true, type: 'number', message: '教学范围不能为空！', trigger: 'blur' }
          ],
          position:[
            {required: true, message: '地理位置不能为空！', trigger: 'change'},
          ],
          address: [
            {validator: checkAddress, trigger: 'blur' }
          ],
          describe: [
            {validator: checkDescribe, trigger: 'blur' }
          ]
        },
       //机构人员
        // 机构人员
        orgUsers: [],
        // 机构人员总数
        orgUserTotal:0,
        // 新建机构人员字段
        orgUserFormAdd:{
          name:'',
          phone:'',
        },
        // 获取当前点击行的信息
        currentInfo:'',
        // 获取修改状态信息
        orgUserStutas:'',
        // 编辑机构人员字段
        //当前负责人ID
        principalId:'',
        orgUserFormEdit:{
          name:'',
          phone:'',
        },
        // 机构人员字输入段验证
        orgUserAddRules: {
          /*name: [{
            required: true,
            message: '姓名不能为空！',
            trigger: 'blur'
          }, {
            pattern: /^[\u4E00-\u9FA5]+$/,
            message: '姓名只能输入中文！',
            trigger: 'blur'
          }, {
            min: 2,
            max: 40,
            message: '姓名输入在2~40个字！',
            trigger: 'blur'
          }],*/
          name: {required: true,validator: checkUserName, trigger: 'blur' },
          phone: [{
            required: true,
            message: '手机号不能为空！',
            trigger: 'blur'
          },{
            pattern: /^1[34578]\d{9}$/,
            message: '请输入11位手机号！',
            trigger: 'blur'
          }
          ],
        },
        // 隐藏对话框
        dialogVisibleAdd: false,
        dialogVisibleEdit: false,
        //列表选中列
        multipleSelection: [],
        formInline: {
          query: ''
        },
        isNeedValidate: false
      }
    },
    beforeMount(){
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      //设定默认的 省、市、区/县内容
      this.defaultMaxLevel = this.userInfo.education.orgInfo.length;
      this.defaultProvince = this.userInfo.education.orgInfo[0] || {id: '',name: '',level: 1};
      this.defaultCity = this.userInfo.education.orgInfo[1] || {id: '',name: '',level: 2};
      this.defaultCounty = this.userInfo.education.orgInfo[2] || {id: '',name: '',level: 3};
    },
    mounted(){
      //获取区域树-省
      this.getAreaTree();
      if(this.defaultProvince.id != null && this.defaultProvince.id != ''){
      	//拿取市
      	this.provinceChange(this.defaultProvince);
      }
      if(this.defaultCity.id != null && this.defaultCity.id != '') {
        //拿取区
        this.cityChange(this.defaultCity);
      }

      //获取地址树
      this.getDzProvinceList();
    },
    watch: {
      'ruleForm.name': {
        handler: function (newVal) {
          this.isNeedValidate = false;
        },
        deep: true
      }
    },
    methods: {
      //判断是否空对象
      isEmptyData(name){
        return name !== undefined && name !== null && name !== '' ? false : true;
      },
    	//学校类型转换
      convertSchoolType(schoolType){
          let schoolTypeArr = ['','大学','高中','初中','完中','九年一贯制','小学','教学点','完小','职业高中(职高)','中等专业学校(中专)','技工学校(技校)','普通高等学校(体校、军校)','十二年一贯制'];
          return schoolTypeArr[schoolType || 0] || '';
      },
      //学制转换-新增学制不可能为''
      convertCodeType(codeType){
        if(codeType == '5-4'){
          return "五四制"
        }
        else{
          return "六三制";
        }
      },
      //教学范围选中呈现
      convertGrads(grads){
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
      //判断字段是否改变的状态值集合
      checkChangeField(){
        //基本信息判断-----isEmptyData 是空对象 返回 true
        let nameFlag = this.isEmptyData(this.ruleForm.name);
        let schoolFlag = this.isEmptyData(this.ruleForm.schoolType);
        let codeFlag = (this.codeVal == 1);
        let codeStartFlag = this.isEmptyData(this.ruleForm.codeStart);
        let codeEndFlag = this.isEmptyData(this.ruleForm.codeEnd);
        let positionFlag = this.isEmptyData(this.ruleForm.position);
        let addressFlag = this.isEmptyData(this.ruleForm.address);
        let describeFlag = this.isEmptyData(this.ruleForm.describe);

        //校归属地区修改判断
        let pageOrgId = this.getSaveOrgId().id;
        let userOrgId = this.userInfo.education.orgInfo[this.userInfo.education.orgInfo.length-1].id;
        if(this.defaultMaxLevel == 2 && this.isFilterZS == false){
          userOrgId = this.selectedCounty.id;
        }else if(this.defaultMaxLevel == 1 && this.isFilterZS == false){
          userOrgId = this.selectedCity.id;
        }
        //console.log('pageOrgId= '+pageOrgId+',userOrgId='+userOrgId);
        let orgIdFlag = (pageOrgId == userOrgId) ? true : false;
//            console.log(orgIdFlag);

        //所在地址修改判断
        let addressOrgId = this.getSaveAddrOrgId().id;
//        console.log(addressOrgId);
        let addressIdFlag = addressOrgId != '' ? false : true;

        let flagList = [orgIdFlag, nameFlag, schoolFlag, codeFlag, codeStartFlag, codeEndFlag, positionFlag, addressFlag, describeFlag, addressIdFlag];
        //console.log(flagList);
        return flagList;
      },
      //返回按钮
      toEduSchoolMgr(){
         this.isReturnPage = true;

      	  /*
      	  * 一：未做任何更改，直接返回
      	  * 二：有做更改，有保存，直接返回  --isSaveSchool 为 true情况
      	  * 三：有更改，未点击保存数据，提示
      	  * */
          /* 被废弃返回方式： this.$router.replace('/eduSchoolManagement');*/
          if(this.isSaveSchool){
            this.$router.go(-1);
          }
          else{
            let flagList = this.checkChangeField();
            //未进行任何更改，返回
            //有更改提示
            if(flagList.indexOf(false) != -1){
            	//console.log('结果中包含非空数据，进行了修改');
              this.$confirm('当前界面存在编辑操作是否保存？', '提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
//                type: 'warning'
              }).then(() => {
                //确定
                /* this.$router.replace('/eduSchoolManagement');*/
                this.submitForm();
              }).catch(() => {
                //取消
                this.$router.go(-1);
              });
            }
            else{
            	//console.log('结果中都是空数据，未进行任何更改');
              this.$router.go(-1);
            }
          }
      },

      // 获取校归属地区树
      getAreaTree(){
        this.$ajax('/org/getTree')
          .then(res => {
            this.province = res.data;
          }).catch(() => {
        });
      },
      //获取下一级区域内容
      provinceChange(item){
        this.selectedCity = {};
        this.selectedCounty = {};
        this.selectedProvince = item;
        if(item.id == null || item.id == ''){
        	return;
        }
        let params={
          parentId: item.id
        };
        this.$ajax('/org/getChildren',params)
          .then(res => {
            this.city = res.data;
            if(this.defaultMaxLevel == 1){
              this.defaultCity.name = this.city[0].name;
              if(this.isFilterZS == false){
              	this.selectedCity.id = this.city[0].id;
                this.selectedCity.name = this.city[0].name;
              }
            }
          }).catch(() => {
        });

      },
      //获取下一级区域内容
      cityChange(item){
        this.selectedCounty = {};
        this.selectedCity = item;
        if(item.id == null || item.id == ''){
          return;
        }
        let params={
          parentId: item.id
        };
        this.$ajax('/org/getChildren',params)
          .then(res => {
            this.county = res.data;
            if(this.defaultMaxLevel == 2 || (this.selectedCity.id != null && this.selectedCity.id != "") ){
              this.defaultCounty.name = this.county[0].name;
              if(this.isFilterZS == false){
                this.selectedCounty.id = this.county[0].id;
                this.selectedCounty.name = this.county[0].name;
              }
            }
          }).catch(() => {
        });
      },
      //设定最后一级区域内容
      countyChange(item){
        this.selectedCounty = item;
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
            this.dzCity = res.data;
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
          }).catch(() => {
        });
      },
      dzCountyChange(item){
        this.selectedDZCounty = item;
      },


      //教学范围-学校类型改变事件
      changeSchoolType() {
        this.changeSchooling();
      },
      //默认学制改变，教学范围选中控制
      defaultSetCodeCtrl(){
        this.ruleForm.codeStart = 1;
        this.indexStart = 0;
        if(this.codeVal == 2) {
          //五四制
          this.grads[5].display = false;
          this.grads[9].display = true;
        }
        else {
        	//六三制
          this.grads[5].display = true;
          this.grads[9].display = false;
        }
        //小学，完小
        if(this.ruleForm.schoolType == 6 || this.ruleForm.schoolType == 8) {
          this.ruleForm.codeEnd = 7 - (Number(this.codeVal) || 1);
          this.indexEnd = 6 - (Number(this.codeVal) || 1);
        }
        //初中，九年一贯制
        if(this.ruleForm.schoolType == 3 || this.ruleForm.schoolType == 5) {
          if(this.ruleForm.schoolType == 3) {
            if(this.codeVal == 2){
              //初中，五四制，下标6-9，存储6-9
              this.ruleForm.codeStart = 6;
              this.indexStart = 6;
            }
            else{
              this.ruleForm.codeStart = 7;
              this.indexStart = 6;
            }
          }
          this.ruleForm.codeEnd = 9;
          this.indexEnd = 9;
        }
        //高中，完中，职高，职专
        if([2,4,9,10].indexOf(Number(this.ruleForm.schoolType) || 0) != -1) {
          if(this.ruleForm.schoolType == 4 && this.codeVal == 1){
            //完中-六三制
            this.ruleForm.codeStart = 7;
            this.indexStart = 6;
          }
          else if(this.ruleForm.schoolType == 4 && this.codeVal == 2){
            //完中-五四制
            this.ruleForm.codeStart = 6;
            this.indexStart = 6;
          }
          else {
            this.ruleForm.codeStart = 10;
            this.indexStart = 10;
          }
          this.ruleForm.codeEnd = 12;
          this.indexEnd = 12;
        }
        //十二年一贯制
        if(this.ruleForm.schoolType == 13){
          this.ruleForm.codeEnd = 12;
          this.indexEnd = 12;
        }
      },
      //教学范围选择改变，调整教学范围选择参数
      adjustCodeBetween(minIndex, maxIndex){
        this.indexEnd = maxIndex;
        this.indexStart = minIndex;
        if(this.codeVal == 2){
          //初中，五四制，下标6-9，存储6-9
          /*最大值范围设定*/
          if(maxIndex >= 5 && maxIndex <= 12){
          	this.ruleForm.codeEnd = maxIndex;
          }
          else{
            this.ruleForm.codeEnd = Number(maxIndex)+1;
          }
          /*最小值范围限定*/
          if(minIndex >= 5 && minIndex <= 12){
          	this.ruleForm.codeStart = minIndex;
          }
          else{
            this.ruleForm.codeStart = Number(minIndex)+1;
          }
        }
        else{
          /*最大值范围设定*/
          if(maxIndex >= 10 && maxIndex <= 12){
            this.ruleForm.codeEnd = maxIndex;
          }
          else{
            this.ruleForm.codeEnd = Number(maxIndex)+1;
          }
          /*最小值范围限定*/
          if(minIndex >= 10 && minIndex <= 12){
            this.ruleForm.codeStart = minIndex;
          }
          else{
            this.ruleForm.codeStart = Number(minIndex)+1;
          }
        }
      },
      //教学范围-学制改变事件
      changeSchooling() {
          this.grads = JSON.parse(JSON.stringify(grads_default));
          this.selectedGrad = [];
          if(!this.ruleForm.schoolType) {
              return;
          }
          //默认设定教学范围
          this.defaultSetCodeCtrl();
          //匹配下标选中与未选中状态
          for(var j = this.indexStart;j <= this.indexEnd;j++) {
            //抛除特殊的
            if(this.codeVal == 2 && j == 5){
               //五四制  --6年级下标ID=5刨除
               continue;
            }
            if(this.codeVal == 1 && j == 9){
               //六三制  --初四下标I=9刨除
               continue;
            }
            this.grads[j].checked = true;
            this.selectedGrad.push(j);
          }
      },
      //扩范围选中或中途点击取消，重置选中的下标数
      setSelectedGradByBetween(tempIndex){
        let that = this;
        //如果是范围的选取，那么应该填入范围内的数据
        if(that.selectedGrad != null && that.selectedGrad.length == 0){
          this.ruleForm.codeStart = '';
          this.ruleForm.codeEnd = '';
          this.$refs.ruleForm.validateField('codeStart');
        }
        else{
          if(that.selectedGrad != null && that.selectedGrad.length > 0) {
            let minS = Math.min.apply(Math, that.selectedGrad.sort(function(a, b){
              return a-b;
            }));
            let maxS = Math.max.apply(Math, that.selectedGrad.sort(function(a, b){
              return a-b;
            }));
            let removeTSIndex = -1;
            //console.log('多次选中处理,此时min='+minS+',max='+maxS);
            if(this.codeVal == 2){
              removeTSIndex = 5;
            }
            else{
              removeTSIndex = 9;
            }
            for(let z = minS;z<=maxS; z++){
              if(removeTSIndex != z){
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
        let tempIndex = [];

        if(event.currentTarget.checked) {
            that.selectedGrad.push(index);
            that.grads[index].checked = true
        }
        else {
            that.selectedGrad.remove(index);
            that.grads[index].checked = false
        }
        //扩范围选中或中途点击取消，重置选中的下标数
        this.setSelectedGradByBetween(tempIndex);
//        console.log('可能涉及到默认~~~');
//        console.log(that.selectedGrad);
        if(that.selectedGrad.length > 0) {
          let min = Math.min.apply(Math, that.selectedGrad.sort(function (a, b) {
            return a - b;
          }));
          let max = Math.max.apply(Math, that.selectedGrad.sort(function (a, b) {
            return a - b;
          }));
          for (let j = min; j <= max; j++) {
            if (!that.grads[j].checked && that.grads[j].display) {
              that.grads[j].checked = true
            }
          }
          this.adjustCodeBetween(min, max);
        }

        //验证下
        this.$refs.ruleForm.validateField('codeStart');
      },
      //获取当前选中校归属地区的机构ID以及名称呈现【待修改】
      getSaveOrgId(){
        let orgTempObj = {id: '', name: '',orgNameStr: ''};
        //this.isFilterZS == false 不过滤直属，此时选择市直属，值会是市直属的ID；否则不会传。
        if(this.defaultMaxLevel == 3){
          //地区三级，当前已经是最后一级
          orgTempObj.id = this.defaultCounty.id;
          orgTempObj.name = this.defaultCounty.name;
          orgTempObj.orgNameStr = this.defaultProvince.name+''+this.defaultCity.name+''+this.defaultCounty.name;
        }
        else if(this.defaultMaxLevel == 2){
          //地区二级，默认city已经是最后一级别
          let orgStr = this.defaultProvince.name+''+this.defaultCity.name;
          orgTempObj.id = this.selectedCounty.id;
          orgTempObj.name = this.selectedCounty.name;
          orgTempObj.orgNameStr = orgStr+''+this.selectedCounty.name;
          //二级地区选择中，默认会是市直属，此时机构ID应该是默认的市级Id
          if(this.selectedCounty.name == null || this.selectedCounty.name == "" || (this.isFilterZS ? this.selectedCounty.name == '市直属' : false)){
            orgTempObj.id = this.defaultCity.id;
            orgTempObj.name = this.defaultCounty.name;
            orgTempObj.orgNameStr = orgStr+''+this.defaultCounty.name;
          }
        }
        else if(this.defaultMaxLevel == 1){
          //地区一级，默认province已经是最后一级别
          let orgStr = this.defaultProvince.name;
          if(this.selectedCounty.name != null && this.selectedCounty.name != '' && (this.isFilterZS ? this.selectedCounty.name != '市直属' : true) ){
            orgTempObj.id = this.selectedCounty.id;
            orgTempObj.name = this.selectedCounty.name;
          }
          else if(this.selectedCity.name != null && this.selectedCity.name != '' && (this.isFilterZS ? (this.selectedCity.name != '省直属' && this.selectedCity.name != '市直属') : true ) ){
            orgTempObj.id = this.selectedCity.id;
            orgTempObj.name = this.selectedCity.name;
          }
          else{
            orgTempObj.id = this.defaultProvince.id;
            orgTempObj.name = this.defaultProvince.name;
          }
          orgTempObj.orgNameStr = orgStr+''+(this.selectedCity.name || this.defaultCity.name)+''+(this.selectedCounty.name || this.defaultCounty.name);
        }
        //console.log('存储----id='+orgTempObj.id+',name='+orgTempObj.name+',nameStr='+orgTempObj.orgNameStr);
        return orgTempObj;
      },
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
//        console.log('存储所在地址：id='+orgDZTempObj.id+',name='+orgDZTempObj.name+',nameStr='+orgDZTempObj.addrOrgNameStr);
        return orgDZTempObj;
      },
      //记录添加成功后-滚动定位
      setScrollTop(userDivDom){
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        let isOpera = userAgent.indexOf("Opera") > -1;
        let agentStr = '';
        if (isOpera) {
          agentStr = "Opera"
        } //判断是否Opera浏览器
        else if (userAgent.indexOf("Firefox") > -1) {
          agentStr = "FF";
        } //判断是否Firefox浏览器
        else if (userAgent.indexOf("Chrome") > -1){
          agentStr = "Chrome";
        }
        else if (userAgent.indexOf("Safari") > -1) {
          agentStr =  "Safari";
        } //判断是否Safari浏览器
        else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
          agentStr = "IE";
        } //判断是否IE浏览器
        if(agentStr == 'FF'){
//        	console.log('滚动走向：'+userDivDom.offsetTop);
          document.documentElement.scrollTop = userDivDom.offsetTop;
        }else{
          document.body.scrollTop = userDivDom.offsetTop;
        }
      },
      //新增学校信息
      submitForm(formName) {
        this.ruleForm.codeType =  this.codeVal == 2 ? '5-4': '6-3';
      	let orgTempObj = this.getSaveOrgId();
      	let addressTempObj = this.getSaveAddrOrgId();
        //处理校归属地区-市直属 和 校归属地区-省直属问题
        let params = Object.assign( this.ruleForm,{delFlag: 0},{orgId : orgTempObj.id, addressOrgId: addressTempObj.id});
        //保存请求发送
        let that = this;
        this.$refs.ruleForm.validate((valid) => {
            if (valid) {
//              console.log('新增验证成功~~~~');
//            	console.log(params.schoolType+','+params.codeType+','+params.codeStart+','+params.codeEnd);
                this.$ajax('/eduadmin/saveOneSchool', params)
                .then(res => {
                  if(res.code == 200) {
                    this.schoolId = res.data,
                    this.buildGrade(); //调用新增年级接口（后台自动生成年级）

                    this.useAlert('success', '保存成功!',function () {
                      //展示负责人列表，信息展示标签化，按钮全部隐藏
                      that.isAdd = true;
                      that.isSaveSchool = true;
                      that.orgNameStr = orgTempObj.orgNameStr;
                      that.addrOrgNameStr = addressTempObj.addrOrgNameStr;
                      //展示成功，定位至添加负责人这块
                      $('html,body').animate({scrollTop:$('#userListDiv2').offset().top}, 1000);
//                      console.log(that.$el.querySelector('#userListDiv2'));
                      // that.setScrollTop(that.$el.querySelector('#userListDiv2'));
                    });
                  } else if(res.code == 400 && res.data.indexOf('重复的姓名') != -1){
                    this.useAlert('error', '保存失败：学校名称不能重复',function () {
                      that.isAdd = false;
                      
                    });
                    this.isNeedValidate = true;
                    this.$refs.ruleForm.validateField('name');
                  } else {
                    this.useAlert('error', '保存失败：'+res.message,function () {
                      that.isAdd = false;
                    });
                  }
                });
            } else {
              this.useAlert('error', '请先填写相关信息!',function () {});
              return false;
            }
        });
      },
      //触发生成学校年级方法
      buildGrade(schoolId) {
        this.$ajax('/schadmin/buildGrade', {schoolId: this.schoolId})
          .then(res => {
          });
      },


      // 获取负责人列表
      getOrgUserLists(id){
        this.$ajax('/schadmin/justShowSchadmin',{id: this.schoolId})
          .then(res => {
            if(res.code == 200){
              this.orgUsers=res.data;
              this.orgUserTotal=this.orgUsers.length;
            }
          });
      },
      // 新增负责人
      addOrgUser(){
        this.orgUserFormAdd={};
        this.dialogVisibleAdd = true;
      },
      //确定添加人员
      orgUserFormAddData(){
        this.$refs.orgUserFormAdd.validate((valid) => {
          if (valid) {

            let params={
              schoolId:this.schoolId,
              name: this.orgUserFormAdd.name,
              phoneNumber: this.orgUserFormAdd.phone || ''
            };
            //console.log(params)
            this.$ajax('/eduadmin/saveSchoolAdmin',params)
              .then(res => {
                if(res.code == 200){
                  this.useAlert('success','添加成功!' ,function () {});

                  this.dialogVisibleAdd = false;

                  this.getOrgUserLists(this.schoolId)

                }else{
                  this.useAlert('error',res.message ,function () {});
                  this.dialogVisibleAdd = false;
                }

              });

          } else {

            return false;

          }
        });
      },
      cancelUserAddData(){
        this.dialogVisibleAdd = false;
        this.orgUserFormAdd = {
          name: '',
          phone: ''
        };
        this.$refs['orgUserFormAdd'].resetFields();
      },
      // 编辑人员信息
      orgUsersEdit(index, row) {
        this.dialogVisibleEdit = true;
        this.orgUserFormEdit.name= row.name;
        this.orgUserFormEdit.phone= row.phone;
        this.principalId=row.id
         //console.log(this.principalId);
      },
      // 确定编辑
      orgUserFormEditData(){
        this.$refs.orgUserFormEdit.validate((valid) => {
          if (valid) {
            let params = {
              schoolId: this.schoolId,
              userId: this.currentInfo.id,
              name: this.orgUserFormEdit.name,
              id: this.principalId
            };
            this.$ajax('/eduadmin/updateSchoolAdmin',params).then((res) => {
              if(res.code == 200){
                this.useAlert('success','保存成功',function () {});
                this.getOrgUserLists(this.schoolId);
                this.dialogVisibleEdit = false;
              }
            }).catch(() => {
            });
          } else {
            return false;
          }
        });
      },
      cancelUserEditData(){
        this.dialogVisibleEdit = false;
        this.orgUserFormEdit = {
          name: '',
          phone: ''
        };
        this.$refs['orgUserFormEdit'].resetFields();
      },
      // 获取点击当前行信息
      getOrgUserCurrentInfo(row, column, cell, event){
        this.currentInfo = row;
      },
      // 获取人员状态
      getOrgUserSelectState(command){
        let params={
          orgId: this.orgInfoId,
          userId: this.currentInfo.id,
          state: command
        };
        this.$ajax('/eduadmin/changeOrgUserStatus',params).then((res) => {
          if(res.code == 200){
            this.useAlert('success','状态修改成功',function () {});
            this.getOrgUserLists(this.orgInfoId)
          }
        }).catch(() => {
        });
      },
      // 确定删除单个人员
      orgUsersDelete(index, row) {
//        console.log(index,row)
        this.$confirm('确定要删除选中教师吗?', '提示', {
//          type: 'warning',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
        }).then(() => {
          let params = {
            userId: row.id,
            schoolId:this.schoolId,
          };
          this.$ajax('/eduadmin/deleteSchoolAdmin',params).then((res) => {
            if(res.code == 200){
              this.useAlert('success','删除成功',function () {});
            }
            this.getOrgUserLists(this.orgInfoId)
          });
        }).catch(() => {
        });
      },
      //获取列表选中列
      orgUsersSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 重置密码
      orgUsersRestPwd(index, row){
        this.$confirm('是否要重置密码为手机号码后六位?', '提示', {
//          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          let params = {
            phone: row.phone
          };
          this.$ajax('/password/reset',params).then((res) => {
            if(res.code == 200){
              this.$alert(res.message, '新密码', {
                confirmButtonText: '确定',
              });
            }
          });
        }).catch(() => {
        });
      },
      // 批量删除人员 备选
      orgUsersBatchDelete(index, row){
        var userIds = this.multipleSelection.map(item => item.id).toString();
        this.$confirm('确定要删除选中教师吗?', '提示', {
//          type: 'warning',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
        }).then(() => {
          let params = {
            userId: userIds,
            orgId:  this.orgInfoId
          };
          this.$ajax('/eduadmin/delOrgUser',params).then((res) => {
            if(res.code == 200){
              this.useAlert('success','删除成功',function () {});
            }
            this.getOrgUserLists(this.orgInfoId)
          });
        }).catch(() => {
        });
      },
    },
    created() {
      this.grads = JSON.parse(JSON.stringify(grads_default));
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    beforeRouteLeave  (to, from, next) {
      if(this.isReturnPage){
        next();
      }
      else {
        /*
         * 一：未做任何更改，直接返回
         * 二：有做更改，有保存，直接返回  --isSaveSchool 为 true情况
         * 三：有更改，未点击保存数据，提示
         * */
        /* 被废弃返回方式： this.$router.replace('/eduSchoolManagement');*/
        if (this.isSaveSchool) {
          next()
        }
        else {
          let flagList = this.checkChangeField();
          //未进行任何更改，返回
          //有更改提示
          if (flagList.indexOf(false) != -1) {
            //console.log('结果中包含非空数据，进行了修改');
            this.$confirm('当前界面存在编辑操作是否保存？', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
//              type: 'warning'
            }).then(() => {
              //确定
              this.submitForm();
            }).catch(() => {
              //取消
              next()
            });
          }
          else {
            //          console.log('结果中都是空数据，未进行任何更改');
            next()
          }
        }
      }
    }
  }
</script>
<style >

  #addschool  .el-form-item.is-required.no-star .el-form-item__label:before{
    content: '';
    color: #ff4949;
    margin-right: 4px;
  }
  #addschool .icon-conserve:before{
    margin-right: 3px;
  }
  #addschool .dialog-footer>.el-button{padding: 9px 30px;}
  /*表格边框问题*/
  .el-table table{
    width: 100%;
  }
  /*标题样式*/
  #addschool .title{
    padding: 8px 0 8px 0;
    height: 34px;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 30px;
  }
  #addschool .title i{
   margin-top:5px;
  }
  #addschool .title .titlespan{
    display: inline-block;
    vertical-align:middle;
    margin-left: 10px;
    font-size: 14px;
    color: #0d9ee9;
    position:relative;
    top:-11px;
  }
  #addschool .tabs-header{text-align: right;}
  #addschool .blackDiv2 {
    border-bottom: none;
  }
  #addschool .tabs-body{clear: both;
    width: 784px;
    margin: 0 auto;}
  #addschool .el-table th>.cell {
   text-align: center;
  }
  #addschool .el-table .cell, .el-table th>div {
    text-align: center;
  }
  /*保存*/
 #addschool .submitForm{
   text-align: right;
   height:50px;
   border-bottom:1px solid #e9edf1;
 }
  #addschool .submitForm .el-button--primary{
    margin-top:8px;
    margin-bottom:0px;
  }
  /*省市区*/
  #addschool .item-text .address{
    margin-top: 22px;
    height: 40px;
    display: block;
  }
  #addschool .el-input__icon{
    right:13px;
  }
/*添加按钮*/
  #addschool .el-button--info{
    width:40px;
    float: right;
    text-align: center;
  }
  #addschool .grads li{list-style:none;float:left;margin-right:5px;}
  #addschool .grads label{border:1px solid #e6e6e6;width:48px;text-align:center;display:inline-block;cursor:pointer;}
  #addschool .grads li label.checked{color:#0d9ee9;border:1px solid #0d9ee9;}
  #addschool .blind{
    clip: rect(1px,1px,1px,1px);
    clip: rect(1px 1px 1px 1px);
    position: absolute;
}

  #addschool a, input, textarea, keygen, select, button{font-family:"微软雅黑";}
  #addschool .el-input.is-disabled .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #addschool .el-input.is-disabled .el-input__inner::-moz-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #addschool .el-input.is-disabled .el-input__inner:-ms-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #addschool .el-input.is-disabled .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #addschool .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑"}
  #addschool .el-input__inner::-moz-placeholder{color:#1f2d3d;}
  #addschool .el-input__inner:-ms-input-placeholder{color:#1f2d3d;}
  #addschool .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #addschool .el-form .el-form-item{margin-left: 100px;}
  #addschool .el-dialog .el-form-item{margin-left: 0px;}
</style>
