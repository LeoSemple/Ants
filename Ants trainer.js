//To do:
//modify other ant brain so only one other regarding act can be performed per ant per tick?
//create cooperative inputs for brains; leave soil scents,
//ants drop food when they die functionality (what happens if this would exceed soil max food?)- include other ant foodstack in inputs
//make Seed.js fixed for a given training run, and change for consecutive ones. //set running seed (how food is replenished, how other ants act?) as well as initial condition seed.
//add soil carrying?
//vary more ant parameters - starve rate, carry capacity...
//add other brain outputs to ownBrain inputs.


//ant sight?
//queen ant
//resting?
//drinking?

// script structure - all parameters, then all variables, then all functions? Or sort by type; soil paramteres, variables, functions, then ant parameters, variables...?

//training parameters

let foodDeclineRate = 1.25//rate at which total simulation food disappears. 1 = no decline, > 1 = faster decline.

//EXPORTS

export { initializer, antFunction, antGenerator, antMatrix, antTypeNo, topVar, leftVar, soilFood, soilNoDown, soilNoAcross, soilMatrix, idMax, foodStack, soilHealth, soilHealthMax, soilFoodMax, soilDistFromTop, speedMax, healthMax, foodStackMax, teamNo, speed, health, attackAbility, digAbility, buildAbility, starveRate, eatRate, collectRate}
//IMPORTS
//Seed.js parameters

import {initialSoilHealth, initialSoilFood, soilHealthMax, soilFoodMax, soilDistFromTop, soilNoAcross, soilNoDown, antTypeNo, speedMax, healthMax, foodStackMax, teamNo, speed, initialHealth, initialFoodStack, attackAbility, digAbility, buildAbility, starveRate, eatRate, collectRate} from './Seed.js'

//dom functions

import {dom1SoilGenerator, dom1AntGenerator, dom1EggGenerator, dom1Hatch} from './Dom1.js'
import {dom2Move, dom2Remove, dom2Soil, dom2Testing, dom} from './Dom2.js'

//variables reset in the initializer
let soilHealth = initialSoilHealth
let soilFood = initialSoilFood
let health = initialHealth
let foodStack = initialFoodStack

let soilMatrix = []

let antMatrix = []
let idMax = []
let topVar = []
let leftVar = []
let eggList = []
let queen = []//edit with proper queen values


let totalAntNo = 0
let lastTeam = -1

let teamOtherBrain = []

// own outputs ouput[0] = dig, output[1] = dig top, output[2] = dig left, output[3] = build, output[4] = build top, output[5] = build left, output[6] = collect food amount, output[7]  = nothing, output[8] = top move, output[9] = left move

let teamOwnBrain = []

let teamValue = []

function queenGenerator(a){

	queen[a] = {
		top: soilNoDown * 10 / 2 - 400 + soilDistFromTop + (a % 2) * 800,
		left: soilNoAcross * 10 / 2 - 400 + Math.floor(a / 2) * 800,
		health: 50
	}

}

function antGenerator(a, b, c){ //invoke this function every time an ant is to be created. a = ant type. b = number of ants of that type to be generated. c = team of ant.
		
	for (let x = 0; x <	b; x += 1){
	
		antMatrix[a].push({ //ant object
		id: (x + idMax[a]),
		team: c,
		speed: speed[a],
		health: health[a],
		attackAbility: attackAbility[a],
		digAbility: digAbility[a],
		buildAbility: buildAbility[a],
		foodStack: foodStack[a]
		})
		
		topVar[a].push(soilNoDown * 10 / 2 - 200 + soilDistFromTop + (1 - 2 * (antMatrix[a][antMatrix[a].length - 1].team % 2)) * a*20 + 2 * 200 * (antMatrix[a][antMatrix[a].length - 1].team % 2))
		leftVar[a].push(soilNoAcross * 10 / 2 - 200 + x*20 + 200 * Math.floor(antMatrix[a][antMatrix[a].length - 1].team / 2))

		if(dom == 1){
			dom1AntGenerator(a,x)//exclude when training
		}
	}
	
	idMax[a] += b
	totalAntNo += b //ensures that the start number of ants > 0 so the while loop operating antFunction will begin.
}

function eggGenerator(a,b,c){

	for (let x = 0; x <	b; x += 1){

		antMatrix[a].push({ //ant object
		id: (x + idMax[a]),
		team: c,
		speed: 0,
		health: health[a],
		attackAbility: 0,
		digAbility: 0,
		buildAbility: 0,
		foodStack: 1//hard coded - might be best as a variable
		})
		
		topVar[a].push(queen[c].top + 200 * Math.random())
		leftVar[a].push(queen[c].left + 200 * Math.random())	
		
		eggList.push(a, antMatrix[a][antMatrix[a].length - 1].id, 10)//10 = number of ticks to hatch

		if (dom == 1){
			dom1EggGenerator(a)//remove when training
		}
	}

	idMax[a] += 1
	totalAntNo += b

}

function initializer(){

	for (let i = 0; i < teamNo; i += 1){

		teamValue.push(0)

	}

	soilHealth = initialSoilHealth
	soilFood = initialSoilFood
	health = initialHealth
	foodStack = initialFoodStack

	soilMatrix = []
	
	antMatrix = []
	idMax = []
	topVar = []
	leftVar = []
	eggList = []
	queen = []//edit with proper queen values

	totalAntNo = 0
	lastTeam = -1
	

	teamOtherBrain = []
	
	// ouput[0] = dig, output[1] = dig top, output[2] = dig left, output[3] = build, output[4] = build top, output[5] = build left, output[6] = collect food amount, output[7]  = nothing, output[8] = top move, output[9] = left move
	teamOwnBrain = []

	for (let i = 0; i < teamNo; i += 1){

		teamOtherBrain.push({
			aggresion: [0,0,0,0],
			feed: [0,0,0,0],

		})
		teamOwnBrain.push({
			top: 0,
			left: 0,

		})

	}

	//SOIL

	for (let i = 0; i < soilNoDown; i += 1){

		soilMatrix.push([])
		
	}

	function soilGenerator(a, b){//invoke at beginning of simulation. b = number across. a = number down.

			soilMatrix[a].push({ //soil object
			health: soilHealth[a][b],
			food: soilFood[a][b]
			})
			
	}

	for (let i = 0; i <	soilNoDown; i += 1){

		for (let j = 0; j <	soilNoAcross; j += 1){

			soilGenerator(i,j)
			if(dom == 1){
				dom1SoilGenerator(i,j)//exclude when training
			}
		}
	}

	//END OF SOIL

	//ANTS

	for (let i = 0; i < antTypeNo; i += 1){

		antMatrix.push([])
		idMax.push(0)
		topVar.push([])
		leftVar.push([])
		queen.push(0)

	}

	for (let i = 0; i < antTypeNo; i += 1){

		queenGenerator(i)

		for (let j = 0; j < teamNo; j += 1){

			antGenerator(i,10,j)

		}
	}
}

function brainUpdater(){

	//if manual updates to brain parameters

}


let otherAntBrainTime = 0
let ownAntBrainTime = 0
let antEatTime = 0
let antMoveTime = 0
let antDigTime = 0
let antBuildTime = 0
let antStarveTime = 0
let antRemoveTime = 0
let antAttackTime = 0
let antCollisionTime = 0

function antFunction(){

	eggGenerator(Math.floor(9 * Math.random()), 1, Math.floor(4 * Math.random()))

	for (let i = 0; i < eggList.length; i += 3){

		if (eggList[i + 2] == 0){

			let a = eggList[i]
			let b = antMatrix[a].findIndex(item => item.id == eggList[i + 1])
			//let index = antMatrix[a].map(e => e.id).indexOf(eggList[i + 1])
			//let index = antMatrix[a].map(function(e) { return e.id; }).indexOf(eggList[i + 1])

			antMatrix[a][b].speed = speed[a]
			antMatrix[a][b].attackAbility = attackAbility[a]
			antMatrix[a][b].digAbility = digAbility[a]
			antMatrix[a][b].buildAbility = buildAbility[a]
			antMatrix[a][b].foodStack = foodStack[a]
			
			if (dom == 1){
				dom1Hatch(a, b)//exclude when training
			}

			eggList.splice(i, 3)

		}

		eggList[i + 2] -= 1

	}


	totalAntNo = 0

	for (let i = 0; i < antTypeNo; i += 1){

		totalAntNo += antMatrix[i].length

	}

	//replenish soilFood
	for(let i = 0; i < soilNoDown; i += 1){

		for(let j = 0; j < soilNoAcross; j += 1){

			if(Math.random() < totalAntNo/(soilNoAcross * soilNoDown)){// can add more food replenishment when ants do not need to be exterminated.

				soilMatrix[i][j].food = Math.min(soilMatrix[i][j].food + starveRate/foodDeclineRate, soilFoodMax)//can change when they no longer need to be exterminated

			}
		}
	}

	let antCollisionStart = performance.now()
	let collisionList = []
		
	for (let i = 0; i < antTypeNo; i += 1){//fills the collision array for this tick

		for (let j = 0; j < antMatrix[i].length; j += 1){
		
			for (let x = i; x < antTypeNo; x += 1){
				
				if (x == i){
				
					for (let y = j + 1; y < antMatrix[x].length; y += 1){ //what happens when j = antMatrix[i].length - 1?
					
						if (topVar[i][j] - topVar[x][y] <= 10
							&& topVar[i][j] - topVar[x][y] >= -10
							&& leftVar[i][j] - leftVar[x][y] <= 10
							&& leftVar[i][j] - leftVar[x][y] >= -10){
					
							collisionList.push(i)
							collisionList.push(j)
							collisionList.push(x)
							collisionList.push(y)
				
							//add [i][j],[x][y] to collision list. perhaps create a matrix instead?
							
						}
					}
				}else{
				
					for (let y = 0; y < antMatrix[x].length; y += 1){ 
					
						if (topVar[i][j] - topVar[x][y] <= 10
							&& topVar[i][j] - topVar[x][y] >= -10
							&& leftVar[i][j] - leftVar[x][y] <= 10
							&& leftVar[i][j] - leftVar[x][y] >= -10){
					
							collisionList.push(i)
							collisionList.push(j)
							collisionList.push(x)
							collisionList.push(y)
				
							//add [i][j],[x][y] to collision list. perhaps create a matrix instead?
							
						}
					}
				}
			}
		}
	}

	let antCollisionEnd = performance.now()
	antCollisionTime += antCollisionEnd - antCollisionStart

	//ANT BRAIN

	let otherChoice = []//0 = attack, 1 = feed, 2 = do nothing.

	function otherAntBrain(a,b,c,d){//OTHER ANT BRAIN. a,b = ant to decide. c,d = ant it has collided with
	
	//inputs

		let	soilTop = Math.floor((topVar[a][b] - soilDistFromTop) / 10)
		let	soilLeft = Math.floor((leftVar[a][b]) / 10)
		
		let x = antMatrix[a][b].team
		let teamDifference = 0
		
		if (x - antMatrix[c][d].team !== 0){

			teamDifference = 1
		
		}

		let input = []

		input.push(0)//collision count
		input.push(antMatrix[a][b].health)//own health
		input.push(antMatrix[a][b].speed)
		input.push(antMatrix[a][b].attackAbility)
		input.push(antMatrix[a][b].digAbility)
		input.push(antMatrix[a][b].buildAbility)
		input.push(antMatrix[a][b].foodStack)
		input.push(teamDifference)
		input.push(soilMatrix[soilTop][soilLeft].health)
		input.push(soilMatrix[soilTop + 1][soilLeft].health)
		input.push(soilMatrix[soilTop][soilLeft + 1].health)
		input.push(soilMatrix[soilTop + 1][soilLeft + 1].health)
		input.push(antMatrix[c][d].health)//other stats - how many to include????????????????
		input.push(antMatrix[c][d].attackAbility)
		input.push(antMatrix[c][d].foodStack)
		input.push(Math.random())

		//calculate an 'output' string, to be converted to choices, based on inputs and teamOtherBrain[x]
		
		if (0>1){
			
			otherChoice.push(0)//value of output
			otherChoice.push(0)//output choice (attack)
		
		} else if (0>1){

			otherChoice.push(0)//value of output
			otherChoice.push(1)//output choice (feed)
		
		} else {
		
			otherChoice.push(0)//value of output
			otherChoice.push(2)//output choice (do nothing)
		
		}
	
	}
	
	//create function here to ensure that each ant can only perform one feed/attack action per turn!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	let otherAntBrainStart = performance.now()

	for (let i = 0; i < collisionList.length; i += 4){
	
		otherAntBrain(collisionList[i],collisionList[i+1],collisionList[i+2],collisionList[i+3])
		otherAntBrain(collisionList[i+2],collisionList[i+3],collisionList[i],collisionList[i+1])
		
	}
	
	let otherAntBrainEnd = performance.now()
	otherAntBrainTime += otherAntBrainEnd - otherAntBrainStart
	
	//OWN ANT BRAIN

	let ownChoice = []//A 3d array, which gives each antMatrix[i][j] a 5 length array: ownChoice[i][j][0] = position of dig/build left ownChoice[i][j][1] = position of dig/build top, or value of food multiplier or nothing output. ownChoice[i][j][2] = dig, build or nothing. ownChoice[i][j][3] = top move value. ownChoice[i][j][4] = left move value.

	for (let i = 0; i < antTypeNo; i += 1){
	
		ownChoice.push([])
		
		for (let j = 0; j < antMatrix[i].length; j += 1){
		
			ownChoice[i].push([])
			
		}
	}

	function ownAntBrain(a,b){
	
	//inputs

		let	soilTop = Math.floor((topVar[a][b] - soilDistFromTop) / 10)
		let	soilLeft = Math.floor((leftVar[a][b]) / 10)
		
		let x = antMatrix[a][b].team
		lastTeam = x
		let teamDifference = 0
		let topDifference = soilNoDown * 10
		let leftDifference = soilNoAcross * 10

		for (let i = 0; i < antTypeNo; i += 1){

			for (let j = 0; j < antMatrix[i].length; j += 1){

				if (i !== a || j !== b){
					
					if (((topVar[a][b] - topVar[i][j]) * (topVar[a][b] - topVar[i][j]) + (leftVar[a][b] - leftVar[i][j]) * (leftVar[a][b] - leftVar[i][j])) < (topDifference * topDifference + leftDifference * leftDifference)){
					
						topDifference = topVar[i][j] - topVar[a][b]
						leftDifference = leftVar[i][j] - leftVar[a][b]

						if (x - antMatrix[i][j].team !== 0){

							teamDifference = 1
						
						}else{
						
							teamDifference = 0
						
						}
					
					}
				}

			}
		}

		let input = []

		input.push(0)//collision count
		input.push(antMatrix[a][b].health)//own stats
		input.push(antMatrix[a][b].speed)
		input.push(antMatrix[a][b].attackAbility)
		input.push(antMatrix[a][b].digAbility)
		input.push(antMatrix[a][b].buildAbility)
		input.push(antMatrix[a][b].foodStack)
		input.push(soilMatrix[soilTop][soilLeft].health)//soil stats
		input.push(soilMatrix[soilTop + 1][soilLeft].health)
		input.push(soilMatrix[soilTop][soilLeft + 1].health)
		input.push(soilMatrix[soilTop + 1][soilLeft + 1].health)
		input.push(soilMatrix[soilTop][soilLeft].food)
		input.push(soilMatrix[soilTop + 1][soilLeft].food)
		input.push(soilMatrix[soilTop][soilLeft + 1].food)
		input.push(soilMatrix[soilTop + 1][soilLeft + 1].food)
		input.push(topDifference / soilNoDown)// distance to nearest ant top, normalised to between -10 and 10
		input.push(leftDifference / soilNoAcross)// distance to nearest ant left
		input.push(teamDifference)//nearest ant same or  different team
		input.push(Math.random())
		
		for (let i = 0; i < collisionList.length; i += 2){//collision counter
		
			if (collisionList[i] == a && collisionList[i+1] == b){
			
				input[0] += 1
		
			}
		}
			
		//create output string to convert to choices below.
		
		if (0>1){
			ownChoice[a][b].push(0, 0)//position of dig (-ve or +ve)
			ownChoice[a][b].push(0)//output choice
		
		} else if (0>1){
			ownChoice[a][b].push(0, 0)//position of build (-ve or +ve)
			ownChoice[a][b].push(1)//output choice
		
		} else if (0>1){
			ownChoice[a][b].push(0, 0)//food collect multiplier, sigmoid function normalises output to between -1 and 1. Including "2" since output is usually too close to zero otherwise.	
			ownChoice[a][b].push(2)//output choice

		} else {
			
			ownChoice[a][b].push(0, 0)//value of nothing output
			ownChoice[a][b].push(3)//output choice
		
		}
		
		ownChoice[a][b].push(0) //top move output (-1 : 1)
		ownChoice[a][b].push(0) //left move output(-1 : 1)
		
	}

	let ownAntBrainStart = performance.now()

	for (let i = 0; i < antTypeNo; i += 1){
		
		for (let j = 0; j < antMatrix[i].length; j += 1){
		
			ownAntBrain(i,j)
			
		}
	}

	let ownAntBrainEnd = performance.now()
	
	ownAntBrainTime += ownAntBrainEnd - ownAntBrainStart



	//END OF ANT BRAIN
	

	function antEat(){//for feeding other ants, collecting food and eating
	
		for (let i = 0; i < antTypeNo; i += 1){//for collecting food and feeding itself

			for (let j = 0; j < antMatrix[i].length; j += 1){
				
				let a = Math.floor((topVar[i][j] + 5 - soilDistFromTop) / 10)
				let b = Math.floor((leftVar[i][j] + 5) / 10)
				//for collecting food
				
				if (ownChoice[i][j][2] == 2){

					if (ownChoice[i][j][1] >= 0){

						let foodChange = Math.min(Math.min(soilMatrix[a][b].food, collectRate * ownChoice[i][j][1]), foodStackMax - antMatrix[i][j].foodStack)
						antMatrix[i][j].foodStack += foodChange
						soilMatrix[a][b].food -= foodChange

					}else if (ownChoice[i][j][1] < 0){

						let foodChange = Math.min(Math.min(antMatrix[i][j].foodStack, - collectRate * ownChoice[i][j][1]), foodStackMax - soilMatrix[a][b].food)
						antMatrix[i][j].foodStack -= foodChange
						soilMatrix[a][b].food += foodChange

					}
				}

				//for eating
				if (antMatrix[i][j].foodStack >= eatRate){

					antMatrix[i][j].foodStack -= eatRate
					antMatrix[i][j].health = Math.min(healthMax, antMatrix[i][j].health + eatRate)//could change. Eating currently heals at the rate of food consumption.

				}else{
				
					antMatrix[i][j].health = Math.min(healthMax, antMatrix[i][j].health + antMatrix[i][j].foodStack)//could change. Eating currently heals at the rate of food consumption.
					antMatrix[i][j].foodStack = 0
				
				}
			}
		}
	
		

		for (let i = 0; i < collisionList.length; i += 4){// for feeding ants it collides with
		
			if (otherChoice[i + 3] == 1 && otherChoice[i + 2] > 0 && antMatrix[collisionList[i + 2]][collisionList[i + 3]].foodStack >= otherChoice[i + 2]){
			
			antMatrix[collisionList[i]][collisionList[i + 1]].foodStack += otherChoice[i]
			antMatrix[collisionList[i + 2]][collisionList[i + 3]].foodStack -= otherChoice[i]
			
			}
			
			if (otherChoice[i + 1] == 1 && otherChoice[i] > 0 && antMatrix[collisionList[i]][collisionList[i + 1]].foodStack >= otherChoice[i]){
			
			antMatrix[collisionList[i + 2]][collisionList[i + 3]].foodStack += otherChoice[i]
			antMatrix[collisionList[i]][collisionList[i + 1]].foodStack -= otherChoice[i]
			
			}
			
			if (antMatrix[collisionList[i]][collisionList[i + 1]].foodStack > foodStackMax){
				
					antMatrix[collisionList[i]][collisionList[i + 1]].foodStack = foodStackMax
				
			}
			
			if (antMatrix[collisionList[i + 2]][collisionList[i + 3]].foodStack > foodStackMax){
				
					antMatrix[collisionList[i + 2]][collisionList[i + 3]].foodStack = foodStackMax
				
			}
		}
	}
	
	let antEatStart = performance.now()
	antEat()
	let antEatEnd = performance.now()
	antEatTime += antEatEnd - antEatStart

	function antDig(){
	
		for (let i = 0; i < antTypeNo; i += 1){

			for (let j = 0; j < antMatrix[i].length; j += 1){
			
				if (ownChoice[i][j][2] == 0){
					
					let a = Math.floor((topVar[i][j] - soilDistFromTop) / 10)
					let b = Math.floor((leftVar[i][j]) / 10)

					if (ownChoice[i][j][0] >= 0 && ownChoice[i][j][1] >= 0){
			
						soilMatrix[a+1][b+1].health -= antMatrix[i][j].digAbility
						
						if (soilMatrix[a+1][b+1].health < 0){
							
							soilMatrix[a+1][b+1].health = 0
						
						}
						
					}else if (ownChoice[i][j][0] < 0 && ownChoice[i][j][1] >= 0){
			
						soilMatrix[a][b+1].health -= antMatrix[i][j].digAbility
						
						if (soilMatrix[a][b+1].health < 0){
							
							soilMatrix[a][b+1].health = 0
						
						}
					
					}else if (ownChoice[i][j][0] >= 0 && ownChoice[i][j][1] < 0){
			
						soilMatrix[a+1][b].health -= antMatrix[i][j].digAbility
						
						if (soilMatrix[a+1][b].health < 0){
							
							soilMatrix[a+1][b].health = 0
						
						}
						
					}else{
					
						soilMatrix[a][b].health -= antMatrix[i][j].digAbility
					
						if (soilMatrix[a][b].health < 0){
							
							soilMatrix[a][b].health = 0
						
						}
						
					}
					
					//once the above else if function is reduced so that a single soilMatrix element is selected and dug, can move the soil colour changer here to reduce computation; only need to check the colour of those that have been dug or built this frame.
					
					//disallow digging once soil health hits zero?
					//important - at the moment speeed multiplier goes >1 , and building takes extra time
				}
			}
		}
	}
	
	let antDigStart = performance.now()
	antDig()	
	let antDigEnd = performance.now()
	antDigTime += antDigEnd - antDigStart


	function antBuild(){
	
		for (let i = 0; i < antTypeNo; i += 1){

			for (let j = 0; j < antMatrix[i].length; j += 1){
			
				if (ownChoice[i][j][2] == 1){
					
					let a = Math.floor((topVar[i][j] - soilDistFromTop) / 10)
					let b = Math.floor((leftVar[i][j]) / 10)
					
					if (ownChoice[i][j][0] >= Math.abs(ownChoice[i][j][1])){
			
						if (ownChoice[i][j][1] >= 0){
							soilMatrix[a+2][b+1].health = Math.min(soilMatrix[a+2][b+1].health + antMatrix[i][j].buildAbility, soilHealthMax)
						}else{
							soilMatrix[a+2][b].health = Math.min(soilMatrix[a+2][b].health + antMatrix[i][j].buildAbility, soilHealthMax)
						}

					}else if (ownChoice[i][j][0] < - Math.abs(ownChoice[i][j][1])){
					
						if (ownChoice[i][j][1] >= 0){
							soilMatrix[a-1][b+1].health = Math.min(soilMatrix[a+2][b+1].health + antMatrix[i][j].buildAbility, soilHealthMax)
						}else{
							soilMatrix[a-1][b].health = Math.min(soilMatrix[a+2][b].health + antMatrix[i][j].buildAbility, soilHealthMax)
						}	
					}else if (ownChoice[i][j][1] >= 0){

						if (ownChoice[i][j][0] >= 0){
							soilMatrix[a][b+2].health = Math.min(soilMatrix[a+2][b+1].health + antMatrix[i][j].buildAbility, soilHealthMax)
						}else{
							soilMatrix[a+1][b+2].health = Math.min(soilMatrix[a+2][b].health + antMatrix[i][j].buildAbility, soilHealthMax)
						}
					}else{

						if (ownChoice[i][j][0] >= 0){
							soilMatrix[a+1][b-1].health = Math.min(soilMatrix[a+2][b+1].health + antMatrix[i][j].buildAbility, soilHealthMax)
						}else{
							soilMatrix[a][b-1].health = Math.min(soilMatrix[a+2][b].health + antMatrix[i][j].buildAbility, soilHealthMax)
						}
					}
					
					//once the above else if function is reduced so that a single soilMatrix element is selected and dug, can move the soil colour changer here to reduce computation; only need to check the colour of those that have been dug or built this frame.
					
					//disallow digging once soil health hits zero?
					//important - at the moment speeed multiplier goes >1 , and building takes extra time
				}
			}
		}
	}

	let antBuildStart = performance.now()
	antBuild()
	let antBuildEnd = performance.now()
	antBuildTime += antBuildEnd - antBuildStart

	function antAttack(){//deals damage. Should implement ability to only attack one target per tick!
	
		for (let i = 0; i < collisionList.length; i += 4){
		
			if (otherChoice[i+3] == 0){
			
				antMatrix[collisionList[i]][collisionList[i + 1]].health -= antMatrix[collisionList[i + 2]][collisionList[i + 3]].attackAbility
			
			}
			
			if (otherChoice[i+1] == 0){
			
				antMatrix[collisionList[i + 2]][collisionList[i + 3]].health -= antMatrix[collisionList[i]][collisionList[i + 1]].attackAbility
			
			}
		}
	}
	
	let antAttackStart = performance.now()
	antAttack()
	let antAttackEnd = performance.now()
	antAttackTime += antAttackEnd - antAttackStart

	let antRemoveMatrix = []

	for (let i = 0; i < antTypeNo; i += 1){

		antRemoveMatrix.push([])
	
	}

	function antStarve(){
	
		for (let i = 0; i < antTypeNo; i += 1){

			for (let j = antMatrix[i].length - 1; j >= 0; j -= 1){//ensures reverse order
				
				if (antMatrix[i][j].foodStack == 0){
				
					antMatrix[i][j].health -= starveRate
					
				}
				
				if (antMatrix[i][j].health <= 0){ //add ants to remove list in reverse order, including those that have lost health due to attacks.
				
					antRemoveMatrix[i].push(j)

				}
			}
		}
	}
	
	let antStarveStart = performance.now()
	antStarve()
	let antStarveEnd = performance.now()
	antStarveTime += antStarveEnd - antStarveStart

	function antMove(){

		let unmoved = []//for making the move order random

		for (let i = 0; i < antTypeNo; i += 1){

			if (antMatrix[i].length > 0){
				
				unmoved.push([])
				unmoved[unmoved.length - 1].push(i)

				for (let j = 0; j < antMatrix[i].length; j += 1){
					
					unmoved[unmoved.length - 1].push(j)

				}
			}
		}
		
		while (unmoved.length > 0){//moves ants. Occurs after other actions which use original topVar leftVar.

			let unmovedRow = Math.floor(Math.random() * unmoved.length)
			let unmovedColumn = 1 + (Math.floor(Math.random() * (unmoved[unmovedRow].length - 1)))
			let i = unmoved[unmovedRow][0]
			let j = unmoved[unmovedRow][unmovedColumn]

			let a = Math.floor((topVar[i][j] - soilDistFromTop) / 10)
			let b = Math.floor((leftVar[i][j]) / 10)

			let speedMultiplier = 1
			speedMultiplier = (1 - Math.max(soilMatrix[a][b].health,
								soilMatrix[a+1][b].health,
								soilMatrix[a][b+1].health,
								soilMatrix[a+1][b+1].health)
								/ soilHealthMax)
			
			let topVarChange = Math.min(Math.max(topVar[i][j] + Math.round(speedMultiplier * antMatrix[i][j].speed * ownChoice[i][j][3]), soilDistFromTop + 10), soilDistFromTop - 20 + soilNoDown * 10 - 1) - topVar[i][j]
			let leftVarChange = Math.min(Math.max(leftVar[i][j] + Math.round(speedMultiplier * antMatrix[i][j].speed * ownChoice[i][j][4]), 10), - 20 + soilNoAcross * 10 - 1) - leftVar[i][j]
			let largest = Math.abs(Math.max(topVarChange, leftVarChange))

			collisionLoop: for (let count = 0; count < largest; count += 1){

				for (let x = 0; x < antTypeNo; x += 1){

					for (let y = 0; y < antMatrix[x].length; y += 1){

						if (Math.round(topVar[i][j] + topVarChange/largest) - topVar[x][y] < 10
							&& Math.round(topVar[i][j] + topVarChange/largest) - topVar[x][y] > -10
							&& Math.round(leftVar[i][j] + leftVarChange/largest) - leftVar[x][y] < 10
							&& Math.round(leftVar[i][j] + leftVarChange/largest) - leftVar[x][y] > -10
							&& (i !== x || j !== y)){

								break collisionLoop
						
						}
					}
				}
						
				topVar[i][j] += topVarChange/largest
				leftVar[i][j] += leftVarChange/largest

			}

			topVar[i][j] = Math.round(topVar[i][j])
			leftVar[i][j] = Math.round(leftVar[i][j])

			unmoved[unmovedRow].splice(unmovedColumn, 1)

			if (unmoved[unmovedRow].length == 1){

				unmoved.splice(unmovedRow, 1)

			}
		}
	}

	let antMoveStart = performance.now() 
	antMove()	
	let antMoveEnd = performance.now()
	antMoveTime += antMoveEnd - antMoveStart

	//moves DOM elements
	if(dom == 1){
		dom2Move()//exclude when training
	}

	//removes dead ants. occurs after all other functions to ensure no earlier references to dead ants.
	function antRemove(){
		for (let i = 0; i < antTypeNo; i += 1){

			for (let j = 0; j < antRemoveMatrix[i].length; j += 1){

				let x = antRemoveMatrix[i][j]

				for (let y = eggList.length; y > 0; y -= 3){
					
					if (eggList[y - 3] == i && eggList[y - 2] == antMatrix[i][x].id){

						eggList.splice(y - 3, 3)

					}
				}

				if (dom == 1){
					dom2Remove(i,x)
				}
				antMatrix[i].splice(x, 1)
				topVar[i].splice(x, 1)
				leftVar[i].splice(x, 1)

			}
		}
	}

	let antRemoveStart = performance.now()
	antRemove()
	let antRemoveEnd = performance.now()
	antRemoveTime += antRemoveEnd - antRemoveStart

	//document.getElementById("para1").innerHTML = antMatrix[0][1].foodStack + "," + antMatrix[0][1].health //exclude when training
	if(dom == 1){
		dom2Soil()//exclude when training
	}

	for (let i = 0; i < antTypeNo; i += 1){//counts the number of ants of each team that survived this tick

		for (let j = 0; j < antMatrix[i].length; j += 1){

			teamValue[antMatrix[i][j].team] += 1

		}
	}
}

function play(){


	let winningValue = 0
	let winningTickNo = 0
	let winningTeam = 0

	const playStart = performance.now()

	for (let i = 0; i < 1; i += 1){
		
		initializer()
		let tickNo = 0

		while (totalAntNo > 0 && tickNo < 100){//runs the ant function until all ants are dead

			antFunction()
			tickNo += 1
			
		}		

		let bestValue = Math.max(...teamValue)
		let bestTeam = teamValue.indexOf(bestValue)

		if (bestValue > winningValue){

			winningValue = bestValue
			winningTeam = bestTeam

		}

		if (tickNo > winningTickNo){

			winningTickNo = tickNo

		}
	}

	const playEnd = performance.now()
	const playTime = playEnd - playStart
	console.log("playTime", playTime)
	console.log("otherAntBrainTime", otherAntBrainTime)
	console.log("ownAntBrainTime", ownAntBrainTime)
	console.log("antEatTime", antEatTime)
	console.log("antDigTime", antDigTime)
	console.log("antBuildTime", antBuildTime)
	console.log("antMoveTime", antMoveTime)
	console.log("antRemoveTime", antRemoveTime)
	console.log("antStarveTime", antStarveTime)
	console.log("antAttackTime", antAttackTime)
	console.log("antCollisionTime", antCollisionTime)
	console.log("extraTime", playTime - otherAntBrainTime - ownAntBrainTime - antEatTime - antDigTime - antBuildTime - antMoveTime - antRemoveTime - antStarveTime - antAttackTime)
	console.log("winningValue", winningValue)
	console.log("winningTickNo", winningTickNo)

	document.getElementById("para2").innerHTML = "Winner is Team " + lastTeam + "or" + winningTeam
}

//play()// replace with dom2Testing() for viewing
dom2Testing()//exclude when training
