var game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    'game',
    {
        preload: preload,
        create: create,
        update: update
    }
);
var scoreText;

var score = 0;

var leftKey,
    rightKey,
    topKey;
function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/knight3.png', 100, 100);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);//физика
    game.add.sprite(0,0,'sky'); //небо
    platforms = game.add.group(); //создание группы платформ
    platforms.enableBody = true; //создание физики для платформ
    var ground = platforms.create(0, game.world.height - 64, 'ground'); //создание пола
    ground.scale.setTo(2,2);
    ground.body.immovable = true;
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
    
    
    player = game.add.sprite(100, game.world.height - 220, 'dude');//player
    game.physics.arcade.enable(player);
    
    //отскок при приземленни
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    
    //sprite
    player.animations.add('fight', [9, 10, 11, 12], 10, false);
    player.animations.add('left', [0, 1, 2, 3, 4], 10, true);
    player.anchor.setTo(.5);
    player.animations.add('right', [0, 1, 2, 3, 4], 10, true);
    player.animations.add('stand', [5, 6, 7, 8, 9], 5, true);
    
            stars = game.add.group();
    stars.enableBody = true;
    game.physics.arcade.enable(stars);
    for (var i = 0; i < 12; i++) {
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    
     scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    
    //keyboard

    cursors = game.input.keyboard.createCursorKeys();
    
    
    
//    Phaser.Keyboard.start();
//    Phaser.Keyboard.addKeys( { 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D } );
    
}
function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    
    game.physics.arcade.overlap(player,stars,collectStar, null,this);
    
    player.body.velocity.x = 0;
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    topKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    if (spaceKey.isDown) {
          player.animations.play('fight', 10, false);
        setTimeout(function(){player.animations.stop('fight', false);}, 300);
        
//          setTimeout(function(){player.animations.paused = true}, 300);
        
    } else if (cursors.right.isDown || rightKey.isDown) {
        player.body.velocity.x = 150;
        player.scale.setTo(1, 1);
        player.animations.play('right');
    }  else if (cursors.left.isDown || leftKey.isDown) {
        player.body.velocity.x = -150;
        player.scale.setTo(-1, 1);
        player.animations.play('left');
    }  else {
        player.animations.play('stand');

    }
    
    
    if ((cursors.up.isDown || topKey.isDown) && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
}


function collectStar (player, star) {
    star.kill();
    score += 1;
    scoreText.text = 'Score: ' + score;
}
