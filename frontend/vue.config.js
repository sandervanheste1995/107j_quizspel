const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../backend/dist/frontend"),
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:3080',
          changeOrigin: true
        },
      }
    }
  }