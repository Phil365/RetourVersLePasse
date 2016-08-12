var chargement = (function () {
    var _game;
    var chargement = function (game) {
        _game = game;
    }

    chargement.prototype = {
        preload: function () {

            _game.barreChargement =
                ////////////////////////Menu+Roue//////////////
                _game.add.sprite(_game.world.centerX / 2, _game.world.centerY * 1.8, "barre_chargement");
            _game.barreChargement.tint = 0x990099;
            _game.load.setPreloadSprite(_game.barreChargement);
            _game.load.json('infoNiveau', "src/niveau.json");
            _game.load.audio('musique', 'assets/intro.ogg');
            _game.load.image('instructiongame', 'assets/instruction.png');
            _game.load.image('bouton', 'assets/bouton.png');
            _game.load.image('menu', 'assets/menu.png');
            _game.load.image('bouton_menu', 'assets/bouton_menu.png');
            _game.load.image("background_lab", "assets/arriere_principal.jpg");
            _game.load.image("arriere", "assets/arriere2.png");
            _game.load.image("wheel", "assets/roue2.png");
            _game.load.image("pin", "assets/pin2.png");
            _game.load.image('vol+', 'assets/volume-max.PNG');
            _game.load.image('vol-', 'assets/volume-down.png');
            _game.load.image('fumee', 'assets/fumee.png');
            ////////////////////////Menu+Roue//////////////
            ////////////////////////Jeux 1//////////////
            _game.load.image("inst_sphinx", "assets/Jeux/sphinx_inst.jpg");
            _game.load.image("sphinx", "assets/Jeux/sphinx2.jpg");
            _game.load.image("nez1", "assets/Jeux/nez12.png");
            _game.load.image("nez2", "assets/Jeux/nez22.png");
            _game.load.image("nez3", "assets/Jeux/nez32.png");
            _game.load.image("carotte", "assets/Jeux/bandaid2.png");
            _game.load.image('menu1', 'assets/menu1.png');
            ////////////////////////Jeux 1//////////////
            ////////////////////////Jeux 2//////////////

            _game.load.image('background_newton', 'assets/Jeux2/background.jpg');
            _game.load.image('inst_newton', 'assets/Jeux2/instruction_newt.jpg');
            _game.load.image('menu2', 'assets/menu2.png');

            _game.load.image('game-over', 'assets/Jeux2/gameover.png');

            _game.load.image('button-pause', 'assets/Jeux2/pause.png');

            _game.load.spritesheet('pomme1', 'assets/Jeux2/pomme.png', 82, 98);



            ////////////////////////Jeux 2//////////////
        },
        create: function () {

            _game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            _game.infoNiveau = _game.cache.getJSON('infoNiveau');
            _game.aNiveau = _game.infoNiveau.niveaux;

            _game.state.start("Menu", false);
            _game.barreChargement.destroy();
            musique = _game.add.audio('musique');
            musique.play();
        }
    }

    return chargement;
})();