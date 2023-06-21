import {Player} from "../Player/Player.js";

export class AI_1 extends Player {
    // Генерация ходов
    initializeMoves() {
        for (let i = 0; i < Math.pow(this.gameField.length, 2); i++) {
            let x = this.generateRandomCoordinate();
            let y = this.generateRandomCoordinate();

            // Проверка случайно сгенерированных координат на уникальность
            if (!this.moves.find(cell => cell.x === x && cell.y === y)) {
                this.moves.push({
                    x: x,
                    y: y
                })
            } else i--;
        }
    }
}