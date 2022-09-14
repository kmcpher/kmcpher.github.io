var graph_width; // width of one day
var graph_height; // height of one star
var bar_x;
var bar_y;
var timer;

function set_page(){
  resizeCanvas(windowWidth,windowHeight);
  rect(0,0,windowWidth,windowHeight);
  background(20,20,20); // clear the screen
  
  textSize(45);
  textAlign(CENTER, CENTER);
  noFill();
  stroke('white');
  var arrow_x = 300;
  var arrow_y = 48;
  
  switch (page_state){
    case INTRO:
      if (millis() - timer > 500){
        counter++;
        timer = millis();
      }
      for (let i = 0; i < 6; i++){
        translate(windowWidth*i/6.1+120, windowHeight/6+160);
        if((i+counter)%2==0){
          rotate((i+counter+1)%2*0.07);
          image(stars[(i+counter)%6], -120, -250, 240, 320);
          rotate(-((i+counter+1)%2*0.07));
        }
        else{
          rotate(-((i+counter)%2*0.07));
          image(stars[(i+counter)%6], -120, -250, 240, 320);
          rotate((i+counter)%2*0.07);
        }
        //image(stars[(i+counter)%6], windowWidth*i/6.1, windowHeight/6, 240, 320);
        translate(-windowWidth*i/6.1-120, -windowHeight/6-160);
      }
      textSize(100);
      noFill();
      stroke('white');
      strokeWeight(1.3);
      text("keeping score:", windowWidth/2, windowHeight*2/3-40);
      textSize(40);
      strokeWeight(1);
      fill(200,200,200);
      noStroke();
      text("six weeks of mit dining during the covid pandemic", windowWidth/2, windowHeight*2/3+60);
      arrow_x = windowWidth/2-18;
      arrow_y = windowHeight*5/6+20;
      draw_arrow(arrow_x, arrow_y, (220,220,220));
      
      break;
    case PAGE1:
      text('week 1', 195, 50);
      draw_back_arrow(50, arrow_y, (220,220,220));
      draw_arrow(arrow_x, arrow_y, (220,220,220));
      textSize(15);
      fill(180,180,180);
      noStroke();
      textStyle(ITALIC);
      text("hover to see a day's nutrition, click to see its menu", 200, 90);
      textStyle(NORMAL);
      noFill();
      draw_week(1);
      break;
    case PAGE2:
      text('week 2', 195, 50);
      draw_back_arrow(50, arrow_y, (220,220,220));
      draw_arrow(arrow_x, arrow_y, (220,220,220));
      draw_week(2);
      break;
    case PAGE3:
      text('week 3', 195, 50);
      draw_back_arrow(50, arrow_y, (220,220,220));
      draw_arrow(arrow_x, arrow_y, (220,220,220));
      draw_week(3);
      break;
    case PAGE4:
      text('week 4', 195, 50);
      draw_back_arrow(50, arrow_y, (220,220,220));
      draw_arrow(arrow_x, arrow_y, (220,220,220));
      draw_week(4);
      break;
    case PAGE5:
      text('week 5', 195, 50);
      draw_back_arrow(50, arrow_y, (220,220,220));
      draw_arrow(arrow_x, arrow_y, (220,220,220));
      draw_week(5);
      break;
    case PAGE6:
      text('week 6', 195, 50);
      draw_back_arrow(50, arrow_y, (220,220,220));
      draw_week(6);
      break;
  }
  coord_click[0] = arrow_x-15;
  coord_click[1] = arrow_y-21;
}

function draw_week(number){
  stroke('white');
  line(100, windowHeight-80, windowWidth-325, windowHeight-80);
  if (number == 1){
    line(100, 120, 100, windowHeight-80);
  }
  else{
    line(100, 95, 100, windowHeight-80);
  }
  
  textSize(20);
  textStyle(ITALIC);
  noStroke();
  fill(180,180,180);
  rotate(-PI/2);
  text('s c o r e', -windowHeight/2, 70);
  rotate(PI/2);
  textStyle(NORMAL);
  stroke('white');
  noFill();
  
  graph_width = (windowWidth-500)/7; // width of one day
  graph_height = (windowHeight-250)/5; // height of one star
  
  // look at data for the specified week
  for (let i = (number-1)*7; i < number*7; i++){
    bar_x = graph_width*(i%7)+150;
    bar_y = 50+graph_height*(5-scores[i]);
    
    noStroke();
    fill(180,180,180);
    textSize(20);
    text(days[i%7], bar_x+graph_width/2-8, windowHeight-50);
    noFill();
    stroke('white');
    
    if (scores[i] > 0){
      image(stars[scores[i]], bar_x-16, bar_y+20, 150, 200);
    }
    if (i==11 || i==34 || i==38){
      image(beantown, bar_x-16, 80, 150, 200);
    }
    else if (i==25 || i==31){
      image(dominos, bar_x-20, 105, 160, 160);
    }
    else if (i==41){
      image(birthday, bar_x-10, 80, 140, 200);
    }
    if (mouseX > bar_x-10 && mouseX < bar_x + graph_width-10){
      if (mouseY > 80 && mouseY < windowHeight-30){
        if (i != prev_pos){ // if mouse moved to a diff day, go back to nutrition view 
          info_state = FOOD;
          prev_pos = i;
        }
        switch(info_state){
          case FOOD:
            draw_nutrition(i);
            break;
          case MENU:
            draw_menu(i);
            break;
        }
      }
    }
  }
  stroke('white');
  noFill();
}

function draw_arrow(x1,y1,col){
  noFill();
  stroke(col);
  rect(x1-15, y1-21, 65, 42, 10);
  fill(col);
  rect(x1, y1-5, 20, 10);
  translate(x1+20, y1);
  triangle(0, 10, 0, -10, 17, 0); 
  translate(-(x1+20), -y1);
  stroke('white');
}
function draw_back_arrow(x1,y1,col){
  noFill();
  stroke(col);
  rect(x1-15, y1-21, 65, 42, 10);
  fill(col);
  rect(x1+15, y1-5, 20, 10);
  translate(x1+15, y1);
  triangle(0, 10, 0, -10, -17, 0); 
  translate(-(x1+15), -y1);
  stroke('white');
}

function draw_nutrition(num_day){
  fill('black');
  stroke('white');
  let x = windowWidth-278;
  rect(x, windowHeight/2-150, 230, 310);
  noFill();
  image(meat, x+20, windowHeight/2-130, 39, 52);
  image(dairy, x+20, windowHeight/2-60, 39, 52);
  image(grain, x+20, windowHeight/2+10, 39, 52);
  image(veggie, x+21, windowHeight/2+80, 36, 48);
  
  stroke(255,156,119); // meat
  fill(255,156,119);
  if (nutrition[num_day].M > 0){
    rect(x+75, windowHeight/2-115, nutrition[num_day].M*20, 20);
  }
  
  //text(nutrition[num_day].M, x+200, windowHeight/2-118);
  
  stroke(248, 249, 254); // dairy
  fill(248, 249, 254);
  if (nutrition[num_day].D > 1){
    rect(x+75, windowHeight/2-45, (nutrition[num_day].D-1)*20, 20);
  }
  else if (nutrition[num_day].D > 0){
    rect(x+75, windowHeight/2+95, nutrition[num_day].D*18, 20);
  }
  //text(nutrition[num_day].D, x+200, windowHeight/2-48);
  
  stroke(254, 229, 146); // grain
  fill(254, 229, 146);
  if (nutrition[num_day].G > 2){
    rect(x+75, windowHeight/2+25, nutrition[num_day].G*18, 20);
  }
  else{
    rect(x+75, windowHeight/2+25, 2*20, 20);
  }
  //text(nutrition[num_day].G, x+200, windowHeight/2+22);
  
  stroke(164, 241, 141); // veggie
  fill(164, 241, 141);
  if (nutrition[num_day].V > 0 && nutrition[num_day].V < 8){
    rect(x+75, windowHeight/2+95, nutrition[num_day].V*18, 20);
  }
  else if (nutrition[num_day].V > 0){
    rect(x+75, windowHeight/2+95, 7*18, 20);
  }
  //text(nutrition[num_day].V, x+200, windowHeight/2+92);
  
  stroke('white');
  
}

function draw_menu(num_day){
  fill('black');
  stroke('white');
  let x = windowWidth-278;
  rect(x, windowHeight/2-150, 230, 310);
  
  fill('white');
  noStroke();
  textSize(12);
  
  for (let l = 0; l < menus[num_day].length; l++){
    let item = menus[num_day][l];
    if (item.substring(0,1) == "*"){
      fill('white');
      text(item.substring(1), x+115, windowHeight/2-130+15*l);
    }
    else{
      fill(100,100,100);
      text(item, x+115, windowHeight/2-130+15*l);
    }
  }
  
  
  noFill();
  stroke('white');
}
