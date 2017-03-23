var game = null;
var player;
var cursors;
var map;
var layer;

function init() {

	var Size = {
		normal: {w: 256, h: 144}, //Zelda NES,GB (9 Zeilen)
		big: {w: 384, h: 216},	//Lufia, Zelda SNES, Alwa (13.5 Zeilen)
		max: {w: 512, h: 288},	// (18 Zeilen)	
	};

	var s = Size.big;
	this.width = s.w;
	this.height = s.h;

	game = new Phaser.Game( this.width, this.height, Phaser.CANVAS, '', null, false, false);

	game.state.add("MainGame", MainGame);

	game.state.start("MainGame");

};


var MainGame = function() {
}

MainGame.prototype = {
	init: function(argument){
	},

	preload: function(){

		game.load.tilemap('welt', 'textures/wetl.json', null, Phaser.Tilemap.TILED_JSON);

		game.load.image('tiles', 'textures/tiles.png');

		game.load.spritesheet("fig", "textures/fig.png", 32, 32, 6)
   		game.load.image('tiles', 'game/tiles.png');
   		game.load.image("bg1", "textures/wiese.png")
		game.load.audio("music", "sounds/bgsound1.wav");
	},

	create: function(){
		game.add.tileSprite(0, 0, 1920, 1920, 'bg1');
		game.world.setBounds(0, 0, 1920, 1920);
   		game.physics.startSystem(Phaser.Physics.P2JS);

   		//map = game.add.tilemap("welt");
    	//map.addTilesetImage('tiles128', 'tiles.png');

    	//this.backgroundlayer = this.map.createLayer('BackgroundLayer');
    	//this.groundLayer = this.map.createLayer('GroundLayer');

    	//this.map.setCollisionBetween(1, 100, true, 'GroundLayer');

    	//this.groundLayer.resizeWorld();

		music = game.add.audio("music");
		music.loop = true;
		music.play;


    	this.fig = game.add.sprite(game.world.centerX, game.world.centerY, 'fig');
   		game.physics.p2.enable(this.fig);
    	game.camera.follow(this.fig);

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.fig.animations.add("walkoben", [0, 1, 2], 9, true);
		this.fig.animations.add("walkunten", [3, 4, 5], 9, true);
		game.renderer.renderSession.roundPixels = true;

		this.btnUP = game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.btnDOWN = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.btnLEFT =	game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.btnRIGHT = game.input.keyboard.addKey(Phaser.Keyboard.D);

		
	},

	update: function(){
		walkoben = false;
		walkunten = false;

		this.fig.body.setZeroVelocity();
		if (this.btnUP.isDown)
		    {
		        this.fig.body.moveUp(300), walkoben = true;
		    }
		    else if (this.btnDOWN.isDown)
		    {
		        this.fig.body.moveDown(300), walkunten = true;
		    }

		    if (this.btnLEFT.isDown)
		    {
		        this.fig.body.velocity.x = -300;
		    }
		    else if (this.btnRIGHT.isDown)
		    {
		        this.fig.body.moveRight(300);
		    }

		if(this.btnUP.isUp) walkoben = false;
		if(this.btnDOWN.isUp) walkunten = false;

		if(walkoben == true){
			this.fig.animations.play("walkoben");
		}else if(walkoben == false){
			this.fig.animations.stop("walkoben");
		}

		if(walkunten == true){
			this.fig.animations.play("walkunten");
		}else if(walkunten == false){
			this.fig.animations.stop("walkunten");
		}
	}

	//render: function(){
		//game.debug.cameraInfo(game.camera, 32, 32);
    	//game.debug.spriteCoords(this.fig, 32, 125);	
	//}
}