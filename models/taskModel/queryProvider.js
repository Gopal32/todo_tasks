class QueryProvider {
    getTasks = () => {
        return `Select task_id as taskId, title, subtitle, image, created_by as createdBy, created_on as createdOn from tasks
        where created_by = ?
        `
    }
    insertTask = () => {
        return `Insert into tasks (title, subtitle, image, created_by, created_on)
        values (?,?,?,?, now())`
    }
    updateTask = () => {
        return `Update  tasks
        set title = ?, subtitle = ?, image =?, updated_on =now(), updated_by = ?
        where task_id =? and created_by=?`
    }
    deleteTask = () => {
        return `Delete from tasks
        where task_id = ? and created_by=? `
    }
}

module.exports = new QueryProvider();