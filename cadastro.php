<?php
	error_reporting(E_ERROR | E_PARSE);
	$server = "mysql.hostinger.com.br";
	$dbuser = "u658685063_adm";
	$dbpass = "senhadb";
	$dbname = "u658685063_users";

	function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
	}	

	$connection = mysqli_connect($server, $dbuser, $dbpass, $database);
	
	if (!$connection) {
		die("{\"status\": \"error\"}");
	}

	$user   = $_POST['username'];
	$pass 	= $_POST["password"];

	$result = mysqli_query($connection, "SELECT id FROM users WHERE user=\"".$user."\";");
	

	if (mysqli_num_rows($result) == 1)
	{
		mysql_close($connection);
		exit("{status: already;}");
	} else {
		$salt = generateRandomString();
		$pass_hash = sha1($salt.$pass);
		$result = mysqli_query($connection, "INSERT INTO users (name,password,salt) VALUES (\"".$user."\",\"".$pass_hash."\",\"".$salt."\"");");
		if ($result)
		{
		mysql_close($connection);
		exit("{\"status\": \"OK\"}");
		} else {
			mysql_close($connection);
				die("{\"status\": \"error\"}");
		}	
	}


?>