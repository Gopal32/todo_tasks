const express = require('express')
const multer = require('multer')
const router = express.Router();
const upload = multer({ dest: 'uploads/' })

const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/task.js');

const auth = require('../middleware/auth.js').auth;

router.get("/", auth, getTasks);
router.post('/create', auth, createTask);
router.post('/update', auth, updateTask);
router.delete('/:taskId', auth, deleteTask);

module.exports = router;