<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>删除字符串中的空白</title>	
</head>
<body>
	<?php 
		$str="This line contains\tliberal \r\n use of whitespace.\n\n";
		echo $str;
		//去掉开始和结束的空白
		$str=trim($str);
		//去掉连续多个空白区域
		$str=preg_replace('/\s(?=\s)/','',$str);
		//最后去掉非space的空白，用一个空格代替
		$str=preg_replace('/[\n\r\t]/', ' ', $str);
		echo "<pre>{$str}</pre>";
	 ?>

</body>
</html>