const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = require('./config/index').port

const userRouter = require("./routes/user.js")
const taskRoutes = require('./routes/task.js');
const fileUpload = require('express-fileupload')
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}))
app.use("/user", userRouter);
app.use('/task', taskRoutes);

/* Start The Server */
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
