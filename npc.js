import Phaser from "phaser";

export default function createNpc(scene, x, y, key){

    if(scene.isDialogueActive === undefined){
        scene.isDialogueActive = false;
    }


    const distance = 25;



    const npc = scene.physics.add.sprite(x, y, key).setBounce(0.1);

    //Load animations first with this.load.animation in the preloader()
    npc.anims.play('npc_walk', true);



    npc.updatePatrol = function(speed){
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
 