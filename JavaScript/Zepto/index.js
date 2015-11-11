$('div')  //=> all DIV elements on the page
$('#foo') //=> element with ID "foo"

// create element:
$("<p>Hello</p>") //=> the new P element
// create element with attributes:
$("<p />", { text:"Hello", id:"greeting", css:{color:'darkblue'} })
//=> <p id=greeting style="color:darkblue">Hello</p>

// execute callback when the page is ready:
Zepto(function($){
  alert('Ready to Zepto!')
})

//转换为驼峰
$.camelCase(string)  //⇒> string  
$.camelCase('hello-there') //=> "helloThere"
$.camelCase('helloThere')  //=> "helloThere"

$.contains(parent, node)  ⇒ boolean


$.each(collection, function(index, item){ ... })  ⇒ collection
$.each(['a', 'b', 'c'], function(index, item){
  console.log('item %d is: %s', index, item)
})
var hash = { name: 'zepto.js', size: 'micro' }
$.each(hash, function(key, value){
  console.log('%s: %s', key, value)
})

$.extend(target, [source, [source2, ...]])  ⇒ target
$.extend(true, target, [source, ...])  ⇒ target 
var target = { one: 'patridge' },
    source = { two: 'turtle doves' }

$.extend(target, source)//An optional true for the first argument triggers deep (recursive) copying.？
//=> { one: 'patridge',
//     two: 'turtle doves' }

$.fn.empty = function(){
  return this.each(function(){ this.innerHTML = '' })
}

$.grep(items, function(item){ ... })  ⇒ array
//Get a new array containing only the items for which the callback function returned true.

$.inArray(element, array, [fromIndex])  ⇒ number
//Get the position of element inside an array, or -1 if not found.

$.isArray(object)  ⇒ boolean
$.isFunction(object)  ⇒ boolean

$.isPlainObject(object)  ⇒ boolean //object is a JavaScript object, 
$.isPlainObject({})         // => true
$.isPlainObject(new Object) // => true
$.isPlainObject(new Date)   // => false
$.isPlainObject(window)     // => false

$.isWindow(object)  ⇒ boolean //object is a window object.