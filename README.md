# **20250502**
![image](https://hackmd.io/_uploads/rkU-ahZexx.png)
https://yanwang010.github.io/20250502/






### 第一條指令
產生一個全螢幕的畫布，背景顏色為778da9，擷取攝影機的影像，正常的顯示在視窗的中間，影像畫面寬高為視窗大小的80%，請把程式碼寫在sketch.js內

**說明：**
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
**修改重點：**
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

### 第三條指令
利用createGraphics指令，產生一個與video視訊畫面一樣的寬高一樣的大小內容

**修改重點：**
createGraphics：

用於建立一個與 video 畫面大小相同的圖形緩衝區。
緩衝區的內容可以用來繪製或進一步處理影像。
graphics.image(capture, 0, 0, graphics.width, graphics.height)：

將攝影機影像繪製到圖形緩衝區中。
image(graphics, x, y, graphics.width, graphics.height)：

將圖形緩衝區的內容繪製到畫布上，並確保其居中顯示。
windowResized：

當視窗大小改變時，重新調整 capture 和 graphics 的大小。




```javascript=
let capture;
let graphics; // 用於儲存與 video 畫面相同大小的圖形緩衝區

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#778da9'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  // 建立與 video 畫面相同大小的圖形緩衝區
  graphics = createGraphics(capture.width, capture.height);
}

function draw() {
  background('#778da9'); // 確保背景顏色一致

  // 將影像繪製到圖形緩衝區，並左右翻轉
  graphics.push(); // 儲存當前狀態
  graphics.translate(graphics.width, 0); // 將原點移到右側
  graphics.scale(-1, 1); // 水平翻轉
  graphics.image(capture, 0, 0, graphics.width, graphics.height); // 繪製影像
  graphics.pop(); // 恢復狀態

  // 計算影像在畫布上的居中位置
  let x = (windowWidth - graphics.width) / 2;
  let y = (windowHeight - graphics.height) / 2;

  // 將圖形緩衝區的內容繪製到畫布上
  image(graphics, x, y, graphics.width, graphics.height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小

  // 重新建立與 video 畫面相同大小的圖形緩衝區
  graphics = createGraphics(capture.width, capture.height);
}

}
```

### 第四條指令
把graphics內的背景顏色為黑色，graphics在寬與高每隔20為一個單位，在每個單位內產生一個寬高為15的圓，圓的顏色採用capture相對位置的顏色
**修改重點：**
1.graphics.background(0)：

2.設定 graphics 的背景顏色為黑色。
雙層迴圈：
外層迴圈控制 x 軸位置，每次遞增 20 單位。
內層迴圈控制 y 軸位置，每次遞增 20 單位。
3.capture.get(x, y)：
從 capture 中取得對應位置的顏色。
4.graphics.fill(col)：
設定圓形的填充顏色為 capture 的顏色。
5.graphics.ellipse(x + 10, y + 10, 15, 15)：
在每個單位格的中心繪製一個寬高為 15 的圓。
```javascript=
let capture;
let graphics; // 用於儲存與 video 畫面相同大小的圖形緩衝區

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#778da9'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  // 建立與 video 畫面相同大小的圖形緩衝區
  graphics = createGraphics(capture.width, capture.height);
}

function draw() {
  background('#778da9'); // 確保背景顏色一致

  // 設定 graphics 的背景為黑色
  graphics.background(0);

  // 在 graphics 上繪製圓形，顏色來自 capture 的相對位置
  for (let x = 0; x < graphics.width; x += 20) {
    for (let y = 0; y < graphics.height; y += 20) {
      // 從 capture 中取得相對應位置的顏色
      let col = capture.get(x, y);
      graphics.fill(col); // 設定圓形顏色
      graphics.noStroke(); // 移除圓形邊框
      graphics.ellipse(x + 10, y + 10, 15, 15); // 繪製圓形，居中於單位格
    }
  }

  // 計算影像在畫布上的居中位置
  let x = (windowWidth - graphics.width) / 2;
  let y = (windowHeight - graphics.height) / 2;

  // 將圖形緩衝區的內容繪製到畫布上
  image(graphics, x, y, graphics.width, graphics.height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小

  // 重新建立與 video 畫面相同大小的圖形緩衝區
  graphics = createGraphics(capture.width, capture.height);

  // 將影像繪製到圖形緩衝區，並左右翻轉
  graphics.push(); // 儲存當前狀態
  graphics.translate(graphics.width, 0); // 將原點移到右側
  graphics.scale(-1, 1); // 水平翻轉
  graphics.image(capture, 0, 0, graphics.width, graphics.height); // 繪製影像
  graphics.pop(); // 恢復狀態
}
```
