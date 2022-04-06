let video;
let poseNet;
let poses = [];
let playing = false;
let button = null;
let myButton;
let img;
let img2;
let x = 1;
let y = 1;
let x1 = 1;
let y1 = 1;
let easing = 0.05;
let buttonSuit = null;
let buttonPant = null;

// set cursor to wait until video elment is loaded
document.body.style.cursor = "wait";

function setup() {
  let parentDiv = createDiv();
  parentDiv.position(0, 0);
  parentDiv.style("position", "relative");
  parentDiv.style("height", "720px");
  parentDiv.style("width", "1280px");

  let suitDiv = document.getElementById("popup1");
  let pantDiv = document.getElementById("popup2");
  let canvas = createCanvas(1280, 720);

  parentDiv.child(canvas);
  parentDiv.child(suitDiv);
  parentDiv.child(pantDiv);

  video = createVideo(["berry.mp4"]);
  video.size(1280, 720);

  button = createButton("PLAY");
  button.mousePressed(toggleVid);
  button.style("width", "100%");
  button.style("height", "50px");

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poses = results;
  });

  video.elt.addEventListener("loadeddata", function () {
    // set cursor back to default
    if (video.elt.readyState >= 2) {
      document.body.style.cursor = "default";
    }
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function toggleVid() {
  if (playing) {
    video.pause();
    button.html("play");
  } else {
    video.play();
    button.html("pause");
  }
  playing = !playing;
}

function modelReady() {
  // select("#status").html("Model Loaded");
}

function draw() {
  background("#e0e0e0e");
  image(video, 0, 0, 1280, 720);

  // We can call both functions to draw all keypoints and the skeletons
  drawSkeleton();
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

    let rightShoulder = pose.rightShoulder;
    let rightHip = pose.rightHip;
    let suitX = (rightShoulder.x + rightHip.x) / 2 - x1;
    x1 += suitX * easing;
    let suitY = (rightShoulder.y + rightHip.y) / 2 - y1;
    y1 += suitY * easing;

    let leftHip = pose.leftHip;
    let Knee = pose.leftKnee;

    let pantX = (Knee.x + leftHip.x) / 2 - x;
    x += pantX * easing;
    let pantY = (Knee.y + leftHip.y) / 2 - y;
    y += pantY * easing;

    // Common
    if (
      (video.elt.currentTime > 5 && video.elt.currentTime < 8) ||
      (video.elt.currentTime > 12 && video.elt.currentTime < 13) ||
      (video.elt.currentTime > 24 && video.elt.currentTime < 33) ||
      (video.elt.currentTime > 45 && video.elt.currentTime < 50) ||
      (video.elt.currentTime > 54 && video.elt.currentTime < 55)
    ) {
      fill("white");
      ellipse(x, y, 5, 5);
      ellipse(x1, y1, 5, 5);

      noFill();
      strokeWeight(2);
      line(x, y, 1000, 300);
      line(x1, y1, 300, 150);

      // let buttonSuit = createButton("click me");
      // buttonSuit.position(1000, 290);
      // buttonSuit.mousePressed(showpopUp);

      // let buttonPant = createButton("click me");
      // buttonPant.position(290, 140);
      // buttonPant.mousePressed(showpopUp);
    }

    // Only Pants
    if (video.elt.currentTime > 50 && video.elt.currentTime < 53) {
      fill("white");
      ellipse(x, y, 5, 5);

      noFill();
      strokeWeight(2);
      line(x, y, 1000, 300);

      buttonPant = createButton("click me");
      buttonPant.position(1000, 290);
      buttonPant.mousePressed(showpopUp);
    }

    // Only Suit
    if (
      (video.elt.currentTime >= 1 && video.elt.currentTime < 5) ||
      (video.elt.currentTime > 13 && video.elt.currentTime < 24) ||
      (video.elt.currentTime > 40 && video.elt.currentTime < 45)
    ) {
      fill("white");
      ellipse(x1, y1, 5, 5);

      noFill();
      strokeWeight(2);
      line(x1, y1, 300, 150);

      buttonSuit = createButton("click me");
      buttonSuit.position(290, 140);
      buttonSuit.mousePressed(showpopUp);
    }

    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        // ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections

    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(256, 256, 256);
      //   line(
      //     partA.position.x,
      //     partA.position.y,
      //     partB.position.x,
      //     partB.position.y
      //   );
    }
  }
}
// function mouseClicked(event) {
//   if (event.x >= 1030 && event.x <= 1080 && event.y >= 300 && event.y <= 390) {
//     document.getElementById("popup1").style.display = "block";
//     toggleVid();
//   }
//   if (event.x >= 320 && event.x <= 365 && event.y >= 155 && event.y <= 189) {
//     document.getElementById("popup1").style.display = "block";
//     toggleVid();
//   }
// }
document.getElementById("cross1").addEventListener("click", function (e) {
  e.stopPropagation();

  document.getElementById("popup1").style.display = "none";
});

document.getElementById("cross2").addEventListener("click", function (e) {
  e.stopPropagation();

  document.getElementById("popup2").style.display = "none";
});

function throwfunc() {
  window.open("https://www.google.com/", "_blank");
}

function showpopUp() {
  console.log(45);
  document.getElementById("popup1").style.display = "block";
}
