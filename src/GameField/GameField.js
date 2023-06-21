export class GameField {
    constructor(field_size = 10, ships = []) {
        this.gameField = [];
        this.shipCellsAlive = 0;
        this.initialize(field_size, ships)
    }

    // Создание игрового поля с кораблями
    initialize(field_size, ships) {
        for (let i = 0; i < field_size; i++) {
            let rows = [];
            for (let k = 0; k < field_size; k++) {
                rows.push(0)
            }

            this.gameField.push(rows)
        }

        this.addShipsToField(ships)
    }

    // Добавление кораблей на игровое поле
    addShipsToField(ships) {
        ships.forEach(ship => {
            for (let i = 0; i < ship.ship_count; i++) {
                let res = false;
                let counter = 0;

                while (!res) {
                    if (counter >= 50) {
                        // console.log('Error: Бессконечный цикл')

                        res = true;
                        break;
                    }
                    res = this.setShip(ship.cells);
                    counter += 1;
                }
                this.shipCellsAlive += ship.cells;
            }
        })
    }

    setShip(cells) {
        let isVertical = this.isVertical();

        let x = isVertical ? this.generateUnrestrictedCoordinate() : this.generateRestrictedCoordinate(cells);
        let y = isVertical ? this.generateRestrictedCoordinate(cells) : this.generateUnrestrictedCoordinate();

        if (this.checkFreeSpace(x, y, isVertical, cells)) {
            if (isVertical) {
                let end_y = y + cells

                for (y; y < end_y; y++) {
                    this.gameField[y][x] = 1;
                }

                return true;
            } else {
                let end_x = x + cells;

                for (x; x < end_x; x++) {
                    this.gameField[y][x] = 1;
                }

                return true;
            }
        } else {
            return false;
        }
    }

    // Проверка на наличие свободного пространства
    checkFreeSpace(x, y, isVertical, size_ship) {
        let start_y = y - 1;
        let end_y = y + size_ship;

        let start_x = x - 1;
        let end_x = x + size_ship;

        if (isVertical) {
            for (start_y; start_y <= end_y; start_y++) {
                if (!this.checkFreeSpaceCell(x, start_y, isVertical)) return false;
            }
        } else {
            for (start_x; start_x <= end_x; start_x++) {
                if (!this.checkFreeSpaceCell(start_x, y, isVertical)) return false;
            }
        }

        return true;
    }

    // Проверка на наличие свободного пространства для одной клетки
    checkFreeSpaceCell(x, y, isVertical) {
        for (let i = -1; i <= 1; i++) {
            if (isVertical === 0) {
                if (this.isInvalidCell(x, y + i)) return false
            } else {
                if (this.isInvalidCell(x + i, y)) return false
            }
        }

        return true
    }

    isInvalidCell(x, y) {
        return (x >= 0 && x < this.gameField.length &&
            y >= 0 && y < this.gameField.length &&
            this.gameField[y][x] !== 0)
    }

    isVertical() {
        return Math.round(Math.random());
    }

    generateRestrictedCoordinate(size_cells) {
        return Math.round(Math.random() * (this.gameField[0].length - size_cells))
    }

    generateUnrestrictedCoordinate() {
        return Math.round(Math.random() * (this.gameField.length - 1));
    }
}