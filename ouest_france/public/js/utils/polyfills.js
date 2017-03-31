
const runPolyfills = () => {
    if (typeof NodeList.prototype.forEach !== 'function') {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
};

export default runPolyfills;
