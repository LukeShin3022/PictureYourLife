<?php
  include "./config.php";
  header ("Access-CONtrol-Allow-Origin:http://localhost:3000");

  if($_SERVER['REQUEST_METHOD']=='POST'){
      $uid = $_POST['uid'];
      $tags = $_POST['tags'];
      $addr = $_POST['addr'];

      $dbCon = new mysqli($dbServername, $dbUsername, $dbPass, $dbname);
      if($dbCon->connect_error){
          echo "Connection Failde".$dbCon->connect_error;
      }else{
          $editCmd = "UPDATE post_tb SET tags='$tags', addr='$addr' WHERE post_uid='$uid'";
          if($dbCon->query($editCmd) === true){
              $dbCon->close();
              echo "Edit";
          }else{
              echo "Error";
          }
      }
  }
?>