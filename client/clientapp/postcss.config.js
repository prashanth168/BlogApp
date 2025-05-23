// postcss.config.js
module.exports = {
    plugins: [
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      }),
    ],
  };
  