var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Monster extends LiveForm {
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2],
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
            monsterScore++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            let monster = new Monster(x, y);
            monsterArr.push(monster);
            this.life = 5;
        }
    }
    eat() {
        if(weather > 10 && weather <= 15) {
        var newCell1 = this.chooseCell(1);
        var newCell2 = this.chooseCell(2);
        var emptyCells1 = newCell1.concat(newCell2);
        var newCell3 = this.chooseCell(3);
        var newCell4 = this.chooseCell(4);
        var emptyCells2 = newCell3.concat(newCell4);
        var emptyCells = emptyCells1.concat(emptyCells2);

        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            for (let i in changeArr) {
                if (changeArr[i].x == x && changeArr[i].y == y) {
                    changeArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if(weather > 5 && weather <= 10) {
                if (this.life >= 7) {
                    this.mul();
                }
              } 
              else if (weather > 10 && weather <= 15) {
                if(this.life >= 13) {
                    this.mul();
                }
              }
              else {
                  if(this.life >= 10) {
                      this.mul();
                  }
              }
        }
        else {
            this.move()
        }
      }
      else {
        var newCell1 = this.chooseCell(3);
        var newCell2 = this.chooseCell(4);
        var emptyCells = newCell1.concat(newCell2);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            for (let i in changeArr) {
                if (changeArr[i].x == x && changeArr[i].y == y) {
                    changeArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if(weather > 5 && weather <= 10) {
                if (this.life >= 7) {
                    this.mul();
                }
              } 
              else if (weather > 15) {
                if(this.life >= 13) {
                    this.mul();
                }
              }
              else {
                  if(this.life >= 10) {
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
        if (weather < 5) {
            this.life-=2;
        }
        else {
            this.life--;
        } 
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life <= 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in monsterArr) {
            if (monsterArr[i].x == this.x && monsterArr[i].y == this.y) {
                monsterArr.splice(i, 1)
            }
        }
    }
}