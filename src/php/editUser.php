<?php
    require './config.php';
    header ("Access-CONtrol-Allow-Origin:http://localhost:3000");

    session_start();
    if($_SERVER['REQUEST_METHOD']=='POST'){
        $email = $_POST['email'];
        $dob = $_POST['dob'];
        $gender = $_POST['gender'];
        $uid = $_POST['uid'];

        $email = filter_var($email,FILTER_VALIDATE_EMAIL);
        $res = "";

        if(filter_var($email,FILTER_VALIDATE_EMAIL)){
            $dbCon = new mysqli($dbServername,$dbUsername,$dbPass,$dbname);
            if($dbCon->connect_error){
                die("Connection Error");
            }else{
                $updateCmd = "UPDATE user_tb SET email='$email', birthday='$dob', gender='$gender' WHERE user_uid='$uid';";
                $result = $dbCon->query($updateCmd) or die("command error");
                if($result===true){
                    $dbCon->close();
                    $res = "DONE";
                }
            }
        }else{
           $res = "ERR";
        }
       echo json_encode($res);
    }
?>