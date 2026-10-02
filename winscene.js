import Phaser from "phaser";

export default class WinScene extends Phaser.Scene {
    constructor() {
        super('WinScene');
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        const { width, height } = this.scale;

        // BLACK BG
        this.add.rectangle(0, 0, width * 2, height * 2, 0x000000);

        // VICTORY MSG
        this.add.text(width / 2, height / 3, 'VICTORY', {
            fontSize: '20px',
            fontFamily: 'monospace',
            color: '#00ff88'
        }).setOrigin(0.5);

        //FINAL SCORE
        this.add.text(width / 2, height / 2, `FINAL SCORE: ${this.finalScore}`, {
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Instrucción para reiniciar
        this.add.text(width / 2, (height / 3) * 2.3, 'PRESS SPACE TO PLAY AGAIN', {
            fontSize: '8px',
            fontFamily: 'monospace',
            color: '#aaa'
        }).setOrigin(0.5);

        // Reiniciar nivel al presionar ESPACIO
        this.input.keyboard.once('keydown-SPACE', () => {
            this.sound.stopAll();
            this.scene.start('IntroLevel');
        });
    }
}