<template>
    <div  id="schoolinfo" class="addeditinfo">
      <div class="main-content" v-loading.fullscreen.lock="fullscreenLoading">
        <div  class="btns">
          <a type="text" class="icon-back" @click="toEduSchoolMgr">返回</a>
        </div>


        <el-form :model="getForm" ref="getForm" label-width="100px" class="demo-ruleForm">
          <div class="blackDiv1">
            <div class="title btns">
              <i></i>
              <span>基础信息</span>
            </div>
            <el-form-item label="学校名称：" prop="name">
              <p>{{getForm.name || ''}}</p>
            </el-form-item>

            <el-form-item label="校归属地区：">
              <p>{{orgNameStr || ''}}</p>
            </el-form-item>

            <el-form-item label="学校类型：" prop="schoolType">
              {{convertSchoolType()}}
            </el-form-item>

            <el-form-item label="学制：" prop="codeType">
              <p v-if="getForm.codeType == '6-3' ">六三制</p>
              <p v-if="getForm.codeType == '5-4' ">五四制</p>
            </el-form-item>

            <el-form-item label="教学范围：" prop="region" class="region">
              <p>{{convertGrads()}}</p>
            </el-form-item>

            <el-form-item label="地理位置：" prop="position">
              <p v-if="getForm.position==1">中心城区</p>
              <p v-if="getForm.position==2">城乡结合</p>
              <p v-if="getForm.position==3">近郊</p>
              <p v-if="getForm.position==4">远郊</p>
             <!-- <p v-if="getForm.position==5">山区</p>-->
            </el-form-item>

            <el-form-item label="教师数量：" prop="teacherCount">
              <p>{{getForm.teacherCount}}&nbsp;人</p>
            </el-form-item>

            <el-form-item label="学生数量：" prop="studentCount">
              <p>{{getForm.studentCount}}&nbsp;人</p>
            </el-form-item>

            <el-form-item label="地址：" prop="address">
              <p>
                {{( getForm.orgInfoV3.provinceName || '')+' '+( getForm.orgInfoV3.cityName || '')+' '+( getForm.orgInfoV3.countyName || '')+' '+(getForm.address)}}
              </p>
            </el-form-item>

            <el-form-item label="描述：" prop="describe">
              <p>{{getForm.describe}}</p>
            </el-form-item>
          </div>

          <div class="blackDiv2">
            <div class="title btns title2">
              <i></i>
              <span>负责人信息</span>
            </div>
            <div class="noData" v-if="noData" >
              <p class="empty-text">暂无负责人信息</p>
            </div>
            <div class="tabs-body" v-else>
              <el-table

                :data="getlPrincipalInfoForm"
                border
                style="margin: 20px auto;">
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
                  prop="status"
                  label="状态"
                  >
                  <template scope="scope">
                    <p v-if="scope.row.status == 0">正常</p>
                    <p v-else>禁用</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>

          </div>
      </el-form>
      </div>
    </div>
</template>

<script>
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

  import VDistpicker from 'v-distpicker'
  export default {
    components: {
      VDistpicker
    },
    created(){
      this.getSchoolDetail(this.id); //获取学校基本信息
      this.getSchoolOrgUserList(this.id); //获取负责人信息列表
    },
    data() {
      return {
        noData:false,
        id: '', //学校id
        isFilterZS: false, //传递给后台的机构ID，是否过滤省直属以及市直属
        fullscreenLoading: true,// 全屏遮罩层
        userInfo: {},
        defaultMaxLevel: 0, //默认查询到的等级
        orgNameStr: '',
        grads: '',
        isIncludeGrad: false,
        selectedGrad: [],
        rules:'',
        loaded: false,
        indexStart: '',
        indexEnd: '',
        codeVal: '', //codeType默认值
        getForm: {
//          educationId: '', //机构ID
          name: '',        //学校名称
          schoolType: '',  //学校类型
          codeType: '',    //学制
          codeStart: '',   //教学开始
          codeEnd: '',      //教学结束
          position: '',   //地理位置
          orgId: '',       //区域ID
          address: '',     //详细地址
          note: '',         //描述
          orgInfoV3: {},
          nowIndex:-100
        },
        getlPrincipalInfoForm:[],
        pickerOptions0: {
          disabledDate(time) {
            // return time.getTime() < Date.now() - 8.64e7;
          }
        },
        currentIndex: '',
        dialogVisibleAdd: false,
        dialogVisibleEdit: false,
        formInline: {
          query: ''
        },
      }
    },
    beforeMount(){
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.defaultMaxLevel = this.userInfo.education.orgInfo.length;
    },
    methods: {
      //判断是否空对象
      isEmptyData(name){
        return name !== undefined && name !== null && name !== '' ? false : true;
      },
      //学校类型转换
      convertSchoolType(){
        let schoolTypeArr = ['','大学','高中','初中','完中','九年一贯制','小学','教学点','完小','职业高中(职高)','中等专业学校(中专)','技工学校(技校)','普通高等学校(体校、军校)','十二年一贯制'];
        return schoolTypeArr[this.getForm.schoolType || 0] || '';
      },
      //教学范围选中呈现
      convertGrads(){
        let gradStr = '';
        for(let i =0; i<this.grads.length; i++){
          let grad = this.grads[i];
          if(grad.checked == true){
            if(gradStr == ''){
              gradStr += (grad.name || '');
            }else{
              gradStr += '、'+(grad.name || '');
            }
          }
        }
        return gradStr;
      },
      //返回按钮
      toEduSchoolMgr(){
//        this.$router.replace('/eduSchoolManagement');
        this.$router.go(-1);
      },
      // 获取学校基本信息
      getSchoolDetail(id){
        let params={
          id: this.$route.params.id || '',//425120
        };
        var that = this;
        that.$ajax('/schadmin/getOneSchool',params)
          .then(res => {
            that.fullscreenLoading = false;
            if(res.code == 200){
              that.getForm = res.data;
              that.codeVal = that.getForm.codeType == '5-4' ? 2 : 1;

              that.isIncludeGrad = true;
              //处理区域呈现
              let selectOrgList = res.data.orgList;
              let orgProvinceName = this.userInfo.education.orgInfo[0].name || '';
              let cityName = that.defaultMaxLevel > 1 ? (this.userInfo.education.orgInfo[1].name  || '' ) : '';
              let countyName = that.defaultMaxLevel > 2 ? (this.userInfo.education.orgInfo[2].name || '') : '';
              orgProvinceName = selectOrgList[0] == null ? '' : (selectOrgList[0].name || '');
              cityName = selectOrgList[1] == null ? '' : (selectOrgList[1].name || '');
              countyName = selectOrgList[2] == null ? '' : (selectOrgList[2].name || '');
              /*if(that.defaultMaxLevel == 1){
              	//用户当前为省级地区
                that.orgNameStr = orgProvinceName+(selectOrgList[0].name || '')+(selectOrgList[1].name || '');
              }
              else if(that.defaultMaxLevel == 2){
              	//用户当前市级地区
                that.orgNameStr = orgProvinceName + cityName + (selectOrgList[0].name || '');
              }
              else if(that.defaultMaxLevel == 3){
              	//用户当前县级地区
                that.orgNameStr = orgProvinceName + cityName + countyName;
              }*/
              that.orgNameStr = (orgProvinceName||'')+cityName+countyName;
              that.changeSchoolType();
            }else{
              this.useAlert('error','系统查询失败，请稍后再试!',function () {});
            }
          });
      },
      //获取负责人信息列表
      getSchoolOrgUserList(id){
        let params={
          id:this.$route.params.id,//425120
        };
        var that = this
        that.$ajax('/schadmin/justShowSchadmin',params)
          .then(res => {

            that.getlPrincipalInfoForm = res.data;
            if(that.getlPrincipalInfoForm.length == 0){
              this.noData=true;
            }

          });
      },
      //教学范围-学校类型改变事件
      changeSchoolType: function() {
        this.changeSchooling();
      },
      //默认学制改变，教学范围选中控制
      defaultSetCodeCtrl(that){
        let codeStartDt = that.getForm.codeStart;
        let codeEndDt = that.getForm.codeEnd;
        console.log('codeStart：' + codeStartDt + ',codeEnd：' + codeEndDt);
        //如果codeStart和codeEnd不为空，那么默认的需要调整；
        that.getForm.codeStart = 1;
        that.indexStart = 0;
        if (that.getForm.codeType == '5-4') {
          //五四制
          that.grads[5].display = false;
          that.grads[9].display = true;
        }
        else {
          //六三制
          that.grads[5].display = true;
          that.grads[9].display = false;
        }
        // n  --五四制的时候n为5，六三制的时候n为9
        //--如果当前结束的codeEnd<=n，那么数组下标需要 -1往前推一位
        //--如果当前开始的codeStart<=n，那么数组下标需要 -1往前推一位
        //--如果当前结束的codeEnd>n，那么数组下标保持不变
        //--如果当前开始的codeStart>n，那么数组下标保持不变
        if (
          (codeEndDt <= 5 && that.codeVal == 2) ||
          (codeEndDt <= 9 && that.codeVal == 1)
        ) {
          that.indexEnd = Number(codeEndDt) - 1;
        }
        else {
          that.indexEnd = Number(codeEndDt);
        }
        if (
          (codeStartDt <= 5 && that.codeVal == 2) ||
          (codeStartDt <= 9 && that.codeVal == 1)
        ) {
          that.indexStart = Number(codeStartDt) - 1;
        }
        else {
          that.indexStart = Number(codeStartDt);
        }

        console.log('计算下标minIndex：'+that.indexStart+',下标maxIndex：'+that.indexEnd);
      },
      //教学范围-学制改变事件
      changeSchooling: function() {
        var that = this;
        that.grads = JSON.parse(JSON.stringify(grads_default));
        that.selectedGrad = [];
        if(!that.getForm.schoolType) {
          return;
        }
        //默认设定教学范围
        this.defaultSetCodeCtrl(that);
        //匹配下标选中与未选中状态
        for(var j = that.indexStart;j <= that.indexEnd;j++) {
          //抛除特殊的
          if(that.codeVal == 2 && j == 5){
            //五四制  --6年级下标ID=5刨除
            continue;
          }
          if(that.codeVal == 1 && j == 9){
            //六三制  --初四下标I=9刨除
            continue;
          }
          that.grads[j].checked = true;
          that.selectedGrad.push(j);
        }
      }
    }
  }
</script>
<style>
@import "../../../resources/front/css/common/adm-stu-tea-mgt.css";
  /*标题样式*/
  #schoolinfo .title{
    padding: 8px 0 8px 0;
    height: 34px;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 30px;
  }
  #schoolinfo .title i{
    margin-top:3px;
  }
  #schoolinfo .title>span{
    display: inline-block;
    vertical-align:middle;
    margin-left: 10px;
    font-size: 14px;
    color: #0d9ee9;
    position:relative;
    top:-11px;
  }
  #schoolinfo .blackDiv2 {
    border-bottom: none;
    margin-bottom: 20px;
  }
  #schoolinfo .tabs-body{
    clear: both;
    margin: 0 auto;
  }
  #schoolinfo .el-table th>.cell {
    text-align: center;
  }
  #schoolinfo .el-table .cell, .el-table th>div {
    text-align: center;
  }

  #schoolinfo .el-input__inner {
    width: 280px;
  }

  #schoolinfo .el-textarea__inner {
    height: 60px;
    width: 600px;
  }

  #schoolinfo .region span {
    display: inline-block;
    width: 50px;
    text-align: center;
    height: 40px;
    font-size: 14px;
    color: #fff;
    line-height: 40px;
    border: 1px solid #20a0ff;
    background: #97a8be;
    margin-left: 10px;
  }

  #schoolinfo .bluespan {
    background: #20a0ff;
  }


  #schoolinfo .grads li{list-style:none;float:left;margin-right:10px}
  #schoolinfo .grads label{border:1px solid lightblue;width:50px;text-align:center;display:inline-block;}
  #schoolinfo .grads li label.disabled{background:lightgray;color:#000;cursor:not-allowed;}
  #schoolinfo .grads li label.checked{background:lightblue;color:#fff;display: none;}
  #schoolinfo .blind{
    clip: rect(1px,1px,1px,1px);
    clip: rect(1px 1px 1px 1px);
    position: absolute;
}
  #schoolinfo .el-input__icon{
    left:100px;
  }
  #schoolinfo .el-icon-date{
    right:98px;
  }
  #schoolinfo .el-form-item {
    margin-bottom: 5px;
  }
  #schoolinfo  .el-form-item__label{
    background:url(/resources/front/imgs/dot.png) no-repeat;
    top:3px;
    left:10px;
    color:#333333;
  }
  #schoolinfo .el-form-item__content{
    color:#666;
  }

  #schoolinfo a, input, textarea, keygen, select, button{font-family:"微软雅黑";}
  #schoolinfo .el-input.is-disabled .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolinfo .el-input.is-disabled .el-input__inner::-moz-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolinfo .el-input.is-disabled .el-input__inner:-ms-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolinfo .el-input.is-disabled .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolinfo .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑"}
  #schoolinfo .el-input__inner::-moz-placeholder{color:#1f2d3d;}
  #schoolinfo .el-input__inner:-ms-input-placeholder{color:#1f2d3d;}
  #schoolinfo .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}

  /*table*/
  #schoolinfo .el-table th.el-table_1_column_3{
    border-right: 1px solid #a5defa;
  }
  #schoolinfo .el-form-item{margin-left: 120px;}
  #schoolinfo .el-dialog .el-form-item{margin-left: 0px;}
  #schoolinfo .tabs-body{margin: 0 90px;}
</style>
