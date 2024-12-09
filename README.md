# Vanilla Spenpo
### a frontend application

## Installation

* use any js package manager
* `pnpm install`

## Development

* since we aren't using a framework, the dev server needs to be told about our serverless functions in vercel.json
* the is the purpose of the `builds` key that is added to the file via prepareVercelConfig.cjs
* do not commit the changes made by this script. Vercel treats all /api folders the same in production
* if you make change to vercel.json that you want to commit, remove this part first:
``` json
"builds": [
  {
    "src": "api/**/*.js",
    "use": "@vercel/node"
  },
  {
    "src": "dist/**/*",
    "use": "@vercel/static"
  }
]
```
* this way, Vercel deploys the project as it would any other, and locally, you can develop in a vercel-like envrionment, with webpack rebuilding the dist folder each time you save changes
* `vercel --yes`
* `pnpm dev`

## Testing

* test a production build in the closest way you can get to simulating Vercel locally
* `pn start`