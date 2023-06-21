import {GameField} from "../GameField/GameField.js";

export class Player {
    constructor(field_size, ships) {
        let gameField = new GameField(field_size, ships);
        // Сгенерированное игровое поле
        this.gameField = gameField.gameField;
        // Экземпляр класса
        this.gf = gameField;
        this.shipCellsAlive = this.gf.shipCellsAlive;
        this.moves = [];
        this.initializeMoves();

        this.step = 0;
    }

    // Генерация массива ходов
    initializeMoves() {
        throw new Error('You need to overwrite abstract method')
    }

    // "Принять выстрел"
    getShot(coordinates) {
        if (this.gameField[coordinates.y][coordinates.x] === 1) {
            this.shipCellsAlive -= 1;
        }

        this.gameField[coordinates.y][coordinates.x] = -1;

        return !this.shipCellsAlive;
    }

    // Сделать выстрел
    takeShot() {
        let res = this.moves[this.step];
        this.step++;

        return res;
    }

    generateRandomCoordinate() {
        let coordinate = Math.round(Math.random() * (this.gameField.length - 1));
        if (!(coordinate >= 0)) return this.generateRandomCoordinate()
        else return coordinate
    }
}