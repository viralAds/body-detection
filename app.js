let video;
let poseNet;
let poses = [];
let playing = false;
let button = null;
let myButton;

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

	button = createButton("play");
	button.mousePressed(toggleVid);

	poseNet = ml5.poseNet(video, modelReady);
	poseNet.on("pose", function (results) {
		poses = results;
	});

	video.elt.addEventListener("loadeddata", function () {
		if (video.elt.readyState >= 2) {
			document.body.style.cursor = "default";
		}
	});
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

function modelReady() {}

function draw() {
	background(0, 0, 0);
	image(video, 0, 0, 1280, 720);
	drawKeypoints();
	drawSkeleton();
}

// A function to draw the skeletons
function drawSkeleton() {
	// Loop through all the skeletons detected
	for (let i = 0; i < poses.length; i++) {
		let skeleton = poses[i].skeleton;
		let pose = poses[i].pose;

		let leftHip = pose.leftHip;
		let Knee = pose.leftKnee;

		let pantX = (Knee.x + leftHip.x) / 2;
		let pantY = (Knee.y + leftHip.y) / 2;
		stroke(256, 256, 256);
		if (
			(video.elt.currentTime > 5 && video.elt.currentTime < 9) ||
			(video.elt.currentTime > 12 && video.elt.currentTime < 15) ||
			(video.elt.currentTime > 24 && video.elt.currentTime < 33) ||
			(video.elt.currentTime > 45 && video.elt.currentTime < 56)
		) {
			line(pantX, pantY, 1000, 300);
			ellipse(pantX, pantY, 5, 5);
			let s = "Buy Now";

			strokeWeight(1);
			textSize(18);
			text(s, 1000, 290, 100, 100);
		}

		// For every skeleton, loop through all body connections
		// for (let j = 0; j < skeleton.length; j++) {
		// 	let partA = skeleton[j][0];
		// 	let partB = skeleton[j][1];
		stroke(256, 256, 256);
		//   line(
		//     partA.position.x,
		//     partA.position.y,
		//     partB.position.x,
		//     partB.position.y
		//   );
		// 	}
	}
}
function drawKeypoints() {
	for (let i = 0; i < poses.length; i++) {
		let pose = poses[i].pose;

		let rightShoulder = pose.rightShoulder;
		let rightHip = pose.rightHip;
		// let leftHip = pose.leftHip;
		// let Knee = pose.leftKnee;

		let suitX = (rightShoulder.x + rightHip.x) / 2;
		let suitY = (rightShoulder.y + rightHip.y) / 2;

		// let pantX = (Knee.x + leftHip.x) / 2;
		// let pantY = (Knee.y + leftHip.y) / 2;

		noFill();
		strokeWeight(2);

		if (
			(video.elt.currentTime >= 1 && video.elt.currentTime < 9) ||
			(video.elt.currentTime > 12 && video.elt.currentTime < 33) ||
			(video.elt.currentTime > 40 && video.elt.currentTime < 50) ||
			(video.elt.currentTime > 54 && video.elt.currentTime < 56)
		) {
			line(suitX, suitY, 350, 160);
			ellipse(suitX, suitY, 5, 5);
			let s = "Buy Now";
			strokeWeight(1);
			textSize(18);
			text(s, 290, 140, 100, 100);
		}

		for (let j = 0; j < pose.keypoints.length; j++) {
			let keypoint = pose.keypoints[j];
			if (keypoint.score > 0.2) {
				fill(255, 0, 0);
			}
		}
	}
}

function mouseClicked(event) {
	if (event.x >= 1000 && event.x <= 1150 && event.y >= 290 && event.y <= 390) {
		document.getElementById("popup2").style.display = "block";
		toggleVid();
	}

	if (event.x >= 290 && event.x <= 430 && event.y >= 140 && event.y <= 200) {
		document.getElementById("popup1").style.display = "block";
		toggleVid();
	}
}

document.getElementById("cross1").addEventListener("click", function (e) {
	e.stopPropagation();
	toggleVid();
	document.getElementById("popup1").style.display = "none";
});

document.getElementById("cross2").addEventListener("click", function (e) {
	e.stopPropagation();
	toggleVid();
	document.getElementById("popup2").style.display = "none";
});

function throwfunc() {
	window.open("https://www.google.com/", "_blank");
}
