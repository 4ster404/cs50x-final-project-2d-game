import Phaser from 'phaser';
import updateScore from './updateScore';

export default function createFlyingEnemy(scene, key, dis){
    // const enemyF = scene.physics.add.sprite(x, y, key);

    const flyingEnePos = [
        {x: 198, y: 2988},
        {x: 280, y: 2924},
        {x: 582, y: 2000},
        {x: 557, y: 2200},
        {x: 417, y: 2250},
        {x: 176, y: 1969},
        {x: 228, y: 1670},
        {x: 610, y: 1250},
        {x: 466, y: 777},
        {x: 590, y: 546},


    ];
        scene.flyingEnePosOBJ = [];
        
    flyingEnePos.forEach((pos)=>{
        const flyEne = scene.physics.add.sprite(pos.x, pos.y, key);
        flyEne.spawnPos = pos.x;
        flyEne.setVelocityX(20);
        flyEne.setFlipX(true);
        flyEne.body.setAllowGravity(false);
        flyEne.anims.play('miniBatAnim', true);
        flyEne.body.setSize(15,15);

        scene.flyingEnePosOBJ.push(flyEne);
    });
    
    scene.flyingEnePosOBJ.forEach((enemy)=>{
        scene.physics.add.overlap(scene.player, enemy, (player, enemy)=>{
            const isStomping = scene.player.body.touching.down && enemy.body.touching.up;
            if (isStomping) {
                scene.scoreText.destroy();
                player.setVelocityY(-100);
                scene.score+= 125;
                updateScore.update(scene);
                scene.sound.play('hurtSFX', { volume: 0.3 });
                enemy.destroy();
                const enemyDeathEffect = scene.add.sprite(enemy.x, enemy.y, 'enemyDestroyed').setScale(1.25);
                    enemyDeathEffect.setTint(0x928E85)
                    enemyDeathEffect.anims.play('enemyDestroyedAnim', true);
                    scene.time.delayedCall(500, ()=>{
                        enemyDeathEffect.destroy()});
            }
            else if(!scene.isDamaged && !scene.isInvulnerable){
                scene.isDamaged = true;
                scene.canMove = false;
                scene.sound.play('hurtSFX', { volume: 0.3 });

                const knockbackDir = player.x < enemy.x ? -100 : 100;
                scene.player.setVelocityX(knockbackDir);
                scene.player.setVelocityY(-100);
                scene.player.setTint(0xff0000);

                scene.time.delayedCall(700, () => {
                    scene.player.clearTint();
                    scene.canMove = true;
                });
            }
        });
    })
    
    createFlyingEnemy.updatePatrol = function(){
        scene.flyingEnePosOBJ.forEach((enemy)=>{
            if(enemy.x > enemy.spawnPos + dis){
                enemy.setVelocityX(-20);
                enemy.setFlipX(false);
            }
            else if(enemy.x <= enemy.spawnPos - dis){
                enemy.setVelocityX(20);
                enemy.setFlipX(true);
            }

        });
    }


    
    //     if(enemyF.x > x + dis){
    //         enemyF.setVelocityX(-20);
    //         enemyF.setFlipX(false);
    //     }
    //     else if(enemyF.x <= x - dis){
    //         enemyF.setVelocityX(20);
    //         enemyF.setFlipX(true);
    //     }

    // }

    
}