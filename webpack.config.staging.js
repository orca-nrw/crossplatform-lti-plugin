const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.config.base.js");

module.exports = (env) => {
  const platform = env.platform;
  const output = {};

  if (platform === "moodle") {
    output.path = path.resolve(__dirname, "../amd/src");
    output.filename = "orca_lti_selector-lazy.js";
    output.publicPath = "/dist/";
    output.libraryTarget = "amd";
  } else if (platform === "ilias") {
    output.path = path.resolve(__dirname, "../js");
    output.filename = "ilORCALTISelector.js";
    output.publicPath =
      "/Customizing/global/plugins/Services/Repository/RepositoryObject/ORCAContent/js/";
    output.library = {
      name: "orcalti",
      type: "window",
    };
  }

  return merge(base, {
    mode: "development",
    output,
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            "vue-style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 2,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                additionalData: `@import "./scss/_colors.scss"; @import "./scss/_bootstrap-overrides.scss"; @import "./scss/_bootstrap-configuration.scss"; @import "./scss/_variables.scss"; @import "./scss/_transitions.scss";`,
              },
            },
          ],
        },
      ],
    },
  });
};
