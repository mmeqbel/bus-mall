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
resultButton.style.visibility = "hidden";
votesSection.style.visibility = "hidden";
resultButton.addEventListener("click", showResult);


var round = 1;

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

    } while (random1 == random2 || random2 == random3 || random1 == random3)//three different image

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
    var table = document.createElement("table");
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
        data1.innerText=products[i].name;
        var data2 = document.createElement("td");
        data2.innerText=products[i].clickedTimes;
        var data3 = document.createElement("td");
        data3.innerText=products[i].displayTimes;
        var data4 = document.createElement("td");
        var percentage=products[i].clickedTimes/products[i].displayTimes;
        data4.innerText=percentage.toFixed(2);
        tr.append(data1);
        tr.append(data2);
        tr.append(data3);
        tr.append(data4);
        table.append(tr);
    }
    console.log(table);
    votesSection.append(table);
    votesSection.style.visibility = "visible";


}