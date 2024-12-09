const fs = require('fs');

const isProduction = process.env.VERCEL_ENV === 'production';

const vercelConfig = {
  routes: [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1.js"
    },
    {
      "src": "^/(.*\\.(js|css|ico|png|jpg|svg|woff2?|ttf))$",
      "dest": "/dist/$1"
    },
    {
      "src": "^/(.*)",
      "dest": "/dist/index.html"
    }
  ],
  builds: isProduction
    ? undefined
    : [
        {
            "src": "api/**/*.js",
            "use": "@vercel/node"
        },
        {
            "src": "dist/**/*",
            "use": "@vercel/static"
        }
    ],
};

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
