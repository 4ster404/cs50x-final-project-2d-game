import Phaser from "phaser";
import updateScore from "../updateScore";

export default function enemyPlayerOverlap(scene, playerRef, enemyRef){

    if(scene.isDamaged === undefined){
        scene.isDamaged = false;
    }


    scene.physics.add.overlap(playerRef, enemyRef, (player, enemy)=>{
        const isStomping = player.body.touching.down && enemy.body.touching.up;

        if (isStomping) {
            scene.scoreText.destroy();
            player.setVelocityY(-100);
            scene.score+= 100;
            updateScore.update(scene);

            
            scene.sound.play('hurtSFX', { volume: 0.3 });
            enemy.destroy();
        }
        else if(!scene.isDamaged && !scene.isInvulnerable){
            scene.isDamaged = true;
            scene.canMove = false;
            scene.sound.play('hurtSFX', { volume: 0.3 });

            const knockbackDir = player.x < enemy.x ? -50 : 50;
            player.setVelocityX(knockbackDir);
            player.setVelocityY(-100);
            player.setTint(0xff0000);

            scene.time.delayedCall(700, () => {
                player.clearTint();
                scene.canMove = true;
            });
        }
    });
}