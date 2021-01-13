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
var o11 = new Product("pen", "img/pen.jpg");
var o12 = new Product("pet-sweep", "img/pet-sweep.jpg");
var o13 = new Product("scissors", "img/scissors.jpg");
var o14 = new Product("shark", "img/shark.jpg");
var o15 = new Product("sweep", "img/sweep.png");
var o16 = new Product("tauntaun", "img/tauntaun.jpg");
var o17 = new Product("unicorn", "img/unicorn.jpg");
var o18 = new Product("water-can", "img/water-can.jpg");
var o19 = new Product("wine-glass", "img/wine-glass.jpg");

if (localStorage!==null) {
    if(localStorage.length!==0){
        var votedProducts = Object.values(JSON.parse(localStorage.getItem("products")));//load the already voted product
        loadTransactions(votedProducts);
    }
    
}
function loadTransactions(votedProducts){
    for(var i=0;i<products.length;i++){
        products[i].clickedTimes=votedProducts[i].clickedTimes;//load clicked times
        products[i].displayTimes=votedProducts[i].displayTimes;//load display times
    }
}


var firstImg = document.getElementById("first-img");
var seconedImg = document.getElementById("seconed-img");
var thirdImg = document.getElementById("third-img");
var resultButton = document.getElementById("showResult");
var votesSection = document.getElementById("votes");
var canvas = document.getElementById("myChart");
var resetButton=document.getElementById("reset");
resetButton.addEventListener("click",reset);
resultButton.style.visibility = "hidden";
resultButton.addEventListener("click", showResult);
function reset(){
    location.reload();
    localStorage.clear();
   
}

var round = 1;
//avoid repeat in the next round
var rnd1 = -1;
var rnd2 = -1;
var rnd3 = -1;
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
        var repeated = isRepeted(rnd1, rnd2, rnd3, random1, random2, random3);

    } while ((random1 == random2 || random2 == random3 || random1 == random3) || repeated)//three different image

    rnd1 = random1;
    rnd2 = random2;
    rnd3 = random3;
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
function isRepeted(rnd1, rnd2, rnd3, random1, random2, random3) {
    var arr1 = [rnd1, rnd2, rnd3];
    var arr2 = [random1, random2, random3];
    for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] == arr2[j]) {
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
            break;
        }//end if
    }//end for
    syncLocally(products);
}
function syncLocally() {
    localStorage.setItem("products", JSON.stringify(products));
}
function showResult() {
    showResultInChart();
}
function showResultInChart() {
    products = JSON.parse(localStorage.getItem("products"));
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
function getProductsNames() {

    var labels = [];
    for (var i = 0; i < products.length; i++) {
        labels.push(products[i].name);
    }
    return labels;
}
function getProductsData() {
    var labels = [];
    for (var i = 0; i < products.length; i++) {
        labels.push(products[i].clickedTimes);
    }
    return labels;
}

