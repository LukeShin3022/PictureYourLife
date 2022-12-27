<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");

    if($_SERVER["REQUEST_METHOD"]=="POST"){
        $dbUsername = "root";
        $dbServername = "localhost";
        $dbPass = "";
        $dbname = "purl_db";
        $dbCon = new mysqli($dbServername,$dbUsername,$dbPass,$dbname);

        $IP = $_POST['gip'];

        if($dbCon->connect_error){
            die("Connection error ".$dbCon->connect_error);
        }else{
            $pass= password_hash($_POST['pass'], PASSWORD_BCRYPT, ["cost"=>9]);
            $createDate = date("Y-m-d");

            $logindate = date("Y-m-d");

            $insertCmd = "INSERT INTO user_tb (user_id,password,email,gender,birthday,login_failure_num,create_id_date, loginIP, loginDate) VALUES ('".$_POST['user_id']."','".$pass."','".$_POST['email']."','".$_POST['gender']."','".$_POST['dob']."','0','$createDate', '$IP','$logindate')";
            
            $result = $dbCon->query($insertCmd);
            exit();
            $dbCon->close();
        }
    }
?>
