const jwt = require('jsonwebtoken')

const createJWT = ({payLoad}) => {
    const token = jwt.sign(payLoad, process.env.JWT-SECRET, {
    expireIn: process.env.JWT_LIFETIME
    })

    return token
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({res, customer}) => {
    const token = createJWT ({payload: customer});
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date (Date.now() + oneDay),
        signed: true
    })
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse
}