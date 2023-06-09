function Sprite(imgSrc, flag, srcX, srcY, lar, alt, posX, posY){
	//atributos.............................
		this.img = new Image();
		this.img.src = imgSrc;
        this.srcX = srcX;
		this.srcY = srcY;
        this.lar = lar;
		this.alt = alt;
		this.escala = 1;
        this.posX = posX;
		this.posY = posY;
        this.movRight = false;
		this.movLeft = false;
		this.movUp = false;
		this.movDown = false;
		this.speed = 1;
        this.flag = flag;
		this.frame = 1;
		this.varia = 1;
		this.dir = null;
    //metodos..............................
    this.render = function(){//renderizar em tela...
        //if (this.exibir) {
            ctx.drawImage(this.img, this.srcX, this.srcY, this.lar, this.alt, this.posX, this.posY, this.lar*this.escala, this.alt*this.escala);
        //}		
    }
    this.exe = function(){
        //movimento 
        if(this.movRight){
            this.posX += this.speed;
            
        }else if(this.movLeft){
            this.posX -= this.speed;
            
        }else{
            
        }
        if (this.movUp) {
            this.posY -= this.speed;
        }else if(this.movDown){
            this.posY += this.speed;
        }else{
			
        }
		if(this.flag == 'player'){		
			this.pernas = 296;
			this.skin = 448;
			this.col = 208;
			//animação
			if(!(GLOBAIS.contLoop % 8)) {
				if(this.frame > 3 || this.frame < 1) {
					this.varia *= -1;
					this.frame+= this.varia;
				}else{
					this.frame+= this.varia;
				}
				if(!GLOBAIS.atirando){
					if (this.srcY > this.pernas) {
						this.srcY -= this.pernas;
					}
					if (encontrar('torax')) {
						sprites[encontrar('torax')].flag = 'remover';
					}					
				}
			}
			
			if (this.movDown) {
				this.srcY = 8;
				this.srcX = 8 + this.skin * GLOBAIS.jg + GLOBAIS.lar * this.frame;
				//inserir torax e tiro
				this.dir = 'down';
			}
			if (this.movUp) {
				this.srcY = 48;
				this.srcX = 8 + this.skin * GLOBAIS.jg + GLOBAIS.lar * this.frame + this.col;
				this.dir = 'up';
			}
			if (this.movLeft) {
				this.srcY = 48;
				this.srcX = 8 + this.skin * GLOBAIS.jg + GLOBAIS.lar * this.frame;
				this.dir = 'left';
			}
			if (this.movRight) {
				this.srcY = 8;
				this.srcX = 8 + this.skin * GLOBAIS.jg + GLOBAIS.lar * this.frame + this.col;
				this.dir = 'right';
			}
			if (this.movLeft && this.movDown) {
				this.srcY = 88;
				this.srcX = 8 + this.skin * GLOBAIS.jg + GLOBAIS.lar * this.frame;
				this.dir = 'left-down';
			}
			if (this.movLeft && this.movUp) {
				this.srcY = 128;
				this.srcX = 8 + this.skin * GLOBAIS.jg + GLOBAIS.lar * this.frame;
				this.dir = 'left-up';
			}
			if (this.movUp && this.movRight) {
				this.srcY = 88;
				this.srcX = 8 + this.skin * GLOBAIS.jg + GLOBAIS.lar * this.frame + this.col;
				this.dir = 'right-up';
			}
			if (this.movDown && this.movRight) {
				this.srcY = 128;
				this.srcX = 8 + this.skin * GLOBAIS.jg + GLOBAIS.lar * this.frame + this.col;
				this.dir = 'right-down';
			}

			if (GLOBAIS.atirando) {
				this.srcY += this.pernas;
				GLOBAIS.atirando = false;
				switch (this.dir) {
					case 'down':
						sprites.push(new Sprite('images/Arcade - Ikari Warriors - Ralf & Clark-transparente.png', 'torax', 88, 472, 32, 32, this.posX, this.posY));
						//this.dir = null;
						break;
					case 'up':
						sprites.push(new Sprite('images/Arcade - Ikari Warriors - Ralf & Clark-transparente.png', 'torax', 336, 472, 32, 32, this.posX, this.posY));
						break;
					case 'left':
						sprites.push(new Sprite('images/Arcade - Ikari Warriors - Ralf & Clark-transparente.png', 'torax', 168, 472, 32, 32, this.posX, this.posY));
						break;
					case 'right':
						sprites.push(new Sprite('images/Arcade - Ikari Warriors - Ralf & Clark-transparente.png', 'torax', 216, 472, 32, 32, this.posX, this.posY));
						break;
					case 'left-up':
						sprites.push(new Sprite('images/Arcade - Ikari Warriors - Ralf & Clark-transparente.png', 'torax', 168, 512, 32, 32, this.posX, this.posY));
						break;
					case 'left-down':
						sprites.push(new Sprite('images/Arcade - Ikari Warriors - Ralf & Clark-transparente.png', 'torax', 88, 512, 32, 32, this.posX, this.posY));
						break;
					case 'right-up':
						sprites.push(new Sprite('images/Arcade - Ikari Warriors - Ralf & Clark-transparente.png', 'torax', 216, 512, 32, 32, this.posX, this.posY));
						break;
					case 'right-down':
						sprites.push(new Sprite('images/Arcade - Ikari Warriors - Ralf & Clark-transparente.png', 'torax', 336, 512, 32, 32, this.posX, this.posY));
						break;
				
					default:
						break;
				}
			}
			if (encontrar('torax')) {
				sprites[encontrar('torax')].posX = this.posX;
				sprites[encontrar('torax')].posY = this.posY;
			}
		}
    }
}
Sprite.prototype.metax = function(){
	return (this.lar) / 2;
}
Sprite.prototype.metay = function(){
	return (this.alt) / 2;
}
Sprite.prototype.meiox = function(){
	return this.posX + this.metax();
}
Sprite.prototype.meioy = function(){
	return this.posY + this.metay();
}
function bloqueando(p1, p2){//(personagem, objeto)
	// p1 --> personagem
	// p2 --> parede bloqueante elemento de interação..
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//p2.ver = false;
		//setTimeout(function(){ p2.ver = true; }, 1000);
		let overlapx = somax - Math.abs(catx);
		let overlapy = somay - Math.abs(caty);
		if (overlapx >= overlapy) { //colisão por cima ou por baixo
			this.metaHorizontal = this.metaVertical = null;
			p1.movUp = p1.movDown = p1.movLeft = p1.movRight = false;
			if (caty > 0) { // bateu a cabeça do personagem colidiu parte de cima do personagem que esta sendo controlado
				p1.posY += overlapy;
				//
				console.log('bateu cabeça: '+ p2.id);
				if (p2.id == 'porta') {
					console.log('entrou '+ p2.txt);
					//aqui muda de fase....					
					sprites[encontrar('player')].fase = p2.txt;					
				}
			} else {
				p1.posY -= overlapy;
				//
				console.log('esta pisando: '+ p2.id);
				if (p2.id == 'porta') {
					console.log('saiu '+ p2.txt);
					//aqui muda de fase....					
					sprites[encontrar('player')].fase = p2.txt;					
				}
			}
		} else { // colisão pelos lados esquerda ou direita
			this.metaHorizontal = this.metaVertical = null;
			p1.movUp = p1.movDown = p1.movLeft = p1.movRight = false;
			if(catx > 0){ // colidiu na esquerda
				p1.posX += overlapx;
				//
				console.log('player bateu à esquerda: '+ p2.id);
			}else{
				p1.posX -= overlapx;
				//
				console.log('player bateu à direita: '+ p2.id);
			}
		}
	}
}
function empurando(p2, p1){//(personagem, objeto)
	// p1 --> personagem
	// p2 --> parede bloqueante elemento de interação..
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//p2.ver = false;
		//setTimeout(function(){ p2.ver = true; }, 1000);
		let overlapx = somax - Math.abs(catx);
		let overlapy = somay - Math.abs(caty);
		if (overlapx >= overlapy) { //colisão por cima ou por baixo
			if (caty > 0) { // bateu a cabeça do personagem colidiu parte de cima do personagem que esta sendo controlado
				p1.worldY += overlapy; 
			} else {
				p1.worldY -= overlapy;
			}
		} else { // colisão pelos lados esquerda ou direita
			if(catx > 0){ // colideu na esquerda
				p1.worldX += overlapx;
			}else{
				p1.worldX -= overlapx;
			}
		}
	}
}
function colide(p1, p2){
	// p1 --> personagem
	// p2 --> parede bloqueante elemento de interação..
	//catetos distancia entre os pontos
	let catx = p1.meiox() - p2.meiox();
	let caty = p1.meioy() - p2.meioy();
	//soma das metades
	let somax = p1.metax() + p2.metax();
	let somay = p1.metay() + p2.metay();
	// tocando-se!!!!!!!!!!
	if (Math.abs(catx) < somax && Math.abs(caty) < somay) {
		//p2.ver = false;
		return true;
	}else{
		return false;
	}
}