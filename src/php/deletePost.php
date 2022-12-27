<?php
    include "./config.php";
    header ("Access-CONtrol-Allow-Origin:http://localhost:3000");

    if($_SERVER['REQUEST_METHOD']=='POST'){
        $uid = $_POST['uid'];
        $dbCon = new mysqli($dbServername, $dbUsername, $dbPass, $dbname);
        if($dbCon->connect_error){
          echo "Connection Failed".$dbCon->connect_error;
        }else{
          $delcmd = "DELETE FROM post_tb WHERE post_uid='$uid'";
          if($dbCon->query($delcmd) === TRUE){
            echo "Deleted";
          }else{
            echo "Error";
          }
        }
    }
?>