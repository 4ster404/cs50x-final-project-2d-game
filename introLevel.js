import Phaser from "phaser";
import createNpc from "./npc";
import npcDialogue from "./dialogue";
import controls from "./controls";
import playerInstance from "./player";
import createHud from "./playerHud";
import createFlyingEnemy from "./createFlyingEnemy";
import createCoin from "./createCoin";
import createGroundEnemy from "./createGroundEnemy";
import newNpc from "./newNpc";

// import shootingControls from "./shootingControls";



export default class IntroLevel extends Phaser.Scene{
    constructor(){
        super('IntroLevel')
    }
    canMove;
    isDialogueActive = false;
    score = 0;

    init(data){
        if(data && this.score){

            this.score = data.score || 0;
        }
    }


    
    preload()
    {
        
        
        this.load.tilemapTiledJSON('level1', '/assets/Level1embed.json');
        this.load.tilemapTiledJSON('verticalScroll', '/assets/verticalscrolltilemap2.json');
        

        this.load.image('squareHud', 'assets/HudSquare.png' );
        this.load.image('heartHud', 'assets/heart.png' );

        //TODO: LOAD DIALOGS //

        this.load.json('DialogueData', './assets/dialogues.JSON');
        this.load.audio('bgmusic1', './assets/JeremyBlakebgmusicfree.mp3');
        this.load.audio('jumpSFX', './assets/sounds/jump.wav');
        this.load.audio('hurtSFX', './assets/sounds/hurt.wav');
        this.load.audio('coinSFX', './assets/sounds/coin.wav');


    }
    create()
    {
        this.canMove = true;
        
        this.bgmusic1 = this.sound.add('bgmusic1',{
            volume: 0.1,
            loop: true
        });

        this.bgmusic1.play();
        //DIALOGUES
        this.dialogues = this.cache.json.get('DialogueData');


        const map = this.make.tilemap({ key: 'verticalScroll' });
        const tiles = map.addTilesetImage('punkcity', 'tileset');

        //MAP LAYERS
        const backgroundBuildingsLayer = map.createLayer('backgroundBuildingsLayer', tiles, 0, 0)
        const structureLayer = map.createLayer('buildingsLayer', tiles, 0, 0);
        const supportLayerD = map.createLayer('supportLayerD', tiles, 0, 0).setTint(0x888888);
        const supportLayer = map.createLayer('supportLayer', tiles, 0, 0).setTint(0x888888);
        const mainDetailsLayer = map.createLayer('mainDetailsLayer', tiles, 0, 0);
        this.groundLayer = map.createLayer('ground', tiles, 0, 0);
        this.barrier = map.createLayer('invisibleground', tiles, 0, 0).setVisible(false);
        
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.player = playerInstance(this, 100, 3100 , 'PlayerSprite', 3);

        createFlyingEnemy(this, 'miniBat', 25);

        const npcPostions = [
            {x: 145, y: 3120},
            {x: 328, y: 3104},
            {x: 286, y: 2976},
            {x: 376, y: 2560},
            {x: 32, y: 2480},
            {x: 610, y: 2864},
            {x: 10, y: 3120}
        ]

        this.npcOBJarray = [];

        npcPostions.forEach((position)=>{
            const npc = newNpc(this, position.x, position.y, 'npcSprite1', "npc_turn");
            this.npcOBJarray.push(npc);
        });
        
        const flagPosition = {x: 580, y: 226};
        this.flag = this.add.sprite(flagPosition.x, flagPosition.y, 'flagRaise').setScale(1.5);
        
        
        const secondaryDetailsLayer = map.createLayer('secondaryDetailsLayer', tiles, 0, 0);

        if(this.canMove)
        {
            this.cameras.main.startFollow(this.player);
        }

        //CAMERAS
        
        createHud(this, 'squareHud', 'heartHud');
        this.cameraUI = this.cameras.add(0, 0, this.scale.width, this.scale.height);
        this.cameraUI.ignore([this.player, backgroundBuildingsLayer, structureLayer, this.groundLayer, mainDetailsLayer, secondaryDetailsLayer, supportLayer]);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        //COLLIDERS
        this.player.setCollideWorldBounds(true);
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.barrier.setCollisionByProperty({ barrier: true });

        this.physics.add.collider(this.player, this.groundLayer);

        this.player.body.setSize(12, 24);
        this.player.body.setOffset(10, 8);

        createGroundEnemy(this, 'mushroomEnemy');

        this.cursors = this.input.keyboard.createCursorKeys();

        const finishLine = this.add.zone(590, 224, 32, 100);
        this.physics.world.enable(finishLine);
        finishLine.body.setAllowGravity(false);

        this.physics.add.overlap(this.player, finishLine, () => {
            finishLine.body.enable = false; 
            this.flag.anims.play('flagRaiseAnim', true);
            this.time.delayedCall(1250, () => {
                this.flag.anims.play('flagAnim', true);
            });   
            this.time.delayedCall(4000, () => {
                this.scene.start('WinScene', { score: this.score });
            });    
        });


        createCoin(this, "coin");


     
    }
    update()
    {
        console.log(`X: ${this.player.x}`, `Y: ${this.player.y}`);


        this.npcOBJarray.forEach((npcObj)=>{
            npcObj.spaceAnimationLoop();
        })
        
        
        const isActionExecuted = Phaser.Input.Keyboard.JustDown(this.cursors.space);

        this.npcOBJarray.forEach((npcObj, index)=>{
            npcDialogue(this, npcObj, this.dialogues[`npc${index + 1}`], isActionExecuted);
        });

        createGroundEnemy.updatePatrol();
        createFlyingEnemy.updatePatrol();
        

        controls(this);

       
        this.player.updateLfePoints();

    }
}