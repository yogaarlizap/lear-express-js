const crypto = require('crypto');

const token = async () => {
    return crypto.createHash('sha256').update(await Date.now() + crypto.randomBytes(20).toString("hex")).digest('hex');
}

module.exports = token;