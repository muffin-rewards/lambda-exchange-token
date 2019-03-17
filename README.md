# Lambda FB Sync

Exchanges short-lived token for long-lived one and fetches IG handle and saves it
along with the token to an S3.

## Deployment
To deploy for production, run `npm run deploy:prod`.

### Environment variables
- `BUCKET_NAME` where the credentials should be stored in.
- `GRAPH_API_URL` endpoint where should be the handle retrieved from and the token exchanged at.

## Request
Request body should include stringified JSON of following format:

```
{
  "token": "...",
  "id": "..."
}
```

## Response
Any unexpected error returns `500`.

If everything is ok returns `200`.
