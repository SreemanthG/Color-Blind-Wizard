import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import GameScene from './scenes/GameScene';

const config = {
	type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
	// backgroundColor: '#A1A1A1',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [GameScene]
}

export default new Phaser.Game(config)
