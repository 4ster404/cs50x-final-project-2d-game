import Phaser from "phaser";
import doubleJump from "./doublejump";

export default function controls(scene){

    if(scene.canMove) //Player controls
    {

        if(scene.isPreparingJump){
            scene.player.setVelocityX(0);
            scene.player.anims.play('jump', true);
        }

        else{
            //PROPERTY CREATION
            if(scene.jump === undefined) scene.jump = doubleJump(scene, 1);
            if(scene.noNameYet === undefined) scene.noNameYet = true;
            
            //LEFT CURSOR ACTION
            if (scene.cursors.left.isDown)
            {
                scene.player.setVelocityX(-52); 
                scene.player.setFlipX(true);
            }

            //RIGHT CURSOR ACTION
            else if (scene.cursors.right.isDown)
            {
                scene.player.setVelocityX(52); 
                scene.player.setFlipX(false); 
            }
            //STANDING STILL ACTION
            else scene.player.setVelocityX(0);
            
            //ANIMATIONS FOR: RIGHT, LEFT, TURN AND JUMPUP
            if(scene.player.body.onFloor())
            {
                if (scene.cursors.left.isDown || scene.cursors.right.isDown)
                {
                    scene.player.anims.play('right', true);
                    
                }
                else if(scene.player.body.velocity.x === 0)
                {
                    scene.player.anims.play('turn', true);
                    
                }
            }
            else{
                scene.player.anims.play('jumpUp', true);
            }   
        }
    }  
}

            