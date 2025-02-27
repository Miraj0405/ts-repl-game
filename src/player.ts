export class Player {
	dodgeChance = 0.2;
	defenseChance = 0.5;
	isDog: boolean

	name: string;
	healthPoints: number;
	attackPoints: number;
	defensePoints: number;

	constructor(name: string, health: number, attack: number, defense: number, isDog:boolean) {
		this.name = name;
		this.healthPoints = health;
		this.attackPoints = attack;
		this.defensePoints = defense;
		this.isDog = isDog;
	}

	attack(target: Player, attackType:string) {
		let damageModifier = 1;
		let dodgeMofiifier = 0;


		if (this.isDog){
			if (attackType === "bone") {
				damageModifier = 1.5;
				target.dodgeChance += 0.1;
		    } else if (attackType === "ball") {
			damageModifier = 0.8; 
			target.dodgeChance -= 0.1;
		    } 
		} else {
			if (attackType === "fish") {
				damageModifier = 1.5;
				target.dodgeChance += 0.1;
			} else if (attackType === "tuna can") {
				damageModifier = 0.8;
				target.dodgeChance -= 0.1;
			}
		}


		const targetDodged = Math.random() < target.dodgeChance;
		if (targetDodged) {
			console.log(`${target.name} dodges the attack and takes no damage!`);
			return;
		}

		const attackDamage = Math.max(0, Math.round(this.attackPoints * damageModifier - target.defensePoints));
		target.healthPoints = Math.max(0, target.healthPoints - attackDamage);

		console.log(
			`The ${this.name} attacks ${target.name} with ${attackType} for ${attackDamage} damage!`,
		);
		target.healthPoints -= attackDamage;
	}

	defend(attacker: Player) {
		const defenseSuccess = Math.random() < this.defenseChance;
        let damageToTake = 0;
		if (defenseSuccess) {
			// defense successful, reduce damage by defense points
			damageToTake = attacker.attackPoints - this.defensePoints;
			console.log(`${this.name} successfully defends and takes no damage!`);
		} else {
            // block/defense failed, take 100% damage
			damageToTake = attacker.attackPoints;
			console.log(`${this.name} fails to defend and takes ${damageToTake} damage!`);
		}

        this.healthPoints -= damageToTake;
	}

	heal() {
		const healAmount = 5;
		this.healthPoints += healAmount;
		console.log(`${this.name} heals for ${healAmount} points!`);
	}
    chooseAttackType(): string {
		if (this.isDog) {
			return Math.random() < 0.5 ? "bone" : "ball"; // Randomly select attack type for dogs
		} else {
			return Math.random() < 0.5 ? "fish" : "tuna can"; // Randomly select attack type for cats
		}
	}
	
}
