var instruction = (function () {
    var _game;
    var instruction = function (game) {
        _game = game;

    }

    instruction.prototype = {
        init: function (param) {
            console.log(param);
            this.niveau = param;
        },
        create: function () {
          
            _game.ecran_demarrage = _game.add.sprite(0, 0, _game.aNiveau[this.niveau].instruction);
            _game.bouton = _game.add.button(_game.world.centerX, _game.world.centerY * 1.8, "bouton", this.demarrergame, this);
            _game.bouton.anchor.setTo(0.5, 0.5);
        },
        demarrergame: function () {
            _game.state.start(_game.aNiveau[this.niveau].nom, true, false, "info du jeu...");
        }
    }
    return instruction;
})();