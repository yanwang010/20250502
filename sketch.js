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
