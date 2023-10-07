const mysql = require("mysql");
const config = require(".");

class Mysql {
    constructor () {
        this.conn = mysql.createConnection(config.mysql)
        this.conn.connect((err) => {
            if (err) throw err;
            console.log("Mysql Connected Successfully.....")
        })
    }

    query = (queryString, queryParam) => {
        return new Promise((resolve, reject) => {
            this.conn.query(queryString, queryParam, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    resolve({ errorMsg: "Mysql connection lost" })
                }
                resolve(res);
            });
        })
    };
}

module.exports = new Mysql();