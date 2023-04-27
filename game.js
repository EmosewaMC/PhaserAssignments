class D1GameScene1 extends Phaser.Scene {
	constructor() {
		super('D1GameScene1');
	}
	preload() {
		this.load.image('studio', './assets/my_very_good_studio.png');
	}
	create() {
		this.input.once('pointerdown', function () {

			console.log('From D1GameScene1 to D1GameScene2');

			this.scene.start('D1GameScene2');

		}, this);
		this.add.sprite(400, 300, 'studio').setScale(0.5);
	}
	update() {
		// console.log('in Scene 1');
	}
}

class D1GameScene2 extends Phaser.Scene {
	constructor() {
		super('D1GameScene2');
	}
	preload() {
		this.load.image('strawberry', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/800px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg');
	}
	create() {
		this.add.sprite(400, 300, 'strawberry').setScale(0.5);
		this.input.once('pointerdown', function () {

			console.log('From D1GameScene2 to D1GameScene3');

			this.scene.start('D1GameScene3');

		}, this);
	}
	update() {
		// console.log('in Scene 2');
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
		this.add.sprite(400, 300, 'blueberry').setScale(0.5);
		this.input.once('pointerdown', function () {

			console.log('From D1GameScene3 to D1GameScene1');

			this.scene.start('D1GameScene1');

		}, this);
	}
	update() {
		// console.log('in Scene 3');
	}
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#000000',
	parent: 'phaser-example',
	scene: [D1GameScene1, D1GameScene2, D1GameScene3]
};

const game = new Phaser.Game(config);
