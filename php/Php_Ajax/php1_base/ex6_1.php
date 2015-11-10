<?php 
	$year=$_POST['name1'];
	$month=$_POST['name2'];
	$day=$_POST['name3'];
	if(strlen($year)==0 or strlen($month)==0 or strlen($day)==0){
		echo "请输入校验日期";
		exit;
	}
	if(checkdate($month, $day, $year))
		echo $year."-".$month."-".$day."是有效日期";
	else
		echo $year."-".$month."-".$day."是无效日期";
 ?>