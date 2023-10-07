const Mysql = require('../../config/conn')
const QueryProvider = require('./queryProvider')

class UserModel {
    findUser = (email) => {
        return new Promise(async (resolve, reject) => {
            let result = await Mysql.query(QueryProvider.userFind(), email)
            if (result.errorMsg) {
                reject(result)
            }
            resolve(result)
        })
    };
    createUser = (email, hashPass, saltKey, name, address) => {
        return new Promise(async (resolve, reject) => {
            let result = await Mysql.query(QueryProvider.insertUser(), [email, hashPass, saltKey, name, address])
            if (result.errorMsg) {
                reject(result)
            }
            resolve(result)
        })
    };
}


module.exports = new UserModel();
