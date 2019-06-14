var LiveForm = require("./LiveForm");
var GrassEater = require("./GrassEater.js")
var random = require("./random.js");



module.exports = class Change extends LiveForm {
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

        if (this.life >= 10 && newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let change = new Change(x, y);
            changeArr.push(change);
            this.life = 5;
        }
    }
    change() {
        let emptyCells = this.chooseCell(3);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            var newgrassEater = new GrassEater(this.x, this.y, 2);
            grassEaterArr.push(newgrassEater);

            for (let i in changeArr) {
                if (changeArr[i].x == x && changeArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 13) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.life-=2;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
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

        for (let i in changeArr) {
            if (changeArr[i].x == this.x && changeArr[i].y == this.y) {
                changeArr.splice(i, 1)
            }
        }
    }
}