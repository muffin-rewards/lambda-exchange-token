const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB()

AWS.config.update({ region: 'eu-west-1' })

/**
 * Saves user data into a dynamo db.
 *
 * @param {string} id
 * @param {string} handle
 * @param {string} token
 * @return {Promise<void>}
 */
exports.savePromoter = async (id, handle, token) => {
  return ddb.updateItem({
    Key: {
      handle: { S: handle },
    },
    ExpressionAttributeValues: {
      ':id': { S: id },
      ':token': { S: token },
    },
    ExpressionAttributeNames: {
      '#id': 'id',
      '#token': 'token',
    },
    TableName: process.env.PROMOTERS_TABLE,
    UpdateExpression: 'SET #id = :id, #token = :token',
   }).promise().catch(console.log)
}
