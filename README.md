# websocket 實作即時訊息

### 使用到的套件 (for 後端)

express

http-server

ws

### 操作這個專案+看 websocket 功能的方式

你的開發機需要先安裝好 node.js 的環境。

請先跑 server：node server.js

再跑 http-server -p XXX(port 號)

開啟三個分頁，每個分頁都要按 connect 按鈕。然後其中一個分頁打開 F12 檢查。

開始在三個分頁，各自在 input 輸入文字，並送出

你可以在 F12 的 console.log 看到三個分頁分別輸入的文字，這就是比擬聊天室功能

### 為什麼要安裝 ws 套件?

- 後端的部分: Node.js 寫 WebSocket server/client 需要安裝 ws 套件
- 前端不需要 npm 安裝 ws 套件喔，原生 JS 支援 WebSocket 寫法
