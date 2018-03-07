<template>
  <div id="schoolbatch" v-loading.lock="formSubmited" element-loading-text="数据导入中...">
    <div class="ev-page-return">
      <router-link  :to="{ path:'/eduSchoolManagement' }" class=" icon-back">返回 </router-link>
    </div>
    <div class="ev-report-page-panel">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="批量导入" name="one">
          <el-form method="post" :action="baseURL+'schadmin/import/importScore'" enctype="multipart/form-data" id="importScoreForm">
          <ol>
            <li class="xiazai">
              <h3><i class="icon-download-File"></i>1、下载模板</h3>
              <p>点击下载导入模板&nbsp&nbsp&nbsp&nbsp&nbsp<a :href="baseURLPage+'downloads/学校信息模板.xls'" target="_blank"><el-button type="primary" class="download">下载</el-button></a></p>
            </li>
            <!--下属机构列表-->
            <li>
              <h3><i class="icon-lead-in-class"></i>2、校归属地区：</h3>
              <el-form-item label="" prop="orgInfo">
                <!-- <el-cascader
                   :options="orgListsData"
                   :change-on-select = "true"
                   :show-all-levels="false"
                   style="width:288px;"
                   v-model="educationIds"
                   :placeholder="userInfo.education.orgName" v-show="isSaveSchool == false"
                 ></el-cascader>-->
                <el-select v-model="selectedProvince" :placeholder="defaultProvince.name" @change="provinceChange" :disabled="defaultMaxLevel>=1" class="item-text" >
                  <el-option
                    v-for="item in province"
                    :label="item.name"
                    :value="item"
                    :key="item.id"
                  >
                  </el-option>
                </el-select>
                <el-select v-model="selectedCity" @change="cityChange" :placeholder="defaultCity.name" class="item-text" v-if="city.length !=0 || (defaultProvince.id  != '' && defaultProvince.id != null )" :disabled="defaultMaxLevel>=2" >
                  <!--<el-option value="省直属">省直属</el-option>-->
                  <el-option
                    v-for="item in city"
                    :label="item.name"
                    :value="item"
                    :key="item.id"
                  >
                  </el-option>
                </el-select>
                <el-select v-model="selectedCounty" @change="countyChange" :placeholder="defaultCounty.name" class="item-text"  v-if="county.length !=0">
                  <!-- <el-option value="市直属">市直属</el-option>-->
                  <el-option
                    v-for="item in county"
                    :label="item.name"
                    :value="item"
                    :key="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </li>
            <li class="file-box">
              <h3><i class="icon-import-file"></i>3、选择需要导入的EXCEL文件</h3>
              <el-form-item>
                <input type='text' name='textfield' id='textfield' class='txt'  v-model="fielname"/>
                <input type='button' class='select-btn' value='选择文件'/>
                <input
                        name="file"
                        class="upload-demo"
                        accept=".xls,.xlsx,.csv"
                        type="file"
                        v-on:change="fileChange($event)">
                <!-- multiple="multiple"-->
                <el-button type="primary" class="submit"  native-type="submit" v-on:click="submitForm($event)">导入</el-button>
              </el-form-item>
            </li>
          </ol>
        </el-form>
          <!--异常处理-->
          <div >
            <div v-show="isError" style="margin-top: 20px;min-height:500px;">
              <div   class="icon-cue" style="font-size: 14px;color:red;padding: 10px 0 10px 0;">  出错提示</div>
              <el-table
                :data="errorArr"
                border
                style="width: 100%" align="center">
                <el-table-column
                  prop="fileName"
                  label="问题文档"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="row"
                  label="问题行数"
                  width="200"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="出错人"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="content"
                  label="问题描述"
                  align="center">
                </el-table-column>
              </el-table>
            </div>
            <div id="error"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="操作指引" name="two">
          <!--说明-->
          <div  class="explain">
            <h3><i class="icon-case"></i>1、导入格式案例</h3>
            <div class="report-remark">
              学校信息模板
            </div>
            <img src="../../../resources/front/imgs/schoolinfomoban.png"/>
            <h3><i class="icon-attentions"></i>2、填写注意事项</h3>
            <p class="son-remark">1、“项目负责人”通常为分管教学副校长或教务主任。</p>
            <p class="son-remark">2、“项目负责人”将作为学校的登陆账号，此账号拥有上传参测校长、教师、学生基础信息、下载所有人员测评账号、查看教师和学生测评进度等功能，请务必准确填写。</p>
            <p class="son-remark">3、在填写下列信息时，请从备选项中选择符合自己情况的一项：</p>
            <p class="son-remark level-remark">a&nbsp;&nbsp;学校类型（小学、完小、初中、九年一贯制、高中、完中、十二年一贯制、职业高中（职高）、中等专业学校（中专））;</p>
            <p class="son-remark level-remark">b&nbsp;&nbsp;教学起始年级（一年级、二年级、三年级、四年级、五年级、六年级、七年级、八年级、九年级、高一、高二、高三）;</p>
            <p class="son-remark level-remark">c&nbsp;&nbsp;教学终止年级（一年级、二年级、三年级、四年级、五年级、六年级、七年级、八年级、九年级、高一、高二、高三）;</p>
            <p class="son-remark level-remark">d&nbsp;&nbsp;地理位置（中心城区、城乡结合部、近郊、远郊）;</p>
            <p class="son-remark level-remark">e&nbsp;&nbsp;学制（六三制、五四制）;</p>
            <p class="son-remark">4、标明橙色的项为必填项。</p>
            <h3><i class="icon-import-instructions"></i>3、导入说明</h3>
            <p class="son-remark">1、文件导入前请严格按照数据要求和格式要求填写。</p>
            <p class="son-remark">2、导入如果出现异常或数据问题，请修改后重新导入。</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  export default {
    data() {
      return {
        activeName: 'one',//切换默认显示内容
        isFilterZS: false, //传递给后台的机构ID，是否过滤省直属以及市直属
        fileList:[],
        selectDialogFlag: false,
        educationId:[],
        formData: {
          orgId: '',       //区域ID
        },
        orgList: [],
        formSubmited: false,
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
        //异常处理
        isError:false,
        errorArr:[],//储存批量导入的异常
        fielname:'',//选取的文件名称
        baseURLPage: ''
      };
    },
    beforeMount() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      //设定默认的 省、市、区/县内容
      this.defaultMaxLevel = this.userInfo.education.orgInfo.length;
      this.defaultProvince = this.userInfo.education.orgInfo[0] || {
          id: '',
          name: '',
          level: 1
        };
      this.defaultCity = this.userInfo.education.orgInfo[1] || {
          id: '',
          name: '',
          level: 2
        };
      this.defaultCounty = this.userInfo.education.orgInfo[2] || {
          id: '',
          name: '',
          level: 3
        };
    },
    mounted(){
      this.baseURLPage = this.baseURL;
      //获取区域树-省
      this.getAreaTree();
      if(this.defaultProvince.id != null && this.defaultProvince.id != ''){
        //拿取市
        this.provinceChange(this.defaultProvince);
      }
      if(this.defaultCity.id != null && this.defaultCity.id != ''){
        //拿取区
        this.cityChange(this.defaultCity);
      }
    },
    methods: {
      //tab切换
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //获取机构树
      getEduOrgTree(){
        //orgId 为区域ID；educationId为机构ID
        let educationId = this.userInfo.education.educationId || '';
        this.$ajax('/eduadmin/getEduChildrenTree?parentEducationId='+educationId)
          .then(res => {
            if(res.code == 200){
              var orgListsData = JSON.stringify(res.data);
              orgListsData = orgListsData.replace(/name/g, 'label').replace(/id/g, 'value').replace(/childrens/g, 'children').replace(/\,\"children\"\:\[\]/g, '');
              orgListsData = '[' + orgListsData + ']';
              console.log(orgListsData);
              this.orgListsData = JSON.parse(orgListsData);
              /*if(Object.prototype.toString.call(res.data) === "[object Array]"){
               this.orgListsData = res.data;
               }else{
               this.orgListsData = [res.data || {}];
               }*/
            }else{
              //其它非两百情况
              this.orgListsData = [{}];
            }
            console.log(this.orgListsData);
          }).catch(() => {
        });
      },

      // 获取获取区域树
      getAreaTree(){
        this.$ajax('/org/getTree')
          .then(res => {
            this.province = res.data;
          }).catch(() => {
        });
      },
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
      countyChange(item){
        this.selectedCounty = item;
      },
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
        console.log('存储----id='+orgTempObj.id+',name='+orgTempObj.name+',nameStr='+orgTempObj.orgNameStr);
        return orgTempObj;
      },
      fileChange: function(e) {
        if( this.orgId=='') {
          this.$alert('请选择学校所在区域', '提示', {
            confirmButtonText: '确定',
          });
        }

        let files = e.target.files || e.dataTransfer.files;
        this.fielname = files[0].name;
      },
      submitForm: function(e) {
        let orgTempObj=this.getSaveOrgId();
        console.log(orgTempObj.id)
        this.formData.orgId=orgTempObj.id
        console.log( this.formData.orgId)
        if( !this.formData.orgId ) {
          this.$alert('请选择学校所在区域', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }

        e.preventDefault()

        if(!this.fielname){
          this.useAlert('error','请选择导入文件',function () {});
          return;
        }
        let that = this
        let formData = new window.FormData(document.getElementById('importScoreForm'));
        that.formSubmited = true
         /*let formData = new window.FormData(document.getElementById('importScoreForm'));
         that.formData.educationId = this.educationId[this.educationId.length - 1]*/
        console.log( that.formData.orgId)
        $.ajax({
          url:this.staticResources+'eduadmin/import/importSchool?orgId='+that.formData.orgId,
          type:"post",
          data:formData,
          headers: {"Cookie": document.cookie},
          xhrFields: {withCredentials: true},
          processData:false,
          contentType:false,
          success:function(res){
            if(res.code == 200){
              that.formSubmited = false
//            console.log(data);
              that.$alert(res.message, '提示', {
                confirmButtonText: '确定',
              });
            }else {

              that.formSubmited = false
              that.isError=true;
              that.errorArr=res.data;
              that.useAlert('error', '导入失败，请稍后重试', function() {});
              that.$nextTick(function () {
                var anchor =$('#error');
                $("body,html").animate({
                  scrollTop: anchor.offset().top
                })

              })
              /*  let row=errorArr[0].row;
               //              let content=errorArr[0].content;
               //              console.log(row)
               //              console.log(content)
               let errorInfo=''
               errorArr.forEach((item,index) =>{
               errorInfo+=item.row + item.content
               });
               that.$alert(res.message+errorInfo, '提示', {
               confirmButtonText: '确定',

               });*/
            }
          },
          /*error:function(e){
           that.formSubmited = false
           alert("错误！！");
           }*/
        });
      }
    }

  }
</script>

<style>
  body {
    font-family: Helvetica, sans-serif;
  }
  /*返回按钮*/
  #schoolbatch .el-cascader {
    margin-left: 30px;
  }
  #schoolbatch a, input, textarea, keygen, select, button{font-family:"微软雅黑";}
  #schoolbatch .el-input.is-disabled .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolbatch .el-input.is-disabled .el-input__inner::-moz-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolbatch .el-input.is-disabled .el-input__inner:-ms-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolbatch .el-input.is-disabled .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolbatch .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑"}
  #schoolbatch .el-input__inner::-moz-placeholder{color:#1f2d3d;}
  #schoolbatch .el-input__inner:-ms-input-placeholder{color:#1f2d3d;}
  #schoolbatch .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}
</style>
