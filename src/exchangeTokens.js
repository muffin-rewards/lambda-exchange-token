const { Awi } = require('awi')
const { ExchangeTokensException } = require('./exceptions')

/**
 * Awi base for fetching the content.
 *
 * @var {Awi} base
 */
const base = () => new Awi()
  .use(async req => req.base = 'https://graph.facebook.com/')
  .use(async req => req.query.access_token = `${process.env.APP_ID}|${process.env.APP_SECRET}`)
  .use(async req => req.query.grant_type = 'fb_exchange_token')

/**
 * Exchange short-live token for a long-live one.
 *
 * @param {string} shortToken Short-live token
 * @return {Promise<string>}
 */
exports.exchangeTokens = async (shortToken) => {
  const { access_token } = (await base()
    .use(async req => req.query.fb_exchange_token = shortToken)
    .optional('oauth/access_token'))
    .expect(new ExchangeTokensException)

  if (!access_token) {
    throw new ExchangeTokensException
  }

  return access_token
}
