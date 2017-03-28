
import { Text, Graphics, Container } from 'pixi.js';

import { zip } from 'underscore';

import { WHITE, LISTE_SE as GREY } from '../style/color';

import {
    pointsPositionInRectVertical,
    pointsPositionInRectHorizontal,
} from '../utils/points';

import {
    barChart,
    horizontalBarChart,
} from './barchart';

import { RADIUS } from '../components/Supporter';

import { isMobile } from '../utils/window';

const { floor, PI, max, round } = Math;

const NEED_RECT = 150;

const LABEL_STYLE = {
    fontFamily: 'Roboto Mono',
    fontSize:   14,
    lineHeight: 17,
    fill:       WHITE,
    align:      'center',
};

const createLineRect = (x, y, width, height) => {
    const lineWidth = 4;
    const rect = new Graphics();
    rect.lineStyle(lineWidth, GREY);
    rect.drawRoundedRect(
        x - lineWidth,
        y - lineWidth,
        width + (2 * lineWidth),
        height + (2 * lineWidth),
        4
    );

    return rect;
};

const createFillRect = (x, y, width, height) => {
    const rect = new Graphics();
    rect.beginFill(WHITE);
    rect.drawRect(x, y, width, height);
    rect.endFill();
    rect.alpha = 0.3;

    return rect;
};

const createRect = (fill) => (fill ? createFillRect : createLineRect);

const createLabelCentered = (text, rotate, style) => {
    const l = new Text(
        text,
        style
    );

    const bounds = l.getLocalBounds();
    l.position.x -= (bounds.width / 2);
    l.position.y = 0;

    l.pivot.x = 0;
    l.pivot.y = 0;

    if (rotate) {
        l.rotation = -PI / 4;
        l.position.y += (bounds.width * 0.5) + 20; // cos(PI/4)
    }

    return l;
};

const createLabelRight = (text, style) => {
    const l = new Text(
        text,
        style
    );
    const bounds = l.getLocalBounds();

    l.position.x -= bounds.width - 10;
    l.position.y -= (bounds.height / 2);

    l.pivot.x = 0;
    l.pivot.y = 0;
    return l;
};

export const showBarChart = (
    data,
    { width, height, rotateLegend = false },
    maxValue,
    legendContainer
) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);

    const
        labels = new Container();
    data
        .map((d) => {
            const
                number = d.value,
                percentage = floor((d.value / total) * 100);

            return createLabelCentered(
                `${d.label}\n${round(number)} (${percentage}%)`,
                rotateLegend,
                LABEL_STYLE
            );
        })
        .forEach((label) => labels.addChild(label));

    const
        legendHeight = labels.getLocalBounds().height,
        realBarHeight = height - legendHeight;

    const bars = barChart({
        data,
        width,
        height: realBarHeight,
        max:    maxValue,
    });

    bars.forEach((bar, i) => {
        labels.children[i].position.x
            += (-width / 2) + bar.x + (bar.width / 2);
        labels.children[i].position.y
            += ((height / 2) - legendHeight) + (bar.y + 20);

        if ((total < NEED_RECT && data[i].value) || !bar.points.length) {
            const fillRect = !bar.points.length;
            legendContainer.addChild(createRect(fillRect)(
                (-width / 2) + bar.x,
                ((height / 2) - legendHeight) - bar.height,
                bar.width,
                bar.height
            ));
        }

        if (bar.points.length) {
            const positions = pointsPositionInRectVertical(
                bar.value,
                bar.width,
                bar.height
            );

            zip(bar.points, positions)
                .forEach(([point, position]) => {
                    point.moveX(
                        (-width / 2)
                        + position.x
                        + bar.x
                    );
                    point.moveY(
                        ((height / 2) - legendHeight)
                        + (-position.y + bar.y)
                    );
                    point.alpha = 1;
                });
        }
    });

    legendContainer.addChild(labels);
};

export const showHorizontalBarChart = (
    data,
    { width, height },
    maxValue,
    legendContainer
) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);

    const labels = new Container();

    data
        .map((d) => {
            const
                number = d.value,
                percentage = floor((d.value / total) * 100);

            return createLabelRight(
                `${d.label}\n${round(number)} (${percentage}%)`,
                { ...LABEL_STYLE, align: 'right' }
            );
        })
        .forEach((label) => labels.addChild(label));

    const
        legendWidth = labels.getLocalBounds().width,
        realBarWidth = width - legendWidth;

    const bars = horizontalBarChart({
        data,
        height,
        width: realBarWidth,
        max:   maxValue,
    });

    bars.forEach((bar, i) => {
        labels.children[i].position.x
            += ((-width / 2) + legendWidth) + (bar.x - 20);
        labels.children[i].position.y
            += (-height / 2) + (bar.y - (bar.height / 2));

        if ((total < NEED_RECT && data[i].value) || !bar.points.length) {
            const fillRect = !bar.points.length;
            legendContainer.addChild(createRect(fillRect)(
                ((-width / 2) + legendWidth) + bar.x,
                bar.y - (height / 2) - bar.height,
                bar.width,
                bar.height,
                GREY
            ));
        }

        if (bar.points.length) {
            const positions = pointsPositionInRectHorizontal(
                bar.value,
                bar.width,
                bar.height
            );

            zip(bar.points, positions)
                .forEach(([point, position]) => {
                    point.moveX(
                        ((-width / 2) + legendWidth)
                        + position.x
                        + bar.x
                    );
                    point.moveY(
                        -(height / 2)
                        + (-position.y + bar.y)
                    );
                    point.alpha = 1;
                });
        }
    });

    legendContainer.addChild(labels);
};

export const showDotMatrix = (
    points,
    colors,
    { width },
    labels,
    legendContainer,
    labelsFull = null
) => {
    const
        w = 10,
        h = 10;

    const
        r = floor(width / w), // number of points per line
        maxHeight = (points.length / r) * h;

    const
        legendWrapperLeft = new Container(),
        legendWrapperRight = new Container();

    const
        realLabels = labelsFull || labels,
        l = Object.keys(realLabels).length;

    const drawLabel = (container) => (key, i) => {
        const label = new Text(
            labelsFull ? labelsFull[key] : key,
            LABEL_STYLE
        );
        const bounds = label.getLocalBounds();

        label.position.x = 15;
        label.position.y = 16 + ((bounds.height + 2) * i);

        const circle = new Graphics();
        circle.beginFill(labels[key]);
        circle.drawCircle(0, 0, RADIUS * 2);
        circle.endFill();

        circle.position.x = 0;
        circle.position.y = 22 + ((bounds.height + 2) * i);

        container.addChild(label);
        container.addChild(circle);
    };

    if (!isMobile()) { // don't draw legend on mobile
        Object.keys(realLabels).slice(0, floor(l / 2)).forEach(
            drawLabel(legendWrapperLeft)
        );

        Object.keys(realLabels).slice(floor(l / 2) + 1).forEach(
            drawLabel(legendWrapperRight)
        );
    }

    const legendHeight = max(
        legendWrapperLeft.getLocalBounds().height,
        legendWrapperRight.getLocalBounds().height
    );

    const pointYOffset = -legendHeight / 2;

    points.forEach((point, i) => {
        const
            x = (i % r) * w,
            y = floor(i / r) * h;

        point.moveX((-width / 2) + x);
        point.moveY(-(maxHeight / 2) + pointYOffset + y);
        point.alpha = 1;
    });

    legendWrapperLeft.position.x = (-width / 2);
    legendWrapperLeft.position.y = (maxHeight / 2) + pointYOffset;

    legendWrapperRight.position.x = 0;
    legendWrapperRight.position.y = (maxHeight / 2) + pointYOffset;

    if (!isMobile()) {
        legendContainer.addChild(legendWrapperLeft);
        legendContainer.addChild(legendWrapperRight);
    }
};

