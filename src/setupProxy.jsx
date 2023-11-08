const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/',  // The path you want to proxy (e.g., /api)
    createProxyMiddleware({
      target: 'http://localhost:3002',  // The target URL of your API server
      changeOrigin: true,  // Change the origin of the host header to the target URL
    })
  );
};
