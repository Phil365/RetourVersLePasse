//code source:
//http://codepen.io/jdnichollsc/pen/WbZgwM?editors=001
var jeux1 = (function (game) {
    var game;
    var jeux1 = function (jeu) {
        game = jeu;
    };

    jeux1.prototype = {
        preload: function () {


        },
        create: function () {

            //inclusion des images et position, grosseurs et ancre...
            this.sphinx = this.game.add.sprite(0, 0, game.aNiveau[0].background);
            this.carotte = this.game.add.sprite(this.game.world.centerX - 20, this.game.world.centerY, game.aNiveau[0].support);
            this.nez1 = this.game.add.sprite(this.game.world.centerX + 200, this.game.world.height, game.aNiveau[0].nez1);
            this.nez2 = this.game.add.sprite(this.game.world.centerX, this.game.world.height, game.aNiveau[0].nez2);
            this.nez3 = this.game.add.sprite(this.game.world.centerX - 200, this.game.world.height, game.aNiveau[0].nez3);

            this.nez1.anchor.setTo(0.5, 1);
            this.nez2.anchor.setTo(0.5, 1);
            this.nez3.anchor.setTo(0.5, 1);
            this.carotte.anchor.setTo(0.5, 0.6);




            this.game.physics.arcade.enable(this.nez1);
            this.game.physics.arcade.enable(this.nez2);
            this.game.physics.arcade.enable(this.nez3);
            this.game.physics.arcade.enable(this.carotte);


            //activer le drag and drop

            this.nez1.inputEnabled = true;
            this.nez2.inputEnabled = true;
            this.nez3.inputEnabled = true;
            this.nez1.input.enableDrag();
            this.nez2.input.enableDrag();
            this.nez3.input.enableDrag();
            this.nez1.originalPosition = this.nez1.position.clone();
            this.nez2.originalPosition = this.nez2.position.clone();
            this.nez3.originalPosition = this.nez3.position.clone();

            this.nez1.events.onDragStop.add(function (currentSprite) {
                // lorsque image est sur carotte va chercher la fonction

                this.stopDrag(currentSprite, this.carotte);
            }, this);

            this.nez2.events.onDragStop.add(function (currentSprite) {
                this.stopDrag(currentSprite, this.carotte);
            }, this);
            this.nez3.events.onDragStop.add(function (currentSprite) {
                this.stopDrag(currentSprite, this.carotte);
            }, this);
            
            bouton_menu = game.add.button(game.world.centerX + 160, 25, 'bouton_menu', this.openWindow, this, 2, 1, 0);
            bouton_menu.input.useHandCursor = true;

           
            popup = game.add.sprite(game.world.centerX, game.world.centerY, 'menu1');
            popup.scale.x = 0.01;
            popup.scale.y = 0.01;
            popup.alpha = 0;
            popup.anchor.set(0.5);
            popup.inputEnabled = true;
            popup.events.onInputDown.add(this.changeVolume, this);

 


            bouton_menu.events.onInputDown.add(this.closeWindow, this);



        
            popup.scale.set(0.1);

        },

        // fonction pour empecher de bouger lorsque l'image est sur la 'carotte' soit le nez du sphinx
        stopDrag: function (currentSprite, endSprite) {

            if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function () {
                    this.test = true;
                    currentSprite.input.draggable = false;
                    currentSprite.position.copyFrom(endSprite.position);
                    currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y);

                    // test de 3 seconde
                    game.time.events.add(Phaser.Timer.SECOND * 3, function () {
                        game.state.start("PlayGame");
                    }, this);



                })) {
                currentSprite.position.copyFrom(currentSprite.originalPosition);
            }
        },
        openWindow: function () {

            if ((tween !== null && tween.isRunning) || popup.scale.x === 1) {
                return;
            }
            tween = game.add.tween(popup.scale).to({
                x: 1,
                y: 1
            }, 1000, Phaser.Easing.Elastic.Out, true);
            game.add.tween(popup).to({
                alpha: 0.97
            }, 1000, Phaser.Easing.Elastic.Out, true);

        },
        closeWindow: function () {

            if (tween && tween.isRunning || popup.scale.x === 0.1) {
                return;
            }


            tween = game.add.tween(popup.scale).to({
                x: 0.1,
                y: 0.1
            }, 500, Phaser.Easing.Elastic.In, true);
            game.add.tween(popup).to({
                alpha: 0
            }, 500, Phaser.Easing.Elastic.In, true);

        },
        changeVolume: function () {

            curseur = game.input.activePointer;
            console.log(curseur.x, curseur.y);
            if (curseur.x < 296) {
                if (musique.mute == false) {
                    musique.mute = true;
                } else musique.mute = false;
            } else if (curseur.x > 457) {
                musique.volume += 0.1;
            } else {
                musique.volume -= 0.1;
            }

        }


    }
    return jeux1;
})();