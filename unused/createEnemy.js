import Phaser from "phaser";

export default function createEnemy(scene, x, y, key, dis){
    
    const distance = dis;
    const enemySpeed = 20;

    const enemy = scene.physics.add.sprite(x, y, key). setBounce(0.1);
    enemy.setVelocityX(enemySpeed);
    
    enemy.updatePatrol = function(){
        if(enemy.x > x + distance){
            enemy.setVelocityX(-enemySpeed);
            enemy.setFlipX(true);
        }
        else if(enemy.x <= x - distance) {
            enemy.setVelocityX(enemySpeed);
            enemy.setFlipX(false);
        }
    }

    return enemy;

}