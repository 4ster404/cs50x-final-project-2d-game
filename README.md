# TOWER CLIMBER
#### Video Demo:  https://youtu.be/FA7a1fDxj-0?si=F9QerkLjY2htJuek
#### Description:
This is a normal game inspired by Super Mario Bros and Megaman classics!


### Introduction
As a fan of retro games the aesthetics of this game are 16 bits style, the assets like tile sets, enemies and objects were downloaded from Itch.io with free license usage, all of the assets links will be referenced at the end of this document. The only texture designed by myself is playerSprite.png.

The game was designed to be speacially dificult in gameplay with the only feature of having very precise jumps, almost pixel perfect jumps and where if you miss a certain jump you'll lose a lot of progress or that's what I intended since if you fall some platforms will stop the fall, but for instance keeps the idea of having to do precise jumps through the part of gameplay, bonuses come from eliminating enemies or taking coins.

## Main Files
#### main.js
The file which cannot be left behind! The `main.js` file handles all of the game's main configuration where can be assingned features like canvas height/width, canvas zoom properties, rendering properties, physics and scenes which handle all the game's importing files and visualization! 
Example of basic config taken from Phaser examples page:
```js
const config = {
    type: Phaser.AUTO,
    width: 384,
    height: 216,
    backgroundColor: '#0E273C',
    pixelArt: true,
    zoom: 3,
    physics: 'arcade',
    scene: MainScene
};
```

#### mainmenu.js
This file mainly loads the majority of assets used in the game like player's and enemies globally in the Phaser object so it can be used by any other file which has imported Phaser library. Besides this, its main purpose is building the main menu scene but in this case It's just more like title introduction. Phaser is mainly run through classes which use three main functions `preload()`, `create()` and `update()`
Inside the `preload()` is where textures are loaded, like tilesets, tilemaps, sprites and even background music!
The `create()` function builds the scene using the resources used on the previous function. In this case `mainmenu.js` loads all layers in order back to back using the tileset with key: "tileset" on line 15 so the tilemap in JSON format can build the scenery!
The original game's context was steampunk ambiance so that's why you may see the word "punk" around. This scene also contains npcs walking around simulating a city with citizens using the createNpc() function previously imported at file's beginning and which we'll talk later. There is also a section where there used to be a selection menu but dut to time setbacks I decided to only keep the "START GAME" option. `Update()` is not like the other functions because it is an infinite loop constantly checking changes frame by frame (how all games work). In this part of the code the functionality of selection menu can be found what was originally meant to be a camera loop ended up being a camera going back and forth. 

#### introLevel.js
The intro level is where gameplay starts and where the majority of helper functions come in. As Phaser uses clases as scenes the `super()` uses the keyword 'introLevel' as the key for connecting the scene with mainMenu.js. Preload loads some other resources like audio context. Create uses `playerInstance()` for loading player's sprite and controls as createFlyingEnemy/createGroundEnemu creates minibats and mushroom enemies sprites with collision physics and patrolling behaviour!
There is also createNpc() function which as its name says loads npcs which will guide player as game starts.
A variable `this.canMove` is declared at the beginnning of create for activating player's controls later and set main camera to follow it.
Some other Phaser native functions are instanced like `this.player.setCollideWorldBounds(true);` which keeps player inside the allowed dimensions by the tilemap.
`this.groundLayer.setCollisionByProperty({ collides: true });` and `this.barrier.setCollisionByProperty({ barrier: true });` are functions declared using a property declared inside the tilemap JSON file which allows everything which has "barrier" or "collides" bool true can be collided with everything which has physics and was also declared with `this.physics.add.collider(object1, object2);` where object 1 and object 2 will collide if declared this function.
`this.cursors = this.input.keyboard.createCursorKeys();` is also declared for connecting keyboard with the game and later on using `this.cursors` for handling game's controls.
`const finishLine = this.add.zone(590, 224, 32, 100);` is declared for allowing the game to get an ending screen. This constant and later on with `this.physics.add.overlap(this.player, finishLine, () => {}` triggers the scene of winning after flagRaiseAnim finishes with `this.scene.start('WinScene', { score: this.score });`.The space sprite and animation are set to be `setVisible(false)` so when player is around it is `setVisible(true)` as a guidance to player to activate dialogue with npc. Finally but still on the `create()` section the `createCoin()` function prints all of the coin sprites with physics and effects on screen.
Inside update() the following conditional:
```js
        if(isOverlapping){
            this.spaceKeySprite.setVisible(true);
        }
        else{
            this.spaceKeySprite.setVisible(false);
        }
```
constantly checks if the player is near the space sprite which is above npc sprite, It will be set visible if player is close or not.

```js
        createGroundEnemy.updatePatrol();
        createFlyingEnemy.updatePatrol();
```
`createGroundEnemy.updatePatrol()` and `createFlyingEnemy.updatePatrol()` are the patroling behaviour of enemies checking if certain conditions (explained in deeper detail later) are true so the sprite can turn back or forward.

#### winscene.js and gameover.js
These two files accomplish the purpose of showing the gameOver screen and the winning screen if the player loses all of their life points or if he reaches the goal at top. The files use a Phaser extended class from Phaser.scene which handles scenery!

### Secondary files (helper functions)

#### npc.js and newNpc.js
Inside npc.js We use a native phaser function:
```js
scene.physics.add.sprite(x, y, key);
```
Which allow us to add sprites to scene by providing its parameters x and y for setting the position of the sprite up and key which is the key param for accessing the resource we want to print on screen as the same time that We use `anims.play(key, true);` for activate the sprite's animation.
This function also has the following method: `npc.updatePatrol = function(speed)` which allows npc going back and forth depending on the distance global constant declared in the file.

Now, newNpc.js was a last minute change just to optimize functions and takes the same functions from npc.js and does array loops to print more npcs on screen and give them the space sprite over them if the scene requires or if they are meant to walk.

#### player.js
Inside player.js we can find the add.sprite function as npc, which allows us to print player on screen. This function also has the method: `player.updateLfePoints = function(){}` which is called inside the update() function `update()`. The updateLfePoints method as its name suggests tracks the player life stats and It works when either scene.isDamaged and scene.isInvulnerable is false. There is also the function `scene.updateHeartsHUD()` which constantly updates the HUD of hearts through `playerHUD.js`. The `player.updateLfePoints()` function also checks if `scene.life` is equal or less than zero so it can stop background music and bring `gameover.js` to the scene, also handling the current score points so it can print it on final screen.

#### playerHUD.js
As mentioned on player.js, the file calls `scene.updateHeartsHUD()` to get a visible way of how much life our player has. `playerHUD.js` creates an empty array for cleaning the hearts which will be visible on screen before updating them. Later 
```js
 for(let i = 0; i < scene.life; i++){
    ...
 }
```
creates the hud and then for every object created with `scene.add.image(16 + distance, 10, heartKEY, null)` pushes it into the initial empty array with the array method `.push()`.

#### updateScore.js
`updateScore.js` as its name suggests only verifies changes on score HUD, destroys the current hud and prints the formatted text on screen using the global variable `scene.score`.

#### controls.js

Inside this file we can find all of the keyboard input and its functionality. The controls are mainly handled by the global variable `scene.canMove`, if the context requires that player doesn't move `scene.canMove` will be false.
Controls.js takes another helper function doublejump.js to control player's number of jumps or as its name suggests make player jumping twice.
The structure of the controls conditionals and movements are designed to make player take a small moment to jump or preparing for it since the main idea is climbing a tower. There are two parts of conditionals for controls: The conditionals which handle movement `scene.cursors.right.isDown` and the ones which handle animations `scene.player.anims.play('turn', true)`.

#### createCoin.js
This file comes with an array of preselected coordinates for printing every coin on screen using array methods like forEach and push where there is also the usage of a Phaser native function `scene.physics.add.overlap()` which is instanced for every object in relation with player so every time player overlaps a coin it will be destroyed, an animation of taking coin will be displayed, a sound effect will come in and finally the score will be updated with `updateScore.update()` method from updateScore.js.

#### createGroundEnemy.js
This file takes the same principles from createCoin.js with the exception that on the overlapping function there are two scenarios: When player is over the enemy object and when they overlap from sideways.
If `isStomping` is true, scene.score will add 100 points, the score HUD will be updated, a sound comes in, the enemy object will be destroyed and a small explosion effect will appear and disappear after a delayed call.
Otherwise if scene.isDamaged and scene.isInvulnerable are falsy and the player has touched enemy sideways the player will have a knockback, scene.canMove will be false which will make controls unable and after a delayed call controls will be available again.
Finally createGroundEnemy has a method updatePatrol() where every time enemy touches a wall changes its direction. For this scenario an extra layer (invisible) was created so enemies can't fall from platforms and every time they are close to a cliff they change their direction.

#### createFlyingEnemy.js
Same as createGroundEnemy.js and createCoin.js this file has a default array with positions which is taken into an array that prints the objects on screen and sets them up with physics, collisions, animations and soundEffects with the only difference that gravity does not affect object. The native Phaser function is `flyEne.body.setAllowGravity(false);` that allows the miniBat sprite to fly.

#### dialogue.js
Lastly dialogue.js is the helper function which builds a cutscene everytime player is next to an npc which has this feature available. The function calculates the minimal distance at which the player can activate the scene.
After some conditions the player's velocity will be reduced to 0 so it cannot be bugged and continue walking, the controls will be disabled with scene.canMove. The camera will zoom in and pan with:
```js
    cam.pan(camXposition, camYposition, 1000, 'Power2');
    cam.zoomTo(2, 200);
```
The npc's sprite will look towards the right or left depending on the player's positions with: 
```js
            if(npcNum.x < scene.player.x ){
                npcNum.setFlipX(false);
                scene.player.setPosition(npcNum.x + 15, scene.player.y)
            } 
            else if(npcNum.x > scene.player.x ){
                npcNum.setFlipX(true);
                scene.player.setPosition(npcNum.x - 15, scene.player.y)
            };
```
where Phaser's native funciton `setFlipX()` flips npc.
The function also loads the text using the dialogues file `dialogues.JSON` and prints it on screen:
```js
scene.currentText = scene.add.text(scene.scale.width/2, scene.scale.height-25, dialogueText[npcNum.dialogueIndex], {
                    fontSize: '15px',
                    fontFamily: 'monospace',
                    backgroundColor: '#000000',
                    align: 'center',
                    wordWrap: { 
                        width: scene.scale.width - 40, 
                        useAdvancedWrap: true }
                    });
```

## Acknowledgments / A Note to CS50
Thank you to David J. Malan, the CS50 staff, and the entire Harvard team for this incredible journey. This course challenged me, taught me how to think like a computer scientist, and gave me the tools to build this project from scratch. I know this project can be better in terms of optimization, although it ended up being more optimized than preliminary versions I know there is still a lot to improve and I will continuously working on this project (as a hobbie) to reach the main idea I came with, but for now and due to time setbacks this is my final project.
Thanks again professor David J. Malan and the CS50 staff for everything. 

*This was CS50!*

#### Note:
I know the project directory's name It's weird and doesn't make sense but "molipollo" was intended to be a reference to my friend's social circle and a reference to our anecdotes.


#### References:
https://o-lobster.itch.io/platformmetroidvania-pixel-art-asset-pack
https://kenney-assets.itch.io/input-prompts-pixel-16
https://penzilla.itch.io/protagonist-character
https://bdragon1727.itch.io/basic-pixel-gui-and-buttons-pack-1
https://snoblin.itch.io/animated-hud-pixel-rpg
https://alenia-studios.itch.io/countries-flags
https://segnah.itch.io/flyng-enemy-pixel-art
https://bdragon1727.itch.io/free-effect-bullet-impact-explosion-32x32
https://brackeysgames.itch.io/brackeys-platformer-bundle
