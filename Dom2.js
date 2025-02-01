import {initializer, antGenerator, antFunction, antMatrix, antTypeNo, topVar, leftVar, soilMatrix, soilNoDown, soilNoAcross, soilHealthMax} from "./Ants trainer.js"
export let dom = 0

export function dom2Move(){

    for (let i = 0; i < antTypeNo; i += 1){//performs DOM changes after movement. Can remove when training. Can insert into above move loop to optimise when not training(?).

        for (let j = 0; j < antMatrix[i].length; j += 1){

            document.getElementById("Type:" + i + ", No:" + antMatrix[i][j].id).style.top = topVar[i][j] + "px"
            document.getElementById("Type:" + i + ", No:" + antMatrix[i][j].id).style.left = leftVar[i][j] + "px"
            
        }
    }
}

export function dom2Remove(i,j){

    document.getElementById("Type:" + i + ", No:" + antMatrix[i][j].id).remove()//can remove when training.

}

export function dom2Soil(){
		
	for (let i = 0; i < soilNoDown; i += 1){

		for (let j = 0; j < soilNoAcross; j += 1){

            document.getElementById("Down:" + i + ", Across:" + j).style.backgroundColor =  "rgb(" + Math.min(255, Math.floor(255 - 130 * soilMatrix[i][j].health/soilHealthMax)) + "," + Math.min(255, Math.floor(255 - 160 * soilMatrix[i][j].health/soilHealthMax)) + "," + Math.min(255, Math.floor(255 - 210 * soilMatrix[i][j].health/soilHealthMax)) + ")";

		}
	}
}

export function dom2Testing(){

    

	function antGeneratorExtra(){

	let a = document.getElementById("antGeneratorA").value
	let b = document.getElementById("antGeneratorB").value
	let c = document.getElementById("antGeneratorC").value

	antGenerator(a,b,c)

	}

	document.getElementById("generatorButton").onclick = function() {antGeneratorExtra()}

	function playDom(){

        dom = 1
        initializer()
	    setInterval(antFunction, 1000)
	
    }

	document.getElementById("playButton").onclick = function() {playDom()}

}