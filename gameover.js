import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        const { width, height } = this.scale;

        // Fondo y Texto
        this.add.rectangle(0, 0, width * 2, height * 2, 0x000000);

        this.add.text(width / 2, height / 3, 'GAME OVER', {
            fontSize: '20px',
            fontFamily: 'monospace',
            color: '#ff0000'
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2, `FINAL SCORE: ${this.finalScore}`, {
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(width / 2, (height / 3) * 2.3, 'PRESS SPACE TO START AGAIN', {
            fontSize: '8px',
            fontFamily: 'monospace',
            color: '#aaa'
        }).setOrigin(0.5);

        // Control to reset
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.score = 0;
            this.scene.start('IntroLevel', {score: this.scene.score}); // O la escena principal de tu juego
        });
    }
}