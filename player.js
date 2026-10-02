import Phaser from "phaser";

import updateScore from "./updateScore";
//import createHud from "./playerHud";

export default function playerInstance(scene, x, y, key, lfpoints){
    
    updateScore(scene);
    
    const player = scene.physics.add.sprite(x, y, key);
    
    scene.life = lfpoints;
    

    scene.isInvulnerable = false;

    

    player.updateLfePoints = function(){
        if(scene.isDamaged && !scene.isInvulnerable){        
            scene.life--;
            scene.isDamaged = false;
            scene.isInvulnerable = true;
            scene.updateHeartsHUD();

            if (scene.life <= 0) {
                if (scene.bgmusic1) {
                    scene.bgmusic1.stop();
                }
                scene.scene.start('GameOverScene', { score: scene.score || 0 });
                return;
            }

            scene.time.delayedCall(1000, ()=>{
                scene.isInvulnerable = false;
            })
        }

        // console.log(lfpoints);
    }

    

    

    return player;
}