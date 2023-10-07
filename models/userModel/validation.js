
const Validator = require('jsonschema').Validator
const v = new Validator()
class Validation {

    signIn (request) {
        return new Promise((resolve, reject) => {
            const schema = {
                id: '/signIn',
                type: 'object',
                required: true,
                properties: {
                    email: {
                        type: 'string',
                        required: true,
                        minLength: 1,
                        maxLength: 50
                    },
                    password: {
                        type: 'string',
                        required: true,
                        minLength: 1
                    }
                },
                additionalProperties: false
            }
            let formatedError = []
            v.addSchema(schema, '/loginAPi')
            formatedError = v.validate(request, schema).errors.map(data => {
                const formatedErr = data.stack.split('.')
                return formatedErr[formatedErr.length - 1]
            })
            if (formatedError.length > 0) {
                reject({ errorMsg: formatedError })
            } else {
                resolve(request)
            }
        })
    }

    signUp (request) {
        return new Promise((resolve, reject) => {
            const schema = {
                id: '/signUp',
                type: 'object',
                required: true,
                properties: {
                    email: {
                        type: 'string',
                        required: true,
                        minLength: 1,
                        maxLength: 50
                    },
                    password: {
                        type: 'string',
                        required: true,
                        minLength: 5,
                        maxLength: 15
                    },
                    name: {
                        type: 'string',
                        required: true,
                        minLength: 1,
                        maxLength: 25
                    },
                    address: {
                        type: 'string',
                        required: true,
                        minLength: 3,
                        maxLength: 100
                    }
                },
                additionalProperties: false
            }
            let formatedError = []
            formatedError = v.validate(request, schema).errors.map(data => {
                const formatedErr = data.stack.split('.')
                return formatedErr[formatedErr.length - 1]
            })
            if (formatedError.length > 0) {
                reject({ errorMsg: formatedError })
            } else {
                resolve(request)
            }
        })

    }
}

module.exports = new Validation()