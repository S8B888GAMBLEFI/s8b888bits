import React from "react"
import PropTypes from "prop-types"
import * as config from "./configuration/Config";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge,chrome=1" />
        {/*
        <meta httpEquiv="cache-control" content="no-cache" />
        */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light only" />
        {
          /*
            config.ENVIRONMENT_SITE === "LIVE" &&
            <meta name="google-site-verification" content="yTYAXaYAeCYyLisXWcCLTvev7ymjUIRW0BE7TqGiNq0" />
          */
        }

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=5.0"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {
          <link href="/fonts/fonts.css" rel="stylesheet" />
        }

        {/*
        <link href="https://fonts.googleapis.com/css2?family=Barlow&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap" rel="stylesheet" />
        */}

        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet" />

        {
          props?.headComponents &&
          props.headComponents
        }

        {/*
          config.ENVIRONMENT_SITE === "LIVE" &&
          <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KS8DSRL');
            `,
          }}
          />
        */}

        {/*
          config.ENVIRONMENT_SITE === "LIVE" &&
          <script 
          async src={"https://www.googletagmanager.com/gtag/js?id=G-SH450T01LM"}
          dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)};
              gtag('js', new Date());
              gtag('config', 'G-SH450T01LM');
              `,
          }}
          />
        */}

      </head>
      <body {...props.bodyAttributes}>

        {/*
          config.ENVIRONMENT_SITE === "LIVE" &&
          <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KS8DSRL" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }} />
        */}

        {
          props?.preBodyComponents &&
          props.preBodyComponents
        }

        <div
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />

        {
          props?.postBodyComponents &&
          props.postBodyComponents
        }

        {/*
          config.ENVIRONMENT_SITE === "LIVE" &&
          <script src="//code.tidio.co/l6pxp00exirx515xc31zbpej9syi8w88.js" async></script>
      */}

      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
