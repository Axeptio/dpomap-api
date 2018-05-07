const config = require('config');
const debug = require('debug')('dpomap');
const CampsiServer = require('campsi');
const services = {
  assets: require('campsi-service-assets'),
  auth: require('campsi-service-auth'),
  data: require('campsi-service-docs'),
  app: require('./app'),
};
const campsi = new CampsiServer(config.campsi);

Object.keys(services).forEach(key => {
  debug('mount services', key);
  campsi.mount(key, new services[key](config.services[key]));
});

campsi.on('campsi/ready', () => {
  debug('listening on port', config.port);
  campsi.listen(config.port);
});

campsi.on('assets/uploadError', () => {
  debug('error during upload');
});
campsi.start().catch((err) => {
  debug(err);
});

process.on('uncaughtException', (reason, p) => {
  debug('Uncaught Exception at:', p, 'reason:', reason);
});

process.on('unhandledRejection', (reason, p) => {
  debug('Unhandled Rejection at:', p, 'reason:', reason);
});
