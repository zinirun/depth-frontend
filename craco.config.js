const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#3c6af5",
              "@text-color": "#333",
              "@heading-color": "#333",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
