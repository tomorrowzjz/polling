const express = require('express');
const WebSocket = require('ws');
const path = require('path');

// 创建Express应用程序
const app = express();

// 设置静态文件服务
app.use(express.static(path.join(__dirname, 'static')));

// 创建WebSocket服务器
const wss = new WebSocket.Server({ noServer: true });

// 保存客户端连接的集合
const clients = new Set();

wss.on('connection', (socket) => {
  console.log('WebSocket client connected');

  // 将新连接添加到集合中
  clients.add(socket);

  socket.on('message', (message) => {
    console.log('Received message:', message);
    socket.send('Server received your message: ' + message);
  });

  socket.on('close', () => {
    console.log('WebSocket client disconnected');
    // 在连接关闭时，从集合中移除连接
    clients.delete(socket);
  });
});

// 创建HTTP服务器
const server = app.listen(8081, () => {
  console.log('Backend server is running on port 8081');
});

// 将WebSocket服务器附加到HTTP服务器
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit('connection', socket, request);
  });
});

// 定时发送消息给所有客户端
setInterval(() => {
  const message = 'This is a server push message';
  // 遍历所有客户端连接并发送消息
  clients.forEach((client) => {
    client.send(message);
  });
}, 5000);
