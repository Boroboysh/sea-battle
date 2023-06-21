import {Player} from "../Player/Player.js";

export class AI_2 extends Player {
    // Генерация массива ходов
    initializeMoves() {
        let stage = 0;
        // 0 - вправо
        // 1 - вверх
        // 2 - влево
        // 3 - вниз

        let lineSteps = this.gameField.length;
        let currentPosition = {
            x: 0, y: this.gameField.length - 1
        }

        // Идет построение ходов, от конца (крайний левый нижний угол) к середине поля
        for (let i = 0; i < Math.pow(this.gameField.length, 2); i++) {
            if (lineSteps === 0) {
                break;
            } else {
                switch (stage) {
                    case 0:
                        let x = currentPosition.x;

                        for (let k = 0; k < lineSteps; k++) {
                            if (i === 0) {
                                x = k;
                            } else x++;

                            this.moves.push({
                                x: x, y: currentPosition.y
                            })
                        }

                        currentPosition.x = x;
                        lineSteps--;
                        stage++;
                        break;
                    case 1:
                        let yStageOne = currentPosition.y;

                        for (let k = 0; k < lineSteps; k++) {
                            yStageOne--;

                            this.moves.push({
                                x: currentPosition.x, y: yStageOne
                            })
                        }

                        currentPosition.y = yStageOne;
                        stage++;
                        break;
                    case 2:
                        let xStageTwo = currentPosition.x;

                        for (let k = 0; k < lineSteps; k++) {
                            xStageTwo--;

                            this.moves.push({
                                x: xStageTwo, y: currentPosition.y
                            })
                        }

                        currentPosition.x = xStageTwo;
                        lineSteps--;
                        stage++;
                        break;
                    case 3:
                        let xStageThree = currentPosition.x;
                        let yStageThree = currentPosition.y;

                        for (let k = 0; k < lineSteps; k++) {
                            yStageThree++;

                            this.moves.push({
                                x: xStageThree, y: yStageThree
                            })
                        }

                        currentPosition.y = yStageThree;
                        stage = 0;
                        break;
                }
            }
        }

        this.moves.reverse()
    }
}