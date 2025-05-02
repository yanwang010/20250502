# **20250502**
### 第一條指令
產生一個全螢幕的畫布，背景顏色為778da9，擷取攝影機的影像，正常的顯示在視窗的中間，影像畫面寬高為視窗大小的80%，請把程式碼寫在sketch.js內

說明：
createCanvas(windowWidth, windowHeight)：建立全螢幕畫布。
background('#778da9')：設定背景顏色為 #778da9。
createCapture(VIDEO)：啟用攝影機並擷取影像。
capture.size(windowWidth * 0.8, windowHeight * 0.8)：設定影像大小為視窗的 80%。
image(capture, x, y, capture.width, capture.height)：將影像繪製在畫布中央。
windowResized：當視窗大小改變時，動態調整畫布和影像大小。

```javascript=
let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#778da9'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上
}

function draw() {
  background('#778da9'); // 確保背景顏色一致
  let x = (windowWidth - capture.width) / 2; // 計算影像水平居中的位置
  let y = (windowHeight - capture.height) / 2; // 計算影像垂直居中的位置
  image(capture, x, y, capture.width, capture.height); // 在畫布上繪製影像
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小
}
```
### 第二條指令
攝影機顯示的畫面左右顛倒，請調整
修改重點：
1.push() 和 pop()：用於儲存和恢復畫布的狀態，避免翻轉影響其他繪製內容。
2.translate(width, 0)：將畫布的原點移到右上角，為水平翻轉做準備。
3.scale(-1, 1)：水平翻轉畫布。
4.image(capture, x, y, capture.width, capture.height)：繪製翻轉後的影像。
```javascript=
let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#778da9'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上
}

function draw() {
  background('#778da9'); // 確保背景顏色一致
  let x = (windowWidth - capture.width) / 2; // 計算影像水平居中的位置
  let y = (windowHeight - capture.height) / 2; // 計算影像垂直居中的位置

  push(); // 儲存當前畫布狀態
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, x, y, capture.width, capture.height); // 在畫布上繪製翻轉後的影像
  pop(); // 恢復畫布狀態
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小
}
```

