//To do:
//modify other ant brain so only one other regarding act can be performed per ant per tick
//


	//compete
	//queen ant
	//carry food to queen
	//different strengths (soil carry, food carry)
	//resting?
	//drinking?

// script structure - all parameters, then all variables, then all functions? Or sort by type; soil paramteres, variables, functions, then ant parameters, variables...?

//training parameters

let foodDeclineRate = 1.5 //rate at which total simulation food disappears. 1 = no decline, > 1 = faster decline.

//SOIL

//soil parameters:

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
		soilFood[i].push(Math.random() * soilFoodMax)
	}
}

let soilMatrix = []

for (let i = 0; i < soilNoDown; i += 1){
	soilMatrix.push([])
	
}

function soilGenerator(a, b){//invoke at beginning of simulation. a = number across. b = number down.

		soilMatrix[a].push({ //soil object
		health: soilHealth[a][b],
		})
		

		let soilPixel = document.createElement("div");
		soilPixel.style.backgroundColor =  "rgb(" + Math.min(255, Math.floor(255 - 130 * soilMatrix[a][b].health/soilHealthMax)) + "," + Math.min(255, Math.floor(255 - 160 * soilMatrix[a][b].health/soilHealthMax)) + "," + Math.min(255, Math.floor(255 - 210 * soilMatrix[a][b].health/soilHealthMax)) + ")";
		soilPixel.style.top = soilDistFromTop + a*10 + "px";
		soilPixel.style.left = b*10 + "px";
		soilPixel.style.height = 10 + "px";
		soilPixel.style.width = 10 + "px";
		soilPixel.style.position = "absolute";
		soilPixel.setAttribute("id","Down:" + a + ", Across:" + b);
		document.body.appendChild(soilPixel);


}

for (let i = 0; i <	soilNoDown; i += 1){

	for (let j = 0; j <	soilNoAcross; j += 1){

		soilGenerator(i,j)

	}
}

//function soilUpdater(a,b){// to track soil health?
//
//	document.getElementById("Across:" + a + ", Down:" + b).style.backgroundColor = "rgb(" + Math.floor(255 - 130 * soilMatrix[a][b].health/soilHealthMax) + "," + Math.floor(255 - 160 * soilMatrix[a][b].health/soilHealthMax) + "," + Math.floor(255 - 210 * soilMatrix[a][b].health/soilHealthMax) + ")"
//
//}



//END OF SOIL

//ANTS

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
//end of ant parameters

let antMatrix = []
let idMax = []

for (let i = 0; i < antTypeNo; i += 1){

	antMatrix.push([])
	idMax.push(0)
	
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
		

		let antPixel = document.createElement("div");
		antPixel.style.backgroundColor = "rgb(" + Math.floor(100) + "," + Math.floor(200 - 30 * antMatrix[a][x + idMax[a]].team) + "," + Math.floor(50 + 50 * antMatrix[a][x + idMax[a]].team) + ")";
		antPixel.style.top = + soilNoDown * 10 / 2 - 200 + soilDistFromTop + (1 - 2 * (antMatrix[a][x + idMax[a]].team % 2)) * a*20 + 2 * 200 * (antMatrix[a][x + idMax[a]].team % 2) + "px";
		antPixel.style.left = soilNoAcross * 10 / 2 - 200 + x*20 + 200 * Math.floor(antMatrix[a][x + idMax[a]].team / 2) + "px";
		antPixel.style.height = 10 + "px";
		antPixel.style.width = 10 + "px";
		antPixel.style.position = "absolute";
		antPixel.setAttribute("id","Type:" + a + ", No:" + (x + idMax[a]));
		document.body.appendChild(antPixel);
		

	}
	
	idMax[a] += b
}


antGenerator(0,10,0)
antGenerator(1,10,0)
antGenerator(2,10,0)
antGenerator(3,10,0)
antGenerator(4,10,0)
antGenerator(5,10,0)
antGenerator(6,10,0)
antGenerator(7,10,0)
antGenerator(8,10,0)
antGenerator(9,10,0)

antGenerator(0,10,1)
antGenerator(1,10,1)
antGenerator(2,10,1)
antGenerator(3,10,1)
antGenerator(4,10,1)
antGenerator(5,10,1)
antGenerator(6,10,1)
antGenerator(7,10,1)
antGenerator(8,10,1)
antGenerator(9,10,1)

antGenerator(0,10,2)
antGenerator(1,10,2)
antGenerator(2,10,2)
antGenerator(3,10,2)
antGenerator(4,10,2)
antGenerator(5,10,2)
antGenerator(6,10,2)
antGenerator(7,10,2)
antGenerator(8,10,2)
antGenerator(9,10,2)

antGenerator(0,10,3)
antGenerator(1,10,3)
antGenerator(2,10,3)
antGenerator(3,10,3)
antGenerator(4,10,3)
antGenerator(5,10,3)
antGenerator(6,10,3)
antGenerator(7,10,3)
antGenerator(8,10,3)
antGenerator(9,10,3)


//ANT BRAIN

//could create different brains for different ant types, or just include ant stats as brain inputs. could create individual ant brains unique to each one.

//OTHER BRAIN

//inputs
// normalise all inputs to between -1 and 1?

let otherInputNo = 16

//attack - count
//feed - count
//collision - count

//collisionList - perhaps run the attack and feed decisions (NN) once per collision?
//object stats of collided ant. Then make feed and attack decisions.



//end of inputs


//nodes

//nodes - each branch multiplies input between 1 and 0. Each node then multiplies or sums all branches.

//could create node objects with coefficient and error properties


let otherNodeNo = 8
let otherHiddenLayerNo = 4
let otherOutputNo = 3

let teamOtherBrain = []

for (let x = 0; x < teamNo; x += 1){

	teamOtherBrain.push({
	otherNodeMatrix: []})

	teamOtherBrain[x].otherNodeMatrix.push([])

	for (let j = 0; j < otherNodeNo; j += 1){//fills first layer of teamOtherBrain[x].otherNodeMatrix

		teamOtherBrain[x].otherNodeMatrix[0].push([])
		
		for (let k = 0; k < otherInputNo; k += 1){
		
			teamOtherBrain[x].otherNodeMatrix[0][j].push(((Math.random() - 0.5) / (0.5 * Math.sqrt(otherInputNo)))) //coefficients
		
		}
		
		teamOtherBrain[x].otherNodeMatrix[0][j].push(Math.random() - 0.5)//const term
	}

	for (let i = 1; i < otherHiddenLayerNo; i += 1){//fills additional hidden layers of teamOtherBrain[x].otherNodeMatrix IMPORTANT has to be layer (i.e. column) then number (i.e. row) so that each full layer is computed before the next layer starts.

		teamOtherBrain[x].otherNodeMatrix.push([])

		for (let j = 0; j < otherNodeNo; j += 1){//fills first layer of teamOtherBrain[x].otherNodeMatrix

			teamOtherBrain[x].otherNodeMatrix[i].push([])
			
			for (let k = 0; k < otherNodeNo; k += 1){
			
				teamOtherBrain[x].otherNodeMatrix[i][j].push((Math.random() - 0.5) / (0.5 * Math.sqrt(otherNodeNo))) //coefficients
			
			}
			
			teamOtherBrain[x].otherNodeMatrix[i][j].push(Math.random() - 0.5)//const term
		}
	}

	teamOtherBrain[x].otherNodeMatrix.push([])

	for (let i = 0; i < otherOutputNo; i += 1){//fills final layer of teamOtherBrain[x].otherNodeMatrix i.e. outputs. 0 = feed, 1 = attack, 2 = nothing.
		
		teamOtherBrain[x].otherNodeMatrix[otherHiddenLayerNo].push([])
		
		for (let j = 0; j < otherNodeNo; j += 1){
		
			teamOtherBrain[x].otherNodeMatrix[otherHiddenLayerNo][i].push((Math.random() - 0.5) / (0.5 * Math.sqrt(otherNodeNo)))//coefficients
		
		}
		
		teamOtherBrain[x].otherNodeMatrix[otherHiddenLayerNo][i].push(Math.random() - 0.5)//const term
	}
}

console.log("other")
console.log(teamOtherBrain[0].otherNodeMatrix)
console.log(teamOtherBrain[1].otherNodeMatrix)

//end of nodes

//outputs


//eat - binary
//drink - binary
//build yes/no
//dig yes/no
//dig - 0,1,2,3
//build - 0,1,2,3
//feed - binary
//attack - binary


//leftMove - -1:1
//topMove - -1:1



//end of outputs


//OWN BRAIN

//inputs

let ownInputNo = 13

//nodes

//nodes - each branch multiplies input between 1 and 0. Each node then multiplies or sums all branches.


let ownNodeNo = 8
let ownHiddenLayerNo = 4
let ownOutputNo = 8// ouput[0] = dig, output[1] = dig location, output[2] = build, output[3] = build location, output [4] = collect food amount, output [5] = nothing, output[6] = top move, output[7] = left move

let teamOwnBrain = []

for (let x = 0; x < teamNo; x += 1){

	teamOwnBrain.push({
	ownNodeMatrix: []})

	teamOwnBrain[x].ownNodeMatrix.push([])

	for (let j = 0; j < ownNodeNo; j += 1){//fills first layer of teamOwnBrain[x].ownNodeMatrix

		teamOwnBrain[x].ownNodeMatrix[0].push([])
		
		for (let k = 0; k < ownInputNo; k += 1){
		
			teamOwnBrain[x].ownNodeMatrix[0][j].push((Math.random() - 0.5) / (0.5 * Math.sqrt(ownInputNo))) //coefficients
		
		}
		
		teamOwnBrain[x].ownNodeMatrix[0][j].push(Math.random() - 0.5)//const term
	}

	for (let i = 1; i < ownHiddenLayerNo; i += 1){//fills additional hidden layers of teamOwnBrain[x].ownNodeMatrix IMPORTANT has to be layer (i.e. column) then number (i.e. row) so that each full layer is computed before the next layer starts.

		teamOwnBrain[x].ownNodeMatrix.push([])

		for (let j = 0; j < ownNodeNo; j += 1){//fills first layer of teamOwnBrain[x].ownNodeMatrix

			teamOwnBrain[x].ownNodeMatrix[i].push([])
			
			for (let k = 0; k < ownNodeNo; k += 1){
			
				teamOwnBrain[x].ownNodeMatrix[i][j].push((Math.random() - 0.5) / (0.5 * Math.sqrt(ownNodeNo))) //coefficients
			
			}
			
			teamOwnBrain[x].ownNodeMatrix[i][j].push(Math.random() - 0.5)//const term
		}
	}

	teamOwnBrain[x].ownNodeMatrix.push([])

	for (let i = 0; i < ownOutputNo; i += 1){//fills final layer of teamOwnBrain[x].ownNodeMatrix i.e. outputs. // ouput[0] = dig, output[1] = dig location, output[2] = build, output[3] = build location, output [4] = nothing, output[5] = top move, output[6] = left move
		
		teamOwnBrain[x].ownNodeMatrix[ownHiddenLayerNo].push([])
		
		for (let j = 0; j < ownNodeNo; j += 1){
		
			teamOwnBrain[x].ownNodeMatrix[ownHiddenLayerNo][i].push((Math.random() - 0.5) / (0.5 * Math.sqrt(ownNodeNo)))//coefficients
		
		}
		
		teamOwnBrain[x].ownNodeMatrix[ownHiddenLayerNo][i].push(Math.random() - 0.5)//const term
	}
}

console.log("own")
console.log(teamOwnBrain[0].ownNodeMatrix)
console.log(teamOwnBrain[1].ownNodeMatrix)




//end of nodes

//outputs


//eat - binary
//drink - binary
//build yes/no
//dig yes/no
//dig - 0,1,2,3
//build - 0,1,2,3
//feed - 
//attack - 


//leftMove - -1:1
//topMove - -1:1



//end of outputs

//END OF ANT BRAIN




function antFunction(){

	let totalAntNo = 0

	for (let i = 0; i < antTypeNo; i += 1){

		totalAntNo += antMatrix[i].length

	}

	//replenish soilFood
	for(let i = 0; i < soilNoDown; i += 1){

		for(let j = 0; j < soilNoAcross; j += 1){

			if(Math.random() < totalAntNo/(soilNoAcross * soilNoDown)){// can add more food replenishment when ants do not need to be exterminated.

				soilFood[i][j] = Math.min(soilFood[i][j] + starveRate/foodDeclineRate, soilFoodMax)//can change when they no longer need to be exterminated

			}
		}
	}

	let topVar = []
	let leftVar = []
	let foodChange = []//for use in antEat() function.

	for (let i = 0; i < antTypeNo; i += 1){

		topVar.push([])
		leftVar.push([])
		foodChange.push([])
		
		for (let j = 0; j < antMatrix[i].length; j += 1){
		
			topVar[i].push(0)
			leftVar[i].push(0)
			foodChange[i].push(0)
		
		}
	}

	for (let i = 0; i < antTypeNo; i += 1){//fills the positions for all ants this tick (and any other unique properties to be replaced this tick e.g. sight, health?). Would it reduce processing if it instead chooses the first ant of the first type, and performs all functions on it (see, then build, then attack, then move). Then repeats this for the rest of the type 1 ants, then repeats for all of ant type 2 etc. Instead of all ants see, then all build...

		for (let j = 0; j < antMatrix[i].length; j += 1){
				
			let a = antMatrix[i][j].id
			
			topVar[i][j] = Number(document.getElementById("Type:" + i + ", No:" + a).style.top.slice(0, document.getElementById("Type:" + i + ", No:" + a).style.top.length - 2))
			leftVar[i][j] = Number(document.getElementById("Type:" + i + ", No:" + a).style.left.slice(0, document.getElementById("Type:" + i + ", No:" + a).style.left.length - 2))
			
			//ant sight?
		}
	}

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

	//ANT BRAIN
	
	let otherBrainUseCount = 0
	let otherChoice = []//0 = attack, 1 = feed, 2 = do nothing.

	function otherAntBrain(a,b,c,d){//OTHER ANT BRAIN. a,b = ant to decide. c,d = ant it has collided with
	
	//inputs

		let	soilTop = Math.floor((topVar[a][b] - soilDistFromTop) / 10)
		let	soilLeft = Math.floor((leftVar[a][b]) / 10)
		
		let x = antMatrix[a][b].team
		let teamDifference = 0
		
		if (x - antMatrix[c][d].team < 0){
		
			teamDifference += x - antMatrix[c][d].team + teamNo
		
		}else{
		
			teamDifference += x - antMatrix[c][d].team
		
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

		
		for (let i = 0; i < collisionList.length; i += 2){//collision counter
		
			if (collisionList[i] == a && collisionList[i+1] == b){
			
				input[0] += 1
		
			}
		}
		
		//hidden layers
		
		let otherNodeOutputs = []
		
		otherNodeOutputs.push([])
		
		for (let j = 0; j < otherNodeNo; j += 1){//computes first layer of node values. create a larger first layer????
			
			otherNodeOutputs[0].push(0)
			
			for (let k = 0; k < otherInputNo; k += 1){//adds regressor terms
			
				otherNodeOutputs[0][j] += teamOtherBrain[x].otherNodeMatrix[0][j][k] * input[k]
			
			}
			
			otherNodeOutputs[0][j] += teamOtherBrain[x].otherNodeMatrix[0][j][otherInputNo]//adds constant term
		}	
				
		
		for (let i = 1; i < otherHiddenLayerNo; i += 1){//computes consecutive layers of hidden node values
		
			otherNodeOutputs.push([])
			
			for (let j = 0; j < otherNodeNo; j += 1){
			
				otherNodeOutputs[i].push(0)
			
				for (let k = 0; k < otherNodeNo; k += 1){
			
					otherNodeOutputs[i][j] += teamOtherBrain[x].otherNodeMatrix[i][j][k] * otherNodeOutputs[i-1][k]
					
				}
				
				otherNodeOutputs[i][j] += teamOtherBrain[x].otherNodeMatrix[i][j][otherNodeNo]
				
			}
		}
		
		otherNodeOutputs.push([])
		
		for (let i = 0; i < otherOutputNo; i += 1){//computes final (output) layer of node values.
		
			otherNodeOutputs[otherHiddenLayerNo].push(0)
			
			for (let j = 0; j < otherNodeNo; j += 1){//adds regressor terms
			
				otherNodeOutputs[otherHiddenLayerNo][i] += teamOtherBrain[x].otherNodeMatrix[otherHiddenLayerNo][i][j] * otherNodeOutputs[otherHiddenLayerNo - 1][j]//how to select inout variables?
				
			}
			
			otherNodeOutputs[otherHiddenLayerNo][i] += teamOtherBrain[x].otherNodeMatrix[otherHiddenLayerNo][i][otherNodeNo]//adds constant term
		}	
	
	//outputs
		
		if (otherNodeOutputs[otherHiddenLayerNo][0] > otherNodeOutputs[otherHiddenLayerNo][1] && otherNodeOutputs[otherHiddenLayerNo][0] > otherNodeOutputs[otherHiddenLayerNo][2]){
		
			otherChoice.push(otherNodeOutputs[otherHiddenLayerNo][0])//value of output
			otherChoice.push(0)//output choice (attack)
		
		} else if (otherNodeOutputs[otherHiddenLayerNo][1] > otherNodeOutputs[otherHiddenLayerNo][2]){
		
			otherChoice.push(otherNodeOutputs[otherHiddenLayerNo][1])//value of output
			otherChoice.push(1)//output choice (feed)
		
		} else {
		
			otherChoice.push(otherNodeOutputs[otherHiddenLayerNo][2])//value of output
			otherChoice.push(2)//output choice (do nothing)
		
		}
		
		
		
		otherBrainUseCount += 1
		
	document.getElementById("para3").innerHTML = otherChoice
	
	}
	
	
	//create function here to ensure that each ant can only perform one feed/attack action per turn!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	
	
	for (let i = 0; i < collisionList.length; i += 4){
	
		otherAntBrain(collisionList[i],collisionList[i+1],collisionList[i+2],collisionList[i+3])
		otherAntBrain(collisionList[i+2],collisionList[i+3],collisionList[i],collisionList[i+1])
		
	}
	
	
	
	//OWN ANT BRAIN
	

	let ownBrainUseCount = 0
	let ownChoice = []//A 3d array, which gives each antMatrix[i][j] a 5 length array: ownChoice[i][j][0] = position of dig/build or value of nothing output. ownChoice[i][j][1] = dig, build or nothing. ownChoice[i][j][2] = food collect amount. ownChoice[i][j][3] = top move value. ownChoice[i][j][4] = left move value.

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
		input.push(0)//otherChoice output. fill in!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		input.push(Math.random())
		
		for (let i = 0; i < collisionList.length; i += 2){//collision counter
		
			if (collisionList[i] == a && collisionList[i+1] == b){
			
				input[0] += 1
		
			}
		}
		
		//hidden layers
		
		let ownNodeOutputs = []
		
		ownNodeOutputs.push([])
		
		for (let j = 0; j < ownNodeNo; j += 1){//computes first layer of node values. create a larger first layer????
			
			ownNodeOutputs[0].push(0)
			
			for (let k = 0; k < ownInputNo; k += 1){//adds regressor terms
			
				ownNodeOutputs[0][j] += teamOwnBrain[x].ownNodeMatrix[0][j][k] * input[k]
			
			}
			
			ownNodeOutputs[0][j] += teamOwnBrain[x].ownNodeMatrix[0][j][ownInputNo]//adds constant term
		}	
				
		
		for (let i = 1; i < ownHiddenLayerNo; i += 1){//computes consecutive layers of hidden node values
		
			ownNodeOutputs.push([])
			
			for (let j = 0; j < ownNodeNo; j += 1){
			
				ownNodeOutputs[i].push(0)
			
				for (let k = 0; k < ownNodeNo; k += 1){
			
					ownNodeOutputs[i][j] += teamOwnBrain[x].ownNodeMatrix[i][j][k] * ownNodeOutputs[i-1][k]
					
				}
				
				ownNodeOutputs[i][j] += teamOwnBrain[x].ownNodeMatrix[i][j][ownNodeNo]
				
			}
		}
		
		ownNodeOutputs.push([])
		
		for (let i = 0; i < ownOutputNo; i += 1){//computes final (output) layer of node values.
		
			ownNodeOutputs[ownHiddenLayerNo].push(0)
			
			for (let j = 0; j < ownNodeNo; j += 1){//adds regressor terms
			
				ownNodeOutputs[ownHiddenLayerNo][i] += teamOwnBrain[x].ownNodeMatrix[ownHiddenLayerNo][i][j] * ownNodeOutputs[ownHiddenLayerNo - 1][j]//how to select inout variables?
				
			}
			
			ownNodeOutputs[ownHiddenLayerNo][i] += teamOwnBrain[x].ownNodeMatrix[ownHiddenLayerNo][i][ownNodeNo]//adds constant term
		}	
	
	//outputs
		
		if (ownNodeOutputs[ownHiddenLayerNo][0] > ownNodeOutputs[ownHiddenLayerNo][2] && ownNodeOutputs[ownHiddenLayerNo][0] > ownNodeOutputs[ownHiddenLayerNo][4] && ownNodeOutputs[ownHiddenLayerNo][0] > ownNodeOutputs[ownHiddenLayerNo][5]){
		
			ownChoice[a][b].push(ownNodeOutputs[ownHiddenLayerNo][1])//position of dig
			ownChoice[a][b].push(0)//output choice
		
		} else if (ownNodeOutputs[ownHiddenLayerNo][2] > ownNodeOutputs[ownHiddenLayerNo][4] && ownNodeOutputs[ownHiddenLayerNo][0] > ownNodeOutputs[ownHiddenLayerNo][5]){
		
			ownChoice[a][b].push(ownNodeOutputs[ownHiddenLayerNo][3])//position of build
			ownChoice[a][b].push(2)//output choice
		
		} else {
			
			ownChoice[a][b].push(ownNodeOutputs[ownHiddenLayerNo][5])//value of nothing output
			ownChoice[a][b].push(5)//output choice
		
		}
		
		ownChoice[a][b].push(Math.max(0, (2 * ((1 / (1 + Math.exp(- 5 * ownNodeOutputs[ownHiddenLayerNo][5]))) - 0.5))))//food collect amount, sigmoid function normalises output to between -1 and 1, and then Math.max() ensures non-negative. Including "5" since output is usually too close to zero otherwise.
		ownChoice[a][b].push(2 * ((1 / (1 + Math.exp(- 5 * ownNodeOutputs[ownHiddenLayerNo][5]))) - 0.5))//top move output, sigmoid function normalises output to between -1 and 1. Including "5" since output is usually too close to zero otherwise.
		ownChoice[a][b].push(2 * ((1 / (1 + Math.exp(- 5 * ownNodeOutputs[ownHiddenLayerNo][6]))) - 0.5))//left move output, sigmoid function normalises output to between -1 and 1. Including "5" since output is usually too close to zero otherwise.
		
		
		ownBrainUseCount += 1
		
	document.getElementById("para2").innerHTML = ownChoice[0][0]
	
	}





	for (let i = 0; i < antTypeNo; i += 1){
		
		for (let j = 0; j < antMatrix[i].length; j += 1){
		
			ownAntBrain(i,j)
			
		}
	}



	//END OF ANT BRAIN
	

	function antEat(){//for feeding other ants, collecting food and eating
	
		for (let i = 0; i < antTypeNo; i += 1){//for collecting food and feeding itself

			for (let j = 0; j < antMatrix[i].length; j += 1){
				
				let a = Math.floor((topVar[i][j] + 5 - soilDistFromTop) / 10)
				let b = Math.floor((leftVar[i][j] + 5) / 10)
				//for collecting food
				
				foodChange[i][j] = Math.min(Math.min(soilFood[a][b], collectRate * ownChoice[i][j][2]), foodStackMax - antMatrix[i][j].foodStack)
				antMatrix[i][j].foodStack += foodChange[i][j]
				soilFood[a][b] -= foodChange[i][j]

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
	
	antEat()
	
	function antDig(){
	
		for (let i = 0; i < antTypeNo; i += 1){

			for (let j = 0; j < antMatrix[i].length; j += 1){
			
				if (ownChoice[i][j][1] == 0){
					
					let a = Math.floor((topVar[i][j] - soilDistFromTop) / 10)
					let b = Math.floor((leftVar[i][j]) / 10)

					if (ownChoice[i][j][0] >= 1){
			
						soilMatrix[a+1][b+1].health -= antMatrix[i][j].digAbility
						
						if (soilMatrix[a+1][b+1].health < 0){
							
							soilMatrix[a+1][b+1].health = 0
						
						}
						
						document.getElementById("Down:" + (a + 1) + ", Across:" + (b + 1)).style.backgroundColor =  "rgb(" + Math.floor(255 - 130 * soilMatrix[a + 1][b + 1].health/soilHealthMax) + "," + Math.floor(255 - 160 * soilMatrix[a + 1][b + 1].health/soilHealthMax) + "," + Math.floor(255 - 210 * soilMatrix[a + 1][b + 1].health/soilHealthMax) + ")";

			
					}else if (ownChoice[i][j][0] >= 0){
			
						soilMatrix[a][b+1].health -= antMatrix[i][j].digAbility
						
						if (soilMatrix[a][b+1].health < 0){
							
							soilMatrix[a][b+1].health = 0
						
						}
						
						document.getElementById("Down:" + a + ", Across:" + (b + 1)).style.backgroundColor =  "rgb(" + Math.floor(255 - 130 * soilMatrix[a][b + 1].health/soilHealthMax) + "," + Math.floor(255 - 160 * soilMatrix[a][b + 1].health/soilHealthMax) + "," + Math.floor(255 - 210 * soilMatrix[a][b + 1].health/soilHealthMax) + ")";

					
					}else if (ownChoice[i][j][0] >= -1){
			
						soilMatrix[a+1][b].health -= antMatrix[i][j].digAbility
						
						if (soilMatrix[a+1][b].health < 0){
							
							soilMatrix[a+1][b].health = 0
						
						}
						
						document.getElementById("Down:" + (a + 1) + ", Across:" + b).style.backgroundColor =  "rgb(" + Math.floor(255 - 130 * soilMatrix[a + 1][b].health/soilHealthMax) + "," + Math.floor(255 - 160 * soilMatrix[a + 1][b].health/soilHealthMax) + "," + Math.floor(255 - 210 * soilMatrix[a + 1][b].health/soilHealthMax) + ")";

						
					}else{
					
						soilMatrix[a][b].health -= antMatrix[i][j].digAbility
					
						if (soilMatrix[a][b].health < 0){
							
							soilMatrix[a][b].health = 0
						
						}
						
						document.getElementById("Down:" + a + ", Across:" + b).style.backgroundColor =  "rgb(" + Math.floor(255 - 130 * soilMatrix[a][b].health/soilHealthMax) + "," + Math.floor(255 - 160 * soilMatrix[a][b].health/soilHealthMax) + "," + Math.floor(255 - 210 * soilMatrix[a][b].health/soilHealthMax) + ")";
					
					}
					
					//once the above else if function is reduced so that a single soilMatrix element is selected and dug, can move the soil colour changer here to reduce computation; only need to check the colour of those that have been dug or built this frame.
					
					//disallow digging once soil health hits zero?
					//important - at the moment speeed multiplier goes >1 , and building takes extra time
				}
			}
		}
	}
	
	antDig()	
	
	function antBuild(){
	
		for (let i = 0; i < antTypeNo; i += 1){

			for (let j = 0; j < antMatrix[i].length; j += 1){
			
				if (ownChoice[i][j][1] == 2){
					
					let a = Math.floor((topVar[i][j] - soilDistFromTop) / 10)
					let b = Math.floor((leftVar[i][j]) / 10)
					
					if (ownChoice[i][j][0] >= 1){
			
						soilMatrix[a+1][b+1].health += antMatrix[i][j].buildAbility
						
						if (soilMatrix[a+1][b+1].health > soilHealthMax){
							
							soilMatrix[a+1][b+1].health = soilHealthMax
						
						}
						
						document.getElementById("Down:" + (a + 1) + ", Across:" + (b + 1)).style.backgroundColor =  "rgb(" + Math.floor(255 - 130 * soilMatrix[a + 1][b + 1].health/soilHealthMax) + "," + Math.floor(255 - 160 * soilMatrix[a + 1][b + 1].health/soilHealthMax) + "," + Math.floor(255 - 210 * soilMatrix[a + 1][b + 1].health/soilHealthMax) + ")";

			
					}else if (ownChoice[i][j][0] >= 0){
			
						soilMatrix[a][b+1].health += antMatrix[i][j].buildAbility
						
						if (soilMatrix[a][b+1].health > soilHealthMax){
							
							soilMatrix[a][b+1].health = soilHealthMax
						
						}
						
						document.getElementById("Down:" + a + ", Across:" + (b + 1)).style.backgroundColor =  "rgb(" + Math.floor(255 - 130 * soilMatrix[a][b + 1].health/soilHealthMax) + "," + Math.floor(255 - 160 * soilMatrix[a][b + 1].health/soilHealthMax) + "," + Math.floor(255 - 210 * soilMatrix[a][b + 1].health/soilHealthMax) + ")";

					
					}else if ((ownChoice[i][j][0] >= -1)){
			
						soilMatrix[a+1][b].health += antMatrix[i][j].buildAbility
						
						if (soilMatrix[a+1][b].health > soilHealthMax){
							
							soilMatrix[a+1][b].health = soilHealthMax
						
						}
						
						document.getElementById("Down:" + (a + 1) + ", Across:" + b).style.backgroundColor =  "rgb(" + Math.floor(255 - 130 * soilMatrix[a + 1][b].health/soilHealthMax) + "," + Math.floor(255 - 160 * soilMatrix[a + 1][b].health/soilHealthMax) + "," + Math.floor(255 - 210 * soilMatrix[a + 1][b].health/soilHealthMax) + ")";

						
					}else{
					
						soilMatrix[a][b].health += antMatrix[i][j].buildAbility
					
						if (soilMatrix[a][b].health > soilHealthMax){
							
							soilMatrix[a][b].health = soilHealthMax
						
						}
						
						document.getElementById("Down:" + a + ", Across:" + b).style.backgroundColor =  "rgb(" + Math.floor(255 - 130 * soilMatrix[a][b].health/soilHealthMax) + "," + Math.floor(255 - 160 * soilMatrix[a][b].health/soilHealthMax) + "," + Math.floor(255 - 210 * soilMatrix[a][b].health/soilHealthMax) + ")";
					
					}
					
					//once the above else if function is reduced so that a single soilMatrix element is selected and dug, can move the soil colour changer here to reduce computation; only need to check the colour of those that have been dug or built this frame.
					
					//disallow digging once soil health hits zero?
					//important - at the moment speeed multiplier goes >1 , and building takes extra time
				}
			}
		}
	}

	antBuild()



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
		
	antAttack()
	

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
	
	antStarve()


	for (let i = 0; i < antTypeNo; i += 1){//moves ants. Occurs after other actions which use original topVar leftVar.

		for (let j = 0; j < antMatrix[i].length; j += 1){
			
			function antMove(){
				
				let speedMultiplier = 1
				
				
				let a = Math.floor((topVar[i][j] - soilDistFromTop) / 10)
				let b = Math.floor((leftVar[i][j]) / 10)
				
				speedMultiplier = (1 - Math.max(soilMatrix[a][b].health,
									soilMatrix[a+1][b].health,
									soilMatrix[a][b+1].health,
									soilMatrix[a+1][b+1].health)
									/ soilHealthMax)
				
				topVar[i][j] = Math.min(Math.max(topVar[i][j] + Math.round(speedMultiplier * antMatrix[i][j].speed * ownChoice[i][j][3]), soilDistFromTop), soilDistFromTop - 10 + soilNoDown * 10 - 1)
				leftVar[i][j] = Math.min(Math.max(leftVar[i][j] + Math.round(speedMultiplier * antMatrix[i][j].speed * ownChoice[i][j][4]), 0), - 10 + soilNoAcross * 10 - 1)
				
			}
			
			antMove()

		}
	}

	for (let i = 0; i < antTypeNo; i += 1){//performs DOM changes after movement. Can remove when training. Can insert into above move loop to optimise when not training(?).

		for (let j = 0; j < antMatrix[i].length; j += 1){

			document.getElementById("Type:" + i + ", No:" + antMatrix[i][j].id).style.top = topVar[i][j] + "px"
			document.getElementById("Type:" + i + ", No:" + antMatrix[i][j].id).style.left = leftVar[i][j] + "px"
			
		}
	}

	//removes dead ants. occurs after all other functions to ensure no earlier references to dead ants.
	for (let i = 0; i < antTypeNo; i += 1){

		for (let j = 0; j < antRemoveMatrix[i].length; j += 1){

			document.getElementById("Type:" + i + ", No:" + antMatrix[i][antRemoveMatrix[i][j]].id).remove()//can remove when training.
			antMatrix[i].splice(antRemoveMatrix[i][j], 1)

		}
	}

	document.getElementById("para1").innerHTML = antMatrix[0][1].foodStack + "," + antMatrix[0][1].health
	
	for (let i = 0; i < soilNoDown; i += 1){

		for (let j = 0; j < soilNoAcross; j += 1){

			document.getElementById("Down:" + i + ", Across:" + j).innerHTML = Math.round(soilFood[i][j])

		}
	}

}



function antGeneratorExtra(){

let a = document.getElementById("antGeneratorA").value
let b = document.getElementById("antGeneratorB").value
let c = document.getElementById("antGeneratorC").value

antGenerator(a,b,c)

}


function play(){
let antFrame = setInterval(antFunction, 1000)
}
