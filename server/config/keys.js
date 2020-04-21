// Logic of what set of credentials return
if (process.env.NODE_ENV === 'production') {
    // return prod set of keys
    module.exports = require('custom-env').env('prod')
} else {
    // return dev set of keys
    module.exports = require('custom-env').env('dev')
}