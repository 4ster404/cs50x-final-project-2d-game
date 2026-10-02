import Phaser from 'phaser';

export default function updateScore(scene){
    
        scene.scoreText = scene.add.text(scene.scale.width - 50, 10, `score: ${scene.score}`, {
            fontSize: '10px',
            fontFamily: 'monospace',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2  
        }).setOrigin(0.5);
    
    
    updateScore.update = function(){
        if(scene.scoreText === undefined){
        scene.scoreText = scene.add.text(scene.scale.width - 50, 10, `score: ${scene.score}`, {
            fontSize: '10px',
            fontFamily: 'monospace',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2  
        }).setOrigin(0.5);
    }
        scene.scoreText.destroy();
        scene.scoreText = scene.add.text(scene.scale.width - 50, 10, `score: ${scene.score}`, {
            fontSize: '10px',
            fontFamily: 'monospace',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2  
        }).setOrigin(0.5);
    }
}