module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:7001",
        changeOrgin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
