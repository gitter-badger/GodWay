<?php 
	$name1=$_POST["name1"];
	if(strlen($name1)==0)
		echo "请输入要比较的数字";
	else{
		$num=rand();
		echo "比较数字为：";
		echo $num;
		$name1=1+$name1;
		if($name1>$num)
			echo "<br>输入数<span style='font-size:25;'>较大</span>";
		if($name1<$num)
			echo "<br>输入数<span style='font-size:25;'>较小</span>";
		if($name1==$num)
			echo "<br>输入数<span style='font-size:25;'>相等</span>";
	}
 ?>