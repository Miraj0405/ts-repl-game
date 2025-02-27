import readline from "readline";
import { Player } from "./player";
import { Game } from "./game";

// Setup the readline interface
const lineReader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function gameLoop() {
	// Check if the player or enemy has been defeated
	if (game.player.healthPoints <= 0) {
		console.log("You have been defeated by a Cat!");
		lineReader.close();
		return;
	}
	if (game.enemy.healthPoints <= 0) {
		console.log("Congratulations! You defeated the Cat!");
		lineReader.close();
		return;
	}

	// Show player actions
	game.showActions();

	// Player turn logic
	lineReader.question("Choose your action: ", (action: string) => {
        const didUserEnterPlayAction = game.handleUserAction(action);
		if (!didUserEnterPlayAction) {
            // User entered "4" to quit
			lineReader.close();
            console.log("See you next time!");
			return;
		}

		// Enemy turn logic
		if (game.enemy.healthPoints > 0) {
			console.log(`\nThe ${enemy.name}'s turn...`);
			game.enemyTurn();
		}

		// Show current stats
		console.log(
			`\nPlayer Health: ${player.healthPoints}, Enemy Health: ${enemy.healthPoints}`,
		);
        // loop the game
		gameLoop();
	});
}

// Initialize the game
const player = new Player("DOG", 50, 10, 5, true);
const enemy = new Player("CAT", 50, 8, 6, false);
const game = new Game(player, enemy);

// Start the game loop
console.log("Battle begins!");
gameLoop();
