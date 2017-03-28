
import { Container, Circle } from 'pixi.js';
import { TweenMax, Power0, Power1 } from 'gsap';

import Supporters from './SupportersGroup';
import Candidate from '../components/Candidate';

import { RED, GREEN } from '../style/color';

const { random } = Math;

const
    HIT_AREA_RADIUS         = 100,
    HIDE_DURATION           = 0.1,
    ACTIVATE_DURATION       = 1.5,
    MOVEMENT_DURATION       = 60,
    MIN_VALID_SUPPORTERS    = 500;

class CandidateGroup extends Container {
    constructor(
        {
            position = { x: 0, y: 0 },
        },
        infos,
        supporters,
        texture,
        controller
    ) {
        super();

        this.position = position;
        this.initialPosition = { ...position }; // copy
        this.infos = infos;
        this.id = infos.id;
        this.maire = infos.maire;

        this.candidate = new Candidate(texture, {
            borderColor: (
                supporters.length >= MIN_VALID_SUPPORTERS ? GREEN : RED
            ),
        });

        this.supporters = new Supporters(supporters);
        this.supporters.rotate();

        this.interactive = true;
        this.hitArea = new Circle(0, 0, HIT_AREA_RADIUS);

        this.addChild(this.candidate);
        this.addChild(this.supporters);

        this.controller = controller;

        this.moveAround();

        this.on('pointerdown', this.handleClick.bind(this));
        this.on('mouseover', () => this.candidate.showBorder());
        this.on('mouseout', () => this.candidate.hideBorder());
    }

    handleClick() {
        this.controller.candidateOpen(this);
    }

    activate(x, y, scale) {
        this.killMovement();

        this.visible = true;

        TweenMax.to(
            this,
            ACTIVATE_DURATION,
            {
                x,
                y,
                ease: Power1.easeNone,
            }
        );

        TweenMax.to(
            this.pivot,
            ACTIVATE_DURATION,
            {
                x:    0,
                y:    0,
                ease: Power1.easeNone,
            }
        );

        TweenMax.to(
            this,
            ACTIVATE_DURATION,
            {
                alpha: 1,
                ease:  Power1.easeNone,
            }
        );

        TweenMax.to(
            this.scale,
            ACTIVATE_DURATION,
            {
                x:    scale,
                y:    scale,
                ease: Power1.easeNone,
            }
        );
    }

    hide() {
        this.killMovement();

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
        this.candidate.show();
        this.supporters.resetPosition();
        this.supporters.rotate();
    }

    reset() {
        this.visible = true;
        TweenMax.to(
            this,
            ACTIVATE_DURATION,
            {
                alpha:      1,
                x:          this.initialPosition.x || 0,
                y:          this.initialPosition.y || 0,
                ease:       Power1.easeNone,
                onComplete: () => {
                    this.moveAround();
                },
            }
        );

        TweenMax.to(
            this.scale,
            ACTIVATE_DURATION,
            {
                x:    1,
                y:    1,
                ease: Power1.easeNone,
            }
        );

        this.candidate.resetPosition({ ACTIVATE_DURATION });
        this.resetCircle();
    }

    moveAround() {
        const { x, y } = this.position;

        const
            pos1 = { x: x + (60 * random()), y: y + (60 * random()) },
            pos2 = { x: x - (60 * random()), y: y + (60 * random()) };

        const [p1, p2] = (random() > 0.5) ? [pos1, pos2] : [pos2, pos1];

        this.movement = TweenMax.to(
            this,
            MOVEMENT_DURATION,
            {
                repeat: -1,
                ease:   Power0.easeNone,
                bezier: {
                    type:      'thru',
                    curviness: 3,
                    values:    [
                        { x, y },
                        p1,
                        { x, y: y + (200 * random()) },
                        p2,
                        { x, y },
                    ],
                },
            }
        );
    }

    killMovement() {
        this.movement.kill();
    }

    buildDatavizData(selector) {
        return this.supporters.buildDatavizData(selector);
    }

    showDataviz(selector, totalDataviz, data, max) {
        this.candidate.hide();
        this.supporters.showDataviz(selector, totalDataviz, data, max);
    }

    showMaires(show) {
        this.supporters.showMaires(show);
    }
}

export default CandidateGroup;
