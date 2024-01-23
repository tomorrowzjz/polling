// 引入所需的模块
const express = require('express');
const http = require('http');

// 创建 Express 应用和 HTTP 服务器
const app = express();

// 静态资源中间件，将静态资源放在 static 文件夹下
app.use(express.static('static'));



app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  setInterval(() => {
    const price = Math.random() * 100;
    res.write(`data: 文字${price}\n\n`);
  }, 5000);
});


// 启动服务器
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
