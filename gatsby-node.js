/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.

/*
here's what we want to do:
 - for /nl/<slug>/nl/ create both /<slug>/ and /nl/<slug>/
 - for /en/<slug>/en/ create /en/<slug>/
 - for the rest of pages including <slug>, delete
*/

// note: optimally you would grab slugs from the fs or via graphql
const slugs = [
  // about
  "staking",
  "revenue-dividend-share",
  "wheel-of-dragon"
];

exports.onCreatePage = async ({
  page,
  actions: { createPage, deletePage, createRedirect },
}) => {

}


exports.onCreateWebpackConfig = ({ getConfig, stage, loaders, actions }) => {
  const config = getConfig()

  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /screenfull/,
            use: loaders.null(),
          },
        ],
      },
    })
  }

  if (config.externals && config.externals[0]) {
    config.externals[0]["node:crypto"] = require.resolve('crypto-browserify')
  }
  actions.replaceWebpackConfig(config)



}