song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO); 
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw()
{
    image(video, 0 , 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song1.rate(0.5);
            song2.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "speed = 1.0x";
            song1.rate(1.0);
            song2.rate(1.0);
        }
        else if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song1.rate(1.5);
            song2.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "speed = 2.0x";
            song1.rate(2.0);
            song2.rate(2.0);
        }
        else if(rightWristY > 400 && rightWristY <= 500)
        {
            document.getElementById("speed").innerHTML = "speed = 2.5x"
            song1.rate(2.5);
            song2.rate(2.5);
        }
    }

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20); 
    InNumberleftWristY = Number(leftWristy);
    remove_decimals = floor(InNumberleftwristY);
    leftWristY_divide_1000 = remove_decimals/1000;
    volume = leftWristY_divide_1000 *2;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song1.setVolume(volume);
    song2.setVolume(volume);
    }
}

function play()
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
}