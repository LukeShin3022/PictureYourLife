<?php
    include "./config.php";
    header("Access-Control-Allow-Origin: http://localhost:3000");

    if($_SERVER['REQUEST_METHOD']=='POST'){
        session_start();
        $dbCon = new mysqli($dbServername,$dbUsername,$dbPass, $dbname);
        if($dbCon->connect_error){
            echo "Connection Failed".$dbCon->connect_error;
        }else{
            $array = [];
            $imgCmd = "SELECT * FROM post_tb ORDER BY post_date DESC " ;
            $result = $dbCon->query($imgCmd);
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){
                    array_push($array, $row);
                }
                echo json_encode($array);
            }else{
                echo "No data";
                $dbCon->close();
            }
        }
    }
?>