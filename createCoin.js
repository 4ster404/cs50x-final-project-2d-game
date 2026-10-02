import Phaser from "phaser";
import updateScore from "./updateScore";

export default function createCoin(scene, key){

    //this.player must have been created already

    const coinPositions = [
            {x: 529, y: 1320},
            {x: 497, y: 1320},
            {x: 465, y: 1320},
            {x: 433, y: 1320},
            {x: 401, y: 1320},
            {x: 369, y: 1320},
            {x: 337, y: 1320},
            {x: 305, y: 1320},
            {x: 273, y: 1320},
            {x: 241, y: 1320},
            {x: 209, y: 1079},
            {x: 293, y: 1510},
            {x: 328, y: 1510},
            {x: 363, y: 1510},
            {x: 398, y: 1510},
            {x: 433, y: 1510},
            {x: 468, y: 1510},
            {x: 240, y: 1510},
            {x: 176, y: 1552},
            {x: 194, y: 1552},
            {x: 157, y: 1552},
            {x: 615, y: 1424},
            {x: 346, y: 1700},
            {x: 389, y: 1700},
            {x: 432, y: 1700},
            {x: 475, y: 1700},
            {x: 519, y: 1700},
            {x: 279, y: 2500},
            {x: 151, y: 2500},
            {x: 183, y: 2500},
            {x: 215, y: 2500},
            {x: 247, y: 2500},
            {x: 119, y: 2500},
            {x: 375, y: 2510},
            {x: 343, y: 2384},
            {x: 391, y: 2384},
            {x: 176, y: 2064},
            {x: 176, y: 2019},
            {x: 176, y: 1974},
            {x: 46, y: 2135},
            {x: 46, y: 2065},
            {x: 407, y: 2016},
            {x: 583, y: 2048},
            {x: 163, y: 1865},
            {x: 287, y: 1865},
            {x: 414, y: 1865},
            {x: 439, y: 2384},
            {x: 250,y: 1184},
            {x: 338,y: 1200},
            {x: 385,y: 1184},
            {x: 400,y: 1184},
            {x: 486,y: 1184},
            {x: 625,y: 1200},
            {x: 575,y: 1200},
            {x: 525,y: 1200},
            {x: 592,y: 1003},
            {x: 493,y: 1056},
            {x: 393,y: 1056},
            {x: 392,y: 1170},
            {x: 385,y: 992},
            {x: 355,y: 992},
            {x: 294,y: 960},
            {x: 271,y: 960},
            {x: 247,y: 960},
            {x: 222,y: 944},
            {x: 161,y: 876},
            {x: 123,y: 944},
            {x: 73,y: 768},
            {x: 157,y: 736},
            {x: 211,y: 668},
            {x: 263,y: 736},
            {x: 568,y: 736},
            {x: 605,y: 736},
            {x: 588,y: 700},
            {x: 428,y: 480},
            {x: 355,y: 736},
            {x: 310,y: 416},
            {x: 232,y: 416},
        ]

    scene.coinSprites = [];

    coinPositions.forEach((pos)=>{
            const coin = scene.add.sprite(pos.x, pos.y, key);
            scene.physics.world.enable(coin);
            coin.body.setAllowGravity(false);
            coin.anims.play("coinAnim", true);
            coin.body.setSize(10, 10);
            coin.positionX = pos.x;
            coin.positionY = pos.y;
            scene.coinSprites.push(coin);
        });

    scene.coinSprites.forEach((coin)=>{
                scene.physics.add.overlap(scene.player, coin, (player, enemy)=>{
                    const coinEffect = scene.add.sprite(coin.positionX, coin.positionY, 'coinTaken');
                    coinEffect.setScale(0.4);
                    coinEffect.anims.play('coinTakenAnim', true);
                    scene.time.delayedCall(500, ()=>{
                        coinEffect.destroy();
                    });
                    coin.destroy();
                    scene.sound.play('coinSFX', {volume: 0.2});
                    scene.score += 50;
                    updateScore.update(scene);
                });
            });

}