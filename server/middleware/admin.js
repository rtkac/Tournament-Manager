const { ROLE } = require('../config/appConfig');

let admin = (req, res, next) => {
    if(req.user.role === ROLE.USER) {
        return res.send('you are not allowed');
    };
    next();
};