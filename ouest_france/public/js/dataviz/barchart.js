
import {
    scaleBand,
    scaleLinear,
} from 'd3';

export const barChart = ({
    data,
    width,
    height,
    max,
}) => {
    const
        x = scaleBand().range([0, width]).padding(0.2),
        y = scaleLinear().range([0, height]);

    x.domain(data.map((d) => d.label));
    y.domain([0, max]);

    return data
        .map((d) => ({
            x:      x(d.label),
            y:      0,
            width:  x.bandwidth(),
            height: y(d.value),
            ...d,
        }));
};

export const horizontalBarChart = ({
    data,
    width,
    height,
    max,
}) => {
    const
        x = scaleLinear().range([0, width]),
        y = scaleBand().range([0, height]).padding(0.3);

    x.domain([0, max]);
    y.domain(data.map((d) => d.label));

    return data
        .map((d) => ({
            x:      0,
            y:      y(d.label),
            width:  x(d.value),
            height: y.bandwidth(),
            ...d,
        }));
};

