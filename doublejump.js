import Phaser from "phaser";

export default function doubleJump(scene, maxJump) {

    if(scene.isPreparingJump === undefined){
        scene.isPreparingJump = false;
        
    }
    if(scene.jumpCounter === undefined){
        scene.jumpCounter = 0;
    }
    
    const maxJumpCount = maxJump - 1;

    const isUpDown = Phaser.Input.Keyboard.JustDown(scene.cursors.up);

    //FIRST JUMP
    if(isUpDown && scene.player.body.onFloor() && !scene.isPreparingJump){
        
        scene.sound.play('jumpSFX', { volume: 0.3 });
        scene.isPreparingJump = true;
        scene.player.setVelocityX(0);
        
        scene.time.delayedCall(150, ()=>{
            scene.player.setVelocityY(-221);
            scene.jumpCounter++;
            scene.isPreparingJump = false;
        });
        
    }

    //FOLLOWING JUMPS
    if(isUpDown && !scene.player.body.onFloor() && scene.jumpCounter < maxJumpCount){
        
        scene.player.setVelocityY(-200);
        scene.jumpCounter++;   
    }
    //RESTART JUMP COUNTER
    if(scene.player.body.onFloor()){
        scene.jumpCounter = 0;
    }
    
    

}