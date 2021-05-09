import Phaser from 'phaser'
// const jsonMap = require('../../');
// import title from './title.png';



export default class GameScene extends Phaser.Scene {
    controls;
    cursors;
    dude;
    SPEED = 100;
    ROTATION_SPEED = 3 * Math.PI; // 0.5 arc per sec, 2 sec per arc
    ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(this.ROTATION_SPEED);
    TOLERANCE = 0.02 * this.ROTATION_SPEED;
    velocityFromRotation = Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation;
    keyA;
    keyS;
    keyD;
    keyW;
    red;
    blue;
    green;
    constructor() {
        super('game-scene')
    }
    preload() {
        // console.log(json);
        // this.load.image('sky', 'title.png')
        this.load.image('dude', "/diamond1.png");
        this.load.image('dungTiles', "/dungeon.png");
        this.load.tilemapTiledJSON('map', "/dungeon.json");
        this.load.image("red", "/red.png");
        this.load.image("green", "/green.png");
        this.load.image("blue", "/blue.png");
        
    }

    applyColour(event) {
        // Here you can see what's passed when Phaser triggers it.
        console.log(arguments);
    
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.S) {
            console.log('S was pressed');
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.W) {
            console.log('W was pressed');
        }
    }

    create() {

        var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
        var tileset = map.addTilesetImage('dungeon', 'dungTiles');
        var layer = map.createLayer('ground', tileset);
        this.dude = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'dude');
        // this.dude.setDepth(1);
        this.physics.add.collider(this.dude, layer);
        map.setCollisionByProperty({ collides: true })
        this.cursors = this.input.keyboard.createCursorKeys();

        // var controlConfig = {
        //     camera: this.cameras.main,
        //     left: cursors.left,
        //     right: cursors.right,
        //     up: cursors.up,
        //     down: cursors.down,
        //     acceleration: 0.04,
        //     drag: 0.0005,
        //     maxSpeed: 0.7
        // };

        // this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
        // this.input.keyboard.on('keydown_W', this.applyColour, this);
        this.red = this.add.image(0,0,"red");
        this.blue = this.add.image(0,0,"blue");
        this.green = this.add.image(0,0,"green");
        
        this.red.alpha = 0;
        this.blue.alpha = 0;
        this.green.alpha = 0;
        
        this.red.setScale(10000);
        this.blue.setScale(1000);
        this.green.setScale(1000);
        
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.cameras.main.startFollow(this.dude, true)
        
    }

    

    update(time, delta) {
        // this.controls.update(delta);
        if (this.cursors.left.isDown) {
            this.dude.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown) {
            this.dude.setVelocityX(300);
        }
        else {
            this.dude.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.dude.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown) {
            this.dude.setVelocityY(300);
        }
        else {
            this.dude.setVelocityY(0);
        }
        if(this.keyA.isDown) {
            this.blue.alpha = 0;
            this.green.alpha = 0;
            this.red.alpha = 0.5;
            console.log('A key pressed')
         } else if(this.keyS.isDown) {
            this.blue.alpha = 0;
            this.red.alpha = 0;
            this.green.alpha = 0.5;
            console.log('S key pressed')
         } else if(this.keyD.isDown) {
            this.red.alpha = 0;
            this.green.alpha = 0;
            this.blue.alpha = 0.5;
            console.log('D key pressed')
         } else if(this.keyW.isDown) {
            this.red.alpha = 0;
            this.green.alpha = 0;
            this.blue.alpha = 0;
            console.log('W key pressed')
         }
        this.pointerMove(this.input.activePointer);
        // this.velocityFromRotation(this.dude.rotation, this.SPEED, this.dude.body.velocity);
        
    }

    pointerMove(pointer) {
        // if (!pointer.manager.isOver) return;

        // Also see alternative method in
        // <https://codepen.io/samme/pen/gOpPLLx>

        var angleToPointer = Phaser.Math.Angle.Between(this.dude.x, this.dude.y, pointer.worldX, pointer.worldY);
        var angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - this.dude.rotation);

        if (Phaser.Math.Within(angleDelta, 0, this.TOLERANCE)) {
            this.dude.rotation = angleToPointer;
            this.dude.setAngularVelocity(0);
        } else {
            this.dude.setAngularVelocity(Math.sign(angleDelta) * this.ROTATION_SPEED_DEGREES);
        }
    }
}