<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>验证信用卡号</title>
	<!-- 
		检查信用卡号码是否为16位 
		将信用卡号码切割成16个数字
		将上面切割的所有数字，由左至右起记，每逢单数位置的数值乘以2
		将加总后所有解雇都切割成个别数字再相加
		将上面球的的总数求出10的余数，如果余数是”0“便表示信用卡号码正确，否则便是错误
	-->
</head>
<body>
	<center>
		<h3>验证信用卡号码</h3>
		<form action="ex8_1.php" method="post">
			信用卡号码：<input type="text" name="name1"><br>
			<input type="submit" value="验证">
		</form>
	</center>
</body>
</html>