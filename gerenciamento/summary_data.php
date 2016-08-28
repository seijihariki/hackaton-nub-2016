<?php
	error_reporting(E_ERROR | E_PARSE);
	$server = "mysql.hostinger.com.br";
	$dbuser = "u658685063_adm";
	$dbpass = "senhadb";
	$dbname = "u658685063_users";

	$userid   = $_SESSION['userid'];
	$user = $_SESSION['user'];
	$day;
	$time_int;
	$total;
	$bills;
	$food;
	$fun;


	$connection = mysqli_connect($server, $dbuser, $dbpass, $database);
	
	if (!$connection) {
		die("{\"status\": \"error\"}");
	}

	$cids = mysqli_query($connection, "SELECT classes.id where classes.parent_class='1';");
	$health = mysqli_query($connection, "SELECT transactions.value from transactions inner join classes on transaction.cid =".$cids.";"


?>