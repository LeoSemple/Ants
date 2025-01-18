import {soilHealth, soilFood, soilHealthMax, soilFoodMax, soilDistFromTop, soilNoAcross, soilNoDown, antTypeNo, speedMax, healthMax, foodStackMax, teamNo, speed, health, attackAbility, digAbility, buildAbility, foodStack, starveRate, eatRate, collectRate} from './Seed.js'
import {soilMatrix, antMatrix, idMax} from './Ants.js'


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
    antPixel.style.backgroundColor = "rgb(" + Math.floor(100) + "," + Math.floor(200 - 30 * antMatrix[a][x + idMax[a]].team) + "," + Math.floor(50 + 50 * antMatrix[a][x + idMax[a]].team) + ")";
    antPixel.style.top = + soilNoDown * 10 / 2 - 200 + soilDistFromTop + (1 - 2 * (antMatrix[a][x + idMax[a]].team % 2)) * a*20 + 2 * 200 * (antMatrix[a][x + idMax[a]].team % 2) + "px";
    antPixel.style.left = soilNoAcross * 10 / 2 - 200 + x*20 + 200 * Math.floor(antMatrix[a][x + idMax[a]].team / 2) + "px";
    antPixel.style.height = 10 + "px";
    antPixel.style.width = 10 + "px";
    antPixel.style.position = "absolute";
    antPixel.setAttribute("id","Type:" + a + ", No:" + (x + idMax[a]));
    document.body.appendChild(antPixel);

}