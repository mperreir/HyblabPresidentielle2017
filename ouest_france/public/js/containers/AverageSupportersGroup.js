
import { Container } from 'pixi.js';

import { max } from 'underscore';

import { getWidth, getHeight } from '../utils/window';

import {
    getXArea,
    getYArea,
} from './SupportersGroup';

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
} from '../dataviz';

import {
    showBarChart,
    showHorizontalBarChart,
} from '../dataviz/drawDataviz';

import {
    GENDER_LABELS,
    CSP_LABELS,
    AGES_LABELS,
    POPULATION_LABELS,
    URBANITE_LABELS,
    CHOMAGE_LABELS,
    TYPE_LABELS,
} from '../dataviz/buildData';

const SCALE_ACTIVE = 0.5;

const buildRawData = (labels, stats) => Object.keys(labels)
    .map((cat) => ({
        points: [],
        value:  stats[cat],
        label:  cat,
    }));

const maxValueInGroups = (stats) => max(Object.values(stats));

class AverageSupporters extends Container {
    constructor(stats) {
        super();

        this.legend = new Container();
        this.addChild(this.legend);

        this.stats = stats;
    }

    resetPosition() {
        this.scale.set(1, 1);
        this.legend.removeChildren();
    }

    buildDatavizData(selector) {
        if (selector === SELECTOR_LISTE) {
            return { data: [] };
        }

        switch (selector) {
        case SELECTOR_GENDER:
            return {
                data: buildRawData(GENDER_LABELS, this.stats[selector]),
                max:  maxValueInGroups(this.stats[selector]),
            };

        case SELECTOR_CSP:
            return {
                data: buildRawData(CSP_LABELS, this.stats[selector]),
                max:  maxValueInGroups(this.stats[selector]),
            };

        case SELECTOR_AGE:
            return {
                data: buildRawData(AGES_LABELS, this.stats[selector]),
                max:  maxValueInGroups(this.stats[selector]),
            };

        case SELECTOR_POP:
            return {
                data: buildRawData(POPULATION_LABELS, this.stats[selector]),
                max:  maxValueInGroups(this.stats[selector]),
            };

        case SELECTOR_URBANITE:
            return {
                data: buildRawData(URBANITE_LABELS, this.stats[selector]),
                max:  maxValueInGroups(this.stats[selector]),
            };

        case SELECTOR_CHOMAGE:
            return {
                data: buildRawData(CHOMAGE_LABELS, this.stats[selector]),
                max:  maxValueInGroups(this.stats[selector]),
            };

        case SELECTOR_GENDER_ALL:
            return {
                data: buildRawData(GENDER_LABELS, this.stats[selector]),
                max:  maxValueInGroups(this.stats[selector]),
            };

        case SELECTOR_TYPE:
            return {
                data: buildRawData(TYPE_LABELS, this.stats[selector]),
                max:  maxValueInGroups(this.stats[selector]),
            };

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
    }

    showAll() {
        this.supporters.forEach((s) => {
            s.show();
        });
    }
}

export default AverageSupporters;

