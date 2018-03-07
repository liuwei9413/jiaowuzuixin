webpackJsonp([17],{559:function(e,t,a){a(743);var r=a(191)(a(639),a(809),null,null);e.exports=r.exports},565:function(e,t,a){e.exports={default:a(566),__esModule:!0}},566:function(e,t,a){var r=a(49),s=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return s.stringify.apply(s,arguments)}},576:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{restaurants:[],national:""}},methods:{querySearch:function(e,t){var a=this.restaurants;t(e?a.filter(this.createFilter(e)):a)},createFilter:function(e){return function(t){return 0===t.value.indexOf(e.toLowerCase())}},loadAll:function(){return[{value:"阿昌族"},{value:"傈僳族"},{value:"水族"},{value:"白族"},{value:"高山族"},{value:"珞巴族"},{value:"塔吉克族"},{value:"保安族"},{value:"仡佬族"},{value:"满族"},{value:"塔塔尔族"},{value:"布朗族"},{value:"哈尼族"},{value:"毛南族"},{value:"土家族"},{value:"布依族"},{value:"哈萨克族"},{value:"门巴族"},{value:"土族"},{value:"朝鲜族"},{value:"汉族"},{value:"蒙古族"},{value:"佤族"},{value:"达斡尔族"},{value:"赫哲族"},{value:"苗族"},{value:"维吾尔族"},{value:"傣族"},{value:"回族"},{value:"仫佬族"},{value:"乌孜别克族"},{value:"基诺族"},{value:"纳西族"},{value:"锡伯族"},{value:"东乡族"},{value:"京族"},{value:"怒族"},{value:"瑶族"},{value:"侗族"},{value:"景颇族"},{value:"普米族"},{value:"彝族"},{value:"独龙族"},{value:"柯尔克孜族"},{value:"羌族"},{value:"裕固族"},{value:"俄罗斯族"},{value:"撒拉族"},{value:"藏族"},{value:"鄂伦春族"},{value:"黎族"},{value:"畲族"},{value:"壮族"},{value:"拉祜族"}]},handleSelect:function(e){console.log(e)}},mounted:function(){this.restaurants=this.loadAll()}}},583:function(e,t,a){var r=a(191)(a(576),a(584),null,null);e.exports=r.exports},584:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form-item",{staticClass:"demo-autocomplete",attrs:{label:"民族："}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,placeholder:"请输入内容"},on:{select:e.handleSelect},model:{value:e.national,callback:function(t){e.national=t},expression:"national"}})],1)},staticRenderFns:[]}},639:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(565),s=a.n(r),o=a(192),l=a.n(o),n=a(583),i=a.n(n);t.default={data:function(){return{options:this.nations,ducations:this.ducations,careers:this.careers,guardians:this.guardians,userInfo:"",gradeList:{},studentForm:{schoolId:"",sid:"",name:"",sex:"",nation:"",idCard:"",birthday:"",schoolYear:"",isOneChile:"",isZhuXiao:"",guardian:"",fatherDucation:"",fatherCareer:"",fatherPhone:"",motherDucation:"",motherCareer:"",motherPhone:""},studentresData:"",studentForm2:"",isReturnPage:!1,isSavebtn:!0,restaurants:[],nation:"",rules:{sid:[{required:!0,message:"请输入19位学籍号",trigger:"change"},{pattern:/^[\S]{8,20}$/,message:"学籍号输入在8-20个非空字符！"}],name:[{required:!0,message:"请输入姓名",trigger:"change"},{pattern:/^[\S]{1,40}$/,message:"用户名只能为1-40个字符"}],nation:[{required:!0,message:"请输入民族",trigger:"change"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}],idCard:[{required:!1,message:"请输入身份证号",trigger:"blur"},{pattern:/^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9xX]))|((yt)\S{0,18})$/i,message:"身份证号格式输入错误！"}],fatherPhone:[{pattern:/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message:"请输入正确的电话号码"}],motherPhone:[{pattern:/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message:"请输入正确的电话号码"}]},classId:""}},mounted:function(){this.userInfo=JSON.parse(localStorage.getItem("userInfo")),this.classId=this.$route.query.classId},beforeCreate:function(){this.userInfo=JSON.parse(localStorage.getItem("userInfo"));var e=this;e.$ajax("/teacher/getGradeList",{schoolId:e.userInfo.schools.schoolId}).then(function(t){200==t.code&&t.data&&t.data.length&&(e.gradeList={},t.data.forEach(function(t,a){e.gradeList[t.index]||(e.gradeList[t.index]=t)}))})},methods:{remindSave:function(){var e=this;if(this.isReturnPage=!0,!this.searchIsOk)return void this.$router.go(-1);this.$confirm("你当前做了编辑操作，是否要保存？","提示",{confirmButtonText:"是",cancelButtonText:"否"}).then(function(){e.submitForm()}).catch(function(){e.$router.go(-1)})},submitForm:function(e){var t=this;console.log(this.classId),this.$refs.studentForm.validate(function(e){if(e){var a=t.studentForm.birthday;if("[object Date]"===Object.prototype.toString.call(a)){var r=a.getMonth()+1>9?a.getMonth()+1:"0"+(a.getMonth()+1),s=a.getDate()>9?a.getDate():"0"+a.getDate();a=a.getFullYear()+"-"+r+"-"+s}t.studentForm.birthday=a,t.studentForm.schoolYear="[object Date]"===Object.prototype.toString.call(t.studentForm.schoolYear)?t.studentForm.schoolYear.getFullYear():t.studentForm.schoolYear,console.log(t.classId);var o=l()({},t.studentForm,{schoolId:t.userInfo.schools.schoolId},{classIndex:t.classId});console.log(o);var n=t;t.$ajax("/teacher/saveOneStudent",o).then(function(e){200==e.code?(t.$refs.studentForm.resetFields(),t.setValue(),t.useAlert("success",e.message,function(){n.isSavebtn&&n.$router.go(-1)})):t.useAlert("error",e.message,function(){})})}else t.useAlert("error","缺少必填信息或格式错误，请填写完整",function(){})})},setValue:function(){this.studentForm2=_.cloneDeep(this.studentForm)},resetForm:function(e){this.$refs[e].resetFields()}},watch:{studentForm:{handler:function(e,t){var a=this;console.log(s()(e)),console.log(s()(a.studentForm2)),this.searchIsOk=s()(e)!==s()(a.studentForm2),console.log(this.searchIsOk),this.setValue()},deep:!0}},beforeRouteLeave:function(e,t,a){var r=this;this.isReturnPage?a():this.searchIsOk?this.$confirm("您当前做了编辑操作，是否需要保存？","提示",{confirmButtonText:"是",cancelButtonText:"否"}).then(function(){r.isSavebtn=!1,r.submitForm(),a()}).catch(function(){a()}):a()},components:{Minority:i.a}}},695:function(e,t,a){t=e.exports=a(523)(),t.push([e.i,"#addstudent .text-left{font-size:14px;color:#666}","",{version:3,sources:["E:/works/jiaowuzuixin/src/pages/front/teacher/addstudens.vue"],names:[],mappings:"AACA,uBACE,eAAgB,AAChB,UAAe,CAChB",file:"addstudens.vue",sourcesContent:["\n#addstudent .text-left {\n  font-size: 14px;\n  color: #666666;\n}\n"],sourceRoot:""}])},743:function(e,t,a){var r=a(695);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(524)("47256c76",r,!0)},809:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"addeditinfo",attrs:{id:"addstudent"}},[a("div",{staticClass:"btns"},[a("a",{staticClass:" icon-back",attrs:{href:"javascript:;"},on:{click:e.remindSave}},[e._v("返回 ")]),e._v(" "),a("el-button",{staticClass:"white-color el-button el-button--primary",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.submitForm}},[a("span",[e._v("保存")])])],1),e._v(" "),a("el-form",{ref:"studentForm",staticClass:"demo-studentForm",attrs:{model:e.studentForm,rules:e.rules,"label-width":"124px"}},[a("div",{staticClass:"blackDiv1"},[a("div",{staticClass:"title"},[a("i"),a("span",[e._v("学生信息")])]),e._v(" "),a("el-form-item",{attrs:{label:"学籍号：",prop:"sid"}},[a("el-input",{staticClass:"inputWidth",attrs:{maxlength:20},model:{value:e.studentForm.sid,callback:function(t){e.studentForm.sid=t},expression:"studentForm.sid"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名：",prop:"name"}},[a("el-input",{staticClass:"inputWidth",attrs:{maxlength:40},model:{value:e.studentForm.name,callback:function(t){e.studentForm.name=t},expression:"studentForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别：",prop:"sex"}},[a("el-radio-group",{model:{value:e.studentForm.sex,callback:function(t){e.studentForm.sex=t},expression:"studentForm.sex"}},[a("el-radio",{attrs:{label:"1"}},[e._v("男")]),e._v(" "),a("el-radio",{attrs:{label:"2"}},[e._v("女")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"民族：",prop:"nation"}},[a("el-select",{staticClass:"inputWidth",attrs:{filterable:"",placeholder:"请选择"},model:{value:e.studentForm.nation,callback:function(t){e.studentForm.nation=t},expression:"studentForm.nation"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"身份证号：",prop:"idCard"}},[a("el-input",{staticClass:"inputWidth",attrs:{maxlength:18},model:{value:e.studentForm.idCard,callback:function(t){e.studentForm.idCard=t},expression:"studentForm.idCard"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"出生年月日：",prop:"birthday"}},[a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"652px"},attrs:{type:"date",placeholder:"选择日期"},model:{value:e.studentForm.birthday,callback:function(t){e.studentForm.birthday=t},expression:"studentForm.birthday"}})],1)],1),e._v(" "),a("el-form-item",{staticClass:"block",attrs:{label:"入学年份：",prop:"schoolYear"}},[a("el-date-picker",{staticStyle:{width:"652px"},attrs:{align:"right",type:"year",placeholder:"选择年"},model:{value:e.studentForm.schoolYear,callback:function(t){e.studentForm.schoolYear=t},expression:"studentForm.schoolYear"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否是独生子女：",prop:"isOneChile"}},[a("el-radio-group",{model:{value:e.studentForm.isOneChile,callback:function(t){e.studentForm.isOneChile=t},expression:"studentForm.isOneChile"}},[a("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("否")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"是否住校：",prop:"isZhuXiao"}},[a("el-radio-group",{model:{value:e.studentForm.isZhuXiao,callback:function(t){e.studentForm.isZhuXiao=t},expression:"studentForm.isZhuXiao"}},[a("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("否")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"监护人：",prop:"guardian"}},[a("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择监护人"},model:{value:e.studentForm.guardian,callback:function(t){e.studentForm.guardian=t},expression:"studentForm.guardian"}},e._l(e.guardians,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("div",{staticClass:"blackDiv2"},[a("div",{staticClass:"title title2"},[a("i"),a("span",[e._v("家庭信息")])]),e._v(" "),a("el-form-item",{attrs:{label:"父亲学历：",prop:"fatherDucation"}},[a("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择父亲学历"},model:{value:e.studentForm.fatherDucation,callback:function(t){e.studentForm.fatherDucation=t},expression:"studentForm.fatherDucation"}},e._l(e.ducations,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"父亲职业：",prop:"fatherCareer"}},[a("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择父亲职业"},model:{value:e.studentForm.fatherCareer,callback:function(t){e.studentForm.fatherCareer=t},expression:"studentForm.fatherCareer"}},e._l(e.careers,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"电话：",prop:"fatherPhone"}},[a("el-input",{staticClass:"inputWidth",attrs:{placeholder:"请填写父亲电话"},model:{value:e.studentForm.fatherPhone,callback:function(t){e.studentForm.fatherPhone=t},expression:"studentForm.fatherPhone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"母亲学历：",prop:"motherDucation"}},[a("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择母亲学历"},model:{value:e.studentForm.motherDucation,callback:function(t){e.studentForm.motherDucation=t},expression:"studentForm.motherDucation"}},e._l(e.ducations,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"母亲职业：",prop:"motherCareer"}},[a("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择母亲职业"},model:{value:e.studentForm.motherCareer,callback:function(t){e.studentForm.motherCareer=t},expression:"studentForm.motherCareer"}},e._l(e.careers,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"电话：",prop:"motherPhone"}},[a("el-input",{staticClass:"inputWidth",attrs:{placeholder:"请填写母亲电话"},model:{value:e.studentForm.motherPhone,callback:function(t){e.studentForm.motherPhone=t},expression:"studentForm.motherPhone"}})],1)],1)])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=17.7576415b5be24a41d9d8.js.map