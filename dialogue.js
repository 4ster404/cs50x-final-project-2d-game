import Phaser from "phaser";

export default function npcDialogue(scene, npcNum, dialogueText, isActionExecuted){

    //ADD {isDialogueActive} TO THE MAIN FILE

    
    const interactionDistance = 20;
    const cam = scene.cameras.main;

    //set dialogue index up
    if(npcNum.dialogueIndex === undefined){
        npcNum.dialogueIndex = 0;
    }

    const npcDistance_1 = Phaser.Math.Distance.Between(scene.player.x, scene.player.y, npcNum.x, npcNum.y);
    

    if(isActionExecuted && npcDistance_1 < interactionDistance && scene.player.body.onFloor()){

        scene.player.setVelocityX(0);
        
        if(!scene.isDialogeActive){
            //console.log("Starting conversation.")
            scene.isDialogeActive = true;
            scene.canMove = false;

            const camXposition = (scene.player.x + npcNum.x)/2;
            const camYposition = (scene.player.y + npcNum.y)/2;

            cam.stopFollow();

            cam.pan(camXposition, camYposition, 1000, 'Power2');
            cam.zoomTo(2, 200);

            //Change npc flipX
            if(npcNum.x < scene.player.x ){
                npcNum.setFlipX(false);
                scene.player.setPosition(npcNum.x + 15, scene.player.y)
            } 
            else if(npcNum.x > scene.player.x ){
                npcNum.setFlipX(true);
                scene.player.setPosition(npcNum.x - 15, scene.player.y)
            };

            
            //restart dialogue quote
            if(dialogueText[npcNum.dialogueIndex] === undefined){
                npcNum.dialogueIndex = 0;
            }
            
            //Text UI setup
            scene.currentText = scene.add.text(scene.scale.width/2, scene.scale.height-25, dialogueText[npcNum.dialogueIndex], 
                {
                    fontSize: '15px',
                    fontFamily: 'monospace',
                    backgroundColor: '#000000',
                    align: 'center',
                    wordWrap: { 
                        width: scene.scale.width - 40, 
                        useAdvancedWrap: true }
                    } 
                ).setOrigin(0.5);
                
                cam.ignore(scene.currentText);          
                npcNum.dialogueIndex++;
            }

        else {
            
            scene.canMove = true;
            scene.isDialogeActive = false;
            cam.startFollow(scene.player);
            cam.zoomTo(1, 250);
            scene.currentText.destroy();
        }

        

    }
}