var swipeTop = false;
var swipeRight = false;
var swipeLeft = false;
var pressed = false;
var lifes = 100;
var kick = false;

var mainState = {
    preload: function() {
        this.load.image('background', 'assets/sky.jpg');
        this.load.image('mountains-back', 'assets/mountains/mountain1.png');
        this.load.image('mountains-mid1', 'assets/mountains/mountain2.png');
        this.load.image('house1', 'assets/houses/Japanese house1.png');
        this.load.image('house3', 'assets/houses/Japanese house3.png');
        this.load.image('mountains-mid2', 'assets/mountains/mountain3.png');
        this.load.image('house2', 'assets/houses/Japanese house2.png');
        this.load.image('mountains-mid3', 'assets/mountains/mountain4.png');
         this.load.image('house4', 'assets/houses/Japanese house4.png');
        this.load.image('mountains-mid4', 'assets/mountains/mountain5.png');
        this.load.image('clouds1', 'assets/cloud2/cloud1.png');
        this.load.image('clouds2', 'assets/cloud2/cloud2.png');
        this.load.image('clouds3', 'assets/cloud2/cloud3.png');
        this.load.image('clouds4', 'assets/cloud2/cloud4.png');
        this.load.image('clouds5', 'assets/cloud2/cloud5.png');
        this.load.image('clouds6', 'assets/cloud2/cloud6.png');
        this.load.image('clouds7', 'assets/cloud2/cloud7.png');
        this.load.image('ground', 'assets/road/road1(2).png');
        this.load.image('grass', 'assets/road/road2(2).png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.spritesheet('player', 'assets/char.png', 100, 150);
    },
    
    create: function() {
        
        //swipe
        game.input.onUp.add(this.mouseUp, this);
        game.input.onDown.add(this.mouseDown, this);
        
       
        
        //enable Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        //background color
        this.game.add.tileSprite(0, 0, 744, 826, 'background');
        
        
        this.world.enableBody = true;
        //adding sprites
        this.mountainsBack = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-back').height, this.game.width, this.game.cache.getImage('mountains-back').height, 'mountains-back');
        
        this.mountainsMid1 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid1').height, this.game.width, this.game.cache.getImage('mountains-mid1').height, 'mountains-mid1');
        
        this.houses1 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid4').height, this.game.width, this.game.cache.getImage('house1').height, 'house1');
        
         this.mountainsMid2 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid2').height, this.game.width, this.game.cache.getImage('mountains-mid2').height, 'mountains-mid2');
        
        this.houses3 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid4').height + 55, this.game.width, this.game.cache.getImage('house3').height, 'house3');
        
        this.houses2 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid2').height, this.game.width, this.game.cache.getImage('house2').height, 'house2');
        
        this.mountainsMid3 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid3').height, this.game.width, this.game.cache.getImage('mountains-mid3').height, 'mountains-mid3');
        
        this.houses4 = this.game.add.tileSprite(0, this.game.height - (this.game.cache.getImage('mountains-mid2').height / 1.6), this.game.width, this.game.cache.getImage('house4').height, 'house4');
        
         this.mountainsMid4 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid4').height, this.game.width, this.game.cache.getImage('mountains-mid4').height, 'mountains-mid4');
        
        this.groundTile = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('ground').height, this.game.width, this.game.cache.getImage('ground').height, 'ground');
        
        this.grassTile = this.game.add.tileSprite(0, this.game.height - 65, this.game.width, this.game.cache.getImage('grass').height, 'grass');
        
        this.cloud1 = this.game.add.tileSprite(0, 250, this.game.width, this.game.cache.getImage('clouds1').height, 'clouds1');
        
        this.cloud2 = this.game.add.tileSprite(0, 50, this.game.width, this.game.cache.getImage('clouds2').height, 'clouds2');
        
        this.cloud3 = this.game.add.tileSprite(0, 40, this.game.width, this.game.cache.getImage('clouds3').height, 'clouds3');
        
        this.cloud4 = this.game.add.tileSprite(0, 150, this.game.width, this.game.cache.getImage('clouds4').height, 'clouds4');
        
        this.cloud5 = this.game.add.tileSprite(0, 100, this.game.width, this.game.cache.getImage('clouds5').height, 'clouds5');
        
        this.cloud6 = this.game.add.tileSprite(0, 270, this.game.width, this.game.cache.getImage('clouds6').height, 'clouds6');
        
        this.cloud7 = this.game.add.tileSprite(0, 260, this.game.width, this.game.cache.getImage('clouds7').height, 'clouds7');
        
        
        //enemies group
        enemies = this.game.add.group();
        enemies.enableBody = true;
           for (var i = 0; i < 12; i++) {
        var enemy = enemies.create(i * Math.random() * 1350, this.game.height - this.game.cache.getImage('ground').height - 100, 'enemy');
//        enemy.body.gravity.y = 500;
       enemy.body.bounce.y = 0.7 + Math.random() * 0.2;
//               enemy.checkWorldBounds = true;
//        enemy.events.onOutOfBounds.add(this.resetEnemy, this);//для ревайва, строки ниже
    }
        this.physics.arcade.enable(enemies);
    
        
        
        //physic for ground
        this.groundTile.enablebody = true;
        this.groundTile.body.immovable = true;
        
        //player and physics
        this.player = game.add.sprite(100, this.game.height - this.game.cache.getImage('ground').height - 75, 'player');
        this.player.anchor.setTo(0.5,0.5);
        this.physics.arcade.enable(this.player);
        
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 700;
        this.player.body.collideWorldBounds = true;
        
        this.player.animations.add('right', [0, 1, 2, 3, 4], 10, true);
        this.player.animations.add('left', [0, 5, 9, 12, 11], 10, false);
        this.player.animations.add('fight', [15, 16, 14, 13], 10, false);
        this.player.animations.add('top', [9], 10, false);
        
        this.textLifes = game.add.text(60, 30, "Lifes: " + lifes);
        this.textLifes.fill = "#ffffff";
        this.textLifes.anchor.set(0.5, 0.5);
        
          this.text1 = game.add.text(game.world.centerX, game.world.centerY, "swipe left or top!");
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
        this.startX = game.input.x;
    },
    mouseUp: function() {
        this.mouseIsDown = false;
    },
    swipeDone: function() {
        //get the ending point
        var endY = game.input.y;
        var endX = game.input.x;
        //
        //
        //check the start point against the end point
        //
        //
        if (endY < this.startY && Math.abs(this.startY - endY) > Math.abs(this.startX - endX)) {
            //swipe top
            swipeTop = true;
            
            this.text1.text = "Swiped top";
        } else if (endX > this.startX && Math.abs(this.startY - endY) < Math.abs(endX - this.startX)) {
             //swipe right
            swipeRight = true;
            
            this.text1.text = "Swiped right";
        } else if (endY > this.startY && Math.abs(endY - this.startY) > Math.abs(endX - this.startX)) {
            //swipe bot
            
            this.text1.text = "Swiped bottom";
        } else if (endX < this.startX && Math.abs(this.startX - endX) > Math.abs(this.startY - endY)) {
             //swipe left
//            console.log("X= " + (endX - this.startX));
//            console.log("Y= " + (endY - this.startY));
            swipeLeft = true;
            
            this.text1.text = "Swiped left";
        } 

//        game.input.onDown.addOnce(goRight, this);
    },
    
//        buildEnemy: function() {
//           //enemies group
//        this.enemies = this.game.add.group();
//        this.enemies.enableBody = true;
//        for(var i=0; i<12; i++) {
//            var r = this.enemies.create(this.rnd.integerInRange(1000, 2000), this.world.height-150, 'grass');
//            this.physics.enable(r, Phaser.Physics.ARCADE);
//            r.enableBody = true;
//            r.body.velocity.x = this.rnd.integerInRange(0, 400);
//
//          r.events.onOutOfBounds.add(this.resetEnemy, this);
//        }
//    },
    //для ревайва, строки выше
//    resetEnemy: function(enemy) {
//        if(enemy.x > 300) {
//            this.respawnEnemy(enemy);
//            console.log('do');
//        }
//    },
//    
//    respawnEnemy: function(enemy) {
//        enemy.reset(this.rnd.integerInRange(300, 500), this.world.height-150);
//        enemy.body.velocity.x = this.rnd.integerInRange(0, 400);
//    },
    
    
    update: function() {
        
        this.mountainsBack.tilePosition.x -= 0.05;
        this.mountainsMid1.tilePosition.x -= 0.3;
        this.houses1.tilePosition.x -= 0.45;
        this.mountainsMid2.tilePosition.x -= 0.5;
        this.houses2.tilePosition.x -= 0.7;
        this.houses3.tilePosition.x -= 0.68;
        this.mountainsMid3.tilePosition.x -= 0.75;
        this.houses4.tilePosition.x -= 1.1;
        this.mountainsMid4.tilePosition.x -= 1.25;
        this.cloud1.tilePosition.x -= 0.072;
        this.cloud2.tilePosition.x -= 0.1;
        this.cloud3.tilePosition.x -= 0.2;
        this.cloud4.tilePosition.x -= 0.32;
        this.cloud5.tilePosition.x -= 0.059;
        this.cloud6.tilePosition.x -= 0.045;
        this.cloud7.tilePosition.x -= 0.08;
        this.groundTile.tilePosition.x -= 8;
        this.grassTile.tilePosition.x -= 8;
        
        game.physics.arcade.collide(this.player, this.groundTile);
//        game.physics.arcade.collide(enemies, this.groundTile);
        game.physics.arcade.overlap(this.player, enemies, this.fighting, null, this);
        enemies.forEach(function(item) {
            item.body.velocity.x = -480;
        }, this);
        
        
        
        if (this.mouseIsDown == true) {
        	//get the distance between the start and end point
            var distY = Math.abs(game.input.y - this.startY);
            var distX = Math.abs(game.input.x - this.startX);
            //if the distance is greater than 50 pixels then a swipe has happened
            if (distY > 60 || distX > 60) {
                this.swipeDone();
            } else if (distY < 1 || distX < 1) {
                        pressed = true;
                       }
           
        }
        
        //swipe actions
        
        if (swipeTop == true && this.player.body.touching.down) {
            this.player.body.velocity.y = -450;
            swipeTop = false;
        } else if (swipeTop == false){
            this.player.body.velocity.y = 0;
            }
        // пример взятия кнопки
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
//       if(swipeLeft == true) {
//            this.player.animations.play('fight');
//            swipeLeft = false;
//        } else if(game.input.activePointer.isDown) {
//            this.player.animations.play('fight');
//        } else {
//            this.player.animations.play('right');
//             this.player.scale.setTo(1, 1);
//        }

        var player = this.player;
        
        if(swipeLeft == true) {
            this.player.animations.play('fight', 10, false);
            swipeLeft = false;
            kick = true;
            
            game.time.events.add(300, function(){
                player.animations.stop('fight');
                kick = false;
            }, game);
//       setTimeout(function(){
//           player.animations.stop('fight');
//           player.play('right');
//       }, 300);
        } else if(swipeRight == true) {
            this.player.animations.play('left');
             this.player.scale.setTo(-1, 1);
             swipeRight = false;
             game.time.events.add(400, function(){          player.animations.stop('left');  
            }, game);
//    //    } else if(game.input.activePointer.isDown) {
//    //        this.player.animations.play('fight', 10, false);
//    //    } else if(game.input.activePointer.isDown) {
//   //         this.player.animations.play('fight', 10, false);
        } else if(swipeTop == true) {
            this.player.animations.play('top');
           
        } else {
            this.player.animations.play('right');
             this.player.scale.setTo(1, 1);
        }
        
        death
        if (lifes <= 0) {
          this.game.destroy();
      }
        
    },
    
  fighting: function (player, enemy) {
      if (kick == true) {
          console.log('enemy defeated');
          enemy.kill();
      } else {
          console.log('you r dead');
          game.time.events.add(300, function(){
                player.animations.stop('fight');
                kick = false;
            }, game);
          lifes--;
          this.textLifes.text = "Lifes: " + lifes;
      }
  }
}
//function goRight(){
//        this.player.animations.play('fight', 10, false, true);
//        this.player.body.velocity.x = 10;
//        }
var game = new Phaser.Game(500, window.innerHeight, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');