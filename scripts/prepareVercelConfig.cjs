const fs = require('fs');

const isProduction = process.env.VERCEL_ENV === 'production';

const vercelConfig = {
  rewrites: [
    {
      source: "/api/(.*)",
      destination: "/api/$1.js"
    },
    {
      source: "/(.*\.js|css|ico|png|jpg|svg|woff2?|ttf)",
      destination: "/dist/$1"
    },
    {
      source: "/(.*)",
      destination: "/dist/index.html"
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
