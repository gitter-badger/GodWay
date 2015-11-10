<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>计算两个数组并，交和差</title>
</head>
<body>
	<?php 
		//交集为：
		$array1 = array('a' =>"green","red","blue");
		$array2 = array('b' =>"green" ,"yellow","red" );
		$resule=array_intersect($array1, $array2);
		echo "<p style='font-style:35'>数组";
		print_r($array1);
		echo "和";
		print_r($array2);
		echo "的交集为<br>";
		print_r($resule);
		echo "<br>";//注意键名保持不变

		//差集为：
		$resule=array_diff($array1, $array2);
		echo "<p style='font-style:35'>数组";
		print_r($array1);
		echo "和";
		print_r($array2);
		echo "的差集为<br>";
		print_r($resule);
		echo "<br>";//注意键名保持不变		

		//并集为：
		$resule=array_merge($array1, $array2);
		echo "<p style='font-style:35'>数组";
		print_r($array1);
		echo "和";
		print_r($array2);
		echo "的并集为<br>";
		print_r($resule);
		echo "<br>";//如果输入的数组中有相同的字符串键名，则该键名后面的值将覆盖前一个值，如果数组包含数字键名，后面的值将不会覆盖原来的值，而是会附加到后面
		
	 ?>
</body>
</html>