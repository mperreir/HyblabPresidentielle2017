
import { Container } from 'pixi.js';
import { TweenMax, Power0 } from 'gsap';

import AverageSupporters from './AverageSupportersGroup';

const
    HIDE_DURATION     = 0.1,
    ACTIVATE_DURATION = 1.5;

class AverageCandidateGroup extends Container {
    constructor(
        infos,
        stats,
        controller
    ) {
        super();

        this.initialPosition = { ...this.position }; // copy
        this.infos = infos;
        this.id = infos.id;

        this.supporters = new AverageSupporters(stats);

        this.addChild(this.supporters);

        this.controller = controller;

        this.visible = false;
    }

    activate(x, y, scale) {
        this.visible = true;

        TweenMax.to(
            this,
            ACTIVATE_DURATION,
            {
                x,
                y,
                ease: Power0.easeNone,
            }
        );

        TweenMax.to(
            this.pivot,
            ACTIVATE_DURATION,
            {
                x:    0,
                y:    0,
                ease: Power0.easeNone,
            }
        );

        TweenMax.to(
            this,
            ACTIVATE_DURATION,
            {
                alpha: 1,
                ease:  Power0.easeNone,
            }
        );

        TweenMax.to(
            this.scale,
            ACTIVATE_DURATION,
            {
                x:    scale,
                y:    scale,
                ease: Power0.easeNone,
            }
        );
    }

    hide() {
        TweenMax.to(
            this,
            HIDE_DURATION,
            {
                alpha:      0,
                ease:       Power0.easeNone,
                onComplete: () => {
                    // for perf : if not visible, not drawn
                    this.visible = false;
                },
            }
        );
    }

    resetCircle() {
        this.supporters.resetPosition();
    }

    reset() {
        this.visible = false;
        TweenMax.to(
            this,
            ACTIVATE_DURATION,
            {
                alpha: 1,
                x:     this.initialPosition.x || 0,
                y:     this.initialPosition.y || 0,
                ease:  Power0.easeNone,
            }
        );

        TweenMax.to(
            this.scale,
            ACTIVATE_DURATION,
            {
                x:    1,
                y:    1,
                ease: Power0.easeNone,
            }
        );

        this.resetCircle();
    }

    buildDatavizData(selector) {
        return this.supporters.buildDatavizData(selector);
    }

    showDataviz(selector, totalDataviz, data, max) {
        this.supporters.showDataviz(selector, totalDataviz, data, max);
    }
}

export default AverageCandidateGroup;
