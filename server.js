const express = require("express");
const redis = require("redis");


// 레디스 클라이언트 생성
const client = redis.createClient({
    host:"redis-server",
    port: 6379  
    //레디스 서버의 기본 port는 6379
})
//

const app = express();

// 브라우저 새로고침시 숫자 1씩 증가하는 부분 코딩
// 숫자는 0부터 시작
client.set("number", 0);
// 현재 숫자를 가져온 후에 1씩 올려줍니다.
app.get("/", (req, res) => {
    client.get("number", (err, number) => {
        // 화면에 표현해주는 부분
        res.send("숫자가 1씩 증가합니다. 숫자 : "+ number)
        client.set("number", parseInt(number) + 1)       
    })
})



app.listen(8080);
console.log("Server is running");