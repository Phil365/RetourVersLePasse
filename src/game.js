//lien pour code source:
//http://www.emanueleferonato.com/2015/07/31/create-a-wheel-of-fortune-for-your-html5-games-with-phaser-in-only-a-few-lines/
//http://www.html5gamedevs.com/topic/5449-directional-swipe/
//http://phaser.io/examples/v2/arcade-physics/angular-acceleration



// PLAYGAME STATE

var playGame = function (game) {};
var bouton_menu;
var popup;
var tween = null;
playGame.prototype = {

    preload: function () {

    },
    //quand l'état est crée
    create: function () {
        // couleur du background


        background = game.add.sprite(0, 0, "background_lab");
        arriere = game.add.sprite(0, 0, "arriere");
        arriere = game.add.sprite(0, 0, "arriere");

        // pour mettre la roue au millieu
        wheel = game.add.sprite(game.width / 2, game.height / 1.8, "wheel");
        // mettre l'ancre au millieu de la roue
        wheel.anchor.set(0.5);

        ///mettre la fleche au millieu
        var pin = game.add.sprite(game.width / 2, game.height / 1.8, "pin");
        // ancre au millieu
        pin.anchor.set(0.5);


        game.physics.enable(wheel, Phaser.Physics.ARCADE);

        //max vitesse angulaire
        wheel.body.maxAngular = 500;

        //Pour que la roue puisse ralentir progressivement
        wheel.body.angularDrag = 50;


        this.listenSwipe(function (direction) {


        });


        bouton_menu = game.add.button(game.world.centerX + 160, 25, 'bouton_menu', this.openWindow, this, 2, 1, 0);
        bouton_menu.input.useHandCursor = true;


        popup = game.add.sprite(game.world.centerX, game.world.centerY, 'menu');
        popup.scale.x = 0.01;
        popup.scale.y = 0.01;
        popup.alpha = 0;
        popup.anchor.set(0.5);
        popup.inputEnabled = true;
        popup.events.onInputDown.add(this.changeVolume, this);




        bouton_menu.events.onInputDown.add(this.closeWindow, this);



        popup.scale.set(0.1);

        game.aNiveau = game.infoNiveau.niveaux;

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


    listenSwipe: function (callback) {


        var startPoint = {};
        var endPoint = {};
        var minimum = {
            duration: 75,
            distance: 150

        }
        game.curseurDown = false;
        game.input.onDown.add(function (pointer1) {

            startPoint.x = pointer1.clientX;
            startPoint.y = pointer1.clientY;

            game.curseurDown = true;
            game.temps = Date.now();
        }, this);

        game.input.onUp.add(function (pointer1) {
            game.curseurDown = false;

            this.eventDuration = Date.now() - game.temps;
            this.direction = '';


            if (this.eventDuration > minimum.duration) {
                endPoint.x = pointer1.clientX;
                endPoint.y = pointer1.clientY;

                // Check direction
                if (endPoint.x - startPoint.x > minimum.distance) {
                    this.direction = 'right';

                } else if (startPoint.x - endPoint.x > minimum.distance) {
                    this.direction = 'left';
                }



                if (this.direction) {
                    callback(this.direction);
                }

                var distanceX = Math.abs(endPoint.x - startPoint.x);
                var distanceY = Math.abs(endPoint.y - startPoint.y);

                this.vitesse = Math.sqrt(distanceY * distanceY + distanceX * distanceX) / (this.eventDuration);
                this.vitesse *= 5000;

            }
        }, this);

    },


    update: function () {

        var prix = '';

        //  repart l'acceleration
        wheel.body.angularAcceleration = 0;
        if (game.curseurDown) {
            //console.log(game.input.speed);
        }

        //  fais l'accéleration sur la roue selon la direction et la vitesse du curseur
        if (this.vitesse > 10 && this.direction == 'right') {
            wheel.body.angularAcceleration = this.vitesse;
            this.vitesse = 0;
            game.input.enabled = false;
        } else if (this.vitesse > 10 && this.direction == 'left') {
            wheel.body.angularAcceleration = -this.vitesse;
            this.vitesse = 0;
            game.input.enabled = false;
        }
        // Selon les degrée radiant mets le jeux en conséquence
        else if (wheel.rotation > 0 && wheel.rotation < 0.78539816339 || wheel.rotation < -1.57079632678 && wheel.rotation > -3.14159265356) {
            position = 1;
        } else if (wheel.rotation > 0.78539816339 && wheel.rotation < 1.57079632678 || wheel.rotation < -1.57079632678 && wheel.rotation > -2.35619449017) {
            position = 0;
        } else if (wheel.rotation > 1.57079632678 && wheel.rotation < 2.35619449017 || wheel.rotation < -0.78539816339 && wheel.rotation > -1.57079632678) {
            position = 1;
        } else if (wheel.rotation > 1.57079632678 && wheel.rotation < 3.14159265356 || wheel.rotation < 0 && wheel.rotation > -0.78539816339) {
            position = 0;
        }
        //si la roue ne tourne pas et quelle n'est pas a la position zero, mets le jeux a la position.
        if (wheel.body.angularVelocity == 0 && wheel.rotation != 0) {
            var attenuation = Phaser.Easing.Elastic.out;


            game.emetteur = game.add.emitter(game.width / 2, game.height / 2, 1000);
            game.emetteur.makeParticles("fumee", [1, 2, 3, 4]);
            game.emetteur.gravity = -500;
            game.emetteur.minParticleScale = 0.1;
            game.emetteur.maxParticleScale = 0.5;



            game.emetteur.start(false, 1000, 100, 1, false);


            var t = game.add.tween(game.emetteur).to({
                x: game.input.x,
                y: game.input.y
            }, 3000, attenuation, true, 0, 0);

            t.onComplete.add(function () {
                game.state.start("instruction", true, false, position);
                game.input.enabled = true;
            }, this);

        }


    },

};