var grains = ['churro', 'bar', 'macaroon', 'macaron', 'brownie', 'blondie', 'chip', 'sandwich', 'panini', 'pie', 'cake', 'mac', 'cookie', 'bread', 'roll', 'pita', 'naan', 'rice', 'pasta', 'penne', 'orecchiette', 'ziti', 'spaghetti', 'noodles'];

function collect_nutrition(){
  for (let i = 0; i < numweeks*7; i++){
    nutrition.push({"M":0,"D":0,"G":0,"V":0});
    menus.push([]);
  }

  
  for (let w = 0; w < numweeks; w++){ // each week
    week = weeks[w];
    let yes_grains = false;
    
    menus[w*7].push(week[0].substring(11)); // add the first title
    menus[w*7].push('');
    let d = 0;
    for (let i = 1; i < week.length; i++){
      let day = w*7+d; 
      
      if (week[i].indexOf("FEATURING") == -1){ // if it's not a title line
        if (week[i].indexOf("(") > -1){ // there's data on food groups
          let index = week[i].indexOf("(");
          menus[day].push(week[i].substring(0,index));
          
          let n_data =  week[i].substring(week[i].indexOf("("));
          yes_grains = false;
          
          let food = week[i].substring(0, week[i].indexOf("("));
          for (let g = 0; g < grains.length; g++){ // if there are any grains, increment G by one
            if (match(food.toLowerCase(), grains[g]) != null){
              nutrition[day].G ++;
              yes_grains = true;
              break;
            }
          }
          
          // not vegan - can include either meat or dairy
          if (match(n_data, "VG") == null){
            
            if (match(n_data, "V") != null){ //vegetarian but not vegan - dairy
              nutrition[day].D ++;
            }
            else { // not vegetarian or vegan - meat
              if (match(food.toLowerCase(), "alternative") == null && food != ''){ // make sure we aren't counting the alternatives
                nutrition[day].M ++;
              }
            }
          }
            
          // vegan & not a grain - vegetable
          if (!yes_grains){ 
            nutrition[day].V ++;
          }
        }
        
        else{ // no nutrition info
          menus[day].push(week[i]);
          yes_grains = false;
          
          let food = week[i].substring(0, week[i].indexOf("("));
          for (let g = 0; g < grains.length; g++){ // if there are any grains, increment G by one
            if (match(food.toLowerCase(), grains[g]) != null){
              nutrition[day].G ++;
              yes_grains = true;
              break;
            }
          }
          
          if (!yes_grains){ // if it's not a grain and it also isn't V/VG, it's meat
            if (match(food.toLowerCase(), "alternative") == null && food != ''){ // make sure we aren't counting the alternatives
              nutrition[day].M ++;
            }
          }
        }
        
      }
      else{ //it's a title line
        d++;
        day = w*7+d;
        yes_grains = false;
        menus[day].push(week[i].substring(11));
        menus[day].push('');
      }
    }
  }
}
      
