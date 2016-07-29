if (process.env.NODE_ENV === 'production') {
  module.exports = require('./MyProdTools');
} else {
  module.exports = require('./MyDevTools');
}