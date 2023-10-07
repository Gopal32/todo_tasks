class QueryProvider {
    userFind = () => {
        return `Select user_id as userId, email, hash_password as hashPassword, salt_key as saltKey from users
        where lower(email) = lower(?)`
    }
    insertUser = () => {
        return `Insert into users (email, hash_password, salt_key, name, address)
        values (?,?,?,?,?)`

    }
}

module.exports = new QueryProvider();