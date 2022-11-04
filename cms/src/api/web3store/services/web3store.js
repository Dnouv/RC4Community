'use strict';

/**
 * web3store service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::web3store.web3store');
