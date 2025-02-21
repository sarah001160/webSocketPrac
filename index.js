// client 端
var ws;

// 監聽 click 事件
document.querySelector('#connect')?.addEventListener('click', (e) => {
  connect();
})

document.querySelector('#disconnect')?.addEventListener('click', (e) => {
  disconnect();
})

// 送出
document.querySelector('#sendBtn')?.addEventListener('click', (e) => {
  const msg = document.querySelector('#sendMsg');
  sendMessage(msg?.value);
})

function connect() {
  // Create WebSocket connection 建立 WebSocket connection
  ws = new WebSocket('ws://localhost:8080');

  // ws = new WebSocket('ws://192.168.17.35:58095') 
  // 在開啟連線時執行
  ws.onopen = () => {
    console.log('[open connection]');
    // Listen for messages from Server
    ws.onmessage = event => {
      console.log(`[Message from server]:\n %c${event.data}`, 'color: blue')
    }
  }
}

function sendMessage(msg) {
  // Send messages to Server
  ws.send(msg)
}

function disconnect() { // 關閉 WebSocket connection
  ws.close()
  // 在關閉連線時執行
  ws.onclose = () => console.log('[close connection]')
}