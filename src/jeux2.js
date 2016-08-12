// code source:
//http://gamedevelopment.tutsplus.com/tutorials/getting-started-with-phaser-building-monster-wants-candy--cms-21723
var jeux2 = (function (game) {
    var game;
    var jeux2 = function (jeu) {
        game = jeu;
        game._scores = null;
        game._score = 0;
        game._health = null;
        game._sante = 0;
    };
    jeux2.prototype = {
        preload: function () {

        },
        create: function () {

            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.physics.arcade.gravity.y = 200;

            this.add.sprite(0, 0, game.aNiveau[1].background);

            this.add.button(game.world.centerX - 96 - 10, 5, 'button-pause', this.fncpause, this);

            this._fontStyle = game.aNiveau[1].font;
            
            // initialise le timer
            this._pommeTimer = 0;
            // initialise le score a 0
            game._scores = this.add.text(120, 20, "0", this._fontStyle);
            // met la vie a 10
            game._sante = 1;
            game._health = this.add.text(400, 20, 'vies: ' + game._sante, this._fontStyle);
            // crée le groupe de pomme
            // game._groupePomme = this.add.group();
            // fais apparaitre les pommes
            //jeux2.item.apparitionPomme(this);


            game.pomGroup = game.add.physicsGroup();

            bouton_menu = game.add.button(game.world.centerX + 160, 25, 'bouton_menu', this.openWindow, this, 2, 1, 0);
            bouton_menu.input.useHandCursor = true;

            //volmoins.anchor.set(0.5);
            popup = game.add.sprite(game.world.centerX, game.world.centerY, 'menu2');
            popup.scale.x = 0.01;
            popup.scale.y = 0.01;
            popup.alpha = 0;
            popup.anchor.set(0.5);
            popup.inputEnabled = true;
            popup.events.onInputDown.add(this.changeVolume, this);

            //popup.input.enableDrag();


            bouton_menu.events.onInputDown.add(this.closeWindow, this);




            popup.scale.set(0.1);

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

        },

        fncpause: function () {
            //pour mettre le jeu en pause
            this.game.paused = true;
            // rajoute le texte
            var txtpause = this.add.text(100, 250, "Jeux en pause.\nTapez pour continuer.", this._fontStyle);
            // sur l'évenement toucher
            this.input.onDown.add(function () {
                // supprime le texte
                txtpause.destroy();
                // résume la partit
                this.game.paused = false;
            }, this);
        },
        update: function () {

            this._pommeTimer += this.time.elapsed;
            // a chaque seconde une pomme apparais
            if (this._pommeTimer > 2000) {
                // puis on le remet a zero
                this._pommeTimer = 0;
                // l'ont refais une nouvelle pomme
                game.time.events.add(0, this.instantiatePomme, this);
                // jeux2.item.apparitionPomme(this);

            }
            if (game._score > 15) {
                if (this._pommeTimer > 1500) {
                    // puis on le remet a zero
                    this._pommeTimer = 0;
                    // l'ont refais une nouvelle pomme
                    game.time.events.add(0, this.instantiatePomme, this);
                    //    jeux2.item.apparitionPomme(this);

                }
            } else if (game._score > 30) {
                if (this._pommeTimer > 200) {
                    // puis on le remet a zero
                    this._pommeTimer = 0;
                    // l'ont refais une nouvelle pomme
                    game.time.events.add(0, this.instantiatePomme, this);
                    //  jeux2.item.apparitionPomme(this);

                }
            }

            // une boucle pour faire apparaitres diverses pommes

            // si une pomme touche le sol le jeux se termine.
            if (!game._sante) {
                //affiche le sprite game-over et retour a l'accueil apres 3 seconde
                this.add.sprite(game.world.centerX, game.world.centerY, 'game-over');

                game.time.events.add(Phaser.Timer.SECOND * 3, function () {

                    game.state.start("PlayGame", true);
                    this.physics.arcade.gravity.y = 0;
                    game._score = 0;
                }, this);

            }
            var pom;
            for (var i = 0; i < 2; i++) {

                game.time.events.add(50, function () {
                    pom = new Pomme(game);
                    game.add.existing(pom);
                    game.pomGroup.add(pom);

                    pom.kill();
                }, this);


            }
        },


        instantiatePomme: function () {
            var toto = game.pomGroup.getFirstDead();
            toto.revive();


            //game.pomme=new Pomme(game);
            //game.add.existing(game.pomme);
        },

    };



    return jeux2;
})();