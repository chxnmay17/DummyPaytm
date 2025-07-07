const express = require("express");
const rootRouter = require("./routes/index");
const userRouter= require("./routes/user");
const app = express();
app.use("api/v1",rootRouter);
app.use("api/v1/user",userRouter);

