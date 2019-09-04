function exitAlert() {
  var x = confirm("Are you sure you want to exit?");
  if (x) {
    window.location.href = "index.html";
  }
}

var myVar;
function start() {
  myVar = setTimeout(showPage, 1200);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("everything").style.display = "block";
}

var modal = document.getElementById("myModal");
function openModal() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const Http = new XMLHttpRequest();
const url='https://sheets.googleapis.com/v4/spreadsheets/1QNXJ3V3G2MYV69tkhYZI68ry5u2RWbo0IHeLwzrggzo/values/Sheet1?key=AIzaSyB-oUfU9YzqxToTdIRrC7VvoruACZFrit8';
Http.open("GET", url);
Http.send();

var x;
var question = document.getElementById('question');
var answer1 = document.getElementById('answer1');
var answer2 = document.getElementById('answer2');
var answer3 = document.getElementById('answer3');
var answer4 = document.getElementById('answer4');
var description = document.getElementById('description');
var counter = 1;
var counterLimit;
var cat1Answers = [];
var cat2Answers = [];
var cat3Answers = [];
var width = 0;

Http.onreadystatechange = (e) => {
  x = JSON.parse(Http.responseText);
  counterLimit = x.values.length;
  question.innerHTML = x.values[counter][0];
  answer1.innerHTML = x.values[counter][1];
  answer2.innerHTML = x.values[counter][2];
  answer3.innerHTML = x.values[counter][3];
  answer4.innerHTML = x.values[counter][4];
  description.innerHTML = x.values[counter][5];
}

function nextQuestion(value) {
  if (x.values[counter][6] == x.values[1][6]) {
    cat1Answers.push(value);
  } else if (x.values[counter][6] == x.values[2][6]) {
    cat2Answers.push(value);
  } else {
    cat3Answers.push(value);
  }
  counter += 1
  if (counter >= counterLimit) {
    summaryCalculation();
    window.location.href = "individualSummary.html";
  }
  question.innerHTML = x.values[counter][0];
  answer1.innerHTML = x.values[counter][1];
  answer2.innerHTML = x.values[counter][2];
  answer3.innerHTML = x.values[counter][3];
  answer4.innerHTML = x.values[counter][4];
  description.innerHTML = x.values[counter][5];

  var progressBar = document.getElementById('progress');
  var interval = 100 / counterLimit;
  width += interval;
  progressBar.style.width = width + "%";
  progressBar.style.transitionDuration = "1s";
}

function summaryCalculation() {
  var sum = 0;
  for (var i = 0; i < cat1Answers.length; i++) {
    sum += cat1Answers[i];
  }
  cat1Average = sum / cat1Answers.length;
  sum = 0;
  for (var i = 0; i < cat2Answers.length; i++) {
    sum += cat2Answers[i];
  }
  cat2Average = sum / cat2Answers.length;
  sum = 0;
  for (var i = 0; i < cat3Answers.length; i++) {
    sum += cat3Answers[i];
  }
  cat3Average = sum / cat3Answers.length;
  var lowestScore;
  if (cat1Average < cat2Average && cat1Average < cat3Average) {
    lowestScore = x.values[1][6];
  } else if (cat2Average < cat3Average && cat2Average < cat1Average) {
    lowestScore = x.values[2][6];
  } else if (cat3Average < cat1Average && cat3Average < cat2Average){
    lowestScore = x.values[3][6];
  } else {
    lowestScore = "More than one area";
  }
  sessionStorage.lowestCategory = lowestScore;
}

document.getElementById('areaOfFocus').innerHTML = sessionStorage.lowestCategory;
