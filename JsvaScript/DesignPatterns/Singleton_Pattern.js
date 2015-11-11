/*
	单例模式
*/ 

/*
	1.基本结构 ，将有关联的属性和方法组织到一起
	缺点：所有成员都是公开的
*/
var singleton = {
    prop:"value",
    method:function(){
    }
}

/*
	包含私有成员的单例模式
	在匿名函数外部无法访问到privateVar变量
*/
var singleton=(function () {
	var privateVar="private";
	return {
		prop:"value";
		method:function () {
			console.log(privateVar);
		}
	}
})();

/*
	惰性实例化
	单例对象是在调用getInstance的时候才真正被创建	
*/
var singleton=(function () {
	function init () {
		var privateVar="private";
		return{
			prop:"value",
			method.function(){
				console.log(privateVar);
			}
		}
	}
	var instance=null;
	return{
		getInstance:function(){
			if(!instance){
				instance=init();
			}
			return instance;
		}
	}
})();


/*
	结合实战：实现一个简单的日期帮组类
*/
// 基本的单例模式结构
var dateTimeHelper={
	now:function () {
		return new Date();
	},
	format:function(date){
		return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	}
};
console.log(dateTimeHelper.now());

// 惰性加载实现单例模式
var dateTimeHelper=(function () {
	function init () {
		return{
			now:function () {
				return new Date();
			},
			format:function (date) {
				return date.getFullYear()+"-"+(getMonth()+1)+"-"+date.getDate();
			}

		}
	}
	var instance=null;
	return{
		getInstance:function () {
			if(!instance){
				instance=init;
			}
			return instance;
		}
	}
})();
console.log(dateTimeHelper.getInstance().now());