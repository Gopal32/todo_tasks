const bcrypt = require("bcryptjs");

passFunc = {}

passFunc.saltHashPassword = (password) => {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt)
    return {
        salt: salt,
        passwordHash: hash
    }
}

passFunc.checkPassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword)
}

module.exports = passFunc