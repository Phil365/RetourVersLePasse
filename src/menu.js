var menu = (function () {
    var _game;
    var menu = function (game) {
        _game = game;
        console.log('menu');
    }

    menu.prototype = {
        create: function () {
           
            _game.bouton = _game.add.button(_game.world.centerX, _game.world.centerY * 1.8, "bouton", this.demarrergame, this);
            _game.bouton.anchor.setTo(0.5, 0.5);


        },
        demarrergame: function () {
            console.log("PlayGame...");
            _game.state.start("PlayGame");
        }

    }

    return menu;


})();