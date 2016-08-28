<?php
	$server = "mysql.hostinger.com.br";
	$dbuser = "u658685063_adm";
	$dbpass = "senhadb";
	$dbname = "u658685063_users";

	$connection = mysqli_connect($server, $dbuser, $dbpass, $database);

	if (!$connection)
	{
		die("{\"status\": \"error\"}");
	}

	$name	= $_POST["name"];
	$value	= $_POST["value"];
	$desc	= $_POST["desc"];
	$categ	= $_POST["categ"];

	$result1 = mysqli_query($connection, "SELECT id FROM classes WHERE name=".$categ." AND uid=".$_SESSION["userid"].";");

	if (mysqli_num_rows($result) != 1)
	{
		die("{\"status\": \"error\"}");
	}
	$row = $result->fetch_assoc();
	$result1 = mysqli_query($connection, "INSERT INTO transactions (id, name, value, description, transaction_date) VALUES (".$_SESSION["userid"].",".$row["id"].",\"".$name."\",".$value.",\"".$desc."\", NOW());");

	if ($result1)
	{
		exit("{\"status\": \"OK\"}");
	} else {
		die("{\"status\": \"error\"}");
	}


?>