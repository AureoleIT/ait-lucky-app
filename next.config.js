const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    delete config.resolve.alias.url;
    return config
  }
})