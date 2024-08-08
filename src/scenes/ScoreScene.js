import BaseScene from './BaseScene';

class ScoreScene extends BaseScene {
  constructor(config) {
    super('ScoreScene', config);
  }

  create() {
    super.create();
    this.add.text(this.screenCenter[0], this.screenCenter[1] - 50, 'High Scores', this.fontOptions).setOrigin(0.5, 0.5);
    // Display high scores (this is a placeholder, implement according to your score management)
    this.add.text(this.screenCenter[0], this.screenCenter[1], '1. Player1 - 1000', this.fontOptions).setOrigin(0.5, 0.5);
    this.add.text(this.screenCenter[0], this.screenCenter[1] + this.lineHeight, '2. Player2 - 800', this.fontOptions).setOrigin(0.5, 0.5);
    this.createMenu([
      { text: 'Back to Menu', action: () => this.scene.start('MenuScene') }
    ], menuItem => {
      menuItem.textGO.setInteractive().on('pointerup', menuItem.action);
    });
  }
}

export default ScoreScene;
