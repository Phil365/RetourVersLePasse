var Pomme = (function () {
    var Pomme = function (game) {
        Phaser.Sprite.call(this, game, 0, 0, 'pomme1');
        _game = game;
        // fais tomber les pomme entre 0 et 600 de facon aléatoire
        var positionTombe = Math.floor(Math.random() * 600);


        // pour choisir la hauteur que les pommes vont tomber
        var hauteur = [-27, -36, -36, -38, -48];
        // style aléatoire des pommes
        var stylePomme = Math.floor(Math.random() * 5);


        var x = positionTombe;
        var y = hauteur[stylePomme];


        Phaser.Sprite.call(this, game, x, y, 'pomme1', stylePomme);

        // crée les nouvelles pommes
       


        // play the newly created animation
     
        game.physics.enable(this);

        this.inputEnabled = true;
        // quand on clique sur la pomme
        this.events.onInputDown.add(this.pommeClique, this);
        // pour ne pas que les pommes sortent de lécran


        this.checkWorldBounds = true;

        this.events.onOutOfBounds.add(this.supprimePomme, this);

        this.anchor.setTo(0.5, 0.5);



     


    }
    Pomme.prototype = Object.create(Phaser.Sprite.prototype);
    Pomme.prototype.constructor = Pomme;

    Pomme.prototype.pommeClique = function (pomme) {

        _game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 1000, Phaser.Easing.Quadratic.In, true, 0, 0);
        var t = _game.add.tween(pomme).to({
            x: 100,
            y: 200
        }, 1000, Phaser.Easing.Quadratic.In, true, 0, 0);

        t.onComplete.add(function () {
            this.checkWorldBounds = false;
            pomme.kill();
        }, this);
        _game._score += 1;
        _game._scores.setText(_game._score);
    };


    Pomme.prototype.supprimePomme = function (pomme) {

        pomme.kill();

        _game._sante -= 1;
        if (_game._sante <= 0) {
            _game._sante = 0;
        }
        _game._health.setText('vies: ' + _game._sante);
    };


    return Pomme;

})();