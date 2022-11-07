const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const base = require("./webpack.config.base.js");

const webpackDevServerPort = 8081;

const { tools, categories, translations, options } = require("./debug-data");

module.exports = (env) => {
  const platform = env.platform;

  return merge(base, {
    mode: "production",
    devtool: "source-map",
    // devServer: {
    //   compress: true,
    //   hot: true,
    //   port: webpackDevServerPort,
    //   historyApiFallback: true,
    //   static: {
    //     directory: path.join(__dirname, "dist"),
    //   },
    //   client: {
    //     progress: true,
    //   },
    //   allowedHosts: "auto",
    // },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
      // publicPath: "/",
      libraryTarget: "window",
    },
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
    plugins: [
      new HtmlWebpackPlugin({
        scriptLoading: "blocking",
        inject: "head",
        templateContent: ({ htmlWebpackPlugin }) => {
          // I dont know why templateParams cant be accessed this way :(
          return `
              <!DOCTYPE html>
              <html>
              <head>
              <meta charset="utf-8">
              </head>
              <body>
                  <div class="container">
                      <div id="orca-lti-root"></div>
                      <input name="${
                        options.selected_tool_url_field_name
                      }" type="hidden" value="">
                      <input name="${
                        options.selected_tool_id_field_name
                      }" type="hidden" value="">
                  </div>
                  <script>
                      let tools = ${JSON.stringify(tools)};
                      let categories = ${JSON.stringify(categories)};
                      let translations = ${JSON.stringify(translations)};
                      let options = ${JSON.stringify(options)};
                      window.init(tools, categories, translations, options);
                  </script>
              </body>
              </html>
          `;
        },
      }),
    ],
  });
};