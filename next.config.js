/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },
  /*publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'http://localhost:3000/api' // production api
  }*/
}

//module.exports = nextConfig
module.exports = {  
  //avoiding CORS error, more here: https://vercel.com/support/articles/how-to-enable-cors
      async headers() {
          return [
            {
              // matching all API routes
              source: "/:path*",
              headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" },
                { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
            }
          ]
      }, 
      async rewrites() {
        return [
          // if the header `x-rewrite-me` is present,
          // this rewrite will be applied
          {
            source: '/:path*',
            has: [
              {
                type: 'header',
                key: 'x-rewrite-me',
              },
            ],
            destination: '/another-page',
          },
          // if the source, query, and cookie are matched,
          // this rewrite will be applied
          {
            source: '/specific/:path*',
            has: [
              {
                type: 'query',
                key: 'page',
                // the page value will not be available in the
                // destination since value is provided and doesn't
                // use a named capture group e.g. (?<page>home)
                value: 'home',
              },
              {
                type: 'cookie',
                key: 'authorized',
                value: 'true',
              },
            ],
            destination: '/:path*/home',
          },
          // if the header `x-authorized` is present and
          // contains a matching value, this rewrite will be applied
          {
            source: '/:path*',
            has: [
              {
                type: 'header',
                key: 'x-authorized',
                value: '(?<authorized>yes|true)',
              },
            ],
            destination: '/home?authorized=:authorized',
          },
          // if the host is `example.com`,
          // this rewrite will be applied
          {
            source: '/:path*',
            has: [
              {
                type: 'host',
                value: 'example.com',
              },
            ],
            destination: '/another-page',
          },
        ]
      },
  }
