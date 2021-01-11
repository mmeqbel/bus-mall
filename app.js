'use strict'

var products = [];
function Product(name, img) {
    this.name = name;
    this.img = img;
    this.displayTimes = 0;
    this.clickedTimes = 0;
    products.push(this);
}
Product.prototype.display = function () {
    this.displayTimes++;
}
Product.prototype.click = function () {
    this.clickedTimes++;
}
var o1 = new Product("bag", "img/bag.jpg");
var o2 = new Product("banana", "img/banana.jpg");
var o3 = new Product("bathroom", "img/bathroom.jpg");
var o4 = new Product("boots", "img/boots.jpg");
var o5 = new Product("breakfast", "img/breakfast.jpg");
var o6 = new Product("bubblegum", "img/bubblegum.jpg");
var o7 = new Product("chair", "img/chair.jpg");
var o8 = new Product("cthulhu", "img/cthulhu.jpg");
var o9 = new Product("dog-duck", "img/dog-duck.jpg");
var o10 = new Product("dragon", "img/dragon.jpg");
var o12 = new Product("pen", "img/pen.jpg");
var o13 = new Product("pet-sweep", "img/pet-sweep.jpg");
var o14 = new Product("scissors", "img/scissors.jpg");
var o15 = new Product("shark", "img/shark.jpg");
var o16 = new Product("sweep", "img/sweep.png");
var o17 = new Product("tauntaun", "img/tauntaun.jpg");
var o18 = new Product("unicorn", "img/unicorn.jpg");
var o19 = new Product("water-can", "img/water-can.jpg");
var o20 = new Product("wine-glass", "img/wine-glass.jpg");


var firstImg = document.getElementById("first-img");
var seconedImg = document.getElementById("seconed-img");
var thirdImg = document.getElementById("third-img");
var resultButton = document.getElementById("showResult");
var votesSection = document.getElementById("votes");
var canvas = document.getElementById("myChart");
resultButton.style.visibility = "hidden";
resultButton.addEventListener("click", showResult);


var round = 1;
//avoid repeat in the next round
var rnd1=-1;
var rnd2=-1;
var rnd3=-1;
renderImage();
function renderImage() {
    if (!(round <= 25)) {
        resultButton.style.visibility = "visible";
        firstImg.removeEventListener("click", click);
        seconedImg.removeEventListener("click", click);
        thirdImg.removeEventListener("click", click);
        return;
    }

    var random1, random2, random3;
    do {
        random1 = Math.floor(Math.random() * (products.length - 0)) + 0;
        random2 = Math.floor(Math.random() * (products.length - 0)) + 0;
        random3 = Math.floor(Math.random() * (products.length - 0)) + 0;
        var repeated=isRepeted(rnd1,rnd2,rnd3,random1,random2,random3);

    } while ((random1 == random2 || random2 == random3 || random1 == random3)||repeated)//three different image

    rnd1=random1;
    rnd2=random2;
    rnd3=random3;
    firstImg.src = products[random1].img;
    products[random1].display();
    firstImg.addEventListener('click', click);
    seconedImg.src = products[random2].img;
    products[random2].display();
    seconedImg.addEventListener('click', click);
    thirdImg.src = products[random3].img;
    products[random3].display();
    thirdImg.addEventListener('click', click);
    round++;
}
function isRepeted(rnd1,rnd2,rnd3,random1,random2,random3){
var arr1=[rnd1,rnd2,rnd3];
var arr2=[random1,random2,random3];
for(var i=0;i<arr1.length;i++){
    for(var j=0;j<arr2.length;j++){
        if(arr1[i]==arr2[j]){
            console.log("repeated");
            return true;
        }
    }
}
return false;
}
function click(event) {
    var selectedImgUrl = event.target.getAttribute('src');
    //console.log(event.target.getAttribute('src'))
    addVote(selectedImgUrl);
    renderImage();
}
function addVote(selectedImgUrl) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].img == selectedImgUrl) {
            products[i].click();

            console.log(products[i].clickedTimes);
            break;
        }//end if
    }//end for

}
function showResult() {
    showResultInChart();
    /*var table = document.createElement("table");
    var headerRow = document.createElement("tr");
    var headerData1 = document.createElement("th");
    var headerData2 = document.createElement("th");
    var headerData3 = document.createElement("th");
    var headerData4 = document.createElement("th");
    headerData1.innerText = "Product Name";
    headerData2.innerText = "Votes";
    headerData3.innerText = "Display times";
    headerData4.innerText = "V/D";
    headerRow.append(headerData1);
    headerRow.append(headerData2);
    headerRow.append(headerData3);
    headerRow.append(headerData4);
    table.append(headerRow);
    for (var i = 0; i < products.length; i++) {
        var tr = document.createElement("tr");
        var data1 = document.createElement("td");
        data1.innerText = products[i].name;
        var data2 = document.createElement("td");
        data2.innerText = products[i].clickedTimes;
        var data3 = document.createElement("td");
        data3.innerText = products[i].displayTimes;
        var data4 = document.createElement("td");
        var percentage = products[i].clickedTimes / products[i].displayTimes;
        data4.innerText = percentage.toFixed(2);
        tr.append(data1);
        tr.append(data2);
        tr.append(data3);
        tr.append(data4);
        table.append(tr);
    }
    console.log(table);
    votesSection.append(table);
    votesSection.style.visibility = "visible";
*/

}
function showResultInChart() {
     var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: getProductsNames(),
            datasets: [{
                label: '# of Votes',
                data: getProductsData(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
function getProductsNames(){
    var labels=[];
    for(var i=0;i<products.length;i++){
        labels.push(products[i].name);
    }  
    return labels;  
}
function getProductsData(){
    var labels=[];
    for(var i=0;i<products.length;i++){
        labels.push(products[i].clickedTimes);
    }  
    return labels;  
}
