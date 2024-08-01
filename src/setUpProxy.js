const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function addProxyMiddleware(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://versusapi-2.onrender.com/api/users',
      changeOrigin: true,
    }),
  );
};