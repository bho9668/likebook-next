const { parsed: localEnv } = require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  env: {
    BASE_API_URL: localEnv.BASE_API_URL
  }
}
