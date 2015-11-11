// 1.如果不知道数组长度，数组添加成员使用push方法
var someStack = [];
someStack[someStack.length] = 'abracadabra';// bad
someStack.push('abracadabra');// good

// 2.当你需要复制一个数组时，使用数组的slice方法
var len = items.length,
    itemsCopy = [],
    i;
// bad
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}
// good
itemsCopy = items.slice();

// 3.当你需要把"类似数组对象"转为数组时，使用数组的slice方法
function trigger () {
	var args=Array.prototype.slice.call(arguments);
}

// 4.字符串使用单引号
var name = "Bob Parr";// bad
var name = 'Bob Parr';// good
var fullName = "Bob " + this.lastName;// bad
var fullName = 'Bob ' + this.lastName;// good

// 5.通过编程的方式创建字符串，应该使用数组的join方法，而不是字符串链接方法。特别是对于IE而言
var items,
    messages,
    length,
    i;

messages = [{
  state: 'success',
  message: 'This one worked.'
}, {
  state: 'success',
  message: 'This one worked as well.'
}, {
  state: 'error',
  message: 'This one did not work.'
}];

length = messages.length;

// bad
function inbox(messages) {
  items = '<ul>';

  for (i = 0; i < length; i++) {
    items += '<li>' + messages[i].message + '</li>';
  }

  return items + '</ul>';
}

// good
function inbox(messages) {
  items = [];

  for (i = 0; i < length; i++) {
    items[i] = messages[i].message;
  }

  return '<ul><li>' + items.join('</li><li>') + '</li></ul>';

  // 使用var来声明变量，否则将声明全局变量，我们需要尽量避免污染全局命名空间  
  superPower = new SuperPower();// bad
  var superPower = new SuperPower();// good

  // FIXME——是需要解决的
  // TODO——是需要完善的



