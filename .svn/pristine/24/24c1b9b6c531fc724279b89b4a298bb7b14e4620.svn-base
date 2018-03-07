<template>
  <div class="admin" v-loading.lock="fullscreenLoading">
    <div class="menus" >
        <div class="menus-head">
          <h4 class="title">机构列表</h4>
        </div>
        <div class="seach-bar" v-if=" userInfo.roleId != 4 ">
          <el-input
            placeholder="按地区筛选"
            icon="search"
            v-model="searchText"

            >
          </el-input >
        </div>
        <el-tree
          :data="orgListsData"
          :props="defaultProps"
          accordion
          :filter-node-method="filterNode"
          @node-click="getNodeId"
          ref="orgLists"
          node-key="id"
          current-node-key="id"

          :default-expanded-keys="defaultExpanded"
          >
        </el-tree>
    </div>
    <div class="main-content">
      <div class="tabs" :class="[{ isMove: firstLogin }]">
        <el-tabs  element-loading-text="页面加载中..." @tab-click="tabClick" v-model="activeName">

          <el-tab-pane label="机构信息" name="first">
              <div class="tabs-header btns text-right">
                <el-button type="success"  @click="editOrgInfoForm" v-if="!isEditing" class="move">编辑</el-button>
                <el-button type="primary"  @click="cancelOrgInfoForm" v-if="isEditing">取消</el-button>
                <el-button type="success"  @click="saveOrgInfoFormData" v-if="isEditing">保存</el-button>
                <div class="guide-tips-bg guide-tips-bg-edit"></div>
              </div>
              <div class="tabs-body" >
                <el-form ref="orgInfoForm" :model="orgInfoForm" :rules="orgInfoRules" label-width="100px" class="edit" :class="[{ editing: isEditing }] " >
                  <el-form-item label="机构名称：" prop="childrenName" class="orgName">
                    <el-input v-model="orgInfoForm.childrenName" :maxlength="30" class="item-text"></el-input>
                    <p> {{ orgInfoForm.childrenName }}</p>
                  </el-form-item>
                  <el-form-item label="所在地址：" prop="address">
                    <div class="address-select">

                      <!--  -->
                      <el-select v-model="selectedProvince" placeholder="省份"    class="item-text">
                          <el-option
                            v-for="item in province"
                            :label="item.name"
                            :value="item.id"
                            :key="item.id"
                            >
                          </el-option>
                        </el-select>

                      <!-- v-if="isShowCity" @change="changeCounty(selectedCity)"-->
                      <el-select v-model="selectedCity" placeholder="城市"   v-if="isShowCity" class="item-text"    >
                          <el-option
                            v-for="item in city"
                            :label="item.name"
                            :value="item.id"
                            :key="item.id"
                            >
                          </el-option>
                      </el-select>
                      <!-- v-if="isShowCounty" @change="changeSelf" -->
                      <el-select v-model="selectedCounty" placeholder="区域"  v-if="isShowCounty"  class="item-text"  >
                        <el-option
                          v-for="item in county"
                          :label="item.name"
                          :value="item.id"
                          :key="item.id"
                          >
                        </el-option>
                      </el-select>
                    </div>
                    <div class="item-text address">
                      <el-input type="textarea" v-model="orgInfoForm.address" class=""></el-input>
                    </div>

                    <p>{{defaultProvince}} {{defaultCity}} {{defaultCounty}} {{orgInfoForm.address}} </p>
                  </el-form-item>
                  <el-form-item label="学校数量：" prop="schoolNum">
                    <span> {{ orgInfoForm.schoolNum }}&nbsp;所学校</span>  <!-- <router-link :to="{ name: 'eduSchoolManagement', params: {id: id,level:level,name: name }}" class="link-highlight" v-if=" userInfo.roleId != 32 ">学校列表</router-link> -->
                    &nbsp;<router-link :to="{ path:  '/eduSchoolManagement',query :{id: id,level:level,name: name }}" class="link-highlight" v-if=" userInfo.roleId != 32 ">查看</router-link>
                  </el-form-item>
                  <el-form-item label="描述：" prop="note">
                    <el-input type="textarea" v-model="orgInfoForm.note" :maxlength="200" class="item-text"></el-input>
                    <p> {{ orgInfoForm.note }} </p>
                  </el-form-item>
                </el-form>
              </div>
          </el-tab-pane>
          <el-tab-pane label="人员列表">
            <div class="tabs-header btns text-right" >
            <el-button type="success" @click="addOrgUser" class="move" >新建人员</el-button>
            <!-- <el-button type="danger" @click="orgUsersBatchDelete" icon="delete2" :disabled="true">批量删除</el-button> -->
            <div class="guide-tips-bg guide-tips-bg-add"></div>
          </div>
            <div class="tabs-body">
              <div class="noData" v-if="noData" >
                <p class="empty-text">暂无人员信息</p>
              </div>

              <el-table
                  style="width:100%"
                  :data="orgUsers"
                  border
                  stripe
                  tooltip-effect="dark"
                  @cell-click="getOrgUserCurrentInfo"
                  @selection-change="orgUsersSelectionChange"
                  v-if="orgUserTotal != 0"
                  >
                  <!-- <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column> -->
                  <el-table-column
                    prop="name"
                    label="姓名"
                    show-overflow-tooltip
                    >
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机号"
                    width="150">

                  </el-table-column>
                  <el-table-column
                    prop="position"
                    label="职务"
                    width="115"
                    show-overflow-tooltip
                    >
                  </el-table-column>
                  <el-table-column
                    prop="state"
                    label="状态"

                    >
                    <template scope="scope">
                      <el-dropdown trigger="click" menu-align="start" @command="getOrgUserSelectState">
                            <span class="el-dropdown-link">
                              <b v-if="scope.row.state == 0">正常</b>
                              <b v-if="scope.row.state == 1">禁用</b>
                              <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item v-if="scope.row.state == 1" command="0">正常</el-dropdown-item>
                              <el-dropdown-item v-if="scope.row.state == 0" command="1">禁用</el-dropdown-item>
                            </el-dropdown-menu>
                            <!-- <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item  command="0">正常</el-dropdown-item>
                              <el-dropdown-item  command="1">禁用</el-dropdown-item>
                            </el-dropdown-menu> -->
                          </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="260"
                    >

                    <template scope="scope">
                        <el-button
                          type="primary"
                          size="small"
                          @click="orgUsersEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          type="primary"
                          size="small"
                          @click="orgUsersRestPwd(scope.$index, scope.row)">重置密码</el-button>
                        <el-button
                          size="small"
                          type="danger"
                          @click="orgUsersDelete(scope.$index, scope.row)"
                          :class="[{ isShow: userInfo.id == scope.row.id }]"
                          > <span v-if="userInfo.id != scope.row.id">删除</span></el-button>
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
                <el-dialog title="新建机构人员" v-model="dialogVisibleAdd" top="50%"  :close-on-click-modal="false" size="tiny" :before-close="orgUserFormCancle">
                  <el-form ref="orgUserFormAdd" :model="orgUserFormAdd" :rules="orgUserAddRules" label-width="90px">
                    <el-form-item label="姓名：" prop="name">
                      <el-input v-model.trim="orgUserFormAdd.name" :maxlength="40"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="phone" >

                      <el-input v-model.trim="orgUserFormAdd.phone" :maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="职务：" prop="position" >

                      <el-select v-model="position" placeholder="请选择职务">
                        <el-option v-for="item in positions "  :label="item.label" :value="item.value" :key="item.value"></el-option>

                      </el-select>


                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="orgUserFormCancle">取 消</el-button>
                    <el-button type="success" @click="orgUserFormAddData">添 加</el-button>
                  </span>
                </el-dialog>

                <el-dialog title="编辑机构人员" v-model="dialogVisibleEdit" top="50%"  :close-on-click-modal="false" size="tiny">
                  <el-form ref="orgUserFormEdit" :model="orgUserFormEdit" :rules="orgUserAddRules" label-width="90px">
                    <el-form-item label="姓名：" prop="name">
                      <el-input v-model.trim="orgUserFormEdit.name" :maxlength="40"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="phone" v-if=" userInfo.roleId != 4 ">
                      <el-input v-model.trim="orgUserFormEdit.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="职务：" prop="position" >

                      <el-select v-model="positionEdit" placeholder="请选择职务">
                        <el-option v-for="item in positions "  :label="item.label" :value="item.value" :key="item.value"></el-option>

                      </el-select>


                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleEdit = false">取 消</el-button>
                    <el-button type="success" @click="orgUserFormEditData()">保 存</el-button>
                  </span>
                </el-dialog>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="guide-tips" v-if="firstLogin"  @click="closeGuide">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'admin',
    data() {
          return {
            positions:[
            {value:'局长',label:'局长'},
            {value:'副局长',label:'副局长'},
            {value:'局办公室主任',label:'局办公室主任'},
            {value:'人事科长',label:'人事科长'},
            {value:'基础教育科科长',label:'基础教育科科长'},
            {value:'计划财务科科长',label:'计划财务科科长'},
            {value:'勤工俭学科科长',label:'勤工俭学科科长'},
            {value:'行政审批科科长',label:'行政审批科科长'},
            {value:'基本建设科科长',label:'基本建设科科长'},
            {value:'招生办主任',label:'招生办主任'},
            {value:'教研室主任',label:'教研室主任'},
            {value:'其他',label:'其他'}
            ],
            position:'',
            positionEdit:'',
            noData:false,
            value:'',
            // 全屏遮罩层
            fullscreenLoading: true,
            // 用户信息
            userInfo:'',
            firstLogin:true,
            // 编辑输入框
            orgInfoForm:{
              childrenName:'',
              address:'',
              schoolNum:'',
              orgInfo:{
                fullName:'',
              },
              note:'',
            },
            defaultExpanded:[],
            // 地区
            province:[],
            city:[],
            county:[],
            selectedProvince:'',
            defaultProvince:'',

            selectedCity:'',
            defaultCity:'',

            selectedCounty:'',
            defaultCounty:'',

            isShowCity:false,
            isShowCounty:false,
            // 校验
            orgInfoRules: {
              childrenName: [
                {required: true, message: '请输入机构名称', trigger: 'blur' },
                {pattern: /^[\u4E00-\u9FA5]+$/,message: '用户名只能为中文',trigger: 'blur'},
                {pattern: /^[\u4E00-\u9FA5]{0,30}$/, message: '长度在 0 到 30 个字符'},
              ],
              note: [
                {message: '请输入描述信息', trigger: 'blur' },
                {pattern: /^[\S]{0,200}$/, message: '长度在 0 到 200 个字符' },
              ]
            },
//            当前修改用户id
            userRowId:'',
            // 机构列表
            orgListsData: [],
            // 文本搜索
            searchText: '',
            // 树形图参数
            defaultProps: {
              children: 'childrens',
              label: 'name'
            },
            // 机构id
            orgInfoId:'',
            // 选择机构id
            chooseOrgId:'',
            // 机构类型
            type:'',
            // 上级机构id
            pId:'',
            // 地址
            address:'',
            // 名称
            name:'',
            isEdited:false,
            // 编辑切换
            isEditing:false,
            // 机构人员
            orgUsers: [],
            // 机构人员总数
            orgUserTotal:0,
            // 新建机构人员字段
            orgUserFormAdd:{
              name:'',
              phone:'',
              position:'',
            },
            // 获取当前点击行的信息
            currentInfo:'',
            // 获取修改状态信息
            orgUserStutas:'',
            // 编辑机构人员字段
            orgUserFormEdit:{
              name:'',
              phone:'',
            },
            // 机构人员字输入段验证
            orgUserAddRules: {
                name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                },{
                    pattern: /^[^\s]*$/,
                    message: '长度在 0 到 40 个非空白字符',
                    trigger: 'blur'
                }],
                phone: [{
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur'
                    },{
                        pattern: /^1[34578]\d{9}$/,
                        message: '请输入11位手机号',
                        trigger: 'blur'
                    }

                ],
            },


            // 隐藏对话框
            dialogVisibleAdd: false,
            dialogVisibleEdit: false,
            //列表选中列
            multipleSelection: [],
            // params
            id:'',
            level:'',
            name:'',
            isLocal:true,
            orgInfoFormId:'',

            activeName:'first',
            treeNodeId:0,
          }
        },
    mounted(){
      this.getUserInfo()
    },
    methods: {
      // 获取省级数据
      getProvince(){

        // console.log(this.selectedProvince)
        this.$ajax('schadmin/getAreaChilds',{id: 0})
        .then(res => {
              if(res.code == 200){

                this.province=res.data;

                if(!this.orgInfoForm.orgInfoV3.provinceId) return;

                  this.getCity()

              }else{
                 this.useAlert('error',res.message ,function () {});
              }


        }).catch((res) => {
           this.useAlert('error',res.message ,function () {});
        });
      },
      // 获取市级数据
      getCity(){
        this.$ajax('schadmin/getAreaChilds',{id: this.selectedProvince })
        .then(res => {
              if(res.code == 200){

                this.city=res.data;


                if( !this.orgInfoForm.orgInfoV3.cityId ) return;

                this.getCounty()

                // this.isShowCity=true;

              }else{
                 this.useAlert('error',res.message ,function () {});
              }


        }).catch((res) => {
           this.useAlert('error',res.message ,function () {});
        });
      },
      // 获取县级数据
      getCounty(){
        this.$ajax('schadmin/getAreaChilds',{id: this.selectedCity })
        .then(res => {
              if(res.code == 200){

                this.county=res.data;

              }else{
                 this.useAlert('error',res.message ,function () {});
              }


        }).catch((res) => {
           this.useAlert('error',res.message ,function () {});
        });
      },

      changeCity(id){
        if(!id) return;
        this.$ajax('schadmin/getAreaChilds',{id: id })
        .then(res => {
              if(res.code == 200){

                this.city=res.data;

                if(!this.city.length) {
                  this.isShowCity=false;
                  this.isShowCounty=false;
                  return
                };
                this.isShowCity=true;
                this.isShowCounty=true;
                this.orgInfoForm.orgInfoV3.provinceId=id;


                this.selectedCity='';
                this.selectedCounty='';
                this.county.length=0;
              }else{
                 this.useAlert('error',res.message ,function () {});
              }


        }).catch((res) => {
           this.useAlert('error',res.message ,function () {});
        });
      },
      changeCounty(id){

        if(!id) return;

        this.$ajax('schadmin/getAreaChilds',{id: id})
        .then(res => {
              if(res.code == 200){

                this.county=res.data;
                if(!this.county.length) {
                  this.isShowCounty=false;
                  return
                };
                this.isShowCounty=true;
                this.orgInfoForm.orgInfoV3.cityId=id;
                this.selectedCounty='';
              }else{
                 this.useAlert('error',res.message ,function () {});
              }


        }).catch((res) => {
           this.useAlert('error',res.message ,function () {});
        });
      },
      changeSelf(id){
        if(!id) return;
        this.orgInfoForm.orgInfoV3.countyId=id;
      },
      tabClick(){
        this.isEditing=false;
      },
      // 获取节点id
      getNodeId(data) {
        if(this.treeNodeId == data.$treeNodeId ) return;

        this.treeNodeId=data.$treeNodeId;

        let _this= this;
        this.activeName="first";

        if(this.isEdited){


          this.$confirm('您当前做了编辑操作，是否需要保存？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
//            type: 'warning'
          }).then(() => {

            this.orgInfoFormId= sessionStorage.getItem('orgInfoFormId');

            this.saveOrgInfoForm(this.orgInfoFormId,function(){
              // console.log(data)

              _this.isEditing=false;
              _this.orgInfoId=data.id;
              _this.getOrgInfo(_this.orgInfoId);
              _this.getOrgUserLists(_this.orgInfoId);
            });

          }).catch(() => {


            this.orgInfoFormId= sessionStorage.getItem('orgInfoFormId');

            this.cancelOrgInfoForm(this.orgInfoFormId,function(){

              _this.isEditing=false;
              _this.orgInfoId=data.id;
              _this.getOrgInfo(_this.orgInfoId);
              _this.getOrgUserLists(_this.orgInfoId);

            });
          });

        }else{

          this.isEditing=false;
          this.orgInfoId=data.id;
          this.getOrgInfo(this.orgInfoId);
          this.getOrgUserLists(this.orgInfoId);
        }


      },
      // 获取机构信息
      getOrgInfo(id){


        this.fullscreenLoading = true;
        this.$ajax('/eduadmin/eduInfo',{id: id})
         // this.$ajax('/eduadmin/orgInfo',{id: this.orgInfoId})

        .then(res => {
          if(res.code == 200){

            this.orgInfoForm=res.data;

            sessionStorage.setItem('orgInfoForm', JSON.stringify(this.orgInfoForm))
            sessionStorage.setItem('orgInfoFormId',this.orgInfoForm.id)

            if(this.orgInfoForm.orgInfoV3.provinceId){
              this.defaultProvince = this.orgInfoForm.orgInfoV3.provinceName;
              this.selectedProvince=this.orgInfoForm.orgInfoV3.provinceId;

            }else{
              this.defaultProvince = '';
              this.selectedProvince='';
            }

            if(this.orgInfoForm.orgInfoV3.cityId){
              this.selectedCity=this.orgInfoForm.orgInfoV3.cityId;
              this.defaultCity = this.orgInfoForm.orgInfoV3.cityName;
            }else{
              this.selectedCity = '';
              this.defaultCity='';
            }

            if(this.orgInfoForm.orgInfoV3.countyId){
              this.selectedCounty=this.orgInfoForm.orgInfoV3.countyId;
              this.defaultCounty= this.orgInfoForm.orgInfoV3.countyName;

            }else{
              this.selectedCounty = '';
              this.defaultCounty='';
            }
            // 获取路由参数

            this.id=this.orgInfoForm.orgInfo[0].id;
            this.level=this.orgInfoForm.orgInfo[0].level;
            this.name=this.orgInfoForm.orgInfo[0].name;

            // console.log(this.id)
            // console.log(this.level)
            // console.log(this.name)

            this.fullscreenLoading = false;
          }else{
             this.useAlert('error',res.message ,function () {});
          }

        }).catch((res) => {
           this.useAlert('error',res.message ,function () {});
        });
      },
      // 获取角色信息
      getUserInfo(){

        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.firstLogin=!localStorage.adminFirstLogin && this.userInfo.firstLogin;

        function isEmptyObject(obj) {
          for (var key in obj) {
            return false;
          }
          return true;
        }

        let localData= JSON.parse(sessionStorage.getItem("orgListsData"));

        if(this.isLocal && !localData){
          this.getOrgTree()
        }else{

          this.orgListsData = JSON.parse(sessionStorage.getItem("orgListsData"));

          this.getOrgInfo(this.orgListsData[0].id);

          this.orgInfoId=this.orgListsData[0].id;

          this.getOrgUserLists(this.orgInfoId)

          this.fullscreenLoading = true;

          this.defaultExpanded=[this.orgInfoId]
          //,this.orgListsData[0]['childrens'][0].id
          this.$nextTick(function(){

            let label=document.querySelectorAll(".el-tree-node__label");

            for (var i = 0; i < label.length; i++) {
              label[i].setAttribute("title",label[i].innerHTML)
            }
          })


        }


        // if(this.userInfo.id ==)
        // console.log(this.userInfo)
        // console.log(this.firstLogin)

      },
      // 获取机构列表
      getOrgTree(){
        this.fullscreenLoading = true;
        let params={
          teacherId: this.userInfo.id
        };
        this.$ajax('/eduadmin/getEduTree',params)
        .then(res => {
          if(res.code == 200){

              this.orgListsData=res.data;

              sessionStorage.setItem("orgListsData", JSON.stringify(res.data));

            this.getOrgInfo(this.orgListsData[0].id);

            this.orgInfoId=this.orgListsData[0].id;

            // console.log(this.orgInfoId)

            this.getOrgUserLists(this.orgInfoId)


            this.defaultExpanded=[this.orgInfoId]
            // ,this.orgListsData[0]['childrens'][0].id
            this.fullscreenLoading = false;

            this.isLocal=false;

            this.$nextTick(function(){

              let label=document.querySelectorAll(".el-tree-node__label");

              for (var i = 0; i < label.length; i++) {
                label[i].setAttribute("title",label[i].innerHTML)
              }
            })

          }else{
             this.useAlert('error',res.message ,function () {});
          }


        }).catch((res) => {
           this.useAlert('error',res.message ,function () {});
        });
      },

      // 实时搜索
      filterNode(value, data) {
        if (!value) return true;
        // console.log(data.name)
        return data.name.indexOf(value) !== -1;
      },
      // 编辑机构信息
      editOrgInfoForm(){

        this.isEditing=true;
        this.isSelect=true;

        this.getOrgInfo(this.orgInfoId)

        this.getProvince();

      },
      // 取消机构信息
      cancelOrgInfoForm(id,callback){
        this.$refs['orgInfoForm'].resetFields();
        this.isEditing=false;
        this.useAlert('error', '取消保存' ,function () {});
        if(typeof callback === "function"){
           callback();
        }else{
          this.getOrgInfo(this.orgInfoId)

        }

      },
      saveOrgInfoFormData(){
        this.saveOrgInfoForm(this.orgInfoFormId || this.orgInfoId)
      },
      // 保存机构信息
      saveOrgInfoForm(id,callback){


        this.$refs.orgInfoForm.validate((valid) => {

                  if (valid) {

                     let params={
                       id: id,
                       childrenName: this.orgInfoForm.childrenName,

                       addressOrgId:  this.selectedCounty || this.selectedCity || this.selectedProvince,

                       address: this.orgInfoForm.address,
                       note: this.orgInfoForm.note,
                     };

                     this.$ajax('/eduadmin/editEdu',params)
                     .then(res => {
                           if(res.code == 200){
                             this.useAlert('success', '保存成功' ,function () {});

                             this.isEditing=false;


                             if(!callback){

                              this.getOrgInfo(id);

                             }else{
                              if(typeof callback === "function"){
                                 callback();
                               }
                             }

                             /*if(typeof callback === "function"){
                                callback();
                             }*/

                           }

                     }).catch((res) => {
                       this.useAlert('error', res.message ,function () {});
                    });

                  } else {
                    this.useAlert('error', '验证未通过' ,function () {});
                  }
                });



      },
      // 获取机构人员列表
      getOrgUserLists(id){
        this.$ajax('/eduadmin/eduUserList',{educationId: id})
        .then(res => {
              if(res.code == 200){

                this.orgUsers=res.data;
                this.orgUserTotal=this.orgUsers.length;
                // console.log(this.orgUsers)
                if(this.orgUserTotal == 0){
                  this.noData=true;
                }else{
                  this.noData=false;
                }


              }else{
                 this.useAlert('error',res.message ,function () {});
              }


        }).catch((res) => {
           this.useAlert('error',res.message ,function () {});
        });
      },
      // 新建机构人员
      addOrgUser(){
        this.orgUserFormAdd={
          name: '',
          phone: ''
        };
        this.position='';
        this.dialogVisibleAdd = true;

      },
      //确定添加机构人员
      orgUserFormAddData(){

        this.$refs.orgUserFormAdd.validate((valid) => {
                  if (valid) {

                    let params={
                      educationId: this.orgInfoId,
                      name: this.orgUserFormAdd.name,
                      phone: this.orgUserFormAdd.phone || '',
                      position: this.position || '',
                    };

                    this.$ajax('/eduadmin/addEduUser',params)
                    .then(res => {
                          if(res.code == 200){
                            this.useAlert('success', '添加成功!' ,function () {});

                            this.dialogVisibleAdd = false;

                            this.getOrgUserLists(this.orgInfoId)

                          }else{

                             this.useAlert('error',res.message ,function () {});
                          }

                    }).catch((res) => {
                       this.useAlert('error',res.message ,function () {});
                    });

                  } else {
                    this.useAlert('error','验证未通过' ,function () {});
                    return false;

                  }
                });


      },
      orgUserFormCancle(){
        this.dialogVisibleAdd = false;
        this.position='';
        this.$refs.orgUserFormAdd.resetFields();

      },
      // 获取点击当前行信息
      getOrgUserCurrentInfo(row, column, cell, event){
        // console.log(row.id)
        this.currentInfo = row;
      },
      // 获取机构人员状态
      getOrgUserSelectState(command){

          let params={
            educationId: this.orgInfoId,
            userId: this.currentInfo.id,
            state: command
          };

          this.$ajax('/eduadmin/changeOrgUserStatus',params).then((res) => {

            if(res.code == 200){
              this.useAlert('success','状态修改成功' ,function () {});
              this.getOrgUserLists(this.orgInfoId)

            }else{
               this.useAlert('error',res.message ,function () {});
            }
        }).catch((res) => {
           this.useAlert('error',res.message ,function () {});
        });


      },
      // 编辑机构人员信息
      orgUsersEdit(index, row) {

        this.dialogVisibleEdit = true;

        this.orgUserFormEdit.name= row.name;
        this.orgUserFormEdit.phone= row.phone;
        this.positionEdit= row.position;
        this.userRowId = row.id;
        // console.log(index, row);
      },
      // 确定编辑
      orgUserFormEditData(){


        let params = {
          educationId: this.orgInfoId,
          userId: this.currentInfo.id,
          name: this.orgUserFormEdit.name,
          phone:  this.orgUserFormEdit.phone,
          position: this.positionEdit || '',
        };

        this.$ajax('/eduadmin/editEduUser',params).then((res) => {

          if(res.code == 200){
            this.useAlert('success','保存成功' ,function () {});
            this.getOrgUserLists(this.orgInfoId);

            this.dialogVisibleEdit = false;
            if(this.userRowId == this.userInfo.id){
                this.$store.commit('storeSetUserName',{'name':params.name})
              };
          }else{
             this.useAlert('error',res.message ,function () {});
          }

        }).catch((res) => {
           this.useAlert('error',res.message ,function () {});
        });
      },
      // 重置密码
      orgUsersRestPwd(index, row){
        // console.log(row)
        this.$confirm('是否确定重置密码?', '提示', {

          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {

          let params = {
            phone: row.phone
          };

          this.$ajax('/password/reset',params).then((res) => {
            if(res.code == 200){
              // setTimeout(()=>{
                this.$alert(res.message, '新密码', {
                  confirmButtonText: '确定',
                })
              // },1000)

            }else{
               this.useAlert('error',res.message ,function () {});
            }

          }).catch((res) => {
             this.useAlert('error',res.message ,function () {});
          });
        }).catch((res) => {
          this.useAlert('error','取消重置密码',function () {});
        });

      },
      // 确定删除单个机构人员
      orgUsersDelete(index, row) {
        // console.log(index,row)
        this.$confirm('确定要删除选中教师吗?', '提示', {
//          type: 'warning',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
        }).then(() => {
          let params = {
            userId: row.id,
            educationId:  this.orgInfoId
          };
          this.$ajax('/eduadmin/delEduUser',params).then((res) => {
            if(res.code == 200){
              this.useAlert('success','删除成功' ,function () {});
            }
            this.getOrgUserLists(this.orgInfoId)
          });
        }).catch((res) => {
           this.useAlert('error','取消删除' ,function () {});
        });
      },
      //获取列表选中列
      orgUsersSelectionChange(val) {
        // console.log(1)
        this.multipleSelection = val;
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
              this.useAlert('success','删除成功' ,function () {});
              this.getOrgUserLists(this.orgInfoId)
            }else{
               this.useAlert('error',res.message ,function () {});
            }
          });
        }).catch((res) => {
           this.useAlert('error',res.message ,function () {});
        });
      },
      closeGuide(){
        if(this.firstLogin){
          this.firstLogin=false;

          this.isMove=false;

          localStorage.adminFirstLogin = 'NO';
        }

      }
    },
    watch: {
      searchText(val) {
        this.$refs.orgLists.filter(val);
      },
      selectedProvince:{
        handler: function(val){
          if(!val) return
          this.changeCity(val)

        },
        immediate: true
      } ,
      selectedCity: {
        handler: function(val){
          if(!val) return
          this.changeCounty(val)
        },
        immediate: true
      },
      selectedCounty: {
        handler: function(val){
          if(!val) return
          this.changeSelf(val)
        },
        immediate: true
      } ,
      orgInfoForm:{
        handler: function (val, oldVal) {
          if(!val) return;

          let orgInfoFormStorage = sessionStorage.getItem('orgInfoForm');

          // console.log(JSON.parse(orgInfoFormStorage).orgInfoV3)
          // console.log(val.orgInfoV3)


          // console.log( _.isEqual(JSON.parse( orgInfoFormStorage ), val) );

            if( JSON.stringify( val ) == orgInfoFormStorage ){
              this.isEdited=false;
            }else{
              this.isEdited=true;

            }

        },
        deep: true,
        immediate:true,
      }
    },
    beforeRouteLeave  (to, from, next) {
        if(this.isEdited){

          this.$confirm('您当前做了编辑操作，是否需要保存？', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
//              type: 'warning'
            }).then(() => {
              //确定
              this.saveOrgInfoForm(this.orgInfoId);

              next()

            }).catch(() => {
              //取消
              this.cancelOrgInfoForm();
              next()
            });


        }else{
          next()
        }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "../../../resources/front/css/common/adm-stu-tea-mgt.css";
  .admin{
    padding: 12px 20px 20px;
    height: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .el-tree > .el-tree-node{
    border-bottom: 1px solid #d3e3f3;
  }
  .el-tree > .el-tree-node > .el-tree-node__content{
    background: #f4fcff;
  }
  .el-tree > .el-tree-node > .el-tree-node__content > .el-tree-node__label{
  color: #333;
  }
  .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node > .el-tree-node__content{
    position: relative;
  }
  .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node > .el-tree-node__content:first-child {
    border-top: 1px solid #d3e3f3;
  }
  .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__content > .el-tree-node__label{
    color: #20a0ff;
  }
  .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node > .el-tree-node__content:after{
    position: absolute;
    content:'';
    bottom:-1px;
    border-bottom: 1px solid #d3e3f3;
    width: 100%;
    left: 30px;
  }
  .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node > .el-tree-node__content > .el-tree-node__label{
    color: #666;
  }
  .el-tree > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node > .el-tree-node__content{
    position: relative;
  }

  .el-tree > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node > .el-tree-node__content:before{
    position: absolute;
    content:'';
    bottom:0;
    border-right: 1px dashed #d3e3f3;
    left: 40px;
    width: 0px;
    top: 0;
    height: 36px;
  }
  .el-tree > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node > .el-tree-node__content:after{
    position: absolute;
    content:'';
    bottom:0;
    border-bottom: 1px dashed #d3e3f3;
    width: 100%;
    left: 60px;
  }
  .el-tree > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node:last-child .el-tree-node__content:after{
    border-bottom: 0;
  }
  /* .el-tree-node>.el-tree-node__children>.el-tree-node:first-child{
    border-top: 1px solid #d3e3f3;
  } */
  .el-tree > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node > .el-tree-node__content > .el-tree-node__label{
    position: relative;
    /* color: #858585; */
  }
  .el-tree > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node > .el-tree-node__content > .el-tree-node__label:after{
    position: absolute;
    content:'';
    width: 15px;
    border-bottom: 1px dashed #d3e3f3;
    left: -20px;
    top: 50%;
  }
  .el-tree-node.is-current{
    /* color: #20A0FF; */
  }
  .el-tree-node:last-child{
    border-bottom: none;
  }
  .el-tree-node__label{
    margin-left: 7px;
    width: 134px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-tree-node__expand-icon{
    border-left-color: transparent;
    position: relative;
    font-family: 'icomoon' !important;
    color: #bbb;
  }
  .el-tree-node__expand-icon:hover{
    border-left-color: transparent;
  }
  .el-tree-node__expand-icon:after{
    position: absolute;
    content:'\e92f';
    top: -18px;
    left: -5px;
    font-size: 12px;
  }
  .el-tree-node__content:hover{
    background: none;
  }
  .el-tree-node.is-expanded>.el-tree-node__content>.el-tree-node__label{
    color: #20a0ff;
  }
  .el-tree-node.is-expanded>.el-tree-node__children>.el-tree-node.is-current.is-expanded > .el-tree-node__children > .el-tree-node > .el-tree-node > .el-tree-node__label{
    color: #858585;
  }
  .el-tree-node.is-expanded>.el-tree-node__children>.el-tree-node.is-current > .el-tree-node__label{
    color: #20a0ff;
  }
  .el-tree-node.is-expanded>.el-tree-node__children > .el-tree-node.is-current > .el-tree-node__content > .el-tree-node__label{
    color: #20a0ff;
  }
  .el-tree-node.is-expanded>.el-tree-node__children > .el-tree-node > .el-tree-node__content > .el-tree-node__label{
    color: #858585;
  }
  /* .el-tree-node__children .el-tree-node.is-current {
    color: #20a0ff;
  } */
  /* .el-tree-node.is-expanded .el-tree-node__expand-icon.expanded{
    color: #20a0ff;
  } */
  .el-tree-node__expand-icon.expanded{
    transform: rotate(0deg);
  }
  .el-tree-node__expand-icon.expanded:after{
    content:'\e92c';
  }
  .el-tree-node__expand-icon.is-leaf:after{
    content:'';
  }
  .admin .menus{
    width: 200px;
    /* border: 1px solid #20A0FF; */
  }
  .admin .menus-head{
    background: #20A0FF;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  .admin .menus .seach-bar .el-input__icon{
    right: auto;
    left: 0;
  }
  .admin .menus .seach-bar .el-input__icon+.el-input__inner{
    padding-right: 0px;
    padding-left: 30px;
  }
  .admin .menus-head .title{
    font-size: 14px;

  }
  .admin .menus-head .add-btn{
    color:#fff;
    border: 1px solid #fff;
    font-size: 12px;
    padding: 2px;
  }
  .admin .seach-bar{
    padding: 10px;
    border: 1px solid #d1dbe5;
    border-bottom: none;
  }
  .admin .seach-bar input{
    height: 30px;
    width: 100%;
    border-radius: 0;
    /* border: 1px solid #20A0FF; */
  }
  .admin .main-content{
    width: 770px;
  }
  /* .tabs .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    border-top: 3px solid;
  }
  .tabs .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    border-top: 3px solid;
  } */

  .admin .el-tabs__active-bar{
    width: 180px !important;
    top: 0px;
  }
  .admin .el-tabs__header{
    margin: 0;
    /* border-bottom: none; */
  }
  .admin .el-tabs:nth-child(2){
    margin-top: 30px;
  }

  .admin .tabs-header{
    padding-top: 15px;
    margin-bottom: 20px;
    /* position: absolute; */
    /* top:-55px; */
    /* right: 0; */
    padding-bottom: 15px;
    border-bottom: 1px solid #e9edf1;
  }
  .admin .el-tabs__nav{
    border-left: 1px solid #cedaea;
  }
  .admin .el-tabs__nav .el-tabs__item{
    width: 180px;
    text-align: center;
    border-right: 1px solid #cedaea;
    border-top: 1px solid #cedaea;
  }
  .admin .el-tabs__item.is-active{
    cursor: default;
    border-bottom: 1px solid #fff;

  }
  .admin .text-left {
    text-align: left;
  }
  .admin .text-right {
    text-align: right;
  }
  .admin .space-between{
    display: flex;
    justify-content: space-between;
  }
  .admin .space-around{
    display: flex;
    justify-content: space-around;
  }
  .admin .tabs-header .editor{
    padding: 10px;
    display: block;

  }

  /* .el-form-item.is-required .el-form-item__label:before{
    content: '•';
    color: #999;
  } */

  .admin .edit .item-text{
    display: none;
    /* display: inline-block; */
  }
  .admin .edit.editing .orgName .item-text {
    width: 100%;
  }
  .admin .edit.editing .item-text{
    display: block;
    width: 200px;
  }
  .admin .edit .el-form-item  p{
    color: #666;
  }
  .admin .edit.editing p{
    display: none;
  }
  .admin .edit.editing .item-text.el-select{
    display: inline-block;

  }
  .admin .edit.editing .address-select .item-text{

    width: 193px;
  }
  .admin .edit.editing .item-text.address{
    margin-top: 22px;
  }
  .admin .edit .item-text .el-textarea{
    width: 300px;
    display: block;
  }
  .admin .pagination{
    margin-top: 20px;
    text-align: right;
  }
  .admin b{
    font-weight: normal;
  }
  .admin .details-address{
    margin-top: 10px;
  }

  .admin .link-highlight,
  .admin .link-highlight:hover{
    color: #20a0f2 ;
    text-decoration: underline;
  }

  .admin .cell .el-button{
    color: #20a0ff;
    background: none;
    border: none;
    text-decoration: underline;
  }
.admin .cell{
  text-align: center;
  white-space: nowrap;
}
.admin .cell .el-button.el-button--danger{
  color: #ff5353;
}
.admin .tabs-body{
  padding: 0 10px 40px 30px;
}
.admin .tabs-body .el-form-item__content{
  position: relative;
  min-height: 36px;
}

.admin .tabs-body .el-form-item__content:after{
  position: absolute;
  content:'';
  width: 100%;
  left: 0;
  bottom: -5px;
  border-bottom: 1px dashed #f0f0f0;
}

.admin .tabs-body .el-dialog .el-form-item__content:after{
  border-bottom: 0;
}
.admin .tabs-body .edit.editing .el-form-item__content:after{
  border-bottom: 0;
}
.admin .el-table table thead tr th:nth-last-child(2){
  border-right: 1px solid #a5defa;
}
.admin .el-form-item{
  /* margin-bottom: 15px; */
}
.admin .el-form-item:last-child .el-form-item__content:after{
  border-bottom: 0;
}
.admin .el-tabs__content{
  overflow: inherit;
  padding-left: 20px;
  border: 1px solid #d1dbe5;
  border-top: none;
  padding-right: 20px;
}
.admin .edit.editing .el-textarea__inner{
  width: 590px;
}
.admin .tabs-body .el-input .el-input__inner::-moz-placeholder{color:#1f2d3d;font-family:"Microsoft YaHei";}
.admin .tabs-body .el-input .el-input__inner:-ms-input-placeholder{color:#1f2d3d;font-family:"Microsoft YaHei";}
.admin .tabs-body .el-input .el-input__inner::placeholder{color:#1f2d3d;font-family:"Microsoft YaHei";}

.isShow{width:48px;pointer-events:none;}
.admin .el-tab-pane:last-child .tabs-body{padding-left:0;}
</style>
