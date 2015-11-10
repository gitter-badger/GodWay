<?php 

	/*
		flock(handle, operation);函数支持轻便的咨询文件锁定
		handle为一个已经打开的文件指针
		operation:
		1.要取得共享锁定（读取程序）	 LOCK_SH
		2.要取得独占锁定（写入程序）	 LOCK_EX
		3.要释放锁定（无论共享或独占）   LOCK_UN
		4如果你不希望flock()在锁定时堵塞 LOCK_NB

		fwrite(handle, string) 如果给出可选参数length，将只写入length个字符时停止。该函数返回写入的字符数，出错时返回false

	*/

	$str=$_POST["name1"];
	if(strlen($str)==0){
		echo "选择文件";
	}else{
		$fp=fopen($str, "w+");
		if(flock($fp, LOCK_EX)){
			fwrite($fp, "Write something here\n");
			echo "文件写入期间,已被锁定...";
			flock($fp, LOCK_UN);
			echo "文件写入完毕，锁定即将解除";
		}else{
			echo "不能锁定该文件";
		}
		fclose($fp);
	}
 ?>