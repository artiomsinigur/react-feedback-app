const proxy = require('http-proxy-middleware')

// Fix problem for relative path with setupProxy.js
module.exports = function(app) {
    app.use(proxy(['/api', '/auth'], { target: 'http://localhost:5000' }));
}
