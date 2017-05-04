<?php
error_reporting(E_ERROR | E_PARSE);
$server = "linux.ime.usp.br";
$dbuser = "brunobbs";
$dbpass = "";
$dbname = "brunobbs";

$connection = mysqli_connect($server, $dbuser, $dbpass, $database);

if (!$connection) {
    die("{\"status\": \"error\"}");
}

$user   = $_POST['username'];
$pass   = $_POST["password"];

$result = mysqli_query($connection, "SELECT salt FROM users WHERE user=".$user);
$salt = "";
if (mysqli_num_rows($result) == 1)
{
    $row = $result->fetch_assoc();
    $salt = $row["salt"];
} else {
    mysql_close($connection);
    exit("{\"status\": \"wrong\"}");
}

$pass_hash = sha1($salt.$pass);

$result = mysqli_query($connection, "SELECT * FROM users WHERE user=".$user." AND pass=".$pass_hash);

if (mysqli_num_rows($result) == 1)
{
    session_start();
    $_SESSION["user"] = $user;
    $row = $result->fetch_assoc();
    $_SESSION["userid"] = $row["id"];
    mysql_close($connection);
    exit("{\"status\": \"OK\"}");
} else {
    mysql_close($connection);
    exit("{\"status\": \"wrong\"}");
}
?>
