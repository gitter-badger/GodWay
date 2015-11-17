/*
	1.想要创建动画就需要使用计时器来周期性的绘制图形，通常使用javascript的setInterval()函数，但是这样做并不能实现最佳的用户体验。
	  setInterval()适合运行方程式或执行DOM操作，并不适用欲计算机密集型的动画循环；
	  浏览器厂商提供了一个javascipt函数requestAnimationFrame(),就可以把帧数显示在用户的电脑上，并非所有的浏览器都支持这个函数。
	  为此，Paul Irish开发了一个polyfill,能实现个浏览器对该函数的统一支持

	2.requestAnimationFrame()在显示每秒帧数方面并不稳定，他会根据计算机的处理能力来动态地显示当前每秒帧数，从而使显示帧数在1-60fps间波动，
	  如果返回帧数小于60fps，像x+=1这样的动画逻辑就会导致动画产生撕裂感，时快时慢。

	  一种方法：用setInterval()设置逻辑更新，在requestAnimationFrame()中设置绘制逻辑
	  另一种方法：更好一些，创建一个增量，然后将所有的移动值都乘以这个增量 比如：x+=1*delta.这样，动画的帧数就保持一致了
	  关于如何自定义增量，可以参考：createivejs.com/resources/requestanimationframe/

*/
