ig.module(
	'game.entities.zombie'
)
.requires(
	'impact.entity'
)
.defines(function()	{
	EntityZombie = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/zombie.png', 16, 16),
		size: {x: 8, y: 14},
		offset: {x: 4, y: 2},
		maxVel: {x: 100, y: 100},
		friction: {x: 150, y: 0},
		speed: 14,
		flip: false,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		check: function(other)	{
			other.receiveDamage(10, this);
		},
		init: function(x, y, settings)	{
			this.parent(x, y, settings);
			this.addAnim('walk', 0.07, [0,1,2,3,4,5]);
		},
		update: function()	{
			// Near edge? Return!
			if ( !ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +4 : this.size.x -4), this.pos.y + this.size.y+1) )	{
				this.flip = !this.flip;
			}
			var xdir = this.flip ? -1 : 1;
			this.vel.x = this.speed * xdir;
			this.currentAnim.flip.x = this.flip;
			this.parent();
		},
		handleMovementTrace: function(res)	{
			this.parent(res);
			// Collision with a wall? Return!
			if (res.collision.x)	{
				this.flip = !this.flip;
			}
		},
	});
});