webpackJsonp([18],{538:function(n,e,t){t(739);var a=t(191)(t(615),t(805),null,null);n.exports=a.exports},565:function(n,e,t){n.exports={default:t(566),__esModule:!0}},566:function(n,e,t){var a=t(49),r=a.JSON||(a.JSON={stringify:JSON.stringify});n.exports=function(n){return r.stringify.apply(r,arguments)}},576:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{restaurants:[],national:""}},methods:{querySearch:function(n,e){var t=this.restaurants;e(n?t.filter(this.createFilter(n)):t)},createFilter:function(n){return function(e){return 0===e.value.indexOf(n.toLowerCase())}},loadAll:function(){return[{value:"阿昌族"},{value:"傈僳族"},{value:"水族"},{value:"白族"},{value:"高山族"},{value:"珞巴族"},{value:"塔吉克族"},{value:"保安族"},{value:"仡佬族"},{value:"满族"},{value:"塔塔尔族"},{value:"布朗族"},{value:"哈尼族"},{value:"毛南族"},{value:"土家族"},{value:"布依族"},{value:"哈萨克族"},{value:"门巴族"},{value:"土族"},{value:"朝鲜族"},{value:"汉族"},{value:"蒙古族"},{value:"佤族"},{value:"达斡尔族"},{value:"赫哲族"},{value:"苗族"},{value:"维吾尔族"},{value:"傣族"},{value:"回族"},{value:"仫佬族"},{value:"乌孜别克族"},{value:"基诺族"},{value:"纳西族"},{value:"锡伯族"},{value:"东乡族"},{value:"京族"},{value:"怒族"},{value:"瑶族"},{value:"侗族"},{value:"景颇族"},{value:"普米族"},{value:"彝族"},{value:"独龙族"},{value:"柯尔克孜族"},{value:"羌族"},{value:"裕固族"},{value:"俄罗斯族"},{value:"撒拉族"},{value:"藏族"},{value:"鄂伦春族"},{value:"黎族"},{value:"畲族"},{value:"壮族"},{value:"拉祜族"}]},handleSelect:function(n){console.log(n)}},mounted:function(){this.restaurants=this.loadAll()}}},583:function(n,e,t){var a=t(191)(t(576),t(584),null,null);n.exports=a.exports},584:function(n,e){n.exports={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("el-form-item",{staticClass:"demo-autocomplete",attrs:{label:"民族："}},[t("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":n.querySearch,placeholder:"请输入内容"},on:{select:n.handleSelect},model:{value:n.national,callback:function(e){n.national=e},expression:"national"}})],1)},staticRenderFns:[]}},615:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t(565),r=t.n(a),s=t(192),o=t.n(s),l=t(583),i=t.n(l);e.default={data:function(){return{options:this.nations,ducations:this.ducations,careers:this.careers,guardians:this.guardians,userInfo:"",gradeList:{},studentForm:{schoolId:"",classIndex:"",gradeIndex:"",sid:"",name:"",sex:"",nation:"",idCard:"",birthday:"",schoolYear:"",isOneChile:"",isZhuXiao:"",guardian:"",fatherDucation:"",fatherCareer:"",fatherPhone:"",motherDucation:"",motherCareer:"",motherPhone:""},studentForm2:"",isReturnPage:!1,isSavebtn:!0,studentresData:"",restaurants:[],nation:"",rules:{sid:[{required:!0,message:"请输入学籍号",trigger:"blur"},{pattern:/^[\S]{8,20}$/,message:"学籍号输入在8-20个非空字符！"}],name:[{required:!0,message:"姓名不能为空！",trigger:"blur"},{pattern:/^[\S]{2,40}$/,message:"姓名输入在2~40个字！"}],nation:[{required:!0,message:"民族不能为空！",trigger:"change"}],sex:[{required:!0,message:"性别不能为空！",trigger:"change"}],idCard:[{required:!1,message:"请输入身份证号",trigger:"blur"},{pattern:/^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9xX]))|((yt)\S{0,18})$/i,message:"身份证号格式输入错误！"}],fatherPhone:[{pattern:/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message:"电话格式输入错误！"}],motherPhone:[{pattern:/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message:"电话格式输入错误！"}]}}},mounted:function(){this.userInfo=JSON.parse(localStorage.getItem("userInfo"))},beforeCreate:function(){this.userInfo=JSON.parse(localStorage.getItem("userInfo"));var n=this;n.$ajax("/teacher/getGradeList",{schoolId:n.userInfo.schools.schoolId}).then(function(e){200==e.code&&e.data&&e.data.length&&(n.gradeList={},e.data.forEach(function(e,t){n.gradeList[e.index]||(n.gradeList[e.index]=e)}))})},methods:{remindSave:function(){var n=this;if(this.isReturnPage=!0,!this.searchIsOk)return void this.$router.go(-1);this.$confirm("你当前做了编辑操作，是否要保存？","提示",{confirmButtonText:"是",cancelButtonText:"否"}).then(function(){n.submitForm()}).catch(function(){n.$router.go(-1)})},submitForm:function(n){var e=this;this.isReturnPage=!0,""==this.studentForm.gradeIndex?this.$alert("请选择年级","标题名称",{confirmButtonText:"确定"}):""!=this.studentForm.gradeIndex&&""!=this.studentForm.classIndex||this.$alert("请选择年级班级","标题名称",{confirmButtonText:"确定"}),this.$refs.studentForm.validate(function(n){if(n){var t=e.studentForm.birthday;if("[object Date]"===Object.prototype.toString.call(t)){var a=t.getMonth()+1>9?t.getMonth()+1:"0"+(t.getMonth()+1),r=t.getDate()>9?t.getDate():"0"+t.getDate();t=t.getFullYear()+"-"+a+"-"+r}e.studentForm.birthday=t,e.studentForm.schoolYear="[object Date]"===Object.prototype.toString.call(e.studentForm.schoolYear)?e.studentForm.schoolYear.getFullYear():e.studentForm.schoolYear;var s=o()({},e.studentForm,{schoolId:e.userInfo.schools.schoolId}),l=e;e.$ajax("/teacher/saveOneStudent",s).then(function(n){200==n.code?(e.$refs.studentForm.resetFields(),e.setValue(),e.useAlert("success",n.message,function(){l.isSavebtn&&l.$router.go(-1)})):e.useAlert("error",n.message,function(){})})}else e.useAlert("error","缺少必填信息或格式错误，请填写完整",function(){})})},setValue:function(){this.studentForm2=_.cloneDeep(this.studentForm)}},watch:{studentForm:{handler:function(n,e){var t=this;console.log(r()(n)),console.log(r()(t.studentForm2)),this.searchIsOk=r()(n)!==r()(t.studentForm2),console.log(this.searchIsOk),this.setValue()},deep:!0}},components:{Minority:i.a},beforeRouteLeave:function(n,e,t){var a=this;this.isReturnPage?t():this.searchIsOk?this.$confirm("您当前做了编辑操作，是否需要保存？","提示",{confirmButtonText:"是",cancelButtonText:"否"}).then(function(){a.isSavebtn=!1,a.submitForm()}).catch(function(){t()}):t()}}},691:function(n,e,t){e=n.exports=t(523)(),e.push([n.i,"#addstudent .gradeClass{padding:0 30px 20px;border-bottom:12px solid #f5f5f5}#addstudent .gradeClass .el-form-item__label{padding:16px 12px 11px 0}#addstudent .gradeClass .el-radio-button{margin-left:10px;margin-top:5px;border-left:1px solid #bfcbd9}#addstudent .gradeClass .el-radio-button:first-child .el-radio-button__inner{border-left:none;border-radius:0}#addstudent .gradeClass .el-radio-button:last-child .el-radio-button__inner{border-radius:0}#addstudent .gradeClass .el-radio-button .el-radio-button__inner{display:inline-block;width:70px;padding:10px 8px}","",{version:3,sources:["E:/works/jiaowuzuixin/src/pages/front/schoolRollFiler/addstudens.vue"],names:[],mappings:"AAmYA,wBACE,oBAA0B,AAC1B,gCAAqC,CACtC,AACD,6CACE,wBAA0B,CAC3B,AACD,yCACE,iBAAkB,AAClB,eAAe,AACf,6BAA8B,CAC/B,AACD,6EACE,iBAAiB,AACjB,eAAgB,CACjB,AACD,4EACE,eAAgB,CACjB,AACD,iEACE,qBAAsB,AACtB,WAAW,AACX,gBAAkB,CACnB",file:"addstudens.vue",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*选择班级年级按钮*/\n#addstudent .gradeClass{\n  padding:0 30px  20px 30px;\n  border-bottom: 12px solid whitesmoke;\n}\n#addstudent .gradeClass .el-form-item__label{\n  padding: 16px 12px 11px 0;\n}\n#addstudent .gradeClass .el-radio-button{\n  margin-left: 10px;\n  margin-top:5px;\n  border-left:1px solid #bfcbd9;\n}\n#addstudent .gradeClass .el-radio-button:first-child .el-radio-button__inner{\n  border-left:none;\n  border-radius:0;\n}\n#addstudent .gradeClass .el-radio-button:last-child .el-radio-button__inner{\n  border-radius:0;\n}\n#addstudent .gradeClass .el-radio-button .el-radio-button__inner{\n  display: inline-block;\n  width:70px;\n  padding: 10px 8px;\n}\n"],sourceRoot:""}])},739:function(n,e,t){var a=t(691);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t(524)("c5eab2de",a,!0)},805:function(n,e){n.exports={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"addeditinfo",attrs:{id:"addstudent"}},[t("el-form",{ref:"studentForm",staticClass:"demo-studentForm",attrs:{model:n.studentForm,rules:n.rules,"label-width":"140px"}},[t("div",[t("div",{staticClass:"btns"},[t("a",{staticClass:" icon-back",attrs:{href:"javascript:;"},on:{click:n.remindSave}},[n._v("返回 ")]),n._v(" "),t("el-button",{staticClass:"white-color  el-button el-button--primary",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:n.submitForm}},[t("span",[n._v("保存")])])],1),n._v(" "),t("div",{staticClass:"gradeClass"},[t("div",{staticClass:"title title0"},[t("i"),t("span",[n._v("选择新添班级")])]),n._v(" "),t("el-form-item",{attrs:{label:"年级：",prop:"gradeIndex"}},[t("el-radio-group",{model:{value:n.studentForm.gradeIndex,callback:function(e){n.studentForm.gradeIndex=e},expression:"studentForm.gradeIndex"}},n._l(n.gradeList,function(e,a){return t("el-radio-button",{key:a,attrs:{label:e.index}},[n._v(n._s(e.name)+"\n\n            ")])}))],1),n._v(" "),t("el-form-item",{attrs:{label:"班级：",prop:"classIndex"}},[n.studentForm.gradeIndex?t("el-radio-group",{model:{value:n.studentForm.classIndex,callback:function(e){n.studentForm.classIndex=e},expression:"studentForm.classIndex"}},n._l(n.gradeList[n.studentForm.gradeIndex].classList,function(e,a){return t("el-radio-button",{key:a,attrs:{label:e.index}},[n._v("\n              "+n._s(e.name)+"\n\n            ")])})):n._e()],1)],1)]),n._v(" "),t("div",{staticClass:"blackDiv1"},[t("div",{staticClass:"title"},[t("i"),t("span",[n._v("学生信息")])]),n._v(" "),t("el-form-item",{attrs:{label:"学籍号：",prop:"sid"}},[t("el-input",{staticClass:"inputWidth",attrs:{maxlength:20},model:{value:n.studentForm.sid,callback:function(e){n.studentForm.sid="string"==typeof e?e.trim():e},expression:"studentForm.sid"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"姓名：",prop:"name"}},[t("el-input",{staticClass:"inputWidth",attrs:{maxlength:40},model:{value:n.studentForm.name,callback:function(e){n.studentForm.name="string"==typeof e?e.trim():e},expression:"studentForm.name"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"性别：",prop:"sex"}},[t("el-radio-group",{model:{value:n.studentForm.sex,callback:function(e){n.studentForm.sex=e},expression:"studentForm.sex"}},[t("el-radio",{attrs:{label:"1"}},[n._v("男")]),n._v(" "),t("el-radio",{attrs:{label:"2"}},[n._v("女")])],1)],1),n._v(" "),t("el-form-item",{attrs:{label:"民族：",prop:"nation"}},[t("el-select",{staticClass:"inputWidth",attrs:{filterable:"",placeholder:"请选择"},model:{value:n.studentForm.nation,callback:function(e){n.studentForm.nation=e},expression:"studentForm.nation"}},n._l(n.options,function(n){return t("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),t("el-form-item",{attrs:{label:"身份证号：",prop:"idCard"}},[t("el-input",{staticClass:"inputWidth",attrs:{maxlength:18},model:{value:n.studentForm.idCard,callback:function(e){n.studentForm.idCard="string"==typeof e?e.trim():e},expression:"studentForm.idCard"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"出生年月日：",prop:"birthday"}},[t("el-col",{attrs:{span:11}},[t("el-form-item",[t("el-date-picker",{staticStyle:{width:"652px"},attrs:{format:"yyyy-MM-dd",placeholder:"选择日期"},model:{value:n.studentForm.birthday,callback:function(e){n.studentForm.birthday=e},expression:"studentForm.birthday"}})],1)],1)],1),n._v(" "),t("el-form-item",{staticClass:"block",attrs:{label:"入学年份：",prop:"schoolYear"}},[t("el-date-picker",{staticStyle:{width:"652px"},attrs:{align:"right",type:"year",placeholder:"选择年"},model:{value:n.studentForm.schoolYear,callback:function(e){n.studentForm.schoolYear=e},expression:"studentForm.schoolYear"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"是否是独生子女：",prop:"isOneChile"}},[t("el-radio-group",{model:{value:n.studentForm.isOneChile,callback:function(e){n.studentForm.isOneChile=e},expression:"studentForm.isOneChile"}},[t("el-radio",{attrs:{label:"1"}},[n._v("是")]),n._v(" "),t("el-radio",{attrs:{label:"0"}},[n._v("否")])],1)],1),n._v(" "),t("el-form-item",{attrs:{label:"是否住校：",prop:"isZhuXiao"}},[t("el-radio-group",{model:{value:n.studentForm.isZhuXiao,callback:function(e){n.studentForm.isZhuXiao=e},expression:"studentForm.isZhuXiao"}},[t("el-radio",{attrs:{label:"1"}},[n._v("是")]),n._v(" "),t("el-radio",{attrs:{label:"0"}},[n._v("否")])],1)],1),n._v(" "),t("el-form-item",{attrs:{label:"监护人：",prop:"guardian"}},[t("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择监护人"},model:{value:n.studentForm.guardian,callback:function(e){n.studentForm.guardian=e},expression:"studentForm.guardian"}},n._l(n.guardians,function(n){return t("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1)],1),n._v(" "),t("div",{staticClass:"blackDiv2"},[t("div",{staticClass:"title title2"},[t("i"),t("span",[n._v("家庭信息")])]),n._v(" "),t("el-form-item",{staticClass:"inputWidth",attrs:{label:"父亲学历：",prop:"fatherDucation"}},[t("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择父亲学历"},model:{value:n.studentForm.fatherDucation,callback:function(e){n.studentForm.fatherDucation=e},expression:"studentForm.fatherDucation"}},n._l(n.ducations,function(n){return t("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),t("el-form-item",{attrs:{label:"父亲职业：",prop:"fatherCareer"}},[t("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择父亲职业"},model:{value:n.studentForm.fatherCareer,callback:function(e){n.studentForm.fatherCareer=e},expression:"studentForm.fatherCareer"}},n._l(n.careers,function(n){return t("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),t("el-form-item",{attrs:{label:"电话：",prop:"fatherPhone"}},[t("el-input",{staticClass:"inputWidth",attrs:{placeholder:"请填写父亲电话"},model:{value:n.studentForm.fatherPhone,callback:function(e){n.studentForm.fatherPhone="string"==typeof e?e.trim():e},expression:"studentForm.fatherPhone"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"母亲学历：",prop:"motherDucation"}},[t("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择母亲学历"},model:{value:n.studentForm.motherDucation,callback:function(e){n.studentForm.motherDucation=e},expression:"studentForm.motherDucation"}},n._l(n.ducations,function(n){return t("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),t("el-form-item",{attrs:{label:"母亲职业：",prop:"motherCareer"}},[t("el-select",{staticClass:"inputWidth",attrs:{placeholder:"请选择母亲职业"},model:{value:n.studentForm.motherCareer,callback:function(e){n.studentForm.motherCareer=e},expression:"studentForm.motherCareer"}},n._l(n.careers,function(n){return t("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),t("el-form-item",{attrs:{label:"电话：",prop:"motherPhone"}},[t("el-input",{staticClass:"inputWidth",attrs:{placeholder:"请填写母亲电话"},model:{value:n.studentForm.motherPhone,callback:function(e){n.studentForm.motherPhone="string"==typeof e?e.trim():e},expression:"studentForm.motherPhone"}})],1)],1)])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=18.bf2e9fcb08a1a02dfa8c.js.map