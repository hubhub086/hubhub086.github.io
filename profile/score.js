onload:calc();
function calc() {
    var allHours = document.querySelectorAll(".hours");
    var allScores = document.querySelectorAll(".scores");
    var gpaText = document.querySelector("#GPA");

    var gpa = 0;
    var hours = 0;
    // console.log(allHours);
    // console.log(allHours.length);
    for(i = 0; i< allHours.length; i++){
        if (allHours[i].value === '' || allScores[i] == '')
        {
            gpa = -1;
            break;
        }
        gpa += allHours[i].value * allScores[i].value;
        hours += parseInt(allHours[i].value, 10);
    }
    if (gpa < 0){
        gpaText.innerText = ' 加权平均分：--';
    }
    else{
        gpaText.innerText = " 加权平均分：" + (gpa/hours).toFixed(2);
    }
    
}

function addTr() {
    var newTr = document.createElement("tr");
    newTr.innerHTML += '<td><input type="text" value="class" class="input_data"/></td>\
                        <td><input class="hours input_data" type="number" value=""/></td>\
                        <td><input class="scores input_data" type="number" value=""/></td>\
                        <td><input type="button" value="+" onclick="addTr()"/><input type="button" value="-" onclick="DelTr(this)"/></td>';
    document.querySelector("#scoretable").appendChild(newTr);
    calc();
}

function DelTr(obj) {
    if(document.querySelectorAll(".hours").length > 1){
        obj.parentElement.parentElement.remove();
        calc();
    }
}