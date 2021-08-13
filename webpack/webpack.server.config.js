// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require('path');
const webpack = require('webpack');
const {extendDefaultPlugins} = require("svgo");
module.exports = {
  mode: 'development',
  entry: {
    // This is our Express server for Dynamic universal
    server: './server.ts'
  },
  target: 'node',
  resolve: { extensions: ['.ts', '.js'] },
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname,'../' ,'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: { system: true },
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "raw-loader",
          },
          // 'raw-loader',
          {
            loader: 'svgo-loader',
            options: {
             plugins: [
               {
                 name: 'removeTitle',
                 active: false
               },
               {
                 name: 'removeViewBox',
                 active: false
               },
             ]
              // configFile: './svgo.js'
            }
          },
// FIRST TRY

//           {
//             loader: 'svgo-loader',
//             options: {
//               plugins: [{
//                 removeViewBox: false
//               }]
//             }
//         }
          //   {
          //     loader: "svgo-loader?useConfig=svgoConfig"
          //   }
          //  SECOND TRY
          //   {
          //     loader: 'file-loader'
          //   },
          // {
          //   loader: 'file-loader',
          // },
          //   {
          //     loader: 'svgo-loader',
          //     options: {
          //      configFile: './svgo.config.js'
          //     }
          //   }

          //   THIRD TRY
          // {
          //   loader: 'raw-loader',
          // },
          // {
          //   loader: 'svgo-loader',
          //   options: {
              // pretty: true,
              // plugins: [{ removeTitle: false }, { removeViewBox: false }]
              // configFile: '../svgo.config.yml',
              // externalConfig: './svgo.js'
              // plugins: [
              //   { name: 'removeViewBox', active: false},
              //   { name: 'removeTitle', active: false}
              // ]
              // svgo: {
              //   plugins: [
              //     {
              //       removeViewBox: {
              //         active: false,
              //       },
              //       removeTitle: {
              //         active: false,
              //       },
              //     }
              //   ]
              // }
              // svgo: {
              //   plugins: [
              //     { removeTitle: false },
              //     { removeViewBox: false }
              //   ]
              // }
              // svgo: {
              //   configFile: './svgo.js'
              // }
            // }
              // svg: {
              //   plugins: [
              //      {
              //                       removeViewBox: {
              //                         active: false,
              //                       },
              //                       removeTitle: {
              //                         active: false,
              //                       },
              //                     }
                  // { name: 'removeViewBox', active: false},
                  // { name: 'removeTitle', active: false}
              //   ]
              // }
              // plugins: [
              //   {
              //     removeViewBox: {
              //       active: false,
              //     },
              //     removeTitle: {
              //       active: false,
              //     },
              //   }
              // ]
            // }
        ]},
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
};
