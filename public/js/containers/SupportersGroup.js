
import { Container } from 'pixi.js';
import { range, random as randomInt } from 'underscore';

import { getWidth, getHeight, isMobile } from '../utils/window';

import Supporter from '../components/Supporter';
import randomNumber from '../utils/randomNumber';

import MovingSupporters from './MovingSupporters';

import { LISTE_SE as GREY, listColor } from '../style/color';

import {
    SELECTOR_GENDER,
    SELECTOR_CSP,
    SELECTOR_AGE,
    SELECTOR_POP,
    SELECTOR_URBANITE,
    SELECTOR_CHOMAGE,
    SELECTOR_LISTE,
    SELECTOR_TYPE,
    SELECTOR_GENDER_ALL,
    mairesOnly,
} from '../dataviz';

import {
    buildGenderData,
    buildCSPData,
    buildAgeData,
    buildPopData,
    buildUrbaniteData,
    buildChomageData,
    buildListData,
    buildTypeData,
    LISTE_LABELS,
    LISTE_LABELS_FULL,
} from '../dataviz/buildData';

import {
    showBarChart,
    showHorizontalBarChart,
    showDotMatrix,
} from '../dataviz/drawDataviz';

const { PI, random, sqrt } = Math;

const
    SCALE_ACTIVE      = 0.5,
    CENTER_DURATION   = 0.3,
    NUMBER_GROUPS     = 3;

export const getXArea = () => {
    if (isMobile()) {
        return 0.9;
    }

    return 0.6;
};

export const getYArea = () => {
    if (isMobile()) {
        return 0.7;
    }

    return 0.5;
};

class Supporters extends Container {
    constructor(supporters) {
        super();

        const direction = (random() > 0.5) ? 1 : -1;

        this.legend = new Container();
        this.addChild(this.legend);

        this.movingGroups = range(NUMBER_GROUPS)
            .map(() => {
                const duration = (20 * random()) + 30;
                return new MovingSupporters(duration, direction);
            });
        this.movingGroups.forEach((g) => this.addChild(g));

        this.addSupporters(supporters);
    }

    addSupporters(supporters) {
        this.supporters = supporters
            .map((supporter) => new Supporter({
                color:    listColor(supporter.liste),
                rotation: 2 * random() * PI,
                pivot:    {
                    x: randomNumber(
                        48,
                        sqrt(supporters.length * (100 / PI)),
                        (sqrt(supporters.length * (100 / PI))) / 1.5
                    ),
                    y: -8,
                },
                data: supporter,
            }));

        this.supporters.forEach((c) => {
            this.movingGroups[randomInt(NUMBER_GROUPS - 1)].add(c);
        });
    }

    rotate() {
        this.movingGroups.forEach((g) => g.rotate());
    }

    stopRotation() {
        this.movingGroups.forEach((c) => c.stopRotate());
    }

    resetPosition() {
        this.scale.set(1, 1);

        this.showAll();

        this.supporters.forEach((c) => {
            c.resetPosition({
                duration: CENTER_DURATION,
            });
            c.resetColor();
        });

        this.legend.removeChildren();
    }

    buildDatavizData(selector) {
        const supporters = mairesOnly(selector)
            ? this.supporters.filter((s) => s.maire)
            : this.supporters;

        switch (selector) {
        case SELECTOR_GENDER:
            return buildGenderData(supporters);

        case SELECTOR_CSP:
            return buildCSPData(supporters);

        case SELECTOR_AGE:
            return buildAgeData(supporters);

        case SELECTOR_POP:
            return buildPopData(supporters);

        case SELECTOR_URBANITE:
            return buildUrbaniteData(supporters);

        case SELECTOR_CHOMAGE:
            return buildChomageData(supporters);

        case SELECTOR_LISTE:
            return buildListData(supporters);

        case SELECTOR_GENDER_ALL:
            return buildGenderData(supporters);

        case SELECTOR_TYPE:
            return buildTypeData(supporters);

        default:
            return { data: [] };
        }
    }

    showDataviz(selector, maxWidthRatio, data, maxValue) {
        const
            width = (getWidth() / maxWidthRatio) * getXArea(),
            height = getHeight() * getYArea();

        this.scale.set(SCALE_ACTIVE, SCALE_ACTIVE);
        this.legend.removeChildren();

        this.stopRotation();

        if (mairesOnly(selector)) {
            this.showMaires(); // hide other supporters
        } else {
            this.showAll();
        }

        switch (selector) {
        case SELECTOR_GENDER:
            showBarChart(
                data,
                { width, height },
                maxValue,
                this.legend
            );
            break;

        case SELECTOR_AGE:
            showHorizontalBarChart(
                data,
                { width, height },
                maxValue,
                this.legend
            );
            break;

        case SELECTOR_CSP:
            showHorizontalBarChart(
                data,
                { width, height },
                maxValue,
                this.legend
            );
            break;

        case SELECTOR_POP:
            showHorizontalBarChart(
                data,
                { width, height },
                maxValue,
                this.legend
            );
            break;

        case SELECTOR_URBANITE:
            showBarChart(
                data,
                { width, height },
                maxValue,
                this.legend
            );
            break;

        case SELECTOR_CHOMAGE:
            showBarChart(
                data,
                { width, height, rotateLegend: true },
                maxValue,
                this.legend
            );
            break;

        case SELECTOR_LISTE:
            showDotMatrix(
                data.points,
                data.colors,
                { width, height },
                LISTE_LABELS,
                this.legend,
                LISTE_LABELS_FULL
            );
            break;

        case SELECTOR_GENDER_ALL:
            showBarChart(
                data,
                { width, height },
                maxValue,
                this.legend
            );
            break;

        case SELECTOR_TYPE:
            showHorizontalBarChart(
                data,
                { width, height },
                maxValue,
                this.legend
            );
            break;

        default:
            break;
        }
    }

    showMaires() {
        this.supporters
            .filter((s) => !s.maire)
            .forEach((s) => {
                s.fade();
            });

        this.supporters.forEach((s) => s.resetColor());
    }

    showAll() {
        this.supporters.forEach((s) => {
            s.show();
            s.changeColor(GREY);
        });
    }
}

export default Supporters;

