const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../backend/dist/frontend"),
    devServer: {
      port: 8081,
      proxy: {
        '^/api': {
          target: 'http://localhost:8080',
          changeOrigin: true
        },
      }
    },
    css: {
      loaderOptions: {
        sass: {
          prependData: `@import "@/assets/_variables.scss";`
        }
      }
    }
  }