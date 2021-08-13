const logger = require('./server/utils/logger').initLogger({ fileName: 'ang-repo-demo.log' });
import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import {enableProdMode} from '@angular/core';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';

import { existsSync } from 'fs';
import { APP_BASE_HREF } from '@angular/common';

// Compression  gzip deflate
import * as compression from 'compression';
// Importing Environment Depending Variables
const config = require('./server/config');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

function errorHandlerCustom(err, req, res, next) {
  logger.error(`Error in URL ${req.url}: ${err}`);
  res.status(500);
  res.send('Internal Server Error');
}

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.use(compression());

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', (_, options: any, callback) => ngExpressEngine({
    bootstrap: AppServerModule,
    providers: [{ provide: APP_BASE_HREF, useValue: options.req.baseUrl }]
  })(_, options, callback));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.use('/', require('./server/routes/index'));

  // Sentry Error Handler
  server.use(errorHandlerCustom);

  // All regular routes use the Universal engine
  // server.get('*', (req, res) => {
  //   res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  // });

  return server;
}

function run() {
  const port = process.env.PORT || config.PORT;
  const serverip = process.env.SERVER_IP || config.SERVER_IP;

  // Start up the Node server
  const server = app();
  server.listen(port, serverip, () => {
    logger.info(`Node Express server listening on http://${serverip}:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
