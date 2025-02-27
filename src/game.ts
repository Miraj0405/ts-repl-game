import type { Player } from "./player";

export class Game {
    player: Player;
    enemy: Player;

    constructor(player: Player, enemy: Player){
        this.player = player;
        this.enemy = enemy;
    }

    public showActions(): void{
        console.log("\nChoose an action:");
        console.log(this.player.isDog ? "1: Attack with Bone\n2: Attack with Ball" : "1: Attack with Fish\n2: Attack with Tuna Can");
        console.log("2: Defend");
        console.log("3: Heal");
        console.log("4: Quit");
    }

    public handleUserAction(input: string): boolean {
        console.log(`Action chosen: ${input}`);
        switch (input) {
            case "1": // Attack (High Damage)
                this.player.attack(this.enemy, this.player.isDog ? "bone" : "fish");
                break;

            case "2": // Attack (Low Damage)
                this.player.attack(this.enemy, this.player.isDog ? "ball" : "tuna can");
                break;

            case "3": // Defend
                this.player.defend(this.enemy)
                break;

            case "4": // Heal
                this.player.heal()
                break;

            case "5": // Quit
                console.log(`${this.player.name} quits the battle.`);
                return false;

            default:
                console.log("Invalid action. Try again.");
        }

         // Ensure health remains a whole number after any action
         this.player.healthPoints = Math.round(this.player.healthPoints);
         this.enemy.healthPoints = Math.round(this.enemy.healthPoints);
         
        return true;
    }

    enemyTurn() {
        // Random choice: 1 (Attack), 2 (Defend), 3 (Heal)
        const action = Math.floor(Math.random() * 4) + 1;

        switch (action) {
            case 1: // Attack with high damage
                this.enemy.attack(this.player, this.enemy.isDog ? "bone" : "fish");
                break;

            case 2: // Attack with low damage
                this.enemy.attack(this.player, this.enemy.isDog ? "ball" : "tuna can");
                break;

            case 3: // Defend
                this.enemy.defend(this.player);
                break;

            case 4: // Heal
                this.enemy.heal();
                break;
        }
        // Ensure health remains a whole number after enemy's turn
        this.player.healthPoints = Math.round(this.player.healthPoints);
        this.enemy.healthPoints = Math.round(this.enemy.healthPoints);
    }
}

