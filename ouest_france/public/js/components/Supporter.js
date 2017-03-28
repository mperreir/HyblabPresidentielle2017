
import MovingCircle from './MovingCircle';

export const RADIUS = 2;

class Supporter extends MovingCircle {
    constructor({
        data = [],
        ...config
    }) {
        super({ radius: RADIUS, ...config });

        this.data = data;
        this.maire = data.maire;
    }
}

export default Supporter;
