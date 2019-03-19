const { savePromoter } = require('./savePromoter')
const { exchangeTokens } = require('./exchangeTokens')

/**
 * Access headers for CORs.
 *
 * @var {object} headers
 */
const headers = {
  'Access-Control-Allow-Origin': '*',
}

exports.handler = async (event, _, callback) => {
  /**
   * @param {number} statusCode Http statusCode to return
   * @param {string} body Response body
   */
  const respond = (statusCode, body = '') => callback(null, { statusCode, body, headers })

  try {
    /**
     * @var {string} id User Facebook id
     * @var {string} token Short-live access token
     */
    const { id, handle, token } = JSON.parse(event.body)

    /**
     * @var {string} longToken Long-live access token
     */
    const longToken = await exchangeTokens(token)

    // Saves promoter data into an S3 bucket.
    await savePromoter(id, handle, longToken)

    respond(200)
  } catch (error) {
    console.log(error)

    return respond(500, error.message)
  }
}
