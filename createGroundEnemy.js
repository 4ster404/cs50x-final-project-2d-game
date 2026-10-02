import Phaser from "phaser"; 
import updateScore from "./updateScore";

export default function createGroundEnemy(scene, key){
    //WARNING
    //this.PLAYER and this.GROUNDLAYER must have been already created

    if(scene.isDamaged === undefined){
        scene.isDamaged = false;
    }

    const enemyPositions = [
            {x:403, y:3120},
            {x:558, y:3120},
            {x:344, y:3024},
            {x:470, y:3024},
            {x: 286,y: 2752},
            {x: 380,y: 2752},
            {x: 526,y: 2752},
            {x: 364,y: 2560},
            {x: 246,y: 2544},
            {x: 278,y: 2544},
            {x: 366,y: 2384},
            {x: 422,y: 2384},
            {x: 535,y: 2368},
            {x: 489,y: 2224},
            {x: 351,y: 2224},
            {x: 242,y: 2208},
            {x: 192,y: 2208},
            {x: 102,y: 1920},
            {x: 219,y: 1920},
            {x: 345,y: 1920},
            {x: 481,y: 1920},
            {x: 485,y: 1744},
            {x: 369,y: 1744},
            {x: 215,y: 1680},
            {x: 92,y: 1680},
            {x: 180,y: 1550},
            {x: 319,y: 1552},
            {x: 419,y: 1552},
            {x: 304,y: 1552},
            {x: 504,y: 1376},
            {x: 314,y: 1376},
            {x: 456,y: 1376},
            {x: 176,y: 1360},
            {x: 400,y: 2752},
            {x: 430, y: 1200},
            {x: 545,y: 1140},
            {x: 590,y: 1100},
            {x: 443,y: 1056},
            {x: 176,y: 944},
            {x: 209,y: 736},
            {x: 392,y: 480},
            {x: 271,y: 416},
        ];
    
    scene.enemyPositionsOBJ = [];

    enemyPositions.forEach((pos)=>{
            const enemyPos = scene.physics.add.sprite(pos.x, pos.y, key).setBounce(0.1);
            enemyPos.setVelocityX(20);
            enemyPos.speed = 20;
            enemyPos.direction = 1;
            enemyPos.positionX = pos.x;
            enemyPos.positionY = pos.y;
            
            enemyPos.setSize(10, 15);
            
            
            scene.enemyPositionsOBJ.push(enemyPos);
        });

    scene.enemyPositionsOBJ.forEach((enemy)=>{
            scene.physics.add.collider(enemy, scene.groundLayer);
            scene.physics.add.collider(enemy, scene.barrier);
            enemy.anims.play('mushroomWalk', true);
            
            scene.physics.add.overlap(scene.player, enemy, (player, enemy)=>{
                const isStomping = scene.player.body.touching.down && enemy.body.touching.up;
                const isPlayerHigher = scene.player.body.y +10 < enemy.body.y;
                if (isStomping && isPlayerHigher) {
                    // scene.scoreText.destroy();
                    player.setVelocityY(-100);
                    scene.score+= 100;
                    updateScore.update(scene);
                    scene.sound.play('hurtSFX', { volume: 0.3 });
                    enemy.destroy();
                    const enemyDeathEffect = scene.add.sprite(enemy.x, enemy.y, 'enemyDestroyed').setScale(1.25);
                    enemyDeathEffect.setTint(0x928E85)
                    enemyDeathEffect.anims.play('enemyDestroyedAnim', true);
                    scene.time.delayedCall(500, ()=>{
                        enemyDeathEffect.destroy();
                    });
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

    });

    createGroundEnemy.updatePatrol = function(){
        scene.enemyPositionsOBJ.forEach((enemy)=>{
            if (!enemy || !enemy.body) return;
            
            if(enemy.body.blocked.right){
                enemy.direction = -1;
                enemy.setFlipX(true);
            }
            
            else if(enemy.body.blocked.left){
                enemy.direction = 1;
                enemy.setFlipX(false);
            }
            enemy.setVelocityX(enemy.speed * enemy.direction);
            
        })
    }

    

}

//PREVIOUS CREATE GROUND ENEMY ON INTROLEVEL.JS

// const enemyPositions = [
        //     {x: 440, y: 1200},
        //     {x: 545,y: 1140},
        //     {x: 590,y: 1100},
        //     {x: 443,y: 1056},
        //     {x: 176,y: 944},
        //     {x: 209,y: 736},
        //     {x: 392,y: 480},
        //     {x: 271,y: 416},
        // ];

        // this.enemyPositionsOBJ = [];

        // enemyPositions.forEach((pos, index)=>{
        //     const enemyPos = createEnemy(this, pos.x, pos.y, 'mushroomEnemy', 20);
        //     this.enemyPositionsOBJ.push(enemyPos);
        // });

        // this.enemyPositionsOBJ.forEach((enemy, index)=>{
        //     this.physics.add.collider(enemy, this.groundLayer);
        //     enemy.anims.play('mushroomWalk', true);
        //     enemyPlayerOverlap(this, this.player, enemy)
        // });

//PREVIOUS UPDATE PATROL ENEMY ON UPDATE()

// this.enemyPositionsOBJ.forEach((enemy)=>{
        //     enemy.updatePatrol();
        // });
        // this.flyingEnePosOBJ.forEach((enemy)=>{
        //     enemy.updatePatrolF();
        // });

        // this.bat.updatePatrolF();