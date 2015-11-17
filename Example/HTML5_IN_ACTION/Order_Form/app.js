(function () {
	 var init = function () {
	 	var orderForm = document.forms.order,    //获取name=order的form
	 	 	saveBtn = document.getElementById('saveOrder'),
	 	 	saveBtnClicked = false;

	 	var saveForm = function () {
	 		if(!('formAction' in document.createElement('input'))){
	 			var formAction = saveBtn.getAttribute('formAction');
	 			orderForm.setAttribute('action',formAction);
	 		}
	 		saveBtnClicked = true;                                   
	 	};
	 	saveBtn.addEventListener('click',saveForm,false); 	

	 	//第一步：构建计算函数
	 	var qtyFields = orderForm.quantity,   //获取name="quantity" 	 	
	 		totalFields = orderForm.getElementsByClassName('item_total'),
	 		orderTotalField = document.getElementById('order_total');

	 	var formatMoney = function (value) {//返回一个用来表示货币的格式化数值，并利用逗号来分割千分位
	 		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
	 	}

	 	var calculateTotals = function () {
	 		var i=0,
	 		 	ln = qtyFields.length,
	 		 	itemQty = 0,
	 		 	itemPrice = 0.00,
	 		 	itemTotal = 0.00,	 		 	
	 		 	itemTotalMoney = '$0.00',
	 		 	orderTotal = 0.00,
	 		 	orderTotalMoney = '$0.00';

	 		 for(;i<ln;i++){//将来在这里计算插入用于计算的循环语句	 		 	
	 		 	if(!!qtyFields[i].valueAsNumber){//测试valueAsNumber属性的存在性。
	 		 		itemQty = qtyFields[i].valueAsNumber || 0;	 	 		 				 	
	 		 	} else {
	 		 		itemQty = parseFloat (qtyFields[i].value) || 0;
	 		 	}
	 		 	if(!!qtyFields[i].dataset) {
	 		 		itemPrice = parseFloat(qtyFields[i].dataset.price);
	 		 	} else {
	 		 		itemPrice = parseFloat(qtyFields[i].getAttribute('data-price'));
	 		 	}

	 		 	itemTotal = itemQty * itemPrice;
	 		 	itemTotalMoney = '$'+formatMoney(itemTotal.toFixed(2));
	 		 	orderTotal += itemTotal;
	 		 	orderTotalMoney = '$'+ formatMoney(orderTotal.toFixed(2));

	 		 	if(!!totalFields[i].value){	//测试用户浏览器所支持是否支持<output>元素
	 		 		totalFields[i].value = itemTotalMoney;
	 		 		orderTotalField.value = orderTotalMoney;
	 		 	} else {
	 		 		totalFields[i].innerHTML = itemTotalMoney;
	 		 		orderTotalField.innerHTML = orderTotalMoney;
	 		 	}
	 		 }
	 	};
	 	calculateTotals();//执行初始计算，以防某个字段被预填充。由于init()函数在页面加载时被调用，将会访问到预填充数据

	 	var qtyListerers = function () {
	 		var i = 0,
	 			ln = qtyFields.length;
	 		for(;i<ln;i++){
	 			qtyFields[i].addEventListener('input',calculateTotals,false);
	 			qtyFields[i].addEventListener('keyup',calculateTotals,false);//在IE9中，input事件并不能侦测退格键与删除键的按键操作以及剪切操作，所以要绑定keyup事件。
	 		}
	 	};
	 	qtyListerers();



	 	//第二步：取回quantity输入字符的值 加入之前的那个for循环
	 	//第三步：取回各产品价格值，计算单种产品的总金额以及订单总金额
	 	//第四步：在订单中显示更新的订单总金额

	 	//利用setCustomValidity方法和ValidationMessage属性创建自定义验证测试和错误信息
	 	//1.为输入字段加入自定义验证码与错误消息提示
	 	var doCustomValidity = function (field,msg){
	 		if('setCustomValidity' in field){    //检查浏览器是否支持setCustomValidity方法。如果不支持，手动设定validationMessage的值
	 			field.setCustomValidity(msg);
	 		} else {
	 			field.validationMessage = msg;
	 		}
	 	};

	 	var validateForm = function () {
	 		doCustomValidity(orderForm.name,'');
	 		doCustomValidity(orderForm.password,'');
	 		doCustomValidity(orderForm.confirm_password,'');
	 		doCustomValidity(orderForm.card_name,'');

	 		if(orderForm.name.value.length < 4){
	 			doCustomValidity(orderForm.name,'Full Name must be at least 4 characters long');	 		
	 		}

	 		if(orderForm.password.value.length < 8){
	 			doCustomValidity(orderForm.password,'password must be at least 8 characters long');
	 		}

	 		if(orderForm.password.value != orderForm.confirm_password.value){
	 			doCustomValidity(orderForm.confirm_password,'Confirm password mush match password');
	 		}

	 		if(orderForm.card_name.value.length < 4){
	 			doCustomValidity(orderForm.card_name,'Name on Card must be at least 4 characters long');
	 		}
	 	};

	 	orderForm.addEventListener('input',validateForm,false);
	 	orderForm.addEventListener('keyup',validateForm,false);//在IE9中需要用keyup事件绑定来侦听退格键，删除键及剪切键

	 	//利用invalid事件来侦听失败的表单验证
	 	//2.为表单的invalid事件添加一个侦听器
	 	var styleInvalidForm = function () {
	 		orderForm.className = 'invalid';//为<form>元素添加一个类invalid。下一节，我们将用它来样式化已提交表单中的无效字段
	 	}

	 	orderForm.addEventListener('invalid',styleInvalidForm,true);

	 };
	 window.addEventListener('load',init,false);
	 		}
)();