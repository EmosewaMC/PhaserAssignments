function nextScene(currentScene, nextScene) {
	console.log('From ' + currentScene.scene.key + ' to ' + nextScene);
	currentScene.scene.start(nextScene);
}

class StudioLogoIntro extends Phaser.Scene {
	constructor() {
		super('StudioLogoIntro');
	}
	preload() {
		this.load.image('studio', './assets/StudioLogo.png');
	}
	create() {
		this.input.once('pointerdown', function () {
			nextScene(this, 'D1GameScene2');
		}, this);
		this.studioSprite = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'studio').setAlpha(0);
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
			onComplete: function () { nextScene(this.parent.scene, 'D1GameScene2') },
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

class D1GameScene3 extends Phaser.Scene {
	constructor() {
		super('D1GameScene3');
	}
	preload() {
		this.load.image('blueberry', 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSLBRJfSJABUvT7tJeDy4RGOsuQb6Li-p-D-8zYZCyqtLRhgHtItinCALqqOp-sjx85b1nJqPyBx865SqU');
	}
	create() {
		this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'blueberry').setScale(0.5);
		this.input.once('pointerdown', function () {
			nextScene(this, 'StudioLogoIntro');
		}, this);
	}
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#FFFFFF',
	parent: 'mainGame',
	scene: [StudioLogoIntro, D1GameScene2, D1GameScene3]
};

const game = new Phaser.Game(config);
