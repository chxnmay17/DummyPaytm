const express = require("express");
const rootRouter = require("./routes/index");
const userRouter= require("./routes/user");
const app = express();
const cors=require("cors");
const bodyParser=require("body-parser")




app.use(bodyParser.json());
app.use(cors());
app.use("api/v1",rootRouter);

app.listen(3000);

