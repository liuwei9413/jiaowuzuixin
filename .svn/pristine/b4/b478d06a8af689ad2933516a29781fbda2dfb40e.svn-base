<template>
  <div id="eduSchoolManagement">
    <div class="btns">
      <router-link :to="{ path: '/eduSchoolManagement/addschool' }" class="white-color add-btn el-button el-button--primary">
        <!--<i class="icon-new"></i>-->
        <span>新建学校</span>
      </router-link>
      <router-link :to="{ path: '/eduSchoolManagement/schoolbatch' }" class="white-color el-button el-button--primary">
        <!--<i class="icon-leading-in"></i>-->
        <span>批量导入</span>
      </router-link>
      <!--<el-button @click="deleteAllDialog" type="primary" icon="delete2" :disabled="this.multipleSelection.length===0" style="float: right;" class="del-btn">批量删除</el-button>-->
    </div>

    <div class="edu-box">
      <!--省教育局-->
      <div class="edu-city-con" v-if="orgInfo.level == '1'">
        <span class="edu-city-list color333" :class="{'edu-active': eduCityActiveIndex===''}" @click="getListForAllEdu()">全部</span>
        <span class="edu-city-list" :class="{'edu-active': eduCityActiveIndex===index}" v-for="(item, index) in eduCityList" @click="getListAndEduList(item, index)">{{ item.name }}</span>
        <div class="edu-area-con" v-if="eduAreaList.length > 0">
          <span class="edu-area-list" :class="{'edu-active': eduAreaActiveIndex===index}" v-for="(item, index) in eduAreaList" @click="getListForOneEdu(item, index)">{{ item.name }}</span>
        </div>
      </div>
      <!--市教育局-->
      <div class="edu-city-con" v-if="orgInfo.level == '2'">
        <span class="edu-city-list color333" :class="{'edu-active': eduAreaActiveIndex===''}" @click="getListForAllEdu2()">全部</span>
        <span class="edu-city-list" :class="{'edu-active': eduAreaActiveIndex===index}" v-for="(item, index) in eduAreaList" @click="getListForOneEdu2(item, index)">{{ item.name }}</span>
      </div>
      <!--县教育局-->
      <div class="edu-text" v-if="orgInfo.level == '3'">{{ orgInfo.name }}</div>
    </div>

    <div class="search">
      <el-form ref="searchData" :model="searchData" label-width="90px" :label-position="'right'">
        <el-row>
          <el-col :span="10">
            <el-form-item label="学校名称：">
              <el-input v-model="searchData.name" placeholder="请输入学校名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="12">
            <el-button type="primary" @click="search" style="position: absolute; right: -6px; top: 0;">查询</el-button>
          </el-col>
        </el-row>
        <template>
          <div class="more-con" v-show="searchMore">
            <el-form-item label="学制：">
              <el-checkbox-group v-model="searchData.codeTypes">
                <el-checkbox v-for="(item, index) in codeTypeList" :label="item.label" :class="{'ischecked': searchData.codeTypes.indexOf(item.label) >= 0}" :key="item.label">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="学校类型：">
              <el-checkbox-group v-model="searchData.schoolTypes">
                <el-checkbox v-for="(item, index) in schoolTypeList" :label="item.label" :class="{'ischecked': searchData.schoolTypes.indexOf(item.label) >= 0}" :key="item.label">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="地理位置：">
              <el-checkbox-group v-model="searchData.positions">
                <el-checkbox v-for="(item, index) in positionStrList" :label="item.label" :class="{'ischecked': searchData.positions.indexOf(item.label) >= 0}" :key="item.label">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </template>
      </el-form>
      <div class="more-btn" @click="seeMore">
        <i class="el-icon-d-arrow-left" :class="{'arrow-down': arrowDown, 'arrow-up': !arrowDown}"></i>
        <span>更多</span>
      </div>
      <div class="search-bg"></div>
    </div>
    <div v-if="!tableDataIsNull" v-loading="listLoading">
      <div class="teacher-table tables">
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <!--<el-table-column
            type="selection"
            width="45"
            align="center">
          </el-table-column>-->
          <el-table-column
            prop="name"
            label="学校名称"
            align="center"
            width="153"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="codeType"
            label="学制"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="schoolType"
            label="学校类型"
            width="120"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <!--<el-table-column
            prop="positionStr"
            label="地理位置"
            width="100"
            align="center">
          </el-table-column>-->
          <el-table-column
            prop="fuserListStr"
            label="负责人"
            align="center"
            width="180"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            align="center"
            width="200"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="状态"
            width="90"
            align="center">
            <template scope="props">
              <el-dropdown
                @command="setState"
                trigger="click"
                menu-align="start">
                <span class="el-dropdown-link" style="cursor: pointer;">
                  <span v-if="props.row.type === 1">禁用</span>
                  <span v-if="props.row.type === 0">正常</span>
                  <i class="el-icon-caret-bottom el-icon--right" style="color: #d7d7d7;"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="props.row.id + '-1'" v-if="props.row.type !== 1">禁用</el-dropdown-item>
                  <el-dropdown-item :command="props.row.id + '-0'" v-if="props.row.type !== 0">正常</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="160">
            <template scope="props">
              <router-link :to="{ path:  '/eduSchoolManagement/schoolinfo/'+props.row.id }" class="link-text" style=" text-decoration: underline;"><span>详情</span></router-link>
              <router-link :to="{ path:  '/eduSchoolManagement/editSchool/'+props.row.id }" class="link-text" style=" text-decoration: underline;">编辑</router-link>
              <!--<el-button @click="deleteOneDialog(props.row.id)" type="text" size="small" style="color: #ff5353; text-decoration: underline;">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="teacher-pagination pagination-box mb40" v-show="tableDataTotal != 0" style="margin-top: 20px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="params.pageNumber"
          :page-size="params.pageSize"
          layout="prev, pager, next, jumper"
          :total="tableDataTotal">
        </el-pagination>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="teacher-nodata" v-if="tableDataIsNull">
      没有学校信息
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'eduSchoolManagement',
    data () {
      const orgInfos = JSON.parse(localStorage.userInfo).education.orgInfo;
      const orgInfo = orgInfos[orgInfos.length - 1];
      return {
        orgInfo: Object.assign(orgInfo, this.$route.query),
        //请求公共参数
        params: {
          orgId: '', //地区id
          pageNumber: 1, //分页页码
          pageSize: 10,  //分页每页限制条数
          name: '',
          codeTypes: '', //学制
          schoolTypes: '', //学校类型
          positions: ''  //地理位置
        },
        //检索条件
        searchData: {
          name: '',
          codeTypes: [], //学制
          schoolTypes: [], //学校类型
          positions: []  //地理位置
        },
        codeTypeList: [{name:'六三制', label:'6-3'}, {name:'五四制', label:'5-4'}], //学制
        schoolTypeList: [{name:'小学', label:6}, {name:'完小', label:8}, {name:'初中', label:3}, {name:'九年一贯制', label:5}, {name:'高中', label:2}, {name:'完中', label:4}, {name:'十二年一贯制', label:13}, {name:'职业高中', label:9}, {name:'中等专业学校', label:10}], //学校类型
        positionStrList: [{name:'中心城区', label:1}, {name:'城乡结合', label:2}, {name:'近郊', label:3}, {name:'远郊', label:4}],  //地理位置
        searchMore: false,  //true=>展示更多检索条件
        arrowDown: true, //向下箭头 false=>向上箭头
        eduCityList: [],  //市教育局列表
        eduCityActiveIndex: '',  //市教育局被选中教育局下标
        eduAreaList: [],  //区县教育局列表
        eduAreaActiveIndex: '',  //县教育局被选中教育局下标
        listLoading: false, //加载列表loading图
        isPageLoad: true,  //页码变动是否执行分页切换
        isSearch: false,  //是否为检索
        tableDataIsNull: false, //数据库无学校
        tableData: [],  //列表集合
        tableDataTotal: 0,  //总数
        schoolId: 0, //当前学校id
        multipleSelection: [],  //多选集合
        multipleSelectionStr: '', //多选集合转字符串
        type: '', //用户账号状态
      }
    },
    methods:{
      //获取列表
      getList(params){
        var _this = this;
        this.listLoading = true;
        this.$ajax('eduadmin/getManySchool', params).then(function(res) {
          _this.listLoading = false;
          if ( res.code === '200' ) {
            _this.tableData = res.data.resultList;
            _this.tableDataTotal = res.data.total;
          } else {
            _this.useAlert('error', res.message, function() {});
//            _this.$alert(res.message, '提示', {
//              confirmButtonText: '确定',
//              callback: () => {
//                if ( _this.orgInfo.level == '1' ) {
//                  _this.getListForAllEdu();
//                } else if ( _this.orgInfo.level == '2' ) {
//                  _this.getListForAllEdu2();
//                }
//              }
//            });
          }
        }, function(err) {})
      },
      //获取教育局列表
      getOrgList(type) {
        var _this = this;
        var type = type || this.orgInfo.level;
        var params = {parentId: this.params.orgId};
        _this.searchData = {
          name: '',
          codeTypes: [],
          schoolTypes: [],
          positions: []
        };
        Object.assign(_this.params, {name: '', codeTypes: '', schoolTypes: '', position: ''});
        this.searchMore = false;
        if ( type == '3' ) return;
//        this.$ajax('eduadmin/eduChildrenInfo', params).then(function(res) {
          this.$ajax('org/getChildren', params).then(function(res) {
          if ( res.code === '200' ) {
            if ( type == '1' ) {
              _this.eduCityList = res.data;
            } else if ( type == '2' ) {
              _this.eduAreaList = res.data;
            }
          }
        }, function(err) {})
      },
      //省教育局登陆——获取某个市教育局下的县教育局列表及所有学校列表
      getListAndEduList(item, index) {
//        this.params.educationId = item.educationId;
        this.params.orgId = item.id;
        this.eduCityActiveIndex = index;
        this.eduAreaActiveIndex = '';
        this.getOrgList('2');
        this.getList(this.params);
      },
      //省教育局登陆——获取某县教育局下所有学校列表
      getListForOneEdu(item, index) {
//        this.params.educationId = item.educationId;
        this.params.orgId = item.id;
        this.eduAreaActiveIndex = index;
        this.getList(this.params);
      },
      //省教育局登陆——全部
      getListForAllEdu() {
//        this.params.educationId = this.userInfo.educationId;
        this.params.orgId = this.orgInfo.id;
        this.eduCityActiveIndex = '';
        this.eduAreaActiveIndex = '';
        this.eduAreaList = [];
        this.getList(this.params);
      },
      //市教育局登陆——获取某县教育局下所有学校列表
      getListForOneEdu2(item, index) {
//        this.params.educationId = item.educationId;
        this.params.orgId = item.id;
        this.eduAreaActiveIndex = index;
        this.getList(this.params);
      },
      //市教育局登陆——全部
      getListForAllEdu2() {
//        this.params.educationId = this.userInfo.educationId;
        this.params.orgId = this.orgInfo.id;
        this.eduAreaActiveIndex = '';
        this.getList(this.params);
      },
      //显示更多筛选条件
      seeMore() {
        this.arrowDown = !this.arrowDown;
        this.searchMore = !this.searchMore;
      },
      //搜索
      search() {
        var searchParams = {};
        for ( let i in this.searchData ) {
          searchParams[i] = this.searchData[i].toString();
        }
        this.isSearch = this.params.pageNumber !== 1;
        this.params.pageNumber = 1;
        Object.assign(this.params, searchParams);
        this.getList(this.params);
      },
      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.multipleSelectionStr = '';
        if ( val.length > 0 ) {
          for ( var i=0; i<val.length; i++ ) {
            this.multipleSelectionStr += val[i].id + ',';
          }
          this.multipleSelectionStr = this.multipleSelectionStr.substring(0, this.multipleSelectionStr.length-1);
        }
      },
      //删除数据后计算正确页码
      setPageNumber(count) {
        let nowPageNumber;
        nowPageNumber = Math.ceil(( this.tableDataTotal - count ) / 10);
        nowPageNumber = nowPageNumber < 1 ? 1 : nowPageNumber;
        nowPageNumber = nowPageNumber < this.params.pageNumber ? nowPageNumber : this.params.pageNumber;
//        console.log('this.tableDataTotal:'+this.tableDataTotal+'count:'+count+'page:'+nowPageNumber+'this.params.pageNumber:'+this.params.pageNumber);
        return nowPageNumber;
      },
      //删除单个学校确认框
      /*deleteOneDialog(id) {
        var _this = this;
        this.$confirm('确定要删除选中学校吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
//          type: 'warning'
        }).then(function() {
          _this.schoolId = id;
          _this.deleteOne();
        }).catch(function() {
        })
      },*/
      //批量删除学校确认框
      /*deleteAllDialog() {
        var _this = this;
        this.$confirm('确定要删除选中学校吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
//          type: 'warning'
        }).then(function() {
          _this.deleteAll();
        }).catch(function() {
        })
      },*/
      //删除
      /*deleteOne() {
        var _this = this;
        var params = Object.assign({}, {schoolId: this.schoolId});
        this.$ajax('eduadmin/deleteOneSchool', params).then(function(res) {
          if ( res.code === '200' ) {
            _this.useAlert('success', res.message, function() {});
            var nowPageNumber = _this.setPageNumber(1);
            _this.isPageLoad = (_this.params.pageNumber === nowPageNumber);
            _this.params.pageNumber = nowPageNumber;
            _this.getList(_this.params);
          } else {
            _this.useAlert('error', res.message, function() {});
            _this.getList(_this.params);
          }
        }, function(err) {})
      },*/
      //批量删除
      /*deleteAll() {
        var _this = this;
        var count = this.multipleSelection.length;
        var params = {ids: this.multipleSelectionStr.toString()};
        this.$ajax('eduadmin/deleteManySchool', params).then(function(res) {
          if ( res.code === '200' ) {
            _this.useAlert('success', res.message, function() {});
            _this.multipleSelection = [];
            _this.multipleSelectionStr = '';
            var nowPageNumber = _this.setPageNumber(count);
            _this.isPageLoad = (_this.params.pageNumber === nowPageNumber);
            _this.params.pageNumber = nowPageNumber;
            _this.getList(_this.params);
          } else {
            _this.useAlert('error', res.message, function() {});
            _this.getList(_this.params);
          }
        }, function(err) {});
      },*/
      //设置状态
      setState(command) {
        var _this = this;
        var params = Object.assign({}, {schoolId: command.split('-')[0], state: command.split('-')[1]});
        this.$ajax('eduadmin/changeSchoolState', params).then(function(res) {
          if ( res.code === '200' ) {
            _this.useAlert('success', res.message, function() {});
            _this.getList(_this.params);
          } else {
            _this.useAlert('error', res.message, function() {});
          }
        }, function(err) {})
      },
      //跳页
      handleCurrentChange(val) {
        if ( this.isPageLoad && !this.isSearch ) {
          this.params.pageNumber = val;
          this.getList(this.params);
        } else {
          this.isPageLoad = true;
          this.isSearch = false;
        }
      }
    },
    beforeMount(){
      this.params.orgId = this.orgInfo.id;
      this.getList(this.params);
      this.getOrgList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #eduSchoolManagement { padding: 0 20px 20px; min-height: 400px; color: #666;}
  #eduSchoolManagement .white-color { color: #fff;}
  #eduSchoolManagement .link-text { color: #20a0ff; font-size: 14px; display: inline-block; margin-right: 6px;}
  #eduSchoolManagement .link-text:hover { color: #4db3ff; font-size: 14px;}
  #eduSchoolManagement .btns { border-bottom: 1px solid #ECEDEF; padding-bottom: 15px; padding-top: 15px; height: 36px;}
  #eduSchoolManagement .mt20 { margin-top: 20px;}
  #eduSchoolManagement .mt40 { margin-top: 40px;}
  #eduSchoolManagement .mb40 { margin-bottom: 40px;}
  #eduSchoolManagement .pagination-box { float: right;}
  #eduSchoolManagement .teacher-nodata { background: url("../../../resources/front/imgs/nodata.png") no-repeat center; text-align: center; padding-top: 100px; min-height: 300px;}
  #eduSchoolManagement .edu-box { position: relative;}
  #eduSchoolManagement .edu-text { padding:10px 0; color: #333;}
  #eduSchoolManagement .edu-title { padding: 10px 0; color: #333;}
  #eduSchoolManagement .edu-city-con { background: #F9F9F9; padding: 10px;}
  #eduSchoolManagement .edu-city-list { display: inline-block; margin-right: 20px; line-height: 1.6; font-size: 14px; cursor: pointer;}
  #eduSchoolManagement .color333 { color: #333;}
  #eduSchoolManagement .edu-active { color: #20a0ff!important;}
  #eduSchoolManagement .edu-area-con { padding: 10px;}
  #eduSchoolManagement .edu-area-list { display: inline-block; margin-right: 16px; line-height: 1.6; font-size: 12px; color: #858585; cursor: pointer;}
  #eduSchoolManagement .search { padding: 15px 20px 6px 75px; border: 1px solid #cedaea; border-top:3px solid #0d9ee9; margin-top: 18px; margin-bottom: 16px; position: relative;}
  #eduSchoolManagement .search-bg { position: absolute; left: 12px; top: -11px; z-index: 10; width: 56px; height: 61px; background: url("../../../resources/front/imgs/search-bg.png") no-repeat;}
  #eduSchoolManagement .search .el-button { width: 90px; height: 34px; line-height: 32px; text-align: center; padding: 0;}
  #eduSchoolManagement .more-btn { position: absolute; right: 118px; top: 23px; color: #20A0FF; font-size: 12px; cursor: pointer;}
  #eduSchoolManagement .more-btn:hover { color: #4db3ff}
  #eduSchoolManagement .more-btn span, #eduSchoolManagement .more-btn i { vertical-align: middle;}
  #eduSchoolManagement .arrow-down { transform: rotate(270deg);}
  #eduSchoolManagement .arrow-up { transform: rotate(90deg);}
  #eduSchoolManagement .more-con .el-checkbox__inner{ display: none;}
  #eduSchoolManagement .more-con .el-checkbox__label { padding-left: 0;}
  /*#eduSchoolManagement .more-con .el-checkbox { border: 1px solid #e5e5e5; padding: 0 10px; line-height: 30px; transition: 0.2s;}*/
  #eduSchoolManagement .more-con .el-checkbox { border: 1px solid #e5e5e5; padding: 0 8px; line-height: 30px; transition: 0.2s; min-width: 59px; text-align: center;}
  #eduSchoolManagement .more-con .el-checkbox:hover { border-color: #aaa;}
  #eduSchoolManagement .more-con .ischecked { border-color: #20A0FF!important; color: #20A0FF!important;}
  #eduSchoolManagement .more-con .el-checkbox+.el-checkbox { margin-left: 5px;}
  #eduSchoolManagement .more-con .el-form-item { margin-bottom: 10px;}
  #eduSchoolManagement table { border-collapse: separate;}
  #eduSchoolManagement .el-input__inner { border-radius: 0; height: 34px;}
  #eduSchoolManagement .el-table__header-wrapper { background-color: #a5defa;}
</style>
