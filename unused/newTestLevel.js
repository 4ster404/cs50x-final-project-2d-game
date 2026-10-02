import Phaser from "phaser";
import Player from "./playerClass.js";

export default class NewTestLevel extends Phaser.Scene{
    
    preload()
    {
        this.load.image('tileset', '/assets/mainTileset.png');
        this.load.tilemapTiledJSON('tilemapJSON', 'assets/mainmenuBG.json');
        this.load.spritesheet('PlayerSprite', 'assets/basemolipollo2.png', { 
            frameWidth: 32, frameHeight: 32 
        });
    }

    create(){
        const map = this.make.tilemap({ key: 'tilemapJSON'});
        const tiles = map.addTilesetImage('molipunk', 'tileset');

        this.buildings2 = map.createLayer('buildings2', tiles, 0, 50);
        this.buildings1 = map.createLayer('buildings', tiles, 0, 50);
        this.details = map.createLayer('details', tiles, 0, 50);
        this.details2 = map.createLayer('details2', tiles, 0, 50);
        this.ground = map.createLayer('ground', tiles, 0, 50);
        this.colliders = map.createLayer('colliders', tiles, 0, 50);

        this.player = new Player(this, 100, 300);
        if(this.player.canMove){
            this.cameras.main.startFollow(this.player);
        }
    
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.player.setCollideWorldBounds(true);

        this.ground.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.ground);

        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('PlayerSprite', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('PlayerSprite', { start: 6, end: 8 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'jumpUp',
            frames: this.anims.generateFrameNumbers('PlayerSprite', { start: 13, end: 13 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('PlayerSprite', { start: 12, end: 12 }),
            frameRate: 4,
            repeat: 1
        });
        this.anims.create({
            key: 'shootingStanding',
            frames: this.anims.generateFrameNumbers('PlayerSprite', { start: 3, end: 5 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'shootingWalking',
            frames: this.anims.generateFrameNumbers('PlayerSprite', { start: 9, end: 11 }),
            frameRate: 4,
            repeat: -1
        });
    }

    update(){
        this.player.update();
    }
}