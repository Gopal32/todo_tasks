const Mysql = require('../../config/conn')
const QueryProvider = require('./queryProvider')

class TaskModel {
    getTasks = (email) => {
        return new Promise(async (resolve, reject) => {
            let result = await Mysql.query(QueryProvider.getTasks(), email)
            if (result.errorMsg) {
                reject(result)
            }
            resolve(result)
        })
    };
    createTask = (title, subtitle, image, email) => {
        return new Promise(async (resolve, reject) => {
            let result = await Mysql.query(QueryProvider.insertTask(), [title, subtitle, image, email])
            if (result.errorMsg || result.affectedRows === 0) {
                reject(result)
            }
            if (result.length === 0) {
                resolve({ message: "No Record Found" })
            }
            resolve(result)
        })
    }

    updateTask = (taskId, title, subtitle, image, email) => {
        return new Promise(async (resolve, reject) => {
            let result = await Mysql.query(QueryProvider.updateTask(), [title, subtitle, image, email, taskId, email])
            if (result.errorMsg) {
                reject(result)
            }
            if (result.affectedRows === 0) {
                resolve({ message: "No Record Found" })
            }
            resolve(result)
        })
    };

    deleteTask = (taskId, email) => {
        return new Promise(async (resolve, reject) => {
            let result = await Mysql.query(QueryProvider.deleteTask(), [parseInt(taskId), email])
            if (result.errorMsg) {
                reject(result)
            }
            if (result.affectedRows === 0) {
                resolve({ message: "No Record Found" })
            }
            resolve(result)
        })
    };
}


module.exports = new TaskModel();
