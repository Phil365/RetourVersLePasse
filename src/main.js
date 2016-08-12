(function () {


    game = new Phaser.Game(768, 432, Phaser.AUTO, "");
    // adding "PlayGame" state


    game.state.add("Demarrage", demarrage); // Boot
    game.state.add("Chargement", chargement); // Loading
    game.state.add("Menu", menu); // Menu de démarrage
    game.state.add("PlayGame", playGame);
    // launching "PlayGame" state

    game.state.add("instruction", instruction); // Loading


    game.state.add("jeux1", jeux1); // Loading

    game.state.add("jeux2", jeux2); // Loading
    game.state.add("jeux3", jeux3); // Loading
    game.state.add("jeux4", jeux4); // Loading



    game.state.start("Demarrage");

    function fctcreate() {

    }

    function fctupdate() {



    }

    function fctrender() {


    }


})();