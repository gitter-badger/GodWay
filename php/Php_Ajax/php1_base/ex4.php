<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>字符串反转</title>
	<!-- 从length-1开始截取一个长度的字符 -->
</head>
<body>
	<?php 
		$str="this is a book";
		$len=strlen($str);
		$i=$len;
		while($i>0)		
		{
			$i=$i-1;
			echo substr($str,$i, 1);//表示截取字符串$str指定位置字符并输出;			
			// 第二个参数如果为空，默认为"0".如果是负数，表示从后往前计数
			// 第三个参数如果是正数，表示截取的长度，如果省略，则截取到最后。如果是负数，表示从后往前截取到的位置
		}
		echo "<hr color=blue>";


		 // 在PHP中字符串使用strlen()函数得到汉字为双字节的长度，如果用上面方法逐个反转输出，会出现乱码；
		 //对截取字符床进行判断，如果是汉字可以按照双字节处理
		function reveser_c($str){
			$nstr="";
			for($i=strlen($str);$i>=0;$i--){
				if(ord(substr($str,$i,1))>0xao){#如果是汉字就自末向前输出接连的两个字符
					//ord 返回字符串的首个字符的 ASCII 值，0xao表示汉字的开始
					$i-=1;
					//echo " | d:".$i." | d2".($i+1);
					$nstr.=$str[$i].$str[$i+1];
				}else{#单字节
					//echo " | s:".$i;
					$nstr.=$str[$i];
				}
			}
			return $str;
		}

		//包含汉字的字符串递归反转
		// public function reveser_rc($str)
		// {
		// 	if(strlen($str)>0){
		// 		if(ord(substr($str, $i,1))>0xao){
		// 			reveser_rc(substr($str, 2));
		// 			echo substr($str, 1)."";
		// 		}else{
		// 			reveser_rc(substr($str, 1));
		// 			echo substr($star,0,1)."";
		// 		}
		// 	}

		// }

		echo reveser_c("hello 天行健，君子自强不息");
	 
	 ?>
			

	 


</body>
</html>