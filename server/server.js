'use strict';

import fs from 'fs';
import restify from 'restify';
import {contactFormHandler} from './contact-form';
var started = new Date();
var server = restify.createServer({
  name: 'atticus-portfolio',
  version: '1.0.0',
  certificate: process.env.PORTFOLIO_CERT_PATH ? fs.readFileSync(process.env.PORTFOLIO_CERT_PATH) : null,
  key: process.env.PORTFOLIO_KEY_PATH ? fs.readFileSync(process.env.PORTFOLIO_KEY_PATH) : null
});

server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.urlEncodedBodyParser({mapParams: false}));

server.post('/contact-form', contactFormHandler);
server.get('/ping', (req, res) => {
  var now = new Date();
  var diff = now.getTime() - started.getTime();
  res.send({
    uptime: Math.round(diff / 60 / 1000)
  });
});

server.listen(4050, () => {
  console.log('listening on', 4050);
});