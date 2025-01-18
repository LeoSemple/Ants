import {antMatrix, antTypeNo, topVar, leftVar} from "./Ants.js"

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