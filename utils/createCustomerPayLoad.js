const createCustomerPayLoad = (customer) => {
    return {
        name: customer.name,
        customerId: customer._id
    }
}

module.exports = createCustomerPayLoad;