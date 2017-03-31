
import { Container, Texture, Sprite } from 'pixi.js';
import { TweenMax, Power0, Power1 } from 'gsap';

import Circle from './Circle';

import { RED } from '../style/color';

const
    SHOW_DURATION = 1,
    HIDE_DURATION = 0.2,
    BORDER_WIDTH  = 24;

class CircleSprite extends Sprite {
    constructor({
        position = { x: 0, y: 0 },
        rotation = 0,
        alpha = 1,
        pivot = { x: 0, y: 0 },
        texture,
    }) {
        super(texture);

        this.alpha = alpha;
        this.position = position;
        this.pivot = pivot;
        this.rotation = rotation;

        // non-pixi attributes
        this.startPosition = position;
    }
}

class Candidate extends Container {
    constructor(texture, config = {
        borderColor: RED,
    }) {
        super();

        this.sprite = new CircleSprite({
            texture: Texture.fromImage(texture),
            ...config,
        });
        this.x = -32;
        this.y = -32;

        this.border = new Circle({
            lineColor: config.borderColor,
            lineWidth: BORDER_WIDTH,
            radius:    800,
        });
        this.border.x = -600;
        this.border.y = -600;
        this.border.visible = false;

        this.scale.set(0.15, 0.15);

        this.initialPosition = { ...this.position };

        this.addChild(this.sprite);
        this.addChild(this.border);
    }

    hide() {
        TweenMax.to(
            this,
            HIDE_DURATION,
            {
                alpha: 0,
                ease:  Power1.easeIn,
            }
        );
    }

    show() {
        TweenMax.to(
            this,
            SHOW_DURATION,
            {
                alpha: 1,
                ease:  Power1.easeIn,
            }
        );
    }

    resetPosition({ duration }) {
        TweenMax.to(
            this.position,
            duration,
            {
                x:    this.initialPosition._x,
                y:    this.initialPosition._y,
                ease: Power0.easeNone,
            }
        );
    }

    showBorder() {
        this.border.visible = true;
    }

    hideBorder() {
        this.border.visible = false;
    }
}

export default Candidate;

