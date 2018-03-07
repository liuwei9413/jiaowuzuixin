import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import $ from 'jquery'
//axios.defaults.timeout = 5000;
Vue.prototype.pointLoginStatus = true //单点登录状态
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/*60测试环境*/
// Vue.prototype.pointLoginURL = 'http://60.205.115.173:9999/cas/';//单点登录地址
// axios.defaults.baseURL = 'http://60.205.115.173:8881/yitai-educational-web/'; //线上测试环境
// Vue.prototype.staticResources = 'http://60.205.115.173:8881/yitai-educational-web/';//下载资源地址测试环境
// Vue.prototype.baseURL = 'http://60.205.115.173:8881/yitai-educational-web/';//excel模板下载地址

/*47演示环境
 Vue.prototype.pointLoginURL = 'http://47.93.163.199:9999/cas/'; //单点登录地址
 axios.defaults.baseURL = 'http://47.93.163.199:8088/yitai-educational-web/'; //基础
 Vue.prototype.staticResources = 'http://47.93.163.199:8088/yitai-educational-web/';//下载资源地址
 Vue.prototype.baseURL = 'http://47.93.163.199:8088/yitai-educational-web/';//excel模板下载地址*/

/*高中生 139开发环境
 Vue.prototype.pointLoginURL = 'http://139.196.88.88:80/cas/'; //单点登录地址
 axios.defaults.baseURL = 'http://139.224.13.181:8080/yitai-educational-web/'; //基础
 Vue.prototype.staticResources = 'http://139.224.13.181:8080/yitai-educational-web/';//下载资源地址
 Vue.prototype.baseURL = 'http://139.224.13.181:8080/yitai-educational-web/';//excel模板下载地址*/
 /*高中生 域名生产环境
 Vue.prototype.pointLoginURL = 'http://139.196.88.88:80/cas/'; //单点登录地址
 axios.defaults.baseURL = 'http://fuzhougz.studentinfo.cn/yitai-educational-web/'; //基础
 Vue.prototype.staticResources = 'http://fuzhougz.studentinfo.cn/yitai-educational-web/';//下载资源地址
 Vue.prototype.baseURL = 'http://fuzhougz.studentinfo.cn/yitai-educational-web/';//excel模板下载地址*/

/*39预生产环境
 Vue.prototype.pointLoginURL ='http://39.107.14.111:8083/cas/'; //单点登录地址
 axios.defaults.baseURL ='http://39.107.14.111:8082/yitai-educational-web/'; //基础
 Vue.prototype.staticResources = 'http://39.107.14.111:8082/yitai-educational-web/';//下载资源地址
 Vue.prototype.baseURL = 'http://39.107.14.111:8082/yitai-educational-web/';//excel模板下载地址*/

/*101.132.175.193环境*/
Vue.prototype.pointLoginURL = 'http://101.132.175.193:8083/cas/' //单点登录地址
axios.defaults.baseURL = 'http://101.132.175.193:8082/yitai-educational-web/' //线上测试环境
Vue.prototype.staticResources = 'http://101.132.175.193:8082/yitai-educational-web/' //下载资源地址测试环境
Vue.prototype.baseURL = 'http://101.132.175.193:8082/yitai-educational-web/' //excel模板下载地址
/*192.168.20.119环境
Vue.prototype.pointLoginURL = 'http://192.168.20.119:7070/cas/';//单点登录地址
axios.defaults.baseURL = 'http://192.168.20.119:7070/yitai-educational-web'; //线上测试环境
Vue.prototype.staticResources = 'http://192.168.20.119:7070/yitai-educational-web';//下载资源地址测试环境
Vue.prototype.baseURL = 'http://192.168.20.119:7070/yitai-educational-web';//excel模板下载地址*/

/*抚州初中测试环境
Vue.prototype.pointLoginURL = 'http://47.100.105.98:80/cas/' //单点登录地址
axios.defaults.baseURL = 'http://139.196.142.206:8080/yitai-educational-web/' //线上测试环境
Vue.prototype.staticResources = 'http://139.196.142.206:8080/yitai-educational-web/' //下载资源地址测试环境
Vue.prototype.baseURL = 'http://139.196.142.206:8080/yitai-educational-web/' //excel模板下载地址*/
/*抚州初中生域名环境
Vue.prototype.pointLoginURL = 'http://47.100.105.98:80/cas/' //单点登录地址
axios.defaults.baseURL = 'http://fuzhoucz.studentinfo.cn/yitai-educational-web/' //线上测试环境
Vue.prototype.staticResources = 'http://fuzhoucz.studentinfo.cn/yitai-educational-web/' //下载资源地址测试环境
Vue.prototype.baseURL = 'http://fuzhoucz.studentinfo.cn/yitai-educational-web/' //excel模板下载地址*/
axios.defaults.withCredentials = true //axios发送post请求自动set cookie
//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  //_.toast("错误的传参", 'fail');
  return Promise.reject(error)
})

export function fetch(url, params) {
  if (!params) {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
export default fetch

//添加响应拦截器
axios.interceptors.response.use(function(response) {
  //对响应数据做些事
  if (response.data.code == 401) {
    localStorage.removeItem('userInfo')
    location.hash = '#/login'

    // Vue.$router.push({ path: '/login',  query: ''});
  }
  return response
}, function(error) {
  //请求错误时做些事
  return Promise.reject(error)
})

//自定义弹框处理
Vue.prototype.useAlert = function(type, msg, func) {
  let successImg = require('../resources/front/imgs/alert/alertSuccess.png')
  let errorImg = require('../resources/front/imgs/alert/alertError.png')
  var imgInfo = ''
  let imgStyle = 'position:absolute;top:-36px;left:45px'
  if (type == 'success') {
    imgInfo = '<img src=' + successImg + ' style=' + imgStyle + ' alt="成功提示">'
  } else if (type == 'error') {
    imgInfo = '<img src=' + errorImg + ' style=' + imgStyle + ' alt="警告提示">'
  } else {
    imgInfo = '<img src=' + errorImg + 'style=' + imgStyle + ' alt="无提示">'
  }
  msg = msg ? msg : ''
  var alertHtml = '<div class="alertWrap" style="box-sizing:border-box;position: fixed; top: 50%; left: 50%; z-index:100001; margin: -60px 0 0 -106px; padding: 0 20px; width: 212px;height:120px;font-size:14px;background: #fff;border-radius: 4px;box-shadow: 0 0 8px #ccc;"><div>' + imgInfo + '</div><p style="text-align: center; font-size: 14px; color: #555555;margin-top: 50px">' + msg + '</p></div><div class="alertMark" style="position:fixed; top:0; left:0; z-index:100000; width:100%; height:1000px; background: rgba(0, 0, 0, 0.5);"></div>'
  $('body').append(alertHtml)
  $('.alertWrap').css({ 'left': $(window).width() / 2 })
  $('.alertMark').css('height', $(window).height())
  var timer = setTimeout(function() {
    if (!!func && typeof func == 'function') {
      func()
    }
    $('.alertWrap').hide()
    $('.alertMark').hide()
    clearTimeout(timer)
  }, 2000)
}
// 民族
Vue.prototype.nations = [{
  'value': '汉族',
  'label': '汉族'
},
{
  'value': '蒙古族',
  'label': '蒙古族'
},
{
  'value': '彝族',
  'label': '彝族'
},
{
  'value': '侗族',
  'label': '侗族'
},
{
  'value': '哈萨克族',
  'label': '哈萨克族'
},
{
  'value': '畲族',
  'label': '畲族'
},
{
  'value': '纳西族',
  'label': '纳西族'
},
{
  'value': '仫佬族',
  'label': '仫佬族'
},
{
  'value': '仡佬族',
  'label': '仡佬族'
},
{
  'value': '怒族',
  'label': '怒族'
},
{
  'value': '保安族',
  'label': '保安族'
},
{
  'value': '鄂伦春族',
  'label': '鄂伦春族'
},
{
  'value': '回族',
  'label': '回族'
},
{
  'value': '壮族',
  'label': '壮族'
},
{
  'value': '瑶族',
  'label': '瑶族'
},
{
  'value': '傣族',
  'label': '傣族'
},
{
  'value': '高山族',
  'label': '高山族'
},
{
  'value': '景颇族',
  'label': '景颇族'
},
{
  'value': '羌族',
  'label': '羌族'
},
{
  'value': '锡伯族',
  'label': '锡伯族'
},
{
  'value': '乌孜别克族',
  'label': '乌孜别克族'
},
{
  'value': '裕固族',
  'label': '裕固族'
},
{
  'value': '赫哲族',
  'label': '赫哲族'
},
{
  'value': '藏族',
  'label': '藏族'
},
{
  'value': '布依族',
  'label': '布依族'
},
{
  'value': '白族',
  'label': '白族'
},
{
  'value': '黎族',
  'label': '黎族'
},
{
  'value': '拉祜族',
  'label': '拉祜族'
},
{
  'value': '柯尔克孜族',
  'label': '柯尔克孜族'
},
{
  'value': '布朗族',
  'label': '布朗族'
},
{
  'value': '阿昌族',
  'label': '阿昌族'
},
{
  'value': '俄罗斯族',
  'label': '俄罗斯族'
},
{
  'value': '京族',
  'label': '京族'
},
{
  'value': '门巴族',
  'label': '门巴族'
},
{
  'value': '维吾尔族',
  'label': '维吾尔族'
},
{
  'value': '朝鲜族',
  'label': '朝鲜族'
},
{
  'value': '土家族',
  'label': '土家族'
},
{
  'value': '傈僳族',
  'label': '傈僳族'
},
{
  'value': '水族',
  'label': '水族'
},
{
  'value': '土族',
  'label': '土族'
},
{
  'value': '撒拉族',
  'label': '撒拉族'
},
{
  'value': '普米族',
  'label': '普米族'
},
{
  'value': '鄂温克族',
  'label': '鄂温克族'
},
{
  'value': '塔塔尔族',
  'label': '塔塔尔族'
},
{
  'value': '珞巴族',
  'label': '珞巴族'
},
{
  'value': '苗族',
  'label': '苗族'
},
{
  'value': '满族',
  'label': '满族'
},
{
  'value': '哈尼族',
  'label': '哈尼族'
},
{
  'value': '佤族',
  'label': '佤族'
},
{
  'value': '东乡族',
  'label': '东乡族'
},
{
  'value': '达斡尔族',
  'label': '达斡尔族'
},
{
  'value': '毛南族',
  'label': '毛南族'
},
{
  'value': '塔吉克族',
  'label': '塔吉克族'
},
{
  'value': '德昂族',
  'label': '德昂族'
},
{
  'value': '独龙族',
  'label': '独龙族'
},
{
  'value': '基诺族',
  'label': '基诺族'
}
]
//学历
Vue.prototype.ducations = [{
  label: '小学',
  value: '小学'
}, {
  label: '初中',
  value: '初中'
}, {
  label: '高中',
  value: '高中'
}, {
  label: '中专',
  value: '中专'
}, {
  label: '大专',
  value: '大专'
}, {
  label: '本科',
  value: '本科'
}, {
  label: '硕士及以上',
  value: '硕士及以上'
}, {
  label: '其他',
  value: '其他'
}]

// 职业
Vue.prototype.careers = [{
  label: '国企员工',
  value: '国企员工'
}, {
  label: '公务员',
  value: '公务员'
}, {
  label: '事业人员',
  value: '事业人员'
}, {
  label: '私企员工',
  value: '私企员工'
}, {
  label: '企业主',
  value: '企业主'
}, {
  label: '个体户',
  value: '个体户'
}, {
  label: '自由职业',
  value: '自由职业'
}, {
  label: '农民',
  value: '农民'
}, {
  label: '军人',
  value: '军人'
}]


// 监护人
Vue.prototype.guardians = [{
  label: '有父或母照料',
  value: '有父或母照料'
}, {
  label: '祖辈照料',
  value: '祖辈照料'
}, {
  label: '托管给亲戚',
  value: '托管给亲戚'
}, {
  label: '其他',
  value: '其他'
}]

// 第一学历和最高学历
Vue.prototype.maxEducation = [{
  label: '高中',
  value: '高中'
}, {
  label: '中专',
  value: '中专'
}, {
  label: '大专',
  value: '大专'
}, {
  label: '本科',
  value: '本科'
}, {
  label: '硕士及以上',
  value: '硕士及以上'
}, {
  label: '其他',
  value: '其他'
}]

// 考取途径
Vue.prototype.maxGetTheWay = [{
  label: '统招',
  value: '统招'
}, {
  label: '自考',
  value: '自考'
}, {
  label: '成招',
  value: '成招'
}, {
  label: '专升本',
  value: '专升本'
}, {
  label: '在职',
  value: '在职'
}, {
  label: '其他',
  value: '其他'
}]

// 高校类别
Vue.prototype.schoolType = [{
  label: '本科提前批次',
  value: '本科提前批次'
}, {
  label: '本科第一批次',
  value: '本科第一批次'
}, {
  label: '本科第二批次',
  value: '本科第二批次'
}, {
  label: '本科第三批次',
  value: '本科第三批次'
}, {
  label: '专科',
  value: '专科'
}, {
  label: '其他',
  value: '其他'
}]
// 职称
Vue.prototype.jobTitle = [{
  label: '正高级',
  value: '正高级'
}, {
  label: '高级',
  value: '高级'
}, {
  label: '一级',
  value: '一级'
}, {
  label: '二级',
  value: '二级'
}, {
  label: '三级',
  value: '三级'
}, {
  label: '无',
  value: '无'
}]
