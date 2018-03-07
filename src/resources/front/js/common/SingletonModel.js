/**
 * Created by zhuwenqi on 2017/3/29.
 */
    //单例设计模式，唯一实例。

class SingletonModel {

    //属性初始化
    userPO(name,age){
        this.name = name;
        this.age = age;
    }
    //提供实例
    static getInstance() {
        if (!SingletonModel.instance) {
            SingletonModel.instance = new SingletonModel();
        }

        return SingletonModel.instance;
    }
    //静态方法
    static getUser(){
        return {name:'anku',age:27};
    }

}