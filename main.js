const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let gameStatus = true;
const validMoves = ['U','D','L','R'];
let moveIsValid = true;


class Field {
// takes in single arg representing the field
  constructor(map){
    this._map = map;
    this._xPos = 0;
    this._yPos = 0;
    this._move = '';
  };

  print(){
  //prints map to terminal
    for (let i=0; i<this._map.length; i++){
      console.log(this._map[i].join(''))
    }
  };

  move(){
    //move left
    if (this._move === 'L'){
      this._xPos -= 1;
    }
    //move right
    if (this._move === 'R'){
      this._xPos += 1;
    }
    //move up
    if (this._move === 'U'){
      this._yPos -= 1;
    }
    //move down
    if (this._move === 'D'){
      this._yPos += 1;
    }
  };

  gameCheck(){
  //check if user has fallen into a hole or win
    if (this._map[this._yPos][this._xPos] === hole){
      console.log("You fell into a hole! You lost!");
      gameStatus = false;
    }
    else if(this._map[this._yPos][this._xPos] === hat){
      console.log("You found the hat! You Win!");
      gameStatus = false;
    }
    // // else if(this._yPos < this._map.length ||this._yPos > this._map.length || this._xPos < this._map[0].length || this._xPos > this._map[0].length){
    // //   console.log("You fell out of the map! you Lost!");
    // //   gameStatus = false;
    // }
  };

  mapUpdate(){
    this._map[this._yPos][this._xPos] = pathCharacter;
  };

  play(){
    this.print();
    do{      
      do{
        const selectMove = prompt("Which way? (U/L/D/R)").toUpperCase();
        if (validMoves.includes(selectMove)){
          this._move = selectMove;
          this.move();
          moveIsValid = false;
        } else{
          console.log('Invalid move')
          moveIsValid = true;
        }
      } while (moveIsValid)
      this.gameCheck();
      this.mapUpdate();
      this.print();
    }
    while (gameStatus)
      
  };
  generateField(height, width){
    //blank field canvas
    let genMap = []
    for (let i=0;i<height;i++){
      let genRow = new Array(width).fill(fieldCharacter);
      genMap.push(genRow);
    }
    //populate with holes, 1/4 of the map
    let holeNum = (height*width)/4;
    let holeCount = 0
    while(holeCount < holeNum){
      genMap[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = hole;
      for(let i=0;i<height;i++){
        if (genMap[i].includes(hole)){
          holeCount += 1;
        }
      }
    }
    // add starting point
    genMap[this._yPos][this._xPos] = pathCharacter;
    // randomly place hat
    genMap[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = hat;
    this._map = genMap
  };
  
}


//DEMO
const myField2 = new Field;
myField2.generateField(7,7);
myField2.play()