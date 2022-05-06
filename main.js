/*通过JSONP获取Bing每日图片url并设置为背景*/
var url = 'https://realwds-api.vercel.app/bing?count=8';
var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
var index = sessionStorage.getItem("index");
var $main = $('#main');
if(imgUrls == null){
    imgUrls = new Array();
    index = 0;		
    $.get(url,function (result) {
        images = result.data.images;
        console.log("数据为：");
        console.log(images);
        for (let i = 0; i < images.length; i++) {
            const item = images[i];
            imgUrls.push(item.url);
        }
        var imgUrl = imgUrls[index];
        var url = "https://www.bing.com"+imgUrl;
        $main.css("background", "url('"+url+"') center center no-repeat #666");
        $main.css("background-size", "cover");
        // $main.css("background-color", "rgba(0,0,0,0.2)");
        // $main.css("background", "rgba(255,255,255,0.5)");
        sessionStorage.setItem("imgUrls",JSON.stringify(imgUrls));
        sessionStorage.setItem("index",index);
        });
}else{
    if(index == 7)
        index = 0;
    else
        index++;
    var imgUrl = imgUrls[index];
    var url = "https://www.bing.com"+imgUrl;
    $main.css("background", "url('"+url+"') center center no-repeat #666");
    $main.css("background-size", "100% 100%");
    $main.css("opacity", "0.8");
    sessionStorage.setItem("index",index);
}