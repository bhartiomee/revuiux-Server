const { PotentialUserToken, PotentialUser } = require('../models');
/**
 * Simple token based authentication.
 * Clients should authenticate by passing the token key in the "Authorization"
 * HTTP header, prepended with the string "Token ".  For example:
 * Authorization: Token 401f7ac837da42b97f613d789819ff93537bee6a
 */
const verifyToken = async (req, res, next) => {
    const tokenKeyword = "token";
    if (!('authorization' in req.headers)) {
        res.status(401).json({ message: "No credentials provided" });
    }
    const auth = req.headers['authorization'].split(" ");
    if (auth.length === 1) {
        res.status(401).json({ message: "Invalid token header. No credentials provided." });
    }
    else if (auth.length > 2 || auth[0].toLowerCase() !== tokenKeyword) {
        res.status(401).json({ message: "Invalid token header. Token string should not contain invalid characters." });
    }
    else {
        try {
            const userToken = await PotentialUserToken.findAll({
                where: {
                    key: auth[1]
                },include: [{model : PotentialUser, as: "potentialUser"}]
            });
            if (!userToken.length) {
                res.status(401).json({ message: "Invalid Token" });
            }
            else {
                if (userToken[0].expiryTime) {
                    res.status(401).json({ message: "Token Expired" });
                }
            }
            req.potentialUserType = userToken[0].potentialUser['potential_user_type'];
            req.potentialUserId = userToken[0].potentialUserId;
            req.token = auth[1];     
         }
        catch (err) {
            res.status(500).json({ message: "Unexpected exception occured" });
        }

    }
    return next();
}

module.exports = { verifyToken };
