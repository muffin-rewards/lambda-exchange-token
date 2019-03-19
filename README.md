# Lambda FB Sync

Exchanges short-lived token for long-lived one and fetches IG handle and saves it
along with the token to a DynamoDB.

## Deployment
To deploy for production, run `npm run deploy:prod`.

### Environment variables
- `PROMOTERS_TABLE` where the credentials should be stored in.
- `APP_ID` is Instagram app id.
- `APP_SECRET` is token associated with app.

## Request
Request body should include stringified JSON of following format:

```
{
  token: String,
  id: String,
  handle: String
}
```

## Response
If token is not valid, then returns `400`.

Any unexpected error returns `500`.

If everything is ok returns `200`.
