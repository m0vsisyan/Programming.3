var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Monster extends LiveForm{
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 5;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
            ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
//qayluma
    move() {

//yntruma vandak
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;
            if(this.energy <= 0){
                this.die();
            }

        }

    }
    eat() {
   

        var newCell1 = this.chooseCell(3);
        var newCell2 = this.chooseCell(4);
        var m = newCell1.concat(newCell2);
        var newCell = random(m);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 3;

        }
    }
    
      mul() {
        
        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newmonsterArr = new Monster(newCell[0], newCell[1], this.index);
            monsterArr.push(newmonsterArr);
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 5;
        }
    }
      die() {
          matrix[this.y][this.x] = 0;
          for(var i in monsterArr){
              if(monsterArr[i].y==this.y && monsterArr[i].x==this.x){
                monsterArr.splice(i,1);
              }
          }
      }
    
    
}