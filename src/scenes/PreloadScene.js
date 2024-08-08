import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('background', 'assets/background.png');
        this.load.spritesheet('hero', 'assets/hero.png', {
      frameWidth: 16, frameHeight: 16
    });
    this.load.spritesheet('enemy', 'assets/enemy.png', {
      frameWidth: 16, frameHeight: 16
    });
    this.load.image('door', 'assets/door.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('back', 'assets/back.png');
  }

  create() {
    this.scene.start('MenuScene');
  }
}

export default PreloadScene;
