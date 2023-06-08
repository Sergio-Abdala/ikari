var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
//GLOBAIS VARIAVEIS.
var sprites = new Array();

var GLOBAIS = {
    vida: 3,
    pontos: 0,
	lar: 40,
	alt:40,
	col: 208,
	jgsrcx: 448,
	jg: 1,
	contLoop: 0
}
sprites.push(new Sprite('images/Arcade - Ikari Warriors - Ralf & Clark.png', 'player', 8+GLOBAIS.jgsrcx*GLOBAIS.jg, 8, 32, 32, 143, 115));

sprites[encontrar('player')].img.onload = function(){
	console.log('width: '+cnv.width +' height: '+cnv.height);
    loop();
}

//************************************************************************************************ */
function loop(){
    
    // limpar tela
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for (let i = 0 ; i < sprites.length; i++) {//percorre array de sprites

		//if (!pause && !gameOver) {/////////////
			sprites[i].exe();/////////////////  movimento do jogo...            
		//}////////////////////////////////////
		sprites[i].render();/////////////// renderiza na tela...
	}    
    ctx.font = "10px Arial";//  TEXTO...
	ctx.fillStyle = '#babaca';
    ctx.fillText("texto IKARI warriors... ", cnv.width/4, cnv.height/2);
	GLOBAIS.contLoop++;
	requestAnimationFrame(loop, "canvas");
}
function encontrar(flag, n){//descobre index do objeto que corresponda a flag com maior index do array
	let num = n;
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == flag) {
			if(!num){
				return i;
			}
			num--;
		}
	}
    return false;
}
function contar(obj){//descobre quantos objetos com a mesma flag tem em jogo
    let countObj = 0;
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == obj) {
			countObj++
		}
	}
    return countObj;
}
