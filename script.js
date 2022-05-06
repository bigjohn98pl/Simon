let DARKER_COLORS = ["rgb(0,0,95)","rgb(95,0,0)","rgb(0,95,0)","rgb(95,95,0)"]; //blue,red , green , yellow
let COLORS = ["rgb(0,0,255)","rgb(255,0,0)","rgb(0,255,0)","rgb(255,255,0)"];
let TILES = document.querySelectorAll(".tile");
let RESET = document.getElementById("reset");
let SCORE = 0;
let PATERN = [];
let j = 0;
let rank = 1;
PATERN.push(random());
let PLAYER_PATERN = [];

for(let i=0;i<TILES.length;i++){
    TILES[i].style.backgroundColor = DARKER_COLORS[i];
}


    for(let i=0;i<TILES.length;i++){
        TILES[i].addEventListener('click',make_lighter);
    }

function make_lighter(event){
    if(event.target === TILES[0]){
        event.target.style.backgroundColor = COLORS[0];
        PLAYER_PATERN.push(0);
    }
    else if (event.target === TILES[1]){
        event.target.style.backgroundColor = COLORS[1];
        PLAYER_PATERN.push(1);
    }
    else if (event.target === TILES[2]){
        event.target.style.backgroundColor = COLORS[2];
        PLAYER_PATERN.push(2);
    }
    else if (event.target === TILES[3]){
        event.target.style.backgroundColor = COLORS[3];
        PLAYER_PATERN.push(3);
    }
    setTimeout(make_darker,100);

    console.log("Patern: "+PATERN);
    console.log("Player: "+PLAYER_PATERN);
    if(PLAYER_PATERN.length === (PATERN.length)){
        j = 0;
        patern_check();
        PLAYER_PATERN = [];
        PATERN.push(random());
    }
}
function make_darker(){
    TILES[0].style.backgroundColor = DARKER_COLORS[0];
    TILES[1].style.backgroundColor = DARKER_COLORS[1];
    TILES[2].style.backgroundColor = DARKER_COLORS[2];
    TILES[3].style.backgroundColor = DARKER_COLORS[3];
}
window.onload = function (){
    show_patern();
};

function show_patern () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
       for(let i=0;i<TILES.length;i++){
           TILES[i].addEventListener("click",make_lighter);
       }
       if(PATERN[j] === 0){
            TILES[0].style.backgroundColor = COLORS[0];
      }
      else if (PATERN[j] === 1){
            TILES[1].style.backgroundColor = COLORS[1];
      }
      else if (PATERN[j] === 2){
            TILES[2].style.backgroundColor = COLORS[2];
      }
      else if (PATERN[j] === 3){
            TILES[3].style.backgroundColor = COLORS[3];
      }
        setTimeout(make_darker,400);
      j++;//  increment the counter
      if (j < PATERN.length) {//  if the counter <  call the loop function
          show_patern();             //  ..  again which will trigger another
      }//  ..  setTimeout()
   }, 500);
    for(let i=0;i<TILES.length;i++){
        TILES[i].removeEventListener("click",make_lighter);
    }
}

function random() {
    let number;
    number = Math.floor(Math.random() * 4);
    return number
}

function patern_check() {
    let czek;
    for(let i=0;i<PATERN.length;i++){
        if(PATERN[i]===PLAYER_PATERN[i]){
            console.log("IS the Same |"+PATERN +"||"+PLAYER_PATERN+"|");
            czek = true;
        }
        else{
            console.log("Is different !"+PATERN +"!!"+PLAYER_PATERN+"!");
            czek = false;
        }
    }
    if(czek){
        show_result("correct","Correct!");
        SCORE=SCORE+10;
        show_patern();
        console.log("You get: "+SCORE+" points");
    }
    else{
        show_result("wrong","Wrong!");
        add_score(rank,SCORE);
        sortTable();
        RESET.style.opacity = "1"
        rank++;

    }
}
function show_result(klasa,innerH) {
    let ele = document.createElement("div");
    if(klasa==="wrong"){
        ele.setAttribute("class",[klasa+" stay"]);
    }
    else{
        ele.setAttribute("class",["anime "+klasa]);
        setTimeout(del, 2000)
    }
    ele.innerHTML = innerH;
    document.body.appendChild(ele);
}
function del()
{
    var ele = document.querySelector(".anime");
    ele.remove();
}

function add_score(rank_nr, points){
    let tabela = document.getElementById("table2")
    let row = tabela.insertRow(-1);
    //let rank = row.insertCell(0);
    let score = row.insertCell(0);
    //rank.innerHTML = rank_nr;
    score.innerHTML = points;
}

function reset() {
    SCORE = 0;
    PATERN = [];
    j = 0;
    PATERN.push(random());
    PLAYER_PATERN = [];
    document.querySelector("div.wrong.stay").remove();
    RESET.style.opacity = "0";
    setTimeout(show_patern, 500);
}
function sortTable() {
    var table, i, x, y,x2,y2;
    table = document.getElementById("table2");
    var switching = true;

    // Run loop until no switching is needed
    while (switching) {
        switching = false;
        var rows = table.rows;

        // Loop to go through all rows
        for (i = 1; i < (rows.length - 1); i++) {
            var Switch = false;

            // Fetch 2 elements that need to be compared
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            console.log(x);
            console.log(y);

            // Check if 2 rows need to be switched
            if (x.innerHTML < y.innerHTML )
            {

                // If yes, mark Switch as needed and break loop
                Switch = true;
                break;
            }
        }
        if (Switch) {
            // Function to switch rows and mark switch as completed
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}