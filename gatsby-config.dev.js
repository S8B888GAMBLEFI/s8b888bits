module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    productName: '888bits',
    title: `888BITS`,
    url: "https://dev.s8b.888bits.com/",
    siteUrl: "https://dev.s8b.888bits.com/",
    description: `Play the finest casino games online, slots, live casino, roulette and more! Discover our growing selection of at 888bits.com. Get lucky and place your bets at 888bits.com casino today! Provably fair & Live dealer. Unique bonus & promotion spins. BTC, ETH, DOGE, LTC, BCH, USDT, USDTT...`,
    author: `@888bits`,
    keywords: '888bits, Casino, Crypto, Slots, Live dealer, Virtual games, Instant games, Gamble, Crypto Casino Games, Crash Game, Bitcoin Gambling Games, Crypto Games, Ethereum Game, Bcgame, Crypto Gambling Games, Play Live Casino Online Free, Best Crypto Casino Games, Best Crypto Games, Online Crypto Casino Games, Online Blockchain Games, Online Casino Slot Games'
  },
  flags: {
    DEV_SSR: true
  },
  plugins: [
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://dev.s8b.888bits.com/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fonts`,
        path: `${__dirname}/static/fonts/`,
      }
    },
    `gatsby-plugin-image`,
    //`gatsby-transformer-sharp`,
    //`gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `888bits`,
        short_name: `888bits`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        //display: `minimal-ui`,
        display: `standalone`,
        //display: `browser`,
        //icon: `src/images/LogoColor.png`, // This path is relative to the root of the site.
        icons: [
          {
            src: `/favicons/icon-48x48.png`,
            sizes: `48x48`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-256x256.png`,
            sizes: `256x256`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-384x384.png`,
            sizes: `384x384`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
            purpose: `any maskable`
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: ['en'],
        //`de`, `sv`],
        // language file path
        defaultLanguage: 'en',
        // option to redirect to `/en` when connecting `/`
        redirect: false,
        // option for use / as defaultLangauge root path. if your defaultLanguage is `ko`, when `redirectDefaultLanguageToRoot` is true, then it will not generate `/ko/xxx` pages, instead of `/xxx`
        redirectDefaultLanguageToRoot: true, //false
        // paths that you don't want to genereate locale pages, example: ["/dashboard/","/test/**"], string format is from micromatch https://github.com/micromatch/micromatch
        ignoredPaths: [],
        // option to fallback to the defined language instead of the `defaultLanguage` if the user langauge is not in the list
        fallbackLanguage: 'en',
      },
    },
    `gatsby-plugin-sass`,

    //`gatsby-plugin-no-sourcemaps`,
    /*
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: false, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
        purgeCSSOptions: {
          // https://purgecss.com/configuration.html#options
          // safelist: ['safelist'], // Don't remove this selector
        },
        // More options defined here https://purgecss.com/configuration.html#options
      },
    },
    */
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [
          `/*`,
          `/claim-revenue-share/*`, `/wheel-of-fortune/*`
        ],
      },
    }
  ]
}
