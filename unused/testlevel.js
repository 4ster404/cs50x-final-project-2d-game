import Phaser from "phaser";
import createNpc from "../npc";
import npcDialogue from "../dialogue";


export default class Testlvl extends Phaser.Scene{

    constructor(){
        super('Testlvl');
    }

    player;
    npc;
    npc2;
    text;
    canMove;
    isDialogeActive = false;
    dialogues;
    cameraUI;

    preload() 
    {
        this.load.image('tileset', '/assets/mainTileset.png');
        this.load.tilemapTiledJSON('intro', '/assets/correctedWorld3layers.json');
        this.load.spritesheet('PlayerBasic', 'assets/PlayerSprite.png', { frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('npcSprite', 'assets/npc1.png', { frameWidth: 24, frameHeight: 24 });
        
        
        //DIALOGS:
        this.load.json('DialogueData', './assets/dialogues.JSON');
    }

    create() 
    {
        this.canMove = true;
        
        const map = this.make.tilemap({ key: 'intro' });
        const tiles = map.addTilesetImage('punkcity', 'tileset');

        this.dialogues = this.cache.json.get('DialogueData');
        if(this.dialogues){
            console.log("Dialogos cargados")
            //console.log(this.dialogues);
        }

        const groundLayer = map.createLayer('ground', tiles, 0, 0);
        const structureLayer = map.createLayer('buildings', tiles, 0, 0);
        const detailsLayer = map.createLayer('decoration', tiles, 0, 0);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); //establece los límites de hasta donde puede llegar la cámara

        this.npc = createNpc(this, 120, 250, 'npcSprite');
        this.npc2 = createNpc(this, 200, 250, 'npcSprite').setFlipX(true);
        


        this.player = this.physics.add.sprite(100, 250, 'PlayerBasic').setBounce(0.1); //añade al jugador con físicas

        if(this.canMove)
        {
            this.cameras.main.startFollow(this.player);
        }

        //Camera UI setup

        this.cameraUI = this.cameras.add(0,0,this.scale.width, this.scale.height);
        console.log("Camera loaded")
        this.cameraUI.ignore([structureLayer, detailsLayer, groundLayer, this.player, this.npc, this.npc2])
        


        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels); //define los límites de la pantalla, define las colisiones totales del mundo

     
        this.player.setCollideWorldBounds(true); //habilita las colisiones para que el personaje no salga de la pantalla

        groundLayer.setCollision([153]);

        this.physics.add.collider(this.player, groundLayer);

        this.physics.add.collider(this.npc, groundLayer)
        this.physics.add.collider(this.npc2, groundLayer)


        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('PlayerBasic', { start: 8, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('PlayerBasic', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [ { key: 'PlayerBasic', frame: 26 } ]
            
        });

        this.anims.create({
            key: 'static',
            frames: this.anims.generateFrameNumbers('npcSprite', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });

        

        this.npc.anims.play('static', true);
        this.npc2.anims.play('static', true);
        


        
        // this.debugGraphics = this.add.graphics();
        this.cursors = this.input.keyboard.createCursorKeys(); //activa el puente entre el código y el teclado
        
    }

    update()
    {
        
        
        if(this.canMove) //Player controls
        {
            if (this.cursors.left.isDown)
            {
                this.player.setVelocityX(-70); 
                this.player.setFlipX(true); 
            }
            else if (this.cursors.right.isDown)
            {
                this.player.setVelocityX(70); 
                this.player.setFlipX(false); 
            }
            else this.player.setVelocityX(0);



            if(this.player.body.onFloor())
            {

                if (this.cursors.left.isDown || this.cursors.right.isDown)
                {
                    this.player.anims.play('right', true);
                }
                else
                {
                    this.player.anims.play('turn', true);
                }

                if(this.cursors.up.isDown)
                {
                    this.player.setVelocityY(-100)
                    this.player.anims.play('jump', true);
                }
            }
        }



        //npcActions
        const isActionExecuted = Phaser.Input.Keyboard.JustDown(this.cursors.space); //Primera y única entrada del espacio
        npcDialogue(this, this.npc2, this.dialogues.npc1, isActionExecuted);
        
        npcDialogue(this, this.npc, this.dialogues.npc2, isActionExecuted);
        //this.add.text(200'Hello')
        //this.cameras.main.mid
        //this.cameras.main.pan()
        
        


        


    }

   
}

