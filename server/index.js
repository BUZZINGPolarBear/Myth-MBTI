const express = require('express') //express를 설치했기 때문에 가져올 수 있다.
var expressForStatic = require("express");
const path = require('path');
const app = express()

// 정적 파일 불러오기
app.use(expressForStatic.static(path.join(__dirname + "/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
})

app.listen(8080)