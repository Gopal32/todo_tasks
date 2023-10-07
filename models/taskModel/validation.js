
const Validator = require('jsonschema').Validator
const v = new Validator()
class Validation {

    create (request) {
        return new Promise((resolve, reject) => {
            const schema = {
                id: '/create',
                type: 'object',
                required: true,
                properties: {
                    title: {
                        type: 'string',
                        required: true,
                        minLength: 1,
                        maxLength: 500
                    },
                    subtitle: {
                        type: 'string',
                        required: true,
                        minLength: 1,
                        maxLength: 100
                    },
                    image: {
                        type: 'object',
                        required: true,
                        properties: {
                            data: {
                                type: 'buffer',
                                required: true
                            },
                            mimetype: {
                                type: 'string',
                                required: true,
                                enum: ['image/jpeg', 'image/jpg', 'image/png']
                            }
                        }
                    }
                },
                additionalProperties: false
            }
            let formatedError = []
            v.addSchema(schema, '/create')
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

    update (request) {
        return new Promise((resolve, reject) => {
            const schema = {
                id: '/update',
                type: 'object',
                required: true,
                properties: {
                    taskId: {
                        type: 'string',
                        required: true
                    },
                    title: {
                        type: 'string',
                        required: true,
                        minLength: 1,
                        maxLength: 500
                    },
                    subtitle: {
                        type: 'string',
                        required: true,
                        minLength: 1,
                        maxLength: 100
                    },
                    image: {
                        type: 'object',
                        required: true,
                        properties: {
                            data: {
                                type: 'buffer',
                                required: true
                            },
                            mimetype: {
                                type: 'string',
                                required: true,
                                enum: ['image/jpeg', 'image/jpg', 'image/png']
                            }
                        }
                    }
                },
                additionalProperties: false
            }
            let formatedError = []
            v.addSchema(schema, '/update')
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
    delete (request) {
        return new Promise((resolve, reject) => {
            const schema = {
                id: '/delete',
                type: 'object',
                required: true,
                properties: {
                    taskId: {
                        type: 'string',
                        required: true
                    }
                },
                additionalProperties: false
            }
            let formatedError = []
            v.addSchema(schema, '/delete')
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