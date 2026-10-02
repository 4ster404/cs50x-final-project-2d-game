import Phaser from "phaser";
import createNpc from "./npc";
import newNpc from "./newNpc";

export default class MainMenu extends Phaser.Scene{
    constructor()
    {
        super('mainmenu');
        this.counterStartGame = 0;
        this.hasScrollEnded = false;
    }

    preload()
    {
        this.load.image('logo', 'assets/TowerClimberLogo.png'); //Main menu logo
        this.load.image('tileset', 'assets/mainTileset.png'); //tileset
        this.load.spritesheet('npcSprite1', 'assets/npc1.png', {
            frameWidth: 24,
            frameHeight: 24
        }); //npc sprite
        this.load.spritesheet('PlayerSprite', 'assets/basemolipollo2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('mushroomEnemy', 'assets/mushroom_spritesheet.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('buttons', 'assets/Keyboard Extras.png', { frameWidth: 32, frameHeight: 16 });
        this.load.tilemapTiledJSON('tilemapJSON', 'assets/mainmenuBG.json'); //tilemap
        this.load.spritesheet('flag', 'assets/green-breeze.png', { frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('flagRaise', 'assets/green-raise.png', { frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('coin', 'assets/coin.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('miniBat', 'assets/miniBat.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('coinTaken', 'assets/effects.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemyDestroyed', 'assets/effects2.png', { frameWidth: 32, frameHeight: 32 });

        //Animations
        this.load.animation('animationJson','assets/animations.json');
    }

    create()
    {
        const map = this.make.tilemap({ key: 'tilemapJSON'});
        const tiles = map.addTilesetImage('molipunk', 'tileset');

        //BACKGROUND

        this.buildings2 = map.createLayer('buildings2', tiles, 0, 50);/////
        this.buildings1 = map.createLayer('buildings', tiles, 0, 50);//////
        this.details = map.createLayer('details', tiles, 0, 50);///////////
        this.details2 = map.createLayer('details2', tiles, 0, 50);/////////BG
        this.groundLayer = map.createLayer('ground', tiles, 0, 50);/////////////
        this.colliders = map.createLayer('colliders', tiles, 0, 50);///////

        this.backgroundArray = [
            this.buildings1, 
            this.buildings2, 
            this.details, 
            this.details2,
            this.groundLayer,
            this.colliders
        ];
        // this.backgroundArray.forEach((object, index)=>{
        //     object.setScale(2);
        // })

        //LOGO

        this.logo = this.add.image(192, 80, 'logo').setScale(0.8);
        Phaser.Actions.AddEffectShine(this.logo, {
            direction: -0.4,
            radius: 0.1,
            colorFactor: [ 0, 1, 1.5, 1 ],
            ease: 'Quad.inout',
            scale: 2, // Shorter travel distance
            yoyo: false
        });

        this.mapWidth = map.widthInPixels;

        const layers = [this.buildings1, this.buildings2, this.details, this.details2, this.groundLayer, this.colliders];

        //NPCs

        const npcPositions = [
            {x: 200, y: 388},
            {x: 250, y: 388},
            {x: 400, y: 388},
            {x: 600, y: 360},
            {x: 700, y: 360},
            {x: 1000, y: 388}
        ];

        this.npcObj = [];

        npcPositions.forEach((postion)=>{
            const npcWalk = newNpc(this, postion.x, postion.y, 'npcSprite1', 'npc_walk');
            this.npcObj.push(npcWalk);
        });

        //CAMERAS

        this.cameras.main.setScroll(100, 200).setZoom(0.5); //Camera starting position
        this.cameraUI = this.cameras.add(0, 0, this.scale.width, this.scale.height);
        this.cameraUI.ignore([layers]); //CORREGIR
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setRoundPixels(true);

        //SELECTION MENU

        this.menuOptions = [
            {text: "START GAME", action: ()=> this.scene.start('IntroLevel')},
            // {text: "SETTINGS", action: ()=> console.log("settings opened")},
            // {text: "GALLERY", action: ()=> console.log("loading art")},
            // {text: "EXIT", action: ()=> console.log("closing game")},
            
        ]

        this.optionsArrayText = [];
        this.spacinginOptions = 20;

        this.menuOptions.forEach((option, index) => {
            const optionsText = this.add.text(192, 100 + index + this.spacinginOptions, option.text, {
                fontSize: 15,
                fontFamily: "monospace",
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);

            this.spacinginOptions += 20;

            this.optionsArrayText.push(optionsText);
        })

        this.navigationIndex = 0;
        this.spacinginOptions = 20;
        
        this.cameras.main.ignore([this.logo, this.optionsArrayText]);



        //COLLISIONS SETUP

        this.groundLayer.setCollisionByProperty({ collides: true });


        //CONTROLS

        this.cursors = this.input.keyboard.createCursorKeys();
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        if(this.cursors && this.enterKey) console.log("Controles cargados"); 
        this.input.keyboard.on('keydown-ENTER', ()=>{
            this.executeAction();
        });

        
        
        
    }
    

    update(){

        const down = Phaser.Input.Keyboard.JustDown(this.cursors.down);
        const up = Phaser.Input.Keyboard.JustDown(this.cursors.up);
        const enter = Phaser.Input.Keyboard.JustDown(this.enterKey);

        if(down || up){
            if(down) this.navigationIndex++;
            if(up) this.navigationIndex--;
            
            if(this.navigationIndex > this.optionsArrayText.length - 1){
                this.navigationIndex = 0;
            }
            else if(this.navigationIndex < 0){
                this.navigationIndex = this.optionsArrayText.length - 1;
            }
            this.optionsArrayText.forEach((option, index)=>{
                const tempText = this.menuOptions[index].text;

                if(index === this.navigationIndex){
                    option.setText(`► ${tempText} ◄`);
                }
                else{
                    option.setText(`${tempText}`);
                }
            });  
        }

        //CAMERA LOOP
        if(this.cameras.main.scrollX < 1024 & !this.hasScrollEnded){
            this.cameras.main.scrollX += 0.3;
        }
        else if(this.cameras.main.scrollX >= 1024 & !this.hasScrollEnded){
            this.hasScrollEnded = true;
        }
        else if(this.hasScrollEnded){
            this.cameras.main.scrollX -= 0.3;
            if(this.cameras.main.scrollX <= 192) this.hasScrollEnded = false;
        }
        
        //NPC PATROL BEHAVIOR


        const distancePattern = [40, 15, 35, 12, 30, 18];

        this.npcObj.forEach((npc, index)=>{
            
            const speed = 20;
            npc.updatePatrol(speed, distancePattern[index]);

        })
    }

    executeAction(){
        this.menuOptions[this.navigationIndex].action()
        //console.log(this.navigationIndex)
    }
}
