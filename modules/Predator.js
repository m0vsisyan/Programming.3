var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Predator extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if (newCell) {
            predatorScore++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            let predator = new Predator(x, y);
            predatorArr.push(predator);
            this.life = 5;
        }
      } 
    eat() {
        if (weather > 5 && weather <= 10) {
        let emptyCells = this.chooseCell(4);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life+=3;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            for (let i in changeArr) {
                if (changeArr[i].x == x && changeArr[i].y == y) {
                    changeArr.splice(i, 1)
                }
            }
        
            this.x = x;
            this.y = y;
          if (weather <= 5) {
            if (this.life >= 2) {
                this.mul();
            }
          } else if (weather <= 10 || weather > 15) {
            if (this.life >= 5) {
                this.mul();
            }
          }
          else {
            if (this.life >= 5) {
                this.mul();
            }
          }
        }
        else {
            this.move()
        }
      }
else {
        let emptyCells = this.chooseCell(2);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life+=2;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
        
            this.x = x;
            this.y = y;
          if (weather <= 5) {
            if (this.life >= 4) {
                this.mul();
            }
          } else if (weather <= 10 || weather > 15) {
            if (this.life >= 7) {
                this.mul();
            }
          }
          else {
            if (this.life >= 7) {
                this.mul();
            }
          }
        }
        else {
            this.move()
        }
      }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if(weather > 15) {
           this.die();
      } 
        else {
            if (this.life <= 0) {
            this.die();
        }
      }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in predatorArr) {
            if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                predatorArr.splice(i, 1)
            }
        }
    }
}
