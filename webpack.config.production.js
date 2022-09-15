const { merge } = require("webpack-merge");
const base = require("./webpack.config.base.js");
const path = require("path");

module.exports = (env) => {
  const platform = env.platform;
  const output = {};

  if (platform === "moodle") {
    output.path = path.resolve(__dirname, "../amd/build");
    output.filename = "orca_lti_selector-lazy.min.js";
    output.publicPath = "/mod/orcalti/amd/build/";
    output.libraryTarget = "amd";
  } else if (platform === "ilias") {
    output.path = path.resolve(__dirname, "../js");
    output.filename = "ilORCALTISelector.js";
    output.publicPath = "/Customizing/global/plugins/Services/Repository/RepositoryObject/ORCAContent/js/";
    output.library = {
      name: "orcalti",
      type: "window",
    };
  }

  return merge(base, {
    mode: "production",
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
                sourceMap: false,
                importLoaders: 2,
              },
            },
            {
              loader: "postcss-loader",
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
