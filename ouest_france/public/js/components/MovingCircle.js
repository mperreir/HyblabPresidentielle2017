
import { TweenMax, Power0, Power1 } from 'gsap';

import Circle from './Circle';

const MOVE_DURATION = 1.8;
const FADE_DURATION = 0.3;

class MovingCircle extends Circle {
    constructor(config = {}, Thing, options) {
        super(config, Thing, options);

        this.animation = null;

        // copy intial values
        this.initialRotation = { ...this.rotation };
        this.initialPivot = { ...this.pivot };
        this.initialPosition = { ...this.position };

        this.randomMove = Math.random();
    }

    killAnimation() {
        if (this.animation) {
            this.animation.kill();
        }
    }

    resetPivot() {
        this.killAnimation();

        TweenMax.to(
            this.pivot,
            MOVE_DURATION,
            {
                x:    0,
                y:    0,
                ease: Power1.easeNone,
            }
        );
    }

    resetPosition({ duration }) {
        this.killAnimation();

        TweenMax.to(
            this.pivot,
            duration,
            {
                x:    this.initialPivot._x,
                y:    this.initialPivot._y,
                ease: Power1.easeNone,
            }
        );

        TweenMax.to(
            this.position,
            duration,
            {
                x:    this.initialPosition._x,
                y:    this.initialPosition._y,
                ease: Power1.easeNone,
            }
        );
    }

    moveX(x) {
        if (this.pivot.x !== 0 || this.pivot.y !== 0) {
            this.resetPivot();
        }

        TweenMax.to(
            this.position,
            MOVE_DURATION,
            {
                x,
                ease:  Power1.easeOut,
                delay: this.randomMove,
            }
        );
    }

    moveY(y) {
        if (this.pivot.x !== 0 || this.pivot.y !== 0) {
            this.resetPivot();
        }

        TweenMax.to(
            this.position,
            MOVE_DURATION,
            {
                y,
                ease:  Power1.easeOut,
                delay: this.randomMove,
            }
        );
    }

    fade() {
        if (this.alpha === 0) {
            return;
        }

        TweenMax.to(
            this,
            FADE_DURATION,
            {
                alpha: 0,
                ease:  Power0.easeNone,
            }
        );
    }

    show() {
        if (this.alpha === 1) {
            return;
        }

        TweenMax.to(
            this,
            FADE_DURATION,
            {
                alpha: 1,
                ease:  Power0.easeNone,
            }
        );
    }
}

export default MovingCircle;
