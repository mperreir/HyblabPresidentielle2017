
import { SCALE_MODES } from 'pixi.js';

const getRenderer = () => {
    let R = null;

    return {
        get:  () => R,
        save: (renderer) => {
            R = renderer;
        },
        getScaleMode:        () => SCALE_MODES.LINEAR,
        getDevicePixelRatio: () => window.devicePixelRatio,
    };
};

export default getRenderer();
