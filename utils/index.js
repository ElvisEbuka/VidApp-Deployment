const createCustomerPayLoad = require('./createCustomerPayLoad');
const { attachCookiesToResponse } = require('./jwt');

module.exports = {
    createCustomerPayLoad,
    attachCookiesToResponse
}