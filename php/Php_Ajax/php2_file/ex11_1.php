<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>获取文件信息</title>
</head>
<body>
	<table border="1" width="60%" align="center">
		<caption>文件信息</caption>
		<?php 
			$str=$_POST["name1"];
			if(strlen($str)==0){
				echo "请选择要打开的文件";
			}
			else{
				echo "<tr><td>文件大小</td><td>";
				echo filesize($str)."</td></tr>";
				echo "<tr><td>文件类型</td><td>";
				echo filetype($str)."</td></tr>";
				echo "<tr><td>文件名称</td><td>";
				echo basename($str)."</td></tr>";
				echo "<tr><td>文件所在路径</td><td>";
				echo dirname($str)."</td></tr>";
				echo "<tr><td>文件修改时间</td><td>";
				echo date('F d Y H:i:s.',fileatime($str))."</td></tr>";
				echo "</table>";
				$file=fopen($str,"r") or exit("无法打开文件");
				echo $str."文件已经打开，可以读取或写入内容";
			}
		 ?>
	</table>
</body>
</html>