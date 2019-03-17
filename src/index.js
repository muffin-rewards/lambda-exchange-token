const { fetchHandle } = require('./fetchHandle')
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
    const { id, token } = JSON.parse(event.body)

    /**
     * @var {string} longToken Long-live access token
     */
    const longToken = exchangeTokens(id, token)

    /**
     * @var {string} handle User Instagram handle
     */
    const handle = fetchHandle(id, longToken)

    // Saves promoter data into an S3 bucket.
    savePromoter(id, handle, longToken)

    respond(200)
  } catch (error) {
    console.log(error)

    return respond(500, error.message)
  }
}