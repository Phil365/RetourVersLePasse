var jeux3 = (function(game){
var game;
var jeux3 = function(jeu){
game = jeu;
};  
jeux3.prototype = {
preload: function(){
game.load.image("jeux3", "assets/Jeux3/jeux3.jpg");          
},
  create: function(){
       game.gagnant = game.add.sprite(0, 0, "jeux3"); 
}
}
return jeux3;
})();