ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.dorm1',
	'game.levels.dorm2',
	'impact.font'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	gravity: 300,
	instructText: new ig.Font('media/04b03.font.png'),
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.music.add('media/sounds/theme.*'),
		ig.music.volume = 0.5;
		ig.music.play();
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.W, 'jump' );
		ig.input.bind( ig.KEY.L, 'shoot' );
		ig.input.bind( ig.KEY.S, 'switch');
		this.loadLevel(LevelDorm1);
	},
	
	update: function() {
		// Screen follows the player
		var player = this.getEntitiesByType(EntityPlayer)[0];
		if (player)	{
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
			if (player.accel.x > 0 && this.instructText)
				this.instructText = null;
		}
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here		
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// Add your own drawing code here
		if (this.instructText)	{
			var x = ig.system.width/2,
				y = ig.system.height - 10;
			this.instructText.draw('Left/Right Moves, X Jumps, C Fires, & TAB Switches Weapons.', x, y, ig.Font.ALIGN.CENTER);
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 480, 320, 2 );

});
