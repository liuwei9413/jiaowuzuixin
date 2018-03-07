<template>
  <div  id="editSchoolInfoByEdu"  class="addeditinfo"  style="text-align: left">
    <div class="main-content" v-loading.fullscreen.lock="fullscreenLoading">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" >
        <div  class="btns">
          <a href="javascript:;"  @click="toEduSchoolMgr" class=" icon-back">返回 </a>
        </div>
        <div class="blackDiv1">
          <div class="title btns"><i></i>
          <span>基础信息</span>
          <el-button style="float: right;" class="white-color  el-button   el-button--primary" type="primary" v-if="isEditSchool == false" @click="saveSchoolInfo" > 保存</el-button>
        </div>
          <el-form-item label="校归属地区：" prop="orgInfo">
          <el-select v-model="selectedProvince" :placeholder="defaultProvince.name" @change="provinceChange" :disabled="defaultMaxLevel>=1" class="item-text"  v-show="isEditSchool == false">
            <el-option
              v-for="item in province"
              :label="item.name"
              :value="item"
              :key="item.id"
            >
            </el-option>
          </el-select>
          <el-select v-model="selectedCity" @change="cityChange" :placeholder="defaultCity.name" class="item-text" v-if="city.length !=0 || (defaultProvince.id  != '' && defaultProvince.id != null )" :disabled="defaultMaxLevel>=2" v-show="isEditSchool == false">
            <el-option
              v-for="item in city"
              :label="item.name"
              :value="item"
              :key="item.id"
            >
            </el-option>
          </el-select>
          <el-select v-model="selectedCounty" @change="countyChange" :placeholder="defaultCounty.name" class="item-text" v-if="county.length !=0 || (defaultCity.id  != '' && defaultCity.id != null && selectedCity.name != '省直属' && selectedCity.name != '市直属' )"  :disabled="defaultMaxLevel>=3" v-show="isEditSchool == false">
            <el-option
              v-for="item in county"
              :label="item.name"
              :value="item"
              :key="item.id"
            >
            </el-option>
          </el-select>
          <p v-show="isEditSchool != false">{{orgNameStr}}</p>
        </el-form-item>
          <el-form-item label="学校名称：" prop="name" >
            <el-input v-model.trim="ruleForm.name" v-show="isEditSchool == false" class="inputWidth"  :maxlength="30"></el-input>
            <p v-show="isEditSchool != false" >{{ruleForm.name}}</p>
          </el-form-item>
          <el-form-item label="学校类型：" prop="schoolType">
            <el-select name="schoolType" id="ruleForm.schoolType" v-model="ruleForm.schoolType" class="inputWidth"  v-on:change="changeSchoolType" v-show="isEditSchool == false">
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
            <p v-show="isEditSchool != false" >{{convertSchoolType(ruleForm.schoolType)}}</p>
          </el-form-item>
          <el-form-item label="学制：" prop="codeType" >
            <!-- 学制不可选择情况：职高、职专、高中、其它情况；-->
            <el-select  @change="changeSchooling" v-show="isEditSchool == false" :placeholder="codeTypeCovert.showStr" class="inputWidth"  v-model="codeTypeCovert.saveVal">
              <el-option label='六三制' value="1">六三制</el-option>
              <el-option label='五四制' value="2">五四制</el-option>
            </el-select>
            <p v-show="isEditSchool != false" >{{convertCodeType(ruleForm.codeType)}}</p>
          </el-form-item>
          <el-form-item label="教学范围" prop="codeStart" class="region">
                <ul class="grads" v-show="isEditSchool == false">
                  <li v-for="(grad, index) in grads" v-show="grad['display'] === true">
                  <label v-bind:for="'grad' + index" v-bind:class="{ disabled:grad['disabled'], checked:grad['checked'] }">{{grad['name']}}</label>
                  <input type="checkbox" v-bind:id="'grad' + index" name="grad[]" v-bind:disabled="grad['disabled']" v-bind:checked="grad['checked']" class="blind" v-on:change="changeGrad(index, $event)">
                  </li>
                </ul>
                <p v-show="isEditSchool != false" >{{convertGrads(grads)}}</p>
          </el-form-item>
          <el-form-item label="地理位置：" prop="position"  v-show="isEditSchool == false" >
           <el-select :placeholder="positionCovert.showStr" v-model="positionCovert.saveVal" class="inputWidth"  @change="setPositionFunc">
              <el-option label="中心城区" value="1"></el-option>
              <el-option label="城乡结合" value="2"></el-option>
              <el-option label="近郊" value="3"></el-option>
              <el-option label="远郊" value="4"></el-option>
              <!--<el-option label="山区" value="5"></el-option>-->
            </el-select>
            <p v-show="isEditSchool != false" >{{convertPosition(ruleForm.position)}}</p>
          </el-form-item>
        <!--------------------------所在地址-------------------------------->
          <el-form-item label="所在地址：" prop="address">
            <el-select v-model="selectedDZProvince" @change="dzProvinceChange" style="margin-bottom: 10px;"  v-show="isEditSchool == false"  :placeholder="selectedDZProvince.name || '省份'" >
              <el-option
                v-for="item in dzProvince"
                :label="item.name"
                :value="item"
                :key="item.id"
              >
              </el-option>
            </el-select>
            <el-select v-model="selectedDZCity" @change="dzCityChange" style="margin-bottom: 10px;"  :placeholder="selectedDZCity.name || '城市'" v-show="isEditSchool == false">
              <el-option
                v-for="item in dzCity"
                :label="item.name"
                :value="item"
                :key="item.id"
              >
              </el-option>
            </el-select>
            <el-select v-model="selectedDZCounty" @change="dzCountyChange" style="margin-bottom: 10px;"  :placeholder="selectedDZCounty.name || '区域'" v-show="isEditSchool == false">
              <el-option
                v-for="item in dzCounty"
                :label="item.name"
                :value="item"
                :key="item.id"
              >
              </el-option>
            </el-select>
            <el-input type="text" class="address inputWidth"  v-model.trim="ruleForm.address"   placeholder="请输入详细地址" v-show="isEditSchool == false" :maxlength="50"></el-input>
            <p v-show="isEditSchool != false" >{{( selectedDZCounty.name || '')+' '+( selectedDZCity.name || '')+' '+( selectedDZProvince.name || '')+' '+(ruleForm.address)}}</p>
          </el-form-item>

        <!--------------------------所在地址结束-------------------------------->
          <el-form-item label="描述：" prop="describe">
            <el-input type="textarea" v-model.trim="ruleForm.describe" v-show="isEditSchool == false" :maxlength="200"></el-input>
            <p v-show="isEditSchool != false" >{{ruleForm.describe}}</p>
          </el-form-item>
        </div>
      </el-form>
      <!------------------机构人员----------------->
      <div class="blackDiv2">
          <div class="title btns title2">
            <i></i>
            <span>负责人信息</span>
            <el-button type="primary" @click="editOrgUser"  class="white-color add-btn el-button el-button--primary" style="float: right;" >新建人员</el-button>
          </div>
         <!-- <div class="tabs-header space-between">

            &lt;!&ndash; <el-button type="danger" @click="orgUsersBatchDelete" icon="delete2" :disabled="true">批量删除</el-button> &ndash;&gt;
          </div>-->

          <div class="tabs-body" >
            <div class="noData" v-if="noData" >
              <p class="empty-text">暂无负责人信息</p>
            </div>
            <el-table
              v-else
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
                >
              </el-table-column>
              <el-table-column
                prop="phoneNumber"
                label="手机号"
               >
              </el-table-column>
              <el-table-column
                label="操作"

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
            <el-dialog title="新建人员信息" v-model="dialogVisibleAdd"  :close-on-click-modal="false" size="tiny" top="50%" class="form-dialog" :before-close="cancelUserAddData">
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

            <el-dialog title="编辑人员信息" v-model="dialogVisibleEdit"  :close-on-click-modal="false" size="tiny" top="50%" :before-close="cancelUserEditData">
            <el-form ref="orgUserFormEdit" :model="orgUserFormEdit" :rules="orgUserAddRules" label-width="90px">
              <el-form-item label="姓名：" prop="name">
                <el-input v-model.trim="orgUserFormEdit.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号：" prop="phone" v-if=" userInfo.roleId != 4 ">
                <el-input v-model.trim="orgUserFormEdit.phone"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancelUserEditData()">取 消</el-button>
              <el-button type="primary" @click="orgUserFormEditData()">保 存</el-button>
            </span>
          </el-dialog>
          </div>
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
        }
        else if(value.length > 50){
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
        }
        else if(value.length > 200){
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
      var checkPosition = (rule, value, callback) => {
        if(value == null || value == ""){
          callback(new Error("地理位置不能为空！"))
        }
        else{
          callback();
        }
      };
      return {
        noData:false,
        isFilterZS: false, //传递给后台的机构ID，是否过滤省直属以及市直属
        isReturnPage: false, //是否是返回入口
        userInfo:'',
        orgListsData: [], //机构列表
        orgNameStr: [],  //保存成功后返显的机构名称
        educationIds: [],  //机构选择层级id集合
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
        editInitPCC:{
           provinceId: '',
           provinceName: '',
           cityId: '',
           cityName: '',
           countyId: '',
           countyName: ''
        },
        fullscreenLoading: true,// 全屏遮罩层
        editSchoolFlag: false, //是否保存成功过
        orgName:'',
        grads: '',
        selectedGrad: [],
        codeVal: '',
        indexStart: '',
        indexEnd: '',
        ruleForm: {
          orgId: '',       //区域ID
          educationId: '', //机构ID
          name: '',        //学校名称
          schoolType: '',  //学校类型
          codeType: '',    //学制
          codeStart: '',   //教学开始
          codeEnd: '',      //教学结束
          position: '',   //地理位置
          address: '',     //详细地址
          describe: '',         //描述
        },
        oldSchoolInfo: {
          orgId: '',       //区域ID
          educationId: '', //机构ID
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
        isEditSchool: false, //表单是否保存成功
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
        // 地区
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
            {required: true, message: '学校类型不能为空！', trigger: 'blur'}
          ],
          codeType:[
            {required: true,validator: checkCodeType, trigger: 'blur'}
          ],
          codeStart: [
            {required: true, type: 'number', message: '教学范围必须选择！', trigger: 'blur' }
          ],
          position:[
            {required: true,validator: checkPosition, trigger: 'blur'}
          ],
          address: [
            {validator: checkAddress, trigger: 'blur' }
          ],
          describe: [
            {validator: checkDescribe, trigger: 'blur' }
          ]
        },
        pickerOptions0: {
          disabledDate(time) {
            // return time.getTime() < Date.now() - 8.64e7;
          }
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
      }
    },
    beforeMount(){
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      //设定默认的 省、市、区/县内容
      this.defaultMaxLevel = this.userInfo.education.orgInfo.length;
      this.defaultProvince = this.userInfo.education.orgInfo[0] || {id: '',name: '',level: 1};
      this.defaultCity = this.userInfo.education.orgInfo[1] || {id: '',name: '',level: 2};
      this.defaultCounty = this.userInfo.education.orgInfo[2] || {id: '',name: '',level: 3};
}   ,
    mounted(){
      //获取当前学校ID（学校列表传入的参数）
      this.schoolId = this.$route.params.id;
    	//获取区域树
      this.getAreaTree();
      //获取地址树
      this.getDzProvinceList();
      //获取当前学校基本信息
      this.getSchoolDetail();
      //获取当前机构人员列表
      this.getOrgUserLists();
    },
    methods: {
      //获取地址栏
      getQueryString(name){
        return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.search)||[,''])[1].replace(/\+/g,'%20'))||null;
      },
      //判断你是否空对象
      isEmptyData(name){
        return name !== undefined && name !== null && name !== '' ? false : true;
      },
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
        let nameFlag = (this.ruleForm.name|| '' ) == this.oldSchoolInfo.name;
        let schoolFlag = (this.ruleForm.schoolType|| '' ) == this.editInitCode.initSchoolType;
        let codeType = this.codeVal == 2 ? '5-4' :'6-3';
        let codeFlag = codeType == this.editInitCode.initCodeType;
        let codeStartFlag = (this.ruleForm.codeStart|| '' ) == this.editInitCode.initCodeStart;
        let codeEndFlag = (this.ruleForm.codeEnd|| '' ) == this.editInitCode.initCodeEnd;
        let positionFlag = (this.positionCovert.showStr|| '' ) == this.convertPosition(this.oldSchoolInfo.position);
        let addressFlag = (this.ruleForm.address || '' ) == this.oldSchoolInfo.address;
        let describeFlag = (this.ruleForm.describe|| '' ) == this.oldSchoolInfo.describe;
        //校归属地区修改判断
        let pageOrgId = this.getSaveOrgId().id;
        let defaultOrgId = this.userInfo.education.orgInfo[this.userInfo.education.orgInfo.length-1].id;
        if(this.editInitPCC.countyId != null && this.editInitPCC.countyId != ""){
          defaultOrgId = this.editInitPCC.countyId;
        }
        else if(this.editInitPCC.cityId != null && this.editInitPCC.cityId != ""){
          defaultOrgId = this.editInitPCC.cityId;
        }
        else if(this.editInitPCC.provinceId != null && this.editInitPCC.provinceId != ""){
          defaultOrgId = this.editInitPCC.provinceId;
        }
//          console.log('pageOrgId= '+pageOrgId+',userOrgId='+defaultOrgId);
        let orgIdFlag = (pageOrgId == defaultOrgId) ? true : false;
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
        let flagList = [orgIdFlag, nameFlag, schoolFlag, codeFlag, codeStartFlag, codeEndFlag, positionFlag, addressFlag, describeFlag, addressIdFlag];
        console.log(flagList);
        return flagList;
      },
      //返回按钮
      toEduSchoolMgr(){
        this.isReturnPage = true;
        /*
         * 一：未做任何更改，直接返回
         * 二：有做更改，有保存，直接返回  --editSchoolFlag 为 true情况
         * 三：有更改，未点击保存数据，提示
         * */
        /* 被废弃返回方式： this.$router.replace('/eduSchoolManagement');*/
        if(this.editSchoolFlag){
          this.$router.go(-1);
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
//              type: 'warning'
            }).then(() => {
              //确定
              this.saveSchoolInfo();
            }).catch(() => {
              //取消
              this.$router.go(-1);
            });
          }
          else{
//            console.log('结果中都是空数据，未进行任何更改');
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
            this.city = res.data || [];
            //如果市级存在默认值，那么给定默认选中；否则默认选中第一项
            if(this.editInitPCC.cityId != null && this.editInitPCC.cityId != null && item.id == this.editInitPCC.provinceId){
              this.defaultCity.name = this.editInitPCC.cityName;
            	this.defaultCity.id = this.editInitPCC.cityId;
            	this.selectedCity.name =  this.editInitPCC.cityName;
            	this.selectedCity.id =  this.editInitPCC.cityId;
            }
            else{
            	this.selectedCity = {};
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
        this.selectedCity.id = item.id;
        this.selectedCity.name = item.name;
        console.log(item.id+','+item.name)
        if(item.id == null || item.id == ''){
          return;
        }
        let params={
          parentId: item.id
        };
        this.$ajax('/org/getChildren',params)
          .then(res => {
            this.county = res.data;
            //如果县级存在默认值，那么给定默认选中；否则默认选中第一项
            if(this.editInitPCC.countyId != null && this.editInitPCC.countyId != null && item.id == this.editInitPCC.cityId){
              this.defaultCounty.name = this.editInitPCC.countyName;
              this.defaultCounty.id = this.editInitPCC.countyId;
              this.selectedCounty.name =  this.editInitPCC.countyName;
              this.selectedCounty.id =  this.editInitPCC.countyId;
            }
            else{
              this.selectedCounty = {};
              this.defaultCounty = {};
              if(this.selectedCity.id != null && this.selectedCity.id != "") {
                this.defaultCounty.name = this.county[0].name;
                if (this.isFilterZS == false) {
                  this.selectedCounty.id = this.county[0].id;
                  this.selectedCounty.name = this.county[0].name;
                }
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
        this.selectedDZCountry = {};
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

      //当前学校归属地址信息
      loadSetCurrentOrg(data, that){
      	if(data.orgList[0] != null && data.orgList[0] != "" && data.orgList[0].name != ""){
          that.editInitPCC.provinceName = data.orgList[0].name;
          that.editInitPCC.provinceId = data.orgList[0].id;
        }
        if(data.orgList[1] != null && data.orgList[1] != "" && data.orgList[1].name != ""){
          that.editInitPCC.cityName = data.orgList[1].name;
          that.editInitPCC.cityId = data.orgList[1].id;
        }
        if(data.orgList[2] != null && data.orgList[2] != "" && data.orgList[2].name != ""){
          that.editInitPCC.countyName = data.orgList[2].name;
          that.editInitPCC.countyId = data.orgList[2].id;
        }
        //初始设定呈现
        if(that.editInitPCC.provinceId != null && that.editInitPCC.provinceId != ''){
          //拿取市
          that.provinceChange({
            id: that.editInitPCC.provinceId,
            name: that.editInitPCC.provinceName
          });
        }
        if(that.editInitPCC.cityId != null && that.editInitPCC.cityId != ''){
          //拿取区
          that.cityChange({
            id: that.editInitPCC.cityId,
            name: that.editInitPCC.cityName
          });
        }
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

      //获取学校信息
      getSchoolDetail(){
      	var that = this;
        this.$ajax('/eduadmin/updateOneSchoolShow?id='+this.schoolId)
          .then(res => {
          	let respData = res.data; //学校信息
            that.ruleForm = respData;
            //初始设置当前选中机构
            that.loadSetCurrentOrg(res.data, that);
            //初始设置当前所在地址
            that.loadSetCurrentAddressOrg(res.data, that);

            that.editInitCode.initCodeStart = res.data.codeStart;
            that.editInitCode.initCodeEnd = res.data.codeEnd;
            that.editInitCode.initSchoolType = res.data.schoolType;
            that.editInitCode.initCodeType = res.data.codeType;
            that.isSetInitCode = true;
            that.positionCovert.showStr = that.convertPosition(that.ruleForm.position);
            that.codeTypeCovert.showStr= that.convertCodeType(that.ruleForm.codeType);
            that.codeVal =  that.ruleForm.codeType == '5-4' ? 2 : 1;
            that.fullscreenLoading = false;
            that.oldSchoolInfo = {
              name: res.data.name || '',
              schoolType: res.data.schoolType,
              codeType: res.data.codeType,
              codeStart: res.data.codeStart,
              codeEnd: res.data.codeEnd,
              position: res.data.position || '',
              address: res.data.address || '',
              describe: res.data.describe || '',
              orgList: res.data.orgList || ''
            };
          });
      },
      //设置地理位置
      setPositionFunc(val){
      	console.log('地理位置：'+val);
        this.positionCovert.showStr = this.convertPosition(val);
        this.ruleForm.position = val+'';
      },
      //教学范围-学校类型改变事件
      changeSchoolType: function(val) {
          var that = this;
          //设置是否切换了学校类型（若当前学校类型不等于初始学校类型，那么不是设定的初始code值）
          if(that.ruleForm.schoolType != that.editInitCode.initSchoolType){
          	that.isSetInitCode = false;
          }
          that.changeSchooling();
      },
      //教学范围-学制改变事件
      changeSchooling: function(val){
          var that = this;
          if(val == null ||  val == ""){
          	//还未切换学制，初始化进入
            that.codeVal =  that.ruleForm.codeType == '5-4' ? 2 : 1;
          }
          else{
          	//切换了学制
            that.isSetInitCode = false;
            that.codeTypeCovert.showStr = this.convertCodeType(val);
            that.codeVal = val;
            that.ruleForm.codeStart = 1;
            that.indexStart = 0;
          }
          that.grads = JSON.parse(JSON.stringify(grads_default));
          that.selectedGrad = [];
          if(that.codeVal == 2) { //五四制
              that.grads[5].display = false;
              that.grads[9].display = true;
          }
          else { //六三制
              that.grads[5].display = true;
              that.grads[9].display = false;
          }
          if(!that.isSetInitCode){
            //console.log('切换学校类型：'+that.ruleForm.schoolType+',isSetInitCode='+that.isSetInitCode+',val='+val);
          	//切换了学制的情况下，按照学制切换规则来执行
            //小学，完小
            if(Number(that.ruleForm.schoolType) == 6 || Number(that.ruleForm.schoolType) == 8) {
              //初中，五四制，下标6-9，存储6-9
              if(val == null  ||  val == ""){
                that.ruleForm.codeStart = 1;
                 that.indexStart = 0;
              }
            	that.ruleForm.codeEnd = 7 - (Number(that.codeVal) || 1);
              that.indexEnd = 6 - (Number(that.codeVal) || 1);
              //console.log('走向1：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
            }
            //初中，九年一贯制
            if(Number(that.ruleForm.schoolType) == 3 || Number(that.ruleForm.schoolType) == 5) {
              if(Number(that.ruleForm.schoolType) == 3) {
              	if(that.codeVal == 2){
              		//初中，五四制，下标6-9，存储6-9
                  that.ruleForm.codeStart = 6;
                  that.indexStart = 6;
                  //console.log('走向2：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
                }
                else{
                  that.ruleForm.codeStart = 7;
                  that.indexStart = 6;
                  //console.log('走向3：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
                }
              }
              else{
              	that.ruleForm.codeStart = 1;
              	that.indexStart = 0;
                //console.log('走向4：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
              }
              that.ruleForm.codeEnd = 9;
              that.indexEnd = 9;
              //console.log('走向5：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
            }
            //高中，完中，职高，职专
            if([2,4,9,10].indexOf(Number(that.ruleForm.schoolType) || 0) != -1) {
              if(Number(that.ruleForm.schoolType) == 4 && that.codeVal == 1){
                //完中-六三制
                that.ruleForm.codeStart = 7;
                that.indexStart = 6;
                //console.log('走向6：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
              }
              else if(Number(that.ruleForm.schoolType) == 4 && that.codeVal == 2){
                //完中-五四制
                that.ruleForm.codeStart = 6;
                that.indexStart = 6;
                //console.log('走向7：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
              }
              else {
                that.ruleForm.codeStart = 10;
                that.indexStart = 10;
                //console.log('走向8：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
              }
              that.ruleForm.codeEnd = 12;
              that.indexEnd = 12;
              //console.log('走向9：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
            }
            //十二年一贯制
            if(Number(that.ruleForm.schoolType) == 13){
              that.ruleForm.codeStart = 1;
              that.indexStart = 0;
              that.ruleForm.codeEnd = 12;
              that.indexEnd = 12;
              //console.log('走向10：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
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
              //console.log('走向11：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
            }
            else {
              that.indexEnd = Number(that.editInitCode.initCodeEnd);
              //console.log('走向12：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
            }
            if (
              (that.editInitCode.initCodeStart <= 5 && that.codeVal == 2) ||
              (that.editInitCode.initCodeStart <= 9 && that.codeVal == 1)
            ) {
              that.indexStart = Number(that.editInitCode.initCodeStart) - 1;
              //console.log('走向13：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
            }
            else {
              that.indexStart = Number(that.editInitCode.initCodeStart);
              //console.log('走向14：codeStart='+that.ruleForm.codeStart+',codeEnd='+that.ruleForm.codeEnd);
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
      //设置年级code码
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
        //如果是范围的选取，那么应该填入范围内的数据
        if(that.selectedGrad != null && that.selectedGrad.length == 0){
          this.ruleForm.codeStart = '';
          this.ruleForm.codeEnd = '';
          this.$refs.ruleForm.validateField('codeStart').validate = false;
        }
        else{
          if(that.selectedGrad.length > 0) {
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
           //console.log('学制改变changeGrade：'+event.currentTarget.checked+',index='+index);
//        console.log(that.grads);
//        console.log(that.selectedGrad);
//        console.log('去重合并数组');
          let newSelectedGrad = _.unionWith(that.selectedGrad, tempIndex, _.isEqual);
          that.selectedGrad = newSelectedGrad;
//        console.log(that.selectedGrad);
        }
      },
      //教学范围-教学范围改变事件
      changeGrad(index,event) {
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
//          console.log('可能涉及到默认~~~');
//          console.log(that.selectedGrad);
          if(that.selectedGrad.length > 0){
            let min = Math.min.apply(Math, that.selectedGrad.sort(function(a, b){
              return a-b;
            }));
            let max = Math.max.apply(Math, that.selectedGrad.sort(function(a, b){
              return a-b;
            }));
//            console.log('selectedGrad长度>0,此时min='+min+',max='+max);
            let minGradeName = that.grads[min].name;
            let maxGradeName = that.grads[max].name;
            for(var j=min;j<=max;j++) {
              if(!that.grads[j].checked && that.grads[j].display) {
                that.grads[j].checked = true;
              }
            }
            this.setCodeSEnd(minGradeName, maxGradeName, null);
          }
          else{
//          	console.log('selectedGrad长度<=0');
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
        //console.log('存储所在地址：id='+orgDZTempObj.id+',name='+orgDZTempObj.name+',nameStr='+orgDZTempObj.addrOrgNameStr);
        return orgDZTempObj;
      },

      //修改学校信息
      saveSchoolInfo() {
        var that = this;
        this.ruleForm.codeType = this.codeVal == 2 ? '5-4' : '6-3';
      	//省市区
      	let orgTempObj  = this.getSaveOrgId();
        let addressTempObj = this.getSaveAddrOrgId();
//      console.log('存储----id='+orgTempObj.id+',name='+orgTempObj.name+',nameStr='+orgTempObj.orgNameStr);
        //修改验证及请求
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let saveObj  = {
//              educationId: that.ruleForm.educationId, 废弃
              orgId: orgTempObj.id,
              id : that.schoolId,
              name: that.ruleForm.name, //学校名称
              address: that.ruleForm.address || '', //学校地址
              position: that.ruleForm.position || '',   //地理位置
              schoolType:  that.ruleForm.schoolType || '',  //学校类型
              codeType: that.ruleForm.codeType || '',    //学制
              //          region: this.schoolInfo.region || '',  //教学范围选中验证
              //          teacherCount: this.schoolInfo.teacherCount || '', //教师数量 --不可修改
              //          studentCount: this.schoolInfo.studentCount || '', //学生数量 --不可修改
              codeStart: that.ruleForm.codeStart || '',   //教学开始
              codeEnd: that.ruleForm.codeEnd || '',      //教学结束
              describe: that.ruleForm.describe || '', //描述
              addressOrgId: addressTempObj.id
            }
            //console.log(saveObj);
//            console.log('验证成功~~~~');
//            console.log(saveObj.schoolType+','+saveObj.codeType+','+saveObj.codeStart+','+saveObj.codeEnd);
            this.$ajax('/schadmin/updateOneSchoolExecute', saveObj)
              .then(res => {
                if(res.code == 200) {
                	this.editSchoolFlag = true;
                  this.useAlert('success','修改成功',function () {
                    that.$router.go(-1);
                  });
                }else{
                  this.useAlert('error', res.message,function () {});
                }
              });
          } else {
            this.useAlert('error','请先填写相关信息!',function () {});
            return false;
          }
        });
      },
      // 获取机构人员列表
      getOrgUserLists(){
        this.$ajax('/schadmin/justShowSchadmin',{id: this.schoolId})
          .then(res => {
            // console.log(res)
            if(res.code == 200){
              this.orgUsers=res.data;
              this.orgUserTotal=this.orgUsers.length;
              if(this.orgUserTotal == 0){
                this.noData=true;
              }else{
                this.noData=false;
              }
            }
          });
      },
      // 新建机构人员
      editOrgUser(){
        this.orgUserFormAdd = {};
        this.dialogVisibleAdd = true;
      },
      //确定添加机构人员
      orgUserFormAddData(){
        this.$refs.orgUserFormAdd.validate((valid) => {
          if (valid) {
            let params={
              schoolId:this.schoolId,
              name: this.orgUserFormAdd.name,
              phoneNumber: this.orgUserFormAdd.phone || ''
            };
            this.$ajax('/eduadmin/saveSchoolAdmin',params)
              .then(res => {
                if(res.code == 200){
                  this.useAlert('success','添加成功!',function () {});
                  this.dialogVisibleAdd = false;
                  this.getOrgUserLists()
                }else{
                  this.useAlert('error',res.message,function () {});
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
      // 编辑机构人员信息
      orgUsersEdit(index, row) {
        this.dialogVisibleEdit = true;
        this.orgUserFormEdit.name= row.name;
        this.orgUserFormEdit.phone= row.phone;
        this.principalId=row.id;
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
                this.getOrgUserLists();
                this.dialogVisibleEdit = false;
              }
              else{
                this.useAlert('error',res.message,function () {});
                this.dialogVisibleEdit = false;
                this.getOrgUserLists();
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
        // console.log(row.id)
        this.currentInfo = row;
      },
      // 获取机构人员状态
      getOrgUserSelectState(command){
        let params={
          orgId: this.orgInfoId,
          userId: this.currentInfo.id,
          state: command
        };
        this.$ajax('/eduadmin/changeOrgUserStatus',params).then((res) => {
          if(res.code == 200){
            this.useAlert('success','状态修改成功',function () {});
          }
          else{
            this.useAlert('error',res.message,function () {});
          }
          this.getOrgUserLists()
        }).catch(() => {
        });
      },
      // 确定删除单个机构人员
      orgUsersDelete(index, row) {
        //console.log(index,row)
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
            else{
              this.useAlert('error',res.message,function () {});
            }
            this.getOrgUserLists()
          });
        }).catch(() => {

        });
      },
      //获取列表选中列
      orgUsersSelectionChange(val) {
        // console.log(1)
        this.multipleSelection = val;
      },
      // 重置密码
      orgUsersRestPwd(index, row){
        // console.log(row)
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
      // 批量删除机构人员 备选
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
            this.getOrgUserLists()
          });
        }).catch(() => {

        });
      },
    },
    created: function() {
      this.grads = JSON.parse(JSON.stringify(grads_default));
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    beforeRouteLeave  (to, from, next) {
    	if(this.isReturnPage){
    		next();
      }
      else{
        if(this.editSchoolFlag){
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
//              type: 'warning'
            }).then(() => {
              //确定
              this.saveSchoolInfo();
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
  }
</script>
<style >
  @import "../../../resources/front/css/common/adm-stu-tea-mgt.css";
  #editSchoolInfoByEdu .icon-conserve:before{
    margin-right: 3px;
  }
  #editSchoolInfoByEdu .dialog-footer>.el-button{padding: 9px 30px;}


  /*标题样式*/
  #editSchoolInfoByEdu .title{
    padding: 8px 0 8px 0;
    height: 34px;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 30px;
  }
  #editSchoolInfoByEdu .title i{
    margin-top:3px;
  }
  #editSchoolInfoByEdu .title>span{
    display: inline-block;
    vertical-align:middle;
    margin-left: 10px;
    font-size: 14px;
    color: #0d9ee9;
    position:relative;
    top:-11px;
  }
  #editSchoolInfoByEdu .tabs-header{
    text-align: right;
  }
  #editSchoolInfoByEdu .blackDiv2 {
    border-bottom: none;
  }
  #editSchoolInfoByEdu .tabs-body{
    clear: both;
    margin: 0 90px;
    padding-bottom: 20px;
  }
  #editSchoolInfoByEdu .el-table th>.cell {
    text-align: center;
  }
  #editSchoolInfoByEdu .el-table .cell, .el-table th>div {
    text-align: center;
  }

  /*省市区*/
  #editSchoolInfoByEdu .item-text .address{
    margin-top: 22px;
    height: 40px;
    display: block;
  }
  #editSchoolInfoByEdu .el-input__icon{
    right:13px;
  }
  #editSchoolInfoByEdu .el-textarea__inner {
    height: 60px;
    width: 652px;
  }

/*添加按钮*/
  #editSchoolInfoByEdu .el-button--info{
    width:40px;
    float: right;
    text-align: center;
  }
  #editSchoolInfoByEdu .grads li{list-style:none;float:left;margin-right:5px;}
  #editSchoolInfoByEdu .grads label{border:1px solid #e6e6e6;width:48px;text-align:center;display:inline-block;cursor:pointer;}
  #editSchoolInfoByEdu .grads li label.checked{color:#0d9ee9;border:1px solid #0d9ee9;}
  #editSchoolInfoByEdu .blind{
    clip: rect(1px,1px,1px,1px);
    clip: rect(1px 1px 1px 1px);
    position: absolute;
}

 #editSchoolInfoByEdu a, input, textarea, keygen, select, button{font-family:"微软雅黑";}
 #editSchoolInfoByEdu .el-input.is-disabled .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
 #editSchoolInfoByEdu .el-input.is-disabled .el-input__inner::-moz-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
 #editSchoolInfoByEdu .el-input.is-disabled .el-input__inner:-ms-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
 #editSchoolInfoByEdu .el-input.is-disabled .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}
 #editSchoolInfoByEdu .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑"}
 #editSchoolInfoByEdu .el-input__inner::-moz-placeholder{color:#1f2d3d;}
 #editSchoolInfoByEdu .el-input__inner:-ms-input-placeholder{color:#1f2d3d;}
 #editSchoolInfoByEdu .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}


  /*表格边框问题*/
  #editSchoolInfoByEdu  .el-table table{
    width: 100%;
  }
  #editSchoolInfoByEdu .el-table th.el-table_1_column_3{
    border-right: 1px solid #a5defa;
  }
  #editSchoolInfoByEdu .el-select>.el-input{width: 215px;}
  #editSchoolInfoByEdu .cell .el-button{color: #20a0ff;background: none;border: none;text-decoration: underline;}
  #editSchoolInfoByEdu .cell .el-button.el-button--danger{color: #ff5353;}
  #editSchoolInfoByEdu .el-form .el-form-item{margin-left: 100px;}
  #editSchoolInfoByEdu .el-dialog .el-form-item{margin-left: 0px;}
</style>
