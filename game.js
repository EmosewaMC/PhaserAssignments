function nextScene(currentScene, nextScene) {
	console.log('From ' + currentScene.scene.key + ' to ' + nextScene);
	currentScene.scene.start(nextScene);
}

class PlayIntro extends Phaser.Scene {
	constructor() {
		super('PlayIntro');
	}
	preload() {
	}
	create() {
		this.input.once('pointerdown', function () {
			nextScene(this, 'StudioLogoIntro');
		}, this);
		this.add.text(
			275,
			100,
			'Click to start',
			{
				font: '32px Arial',
				fill: '#FFFFFF',
				align: 'left',
				stroke: '0xFFFFFF',
				strokeThickness: 4
			}
		);
	}
}


class StudioLogoIntro extends Phaser.Scene {
	constructor() {
		super('StudioLogoIntro');
	}
	preload() {
		this.load.image('studio', './assets/StudioLogo.png');
		this.load.audio('intro', './assets/ArmorGamesIntro.mp3')
	}
	create() {
		this.input.once('pointerdown', function () {
			this.sound.stopAll();
			nextScene(this, 'D1GameScene2');
		}, this);
		this.studioSprite = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'studio').setAlpha(0);
		this.sound.play(
			'intro',
			{
				volume: 0.25
			}
		);
		this.tweens.add({
			targets: this.studioSprite,
			duration: 1000,
			alpha: 1,
			delay: 750,
		});
		this.tweens.add({
			targets: this.studioSprite,
			duration: 1000,
			delay: 2750,
			alpha: 0,
			onComplete: function () { this.parent.scene.sound.stopAll(); nextScene(this.parent.scene, 'D1GameScene2') },
		});
	}
}

class D1GameScene2 extends Phaser.Scene {
	constructor() {
		super('D1GameScene2');
	}
	preload() {
		this.load.image('ocean', './assets/EmptyOcean.jpeg');
	}
	create() {
		this.input.once('pointerdown', function () {
			nextScene(this, 'D1GameScene3');
		}, this);
		this.oceanSprite = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'ocean').setScale(0.5).setAlpha(0);
		this.tweens.add({
			targets: this.oceanSprite,
			duration: 1000,
			alpha: 1
		});
		this.mast = this.add.rectangle(
			415,
			290,
			10,
			100,
			'0xFFFFFF',
			1
		);
		this.shipBase = this.add.rectangle(
			415, // posx
			350, // posy
			100, // width
			40, // height
			'0xFFFFFF',
			1
		);

		this.tweens.add({
			targets: this.shipBase,
			duration: 10000,
			x: -100,
			repeatDelay: 500
		});
		this.tweens.add({
			targets: this.mast,
			duration: 10000,
			x: -100,
			repeatDelay: 500,
			onComplete: function () {
				nextScene(this.parent.scene, 'D1GameScene3');
			}
		});
		this.shipBase.setStrokeStyle(2, '0x000000', 1);
		this.mast.setStrokeStyle(2, '0x000000', 1);
	}
}

function renderText(scene, text, x, y) {
	scene.add.text(
		x,
		y,
		text,
		{
			font: '64px Arial',
			fill: '#FFFFFF',
			align: 'center',
			stroke: '0xFFFFFF',
			strokeThickness: 6
		}
	);
}

class D1GameScene3 extends Phaser.Scene {
	constructor() {
		super('D1GameScene3');
	}
	preload() {
		this.load.image('blueberry', './assets/goldfish.png');
		this.load.image('menuText', './assets/menu_text.png')
		this.load.audio('menu', './assets/ts2_streets_cut.mp3');
	}
	create() {
		this.add.sprite(500, 350, 'blueberry').setScale(0.25);
		this.add.sprite(100, 200, 'menuText').setScale(0.5);
		renderText(this, 'Extreme Fishing 3', 275, 25);
		this.add.text(
			275,
			100,
			'Press F to fish and when a \nfish is ready press G to pull up.\nClick to proceed.',
			{
				font: '32px Arial',
				fill: '#FFFFFF',
				align: 'left',
				stroke: '0xFFFFFF',
				strokeThickness: 4
			}
		);
		this.sound.play(
			'menu',
			{
				volume: 0.5,
			}
		);
		this.input.once('pointerdown', function () {
			this.sound.stopAll();
			nextScene(this, 'EndScene');
		}, this);
	}
}

class EndScene extends Phaser.Scene {
	constructor() {
		super('EndScene');
	}
	preload() {
		this.load.image('end', './assets/EndScene.png');
	}
	create() {
		this.endSprite = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'end');
	}
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#FFFFFF',
	parent: 'mainGame',
	scene: [PlayIntro, StudioLogoIntro, D1GameScene2, D1GameScene3, EndScene]
};

const game = new Phaser.Game(config);
