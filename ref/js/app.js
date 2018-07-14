var mainState = {
    preload: function() {
        this.load.image('player', 'assets/player.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.image('enemy', 'assets/enemy.png');
    },
    
    create: function() {
        this.stage.backgroundColor = '#67b3e2';
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.world.enableBody = true;
        
        this.cursor = game.input.keyboard.createCursorKeys();
        
        this.player = game.add.sprite(70, 100, 'player');
        this.player.body.gravity.y = 600;
        
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        
        var level = [
          'xxxxxxxxxxxxxxxxxxxxxx',
          'x         x          x',
          'x         x       o  x',
          'x         x    !     x',
          'x         x         xx',
          'x         !          x',
          'x         o    o   x x',
          'x              x     x',
          'x     o   !   xx     x',
          'xxxxxxxxxxxxxxxx!!!!!x',
            
        ];
        
        for(var i = 0; i < level.length; i++) {
            for(var j = 0; j < level[i].length; j++) {
                if (level[i][j] == 'x') {
                    var wall = game.add.sprite(30+30*j, 30+30*i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                } else if (level[i][j] == 'o') {
                    var coin = game.add.sprite(30+30*j, 30+30*i, 'coin');
                    this.coins.add(coin);
                } else if(level[i][j] == '!') {
                    var enemy = game.add.sprite(30+30*j, 30+30*i, 'enemy');
                    this.enemies.add(enemy);
                }
            }
        }
        
    },
    
    update: function() {
        
        game.physics.arcade.collide(this.player, this.walls);
        
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
        
                if(this.cursor.left.isDown)
            this.player.body.velocity.x = -500;
        else if (this.cursor.right.isDown)
            this.player.body.velocity.x = 500;
        else
            this.player.body.velocity.x = 0;
        
                if (this.cursor.up.isDown && this.player.body.touching.down)
            this.player.body.velocity.y = -270;
    },
    
    takeCoin: function(player, coin) {
        coin.kill();
    },
    
    restart: function() {
        game.state.start('main');
    },
}

var game = new Phaser.Game(720, 370);
game.state.add('main', mainState);
game.state.start('main');
