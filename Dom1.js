import {soilMatrix, soilHealthMax, soilDistFromTop, soilNoAcross, soilNoDown, antMatrix, topVar, leftVar} from './Ants trainer.js'


export function dom1SoilGenerator(a, b){

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


export function dom1AntGenerator(a, x){
    
    let antPixel = document.createElement("div");
    antPixel.style.top = + soilNoDown * 10 / 2 - 200 + soilDistFromTop + (1 - 2 * (antMatrix[a][antMatrix[a].length - 1].team % 2)) * a*20 + 2 * 200 * (antMatrix[a][antMatrix[a].length - 1].team % 2) + "px";
    antPixel.style.left = soilNoAcross * 10 / 2 - 200 + x*20 + 200 * Math.floor(antMatrix[a][antMatrix[a].length - 1].team / 2) + "px";
    antPixel.style.height = 10 + "px";
    antPixel.style.width = 10 + "px";
    antPixel.style.position = "absolute";
    antPixel.innerHTML = "<img src = '" + antMatrix[a][antMatrix[a].length - 1].team + ".png' style = 'display: block'>";
    //for blank colour ants: antPixel.style.backgroundColor = "rgb(" + Math.floor(100) + "," + Math.floor(200 - 30 * antMatrix[a][x + idMax[a]].team) + "," + Math.floor(50 + 50 * antMatrix[a][x + idMax[a]].team) + ")";
    antPixel.setAttribute("id","Type:" + a + ", No:" + antMatrix[a][antMatrix[a].length - 1].id);
    document.body.appendChild(antPixel);

}

export function dom1EggGenerator(a){

    let eggPixel = document.createElement("div");
    eggPixel.style.top = topVar[a][topVar[a].length - 1] + "px";
    eggPixel.style.left = leftVar[a][leftVar[a].length - 1] + "px";
    eggPixel.style.height = 10 + "px";
    eggPixel.style.width = 10 + "px";
    eggPixel.style.position = "absolute";
    eggPixel.innerHTML = "<img src = 'egg.png' style = 'display: block'>";
    eggPixel.setAttribute("id","Type:" + a + ", No:" + antMatrix[a][antMatrix[a].length - 1].id);
    document.body.appendChild(eggPixel);

}

export function dom1Hatch(i, j){

    document.getElementById("Type:" + i + ", No:" + antMatrix[i][j].id).innerHTML = "<img src = '" + antMatrix[i][j].team + ".png' style = 'display: block'>";

}