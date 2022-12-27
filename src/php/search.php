<?php 
    require './config.php';
    header("Access-Control-Allow-Origin: http://localhost:3000");
    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $keyword = $_POST["keyword"];
        $res = "";
        $dbCon = new mysqli($dbServername,$dbUsername,$dbPass,$dbname);
        if(isset($_POST["keyword"]) && (strlen($_POST["keyword"]) > 2)){
            $keyword = $_POST["keyword"];
            if($dbCon->connect_error){
                die("Connect error");
            }else{
                $resultArray = [];
                $searchPostCmd = "SELECT * FROM post_tb WHERE tags LIKE '%$keyword%'";
                $result = $dbCon->query($searchPostCmd);
                while($row = $result->fetch_assoc()){
                array_push($resultArray, $row);
                }
                echo json_encode($resultArray);
            }
        }else{
        if(strlen($_POST["keyword"]) <= 2 && strlen($_POST["keyword"]) > 0){
            $res = "Keyword is too short. Please enter more than 3 characters.";
        }else if(strlen($_POST["keyword"]) == 0){
            $res = "Please enter the keyword.";
        }
        if($dbCon->connect_error){
            die("Connect error");
        }else{
            $resultArray = [];
            $searchPostCmd = "SELECT * FROM post_tb";
            $result = $dbCon->query($searchPostCmd);
            while($row = $result->fetch_assoc()){
                array_push($resultArray, $row);
            }
        }
        }
    }else{
        if($dbCon->connect_error){
            die("Connect error");
        }else{
            $resultArray = [];
            $searchPostCmd = "SELECT * FROM post_tb";
            $result = $dbCon->query($searchPostCmd);
            while($row = $result->fetch_assoc()){
                array_push($resultArray, $row);
            }
        }
    }
    if($res != ""){
        echo $res;
    }
?>