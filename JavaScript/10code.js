
// 简单回调
function foo(){
    console.log(this.a);
}
function doFoo(fn){
    fn();
}
function doFoo2(o){
    o.foo();
}
var obj = {
    a: 2,
    foo: foo
};
var a = "I'm an a";
doFoo(obj.foo);
doFoo2(obj);
/*
	分析：
	在Javascript中，this指向函数 执行时的当前对象，而非声明环境有。
	执行doFoo的时候执行环境就是doFoo函数，执行环境为全局。
	执行doFoo2时是在对象内部调用函数，this指针指向该对象
	结果：
	I'm an a
	2
*/

// 用apply 改变函数作用域
function foo(somthing){
    console.log(this.a, somthing);
}
function bind(fn, obj){
    return function(){
        return fn.apply(obj, arguments);
    }
}
var obj = {
    a:2
}
var bar = bind(foo, obj);
var b = bar(3);
console.log(b);
/*
	分析：
	apply、call、bind都有个作用就是改变作用域，这里用apply将foo函数的作用域指向obj对象，同时传入参数。
	再简单分析一下bind函数内部的嵌套，执行bind函数的时候返回的是一个匿名函数，
	所以执行bar(3)的时候实际上是执行的bind内部的匿名函数，返回的是之前传入的foo函数的执行结果。
	函数没有返回值的情况下默认返回undefined。
	结果：
	2 3
	undefined
*/

//new 关键字
function foo(a,b){
    this.val = a+b;
}
var bar = foo.bind(null, 'p1');
var baz = new bar('p2');
console.log(baz.val);
/*
	分析：
	bind函数的第一个参数为null代表作用域不变，后面的不定参数将会和函数本身的参数按次序进行绑定，
	绑定之后执行函数只能从未绑定的参数开始传值。
	结果：
	p1p2
*/

// 自行执行
function foo(){
    console.log(this.a);
}
var a = 2;
var o = {a:3,foo:foo};
var p = {a:4};
(p.foo=o.foo)();
/*
	分析：
	经常可以看到这样的代码
	JavaScript
	(function(){
    	//...
	})()
	这种代码通常是创建一个立即执行的函数同时避免污染全局变量。
	很少有人去关注赋值语句执行之后会返回什么结果，其实就是返回当前值。
	也就是说当括号内执行完赋值之后，返回的是o对象中的foo函数。函数的执行环境中有一个a对象，
	嗯，就是它了~
	结果：
	2
*/

// 变量属性
var a = [];
a[0] = 1;
a['foobar'] = 2;
console.log(a.length);
console.log(a.foobar);
/*
	分析：
	当一个变量被声明后，扩充其属性并不会改变原数据类型
	结果：
	1
	2
*/

// 精度问题
var a = 'foo';
a[1] = 'O';
console.log(0.1+0.2==0.3||a);
/*
	分析:
	当操作小数时请小心，js的小数计算并不精确，所以上面的判断是false。
	字符串变量是常量。
	结果：
	foo
*/

// 命名提升
foo();
var foo = 0;
function foo(){
    console.log(1);
}
foo = function(){
    console.log(2);
};
/*
	分析：
	声明的变量和命名函数都会被提升到代码的最前面，只不过声明的变量的赋值语句在代码中的位置不变。
	所以上面这段代码应该被理解为：
	var foo;
	function foo(){
	    console.log(1);
	}
	foo();
	foo = 0;
	foo = function(){
	    console.log(2);
	};
	结果：
	1
	--------------------------
	思考：
	foo();
	var foo = 0;
	function foo(){
	    console.log(1);
	}
	foo();
	foo = function(){
	    console.log(2);
	};
	foo();
	结果：
	1
	报错
*/

// 作用域   ?
foo();
var a = true;
if(a){
    function foo(){
        console.log('a');
    }
} else {
    function foo(){
        console.log('b');
    }
}
/*
	分析：
	javascript并不是以代码段为作用域，而是以函数。
	再根据命名提升的原则，所以这段代码应该是这样的：
	function foo(){
    console.log('a');
	}
	function foo(){
	    console.log('b');
	}
	foo();
	var a = true;
	if(a){
	} else {
	}
	结果
	b
*/

// 闭包陷阱
for(var i=1;i&lt;=5;i++){
    setTimeout(function(){
        console.log(i);
    }, i*1000);
}
/*
	分析：
	闭包有个重要的作用就是，在内层函数引用外层函数定义的变量时，外层函数的变量不会被持久化。
	这里有个隐藏陷阱就是for循环结束之后i仍然自增了1。
	结果：
	6
	6
	6
	6
	6	
*/

// 伪闭包
function foo(){
    console.log(a);
}
function bar () {
    var a = 3;
    foo();
}
var a = 2;
bar();
/*
	分析：
	闭包是函数的嵌套定义，而不是函数的嵌套调用。
	结果：
	2
	----------
	思考：如何输出3？	
*/


