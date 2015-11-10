<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>中文时间显示实例</title>
</head>
<body bgcolor="#d6dff7">
	<img src="grass.jpg">
	<?php 
		date_default_timezone_set('Asia/Shanghai');
		$cweekday=array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
		$now=getdate(time());
		$cur_wday=$now['wday'];
		$showtime=date("北京时间y年m月d日h:i:s $cweekday[$cur_wday]");
		echo $showtime;
	 ?>
</body>
</html>