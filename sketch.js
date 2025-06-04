let video;
let handpose;
let predictions = [];

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", gotResults);
}

function modelReady() {
  console.log("Handpose model loaded!");
}

function gotResults(results) {
  predictions = results;
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    let hand = predictions[0];
    // 拇指末端: landmarks[4]，食指末端: landmarks[8]
    let thumbTip = hand.landmarks[4];
    let indexTip = hand.landmarks[8];

    // 畫出拇指與食指末端
    fill(255, 0, 0);
    noStroke();
    ellipse(thumbTip[0], thumbTip[1], 20, 20);
    fill(0, 0, 255);
    ellipse(indexTip[0], indexTip[1], 20, 20);

    // 顯示座標
    fill(0);
    textSize(16);
    text(`Thumb: (${nf(thumbTip[0],1,0)}, ${nf(thumbTip[1],1,0)})`, 10, height - 40);
    text(`Index: (${nf(indexTip[0],1,0)}, ${nf(indexTip[1],1,0)})`, 10, height - 20);
  }
}
