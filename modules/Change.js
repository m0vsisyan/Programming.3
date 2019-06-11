var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Change extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 5;
       
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
        [this.x + 2, this.y + 2]
    ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

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

            change() {
   

                var newCell = random(this.chooseCell(3));
        
                if (newCell) {
                    var newX = newCell[0];
                    var newY = newCell[1];
        
                    matrix[this.y][this.x] = 2;
                    matrix[newY][newX] = this.index;
                    var newgrassEater = new GrassEater(this.x, this.y, 2);
                    grassEaterArr.push(newgrassEater)
                    
                    for (var i in changerArr) {
                        if (newX == changerArr[i].x && newY == changerArr[i].y) {
                            predatorArr.splice(i,1)
                            break;
                        }
                    }
        
        
                    this.y = newY;
                    this.x = newX;
                    this.energy +=2;
        
                }
            }
            mul() {
        
                var newCell = random(this.chooseCell(0));
        
                if (this.energy >= 10 && newCell) {
                    var newchangerArr = new Change(newCell[0], newCell[1], this.index);
                    changerArr.push(newchangerArr);
                    matrix[newCell[1]][newCell[0]] = 4;
                    this.energy = 5;
                }
            }

            die() {
                matrix[this.y][this.x] = 0;
                for(var i in changerArr){
                    if(changerArr[i].y==this.y && changerArr[i].x==this.x){
                        changerArr.splice(i,1);
                    }
                }
            }
            

}