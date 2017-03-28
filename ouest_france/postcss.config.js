const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: [
                'defaults',
                'last 3 version',
                'ie >= 9',
            ],
        }),
    ],
};
