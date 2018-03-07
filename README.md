# webapp

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


####################################################教务系统登录模块#####################################################
########################################################################################################################
##########################################################Ding##########################################################
系统角色：
1、cms总控用户   admin  roleId: 32
2、教育局管理员         roleId: 4
3、学校管理员           roleId: 2
4、班主任               roleId: 1
5、普通任课教师         roleId: 8
6、校长                 roleId:16
附：存在多角色权限用户，一般同一用户择取权限高者，多权限登录分离选取处理

单点登录：
目前系统有两套登录选择 api.js中 Vue的原型添加单点登录开关控制 pointLoginStatus为true时代表开启，false为关闭
具体步骤及配置项参考login文件



