$(function(){
    var videoheight=$('#video').height();   //video高度
    var topheight=$("#video").offset().top;  //距离顶部距离
    var weight = document.documentElement.clientHeight;
    var bottomheight = videoheight + topheight; 
    document.getElementById('video').play();
    var video = document.querySelector('video');
    $(document).scroll(function(){
        var top = document.documentElement.scrollTop;
        // console.log(topheight + videoheight - weight)
        // console.log("top="+top)
        // console.log(topheight)
        if ((top > topheight + videoheight - weight) && (top < topheight)){
            if (video.paused){
                console.log("play")
                video.play();
            }
                
        }
        else{
            console.log("pause")
            video.pause();
        }
        // console.log("videoheight= "+videoheight)
        // console.log("topheight= "+topheight)
        // console.log(document.documentElement.scrollTop)
    });
    
});
