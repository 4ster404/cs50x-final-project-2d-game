import Phaser from "phaser";

export default function createHud(scene, hudFrameKEY, heartKEY){
    
    let distance = 0;
    // scene.hudFrame = scene.add.nineslice(2, 2, hudFrameKEY, null, 30, 30, 16, 16, 16, 16).setOrigin(0,0);

    scene.heartSprite = [];

    scene.updateHeartsHUD = function(){
        scene.heartSprite.forEach(heart => heart.destroy());
        scene.heartSprite = [];

        for(let i = 0; i < scene.life; i++){
            const heart = scene.add.image(16 + distance, 10, heartKEY, null);
            if(scene.cameras.main){
                scene.cameras.main.ignore([heart]);
            }
            scene.heartSprite.push(heart);
            distance += 10;
        }

        distance = 0;
    }

    scene.updateHeartsHUD();

}



