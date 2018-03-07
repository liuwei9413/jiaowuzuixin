<template>
  <div id="addstudent">

  <el-form :model="studentForm" :rules="rules" ref="studentForm" label-width="140px" class="demo-studentForm">
    <div>
      <!--按钮部分-->
      <div class="saveDiv">
        <el-button type="text" class="text-left"> < 返回 </el-button>
        <el-button type="primary"  class="text-right"   @click="submitForm('studentForm')">保存</el-button>
        <!--<el-button @click="resetForm('studentForm')">取消</el-button>-->
      </div>


      <!--选择班级年级-->
      <div class="title"><i></i>
        <span>选择导入班级</span></div>
      <el-form-item label="年级" prop="gradeId">
        <el-radio-group v-model="studentForm.gradeId">
          <el-radio-button :label="grade.index" v-for="(grade,index) in gradeList" :key="index">{{grade.name}}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="班级" prop="classIndex">
        <el-radio-group v-model="studentForm.classIndex" v-if="studentForm.gradeId">
          <el-radio-button :label="classes.index" v-for="(classes,index) in gradeList[studentForm.gradeId].classList" :key="index">
            {{classes.name}}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
    </div>
    <!--学生信息-->
    <div class="title"><i></i><span>学生信息</span></div>
    <el-form-item label="学籍号：" prop="sid">
      <el-input v-model="studentForm.sid"></el-input>
    </el-form-item>
    <el-form-item label="姓名：" prop="name">
      <el-input v-model="studentForm.name"></el-input>
    </el-form-item>

    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="studentForm.sex">
        <el-radio label="男" value="男"></el-radio>
        <el-radio label="女" value="女"></el-radio>
      </el-radio-group>
    </el-form-item>

    <!--民族-->
    <el-form-item label="民族：" class="demo-autocomplete"  prop="nation" >
      <el-autocomplete class="inline-input" v-model="studentForm.nation" :fetch-suggestions="querySearch"
                       placeholder="请输入内容"
                       @select="handleSelect"
      ></el-autocomplete>
    </el-form-item >
    <!--  <minority></minority>-->
    <!--民族结束-->

    <el-form-item label="身份证号" prop="IDnumber">
      <el-input v-model="studentForm.IDnumber"></el-input>
    </el-form-item>
    <el-form-item label="出生年月日" required>
      <el-col :span="11">
        <el-form-item prop="birthday">
          <el-date-picker type="date" format="yyyy-MM-dd" placeholder="选择日期" v-model="studentForm.birthday" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item class="block" label="入学年份：" prop="schoolYear">
      <el-date-picker
        v-model="studentForm.schoolYear"
        align="right"
        type="year"
        placeholder="选择年">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="是否是独生子女：" prop="isOneChile">
      <el-radio-group v-model="studentForm.isOneChile">
        <el-radio label="是" value="1"></el-radio>
        <el-radio label="否" value="0"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否住校" prop="isZhuXiao">
      <el-radio-group v-model="studentForm.isZhuXiao">
        <el-radio label="是" value="1"></el-radio>
        <el-radio label="否" value="0"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="监护人：" prop="guardian">
    <el-select v-model="studentForm.guardian" placeholder="请选择监护人">
      <el-option label="有父或母照料" value="有父或母照料"></el-option>
      <el-option label="祖辈照料" value="祖辈照料"></el-option>
      <el-option label="托管给亲戚" value="托管给亲戚"></el-option>
      <el-option label="其他" value="其他"></el-option>
    </el-select>
  </el-form-item>

    <div class="title"><i></i><span>家庭信息</span></div>
    <el-form-item label="父亲学历" prop="fatherDucation">
      <el-select v-model="studentForm.fatherDucation" placeholder="请选择父亲学历">
        <el-option label="小学" value="小学"></el-option>
        <el-option label="初中" value="初中"></el-option>
        <el-option label="高中" value="高中"></el-option>
        <el-option label="中专" value="中专"></el-option>
        <el-option label="大专" value="大专"></el-option>
        <el-option label="本科" value="本科"></el-option>
        <el-option label="硕士及以上" value="硕士及以上"></el-option>
        <el-option label="其他" value="其他"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="父亲职业" prop="fatherCareer">
      <el-select v-model="studentForm.fatherCareer" placeholder="请选择父亲学历">
        <el-option label="国企员工" value="国企员工"></el-option>
        <el-option label="公务员" value="公务员"></el-option>
        <el-option label="事业人员" value="事业人员"></el-option>
        <el-option label="私企员工" value="私企员工"></el-option>
        <el-option label="企业主" value="企业主"></el-option>
        <el-option label="个体户" value="个体户"></el-option>
        <el-option label="自由职业" value="自由职业"></el-option>
        <el-option label="农民" value="农民"></el-option>
        <el-option label="军人" value="军人"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="电话" prop="fatherPhone">
      <el-input v-model="studentForm.fatherPhone" placeholder="请填写电话"></el-input>
    </el-form-item>

    <el-form-item label="母亲学历：" prop="motherDucation">
      <el-select v-model="studentForm.motherDucation" placeholder="请选择母亲学历">
        <el-option label="小学" value="小学"></el-option>
        <el-option label="初中" value="初中"></el-option>
        <el-option label="高中" value="高中"></el-option>
        <el-option label="中专" value="中专"></el-option>
        <el-option label="大专" value="大专"></el-option>
        <el-option label="本科" value="本科"></el-option>
        <el-option label="硕士及以上" value="硕士及以上"></el-option>                   <el-option label="其他" value="其他"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="母亲职业：" prop="motherCareer">
      <el-select v-model="studentForm.motherCareer" placeholder="请选择母亲职业">
        <el-option label="国企员工" value="国企员工"></el-option>
        <el-option label="公务员" value="公务员"></el-option>
        <el-option label="事业人员" value="事业人员"></el-option>
        <el-option label="私企员工" value="私企员工"></el-option>
        <el-option label="企业主" value="企业主"></el-option>
        <el-option label="个体户" value="个体户"></el-option>
        <el-option label="自由职业" value="自由职业"></el-option>
        <el-option label="农民" value="农民"></el-option>
        <el-option label="军人" value="军人"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="电话："  prop="motherPhone">
      <el-input v-model="studentForm.motherPhone" placeholder="请填写电话"></el-input>
    </el-form-item>

  </el-form>

  </div>
</template>

<script>
  import Minority from '@/pages/components/Minority'
  export default {
    data() {
      return {
        gradeList: {},
        studentForm: {
          schoolId: '1',
          classIndex: '',
          gradeId: '',
          sid:'',
          name:'',
          sex:'',
          nation:'',
          IDnumber:'',
          birthday:'',    //出生日期
          schoolYear:'',//入学年份
          isOneChile:'',
          isZhuXiao:'',
          guardian:'',
          fatherDucation:'',
          fatherCareer:'',
          fatherPhone:'',
          motherDucation:'',
          motherCareer:'',
          motherPhone:'',
        },
        studentresData:'',
        //民族参数
        restaurants: [],
        nation: '',
        rules: {
          classIndex: [
            { required: true, message: '请选择班级', trigger: 'blur' },
          ],
          gradeId: [
            { required: true, message: '请选择年级', trigger: 'blur' },
          ],
          sid: [
            { required: true, message: '请输入学籍号', trigger: 'change' },
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { pattern:/^[\u4e00-\u9fa5]{2,30}$/, message: '只能输入汉字'}
          ],
          nation: [
            { required: true, message: '请输入民族', trigger: 'change' },
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          IDnumber: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { pattern:/^[1-9](\d{13}|\d{16})(\d|X)$/, message: '请输入正确的身份证号码'}
          ],
          birthday: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          fatherPhone: [
            { pattern:/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/, message: '请输入正确的身份证号码'}
          ],
          motherPhone: [
            { pattern:/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/, message: '请输入正确的身份证号码'}
          ],



        }
      };
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    beforeCreate() {
      let that = this
      //获取班级列表
      that.$ajax('/schadmin/getGradeList', {schoolId: 1})
        .then(res => {
          if(res.code == 200 && res.data && res.data.length) {
            that.gradeList = {};
            res.data.forEach((grade, index) => {
              if(!that.gradeList[grade.index]) {
                that.gradeList[grade.index] = grade;
              }
            })
            console.log(that.gradeList);
          }
        });
    },
    methods: {
      //获取民族
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "阿昌族", },
          { "value": "傈僳族",  },
          { "value": "水族", },
          { "value": "白族", },
          { "value": "高山族",  },
          { "value": "珞巴族", },
          { "value": "塔吉克族", },
          { "value": "保安族",  },
          { "value": "仡佬族",  },
          { "value": "满族", },
          { "value": "塔塔尔族",  },
          { "value": "布朗族",  },
          { "value": "哈尼族", },
          { "value": "毛南族", },
          { "value": "土家族",  },
          { "value": "布依族",  },
          { "value": "哈萨克族", },
          { "value": "门巴族", },
          { "value": "土族",  },
          { "value": "朝鲜族",  },
          { "value": "汉族", },
          { "value": "蒙古族",  },
          { "value": "佤族", },
          { "value": "达斡尔族",  },
          { "value": "赫哲族", },
          { "value": "苗族", },
          { "value": "维吾尔族", },
          { "value": "傣族", },
          { "value": "回族",  },
          { "value": "仫佬族",  },
          { "value": "乌孜别克族",  },
          { "value": "基诺族",  },
          { "value": "纳西族",  },
          { "value": "锡伯族", },
          { "value": "东乡族",  },
          { "value": "京族",  },
          { "value": "怒族",  },
          { "value": "瑶族",  },
          { "value": "侗族",  },
          { "value": "景颇族", },
          { "value": "普米族",  },
          { "value": "彝族", },
          { "value": "独龙族", },
          { "value": "柯尔克孜族",  },
          { "value": "羌族",  },
          { "value": "裕固族",  },
          { "value": "俄罗斯族", },
          { "value": "撒拉族",  },
          { "value": "藏族",  },
          { "value": "鄂伦春族", },
          { "value": "黎族",  },
          { "value": "畲族", },
          { "value": "壮族",  },
          { "value": "拉祜族", }
        ];
      },
      handleSelect(item) {
        console.log(item);
      },


     /*保存*/
      submitForm(studentForm) {
        var nowDate = this.studentForm.birthday;
        var nowMonth = (nowDate.getMonth() + 1) > 9 ? (nowDate.getMonth() + 1) : ('0' + (nowDate.getMonth() + 1));
        nowDate = nowDate.getFullYear() + '-' + nowMonth + '-' + nowDate.getDate();
        this.studentForm.birthday = nowDate;

        this.$ajax('/teacher/saveOneStudent', this.studentForm)
          .then(res => {
            if(res.code == 200) {
              this.$alert('保存成功', '标题名称', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                  });
                }
              });
            }
          });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components:{
      Minority
    }
  }
</script>
<style>
  #addstudent{
    padding: 0 20px 50px 20px;
  }
  /*按钮*/
  .saveDiv {
    height: 45px;
    padding-top: 5px;
    border-bottom: 1px solid #e9edf1;
  }
  .text-right {
    float: right;
  }
  .text-left {
    float: left;
  }
  .title{
    padding: 20px 0 18px 0;
  }
  .title i{
    display: inline-block;
    height:16px;
    width:3px;
    margin-right:7px;
    background:#0d9ee9 ;
  }
  .title span{
    font-size:14px;
    color: #0d9ee9;
    display:inline-block;
    line-height: 12px;
  }
</style>
