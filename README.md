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

---

# 前端語法操作 websocket 的部分 (原生 JS 支援)

## 建立 WebSocket 連線

當你需要與伺服器建立 WebSocket 連線時，你會使用 WebSocket API。例如：

```javascript
const socket = new WebSocket("wss://example.com/socket"); // wss:// 是加密版本
```

- wss:// 是 WebSocket 的加密協議，類似於 HTTPS。
- ws:// 是普通的非加密 WebSocket 協議。

2. 監聽連線事件
   WebSocket 連線建立後，你可以監聽連線狀態，並進行處理。

```javascript
socket.onopen = () => {
  console.log("WebSocket 已連線");
  // 可以在這裡發送資料到伺服器
  socket.send(JSON.stringify({ message: "Hello, Server!" }));
};

socket.onerror = (error) => {
  console.error("WebSocket 錯誤:", error);
};

socket.onclose = () => {
  console.log("WebSocket 連線已關閉");
};
```

- onopen: 當連線建立成功時觸發
- onerror: 當有錯誤時觸發
- onclose: 當連線關閉時觸發

`socket.readyState` – WebSocket 連線的狀態
`readyState` 屬性可以用來檢查 `WebSocket` 目前的狀態：

`0` – `CONNECTING`：WebSocket 連線建立中

`1 `– `OPEN`：WebSocket 已經連線，並可以發送或接收資料

`2` – `CLOSING`：WebSocket 正在關閉中

`3` – `CLOSED`：WebSocket 已經關閉，無法再發送資料

WebSocket API 主要語法整理
|語法| 說明|
|---|---|
|`new WebSocket(url)`| 建立 WebSocket 連線（url 是伺服器地址）
|`socket.onopen` |連線成功後觸發|
|`socket.onmessage` |伺服器發送資料時觸發|
|`socket.onerror` |連線錯誤時觸發|
|`socket.onclose` |連線關閉時觸發|
|`socket.send(data)` |發送資料到伺服器|
|`socket.close(code, reason)` |關閉連線，選擇性地傳遞狀態碼和關閉原因|
|`socket.readyState	`|查詢 WebSocket 目前的狀態|
|`socket.url` |查詢 WebSocket 連線的 URL|
|`socket.protocol` |查詢 WebSocket 連線使用的協議（如果有設定）|

### 例子：如何在前端處理 onmessage

假設我們有一個 WebSocket 連線，並且伺服器會發送 JSON 格式的資料，我們可以使用 onmessage 來接收並處理這些資料：

```javascript
// 建立 WebSocket 連線
const socket = new WebSocket("wss://example.com/socket");

// 當連線成功時
socket.onopen = function (event) {
  console.log("WebSocket 連線成功");
  // 可以在這裡發送資料
  socket.send(JSON.stringify({ action: "subscribe", channel: "news" }));
};

// 當伺服器發送訊息給我們時，觸發 onmessage 事件
socket.onmessage = function (event) {
  // 這裡的 event.data 是伺服器發送過來的資料
  const message = JSON.parse(event.data); // 假設伺服器回傳的是 JSON 格式的資料
  console.log("收到伺服器的資料:", message);

  // 根據伺服器回傳的資料進行相應的操作
  if (message.action === "newMessage") {
    alert("新訊息: " + message.content);
  }
};
```

#### 🔑 說明：

`socket.onmessage`：設定 `WebSocket` 連線接收到訊息時要執行的回呼函數。

`event` 物件：包含有關這次訊息的詳細資料，`event.data` 包含伺服器發送的資料。

你可以根據 `event.data` 的內容進行進一步處理。例如，伺服器可能發送的是 JSON 格式的資料，這時你可以使用 JSON.parse() 解析它。
