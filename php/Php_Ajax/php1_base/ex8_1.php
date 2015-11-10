<?php 
	function luhn_checker($card_num)
	{
		//将非数字的字符串移除
		$card_num=preg_replace("/\D|\s/","",$card_num);
		$sum=0;
		for($i=0;$i<strlen($card_num);$i++){
			$digit=substr($card_num,$i,1);
			if($i%2==0){
				//在单数位置的数乘以2
				$digit=$digit*2;
			}
			if($digit>9)$digit=$digit-9;
			$sum+=$digit;
		}
		if(($sum%10)==0&&strlen($card_num)==16){
			return true;		
		}else{
			return false;
		}
	}

	$str=$_POST["name1"];
	if(strlen(trim($str))==0 or(!is_numeric($str)))//is_numberic($str)用来检验变量是否为数字或数字字符串
	{
		echo "<span style='font-size:15;color:red'>请输入信用卡号</span>";
		exit;
	}
	if(luhn_checker($str)){
		echo "<span sytle='font-size:20'>信用卡号正确</span>";
	}else{
		echo "<span sytle='font-size:20'>信用卡号错误</span>";
	}
 ?>