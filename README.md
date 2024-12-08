# Vanilla Spenpo
### a frontend application

## Installation

* use any js package manager
* `pnpm install`

## Development

* vercel.json is ignored by git because it breaks the production deployment
* create the file vercel.json in the project root and add this:
``` json
{
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    },
    {
      "src": "dist/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}
```
* this way, Vercel deploys the project as it would any other, and locally, you can develop in a vercel-like envrionment, with webpack rebuilding the dist folder each time you save changes
* `vercel --yes`
* `pnpm dev`

## Testing

* test a production build in the closest way you can get to simulating Vercel locally
* `pn start`