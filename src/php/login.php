<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        session_start();
        $dbUsername = "root";
        $dbServername = "localhost";
        $dbPass = "";
        $dbName = "purl_db";
        $username = $_POST['uName'];
        $pass = $_POST['pass'];
        $IP = $_POST['gip'];

                $dbcon = new mysqli($dbServername, $dbUsername, $dbPass, $dbName);
                if($dbcon -> connect_error){
                    die("Error connection");
                }else{
                    $selectCmd = "SELECT * FROM user_tb WHERE user_id='$username';";
                    $result = $dbcon->query($selectCmd) or die($dbcon->error);

                    if($result-> num_rows > 0){
                        $user = $result -> fetch_assoc();

                        if(password_verify($pass, $user['password'])){
                            $logindate = date("Y-m-d");
                            $updateCmd = "UPDATE user_tb SET loginIP = '$IP', loginDate='$logindate' WHERE user_id='$username'";
                            $resultUpdate = $dbcon-> query($updateCmd);

                            $user['git'] = $IP;

                            $_SESSION['user'] = $user;
                            $user['sid'] = session_id();
                            echo json_encode($user);

                            exit();

                        }

                        else{
                            echo "username/password is wrong1";
                        }
                    }
                    else{
                        $dbcon->close();
                        echo "username/password is wrong2";
                    }
                }
            }
?>