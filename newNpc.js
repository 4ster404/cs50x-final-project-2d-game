import Phaser from "phaser";
import npcDialogue from "./dialogue";

export default function newNpc(scene, x, y, key, defaultAnimationKey){
    if(scene.isDialogueActive === undefined){
        scene.isDialogueActive = false;
    }

    const npc = scene.physics.add.sprite(x, y, key);
    npc.anims.play(defaultAnimationKey, true);

    scene.physics.add.collider(npc, scene.groundLayer);

    npc.spaceKeySprite = scene.add.sprite(npc.x, npc.y-10, 'buttons');
    npc.spaceKeySprite.anims.play('space', true);
    npc.spaceKeySprite.setVisible(false);

    npc.spaceAnimationLoop = function(){
        const isOverlapping = scene.physics.overlap(scene.player, npc);
        if(isOverlapping){
            npc.spaceKeySprite.setVisible(true);
        }
        else{
            npc.spaceKeySprite.setVisible(false);
        }
    }

    npc.updatePatrol = function(speed, distance){
        // console.log(npc.setVelocityX())
        if(npc.body.velocity.x === 0){
            npc.setVelocityX(speed);
        }

        if(npc.x > x + distance){
            npc.setVelocityX(-speed);
            npc.setFlipX(true);
        }
        else if(npc.x < x - distance){
            npc.setVelocityX(speed);
            npc.setFlipX(false);
        }
    }

    return npc;
}