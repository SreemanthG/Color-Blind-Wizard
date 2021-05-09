import Phaser from 'phaser'
// const jsonMap = require('../../');
// import title from './title.png';
import LaserGroup from '../utilities/LaserGroup'
export default class GameScene extends Phaser.Scene {
    controls;
    laserGroup;
    cursors;
    dude;
    SPEED = 100;
    ROTATION_SPEED = 3 * Math.PI; // 0.5 arc per sec, 2 sec per arc
    ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(this.ROTATION_SPEED);
    TOLERANCE = 0.02 * this.ROTATION_SPEED;
    keyA;
    keyS;
    keyD;
    keyW;
    red;
    blue;
    green;
    redm;
    bluem;
    greenm;
    score = 0;
    scoreField;
    velocityFromRotation = Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation;
    constructor() {
        super('game-scene')
        this.laserGroup;
    }

    preload() {
        // console.log(json);
        // this.load.image('sky', 'title.png')
        this.load.image('dude', "/wizard.png");
        this.load.image('laser', "/Bullet.png");
        this.load.image('dungTiles', "/dungeon.png");
        this.load.tilemapTiledJSON('map', "/dungeon.json");
        this.load.image("red", "/red.png");
        this.load.image("green", "/green.png");
        this.load.image("blue", "/blue.png");

        this.load.image("redm", "/Red_Monster.png");
        this.load.image("greenm", "/Green_Monster.png");
        this.load.image("bluem", "/Blue_Monster.png");
    }

    create() {
        this.laserGroup = new LaserGroup(this);
        var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
        var tileset = map.addTilesetImage('dungeon', 'dungTiles');
        var layer = map.createLayer('ground', tileset);
        this.dude = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'dude');
        // this.dude.setDepth(1);
        this.addEvents();
        this.scoreField = this.add.text(30,70,`${this.score}` )
        this.physics.add.collider(this.dude, layer);
        this.physics.add.collider(this.laserGroup, layer,this.wallboom);
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
        this.red = this.add.image(0,0,"red");
        this.blue = this.add.image(0,0,"blue");
        this.green = this.add.image(0,0,"green");

        this.redm = this.physics.add.sprite(700,400,"redm");
        this.bluem = this.physics.add.sprite(700,400,"bluem");
        this.greenm = this.physics.add.sprite(700,400,"greenm");
        
        this.red.alpha = 0;
        this.blue.alpha = 0;
        this.green.alpha = 0;
        
        this.redm.visible = false;
        this.bluem.visible = false;
        this.greenm.visible = false;

        // this.redm.setDepth(1);
        // this.bluem.setDepth(1);
        // this.greenm.setDepth(1);
        this.red.setScale(10000);
        this.blue.setScale(1000);
        this.green.setScale(1000);
        

             
        this.physics.add.collider( this.laserGroup,this.redm, this.redboom);
        this.physics.add.collider( this.laserGroup,this.bluem, this.redboom);
        this.physics.add.collider( this.laserGroup,this.greenm, this.redboom);

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        // this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
        this.cameras.main.startFollow(this.dude, true)
    }

    wallboom(one, two){
        one.destroy();
      
    }

    redboom(one, two){
        two.destroy();
        one.destroy();
        this.score++;
    }
    greenboom(one, two){
        two.destroy();
        one.destroy();
        this.score++;

    }
    blueboom(one, two){
        two.destroy();
        one.destroy();
        this.score++;

    }
    addEvents(){
        this.input.on('pointerdown', pointer=>{
            const angle = Phaser.Math.Angle.Between(this.dude.x, this.dude.y, pointer.worldX, pointer.worldY );
            // var angleDelta = Phaser.Math.Angle.Wrap(angle - this.dude.rotation)
            console.log(Phaser.Math.RadToDeg(angle));
            
            this.shootLaser(180-Phaser.Math.RadToDeg(angle));
        })
    }

    shootLaser(angleDelta){
        this.laserGroup.fireLaser(this.dude.x, this.dude.y-10,angleDelta)
    }
    update(time, delta) {

        this.scoreField.setText(`${this.score}`);

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
            this.redm.visible = true;
            this.bluem.visible = false;
            this.greenm.visible = false;
            console.log('A key pressed')
         } else if(this.keyS.isDown) {
            this.blue.alpha = 0;
            this.red.alpha = 0;
            this.green.alpha = 0.5;
            this.redm.visible = false;
            this.bluem.visible = false;
            this.greenm.visible = true;
            console.log('S key pressed')
         } else if(this.keyD.isDown) {
            this.red.alpha = 0;
            this.green.alpha = 0;
            this.blue.alpha = 0.5;
            this.redm.visible = false;
            this.bluem.visible = true;
            this.greenm.visible = false;
            console.log('D key pressed')
         } else if(this.keyW.isDown) {
            this.red.alpha = 0;
            this.green.alpha = 0;
            this.blue.alpha = 0;
            this.redm.visible = false;
            this.bluem.visible = false;
            this.greenm.visible = false;
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