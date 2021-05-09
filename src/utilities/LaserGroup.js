import Phaser from 'phaser'

export class Laser extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, 'laser');
	}

    fire(x,y,angleDelta){
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setDepth(1);
        // this.setVelocity(200,200);
                // this.setAngularVelocity(200)
        this.scene.physics.velocityFromAngle(-angleDelta,-900, this.body.velocity);
    }

    preUpdate(time, delta) {
		super.preUpdate(time, delta);
 
		if (this.y <= 0) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}


export default class LaserGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene)
	{
		super(scene.physics.world, scene)

        this.createMultiple({
            classType: Laser,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'laser'
        })
	}

    fireLaser(x,y, angleDelta){
        const laser = this.getFirstDead(false);
        if(laser) {
            laser.fire(x,y,angleDelta)
        }
    }
}
