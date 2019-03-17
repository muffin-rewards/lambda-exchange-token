const { Awi } = require('awi')
const { FetchHandleException } = require('./exceptions')

/**
 * Awi base for fetching the content.
 *
 * @var {Awi} base
 */
const base = () => new Awi()
  .use(async req => req.base = 'https://graph.facebook.com/v3.2/')
  .use(async req => req.query.grant_type = 'fb_exchange_token')

/**
 * Fetches IG user handle.
 *
 * @param {string} id
 * @param {string} token
 * @return {Promise<string>}
 */
exports.fetchHandle = async (id, token) => {
  return (await base()
    .use(async req => req.query.access_token = token)
    .use(async req => req.query.fields = 'username')
    .optional(id))
    .expect(new FetchHandleException)
    .username
}
