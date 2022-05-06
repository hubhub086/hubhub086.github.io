var iconMap = {
    a0 : '../weather/weather_icon/a0.jpg',
    a1 : '../weather/weather_icon/a1.jpg',
    a2 : '../weather/weather_icon/a2.jpg',
    a3 : '../weather/weather_icon/a3.jpg',
    a4 : '../weather/weather_icon/a4.jpg',
    a5 : '../weather/weather_icon/a5.jpg',
    a6 : '../weather/weather_icon/a6.jpg',
    a7 : '../weather/weather_icon/a7.jpg',
    a8 : '../weather/weather_icon/a8.jpg',
    a9 : '../weather/weather_icon/a9.jpg',
    a10 : '../weather/weather_icon/a10.jpg',
    a11 : '../weather/weather_icon/a11.jpg',
    a12 : '../weather/weather_icon/a12.jpg',
    a13 : '../weather/weather_icon/a13.jpg',
    a14 : '../weather/weather_icon/a14.jpg',
    a15 : '../weather/weather_icon/a15.jpg',
    a16 : '../weather/weather_icon/a16.jpg',
    a17 : '../weather/weather_icon/a17.jpg',
    a18 : '../weather/weather_icon/a18.jpg',
    a19 : '../weather/weather_icon/a19.jpg',
    a20 : '../weather/weather_icon/a20.jpg',
    a21 : '../weather/weather_icon/a21.jpg',
    a22 : '../weather/weather_icon/a22.jpg',
    a23 : '../weather/weather_icon/a23.jpg',
    a24 : '../weather/weather_icon/a24.jpg',
    a25 : '../weather/weather_icon/a25.jpg',
    a26 : '../weather/weather_icon/a26.jpg',
    a27 : '../weather/weather_icon/a27.jpg',
    a28 : '../weather/weather_icon/a28.jpg',
    a29 : '../weather/weather_icon/a29.jpg',
    a30 : '../weather/weather_icon/a30.jpg',
    a31 : '../weather/weather_icon/a31.jpg',
    a32 : '../weather/weather_icon/a32.jpg',
    a33 : '../weather/weather_icon/a33.jpg',
    a34 : '../weather/weather_icon/a34.jpg'
}

var jsonHandler = function(data, oneDay){
    var when = document.querySelector('#'+oneDay);
    var theFirstThreeDays = {"today": "今天", "tomorrow": "明天", "thirdday": "后天"};
    if ( oneDay in theFirstThreeDays ){
        when.textContent = theFirstThreeDays[oneDay] + '(' + data[oneDay].time.split(' ')[0] + ')';
    }
    else{
        when.textContent = data[oneDay].time.split(' ')[0];
    }
    document.querySelector('#'+oneDay+"temp").textContent = "温度:" + data[oneDay].temp;
    document.querySelector('#'+oneDay+"condition").textContent = data[oneDay].condition;  //显示当前具体天气状况，晴，多云等
    var wind = data[oneDay].wind;   //显示当前风力等级
    //替换字符实体
    wind = wind.replace(/&lt;/, "<");
    wind = wind.replace(/&gt;/, ">");
    document.querySelector('#'+oneDay+"wind").textContent = wind;
    document.getElementById(oneDay+"Img").src = iconMap[data[oneDay].imgs[0]];
}

var jsonShowAll = function(weatherInfo){
    /*根据网页返回数据判断是否搜索到城市*/
    if (weatherInfo.data.weather.content != undefined ){
        document.querySelector('#errorNameWarning').textContent = "";
        var data = weatherInfo.data.weather.content;
        // 表头信息
        document.querySelector('.lunar').textContent = data.today.time.split(' ')[1] + ' 农历 ' + data.calendar.lunar; //显示日期
        if (data.calendar.festival != false)
        {
            var festival = '(' + data.calendar.festival + ')';
            document.querySelector('.lunar').textContent += festival;  //显示节日
        }
        var cityName = document.querySelector('.city').value;
        document.querySelector('.cityShow').textContent = '当前城市: ' + cityName;  //显示当前城市
        // 未来五天详细信息
        var featureDays = ["today", "tomorrow", "thirdday", "fourthday", "fifthday"];
        for (var day of featureDays){
            jsonHandler(data, day);
        }
        //更多信息链接
        document.querySelector('#moreInformation').textContent = '更多信息'
        document.getElementById('moreInformation').href = 'https://weathernew.pae.baidu.com/weathernew/pc?query=' + encodeURI(cityName+'天气') + '&srcid=4982';
    }
    else{
        //显示错误信息
        document.querySelector('#errorNameWarning').textContent = "未查询到" + document.querySelector('.city').value +'请重新输入!'
    }
}

/*  页面加载完后自动执行注册的JS脚本  */
// $(document).ready(function(){
//     $.getJSON("0502.json", jsonShowAll);//此方法只能访问同域的地址
// })

var search = function(){
    var city = document.querySelector('.city').value;   //得到要搜索的城市
    //通过JSONP实现跨域请求
    var jsonData = document.createElement("script");
    jsonData.src = "https://www.baidu.com/home/other/data/weatherInfo?city="+encodeURI(city)+"&&callback=jsonShowAll";
    document.querySelector("head").appendChild(jsonData);  //开始访问资源并处理
}
//////////////////////////////////////////////////////////////////////////////////////////////
/*通过JSONP获取Bing每日图片url并设置为背景*/
var url = 'https://realwds-api.vercel.app/bing?count=8';
var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
var index = sessionStorage.getItem("index");
var $panel = $('#panel');
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
        $panel.css("background", "url('"+url+"') center center no-repeat #666");
        $panel.css("background-size", "cover");
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
    $panel.css("background", "url('"+url+"') center center no-repeat #666");
    $panel.css("background-size", "cover");
    sessionStorage.setItem("index",index);
}