
import { range } from 'underscore';

const HEIGHT_WIDTH_RATIO = 4;

const { random, max, min, floor, sqrt } = Math;

/**
 * randomize
 *
 * Return t randomize around an interval
 *
 * @param  {Number}  t          value to randomize
 * @param  {Number}  interval   max interval around t
 * @param  {Number}  min        don't go to far below min
 * @param  {Number}  max        don't go to far after max
 *
 * @return {Object}
 * @return {Number}  value      t randomized
 * @return {Number}  random     the random value used [0, 1[
 */
export const randomize = (t, interval, minValue, maxValue) => {
    const r = random();

    const value = max(
        minValue,
        min(
            t + (r * interval) + (-interval / 2),
            maxValue,
        )
    );

    return { value, random: r };
};


/**
 * pointsPositionInRect
 *
 * Give n points, compute position for them to be uniformicaly distributed in
 * the rectangle diven
 *
 * @param  {Number}  n      Nomber of points
 * @param  {Number}  width  Width of the rect
 * @param  {Number}  height Heigth of the rect
 *
 * @return {Array}          Array of n positions { x, randomX, y, randomY }
 *                          randomX, randomY are value [0, 1] used to randomize
 */
const pointsPositionInRectPure = (getXY) => (n, width, height) => {
    const points = range(n);

    const
        r = height / width, // ratio
        A = height * width, // rect area

        // let's use a rect for each point
        a = A / n, // area of the tiny rect
        w = sqrt( // width
            HEIGHT_WIDTH_RATIO * (a / r)
        ),
        h = (w * r) / HEIGHT_WIDTH_RATIO; // height

    return points.map((_, i) => {
        const [x, y] = getXY(i, w, h, width, height);

        const
            randomX = randomize(x, w, 0, width),
            randomY = randomize(y, h, 0, height - h);

        return {
            x:       randomX.value,
            randomX: randomX.random,
            y:       randomY.value,
            randomY: randomY.random,
        };
    });
};

const getXYVertical = (i, w, h, width) => {
    const
        x = (i * w) % width,
        y = floor((i * w) / width) * h;

    return [x, y];
};

const getXYHorizontal = (i, w, h, width, height) => {
    const
        y = (i * h) % height,
        x = floor((i * h) / height) * w;

    return [x, y];
};

export const pointsPositionInRectVertical = pointsPositionInRectPure(
    getXYVertical
);

export const pointsPositionInRectHorizontal = pointsPositionInRectPure(
    getXYHorizontal
);
