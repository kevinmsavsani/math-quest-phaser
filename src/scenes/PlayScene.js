import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
    this.sumsArray = [];
    this.questionText = null;
    this.randomSum = null;
    this.timeTween = null;
    this.numberTimer = null;
    this.buttonMask = null;
    this.score = 0;
    this.scoreText = null;
    this.isGameOver = false;
    this.topScore = 0;
    this.numbersArray = [-3, -2, -1, 1, 2, 3];
  }

  preload() {
    this.load.image('timebar', 'assets/timebar.png');
    this.load.image('buttonmask', 'assets/buttonmask.png');
    this.load.spritesheet('buttons', 'assets/buttons.png', { frameWidth: 400, frameHeight: 50 });
  }

  create() {
    this.topScore = localStorage.getItem('topScore') == null ? 0 : localStorage.getItem('topScore');
    this.cameras.main.setBackgroundColor('#cccccc');

    for (let i = 1; i < 5; i++) {
      this.sumsArray[i] = [[], [], []];
      for (let j = 1; j <= 3; j++) {
        this.buildThrees(j, 1, i, j.toString());
      }
    }

    this.questionText = this.add.text(250, 160, '-', { font: 'bold 72px Arial', fill: '#000' }).setOrigin(0.5);
    this.scoreText = this.add.text(10, 10, '-', { font: 'bold 24px Arial', fill: '#000' });

    // Create and position the buttons
    this.buttons = [];
    for (let i = 0; i < 3; i++) {
      let button = this.add.sprite(250, 250 + i * 75, 'buttons').setInteractive().setFrame(i);
      button.on('pointerdown', () => this.checkAnswer(i));
      this.buttons.push(button);
    }

    this.numberTimer = this.add.sprite(50, 250, 'timebar');
    this.nextNumber();
  }

  buildThrees(initialNumber, currentIndex, limit, currentString) {
    for (let i = 0; i < this.numbersArray.length; i++) {
      let sum = initialNumber + this.numbersArray[i];
      let outputString = currentString + (this.numbersArray[i] < 0 ? '' : '+') + this.numbersArray[i];
      if (sum > 0 && sum < 4 && currentIndex === limit) {
        this.sumsArray[limit][sum - 1].push(outputString);
      }
      if (currentIndex < limit) {
        this.buildThrees(sum, currentIndex + 1, limit, outputString);
      }
    }
  }

  gameOver(gameOverString) {
    this.cameras.main.setBackgroundColor('#ff0000');
    this.questionText.text += ` = ${gameOverString}`;
    this.isGameOver = true;
    localStorage.setItem('topScore', Math.max(this.score, this.topScore));
  }

  checkAnswer(buttonIndex) {
    if (!this.isGameOver) {
      if (buttonIndex === this.randomSum) {
        this.score += Math.floor((this.buttonMask.x + 350) / 4);
        this.nextNumber();
      } else {
        if (this.score > 0) {
          this.timeTween.stop();
        }
        this.gameOver(buttonIndex + 1);
      }
    }
  }

  nextNumber() {
    this.scoreText.setText(`Score: ${this.score}\nBest Score: ${this.topScore}`);
    if (this.buttonMask) {
      this.buttonMask.destroy();
      this.tweens.killAll();
    }
    this.buttonMask = this.add.graphics({ x: 50, y: 250 });
    this.buttonMask.fillStyle(0xffffff);
    this.buttonMask.fillRect(0, 0, 400, 200);
    this.numberTimer.setMask(new Phaser.Display.Masks.GeometryMask(this, this.buttonMask));

    if (this.score > 0) {
      this.timeTween = this.tweens.add({
        targets: this.buttonMask,
        x: -350,
        duration: 3000,
        ease: 'Linear',
        onComplete: () => this.gameOver('?'),
      });
    }

    this.randomSum = Phaser.Math.Between(0, 2);
    let level = Math.min(Math.round((this.score - 100) / 400) + 1, 4);
    let sumOptions = this.sumsArray[level][this.randomSum];
    this.questionText.setText(sumOptions[Phaser.Math.Between(0, sumOptions.length - 1)]);
  }
}

export default PlayScene;
