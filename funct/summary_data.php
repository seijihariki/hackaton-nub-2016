<?php
	error_reporting(E_ERROR | E_PARSE);
	$server = "mysql.hostinger.com.br";
	$dbuser = "u658685063_adm";
	$dbpass = "senhadb";
	$dbname = "u658685063_users";

	$userid 	= $_SESSION['userid'];
	$user 		= $_SESSION['user'];
	$b_day 		= $_POST['base_day'];
	$b_mon      = $_POST['base_mon'];
	$b_year		= $_POST['base_year'];
	$t_int		= $_POST['time_int'];

	$total      = "";
	$health		= "";
	$bills		= "";
	$food		= "";
	$fun 		= "";


	$connection = mysqli_connect($server, $dbuser, $dbpass, $database);
	
	if (!$connection) {
		die("{\"status\": \"error\"}");
	}

	$health_results = mysqli_query($connection, "SELECT transactions.value ");
?>