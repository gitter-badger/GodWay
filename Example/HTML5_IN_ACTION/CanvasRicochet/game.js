/*
	1.资源绘制 windown.onload->Game.setup->Game.init()->Game.animate()->requestAnimFrame->draw()
	2.动画 Ball.draw()->Ball.move()
	3.碰撞检测
	4.清除被小球击中的砖块Bricks.collide

	实现键盘，鼠标及触摸控制
	1.创建键盘侦听器
	2.添加鼠标控制
*/

(function () {				//以后将所有的JavaScript代码都放到这个自执行的函数中，从而防止变量泄露到全局范围
	window.requestAnimFrame = (function () {
		return window.requestAnimationFrame       ||
			   window.webkitRequestAnimationFrame ||
			   window.mozRequestAmimationFrame    ||
			   window.oRequestAnimationFrame      ||
			   window.msRequestAnimationFrame     ||
			   function(callback) {
			   	window.setTimeout(callback,1000/60);//每秒执行60次动画
			   }
	})();//相当于使用setInterval(render,16)方法，但是具有更高的功能

	var ctx = null;         //一个用来容纳2D绘图环境的空变量
	var Game = {
		canvas: document.getElementById('canvas'),

		setup: function() {
			if(this.canvas.getContext) {
				ctx = this.canvas.getContext('2d');

				this.width = this.canvas.width;
				this.height = this.canvas.height;   //从canvas元素中获取宽高值

				this.init();
				Ctrl.init();
			}
		},

		animate:function () {
			Game.play = requestAnimFrame(Game.animate);      //由于animate()是个在Game对象之外触发的自引用函数，所以必须引用Game对象，而非this
			Game.draw();
		},

		init:function () {            //init 包含了所有对象实例
			Background.init();
			Hud.init();
			Ball.init();
			Paddle.init();
			Bricks.init();

			this.animate();
		},

		draw:function () {              //draw()用于处理所有跟新并绘制对象的逻辑
			ctx.clearRect(0,0,this.width,this.height);       //将Canvas绘图板清空，每次更新它时，之前绘制的图形就会被清除

			Background.draw();
			Bricks.draw();
			Paddle.draw();
			Hud.draw();
			Ball.draw();
		}		
	};

	var Background = {                  //自此一下的这些对象包含了游戏的所有可视化资源。目前，它们还仅仅占位符，目的是防止游戏在运行时崩溃
		init:function () {
			this.ready = false;
			this.img = new Image();
			this.img.src = 'background.jpg';

			this.img.onload = function() {
				Background.ready = true;
			}
		},
		draw:function () {
			if(this.ready){
				ctx.drawImage(this.img,0,0);
			}
		}
	};

	var Bricks = {
		gap: 2,
		col: 5,
		w: 80,
		h: 15,

		init:function () {
			this.row = 2+Hud.lv;
			this.total = 0;

			this.count = [this.row];
			for(var i = this.row;i--;){           //砖块数组由砖块的行列号数据所构成
				this.count[i] = [this.col];
			}
		},
		draw:function () {
			var i,j;
			for(i = this.row;i--;){
				for(j = this.col;j--;){
						if(this.count[i][j] !==false){	
							if(Ball.x >= this.x(j) && Ball.x <= (this.x(j)+this.w) && Ball.y >= this.y(i) && Ball.y <= (this.y(i) + this.h)){//判断小球是否与当前重绘的砖块发生了重叠
								this.collide(i,j);
								continue;
							}					
							ctx.fillStyle = this.gradient(i);
							ctx.fillRect(this.x(j),this.y(i),this.w,this.h);
					}
				}
			}
			if(this.total === (this.row * this.col)){
				Game.levelUp();
			}
		},
		collide: function(i,j){
			Hud.score += 1;
			this.total += 1;		//记录分数
			this.count[i][j] = false;    //如果发生重叠，将其设定为false，并将小球的y坐标取负
			Ball.sy = -Ball.sy;
		},
		x: function(row) {
			return (row * this.w) + (row * this.gap);
		},
		y: function(col) {
			return (col * this.h) + (col * this.gap);
		},

		//给砖块着色
		gradient: function (row) {
			 switch(row) {
                case 0: // purple
                    return this.gradientPurple ?
                        this.gradientPurple :
                        this.gradientPurple = this.makeGradient(row, '#bd06f9', '#9604c7');
                case 1: // red
                    return this.gradientRed ?
                        this.gradientRed :
                        this.gradientRed = this.makeGradient(row, '#F9064A', '#c7043b');
                case 2: // green
                    return this.gradientGreen ?
                        this.gradientGreen :
                        this.gradientGreen = this.makeGradient(row, '#05fa15', '#04c711');
                default: // orange
                    return this.gradientOrange ?
                        this.gradientOrange :
                        this.gradientOrange = this.makeGradient(row, '#faa105', '#c77f04');
            }
		},

		makeGradient: function (row,color1,color2){
			var y = this.y(row);
			var grad = ctx.createLinearGradient(0,y,0,y+this.h);//在特定位置创建一个新的线性变换
			grad.addColorStop(0,color1);  //渐变起始颜色为color1,终止颜色为color2
			grad.addColorStop(0,color2);

			return grad;
		}
	};

	var Ball = {
		r: 10, //半径		
		init:function () {  //只包含一些如果游戏当前正在运行则需要重置的值
			this.x = 120;
			this.y = 120;
			this.sx = 1 + (0.4 * Hud.lv);     //x,y轴上的速度增量,与关卡匹配
			this.sy = -1.5 - (0.4 * Hud.lv);
		},
		draw:function () {
			this.edges();
			this.collide();
			this.move();

			ctx.beginPath();
			ctx.arc(this.x,this.y,this.r,0,2 * Math.PI);
			ctx.closePath();
			ctx.fillStyle = '#eee';
			ctx.fill();
		},

		//配置小球运动逻辑部分
		edges: function() {        //小球与容器碰撞检测
			if(this.y < 1){   //游戏容器的上边界
				this.y = 1;
				this.sy = -this.sy;
			} else if (this.y > Game.height){  //游戏容器的下边界
				this.sy = this.sx = 0;
				this.y = this.x = 1000;
				Screen.gameover();
				canvas.addEventListener('click',Game.restartGame,false);
				return;
			}

			if(this.x < 1) { //游戏容器的左边界
				this.x = 1;
				this.sx = - this.sx;
			} else if (this.x > Game.width) { //游戏容器的右边界
				this.x = Game.width-1;
				this.sx = -this.sx;				
			}
		},
		collide: function() {  //小球与球拍碰撞
			if (this.x >= Paddle.x && this.x <=(Paddle.x + Paddle.w) && this.y >= Paddle.y && this.y <= (Paddle.y+Paddle.h)){
				this.sx = 7 * ((this.x-(Paddle.x+Paddle.w/2))/Paddle.w); 
				this.sy = -this.sy;
			}
		},
		move: function() {
			this.x += this.sx;
			this.y += this.sy;
		}
	};

	var Paddle = {
		w: 90,
		h: 20,
		r: 9,		
		init:function () {
			this.x = 100,
			this.y = 210,
			this.speed = 4;         
		},
		draw:function () {
			this.move();

			ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.arcTo(this.x + this.w, this.y, this.x + this.w, this.y + this.r, this.r);
            ctx.lineTo(this.x + this.w, this.y + this.h - this.r);
            ctx.arcTo(this.x + this.w, this.y + this.h, this.x + this.w - this.r, this.y + this.h, this.r);
            ctx.lineTo(this.x + this.r, this.y + this.h);
            ctx.arcTo(this.x, this.y + this.h, this.x, this.y + this.h - this.r, this.r);
            ctx.lineTo(this.x, this.y + this.r);
            ctx.arcTo(this.x, this.y, this.x + this.r, this.y, this.r);
            ctx.closePath(); //关闭路径。这能防止出现一些图像撕裂和对象斯消失等问题

            ctx.fillStyle = this.gradient();
            ctx.fill();
		},
		move:function () {
			//if(this.x > - (this.w/2) && this.x < Game.width - (this.w/2))
			if(Ctrl.left && (this.x < Game.width-(this.w/2))){
				this.x += this.speed;
			} else if (Ctrl.right && this.x > -this.w/2){
				this.x += -this.speed;
			}
		},

		gradient:function() {
			if(this.gradientCache){
				return this.gradientCache;
			}

			this.gradientCache = ctx.createLinearGradient(this.x,this.y,this.x,this.y+20);
			this.gradientCache.addColorStop(0,'#eee');
			this.gradientCache.addColorStop(1,'#999');

			return this.gradientCache;
		}
	};

	var Ctrl = {
		init: function () {
			window.addEventListener('keydown',this.keyDown,true);
			window.addEventListener('keyup',this.keyUp,true);

			window.addEventListener('mousemove',this.movePaddle,true);

			Game.canvas.addEventListener('touchshart',this.movePaddle,false);
			Game.canvas.addEventListener('touchmove',this.movePaddle,false);
			Game.canvas.addEventListener('touchmove',this.stopTouchScroll);
		},
		keyDown: function(event) {
			switch(event.keyCode) {
				case 39:
					Ctrl.left = true;
					break;
				case 37:
					Ctrl.right = true;
					break;
				default:
					break;
			}
		},
		keyUp: function(event) {
			switch(event.keyCode) {
				case 39:
					Ctrl.left = false;
					break;
				case 37:
					Ctrl.right = false;
					break;
				default:
					break;
			}
		},
		movePaddle: function (event) {
			var mouseX = event.pageX;   //鼠标指针x坐标
			var canvasX = Game.canvas.offsetLeft;   //从浏览器窗口的左边界到Canvas元素的距离

			var paddleMid = Paddle.w/2;

			if(mouseX > canvasX && mouseX < canvasX + Game.width){
				var newX = mouseX - canvasX;
				newX -= paddleMid;   //偏移球拍的新位置，以便让球拍与鼠标指针对齐
				Paddle.x = newX; //劫持已有的Paddle对象，更换新的坐标值
			}
		},		
		stopTouchScroll: function(event) {     //触摸滚动有点问题
			event.preventDefault();
		}
	};

	var Hud = {
		init: function() {
			this.lv = 1;
			this.score = 0;
		},
		draw: function() {
			ctx.font = '12px helvetica,arial';
			ctx.fileStyle = 'white';
			ctx.textAlign = 'left';
			ctx.fillText('Score:'+this.score,5,Game.height-5);
			ctx.textAlign = 'right';
			ctx.fillText('Lv:'+this.lv,Game.width-5,Game.height-5);
		}
	};

	window.onload = function () {            //window.onload 的作用是防止代码在其他资源完全加载前运行，否则Canvas代码就会容易导致游戏崩溃
		Game.setup();
	};
})();