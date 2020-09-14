import! 'docs.demos.game.animations.Animation';

namespace `docs.demos.game.animations` (
    class Kneeling extends core.ui.game.animations.Animation {
        constructor(name, sprite){
        	super(name, sprite);
		}

		update(){
			if(Key.isDown(Key.DOWN)){
				this.start();
				this.sprite.isKneeling=true;
			} else {
				this.stop()
			}
		}
    }
);