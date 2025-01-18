
let soilHealth = []
let soilFood = []
let soilHealthMax = 10
let soilFoodMax = 10
let soilDistFromTop = 200
let soilNoAcross = 100 // number of soil blocks across the screen
let soilNoDown = 100 // number of soil blocks down the screen
let random1 = Math.random()
let random2 = Math.random()

let soilGeneratorLowerBound = soilHealthMax * Math.min(random1, random2)
let soilGeneratorUpperBound = soilHealthMax * Math.max(random1, random2)
//end of soil parameters

for (let i = 0; i < soilNoDown; i += 1){//pushes initial soilFood and soilHealth values

	soilHealth.push([])
	soilFood.push([])
	
	for (let j = 0; j <	soilNoAcross; j += 1){
		
		soilHealth[i].push(soilGeneratorLowerBound + Math.random() * (soilGeneratorUpperBound - soilGeneratorLowerBound))
		soilFood[i].push(9)
	}
}


//ant parameters:
let antTypeNo = 10
let speedMax = 10
let healthMax = 10
let foodStackMax = 10
let teamNo = 4

//the below might vary throughout simulation if parameter values are changed
let speed = []
let health = []
let attackAbility = []
let digAbility = []
let buildAbility = []
let foodStack = []
let starveRate = 0.01 // could change this to a variable parameter later with a positive minimum value, then add to ant brain.
let eatRate = 0.01 // ditto
let collectRate = 0.5 // ditto

for (let i = 0; i < antTypeNo; i += 1){

	speed.push(Math.random() * speedMax)
	health.push(Math.random() * healthMax)
	attackAbility.push(Math.random() * 5)
	digAbility.push(Math.random())
	buildAbility.push(Math.random())
	foodStack.push(Math.random() * foodStackMax)

}

export {soilHealth, soilFood, soilHealthMax, soilFoodMax, soilDistFromTop, soilNoAcross, soilNoDown, antTypeNo, speedMax, healthMax, foodStackMax, teamNo, speed, health, attackAbility, digAbility, buildAbility, foodStack, starveRate, eatRate, collectRate}