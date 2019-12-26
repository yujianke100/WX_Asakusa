<?php
    $code=$_REQUEST["code"];//接收参数
    $num=$_REQUEST["num"];//接收参数
    $mode=$_REQUEST["mode"];
    $url = "https://api.weixin.qq.com/sns/jscode2session?appid=xxx&js_code={$code}&grant_type=authorization_code";
    $html = file_get_contents($url);
    $data = json_decode($html, TURE);
    $openid = $data['openid'];
    
    $conn = mysqli_connect("localhost", "asakusa", "WMKfrLamEb", "asakusa");
    mysqli_query($conn,'set names utf8');//设置字符集
    if($mode){
        $sql = "SELECT context FROM userInfo WHERE (openid = '$openid')";//查询这个表特定值
        $result = mysqli_query($conn, $sql);//结果
        if ($result->num_rows > 0) {
            $row=mysqli_fetch_row($result);
            printf("%d",$row[0]);
        } 
        else {
            $sql = "INSERT INTO userInfo(`openid`,`context`)  VALUES ('$openid', '$num')";
            if (mysqli_query($conn, $sql)) {
                echo "0";
            } 
            else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
            }
        }
    }
    else{
        $sql = "DELETE FROM userInfo WHERE (openid = '$openid')";//查询这个表特定值
        mysqli_query($conn, $sql);
    }

    mysqli_close($conn);
?>
