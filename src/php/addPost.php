<?php
include "./config.php";
header ("Access-CONtrol-Allow-Origin: *");

if($_SERVER['REQUEST_METHOD']=="POST"){
    $user_id = $_POST['userId'];
    $user_uid = $_POST['userUid'];

    $post_uid = uniqid('');
    
    // $post_date = $_POST['post_date'];
    $post_date = date('Y-m-d');
    $photo_src = $_FILES['photoSrc'];
    $tags = $_POST['tags'];
    $addr = $_POST['addr'];
    $imgExtension = pathinfo($photo_src['name'])['extension'];
    // print_r ($photo_src);
    $fileName = "/img/$user_id/";
    $saveDir = "../../public".$fileName;
    $imgDest = $fileName.str_replace(" ","_",$photo_src['name']);
    $saveFile = $saveDir.str_replace(" ","_",$photo_src['name']);
    if(!file_exists($saveDir)){
        mkdir($saveDir, 755, true);
    }
    // echo getimagesize($photo_src['tmp_name']);
    if(($imgExtension == "jpg" || $imgExtension == "jpeg" || $imgExtension == "png") && getimagesize($photo_src['tmp_name']) && move_uploaded_file($photo_src['tmp_name'],$saveFile )){
        
        $dbCon = new mysqli($dbServername, $dbUsername, $dbPass, $dbname);
        if($dbCon->connect_error){
            echo "Connection Failed".$dbCon->connect_error;
        }else{
            $addCmd = "INSERT INTO post_tb (user_id, user_uid, post_uid,post_date,photo_src,tags,addr)VALUES ('$user_id', '$user_uid','$post_uid','$post_date','$imgDest','$tags','$addr')";
            if($dbCon->query($addCmd) === true){
                $dbCon->close();
                echo "Added";
            }else{
                echo "Error".$post_uid;
            }
        }
     }else{
        echo "Error";
     }
}

?>