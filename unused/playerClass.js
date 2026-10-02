import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){ //Params of the class
        super(scene, x, y, 'PlayerSprite'); //Params parent class needs + spriteKey

        scene.add.existing(this); //adding player and physics to the this
        scene.physics.add.existing(this);
        
        this.lifePoints = 5;
        this.isInvulnerable = false;
        this.canMove = true;
        this.isPreparingJump = false;
        this.cursors = scene.input.keyboard.createCursorKeys();
        if(this.cursors) console.log("Controls active");
        this.currentScene = scene;
        this.isShooting = false;
        
        
    }

    update(){
        this.controls()
    }

    controls(){

        if(this.canMove){
            if(this.isPreparingJump)
            {
                this.setVelocityX(0);
                this.anims.play('jump', true);
            }
            else{

                this.doubleJump(1);
                this.shooting();
        
                //LEFT CURSOR ACTION
                if (this.cursors.left.isDown)
                {
                    this.setVelocityX(-50); 
                    this.setFlipX(true);
                }
    
                //RIGHT CURSOR ACTION
                else if (this.cursors.right.isDown)
                {
                    this.setVelocityX(50); 
                    this.setFlipX(false); 
                }
                //STANDING STILL ACTION
                else {
                    this.setVelocityX(0);
                }
                //---------------------------------
                // //ANIMATIONS 
            if(this.body.onFloor())
            {
                if (this.cursors.left.isDown || this.cursors.right.isDown)
                {
                    if(this.isShooting){
                        this.anims.play('shootingWalking', true);
                    }
                    else{
                        this.anims.play('right', true);
                    }
                }
                else
                {
                    if(this.isShooting){
                        this.anims.play('shootingStanding', true);
                    }
                    else{
                        this.anims.play('turn', true);
                    }
                }
            }
            else{
                this.anims.play('jumpUp', true);
            }   
            }

        }

            
        

    }

    doubleJump(maxJump){
        const maxJumpCount = maxJump - 1;
        
        const isUpDown = Phaser.Input.Keyboard.JustDown(this.cursors.up);
    
        //FIRST JUMP
        if(isUpDown && this.body.onFloor() && !this.isPreparingJump){
            this.isPreparingJump = true;
            this.setVelocityX(0);
            
            this.currentScene.time.delayedCall(150, ()=>{
                this.setVelocityY(-200);
                this.jumpCounter++;
                this.isPreparingJump = false;
            });
            
        }
    
        //FOLLOWING JUMPS
        if(isUpDown && !this.body.onFloor() && this.jumpCounter < maxJumpCount){
            
            this.setVelocityY(-100);
            this.jumpCounter++;   
        }
        //RESTART JUMP COUNTER
        if(this.body.onFloor()){
            this.jumpCounter = 0;
        }
            
    }

    shooting(){
        // const isShiftDown = Phaser.Input.Keyboard.JustDown(this.cursors.shift);
        const isShiftDown = this.cursors.shift.isDown;
        if(isShiftDown){
            this.isShooting = true;
            
            
        }
        else{
            this.isShooting = false;
        }
    }




}