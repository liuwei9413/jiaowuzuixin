webpackJsonp([40],{550:function(e,t,a){a(742);var s=a(191)(a(627),a(808),null,null);e.exports=s.exports},595:function(e,t,a){e.exports=a.p+"static/img/teacherinfomoban.0b14072.png"},627:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=(a(13),a(193)),r=a.n(s);t.default={data:function(){return{activeName:"one",fileList:[],formData:"",formSubmited:!1,textfiel:"",fielname:"",isError:!1,errorArr:[],baseURLPage:""}},beforeCreate:function(){},mounted:function(){this.baseURLPage=this.baseURL,this.userInfo=JSON.parse(localStorage.getItem("userInfo")),console.log(this.userInfo.schools.schoolId)},methods:{handleClick:function(e,t){console.log(e,t)},fileChange:function(e){var t=e.target.files||e.dataTransfer.files;this.fielname=t[0].name},submitForm:function(e){if(e.preventDefault(),!this.fielname)return void this.useAlert("error","请选择导入文件",function(){});var t=this;t.formSubmited=!0;var a=new window.FormData(document.getElementById("importScoreForm"));r.a.ajax({url:this.staticResources+"/schoolProvider/importTeacher?type=headmaster&schoolId="+t.userInfo.schools.schoolId,type:"post",data:a,xhrFields:{withCredentials:!0},dataType:"json",processData:!1,contentType:!1,success:function(e){200==e.code||400==e.code?(t.formSubmited=!1,t.$alert(e.message,"提示",{confirmButtonText:"确定"})):(t.formSubmited=!1,t.isError=!0,t.errorArr=e.data,t.useAlert("error","导入失败，请稍后重试",function(){}),t.$nextTick(function(){var e=r()("#error");r()("body,html").animate({scrollTop:e.offset().top})}))},error:function(e){if(t.formSubmited=!1,500==e.code){t.formSubmited=!1;var a=e.data;console.log(a);var s="";a.forEach(function(e,t){s+=e.row+e.content}),t.$alert(e.message+s,"提示",{confirmButtonText:"确定"})}}})}}}},694:function(e,t,a){t=e.exports=a(523)(),t.push([e.i,"#schoolRollleaderbatch .dialog-footer{text-align:center}","",{version:3,sources:["E:/works/jiaowuzuixin/src/pages/front/schoolRollFiler/schoolRollleaderbatch.vue"],names:[],mappings:"AACA,sCACE,iBAAmB,CACpB",file:"schoolRollleaderbatch.vue",sourcesContent:["\n#schoolRollleaderbatch .dialog-footer{\n  text-align: center;\n}\n"],sourceRoot:""}])},742:function(e,t,a){var s=a(694);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a(524)("4a91c8ac",s,!0)},808:function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"loading",rawName:"v-loading.lock",value:e.formSubmited,expression:"formSubmited",modifiers:{lock:!0}}],attrs:{id:"schoolRollleaderbatch","element-loading-text":"数据导入中..."}},[s("div",{staticClass:"ev-page-return"},[s("router-link",{staticClass:" icon-back",attrs:{to:{path:"/leaderManagement"}}},[e._v("返回 ")])],1),e._v(" "),s("div",{staticClass:"ev-report-page-panel"},[s("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[s("el-tab-pane",{attrs:{label:"批量导入",name:"one"}},[s("el-form",{attrs:{method:"post",action:"/schadmin/import/importScore",enctype:"multipart/form-data",id:"importScoreForm"}},[s("ol",[s("li",{staticClass:"xiazai"},[s("h3",[s("i",{staticClass:"icon-download-File"}),e._v("1、下载模板")]),e._v(" "),s("p",{staticStyle:{"margin-top":"15px","margin-left":"36px"}},[e._v("点击下载导入模板   "),s("a",{attrs:{href:e.baseURLPage+"downloads/参测校长基本信息表.xls",target:"_blank"}},[s("el-button",{staticClass:"download",attrs:{type:"primary"}},[e._v("下载")])],1)])]),e._v(" "),s("li",{staticClass:"file-box"},[s("h3",[s("i",{staticClass:"icon-import-file"}),e._v("2、选择需要导入的EXCEL文件")]),e._v(" "),s("el-form-item",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.fielname,expression:"fielname"}],staticClass:"txt",attrs:{type:"text",name:"textfield",id:"textfield"},domProps:{value:e.fielname},on:{input:function(t){t.target.composing||(e.fielname=t.target.value)}}}),e._v(" "),s("input",{staticClass:"select-btn",attrs:{type:"button",value:"选择文件"}}),e._v(" "),s("input",{staticClass:"upload-demo",attrs:{name:"file",accept:".xls,.xlsx,.csv",type:"file"},on:{change:function(t){e.fileChange(t)}}}),e._v(" "),s("el-button",{staticClass:"submit",attrs:{type:"primary","native-type":"submit"},on:{click:function(t){e.submitForm(t)}}},[e._v(" 导入")])],1)],1)])]),e._v(" "),s("div",[s("div",{directives:[{name:"show",rawName:"v-show",value:e.isError,expression:"isError"}],staticStyle:{"margin-top":"20px","min-height":"500px"}},[s("div",{staticClass:"icon-cue",staticStyle:{"font-size":"14px",color:"red",padding:"10px 0 10px 0"}},[e._v("  出错提示")]),e._v(" "),s("el-table",{staticStyle:{width:"100%"},attrs:{data:e.errorArr,border:"",align:"center"}},[s("el-table-column",{attrs:{prop:"fileName",label:"问题文档",width:"180",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{prop:"row",label:"问题行数",width:"200",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{prop:"name",label:"出错人",width:"180",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{prop:"content",label:"问题描述",align:"center"}})],1)],1),e._v(" "),s("div",{attrs:{id:"error"}})])],1),e._v(" "),s("el-tab-pane",{attrs:{label:"操作指引",name:"two"}},[s("div",{staticClass:"explain"},[s("h3",[s("i",{staticClass:"icon-case"}),e._v("1、导入格式案例")]),e._v(" "),s("div",{staticClass:"report-remark"},[e._v("\n            参测校长基本信息表\n          ")]),e._v(" "),s("img",{attrs:{src:a(595)}}),e._v(" "),s("h3",[s("i",{staticClass:"icon-attentions"}),e._v("2、填写注意事项")]),e._v(" "),s("p",{staticClass:"son-remark"},[e._v("1、标明橙色的项为必填项。")]),e._v(" "),s("p",{staticClass:"son-remark"},[e._v("2、在“职务”一栏中，若填“正校长”或者“教学副校长”则在随后一栏中写明相应的“担任校长/副校长总年限”“现任校长/副校长年限”。")]),e._v(" "),s("p",{staticClass:"son-remark"},[e._v("3、在填写下列信息时，请从备选项中选择符合自己情况的一项：")]),e._v(" "),s("p",{staticClass:"son-remark level-remark"},[e._v("a  第一学历与最高学历（高中、中专、大专、本科、硕士及以上、其它）：")]),e._v(" "),s("p",{staticClass:"son-remark level-remark"},[e._v("b  高校类别（本科提前批次、本科第一批次、本科第二批次、本科第三批次、专科、其它）")]),e._v(" "),s("p",{staticClass:"son-remark level-remark"},[e._v("c  考取途径（统招、自考、成招、专升本、在职、其它）")]),e._v(" "),s("p",{staticClass:"son-remark level-remark"},[e._v("d  职称（正高级、高级、一级、二级、三级、无）")]),e._v(" "),s("p",{staticClass:"son-remark level-remark"},[e._v("e  专、兼职教研员（专职、兼职、否）")]),e._v(" "),s("p",{staticClass:"son-remark"},[e._v("4、请严格按照示例格式填写基础信息。")]),e._v(" "),s("h3",[s("i",{staticClass:"icon-import-instructions"}),e._v("3、导入说明")]),e._v(" "),s("p",{staticClass:"son-remark"},[e._v("1、文件导入前请严格按照数据要求和格式要求填写。")]),e._v(" "),s("p",{staticClass:"son-remark"},[e._v("2、导入如果出现异常或数据问题，请修改后重新导入。")])])])],1)],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=40.7f2115db8ed931124ac5.js.map