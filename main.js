object=[];
status="";
function preload()
{
    video=createVideo('video.mp4');
}

function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
    
    video.hide();
}
function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
function modelLoaded()
{
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
   
}

function gotResult(error,results)
{
    if (error){
    console.log(error);
    }
    
        console.log(results);
        object=results;

    
}


function draw()
{
    image(video,0,0,640,420);
   if (status !=""){
    objectDetector.detect(video,gotResult);
    r=random(255);
    b=random(255);
    g=random(255);
       for(i=0; i<object.length; i++){
        document.getElementById("status").innerHTML="status:object detected";
        document.getElementById("no_of_objects").innerHTML="no. of objects detected are"+object.length;

        fill(r,g,b);
        percent=floor(object[i].confidence*100);
        text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
       }
   }

}
