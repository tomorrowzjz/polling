// 引入所需的模块
const express = require('express');
const http = require('http');

// 创建 Express 应用和 HTTP 服务器
const app = express();

// 静态资源中间件，将静态资源放在 static 文件夹下
app.use(express.static('static'));

// 轮询示例
app.get('/polling', (req, res) => {
  console.log('轮询连接成功！');

  // 模拟异步数据更新
  setTimeout(() => {
    res.json({ message: '轮询服务器有新的数据！' });
  }, 5000); // 模拟5秒的数据更新间隔
});

// 启动服务器
const PORT = 3338;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
