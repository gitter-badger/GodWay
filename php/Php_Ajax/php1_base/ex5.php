<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>字符串加密码(Encryption)</title>	
</head>
<body>
	<?php 
		$str="I love xia";
		echo md5($str);//系统自带md5加密函数，这是一个"单向"散列算法，没有办法将使用md5()散列的数据进行逆散列
		echo "<br>";

		//自定义机密函数(与php_decrypt函数对应),此函数只对应小写字母和数字，待拓展
	    function php_encrypt($str)
		{
			$encrypt_key='abcdefghijklmnopqrstuvwxyz1234567890';
			$decrypt_key='qwertyuioplkmjnhbgvfcdxsza9708546321';
			if(strlen($str)==0) return false;
			for($i=0;$i<strlen($str);$i++){
				for($j=0;$j<strlen($encrypt_key);$j++){
					if($str[$i]==$encrypt_key[$j]){
						$enstr.=$decrypt_key[$j];
						break;
					}
				}
			}
			return $enstr;
		}

		function php_decrypt($str)
		{
			$encrypt_key='abcdefghijklmnopqrstuvwxyz1234567890';
			$decrypt_key='qwertyuioplkmjnhbgvfcdxsza9708546321';
			if(strlen($str)==0) return false;
			for($i=0;$i<strlen($str);$i++){
				for($j=0;$j<strlen($decrypt_key);$j++){
					if($str[$i]==$decrypt_key[$j]){
						$enstr.=$encrypt_key[$j];
						break;
					}
				}
			}
			return $enstr;
		}

		$str="hello world";
		echo "字符串加密之前:".$str."<br>";
		$str1=php_encrypt($str);
		echo "字符串加密之后:".$str1."<br>";
		$str2=php_decrypt($str1);
		echo "字符串解密之后:".$str2."<br>";
	 ?>
</body>
</html>