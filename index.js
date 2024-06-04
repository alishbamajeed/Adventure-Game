#!  /usr/bin/env  node
import inquirer from 'inquirer';
console.log("Welcome to the Jungle Adventure!");
const locations = {
    start: {
        description: "You find yourself in a dense jungle. The path ahead splits into two directions.",
        exits: { left: 'river', right: 'cave' }
    },
    river: {
        description: "You arrive at a rushing river. You can try to cross it or go back.",
        exits: { cross: 'finish', back: 'start' }
    },
    cave: {
        description: "You enter a dark cave. It seems to be a dead end. You should go back.",
        exits: { back: 'start' }
    },
    finish: {
        description: "Congratulations! You've made it through the jungle!",
        exits: {}
    }
};
let currentLocation = 'start';
function displayLocation() {
    const location = locations[currentLocation];
    console.log(location.description);
    if (location.exits) {
        const exits = Object.keys(location.exits);
        console.log(`Available exits: ${exits.join(', ')}`);
    }
}
import chalk from "chalk";
async function moveLocation() {
    const location = locations[currentLocation];
    if (location.exits) {
        const exits = Object.keys(location.exits);
        const { direction } = await inquirer.prompt([
            {
                type: "input",
                name: "direction",
                message: chalk.blue("Enter an exit:"),
                validate: (input) => exits.includes(input) || chalk.red("Invalid exit"),
            },
        ]);
        const newLocation = location.exits[direction];
        if (newLocation) {
            currentLocation = newLocation;
            displayLocation();
            if (newLocation !== "finish") {
                await moveLocation();
            }
        }
        else {
            console.log(chalk.red("You can't go that way."));
            await moveLocation();
        }
    }
    else {
        console.log(chalk.green("The adventure is over!"));
    }
}
displayLocation();
moveLocation();
