//functionality for adding / removing rows as ants are created or die

import {antMatrix, antTypeNo} from "./Ants trainer.js"



//create initial ant creator with sliders - preset to types and names
//perhaps seperate table with tbody and thead

let rowPosition = 0
let colNo = 5
let row = []
let expanded = []// 0 = currently hidden, 1 = currently expanded

for(let i = 0; i < antTypeNo; i += 1){

    expanded.push(0)

}

function show(a){//set so that collapsing the top row collapses BOTH sublayers, and expanding only expands the first layer

    let rowDist = 1

    for (let i = 0; i < a; i += 1){
        rowDist += antMatrix[i].length + 1
    }

    if (expanded[a] == 0){

        for (let i = rowDist; i < antMatrix[a].length + rowDist; i += 1){
            //.show(row[i])
        }
        expanded[a] = 1

    }else{
        
        for (let i = rowDist; i < antMatrix[a].length + rowDist; i += 1){
            //.hide(row[i])
        }
        expanded[a] = 0
    }
}



for (let i = 0; i < antTypeNo; i += 1){

    row.push(document.createElement("tr"))

    let cell = []

    for (let j = 0; j < colNo; j += 1){

        cell.push(document.createElement("td"));

    }

    //give input types and presets here
    
    cell[0].setAttribute("class", "clickable");
    cell[0].onclick = function() {show(i)};
    cell[0].innerText = "Expand/hide"
    
    cell[1].setAttribute("type", "checkbox")
    cell[1].setAttribute("id", "dig" + i + ",total")
    cell[1].setAttribute("value", "Yes")

    cell[2].setAttribute("type", "checkbox")
    cell[2].setAttribute("id", "build" + i + ",total")
    cell[2].setAttribute("value", "Yes")
    
    cell[3].setAttribute("type", "checkbox")
    cell[3].setAttribute("id", "attack" + i + ",total")
    cell[3].setAttribute("value", "Yes")

    cell[4].setAttribute("type", "checkbox")
    cell[4].setAttribute("id", "flee" + i + ",total")
    cell[4].setAttribute("value", "Yes")

    for (let j = 0; j < colNo; j += 1){

        row[rowPosition].appendChild(cell[j])

    }

    document.getElementById("controlTable").appendChild(row[rowPosition])
    rowPosition += 1

    for (let j = 0; j < antMatrix[i].length; j += 1){

        row.push(document.createElement("tr"))
        let cell1 = []

        for (let j = 0; j < colNo; j += 1){
    
            cell1.push(document.createElement("td"));
    
        }

        cell1[1].setAttribute("type", "checkbox")
        cell1[1].setAttribute("id", "dig" + i + "," + j)
        cell1[1].setAttribute("value", "Yes")

        cell1[2].setAttribute("type", "checkbox")
        cell1[2].setAttribute("id", "build" + i + "," + j)
        cell1[2].setAttribute("value", "Yes")
        
        cell1[3].setAttribute("type", "checkbox")
        cell1[3].setAttribute("id", "attack" + i + "," + j)
        cell1[3].setAttribute("value", "Yes")
    
        cell1[4].setAttribute("type", "checkbox")
        cell1[4].setAttribute("id", "flee" + i + "," + j)
        cell1[4].setAttribute("value", "Yes")
        
        for (let k = 0; k < colNo; k += 1){

            row[rowPosition].appendChild(cell1[k])
    
        }

        document.getElementById("controlTable").appendChild(row[rowPosition])
        rowPosition += 1
       
    }
}