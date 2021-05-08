import Phaser from 'phaser'
// const jsonMap = require('../../');
// import title from './title.png';
export default class GameScene extends Phaser.Scene
{
   controls;
   cursors;
   dude;
	constructor()
	{
		super('game-scene')
	}

	preload()
    {
        // console.log(json);
        // this.load.image('sky', 'title.png')
        this.load.image('dude', "/diamond1.png");
        this.load.image('dungTiles', "/dungeon.png");
        this.load.tilemapTiledJSON('map', "/dungeon.json");
    }

    create()
    {
   
        var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32  });
        var tileset = map.addTilesetImage('dungeon','dungTiles');
        var layer = map.createLayer('ground', tileset);
        this.dude = this.physics.add.sprite(window.innerWidth/2,window.innerHeight/2,'dude');
        // this.dude.setDepth(1);
        this.physics.add.collider(this.dude, layer);
        map.setCollisionByProperty({collides:true})
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
        this.cameras.main.startFollow(this.dude, true)
    }
    update(time, delta)
    {
        // this.controls.update(delta);
        if (this.cursors.left.isDown)
    {
        this.dude.setVelocityX(-300);
    }
    else if (this.cursors.right.isDown)
    {
        this.dude.setVelocityX(300);
    }
    else
    {
        this.dude.setVelocityX(0);
    }

    if (this.cursors.up.isDown)
    {
        this.dude.setVelocityY(-300);
    }
    else if (this.cursors.down.isDown)
    {
        this.dude.setVelocityY(300);
    }
    else
    {
        this.dude.setVelocityY(0);
    }
    }
}