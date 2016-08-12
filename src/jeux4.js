var jeux4 = (function(game){
var game;
var jeux4 = function(jeu){
game = jeu;
};  
jeux4.prototype = {
preload: function(){
game.load.image("jeux4", "assets/Jeux4/jeux4.jpg");          
},
  create: function(){
       game.gagnant = game.add.sprite(0, 0, "jeux4"); 
}
}
return jeux4;
})();