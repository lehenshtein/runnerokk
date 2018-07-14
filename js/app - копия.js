var swipeTop = false;

var mainState = {
    preload: function() {
        this.load.image('mountains-back', 'assets/mountains-back.png');
        this.load.image('mountains-mid1', 'assets/mountains-mid1.png');
        this.load.image('mountains-mid2', 'assets/mountains-mid2.png');
        this.load.image('ground', 'assets/ground-norm.png');
        this.load.image('grass', 'assets/grass.png');
        this.load.spritesheet('player', 'assets/knight3.png', 100, 100);
    },
    
    create: function() {
        
        //swipe
        game.input.onUp.add(this.mouseUp, this);
        game.input.onDown.add(this.mouseDown, this);
        
       
        
        //enable Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //background color
        this.game.stage.backgroundColor = '#697e96';
        
        
        this.world.enableBody = true;
        //adding sprites
        this.mountainsBack = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-back').height, this.game.width, this.game.cache.getImage('mountains-back').height, 'mountains-back');
        
        this.mountainsMid1 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid1').height, this.game.width, this.game.cache.getImage('mountains-mid1').height, 'mountains-mid1');
        
         this.mountainsMid2 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid2').height, this.game.width, this.game.cache.getImage('mountains-mid2').height, 'mountains-mid2');
        
        this.groundTile = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('ground').height, this.game.width, this.game.cache.getImage('ground').height, 'ground');
        
        this.grassTile = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('grass').height + 5, this.game.width, this.game.cache.getImage('grass').height, 'grass');
        
        //physic for ground
        this.groundTile.enablebody = true;
        this.groundTile.body.immovable = true;
        
        //player and physics
        this.player = game.add.sprite(100, this.game.height - this.game.cache.getImage('ground').height - 50, 'player');
        this.player.anchor.setTo(0.5,0.5);
        this.physics.arcade.enable(this.player);
        
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        
        this.player.animations.add('right', [0, 1, 2, 3, 4], 10, true);
        
          this.text1 = game.add.text(game.world.centerX, game.world.centerY, "swipe left or right!");
        this.text1.fill = "#ffffff";
        this.text1.anchor.set(0.5, 0.5);
    },
    
    mouseDown: function() {
    	//set the mouseIsDown to true
        this.mouseIsDown = true;
        //
        //
        //record the place the mouse started
        //
        //
        this.startY = game.input.y;
    },
    mouseUp: function() {
        this.mouseIsDown = false;
    },
    swipeDone: function() {
        //get the ending point
        var endY = game.input.y;
        //
        //
        //check the start point against the end point
        //
        //
        if (endY < this.startY) {
            //swipe left
            swipeTop = true;
            
            
        } else {
            //swipe right
            this.text1.text = "Swiped right";
        }
    },
    
    update: function() {
        this.mountainsBack.tilePosition.x -= 0.1;
        this.mountainsMid1.tilePosition.x -= 0.3;
        this.mountainsMid2.tilePosition.x -= 0.75;
        this.groundTile.tilePosition.x -= 8;
        this.grassTile.tilePosition.x -= 8;
        game.physics.arcade.collide(this.player, this.groundTile);
        
        this.player.animations.play('right');
        
        if (this.mouseIsDown == true) {
        	//get the distance between the start and end point
            var distY = Math.abs(game.input.y - this.startY);
            //if the distance is greater than 50 pixels then a swipe has happened
            if (distY > 50) {
                this.swipeDone();
            }
        }
        
        if (swipeTop == true && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
            swipeTop = false;
            console.log(swipeTop);
        } else if (swipeTop == false){
            this.player.body.velocity.y = 0;
            }
      
    },
  
}

var game = new Phaser.Game(500, window.innerHeight, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');
