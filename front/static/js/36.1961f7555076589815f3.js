webpackJsonp([36],{556:function(t,e,a){a(721);var s=a(191)(a(636),a(787),null,null);t.exports=s.exports},636:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=(a(13),a(193)),o=a.n(s);e.default={data:function(){return{activeName:"one",formData:{schoolId:JSON.parse(localStorage.userInfo).schools.schoolId,examId:this.$route.query.examId,term:this.$route.query.term,schoolYear:this.$route.query.schoolYear},fileLists:[],errorArr:[]}},mounted:function(){},methods:{handleClick:function(t,e){},selectFile:function(){},beforeUpload:function(t){console.log(t.size/1024/1024);var e=t.size/1024/1024<=2;return e||this.$alert("上传单个文件大小不能超过2MB! 请修改后重新导入","提示",{confirmButtonText:"确定",callback:function(){location.reload()}}),e},submitUpload:function(){this.errorArr=[],this.$refs.upload.submit()},handleChange:function(t,e){o()("#tySubjectBatch .upload-score li").each(function(e,a){o()(a).text().indexOf(t.name)>=0&&o()(a).remove()})},handleSuccess:function(t,e,a){"200"==t.code?this.useAlert("success",t.message,function(){}):"500"==t.code&&(this.errorArr=this.errorArr.concat(t.data),this.useAlert("error","导入失败，请稍后重试",function(){}),o()("#tySubjectBatch .upload-score li").each(function(t,a){o()(a).text().indexOf(e.name)>=0&&o()(a).remove()}))},handleError:function(t,e,a){}}}},673:function(t,e,a){e=t.exports=a(523)(),e.push([t.i,"#tySubjectBatch .upload-score{width:360px;padding:0 36px 30px}#tySubjectBatch .select-btn,#tySubjectBatch .upload-btn{margin-left:10px;width:90px;height:34px}#tySubjectBatch .el-upload-list{margin-top:20px}#tySubjectBatch .ev-report-page-panel .el-tab-pane p>a{margin-left:0}","",{version:3,sources:["E:/works/jiaowuzuixin/src/pages/front/schoolRollFiler/tySubjectbatch.vue"],names:[],mappings:"AACA,8BAAgC,YAAa,AAAC,mBAAqB,CAClE,AAGD,wDAA8B,iBAAkB,AAAC,WAAY,AAAC,WAAa,CAC1E,AACD,gCAAkC,eAAiB,CAClD,AACD,uDAAyD,aAAe,CACvE",file:"tySubjectbatch.vue",sourcesContent:["\n#tySubjectBatch .upload-score { width: 360px; padding: 0 36px 30px;\n}\n#tySubjectBatch .select-btn { margin-left: 10px; width: 90px; height: 34px;\n}\n#tySubjectBatch .upload-btn { margin-left: 10px; width: 90px; height: 34px;\n}\n#tySubjectBatch .el-upload-list { margin-top: 20px;\n}\n#tySubjectBatch .ev-report-page-panel .el-tab-pane p>a { margin-left: 0;\n}\n"],sourceRoot:""}])},721:function(t,e,a){var s=a(673);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a(524)("26f63a04",s,!0)},773:function(t,e,a){t.exports=a.p+"static/img/tySubjectinfomoban.563342b.png"},787:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"tySubjectBatch"}},[s("div",{staticClass:"ev-page-return"},[s("router-link",{staticClass:" icon-back",attrs:{to:{path:"/sportManagement"}}},[t._v("返回 ")])],1),t._v(" "),s("div",{staticClass:"ev-report-page-panel"},[s("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[s("el-tab-pane",{attrs:{label:"批量导入",name:"one"}},[s("div",[s("ol",[s("li",{staticClass:"xiazaimoban"},[s("h3",[s("i",{staticClass:"icon-download-File"}),t._v("下载模板")]),t._v(" "),s("p",{staticStyle:{"margin-top":"15px","margin-left":"36px",float:"left"}},[t._v("点击下载导入模板     "),s("a",{attrs:{href:t.baseURL+"downloads/体能成绩模板.zip",target:"_blank"}},[s("el-button",{staticClass:"download",attrs:{type:"primary"}},[t._v(" 下载")])],1)])]),t._v(" "),s("li",{staticClass:"file-box"},[s("h3",{staticStyle:{"padding-left":"13px",display:"block"}},[s("i",{staticClass:"icon-import-file",staticStyle:{"background-color":"#ff773b",color:"#fff"}}),t._v("选择需要导入的EXCEL文件")]),t._v(" "),s("el-upload",{ref:"upload",staticClass:"upload-score",attrs:{data:t.formData,accept:".xls,.xlsx,.csv",action:t.baseURL+"import/physical",multiple:"","before-upload":t.beforeUpload,"on-change":t.handleChange,"on-success":t.handleSuccess,"on-error":t.handleError,"file-list":t.fileLists,"auto-upload":!1}},[s("el-button",{staticClass:"select-btn",attrs:{type:"primary"},slot:"trigger"},[t._v("选择文件")]),t._v(" "),s("el-button",{staticClass:"upload-btn",attrs:{type:"success"},on:{click:t.submitUpload}},[t._v("导入")])],1)],1)])]),t._v(" "),s("div",[t.errorArr.length>0?s("div",{staticStyle:{"margin-top":"20px","min-height":"500px"}},[s("div",{staticClass:"icon-cue",staticStyle:{"font-size":"14px",color:"red",padding:"10px 0 10px 0"}},[t._v(" 出错提示")]),t._v(" "),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.errorArr,border:"",align:"center"}},[s("el-table-column",{attrs:{prop:"fileName",label:"问题文档",width:"180",align:"center"}}),t._v(" "),s("el-table-column",{attrs:{prop:"row",label:"问题行数",width:"200",align:"center"}}),t._v(" "),s("el-table-column",{attrs:{prop:"name",label:"出错人",width:"180",align:"center"}}),t._v(" "),s("el-table-column",{attrs:{prop:"content",label:"问题描述",align:"center"}})],1)],1):t._e(),t._v(" "),s("div",{attrs:{id:"error"}})])]),t._v(" "),s("el-tab-pane",{attrs:{label:"操作指引",name:"two"}},[s("div",{staticClass:"explain"},[s("h3",[s("i",{staticClass:"icon-case"}),t._v("导入格式案例")]),t._v(" "),s("div",{staticClass:"report-remark",staticStyle:{"margin-bottom":"20px"}},[t._v("\n            体能模板中学\n          ")]),t._v(" "),s("img",{attrs:{src:a(773)}}),t._v(" "),s("h3",[s("i",{staticClass:"icon-attentions"}),t._v("填写注意事项")]),t._v(" "),s("p",{staticClass:"son-remark"},[t._v("1、姓名和学籍号为必填项。")]),t._v(" "),s("p",{staticClass:"son-remark"},[t._v("2、学籍号需要输入全国统一学籍号且输入学籍号必须和系统学生学籍号保持一致。")]),t._v(" "),s("p",{staticClass:"son-remark"},[t._v("3、体育科目有成绩的填写，没成绩的可以为空")]),t._v(" "),s("h3",[s("i",{staticClass:"icon-import-instructions"}),t._v("导入说明")]),t._v(" "),s("p",{staticClass:"son-remark"},[t._v("1、文件导入前请严格按照数据要求和格式要求填写。")]),t._v(" "),s("p",{staticClass:"son-remark"},[t._v("2、导入如果出现异常或数据问题，请修改后重新导入。")])])])],1)],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=36.1961f7555076589815f3.js.map