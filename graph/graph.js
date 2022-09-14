var days = ['M','T','W','T','F','S','S'];
var week1;
var week2;
var week3;
var week4;
var week5;
var week6;
var weeks;
const numweeks = 6;

var scores;
var star_0;
var star_1;
var star_2;
var star_3;
var star_4;
var star_5;
var stars;

var beantown;
var dominos;
var thai;
var birthday;
var meat;
var dairy;
var grain;
var veggie;

const INTRO = 0;
const PAGE1 = 1;
const PAGE2 = 2;
const PAGE3 = 3;
const PAGE4 = 4;
const PAGE5 = 5;
const PAGE6 = 6;
var page_state = 0; // start on the intro page

const FOOD = 0;  // for hovering over certain days - whether to
const MENU = 1;  // show the menu or the nutrition information
var info_state = 0; 
var prev_pos;
var coord_click = [0,0];
var timer;
var counter = 0;

var nutrition = [];
var menus = [];

function preload(){
  load_data();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  weeks = [week1,week2,week3,week4,week5,week6];
  stars = [star_0,star_1,star_2,star_3,star_4,star_5];
  collect_nutrition();
  
  for (let i = 0; i < scores.length; i++){ // cast all the scores to ints
    scores[i] = int(scores[i]);
  }
  set_page();
  timer = millis();
}


function draw() {
  set_page();
}

function mousePressed(){
  if (mouseY > coord_click[1] && mouseY < coord_click[1]+42){
    if (mouseX > coord_click[0] && mouseX < coord_click[0]+65 && page_state != 6){
      page_state = (page_state+1) % (numweeks+1);
      set_page();
    }
    else if (page_state != INTRO && mouseX > 35 && mouseX < 100){
      page_state = (page_state-1) % (numweeks+1);
      set_page();
    }
  }
  else{
    if (page_state != INTRO && mouseX > 50 && mouseX < windowWidth-200){
      if (mouseY > 100){
        if (info_state == FOOD){
          info_state = MENU;
        }
        else{
          info_state = FOOD;
        }
      }
    }
  }
}

function load_data(){
  week1 = loadStrings("week1.txt"); // menus for each week
  week2 = loadStrings("week2.txt");
  week3 = loadStrings("week3.txt");
  week4 = loadStrings("week4.txt");
  week5 = loadStrings("week5.txt");
  week6 = loadStrings("week6.txt");
  scores = loadStrings("bagsdata.txt"); // scores for each meal
  star_0 = loadImage("star_0.png"); // star images for corresponding score
  star_1 = loadImage("star_1.png"); 
  star_2 = loadImage("star_2.png");
  star_3 = loadImage("star_3.png");
  star_4 = loadImage("star_4.png");
  star_5 = loadImage("star_5.png");
  beantown = loadImage("beantown.png"); // bags from ordering takeout
  dominos = loadImage("dominos.png");
  birthday = loadImage("birthday.png");
  meat = loadImage("meat.png");
  dairy = loadImage("dairy.png");
  grain = loadImage("grain.png");
  veggie = loadImage("veggie.png");
}
