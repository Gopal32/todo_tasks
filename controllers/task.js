const taskModel = require("../models/taskModel/taskModel.js");
const validate = require('../models/taskModel/validation.js')
const passFunc = require('../lib/passwordHash.js')
const auth = require('../middleware/auth.js')

const getTasks = async (req, res) => {
    try {
        const tasksList = await taskModel.getTasks(req.email);

        res.status(200).json({ records: result.message ? result.message : tasksList });

    } catch (error) {
        res.status(500).json({ message: error.errorMsg ? error.errorMsg : "Something went wrong" });
    }
};

const createTask = async (req, res) => {

    try {
        if (!req.files?.avatar) res.status(400).json({ message: "Please provid a image" })
        else {
            if (Array.isArray(req.files?.avatar)) res.status(400).json({ message: "Please provid single image" })
            else {
                req.body.image = {
                    data: req.files.avatar.data, mimetype: req.files.avatar.mimetype
                }

                const checkValidation = await validate.create(req.body)

                const { title, subtitle, image: { data } } = checkValidation;

                await taskModel.createTask(title, subtitle, data, req.email);

                res.status(201).json({ message: 'Task cretaed successfully' });
            }
        }

    } catch (error) {
        res.status(error.errorMsg ? 400 : 500).json({ message: error.errorMsg ? error.errorMsg : "Something went wrong" });
    }
};

const updateTask = async (req, res) => {
    try {
        if (!req.files?.avatar) res.status(400).json({ message: "Please provid a image" })
        else {
            if (Array.isArray(req.files?.avatar)) res.status(400).json({ message: "Please provid single image" })
            else {
                req.body.image = {
                    data: req.files.avatar.data, mimetype: req.files.avatar.mimetype
                }
                const checkValidation = await validate.update(req.body)

                const { taskId, title, subtitle, image: { data } } = checkValidation;

                let result = await taskModel.updateTask(taskId, title, subtitle, data, req.email);

                res.status(201).json({ message: result.message ? result.message : 'Task updated successfully' });
            }
        }

    } catch (error) {
        res.status(error.errorMsg ? 400 : 500).json({ message: error.errorMsg ? error.errorMsg : "Something went wrong" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const checkValidation = await validate.delete(req.params)
        const { taskId } = checkValidation;

        let result = await taskModel.deleteTask(taskId, req.email);

        res.status(201).json({ message: result.message ? result.message : 'Task delete successfully' });

    } catch (error) {
        res.status(error.errorMsg ? 400 : 500).json({ message: error.errorMsg ? error.errorMsg : "Something went wrong" });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask }
