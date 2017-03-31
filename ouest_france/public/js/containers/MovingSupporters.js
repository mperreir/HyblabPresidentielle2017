
import { Container } from 'pixi.js';

import { TweenMax, Power0 } from 'gsap';

class MovingSupporters extends Container {
    constructor(duration, direction) {
        super();
        this.animation = null;
        this.duration = duration;
        this.direction = direction;
    }

    add(supporter) {
        this.addChild(supporter);
    }

    killAnimation() {
        if (this.animation) {
            this.animation.kill();
        }
    }

    rotate() {
        this.killAnimation();
        const animate = () => TweenMax.to(
            this,
            this.duration,
            {
                rotation:   this.rotation + (this.direction * Math.PI * 2),
                ease:       Power0.easeNone,
                onComplete: () => {
                    this.animation = animate();
                },
            }
        );

        this.animation = animate();
    }

    stopRotate() {
        this.killAnimation();
        this.rotation = 0;
    }
}

export default MovingSupporters;
