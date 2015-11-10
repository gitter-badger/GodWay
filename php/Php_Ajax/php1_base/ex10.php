<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>数组的排序</title>
</head>
<body>
	<?php 
		$fruits = array("lemon","orange","banana","apple" );
		echo "排序前:";
		print_r($fruits);
		sort($fruits);
		echo "<br>数组排序后<br>";
		foreach ($fruits as $key => $val) {
			echo "fruits["."$key"."]=".$val."<br>";
		}

		// natsort(array)				;实现一个和人们通常对字母数字字符串进行排序的方法一样的排序
		// natcasesort(array)			;实现不区分大小写的natsort()方法
		// rsort(array)					;与sort()相反(降序)排序
		// asort(array)					;与sort()相同，只是索引保持与单元的关联
		// array_multisort(arr)			;对多个数组或者多维数组进行排序，关联(string)键名保持不变，但数字键名会被重新索引，成功返回true，失败返回false
		// arsort(array)				;与asort()一样保持键/值关联，但是逆序
		// ksort(array)
		// krsort(array)
		// usort(array, cmp_function)
	 ?>
</body>
</html>