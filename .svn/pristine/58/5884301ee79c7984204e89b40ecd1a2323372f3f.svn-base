/**
 * Created by zhuwenqi on 2017/3/29.
 */
class UserEvent {
    constructor() {
        this.subscribers = new Map([['any', []]]);
    }
    //事件名称静态方法。
    static   getAddEvent(){
        return "addEvent";
    }
    static getAddEvent2(){
        return "addEvent2";
    }

    //注册事件
    addEventLister(fn, type = 'any') {
        let subs = this.subscribers;
        if (!subs.get(type)) return subs.set(type, [fn]);
        subs.set(type, (subs.get(type).push(fn)));
    }

    //派发事件
    dispatcheEvent(content, type = 'any') {
        if(!this.subscribers.has(type)){
            return;
        }
        for (let fn of this.subscribers.get(type)) {
            fn(content);
        }
    }

    //移除事件
    removeEvent(content, type = 'any'){
        if(this.subscribers.has(type)){
            this.subscribers.get(type);
            this.subscribers.delete(type)


        }
    }
}


