<?php 	
	$str=$_POST["name1"];
	$filename=$str;
	$fe=fopen($filename, "rt");
	while (!feof($fe)) {
		$text=fgets($fe);
		echo $text;
	}
	fclose($fe);
	
	// file(filename);//将文件读入一个数组中，作为数组返回
	// file_get_contents(filename);//将整个文件读入一个字符串中
	// readfile(filename);
	// fscanf(handle, format);
	// fgetc(handle);
	// fgetcsv(handle);
	// fgetss(handle);
	// fread(handle, length);   

 ?>