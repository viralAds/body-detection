let video;
let poseNet;
let poses = [];
let playing = false;
let button = null;
let myButton;
let img;
let img2;

// set cursor to wait until video elment is loaded
document.body.style.cursor = "wait";

function setup() {
  // noCanvas();
  createCanvas(1280, 720);

  video = createVideo(["berry.mp4"]);
  video.size(1280, 720);

  button = createButton("play");
  button.mousePressed(toggleVid);

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
  background(200, 200, 0);
  image(video, 0, 0, 1280, 720);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    // console.log(pose);
    let rightShoulder = pose.rightShoulder;
    let rightHip = pose.rightHip;
    let leftHip = pose.leftHip;
    let Knee = pose.leftKnee;

    let suitX = (rightShoulder.x + rightHip.x) / 2;
    let suitY = (rightShoulder.y + rightHip.y) / 2;

    let pantX = (Knee.x + leftHip.x) / 2;
    let pantY = (Knee.y + leftHip.y) / 2;

    // width of the stroke
    strokeWeight(2);
    // Disables filling geometry
    noFill();

    if (
      (video.elt.currentTime > 5 && video.elt.currentTime < 9) ||
      (video.elt.currentTime > 12 && video.elt.currentTime < 15) ||
      (video.elt.currentTime > 24 && video.elt.currentTime < 33) ||
      (video.elt.currentTime > 45 && video.elt.currentTime < 56)
    ) {
      ellipse(pantX, pantY, 5, 5);
      line(pantX, pantY, 1000, 300);
      let s = "Buy Now";
      fill("white");
      strokeWeight(0);
      textSize(18);
      text(s, 1000, 290, 100, 100);
    }

    if (
      (video.elt.currentTime >= 1 && video.elt.currentTime < 8) ||
      (video.elt.currentTime > 12 && video.elt.currentTime < 33) ||
      (video.elt.currentTime > 40 && video.elt.currentTime < 50) ||
      (video.elt.currentTime > 54 && video.elt.currentTime < 56)
    ) {
      ellipse(suitX, suitY, 5, 5);
      line(suitX, suitY, 300, 150);
      let s = "Buy Now";
      fill("white");
      strokeWeight(0);
      textSize(18);
      text(s, 290, 140, 100, 100);
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
      stroke(0, 0, 0);
      //   line(
      //     partA.position.x,
      //     partA.position.y,
      //     partB.position.x,
      //     partB.position.y
      //   );
    }
  }
}
function mouseClicked(event) {
  console.log(event.x, event.y);
  if (event.x >= 1030 && event.x <= 1080 && event.y >= 300 && event.y <= 390) {
    document.getElementById("popup1").style.display = "block";
  }

  if (event.x >= 320 && event.x <= 365 && event.y >= 155 && event.y <= 189) {
    document.getElementById("popup1").style.display = "block";
  }
}
document.getElementById("cross1").addEventListener("click", function (e) {
  e.stopPropagation();
  console.log("run");
  document.getElementById("popup1").style.display = "none";
});

document.getElementById("cross2").addEventListener("click", function (e) {
  e.stopPropagation();
  console.log("run");
  document.getElementById("popup2").style.display = "none";
});

function throwfunc() {
  window.location.href = "https://www.ekaleido.co/";
}
