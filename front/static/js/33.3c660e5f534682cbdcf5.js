webpackJsonp([33],{539:function(e,a,t){t(720);var r=t(191)(t(616),t(786),null,null);e.exports=r.exports},565:function(e,a,t){e.exports={default:t(566),__esModule:!0}},566:function(e,a,t){var r=t(49),o=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},616:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t(565),o=t.n(r),l=t(192),n=t.n(l);a.default={data:function(){var e=/select|update|delete|truncate|join|union|exec|insert|drop|count|script|src|alert|window|document|location|>|<|%/i,a=function(a,t,r){null==t||""==t?r():t.length>200?r(new Error("最多可输入200个字！")):e.test(t)?r(new Error("输入中不能包含特殊字符！")):r()};return{options:this.nations,schoolType:this.schoolType,maxEducation:this.maxEducation,maxGetTheWay:this.maxGetTheWay,teacherInfoForm:{id:this.$route.params.id,name:"",sex:"",national:"",phone:"",idCard:"",schoolAge:"",education:"",graduatedFromSchool:"",schoolType:"",ifNormal:"",graduationOfYear:"",maxEducation:"",maxSeq:"",maxGraduatedFromSchool:"",maxSchoolType:"",maxIfNormal:"",maxGraduationOfYear:"",maxGetTheWay:"",jobTitle:"",educationLeader:"",classTeacher:"",privateTeacher:"",backboneTeacher:"",theLeader:"",fullOrNot:"",note:""},teacherInfoForm2:{},isReturnPage:!1,isSavebtn:!0,restaurants:[],nation:"",teacherInfoRules:{name:[{required:!0,message:"姓名不能为空！",trigger:"blur"},{pattern:/^[\S]{2,40}$/,message:"姓名输入在2~40个字！"}],national:[{required:!0,message:"民族不能为空！",trigger:"change"}],sex:[{required:!0,message:"性别不能为空！",trigger:"change"}],phone:[{required:!0,message:"手机号码不能为空！",trigger:"blur"},{pattern:/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message:"手机号码格式输入错误！"},{min:11,max:11,message:"手机号码输入为11位数字！",trigger:"blur"}],idCard:[{required:!1,message:"请输入身份证号",trigger:"blur"},{pattern:/^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9xX]))|((yt)\S{0,18})$/i,message:"身份证号格式输入错误！"}],schoolAge:[{required:!0,message:"教龄不能为空！",trigger:"change"},{pattern:/^\d{1,2}$/,message:"教龄输入为1~2位数字！"}],education:[{required:!0,message:"第一学历不能为空！",trigger:"change"}],graduatedFromSchool:[{pattern:/^[\S]{0,20}$/,message:"最多可输入20个字！"}],maxGraduatedFromSchool:[{pattern:/^[\S]{0,20}$/,message:"最多可输入20个字！"}],note:[{validator:a,trigger:"blur"}]}}},mounted:function(){this.userInfo=JSON.parse(localStorage.getItem("userInfo"))},methods:{remindSave:function(){var e=this;if(this.isReturnPage=!0,!this.searchIsOk)return void this.$router.go(-1);this.$confirm("你当前做了编辑操作，是否要保存？","提示",{confirmButtonText:"是",cancelButtonText:"否"}).then(function(){e.saveteacherInfoForm()}).catch(function(){e.$router.go(-1)})},saveteacherInfoForm:function(e){var a=this;this.$refs.teacherInfoForm.validate(function(e){if(e){a.teacherInfoForm.graduationOfYear="[object Date]"===Object.prototype.toString.call(a.teacherInfoForm.graduationOfYear)?a.teacherInfoForm.graduationOfYear.getFullYear():a.teacherInfoForm.graduationOfYear,a.teacherInfoForm.maxGraduationOfYear="[object Date]"===Object.prototype.toString.call(a.teacherInfoForm.graduationOfYear)?a.teacherInfoForm.graduationOfYear.getFullYear():a.teacherInfoForm.graduationOfYear;var t=n()({},a.teacherInfoForm,{isSchoolHeader:0},{schoolId:a.userInfo.schools.schoolId}),r=a;a.$ajax("/schadmin/saveOneTeacher?",t).then(function(e){200==e.code?(a.$refs.teacherInfoForm.resetFields(),a.setValue(),a.useAlert("success",e.message,function(){r.isSavebtn&&r.$router.go(-1)})):a.useAlert("error",e.message,function(){})})}else a.useAlert("error","验证未通过",function(){})})},setValue:function(){this.teacherInfoForm2=_.cloneDeep(this.teacherInfoForm)},resetForm:function(e){this.$refs[e].resetFields()}},watch:{teacherInfoForm:{handler:function(e,a){var t=this;console.log(o()(e)),console.log(o()(t.teacherInfoForm2)),this.searchIsOk=o()(e)!==o()(t.teacherInfoForm2),console.log(this.searchIsOk),this.setValue()},deep:!0}},beforeRouteLeave:function(e,a,t){var r=this;this.isReturnPage?t():this.searchIsOk?this.$confirm("您当前做了编辑操作，是否需要保存？","提示",{confirmButtonText:"是",cancelButtonText:"否"}).then(function(){r.isSavebtn=!1,r.saveteacherInfoForm()}).catch(function(){t()}):t()}}},672:function(e,a,t){a=e.exports=t(523)(),a.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"addteachers.vue",sourceRoot:""}])},720:function(e,a,t){var r=t(672);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t(524)("7c9cfcaa",r,!0)},786:function(e,a){e.exports={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"addeditinfo",attrs:{id:"addteacher "}},[t("div",{staticClass:"btns"},[t("a",{staticClass:" icon-back",attrs:{href:"javascript:;"},on:{click:e.remindSave}},[e._v("返回 ")]),e._v(" "),t("el-button",{staticClass:"white-color  el-button el-button--primary",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.saveteacherInfoForm}},[t("span",[e._v("保存")])])],1),e._v(" "),t("el-form",{ref:"teacherInfoForm",staticClass:"demo-ruleForm",attrs:{model:e.teacherInfoForm,rules:e.teacherInfoRules,"label-width":"200px"}},[t("div",{staticClass:"blackDiv1"},[t("div",{staticClass:"title"},[t("i"),t("span",[e._v("教师基本信息")])]),e._v(" "),t("el-form-item",{attrs:{label:"姓名：",prop:"name"}},[t("el-input",{staticClass:"inputWidth",attrs:{maxlength:40},model:{value:e.teacherInfoForm.name,callback:function(a){e.teacherInfoForm.name="string"==typeof a?a.trim():a},expression:"teacherInfoForm.name "}})],1),e._v(" "),t("el-form-item",{attrs:{label:"性别：",prop:"sex"}},[t("el-radio-group",{model:{value:e.teacherInfoForm.sex,callback:function(a){e.teacherInfoForm.sex=a},expression:"teacherInfoForm.sex"}},[t("el-radio",{attrs:{label:"1"}},[e._v("男")]),e._v(" "),t("el-radio",{attrs:{label:"2"}},[e._v("女")])],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"民族：",prop:"national"}},[t("el-select",{staticClass:"inputWidth",attrs:{filterable:"",placeholder:"请选择"},model:{value:e.teacherInfoForm.national,callback:function(a){e.teacherInfoForm.national=a},expression:"teacherInfoForm.national"}},e._l(e.options,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"手机号码：",prop:"phone"}},[t("el-input",{staticClass:"inputWidth",model:{value:e.teacherInfoForm.phone,callback:function(a){e.teacherInfoForm.phone="string"==typeof a?a.trim():a},expression:"teacherInfoForm.phone"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"身份证号：",prop:"idCard"}},[t("el-input",{staticClass:"inputWidth",attrs:{maxlength:18},model:{value:e.teacherInfoForm.idCard,callback:function(a){e.teacherInfoForm.idCard="string"==typeof a?a.trim():a},expression:"teacherInfoForm.idCard"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"教龄（年）：",prop:"schoolAge"}},[t("el-input",{staticClass:"inputWidth",attrs:{maxlength:2},model:{value:e.teacherInfoForm.schoolAge,callback:function(a){e.teacherInfoForm.schoolAge="string"==typeof a?a.trim():a},expression:"teacherInfoForm.schoolAge"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"第一学历：",prop:"education",required:""}},[t("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择第一学历",required:""},model:{value:e.teacherInfoForm.education,callback:function(a){e.teacherInfoForm.education=a},expression:"teacherInfoForm.education"}},e._l(e.maxEducation,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"毕业学校：",prop:"graduatedFromSchool"}},[t("el-input",{staticClass:"inputWidth",attrs:{maxlength:200},model:{value:e.teacherInfoForm.graduatedFromSchool,callback:function(a){e.teacherInfoForm.graduatedFromSchool="string"==typeof a?a.trim():a},expression:"teacherInfoForm.graduatedFromSchool"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"高校类别：",prop:"schoolType"}},[t("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择高校类别"},model:{value:e.teacherInfoForm.schoolType,callback:function(a){e.teacherInfoForm.schoolType=a},expression:"teacherInfoForm.schoolType"}},e._l(e.schoolType,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"是否为师范专业：",prop:"ifNormal"}},[t("el-radio-group",{model:{value:e.teacherInfoForm.ifNormal,callback:function(a){e.teacherInfoForm.ifNormal=a},expression:"teacherInfoForm.ifNormal"}},[t("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),t("el-radio",{attrs:{label:"0"}},[e._v("否")])],1)],1),e._v(" "),t("el-form-item",{staticClass:"block",attrs:{label:"毕业时间：",prop:"graduationOfYear"}},[t("el-date-picker",{staticStyle:{width:"652px"},attrs:{align:"right",type:"year",placeholder:"选择毕业时间"},model:{value:e.teacherInfoForm.graduationOfYear,callback:function(a){e.teacherInfoForm.graduationOfYear=a},expression:"teacherInfoForm.graduationOfYear"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"最高学历：",prop:"maxEducation"}},[t("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择最高学历"},model:{value:e.teacherInfoForm.maxEducation,callback:function(a){e.teacherInfoForm.maxEducation=a},expression:"teacherInfoForm.maxEducation"}},e._l(e.maxEducation,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"考取途径：",prop:"maxGetTheWay"}},[t("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择考取途径"},model:{value:e.teacherInfoForm.maxGetTheWay,callback:function(a){e.teacherInfoForm.maxGetTheWay=a},expression:"teacherInfoForm.maxGetTheWay"}},e._l(e.maxGetTheWay,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"毕业学校：",prop:"maxGraduatedFromSchool"}},[t("el-input",{staticClass:"inputWidth",attrs:{maxlength:200},model:{value:e.teacherInfoForm.maxGraduatedFromSchool,callback:function(a){e.teacherInfoForm.maxGraduatedFromSchool="string"==typeof a?a.trim():a},expression:"teacherInfoForm.maxGraduatedFromSchool"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"是否为师范专业：",prop:"maxIfNormal"}},[t("el-radio-group",{model:{value:e.teacherInfoForm.maxIfNormal,callback:function(a){e.teacherInfoForm.maxIfNormal=a},expression:"teacherInfoForm.maxIfNormal"}},[t("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),t("el-radio",{attrs:{label:"0"}},[e._v("否")])],1)],1),e._v(" "),t("el-form-item",{staticClass:"block",attrs:{label:"毕业时间：",prop:"maxGraduationOfYear"}},[t("el-date-picker",{staticStyle:{width:"652px"},attrs:{align:"right",type:"year",placeholder:"请选择毕业时间"},model:{value:e.teacherInfoForm.maxGraduationOfYear,callback:function(a){e.teacherInfoForm.maxGraduationOfYear=a},expression:"teacherInfoForm.maxGraduationOfYear"}})],1)],1),e._v(" "),t("div",{staticClass:"blackDiv2"},[t("div",{staticClass:"title title2"},[t("i"),t("span",[e._v("教师任教信息")])]),e._v(" "),t("el-form-item",{attrs:{label:"职称：",prop:"jobTitle"}},[t("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择职称"},model:{value:e.teacherInfoForm.jobTitle,callback:function(a){e.teacherInfoForm.jobTitle=a},expression:"teacherInfoForm.jobTitle"}},[t("el-option",{attrs:{label:"正高级",value:"正高级"}}),e._v(" "),t("el-option",{attrs:{label:"高级",value:"高级"}}),e._v(" "),t("el-option",{attrs:{label:"一级",value:"一级"}}),e._v(" "),t("el-option",{attrs:{label:"二级",value:"二级"}}),e._v(" "),t("el-option",{attrs:{label:"三级",value:"三级"}}),e._v(" "),t("el-option",{attrs:{label:"无",value:"无"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"是否为教务主任：",prop:"educationLeader"}},[t("el-radio-group",{model:{value:e.teacherInfoForm.educationLeader,callback:function(a){e.teacherInfoForm.educationLeader=a},expression:"teacherInfoForm.educationLeader"}},[t("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),t("el-radio",{attrs:{label:"0"}},[e._v("否")])],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"是否为年级主任/组长：",prop:"classTeacher"}},[t("el-radio-group",{model:{value:e.teacherInfoForm.classTeacher,callback:function(a){e.teacherInfoForm.classTeacher=a},expression:"teacherInfoForm.classTeacher"}},[t("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),t("el-radio",{attrs:{label:"0"}},[e._v("否")])],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"民办教师：",prop:"privateTeacher"}},[t("el-radio-group",{model:{value:e.teacherInfoForm.privateTeacher,callback:function(a){e.teacherInfoForm.privateTeacher=a},expression:"teacherInfoForm.privateTeacher"}},[t("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),t("el-radio",{attrs:{label:"0"}},[e._v("否")])],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"骨干教师：",prop:"backboneTeacher"}},[t("el-radio-group",{model:{value:e.teacherInfoForm.backboneTeacher,callback:function(a){e.teacherInfoForm.backboneTeacher=a},expression:"teacherInfoForm.backboneTeacher"}},[t("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),t("el-radio",{attrs:{label:"0"}},[e._v("否")])],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"学科带头人：",prop:"theLeader"}},[t("el-radio-group",{model:{value:e.teacherInfoForm.theLeader,callback:function(a){e.teacherInfoForm.theLeader=a},expression:"teacherInfoForm.theLeader"}},[t("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),t("el-radio",{attrs:{label:"0"}},[e._v("否")])],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"专、兼职教研员：",prop:"fullOrNot"}},[t("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择专、兼职教研员"},model:{value:e.teacherInfoForm.fullOrNot,callback:function(a){e.teacherInfoForm.fullOrNot=a},expression:"teacherInfoForm.fullOrNot"}},[t("el-option",{attrs:{label:"专职",value:"专职"}}),e._v(" "),t("el-option",{attrs:{label:"兼职",value:"兼职"}}),e._v(" "),t("el-option",{attrs:{label:"否",value:"否"}})],1)],1),e._v(" "),t("el-form-item",{staticClass:"note",attrs:{label:"近三年获奖或发表文章情况：（按照奖项、获奖时间、获奖级别、获奖内容顺序填写）",prop:"note"}},[t("el-input",{staticClass:"item-text",staticStyle:{width:"652px"},attrs:{type:"textarea",maxlength:200},model:{value:e.teacherInfoForm.note,callback:function(a){e.teacherInfoForm.note="string"==typeof a?a.trim():a},expression:"teacherInfoForm.note"}})],1)],1)])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=33.3c660e5f534682cbdcf5.js.map