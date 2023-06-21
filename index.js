import {AI_1} from "./src/Bots/AI_1.js";
import {AI_2} from "./src/Bots/AI_2.js";

const ships = [
    {
        'cells': 2,
        'ship_count': 3,
    },
    {
        'cells': 1,
        'ship_count': 4,
    },
    {
        'cells': 3,
        'ship_count': 2,
    },
    {
        'cells': 4,
        'ship_count': 1,
    },
]
const field_size = 10;

let ai1Wins = 0;
let ai2Wins = 0;

let startGame = () => {
    let ai1 = new AI_1(field_size, ships);
    let ai2 = new AI_2(field_size, ships);

    for (let i = 0; i < Math.pow(field_size, 2); i++) {
        const ai1Move = ai1.takeShot();
        const isAi2Dead = ai2.getShot(ai1Move);

        if (isAi2Dead) {
            ai1Wins++;
            break;
        }

        const ai2Move = ai2.takeShot();
        const isAi1Dead = ai1.getShot(ai2Move)

        if (isAi1Dead) {
            ai2Wins++;
            break;
        }
    }
}

for (let countGame = 0; countGame < 1000; countGame++) {
    startGame();
}

console.log(`AI-1: ${ai1Wins} / AI-2: ${ai2Wins}`);
