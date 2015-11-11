/*
	工厂方法模式
	不再有一个唯一的工厂类就创建产品，而是将不同的产品交给对应的工厂子类去实现。
	每个产品由负责生产的子工厂来创建。如果添加新的产品，需要做的就是添加新的子工厂
	和产品，而不需要修改其他的工厂代码
*/

//下面是简单工厂模式的代码
var productEnums = {
	flight: "flight",
	hotel: "hotel"
};
function Flight () {
	console.log("This is Flight");
}
function Hotel () {
	console.log("This is Hotel");
}
var productFactory=(function () {
	var productFacties = {
		"flight": function () {
			return new Flight();
		}
		"hotel": function () {
			return new Hotel();
		}
	};
	return{
		createProduct: function (productType) {
			return productFacties[productType]();
		}
	}
})();
function User() {
	this.shopCart = [];
}
User.protoType = {
	constructor: User,
	order: function (productType) {
		this.shopCart.push(productFactory.createProduct(productType));
	}
}

//---------定义工厂类
function AbstractFactory() {
	
}
AbstractFactory.protoType.createProduct = function () {
	throw "没有实现该方法";
}

//--------定义两个子工厂
function FlightFactory() {
	AbstractFactory.call(this);
}
FlightFactory.protoType = new AbstractFactory();
FlightFactory.protoType.createProduct = function () {
	return new Flight();
}

function HotelFactory () {
	AbstractFactory.call(this);
}
HotelFactory.protoType = new AbstractFactory();
HotelFactory.protoType.createProduct = function () {
	return new Hotel();
}