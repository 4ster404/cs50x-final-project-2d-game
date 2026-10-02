import Phaser from 'phaser'
// import Testlvl from './testlevel';
import IntroLevel from './introLevel';
import MainMenu from './mainMenu';
// import NewTestLevel from './newTestLevel';
import GameOverScene from './gameover.js';
import WinScene from './winscene.js';

const config = {
    //scale: { mode: Phaser.Scale.FIT },
    type: Phaser.AUTO,
    width: 384,
    height: 216,
    // width: 720,
    // height: 400,
    backgroundColor: '#0E273C',
    pixelArt: true,
    render: {
        antialias: "false",
        roundPixels: "true"
    },
    zoom: 3,
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 350 },
            debug: false
        }
    },
    scene: [MainMenu, IntroLevel, GameOverScene, WinScene]
};


const game = new Phaser.Game(config);