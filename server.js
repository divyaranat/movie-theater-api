const port = 3000;
const express = require("express");
const app = express();
const userRouter = require("./routes/userRoute.js")
const showRouter = require("./routes/showRoute.js")
const seed = require("./seed.js");

seed();
app.use(express.json());
app.use(express.urlencoded());
app.use("/users", userRouter);
app.use("/shows", showRouter);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});