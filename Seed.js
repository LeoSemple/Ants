
let initialSoilHealth = []
let initialSoilFood = []
let soilHealthMax = 10
let soilFoodMax = 10
let soilDistFromTop = 200
let soilNoAcross = 200 // number of soil blocks across the screen
let soilNoDown = 200 // number of soil blocks down the screen
let random1 = Math.random()
let random2 = Math.random()

let soilGeneratorLowerBound = soilHealthMax * Math.min(random1, random2)
let soilGeneratorUpperBound = soilHealthMax * Math.max(random1, random2)
//end of soil parameters

for (let i = 0; i < soilNoDown; i += 1){//pushes initial soilFood and soilHealth values

	initialSoilHealth.push([])
	initialSoilFood.push([])
	
	for (let j = 0; j <	soilNoAcross; j += 1){
		
		initialSoilHealth[i].push(soilGeneratorLowerBound + Math.random() * (soilGeneratorUpperBound - soilGeneratorLowerBound))
		initialSoilFood[i].push(0)
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
let initialHealth = []
let initialFoodStack = []
let attackAbility = []
let digAbility = []
let buildAbility = []
let starveRate = 0.01 // could change this to a variable parameter later with a positive minimum value, then add to ant brain.
let eatRate = 0.01 // ditto
let collectRate = 0.5 // ditto

for (let i = 0; i < antTypeNo; i += 1){

	speed.push(5 + Math.random() * speedMax / 2)
	initialHealth.push(Math.random() * healthMax)
	initialFoodStack.push(Math.random() * foodStackMax / 4)
	attackAbility.push(Math.random() * 5)
	digAbility.push(Math.random())
	buildAbility.push(Math.random())
	

}

export {initialSoilHealth, initialSoilFood, soilHealthMax, soilFoodMax, soilDistFromTop, soilNoAcross, soilNoDown, antTypeNo, speedMax, healthMax, foodStackMax, teamNo, speed, initialHealth, initialFoodStack, attackAbility, digAbility, buildAbility, starveRate, eatRate, collectRate}
