const jwt = require('jsonwebtoken');
const { failed } = require('../helper/response');

const protect = (req, res, next) => {
    try {
        let token
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
            let decoded = jwt.verify(token, process.env.SECRETE_KEY_JWT);
            req.payload = decoded;
            req.APP_DATA = {
                tokenDecoded: decoded,
            };
            next();
        } else {
            res.json({
                message: "server need token"
            })
        }
    } catch (error) {
        failed(res, {
            code: 500,
            status: 'error',
            message: error.message,
            error: [],
        });
        return;
    }
}

module.exports = { protect }